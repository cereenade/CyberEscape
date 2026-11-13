import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 41 à 60 du niveau Impossible. */
export const IMPOSSIBLE_4: RoomContent[] = [
  room(
    "impossible-41",
    "L'oracle du rembourrage",
    "Le site renvoie « padding invalide » ou « signature invalide » selon le cookie chiffré envoyé. Le pirate envoie des milliers de variantes.",
    card("L'attaque par oracle de padding", "Crypto", "🔮", "Un message d'erreur différent selon la validité du remplissage permet de déchiffrer sans la clé.", [
      "En mode CBC, le dernier bloc est complété (padding) selon une règle précise.",
      "Si le serveur révèle si le padding est correct, on déchiffre octet par octet.",
      "Parade : chiffrement authentifié (AES-GCM) et messages d'erreur identiques.",
    ], "Que révèle la différence entre les deux messages ?"),
    choice("Quelle est la meilleure correction ?", [
      ["Passer à un chiffrement authentifié (AES-GCM) avec une erreur unique", true, "Le message modifié est rejeté avant tout déchiffrement révélateur."],
      ["Allonger la clé AES", false, "La faille ne vient pas de la longueur de clé."],
      ["Encoder le cookie en Base64", false, "Il l'est déjà sûrement, et ça ne change rien."],
    ]),
    "AES-GCM déployé. L'oracle est muet.",
  ),
  room(
    "impossible-42",
    "Le bit retourné",
    "Le cookie chiffré en AES-CBC contient « role=user ». En modifiant un octet du bloc précédent, le pirate obtient « role=admi » puis « role=admin ».",
    card("Le retournement de bits en CBC", "Crypto", "🔃", "Sans contrôle d'intégrité, modifier le chiffré modifie le clair de façon prévisible.", [
      "En CBC, un bit inversé dans un bloc inverse le même bit dans le bloc suivant après déchiffrement.",
      "Le chiffrement assure la confidentialité, pas l'intégrité.",
      "Il faut un MAC (chiffrer-puis-authentifier) ou un mode authentifié.",
    ], "Le chiffrement protège-t-il contre la modification ?"),
    choice("Quelle propriété manquait au cookie ?", [
      ["L'intégrité (authentification du message)", true, "Personne ne vérifiait que le chiffré n'avait pas été modifié."],
      ["La confidentialité", false, "Le contenu était bien chiffré."],
      ["La disponibilité", false, "Le site fonctionnait."],
    ]),
    "Cookies signés et chiffrés en mode authentifié. Plus aucun bit ne bouge.",
  ),
  room(
    "impossible-43",
    "Le nonce réutilisé",
    "Deux messages ont été chiffrés en AES-CTR avec la même clé et le même nonce. Le pirate fait un XOR des deux chiffrés.",
    card("La réutilisation de nonce", "Crypto", "♻️", "Avec un chiffrement par flot, réutiliser le nonce revient à réutiliser un masque jetable.", [
      "C1 ⊕ C2 = M1 ⊕ M2 : la clé disparaît du calcul.",
      "Avec un peu de texte connu, on retrouve les deux messages.",
      "Un nonce ne doit jamais être réutilisé avec la même clé.",
    ], "Que reste-t-il quand on XOR les deux chiffrés ?"),
    choice("Que permet le XOR des deux chiffrés ?", [
      ["Obtenir le XOR des deux messages en clair, sans la clé", true, "Le flot de clé identique s'annule."],
      ["Retrouver la clé AES directement", false, "On obtient les messages, pas la clé."],
      ["Rien du tout", false, "C'est une faille majeure."],
    ]),
    "Génération de nonces corrigée : compteur unique par message.",
  ),
  room(
    "impossible-44",
    "La signature de la console",
    "Une console de jeu signait son code avec ECDSA… en utilisant toujours le même nombre aléatoire k. Des chercheurs ont retrouvé la clé privée.",
    card("Le nonce ECDSA réutilisé", "Crypto", "🎮", "En ECDSA, réutiliser le nombre aléatoire k entre deux signatures révèle la clé privée.", [
      "Deux signatures avec le même k donnent un système d'équations soluble.",
      "La clé privée de signature est alors calculable.",
      "Solution : k déterministe (RFC 6979) ou générateur aléatoire de qualité.",
    ], "Que révèlent deux signatures avec le même k ?"),
    choice("Que pouvaient faire les chercheurs avec la clé privée ?", [
      ["Signer n'importe quel programme comme s'il venait du fabricant", true, "La console acceptait alors tout code signé."],
      ["Seulement lire les jeux", false, "C'est bien plus grave : ils signent à la place du fabricant."],
      ["Rien, la clé est inutile", false, "C'était la clé maîtresse de confiance."],
    ]),
    "Leçon apprise : l'aléatoire en crypto n'est jamais un détail.",
  ),
  room(
    "impossible-45",
    "L'exposant trop petit",
    "Un message court a été chiffré en RSA avec e = 3 et sans remplissage. Le chiffré est plus petit que le module.",
    card("RSA sans remplissage", "Crypto", "📐", "RSA « de manuel » est vulnérable : il faut toujours un remplissage comme OAEP.", [
      "Si m³ est plus petit que n, alors c = m³ exactement, sans réduction modulo n.",
      "Une simple racine cubique entière redonne le message.",
      "OAEP ajoute de l'aléa et une structure qui empêchent ces attaques.",
    ], "Si rien n'est réduit modulo n, que suffit-il de calculer ?"),
    choice("Comment retrouver le message ?", [
      ["En calculant la racine cubique entière du chiffré", true, "Le chiffré vaut exactement m³."],
      ["En factorisant le module", false, "Pas nécessaire ici."],
      ["C'est impossible", false, "Sans remplissage, c'est trivial."],
    ]),
    "RSA-OAEP utilisé partout. Les racines cubiques ne donnent plus rien.",
  ),
  room(
    "impossible-46",
    "La signature rallongée",
    "L'API signe les requêtes avec SHA-256(secret || message). Le pirate ajoute « &admin=true » à un message signé et calcule une signature valide sans connaître le secret.",
    card("L'extension de longueur", "Crypto", "📏", "Les hashs de la famille SHA-2 permettent de prolonger un message haché sans connaître le début.", [
      "SHA-256(secret || message) n'est pas un bon code d'authentification.",
      "Le hash final donne l'état interne : on peut continuer à hacher des données ajoutées.",
      "Utilise HMAC, conçu pour résister à cette attaque.",
    ], "Quelle construction est faite pour authentifier avec un hash ?"),
    answer("Quelle construction faut-il utiliser à la place ? (sigle)", ["hmac"], { placeholder: "4 lettres" }),
    "Signatures passées en HMAC-SHA256. L'extension de longueur échoue.",
  ),
  room(
    "impossible-47",
    "Le hasard prévisible",
    "Les jetons de session sont générés avec Math.random() initialisé sur l'heure du démarrage du serveur. Le pirate prédit les prochains.",
    card("Les générateurs aléatoires faibles", "Crypto", "🎰", "Pour la sécurité, il faut un générateur cryptographiquement sûr.", [
      "Math.random(), rand() ou Random() sont prévisibles une fois quelques sorties observées.",
      "Une graine basée sur l'heure se devine facilement.",
      "Utilise crypto.getRandomValues, secrets (Python) ou SecureRandom.",
    ], "Quel générateur est conçu pour la crypto ?"),
    choice("Quel générateur utiliser pour des jetons ?", [
      ["crypto.getRandomValues (ou équivalent cryptographique)", true, "Imprévisible même en observant les sorties."],
      ["Math.random() avec une meilleure graine", false, "L'algorithme reste prévisible."],
      ["L'heure en millisecondes", false, "Totalement prévisible."],
    ]),
    "Jetons générés par un CSPRNG. Plus rien à prédire.",
  ),
  room(
    "impossible-48",
    "Le processeur bavard",
    "Un programme sans aucun droit lit des données du noyau en mesurant le temps d'accès au cache après des exécutions spéculatives.",
    card("Les attaques par exécution spéculative", "Système", "⚡", "Spectre et Meltdown exploitent les optimisations des processeurs pour lire de la mémoire interdite.", [
      "Le processeur exécute en avance des instructions, puis annule… mais le cache garde une trace.",
      "En mesurant les temps d'accès au cache, on déduit les données lues.",
      "Corrections : microcode, systèmes d'exploitation et compilateurs mis à jour.",
    ], "Quelle trace reste après l'annulation ?"),
    choice("Quel canal révèle les données ?", [
      ["Le temps d'accès au cache du processeur", true, "C'est un canal auxiliaire temporel."],
      ["Le bruit du ventilateur", false, "Pas dans cette attaque."],
      ["Le fichier d'échange", false, "Les données ne passent pas par là."],
    ]),
    "Microcode et noyau mis à jour sur tout le parc.",
  ),
  room(
    "impossible-49",
    "La mémoire martelée",
    "En lisant très rapidement certaines lignes de mémoire, un programme fait basculer des bits dans des lignes voisines qu'il n'a pas le droit de modifier.",
    card("Rowhammer", "Système", "🔨", "Accéder intensément à une ligne de DRAM peut perturber électriquement les lignes voisines.", [
      "Des bits basculent dans la mémoire d'autres processus ou du noyau.",
      "Des chercheurs en ont tiré des élévations de privilèges.",
      "Mémoire ECC et rafraîchissements plus fréquents réduisent le risque.",
    ], "Un marteau sur la mémoire."),
    answer("Comment s'appelle cette attaque ?", ["rowhammer", "row hammer"], { placeholder: "Un mot anglais" }),
    "Serveurs équipés de mémoire ECC. Les bits restent en place.",
  ),
  room(
    "impossible-50",
    "La mémoire gelée",
    "Le pirate vole un portable en veille, refroidit les barrettes de mémoire et les place dans un autre ordinateur pour lire la clé de chiffrement du disque.",
    card("L'attaque par démarrage à froid", "Système", "🧊", "La mémoire vive garde ses données quelques secondes à minutes après coupure, plus longtemps si elle est froide.", [
      "Les clés de chiffrement du disque sont en mémoire quand la machine est allumée ou en veille.",
      "Refroidie, la RAM conserve ses données assez longtemps pour être lue ailleurs.",
      "Parades : hibernation ou extinction plutôt que veille, code PIN au démarrage (TPM + PIN).",
    ], "Veille ou extinction ?"),
    multi("Quelles mesures limitent ce risque ?", [
      ["Éteindre ou mettre en veille prolongée plutôt qu'en veille", true, "Les clés quittent la mémoire."],
      ["Exiger un PIN au démarrage en plus du TPM", true, "Sans PIN, la clé n'est pas libérée."],
      ["Mettre un autocollant sur le portable", false, "Aucun effet."],
      ["Laisser l'ordinateur en veille dans la voiture", false, "C'est exactement la situation à risque."],
    ]),
    "BitLocker avec PIN au démarrage et hibernation par défaut.",
  ),
  room(
    "impossible-51",
    "La femme de chambre",
    "Le portable chiffré est resté seul dans une chambre d'hôtel. Quelqu'un a pu modifier le chargeur de démarrage pour capturer le mot de passe au prochain allumage.",
    card("L'attaque de la femme de chambre", "Système", "🛏️", "Un accès physique bref permet de piéger un appareil chiffré.", [
      "Le disque est chiffré, mais le chargeur de démarrage ne l'est pas toujours.",
      "Le Secure Boot et le TPM détectent les modifications de la chaîne de démarrage.",
      "Ne jamais laisser un appareil sensible sans surveillance en déplacement.",
    ], "Qu'est-ce qui vérifie la chaîne de démarrage ?"),
    choice("Quelle protection détecte ce piège ?", [
      ["Secure Boot et mesure de démarrage par le TPM", true, "Une chaîne de démarrage modifiée est détectée."],
      ["Un mot de passe plus long", false, "Il serait capturé de la même façon."],
      ["Un antivirus installé sur le disque chiffré", false, "Il démarre après le chargeur piégé."],
    ]),
    "Secure Boot activé, TPM configuré. Le chargeur modifié refuse de démarrer.",
  ),
  room(
    "impossible-52",
    "Le clavier en plastique",
    "Une clé USB trouvée sur le parking est branchée. En une seconde, une fenêtre s'ouvre et des commandes se tapent toutes seules.",
    card("Les clés USB qui se font passer pour un clavier", "Système", "⌨️", "Un périphérique HID malveillant tape des commandes plus vite qu'un humain.", [
      "L'ordinateur fait confiance aux claviers : aucune alerte n'est affichée.",
      "Des centaines de caractères par seconde ouvrent un terminal et téléchargent un malware.",
      "Parades : ne pas brancher l'inconnu, bloquer les nouveaux périphériques HID par stratégie.",
    ], "Pour l'ordinateur, c'est quel type de périphérique ?"),
    choice("Pourquoi l'antivirus n'a-t-il rien vu à l'insertion ?", [
      ["La clé s'est présentée comme un clavier, pas comme un stockage", true, "Les frappes clavier ne sont pas analysées comme des fichiers."],
      ["L'antivirus était en pause", false, "Ce n'est pas la raison."],
      ["La clé était vide", false, "Elle contenait un microcontrôleur programmé."],
    ]),
    "Contrôle des périphériques USB déployé. Les faux claviers sont bloqués.",
  ),
  room(
    "impossible-53",
    "Le bootkit",
    "Le malware survit à la réinstallation complète de Windows et même au remplacement du disque dur.",
    card("Les implants de firmware", "Système", "🧬", "Un malware logé dans le firmware (UEFI) s'exécute avant le système d'exploitation.", [
      "Il se trouve dans la puce de la carte mère, pas sur le disque.",
      "Il survit aux réinstallations et aux changements de disque.",
      "Secure Boot, mises à jour du firmware et vérification de son intégrité sont indispensables.",
    ], "Qu'est-ce qui ne change pas quand on remplace le disque ?"),
    choice("Où se cache le malware ?", [
      ["Dans le firmware UEFI de la carte mère", true, "Il démarre avant Windows."],
      ["Dans la corbeille", false, "Elle serait vidée par la réinstallation."],
      ["Dans l'écran", false, "Non."],
    ]),
    "Firmware reflashé depuis une source sûre, carte mère remplacée par précaution.",
  ),
  room(
    "impossible-54",
    "La dépendance interne",
    "L'entreprise utilise un paquet interne « corp-utils ». Un pirate publie « corp-utils » en version 99.0 sur le registre public npm. Le pipeline l'installe.",
    card("La confusion de dépendances", "Système", "🔀", "Un paquet public au même nom qu'un paquet interne, mais avec un numéro de version plus élevé.", [
      "Certains gestionnaires préfèrent la version la plus haute, quel que soit le registre.",
      "Le paquet du pirate s'exécute pendant l'installation, dans le pipeline.",
      "Parades : espaces de noms réservés (@corp/), registre unique configuré, versions verrouillées.",
    ], "Pourquoi la version 99.0 ?"),
    multi("Quelles mesures empêchent cette attaque ?", [
      ["Utiliser un espace de noms réservé (@corp/…)", true, "Personne d'autre ne peut publier sous ce nom."],
      ["Configurer un seul registre pour les paquets internes", true, "Le registre public n'est plus consulté pour eux."],
      ["Verrouiller les versions et les hashs (lockfile)", true, "Une nouvelle version n'est pas prise automatiquement."],
      ["Donner des noms très longs aux paquets", false, "Le pirate copierait le nom quand même."],
    ]),
    "Espace de noms réservé et registre unique. La confusion est impossible.",
  ),
  room(
    "impossible-55",
    "La liste des ingrédients",
    "Une nouvelle faille critique touche une bibliothèque de compression. En 5 minutes, l'équipe sait quels logiciels de l'entreprise l'embarquent.",
    card("Le SBOM", "Défense", "🧾", "La liste complète des composants logiciels d'une application, comme une liste d'ingrédients.", [
      "Formats courants : SPDX et CycloneDX.",
      "Il permet de savoir immédiatement si une faille nous concerne.",
      "Il est de plus en plus exigé par la réglementation (Cyber Resilience Act).",
    ], "Une liste d'ingrédients logiciels, en 4 lettres."),
    answer("Comment s'appelle cette liste de composants ? (sigle)", ["sbom"], { placeholder: "4 lettres" }),
    "Grâce aux SBOM, les 3 logiciels concernés sont corrigés le jour même.",
  ),
  room(
    "impossible-56",
    "L'objet pollué",
    "En envoyant {\"__proto__\": {\"isAdmin\": true}} à une API Node.js, tous les objets de l'application se retrouvent avec isAdmin = true.",
    card("La pollution de prototype", "Web", "🧪", "En JavaScript, modifier le prototype commun modifie tous les objets.", [
      "Une fusion d'objets naïve copie la clé spéciale __proto__.",
      "Toutes les vérifications du type if (user.isAdmin) deviennent vraies.",
      "Parades : refuser __proto__, constructor et prototype ; utiliser Object.create(null) ou Map.",
    ], "Quelle clé spéciale touche à tous les objets ?"),
    choice("Quelle clé faut-il filtrer ?", [
      ["__proto__ (ainsi que constructor et prototype)", true, "Ce sont les portes vers le prototype commun."],
      ["isAdmin seulement", false, "Le pirate pourrait polluer n'importe quelle autre propriété."],
      ["Toutes les clés en majuscules", false, "Aucun rapport."],
    ]),
    "Fusion sécurisée. Le prototype reste propre.",
  ),
  room(
    "impossible-57",
    "Les deux serveurs en désaccord",
    "Le proxy lit la longueur de la requête avec Content-Length, le serveur derrière avec Transfer-Encoding. Le pirate glisse une seconde requête cachée dans la première.",
    card("Le HTTP request smuggling", "Web", "🚢", "Deux serveurs qui découpent les requêtes différemment permettent d'en cacher une.", [
      "Le proxy voit une requête ; le serveur final en voit deux.",
      "La requête cachée contourne les contrôles du proxy, ou empoisonne la réponse d'un autre visiteur.",
      "Parades : même interprétation partout, rejet des requêtes ambiguës, HTTP/2 de bout en bout.",
    ], "Deux façons de mesurer la longueur d'une requête."),
    choice("Quelle est la cause de la faille ?", [
      ["Le proxy et le serveur n'interprètent pas la longueur de la même façon", true, "Content-Length contre Transfer-Encoding."],
      ["Le serveur est trop lent", false, "Ce n'est pas une question de vitesse."],
      ["Le site n'a pas de favicon", false, "Non."],
    ]),
    "Requêtes ambiguës rejetées partout. Plus rien ne passe en contrebande.",
  ),
  room(
    "impossible-58",
    "Le cache empoisonné",
    "Le pirate envoie une requête avec l'en-tête X-Forwarded-Host: pirate.example. La réponse, qui charge un script depuis cet hôte, est mise en cache et servie à tous.",
    card("L'empoisonnement de cache web", "Web", "☣️", "Faire mettre en cache une réponse piégée qui sera servie aux autres visiteurs.", [
      "Le cache ne tient compte que de l'URL, pas d'un en-tête qui modifie pourtant la réponse.",
      "Tous les visiteurs reçoivent alors la version piégée.",
      "Parades : ne pas utiliser d'en-têtes non fiables dans la réponse, ou les inclure dans la clé de cache.",
    ], "Le cache tient-il compte de cet en-tête ?"),
    choice("Quelle correction est la plus robuste ?", [
      ["Ignorer les en-têtes non fiables dans la génération de la page", true, "La réponse ne dépend plus d'un en-tête contrôlé par le pirate."],
      ["Vider le cache une fois par an", false, "L'empoisonnement recommencerait aussitôt."],
      ["Désactiver HTTPS", false, "Pire encore."],
    ]),
    "En-têtes non fiables ignorés. Le cache ne sert plus que des pages saines.",
  ),
  room(
    "impossible-59",
    "La redirection détournée",
    "Le fournisseur d'identité accepte toute adresse de retour commençant par https://app.example. Le pirate utilise https://app.example.pirate.example/callback.",
    card("Les redirect_uri OAuth mal vérifiées", "Web", "↪️", "Une adresse de retour mal contrôlée envoie le code d'autorisation au pirate.", [
      "Le code (ou jeton) OAuth part vers l'adresse de retour indiquée.",
      "Une vérification par préfixe ou par motif est contournable.",
      "Il faut une correspondance exacte avec une liste enregistrée, et PKCE.",
    ], "Préfixe ou correspondance exacte ?"),
    choice("Quelle vérification fallait-il faire ?", [
      ["Une correspondance exacte avec les adresses enregistrées", true, "Aucune variante ne passe."],
      ["Vérifier que l'adresse contient « app »", false, "Encore plus facile à contourner."],
      ["Vérifier que l'adresse est en HTTPS", false, "Le pirate a aussi un certificat."],
    ]),
    "Correspondance exacte et PKCE. Le code ne part plus chez le pirate.",
  ),
  room(
    "impossible-60",
    "Le coffre à trois serrures",
    "Le pirate a laissé un message dans le coffre. Note collée dessus : « hex, puis base64, puis rot13 ».",
    card("Les couches d'encodage", "Crypto", "🧅", "On défait les couches une par une, dans l'ordre indiqué.", [
      "Repère chaque format : paires hexadécimales, alphabet Base64, texte décalé.",
      "L'atelier enchaîne les opérations comme une recette.",
      "Aucune couche n'utilise de clé : c'est de l'obscurité, pas de la sécurité.",
    ], "Applique les trois opérations dans l'ordre de la note."),
    answer("Quel est le message final ?", ["persistance"], {
      tools: ["hex", "base64", "rot13", "reverse", "atbash"],
      workshopInput: "59 33 4a 6c 5a 6e 5a 6d 5a 32 35 68 63 48 49 3d",
      placeholder: "Le message",
    }),
    "« persistance » : le prochain thème de ton enquête.",
  ),
];
