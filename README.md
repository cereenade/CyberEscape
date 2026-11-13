# CyberEscape

> **Collectionne. Décode. Échappe-toi.**

Un pirate a pris le contrôle du serveur, et tu es enfermé dedans. Pour t'en sortir, tu dois traverser des salles piégées où chaque porte cache une énigme de cybersécurité : un mot de passe dans le code source, un message chiffré, un faux mail à démasquer.

Ton arme, ce sont les **cyber-cartes**. Tu les ramasses en explorant, chacune t'apprend une vraie notion de cyber, et ce sont elles qui te donnent les clés pour avancer. Plus tu progresses, plus ton deck grandit… et plus tu en sais.

Pas besoin d'être expert : tu apprends en jouant, à ton rythme, directement dans ton navigateur.

---

## Le jeu

**200 salles réparties en 5 niveaux de 40 salles.** Le joueur choisit librement son niveau.

| Niveau | Thème | Exemples d'énigmes |
|---|---|---|
| 🟢 Facile | Les bons réflexes | Code source, phishing, smishing, vishing, clé USB, QR code piégé, sauvegardes 3-2-1 |
| 🟡 Moyen | Lire les indices | Binaire, Atbash, morse, en-têtes de mail, DNS, métadonnées EXIF, scan nmap |
| 🟠 Difficile | Penser comme un attaquant | Vigenère, hachage, injection SQL, XSS, CSRF, robots.txt, élévation de privilèges |
| 🔴 Très difficile | Dans la peau d'un analyste SOC | XOR, JWT, YARA, SIEM, beaconing, macros, capture réseau, MITRE ATT&CK |
| 💀 Impossible | Réservé aux experts | Décodages en plusieurs couches, chronologie d'incident, SSRF, deepfakes, chasse finale |

- **Une cyber-carte par salle** (200 au total) : elle explique une notion et sert d'indice.
- **5 types d'énigmes** : réponse libre, choix unique, choix multiples, remise dans l'ordre et chasse au phishing.
- **Un atelier de décodage** : on empile des opérations (Base64, César, XOR, Vigenère…) pour décoder les messages.
- **La salle de cours** : 30 leçons rangées par thème (7) et par niveau (débutant, intermédiaire, avancé). Chaque leçon a des objectifs, des explications pas à pas avec exemples, un encadré « À retenir » et un mini-quiz.

- **Comptes joueurs** : inscription, connexion, mot de passe oublié, page « Mon compte » (pseudo, statistiques, offre, mot de passe, suppression du compte). Un compte est nécessaire pour jouer ; les cours restent libres.
- **Jetons** : 5 par jour (non cumulables, remis à zéro à minuit), 1 jeton par salle réussie.
- **Abonnement illimité** : 2,99 €/mois pour les étudiants (vérification par lien envoyé à l'e-mail de l'école), 4,99 €/mois pour tous, via Stripe.
- **Espace admin** (`/admin`) : statistiques, joueurs, accès offert, liens vers Supabase, Vercel, GitHub, Stripe et Resend.

Les réponses ne sont jamais envoyées au navigateur : chaque réponse est vérifiée sur le serveur.

