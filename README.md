# CyberEscape

> **Collectionne. Décode. Échappe-toi.**

Un pirate a pris le contrôle du serveur, et tu es enfermé dedans. Pour t'en sortir, tu dois traverser des salles piégées où chaque porte cache une énigme de cybersécurité : un mot de passe dans le code source, un message chiffré, un faux mail à démasquer.

Ton arme, ce sont les **cyber-cartes**. Tu les ramasses en explorant, chacune t'apprend une vraie notion de cyber, et ce sont elles qui te donnent les clés pour avancer. Plus tu progresses, plus ton deck grandit… et plus tu en sais.

Pas besoin d'être expert : tu apprends en jouant, à ton rythme, directement dans ton navigateur.

---

## Le jeu

| Salle | Énigme | Cyber-carte |
|---|---|---|
| 1. Le terminal d'accueil | Trouver un mot de passe oublié dans le code source | 🧾 Le code source |
| 2. La salle des messages | Déchiffrer un message codé | 🏛️ Le chiffre de César |
| 3. La boîte de réception | Démasquer un faux mail | 🎣 Le phishing |
| 4. Le coffre encodé | Décoder une chaîne cachée | 🔤 Base64 |
| 5. Le cœur du serveur | Choisir un mot de passe solide | 🔑 Les mots de passe robustes |

La progression et le deck sont sauvegardés dans le navigateur (`localStorage`).

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
├── app/                  # Pages (App Router)
│   ├── layout.tsx        # Mise en page commune
│   ├── page.tsx          # Accueil
│   ├── jeu/page.tsx      # Le jeu
│   ├── deck/page.tsx     # Collection de cyber-cartes
│   ├── not-found.tsx     # Page 404
│   └── globals.css       # Styles
├── components/
│   ├── GameProvider.tsx  # État du jeu + sauvegarde
│   ├── Game.tsx          # Enchaînement des salles
│   ├── RoomView.tsx      # Une salle : exploration, carte, énigme
│   ├── Deck.tsx          # Grille des cartes
│   ├── CyberCardView.tsx # Affichage d'une carte
│   ├── Header.tsx
│   ├── ProgressBar.tsx
│   └── puzzles/          # Un composant par type d'énigme
├── data/
│   ├── cards.ts          # Contenu des cyber-cartes
│   └── rooms.ts          # Contenu des salles et énigmes
└── lib/
    ├── types.ts          # Types partagés
    ├── crypto.ts         # César, Base64
    ├── text.ts           # Comparaison des réponses
    └── storage.ts        # Sauvegarde localStorage
```

### Ajouter une salle

1. Ajoute une carte dans `src/data/cards.ts`.
2. Ajoute une salle dans `src/data/rooms.ts` avec un `puzzle` d'un type existant (`source`, `cipher`, `phishing`, `base64`, `choice`).
3. Pour un nouveau type d'énigme : crée un composant dans `src/components/puzzles/`, ajoute le type dans `src/lib/types.ts` et branche-le dans `PuzzleRenderer.tsx`.

## Branches

- `main` : version en ligne, toujours stable.
- `feat/...`, `fix/...` : une branche par fonctionnalité ou correction, fusionnée dans `main` via une pull request.

## Contribuer

Les idées d'énigmes et de cyber-cartes sont les bienvenues ! Ouvre une *issue* ou propose une *pull request*.

## Auteur

**Ceren Yikilmaz** — [@cereenade](https://github.com/cereenade)
