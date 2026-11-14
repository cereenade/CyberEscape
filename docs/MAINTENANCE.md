# Guide de maintenance de CyberEscape

Ce guide explique comment garder la main sur tout le projet : le code, le site en ligne et la base de données.

## Vue d'ensemble

| Élément | Où ça vit | À quoi ça sert |
|---|---|---|
| Code (front-end et back-end) | GitHub : `cereenade/CyberEscape` | La source de vérité : tout part de là |
| Site en ligne | Vercel : projet `cyber-escape` | Construit et héberge le site à chaque push sur `main` |
| Base de données et comptes | Supabase : projet `cyberescape` (Paris) | Comptes, progression, jetons, abonnements |
| Paiements | Mollie | Abonnements Étudiant (2,99 €) et Standard (4,99 €) |
| E-mails de vérification étudiante | Resend | Lien envoyé à l'adresse de l'école |
| Espace admin | `https://ton-site/admin` | Stats, joueurs, accès offert, liens vers tous les outils |

Le front-end (les pages) et le back-end (server actions dans `src/app/actions`, logique dans `src/server`, webhook Mollie, règles de la base) sont dans le même dépôt Next.js.

## Mise en route (à faire une fois)

### 1. Mettre la base à jour
Supabase → **SQL Editor** → **New query** → colle tout `supabase/schema.sql` → **Run**. Le script peut être relancé sans risque.

### 2. Te donner les droits admin
Dans le SQL Editor (remplace par ton e-mail de connexion au site) :
```sql
insert into public.admins (user_id)
select id from auth.users where email = 'ton-adresse@exemple.fr';
```
Puis ouvre `/admin` sur le site. Pour tous les autres, cette page renvoie une erreur 404.

### 3. Variables d'environnement (Vercel → Settings → Environment Variables)

