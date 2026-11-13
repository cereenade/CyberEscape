-- =============================================================================
-- CyberEscape : schéma de la base Supabase
-- À exécuter une fois dans Supabase → SQL Editor → New query → Run.
-- Le script peut être relancé sans risque.
-- =============================================================================

-- ---------- Profils (pseudo public) ----------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  pseudo text not null check (pseudo ~ '^[A-Za-z0-9_-]{3,20}$'),
  created_at timestamptz not null default now()
);

-- Un pseudo est unique sans tenir compte des majuscules.
create unique index if not exists profiles_pseudo_unique on public.profiles (lower(pseudo));

alter table public.profiles enable row level security;

drop policy if exists "Profils visibles par tous" on public.profiles;
create policy "Profils visibles par tous" on public.profiles
  for select using (true);

drop policy if exists "Chacun modifie son profil" on public.profiles;
create policy "Chacun modifie son profil" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

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
  for select using (auth.uid() = user_id);

drop policy if exists "Créer sa progression" on public.progress;
create policy "Créer sa progression" on public.progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "Modifier sa progression" on public.progress;
create policy "Modifier sa progression" on public.progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

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
  insert into public.progress (user_id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

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
  -- Supprime l'utilisateur ; profil et progression partent en cascade.
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
