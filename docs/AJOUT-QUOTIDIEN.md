# Ajout quotidien de salles

Chaque jour, **10 nouvelles salles** sont ajoutées : **2 par niveau**, avec **10 nouveaux cours** (1 cours par salle, qui explique la notion de sa carte). Une tâche automatique prépare une pull request ; il reste à la relire et à la fusionner.

## Règles de contenu

- Une salle = une notion de cybersécurité **nouvelle** : son titre de carte ne doit exister nulle part ailleurs (la CI le vérifie).
- Le niveau de difficulté doit correspondre au niveau :
  - **Facile** : réflexes du quotidien (arnaques, mots de passe, téléphone, réseaux sociaux).
  - **Moyen** : lire des indices (encodages simples, réseau de base, journaux, web).
  - **Difficile** : penser comme un attaquant (failles web, crypto, Linux/Windows, réseau).
  - **Très difficile** : analyste SOC (journaux Windows, EDR, Active Directory, cloud, détection).
  - **Impossible** : expert (crypto avancée, attaques complexes, gouvernance, enquêtes en plusieurs étapes).
- Français, tutoiement, ton bienveillant, phrases courtes. Noms d'entreprises fictifs (serveur-corp.fr, example.com…).
- Uniquement de la sensibilisation et de la défense : pas de code d'exploitation réutilisable, pas de vraie adresse malveillante.
- Varier les types d'énigmes : `choice` (exactement une bonne réponse), `multi` (bonnes ET mauvaises options), `order` (au moins 3 étapes, ordre non ambigu), `answer` (réponses acceptées sans accents ni casse), `phishing` (exactement un mail piégé).
- Pour une énigme de décodage (`tools` + `workshopInput`), calculer la valeur encodée avec les fonctions de `src/lib/crypto.ts` (toBase64, toHex, toXorHex, vigenereEncode…) et vérifier qu'`applyRecipe` redonne bien la réponse.

## Où écrire

1. Les salles 41 et suivantes sont écrites avec les raccourcis de `src/data/levels/_build.ts` (`room`, `card`, `choice`, `multi`, `order`, `answer`, `phishing`).
2. Les fichiers contiennent 20 salles : `facile-4.ts` (41–60), `facile-5.ts` (61–80), `facile-6.ts` (81–100), puis `facile-7.ts` (101–120), etc.
3. Ajouter les nouvelles salles à la fin du dernier fichier du niveau. S'il contient déjà 20 salles, créer le fichier suivant et l'ajouter dans `src/data/game.ts` (import + liste `CONTENT` du niveau).
4. Les identifiants continuent la numérotation : `facile-101`, `facile-102`… La salle de sortie (`<niveau>-100`) reste automatiquement la dernière du niveau.
5. Mettre à jour `ROOM_COUNTS` dans `src/data/meta.ts` (+2 par niveau).

## Les 10 cours du jour

Pour chaque salle ajoutée, écrire un cours qui approfondit la notion de sa carte.

- Un fichier par cours dans `src/data/lessons/<slug>.ts` (type `Lesson`, modèle : `wifi.ts`). Le slug doit être nouveau.
- L'importer dans `src/data/lessons/index.ts` et l'ajouter dans la liste `ALL`, sur la ligne de son thème.
- Thème (`theme`) selon la notion : `bases`, `humain`, `web`, `crypto`, `reseau`, `systeme`, `soc`, `pentest`, `infra`, `grc`.
- Niveau (`level`) selon la salle : Facile → `debutant`, Moyen ou Difficile → `intermediaire`, Très difficile ou Impossible → `avance`.
- Au moins 3 sections, des points clés (`keyPoints`), et au moins 3 questions de quiz avec un index `correct` valide (la CI le vérifie).
- Le cours reprend l'exemple de la salle quand c'est utile. Sources officielles (RFC, ANSSI, CNIL, docs éditeurs) dans `sources` si possible.
- Mêmes règles de ton et de contenu que pour les salles.

## Vérifier

```bash
npm run typecheck
npm run check:content
```

## Git

- Branche `feat/salles-du-jour-AAAA-MM-JJ` depuis `main` à jour.
- Un commit : `feat(salles): 10 nouvelles salles et 10 cours du jour (<ids>)`.
- Ouvrir une pull request vers `main` avec la liste des 10 salles (titre et notion) et des 10 cours (slug, titre et salle associée). Ne jamais fusionner soi-même : la relecture est humaine.
