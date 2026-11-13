-- =============================================================================
-- CyberEscape : schéma complet de la base Supabase
-- À exécuter dans Supabase → SQL Editor → New query → Run.
-- Le script peut être relancé sans risque : il met la base à jour.
--
-- Principe de sécurité : le navigateur peut LIRE ses propres données,
-- mais toutes les ÉCRITURES sensibles (progression, jetons, abonnements)
-- passent par le serveur du site, avec la clé secrète (service_role).
-- =============================================================================

-- ---------- Profils (pseudo public) ----------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  pseudo text not null check (pseudo ~ '^[A-Za-z0-9_-]{3,20}$'),
  created_at timestamptz not null default now()
);

create unique index if not exists profiles_pseudo_unique on public.profiles (lower(pseudo));

alter table public.profiles enable row level security;

drop policy if exists "Profils visibles par tous" on public.profiles;
create policy "Profils visibles par tous" on public.profiles
  for select using (true);

drop policy if exists "Chacun modifie son profil" on public.profiles;
create policy "Chacun modifie son profil" on public.profiles
  for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Un joueur ne peut modifier QUE son pseudo (aucune autre colonne).
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (pseudo) on public.profiles to authenticated;

-- ---------- Progression (salles, cartes, leçons) ----------

create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  cards text[] not null default '{}',
  solved_rooms text[] not null default '{}',
  lessons_done text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

drop policy if exists "Lire sa progression" on public.progress;
create policy "Lire sa progression" on public.progress
  for select using ((select auth.uid()) = user_id);

-- Anciennes règles d'écriture : supprimées, seul le serveur écrit.
drop policy if exists "Créer sa progression" on public.progress;
drop policy if exists "Modifier sa progression" on public.progress;
revoke insert, update, delete on public.progress from anon, authenticated;

-- ---------- Jetons du jour ----------

create table if not exists public.daily_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  tokens_used integer not null default 0 check (tokens_used >= 0),
  primary key (user_id, day)
);

alter table public.daily_usage enable row level security;

drop policy if exists "Lire ses jetons" on public.daily_usage;
create policy "Lire ses jetons" on public.daily_usage
  for select using ((select auth.uid()) = user_id);

revoke insert, update, delete on public.daily_usage from anon, authenticated;

-- ---------- Essais par salle (anti force brute) ----------

create table if not exists public.room_attempts (
  user_id uuid not null references auth.users (id) on delete cascade,
  room_id text not null,
  day date not null,
  attempts integer not null default 0,
  primary key (user_id, room_id, day)
);

alter table public.room_attempts enable row level security;
revoke all on public.room_attempts from anon, authenticated;

-- ---------- Abonnements ----------

create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  -- 'etudiant' et 'standard' : payants via Stripe ; 'offert' : accordé depuis l'espace admin.
  plan text not null check (plan in ('etudiant', 'standard', 'offert')),
  status text not null,
  current_period_end timestamptz,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  cancel_at_period_end boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

drop policy if exists "Lire son abonnement" on public.subscriptions;
create policy "Lire son abonnement" on public.subscriptions
  for select using ((select auth.uid()) = user_id);

revoke insert, update, delete on public.subscriptions from anon, authenticated;

-- ---------- Vérification étudiante ----------

create table if not exists public.student_verifications (
  user_id uuid primary key references auth.users (id) on delete cascade,
  school_email text,
  verified_at timestamptz,
  expires_at timestamptz,
  pending_email text,
  pending_token_hash text,
  pending_expires_at timestamptz,
  last_sent_at timestamptz
);

-- Une adresse scolaire ne peut valider qu'un seul compte.
create unique index if not exists student_school_email_unique
  on public.student_verifications (lower(school_email)) where school_email is not null;

alter table public.student_verifications enable row level security;
revoke all on public.student_verifications from anon, authenticated;

-- ---------- Administrateurs ----------
-- Pour te donner les droits admin (une seule fois), exécute :
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'ton-adresse@exemple.fr';

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

-- ---------- Création automatique du profil à l'inscription ----------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, pseudo)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'pseudo', 'joueur_' || substr(new.id::text, 1, 8))
  );
  insert into public.progress (user_id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Résoudre une salle (jetons compris), de façon atomique ----------
-- Appelée uniquement par le serveur, APRÈS avoir vérifié la réponse.

create or replace function public.consume_room(p_user uuid, p_room text, p_premium boolean, p_limit integer)
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_day date := (now() at time zone 'Europe/Paris')::date;
  v_used integer;
  v_solved text[];
begin
  insert into public.progress (user_id) values (p_user) on conflict do nothing;
  select solved_rooms into v_solved from public.progress where user_id = p_user for update;

  insert into public.daily_usage (user_id, day) values (p_user, v_day) on conflict do nothing;
  select tokens_used into v_used from public.daily_usage where user_id = p_user and day = v_day for update;

  if p_room = any (v_solved) then
    return json_build_object('ok', true, 'already', true, 'used', v_used);
  end if;

  if not p_premium and v_used >= p_limit then
    return json_build_object('ok', false, 'reason', 'no_tokens', 'used', v_used);
  end if;

  if not p_premium then
    update public.daily_usage set tokens_used = tokens_used + 1 where user_id = p_user and day = v_day;
    v_used := v_used + 1;
  end if;

  update public.progress
    set solved_rooms = array_append(solved_rooms, p_room), updated_at = now()
    where user_id = p_user;

  return json_build_object('ok', true, 'already', false, 'used', v_used);
end;
$$;

-- ---------- Compter un essai (limite par salle et par jour) ----------

create or replace function public.register_attempt(p_user uuid, p_room text, p_max integer)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_day date := (now() at time zone 'Europe/Paris')::date;
  v_attempts integer;
begin
  insert into public.room_attempts (user_id, room_id, day, attempts)
  values (p_user, p_room, v_day, 1)
  on conflict (user_id, room_id, day) do update set attempts = public.room_attempts.attempts + 1
  returning attempts into v_attempts;
  return v_attempts <= p_max;
end;
$$;

-- ---------- Ajouter une carte ou une leçon à la progression ----------

create or replace function public.add_progress_item(p_user uuid, p_field text, p_value text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.progress (user_id) values (p_user) on conflict do nothing;
  if p_field = 'cards' then
    update public.progress set cards = array_append(cards, p_value), updated_at = now()
      where user_id = p_user and not (p_value = any (cards));
  elsif p_field = 'lessons_done' then
    update public.progress set lessons_done = array_append(lessons_done, p_value), updated_at = now()
      where user_id = p_user and not (p_value = any (lessons_done));
  else
    raise exception 'Champ non autorisé';
  end if;
end;
$$;

-- Ces fonctions ne sont accessibles qu'au serveur (clé service_role).
revoke all on function public.consume_room(uuid, text, boolean, integer) from public, anon, authenticated;
revoke all on function public.register_attempt(uuid, text, integer) from public, anon, authenticated;
revoke all on function public.add_progress_item(uuid, text, text) from public, anon, authenticated;
grant execute on function public.consume_room(uuid, text, boolean, integer) to service_role;
grant execute on function public.register_attempt(uuid, text, integer) to service_role;
grant execute on function public.add_progress_item(uuid, text, text) to service_role;

-- ---------- Suppression de son propre compte ----------

create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Non connecté';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
