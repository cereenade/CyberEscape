# CyberEscape

> **Collectionne. Décode. Échappe-toi.**

Un pirate a pris le contrôle du serveur, et tu es enfermé dedans. Pour t'en sortir, tu dois traverser des salles piégées où chaque porte cache une énigme de cybersécurité : un mot de passe dans le code source, un message chiffré, un faux mail à démasquer.

Ton arme, ce sont les **cyber-cartes**. Tu les ramasses en explorant, chacune t'apprend une vraie notion de cyber, et ce sont elles qui te donnent les clés pour avancer. Plus tu progresses, plus ton deck grandit… et plus tu en sais.

Pas besoin d'être expert : tu apprends en jouant, à ton rythme, directement dans ton navigateur.

---

## Le jeu

**50 salles réparties en 5 niveaux.** Terminer un niveau débloque le suivant.

| Niveau | Thème | Exemples d'énigmes |
|---|---|---|
| 🟢 Facile | Les bons réflexes | Code source, César, phishing, clé USB piégée, double authentification |
| 🟡 Moyen | Lire les indices | Binaire, hexadécimal, en-têtes de mail, ports, logs de connexion |
| 🟠 Difficile | Penser comme un attaquant | Vigenère, hachage MD5, injection SQL, XSS, règles de pare-feu |
| 🔴 Très difficile | Dans la peau d'un analyste SOC | XOR, JWT, traversée de répertoires, exfiltration DNS, Event IDs Windows |
| 💀 Impossible | Réservé aux experts | Décodages en 4 couches, persistance, IDOR, Cyber Kill Chain, boss final |

- **Une cyber-carte par salle** (50 au total) : elle explique une notion et sert d'indice.
- **Un atelier de décodage** : on empile des opérations (Base64, César, XOR, Vigenère…) pour décoder les messages.
- **La salle de cours** : 8 leçons par thème, chacune avec un mini-quiz.

La progression, le deck et les leçons validées sont sauvegardés dans le navigateur (`localStorage`).

## Technologies

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- TypeScript
- CSS natif, sans dépendance

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

## Structure

```
src/
├── app/                      # Pages (App Router)
│   ├── page.tsx              # Accueil
│   ├── jeu/page.tsx          # Choix du niveau
│   ├── jeu/[niveau]/page.tsx # Un niveau de 10 salles
│   ├── cours/page.tsx        # Salle de cours
│   ├── cours/[slug]/page.tsx # Une leçon + son quiz
│   ├── deck/page.tsx         # Collection de cyber-cartes
│   ├── layout.tsx, not-found.tsx, globals.css
├── components/
│   ├── GameProvider.tsx      # État du jeu + sauvegarde
│   ├── LevelSelect.tsx       # Grille des niveaux
│   ├── LevelGame.tsx         # Enchaînement des salles d'un niveau
│   ├── RoomView.tsx          # Une salle : exploration, carte, énigme
│   ├── Quiz.tsx, LessonList.tsx, Deck.tsx, CyberCardView.tsx, Header.tsx, ProgressBar.tsx
│   └── puzzles/              # Énigmes : réponse libre, choix, phishing, atelier de décodage
├── data/
│   ├── game.ts               # Niveaux, salles et cartes assemblés
│   ├── levels/               # Une fiche par niveau (10 salles + 10 cartes)
│   └── lessons/              # Une fiche par leçon
└── lib/
    ├── types.ts              # Types partagés
    ├── crypto.ts             # Encodages et chiffrements (Base64, César, XOR…)
    ├── progress.ts           # Niveaux débloqués, salle en cours
    ├── text.ts               # Comparaison des réponses
    └── storage.ts            # Sauvegarde localStorage
```

### Ajouter du contenu

- **Une salle** : ajoute-la dans le fichier du niveau (`src/data/levels/`), avec sa carte et son énigme (`answer`, `choice` ou `phishing`). Ajoute `tools` pour afficher l'atelier de décodage.
- **Une leçon** : crée un fichier dans `src/data/lessons/` et ajoute-le à la liste dans `index.ts`.

## Branches

- `main` : version en ligne, toujours stable.
- `feat/...`, `fix/...` : une branche par fonctionnalité ou correction, fusionnée dans `main` via une pull request.

## Contribuer

Les idées d'énigmes et de cyber-cartes sont les bienvenues ! Ouvre une *issue* ou propose une *pull request*.

## Auteur

**Ceren Yikilmaz** — [@cereenade](https://github.com/cereenade)
