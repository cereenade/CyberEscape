# Guide de maintenance de CyberEscape

Ce guide explique comment garder la main sur tout le projet : le code, le site en ligne et la base de données.

## Vue d'ensemble

| Élément | Où ça vit | À quoi ça sert |
|---|---|---|
| Code (front-end et back-end) | GitHub : `cereenade/CyberEscape` | La source de vérité : tout part de là |
| Site en ligne | Vercel : projet `cyber-escape` | Construit et héberge le site à chaque push sur `main` |
| Base de données et comptes | Supabase : projet `cyberescape` (Paris) | Comptes joueurs, pseudos, progression |

Le front-end (les pages) et le back-end (middleware, route `/auth/callback`, règles de la base) sont dans le même dépôt Next.js.

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

Avant de pousser, vérifie que tout compile :

```bash
npm run typecheck
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
| Une salle, une énigme, une carte | `src/data/levels/*.ts` |
| Une leçon ou un quiz | `src/data/lessons/*.ts` (thèmes et ordre dans `index.ts`) |
| Les niveaux (noms, descriptions) | `src/data/game.ts` |
| Les couleurs, le style | `src/app/globals.css` (variables en haut du fichier) |
| Une page | `src/app/<nom-de-la-page>/page.tsx` |
| La mini-énigme de l'accueil | `src/components/home/MiniPuzzle.tsx` |
| Les messages d'erreur des comptes | `src/lib/auth.ts` |
| La structure de la base | `supabase/schema.sql` (à relancer dans Supabase) |
| Les pages légales | `src/app/mentions-legales`, `confidentialite`, `conditions` |

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

### Une clé a fuité
1. Supabase → **Project Settings** → **API Keys** : régénère la clé concernée.
2. Mets la nouvelle valeur dans Vercel → **Environment Variables**.
3. Vercel → **Redeploy**.

## Sauvegardes

- Le **code** est sauvegardé par Git : chaque version est récupérable dans l'historique.
- La **base** : Supabase fait des sauvegardes automatiques selon ton offre (**Database** → **Backups**). Pour une copie manuelle, exporte les tables depuis le **Table Editor** (bouton Export en CSV).
- Le **schéma** de la base est dans `supabase/schema.sql` : il permet de recréer les tables sur un nouveau projet.

## Sécurité, déjà en place

- Mots de passe gérés et hachés par Supabase.
- Règles RLS : chaque joueur ne lit et ne modifie que ses propres données.
- En-têtes de sécurité HTTP (`next.config.mjs`).
- Aucun secret dans le dépôt : les clés sont dans les variables d'environnement de Vercel.
- Dependabot propose chaque semaine les mises à jour des dépendances (dont les correctifs de sécurité).

## Accès à garder sous la main

Pour avoir le contrôle total, assure-toi de pouvoir te connecter à ces trois comptes, idéalement avec la double authentification activée :

- **GitHub** (`cereenade`) : le code.
- **Vercel** : le déploiement et les variables d'environnement.
- **Supabase** : la base de données et les comptes joueurs.