## Technologies

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- TypeScript
- CSS natif, sans dépendance
- [Supabase](https://supabase.com/) pour les comptes et la base de données (`@supabase/ssr`)
- [Stripe](https://stripe.com/) pour les abonnements, [Resend](https://resend.com/) pour les e-mails (appelés en REST, sans SDK)

## Lancer le projet en local

Prérequis : [Node.js](https://nodejs.org/) 18.18 ou plus récent.

```bash
git clone https://github.com/cereenade/CyberEscape.git
cd CyberEscape
npm install
npm run dev
```

Puis ouvre [http://localhost:3000](http://localhost:3000).

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lance le build de production |
| `npm run typecheck` | Vérifie les types TypeScript |

## Déploiement sur Vercel

1. Va sur [vercel.com](https://vercel.com) et connecte-toi avec GitHub.
2. **Add New → Project**, puis importe `cereenade/CyberEscape`.
3. Vercel détecte Next.js tout seul : clique sur **Deploy**.

Chaque push sur `main` redéploie le site automatiquement, et chaque pull request reçoit une URL de prévisualisation.

## Activer les comptes (Supabase)

Les comptes sont indispensables pour jouer. Pour les activer :

1. **Créer la base** : sur Vercel, ouvre le projet → onglet **Storage** → **Supabase** → crée la base et connecte-la au projet. Les variables `NEXT_PUBLIC_SUPABASE_URL` et la clé publique sont ajoutées automatiquement.
2. **Créer les tables** : dans Supabase → **SQL Editor** → **New query**, colle le contenu de [`supabase/schema.sql`](supabase/schema.sql) puis clique sur **Run**.
3. **Autoriser les redirections** : dans Supabase → **Authentication** → **URL Configuration** :
   - *Site URL* : `https://ton-site.vercel.app`
   - *Redirect URLs* : `https://ton-site.vercel.app/auth/callback` et `http://localhost:3000/auth/callback`
4. **Clé secrète** : vérifie que `SUPABASE_SECRET_KEY` (ou `SUPABASE_SERVICE_ROLE_KEY`) est bien dans les variables Vercel.
5. **Redéployer** : sur Vercel → **Deployments** → **Redeploy**, pour que les nouvelles variables soient prises en compte.

Paiements (Stripe), e-mails étudiants (Resend) et droits admin : voir la [mise en route du guide de maintenance](docs/MAINTENANCE.md#mise-en-route-à-faire-une-fois).

En local, copie `.env.example` en `.env.local` et remplis-le avec les valeurs de Supabase → **Project Settings** → **API**.

> L'envoi de mails intégré à Supabase est très limité. Pour un vrai lancement, configure un serveur SMTP (Authentication → SMTP Settings) et traduis les modèles de mails en français (Authentication → Email Templates).

### Sécurité

- Les mots de passe sont gérés et hachés par Supabase, jamais stockés par le site.
- Chaque table est protégée par des règles RLS : un joueur ne peut que lire ses propres données ; toutes les écritures (progression, jetons, abonnements) passent par le serveur.
- Jetons consommés de façon atomique en SQL, 30 essais maximum par salle et par jour.
- Webhook Stripe vérifié par signature, Content-Security-Policy, HSTS, redirections sûres.
- La suppression de compte résilie l'abonnement Stripe puis efface toutes les données.

## Maintenance

Tout ce qu'il faut pour gérer le projet (travailler en local, corriger un bug, revenir en arrière, gérer la base) est dans le [guide de maintenance](docs/MAINTENANCE.md).

À chaque push et pull request, GitHub Actions vérifie les types et le build (`.github/workflows/ci.yml`). Dependabot propose les mises à jour des dépendances chaque semaine.

## Structure

```
src/
├── app/                      # Pages (App Router)
│   ├── page.tsx              # Accueil
│   ├── jeu/page.tsx          # Choix du niveau
│   ├── jeu/[niveau]/page.tsx # Un niveau de 40 salles
│   ├── cours/page.tsx        # Salle de cours
│   ├── cours/[slug]/page.tsx # Une leçon + son quiz
│   ├── deck/page.tsx         # Collection de cyber-cartes
│   ├── inscription/, connexion/, mot-de-passe-oublie/, reinitialiser-mot-de-passe/
│   ├── compte/page.tsx       # Mon compte
│   ├── abonnement/page.tsx   # Offres et vérification étudiante
│   ├── admin/page.tsx        # Espace d'administration
│   ├── actions/              # Server actions : jeu, paiement, étudiant, compte, admin
│   ├── api/stripe/webhook/   # Notifications de paiement Stripe
│   ├── etudiant/verifier/    # Lien de vérification de l'e-mail d'école
│   ├── auth/callback/        # Arrivée des liens envoyés par mail
│   ├── conditions/, confidentialite/, mentions-legales/, cgv/
│   ├── layout.tsx, not-found.tsx, globals.css
├── components/
│   ├── AuthProvider.tsx      # Joueur connecté et profil
│   ├── GameProvider.tsx      # État du joueur (progression, jetons, abonnement) lu sur le serveur
│   ├── billing/              # Cartes des offres et formulaire étudiant
│   ├── auth/                 # Formulaires de compte et page Mon compte
│   ├── LevelSelect.tsx       # Grille des niveaux
│   ├── LevelGame.tsx         # Enchaînement des salles d'un niveau
│   ├── RoomView.tsx          # Une salle : exploration, carte, énigme
│   ├── Quiz.tsx, LessonList.tsx, Deck.tsx, CyberCardView.tsx, Header.tsx, ProgressBar.tsx
│   └── puzzles/              # Énigmes : réponse, choix, choix multiples, ordre, phishing, atelier
├── data/
│   ├── meta.ts               # Niveaux, jetons et prix (utilisable dans le navigateur)
│   ├── game.ts               # Salles et cartes assemblées (serveur uniquement : contient les réponses)
│   ├── levels/               # Trois fiches par niveau (salles 1–10, 11–20, 21–40, avec leurs cartes)
│   └── lessons/              # Une fiche par leçon
└── lib/
    ├── types.ts              # Types partagés
    ├── crypto.ts             # Encodages et chiffrements (Base64, César, XOR…)
    ├── progress.ts           # Avancement par niveau, salle en cours
    ├── text.ts               # Comparaison des réponses
    ├── auth.ts               # Validation et messages d'erreur des comptes
    └── supabase/             # Clients Supabase (navigateur, serveur, middleware)
src/server/                   # Code serveur : vérification des réponses, joueur, Stripe, e-mails, étudiants
src/middleware.ts             # Rafraîchit la session, protège /compte, /jeu/*, /deck et /admin
supabase/schema.sql           # Tables, règles RLS et fonctions
```

### Ajouter du contenu

- **Une salle** : ajoute-la dans le fichier du niveau (`src/data/levels/`), avec sa carte et son énigme (`answer`, `choice`, `multi`, `order` ou `phishing`). Ajoute `tools` pour afficher l'atelier de décodage.
- **Une leçon** : crée un fichier dans `src/data/lessons/` (avec son thème, son niveau, ses objectifs et ses points à retenir) et ajoute-le à la liste dans `index.ts`.

## Branches

- `main` : version en ligne, toujours stable.
- `feat/...`, `fix/...` : une branche par fonctionnalité ou correction, fusionnée dans `main` via une pull request.

## Contribuer

Les idées d'énigmes et de cyber-cartes sont les bienvenues ! Ouvre une *issue* ou propose une *pull request*.

## Auteur

**Ceren Yikilmaz** — [@cereenade](https://github.com/cereenade)