| Variable | Où la trouver | Obligatoire |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Ajoutées par l'intégration Supabase | Oui |
| `SUPABASE_SECRET_KEY` (ou `SUPABASE_SERVICE_ROLE_KEY`) | Souvent déjà ajoutée par l'intégration ; sinon Supabase → Project Settings → API Keys → **Secret key** | **Oui, sinon le jeu est indisponible** |
| `MOLLIE_API_KEY` | Mollie → Développeurs → Clés API (`test_…` pour essayer, `live_…` pour vendre) | Pour vendre |
| `RESEND_API_KEY`, `EMAIL_FROM` | resend.com → API Keys ; `CyberEscape <noreply@ton-domaine.fr>` | Pour l'offre étudiante |
| `SITE_PASSWORD` | Un mot de passe de ton choix : le site entier le demande tant qu'il n'est pas lancé (identifiant : n'importe quoi) | Avant le lancement |
| `SITE_PUBLIC` | `true` le jour du lancement pour ouvrir le site à tous | Au lancement |

⚠️ Aucune de ces clés secrètes ne doit commencer par `NEXT_PUBLIC_` : elles resteraient sinon visibles dans le navigateur. Après chaque ajout : **Deployments → Redeploy**.

Tant que la clé Mollie manque, la page Offres affiche « Bientôt disponible » : rien ne peut être vendu par erreur.

### 4. Configurer Mollie
1. Crée le compte Mollie avec ton statut de micro-entrepreneuse (SIRET dès qu'il est attribué) et termine la vérification.
2. **Paramètres → Méthodes de paiement** : active **Cartes** (nécessaire pour le prélèvement mensuel automatique).
3. Rien d'autre à créer : les montants (2,99 € / 4,99 €) sont dans le code et l'adresse du webhook (`/api/mollie/webhook`) est envoyée automatiquement à chaque paiement.
4. Teste d'abord avec la clé `test_…` (Mollie affiche une page de paiement factice), puis remplace-la par la clé `live_…` et redéploie.

### 5. Configurer Resend (e-mails étudiants)
Resend demande un nom de domaine à toi (ex. `cyberescape.fr`) : ajoute-le dans Resend → **Domains** et copie les enregistrements DNS indiqués chez ton registrar. Sans domaine, la vérification étudiante affiche « bientôt disponible » ; tu peux valider un étudiant à la main depuis `/admin`.

### 6. Réglages de sécurité Supabase (recommandés)
- **Authentication → Providers → Email** : *Confirm email* activé.
- **Authentication → Attack Protection** : protection contre les mots de passe divulgués (leaked password protection) et CAPTCHA si tu as beaucoup d'inscriptions.
- **Database → Settings → Network Restrictions** : n'autorise aucune IP (le site passe par l'API HTTPS, pas par le port Postgres 5432/6543).
- **Database → Settings → SSL Configuration** : *Enforce SSL*.
- **Advisors → Security Advisor** : doit être sans alerte.

## Travailler sur le code en local

Prérequis : [Node.js](https://nodejs.org/) 20 et [Git](https://git-scm.com/).

```bash
git clone https://github.com/cereenade/CyberEscape.git
cd CyberEscape
npm install
cp .env.example .env.local   # puis remplis les valeurs de Supabase
npm run dev                  # → http://localhost:3000
```

Les valeurs de `.env.local` se trouvent dans Supabase → **Project Settings** → **API Keys**, ou dans Vercel → **Environment Variables**. Ne pousse jamais ce fichier sur GitHub (il est déjà ignoré par `.gitignore`).

Avant de pousser, vérifie que tout compile et que le contenu est valide :

```bash
npm run typecheck
npm run check:content
npm run build
```

## Faire une modification proprement

1. Pars d'une branche à jour : `git checkout main && git pull`
2. Crée une branche : `git checkout -b feat/ma-modif` (ou `fix/…`, `style/…`, `docs/…`)
3. Modifie, puis committe : `git add -A && git commit -m "feat: ce que fait la modif"`
4. Pousse : `git push -u origin feat/ma-modif`
5. Sur GitHub, ouvre une **pull request** vers `main`. La CI vérifie les types et le build, et Vercel crée une **URL de prévisualisation** pour tester.
6. Si tout est vert et que la prévisualisation te convient, fusionne. Vercel met le site en ligne automatiquement.

## Où modifier quoi

| Je veux changer… | Fichier(s) |
|---|---|
| Une salle, une énigme, une carte | `src/data/levels/*.ts` (procédure d'ajout : `docs/AJOUT-QUOTIDIEN.md`) |
| Une leçon ou un quiz | `src/data/lessons/*.ts` (thèmes et ordre dans `index.ts`) |
| Les niveaux, le nombre de jetons, les prix affichés | `src/data/meta.ts` |
| La limite d'essais par salle | `src/app/actions/game.ts` |
| Les domaines d'écoles acceptés | `src/server/student.ts` |
| Les offres, la page de paiement | `src/app/abonnement`, `src/components/billing/Plans.tsx`, `src/app/actions/billing.ts` |
| L'espace admin | `src/app/admin/page.tsx`, `src/app/actions/admin.ts` |
| Les couleurs, le style | `src/app/globals.css` (variables en haut du fichier) |
| Une page | `src/app/<nom-de-la-page>/page.tsx` |
| Les messages d'erreur des comptes | `src/lib/auth.ts` |
| La structure de la base | `supabase/schema.sql` (à relancer dans Supabase) |
| Les pages légales | `src/app/mentions-legales`, `confidentialite`, `conditions`, `cgv` |

## En cas de problème

### Le déploiement échoue
1. Vercel → **Deployments** → clique sur le déploiement en erreur → **Build Logs** : les lignes rouges donnent la cause.
2. GitHub → onglet **Actions** : la CI montre la même erreur, avec le fichier et la ligne.
3. Tant que ce n'est pas corrigé, l'ancienne version reste en ligne : rien n'est cassé pour les joueurs.

### Le site en ligne a un bug
- **Revenir en arrière tout de suite** : Vercel → **Deployments** → choisis un déploiement qui marchait → **⋯** → **Promote to Production** (ou **Instant Rollback**).
- **Voir les erreurs serveur** : Vercel → **Logs**.
- **Voir les erreurs dans le navigateur** : ouvre le site, appuie sur F12 → onglet **Console**.

### Un problème de compte ou de base
- **Voir les joueurs** : Supabase → **Authentication** → **Users** (confirmer, bloquer ou supprimer un compte).
- **Voir les données** : Supabase → **Table Editor** → `profiles` ou `progress`.
- **Voir les erreurs** : Supabase → **Logs** (Auth, Postgres).
- **Les mails n'arrivent pas** : l'envoi intégré de Supabase est très limité. Configure un SMTP dans **Authentication** → **SMTP Settings**.
- **Les liens des mails mènent à une erreur** : vérifie **Authentication** → **URL Configuration** (Site URL et Redirect URLs, avec `/auth/callback`).

### « Le jeu est momentanément indisponible »
La variable `SUPABASE_SECRET_KEY` manque ou est fausse sur Vercel, ou `supabase/schema.sql` n'a pas été relancé.

### Un paiement n'active pas l'abonnement
Mollie → **Transactions** → le paiement : vérifie qu'il est « Payé » et regarde l'onglet des webhooks (Mollie réessaie plusieurs fois). Vérifie `MOLLIE_API_KEY` et le mode (test/live). En attendant, offre l'illimité au joueur depuis `/admin`.

### Une clé a fuité
1. Régénère la clé là où elle a été créée (Supabase → **API Keys**, Mollie → **Clés API**, Resend → **API Keys**).
2. Mets la nouvelle valeur dans Vercel → **Environment Variables**.
3. Vercel → **Redeploy**.

## Sauvegardes

- Le **code** est sauvegardé par Git : chaque version est récupérable dans l'historique.
- La **base** : Supabase fait des sauvegardes automatiques selon ton offre (**Database** → **Backups**). Pour une copie manuelle, exporte les tables depuis le **Table Editor** (bouton Export en CSV).
- Le **schéma** de la base est dans `supabase/schema.sql` : il permet de recréer les tables sur un nouveau projet.

## Sécurité, déjà en place

- Mots de passe gérés et hachés par Supabase.
- **Les réponses ne quittent jamais le serveur** : le navigateur reçoit les énigmes sans solutions, et chaque réponse est vérifiée côté serveur.
- **Écritures réservées au serveur** : le navigateur peut seulement lire ses propres données (RLS) et changer son pseudo. Progression, jetons, abonnements et statut étudiant ne sont modifiables qu'avec la clé secrète, côté serveur.
- Jetons consommés de façon atomique en SQL (impossible d'en gagner en envoyant plusieurs requêtes à la fois) et 30 essais maximum par salle et par jour.
- Webhook Mollie : le statut de chaque paiement est relu auprès de l'API Mollie ; aucune carte bancaire ne transite par le site.
- Lien étudiant à usage unique (24 h), seule son empreinte SHA-256 est stockée.
- Espace admin vérifié à chaque requête via la table `admins`, invisible (404) pour les autres.
- En-têtes de sécurité HTTP, dont une Content-Security-Policy (`next.config.mjs`), HTTPS forcé (HSTS).
- Redirections après connexion limitées aux pages du site.
- Pas de port ouvert à gérer : Vercel et Supabase n'exposent que HTTPS ; ferme l'accès direct à Postgres avec les Network Restrictions (voir plus haut).
- Aucun secret dans le dépôt : les clés sont dans les variables d'environnement de Vercel.
- Dependabot propose chaque semaine les mises à jour des dépendances (dont les correctifs de sécurité).

## Accès à garder sous la main

Pour avoir le contrôle total, assure-toi de pouvoir te connecter à ces comptes, **avec la double authentification activée** (c'est la vraie porte d'entrée de ton site) :

- **GitHub** (`cereenade`) : le code.
- **Vercel** : le déploiement et les variables d'environnement.
- **Supabase** : la base de données et les comptes joueurs.
- **Mollie** : les paiements et les virements.
- **Resend** : les e-mails.

Pour modifier un fichier sans rien installer : ouvre le dépôt sur GitHub et appuie sur la touche **.** (point) → l'éditeur github.dev s'ouvre ; committe sur une branche, puis ouvre une pull request.
