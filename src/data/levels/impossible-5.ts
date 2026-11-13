import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 61 à 80 du niveau Impossible. */
export const IMPOSSIBLE_5: RoomContent[] = [
  room(
    "impossible-61",
    "La signature emballée",
    "Le service vérifie la signature d'une assertion SAML… mais lit les attributs d'un autre élément, non signé, ajouté par le pirate dans le même document.",
    card("Le contournement de signature XML", "Web", "📜", "Vérifier une signature ne suffit pas : il faut utiliser exactement les données signées.", [
      "Le pirate ajoute un second élément Assertion non signé et garde l'original signé.",
      "La signature est valide, mais l'application lit le mauvais élément.",
      "Utilise des bibliothèques SAML à jour et ne lis que les éléments couverts par la signature.",
    ], "Quel élément l'application lit-elle ?"),
    choice("Quelle est l'erreur de l'application ?", [
      ["Elle lit des données qui ne sont pas couvertes par la signature", true, "La signature valide un élément, l'application en utilise un autre."],
      ["Elle utilise une clé trop courte", false, "La clé n'est pas en cause."],
      ["Elle refuse toutes les connexions", false, "Au contraire, elle en accepte une de trop."],
    ]),
    "Bibliothèque SAML mise à jour. Seules les données signées sont utilisées.",
  ),
  room(
    "impossible-62",
    "La confusion d'algorithmes",
    "Le serveur vérifie les JWT signés en RS256 avec sa clé publique. Le pirate envoie un jeton marqué HS256, signé en HMAC… avec cette même clé publique comme secret.",
    card("La confusion d'algorithme JWT", "Crypto", "🔀", "Si le serveur fait confiance à l'algorithme indiqué dans le jeton, il peut vérifier avec la mauvaise méthode.", [
      "La clé publique est connue de tous : utilisée comme secret HMAC, elle permet de forger des jetons.",
      "Le serveur ne doit accepter que l'algorithme attendu, fixé dans sa configuration.",
      "Même logique que l'attaque « alg: none ».",
    ], "Qui doit décider de l'algorithme ?"),
    choice("Comment corriger ?", [
      ["Fixer côté serveur l'algorithme attendu (RS256) et refuser les autres", true, "Le champ alg du jeton n'est plus décisionnel."],
      ["Cacher la clé publique", false, "Elle est publique par nature, et souvent publiée."],
      ["Allonger la durée des jetons", false, "Aucun rapport."],
    ]),
    "Algorithme fixé côté serveur. Les jetons forgés sont rejetés.",
  ),
  room(
    "impossible-63",
    "La délégation sans limite",
    "Un serveur web a la « délégation Kerberos non contrainte ». Le pirate qui le contrôle force le contrôleur de domaine à s'y authentifier.",
    card("La délégation non contrainte", "Système", "🎫", "Un serveur en délégation non contrainte garde les tickets des comptes qui s'y connectent.", [
      "Si un administrateur (ou un contrôleur de domaine) s'y authentifie, son ticket peut être réutilisé.",
      "Des techniques forcent une machine à s'authentifier (coercition).",
      "Préfère la délégation contrainte ou basée sur les ressources, et protège les comptes sensibles.",
    ], "Que garde ce serveur ?"),
    choice("Pourquoi est-ce dangereux ?", [
      ["Le serveur conserve les tickets des comptes qui s'y connectent, y compris les plus privilégiés", true, "Le pirate peut les réutiliser."],
      ["Le serveur est plus lent", false, "Ce n'est pas un problème de performance."],
      ["Kerberos est désactivé", false, "Au contraire, il est utilisé."],
    ]),
    "Délégation non contrainte supprimée. Les comptes sensibles sont marqués « non délégables ».",
  ),
  room(
    "impossible-64",
    "Le modèle de certificat trop permissif",
    "Un modèle de certificat permet à tout utilisateur de choisir le nom du sujet. Le pirate demande un certificat au nom de l'administrateur du domaine.",
    card("Les failles des services de certificats", "Système", "📃", "Un modèle de certificat mal configuré permet de se faire délivrer l'identité d'un autre.", [
      "Avec ce certificat, le pirate s'authentifie comme l'administrateur (PKINIT).",
      "Ces mauvaises configurations sont nombreuses et souvent oubliées.",
      "Audite les modèles : qui peut s'inscrire, qui choisit le sujet, quels usages sont permis.",
    ], "Qui choisit le nom dans le certificat ?"),
    choice("Quelle est la correction ?", [
      ["Interdire au demandeur de choisir le sujet et restreindre l'inscription", true, "Le certificat reflète la vraie identité du demandeur."],
      ["Allonger la validité des certificats", false, "Pire encore."],
      ["Désactiver le pare-feu", false, "Non."],
    ]),
    "Modèles audités et corrigés. Le certificat de l'admin ne s'obtient plus si facilement.",
  ),
  room(
    "impossible-65",
    "Les informations d'identification fantômes",
    "Le pirate ajoute une clé dans l'attribut msDS-KeyCredentialLink d'un compte de machine. Il peut désormais s'authentifier comme cette machine.",
    card("Les Shadow Credentials", "Système", "👤", "Ajouter une clé de connexion « Windows Hello » à un compte permet de s'authentifier à sa place.", [
      "Il faut un droit d'écriture sur l'attribut du compte ciblé.",
      "Le pirate obtient alors un ticket comme s'il était ce compte.",
      "Surveille les modifications de msDS-KeyCredentialLink (événement 5136).",
    ], "Quel attribut est modifié ?"),
    choice("Comment détecter cette attaque ?", [
      ["Surveiller les modifications de l'attribut msDS-KeyCredentialLink", true, "Une modification inattendue est un signal fort."],
      ["Surveiller le fond d'écran des utilisateurs", false, "Non."],
      ["Compter les impressions", false, "Aucun rapport."],
    ]),
    "Alerte créée sur cet attribut. La porte dérobée est fermée.",
  ),
  room(
    "impossible-66",
    "Le ticket d'argent",
    "Le pirate a le hash du compte de service SQL. Il forge un ticket de service valide pour ce seul serveur, sans jamais contacter le contrôleur de domaine.",
    card("Le silver ticket", "Système", "🥈", "Un ticket de service forgé avec le hash d'un compte de service.", [
      "Contrairement au golden ticket, il ne vaut que pour un service.",
      "Le contrôleur de domaine n'est pas contacté : il est plus discret.",
      "Mots de passe longs et changés pour les comptes de service (gMSA), validation PAC.",
    ], "Quel hash a-t-il servi à forger le ticket ?"),
    choice("Quelle différence avec un golden ticket ?", [
      ["Il ne donne accès qu'à un service et ne passe pas par le contrôleur de domaine", true, "Plus limité, mais plus discret."],
      ["Il donne accès à tout le domaine", false, "Ça, c'est le golden ticket."],
      ["Il nécessite le mot de passe de l'utilisateur", false, "Il suffit du hash du compte de service."],
    ]),
    "Comptes de service passés en gMSA avec mots de passe changés automatiquement.",
  ),
  room(
    "impossible-67",
    "Le faux contrôleur",
    "Une machine s'enregistre brièvement comme contrôleur de domaine, pousse une modification dans l'annuaire, puis disparaît.",
    card("DCShadow", "Système", "🌘", "Se faire passer pour un contrôleur de domaine pour injecter des modifications dans l'annuaire.", [
      "Les modifications sont répliquées comme si elles venaient d'un vrai contrôleur.",
      "Elles échappent à une partie des journaux habituels.",
      "Détection : apparition d'objets serveur dans la configuration de l'annuaire, réplications inattendues.",
    ], "Que fait la machine pendant quelques secondes ?"),
    choice("Que permet cette technique ?", [
      ["Modifier l'annuaire discrètement en se faisant passer pour un contrôleur", true, "Les changements sont répliqués comme légitimes."],
      ["Accélérer le réseau", false, "Non."],
      ["Mettre à jour Windows", false, "Non."],
    ]),
    "Surveillance des enregistrements de contrôleurs en place.",
  ),
  room(
    "impossible-68",
    "Le passe-partout",
    "Après compromission du contrôleur de domaine, n'importe quel compte accepte désormais le mot de passe « mimikatz » en plus du sien.",
    card("La skeleton key", "Système", "🦴", "Un patch en mémoire du contrôleur de domaine qui ajoute un mot de passe universel.", [
      "Le vrai mot de passe de chacun fonctionne toujours : personne ne remarque rien.",
      "Le patch est en mémoire : il disparaît au redémarrage.",
      "Protéger LSASS (RunAsPPL) et surveiller les contrôleurs de domaine.",
    ], "Où se trouve le patch ?"),
    choice("Que se passe-t-il au redémarrage du contrôleur ?", [
      ["Le passe-partout disparaît, car il n'existait qu'en mémoire", true, "Mais l'attaquant peut revenir s'il a gardé un accès."],
      ["Il devient permanent", false, "Il vit en mémoire."],
      ["Tous les mots de passe sont effacés", false, "Non."],
    ]),
    "LSASS protégé. Le passe-partout ne peut plus être injecté.",
  ),
  room(
    "impossible-69",
    "Le pilote vulnérable",
    "Le rançongiciel installe un vieux pilote signé contenant une faille, puis l'utilise pour désactiver l'EDR depuis le noyau.",
    card("Apporter son propre pilote vulnérable", "Système", "🚗", "Utiliser un pilote légitime mais vulnérable pour obtenir des droits noyau.", [
      "Le pilote est signé : Windows accepte de le charger.",
      "Sa faille donne un accès noyau, d'où l'on peut couper les protections.",
      "Parade : liste de blocage des pilotes vulnérables de Microsoft, HVCI.",
    ], "Le pilote est-il signé ?"),
    choice("Quelle protection bloque cette technique ?", [
      ["La liste de blocage des pilotes vulnérables et HVCI", true, "Les pilotes connus comme vulnérables ne se chargent plus."],
      ["Un mot de passe administrateur plus long", false, "L'attaquant est déjà administrateur."],
      ["Un antivirus gratuit", false, "Il serait désactivé de la même façon."],
    ]),
    "Liste de blocage activée. Le pilote vulnérable ne se charge plus.",
  ),
  room(
    "impossible-70",
    "Le malware sans fichier",
    "Le malware vit uniquement en mémoire : une commande dans le registre relance un script PowerShell qui charge le code sans rien écrire sur le disque.",
    card("Les malwares sans fichier", "Système", "👻", "Ils évitent le disque pour échapper aux antivirus basés sur les fichiers.", [
      "Le code est chargé en mémoire depuis le registre, WMI ou le réseau.",
      "La détection passe par le comportement, la journalisation PowerShell et AMSI.",
      "L'analyse de la mémoire est souvent indispensable.",
    ], "Où vit le code ?"),
    multi("Quelles sources permettent de le détecter ?", [
      ["La journalisation PowerShell (4104)", true, "Le script exécuté y apparaît."],
      ["AMSI et l'EDR comportemental", true, "Ils voient le code au moment de l'exécution."],
      ["Une analyse de la mémoire vive", true, "Le code est en mémoire."],
      ["Une recherche de fichier .exe sur le disque", false, "Justement, il n'y en a pas."],
    ]),
    "Code trouvé en mémoire et dans le registre. Le malware sans fichier est éradiqué.",
  ),
  room(
    "impossible-71",
    "Le rootkit",
    "Le gestionnaire des tâches ne montre rien, mais une analyse de la mémoire depuis une autre machine révèle un processus caché qui communique avec l'extérieur.",
    card("Les rootkits", "Système", "🕳️", "Un malware qui modifie le système pour cacher sa présence.", [
      "Il peut cacher des processus, des fichiers, des clés de registre et des connexions.",
      "Les outils du système infecté mentent : il faut analyser depuis l'extérieur.",
      "Une machine compromise par un rootkit noyau se reconstruit.",
    ], "Peut-on faire confiance aux outils du système infecté ?"),
    choice("Pourquoi analyser depuis une autre machine ?", [
      ["Parce que le rootkit fait mentir les outils du système infecté", true, "Une vision extérieure n'est pas trompée."],
      ["Parce que c'est plus rapide", false, "Ce n'est pas la raison."],
      ["Ce n'est pas nécessaire", false, "Le gestionnaire des tâches n'a rien vu."],
    ]),
    "Rootkit confirmé. La machine est reconstruite depuis zéro.",
  ),
  room(
    "impossible-72",
    "Le modèle des menaces",
    "Avant de développer la nouvelle application, l'équipe passe en revue chaque flux avec une grille : usurpation, altération, répudiation, divulgation, déni de service, élévation de privilèges.",
    card("STRIDE", "Défense", "🧠", "Une méthode pour lister les menaces d'un système dès sa conception.", [
      "S : Spoofing (usurpation) ; T : Tampering (altération) ; R : Repudiation.",
      "I : Information disclosure ; D : Denial of service ; E : Elevation of privilege.",
      "Corriger à la conception coûte bien moins cher qu'après la mise en production.",
    ], "Un acronyme anglais de 6 lettres."),
    answer("Comment s'appelle cette méthode ?", ["stride"], { placeholder: "6 lettres" }),
    "Menaces identifiées avant la première ligne de code.",
  ),
  room(
    "impossible-73",
    "L'analyse de risque",
    "L'hôpital doit choisir ses priorités de sécurité avec un budget limité. L'ANSSI propose une méthode française d'analyse de risque.",
    card("EBIOS Risk Manager", "Défense", "📊", "La méthode de l'ANSSI pour identifier et traiter les risques numériques.", [
      "Elle part des valeurs métier (soins, dossiers patients) et des sources de risque.",
      "Elle construit des scénarios d'attaque réalistes et évalue leur vraisemblance.",
      "Elle aboutit à un plan de traitement priorisé.",
    ], "La méthode de l'ANSSI."),
    choice("Par quoi commence la méthode ?", [
      ["Par les valeurs métier à protéger", true, "On protège d'abord ce qui compte pour l'activité."],
      ["Par l'achat d'un pare-feu", false, "Les solutions viennent après l'analyse."],
      ["Par la liste des logiciels installés", false, "Utile plus tard, mais on part du métier."],
    ]),
    "Analyse EBIOS terminée. Le budget va aux scénarios les plus vraisemblables.",
  ),
  room(
    "impossible-74",
    "La norme",
    "Un grand client exige que l'entreprise prouve qu'elle gère la sécurité de façon organisée, avec un audit externe.",
    card("ISO 27001", "Défense", "📑", "La norme internationale des systèmes de management de la sécurité de l'information.", [
      "Elle impose une démarche : analyse de risques, mesures, contrôle, amélioration continue.",
      "L'annexe A liste des mesures de sécurité (contrôles) à appliquer selon les risques.",
      "La certification est délivrée après un audit par un organisme indépendant.",
    ], "Une norme ISO de la famille 27000."),
    answer("Quelle norme ISO est attendue ? (son numéro)", ["27001", "iso 27001", "iso/iec 27001"], { placeholder: "Numéro" }),
    "Certification ISO 27001 obtenue. Le client signe.",
  ),
  room(
    "impossible-75",
    "La directive européenne",
    "Une entreprise de gestion de l'eau apprend qu'elle doit désormais déclarer ses incidents importants rapidement aux autorités et appliquer des mesures de sécurité précises.",
    card("NIS 2", "Défense", "🇪🇺", "La directive européenne qui étend les obligations de cybersécurité à de nombreux secteurs.", [
      "Elle concerne des milliers d'entités (énergie, eau, santé, transports, numérique…).",
      "Elle impose une alerte précoce sous 24 h et une notification d'incident sous 72 h.",
      "La direction est responsable de la mise en œuvre des mesures.",
    ], "Délai d'alerte précoce ?"),
    choice("Sous quel délai faut-il envoyer une alerte précoce pour un incident important ?", [
      ["24 heures", true, "Puis une notification détaillée sous 72 heures."],
      ["1 mois", false, "Beaucoup trop long."],
      ["1 an", false, "Non."],
    ]),
    "Procédure de notification NIS 2 écrite et testée.",
  ),
  room(
    "impossible-76",
    "Le délai de la CNIL",
    "Le serveur clients a fuité : noms, adresses, numéros de téléphone. Le DPO regarde l'horloge.",
    card("La notification de violation de données", "Défense", "⏳", "Le RGPD impose de notifier la CNIL rapidement en cas de violation de données personnelles.", [
      "Notification à la CNIL dans les 72 heures après en avoir pris connaissance, sauf risque improbable pour les personnes.",
      "Si le risque est élevé, les personnes concernées doivent aussi être prévenues.",
      "Toutes les violations sont consignées dans un registre interne.",
    ], "Trois jours."),
    answer("Sous combien d'heures faut-il notifier la CNIL ?", ["72", "72h", "72 heures"], { placeholder: "Nombre d'heures" }),
    "CNIL notifiée dans les délais, clients prévenus.",
  ),
  room(
    "impossible-77",
    "Les sauvegardes inaltérables",
    "Le rançongiciel a obtenu les droits d'administrateur des sauvegardes. Il tente de les supprimer… sans succès.",
    card("Les sauvegardes immuables", "Défense", "🧊", "Des sauvegardes qui ne peuvent être ni modifiées ni supprimées pendant une période définie.", [
      "Le verrouillage (WORM, object lock) empêche la suppression, même par un administrateur.",
      "Les attaquants ciblent les sauvegardes en priorité pour forcer le paiement.",
      "Combinées à une copie hors ligne et à des tests de restauration réguliers.",
    ], "Même un administrateur peut-il les supprimer ?"),
    choice("Pourquoi la suppression a-t-elle échoué ?", [
      ["Les sauvegardes sont verrouillées en écriture pour une durée fixée", true, "Personne ne peut les supprimer avant l'échéance."],
      ["Le rançongiciel était trop lent", false, "Ce n'est pas une question de vitesse."],
      ["Les sauvegardes étaient vides", false, "Elles étaient bien là."],
    ]),
    "Restauration complète depuis les sauvegardes immuables. Pas de rançon.",
  ),
  room(
    "impossible-78",
    "La communication de crise",
    "L'attaque est publique. Les journalistes appellent, les clients s'inquiètent, les salariés posent des questions.",
    card("La communication de crise", "Défense", "📣", "En crise, ce qu'on dit compte autant que ce qu'on fait.", [
      "Un porte-parole unique, des messages factuels, pas de spéculation.",
      "Informer d'abord les personnes concernées (clients, salariés), puis le public.",
      "Ne jamais minimiser ni mentir : la confiance se perd vite et se regagne lentement.",
    ], "Combien de porte-parole ?"),
    multi("Quelles règles suivre ?", [
      ["Un porte-parole unique", true, "Un seul message cohérent."],
      ["Des faits vérifiés, sans spéculation", true, "On évite les démentis embarrassants."],
      ["Prévenir les personnes concernées en priorité", true, "Elles doivent pouvoir se protéger."],
      ["Dire que tout va bien, même si c'est faux", false, "La vérité finira par sortir."],
    ]),
    "Communication maîtrisée. La confiance des clients est préservée.",
  ),
  room(
    "impossible-79",
    "L'ordinateur quantique",
    "Un rapport avertit : « Les données chiffrées aujourd'hui pourraient être déchiffrées demain. » Le RSSI lance un inventaire de la cryptographie utilisée.",
    card("La cryptographie post-quantique", "Crypto", "⚛️", "Des algorithmes conçus pour résister aux futurs ordinateurs quantiques.", [
      "Un grand ordinateur quantique casserait RSA et les courbes elliptiques (algorithme de Shor).",
      "Les attaquants peuvent stocker des données chiffrées aujourd'hui pour les déchiffrer plus tard.",
      "Le NIST a normalisé ML-KEM et ML-DSA ; la migration commence par l'inventaire.",
    ], "Quelles familles sont menacées ?"),
    choice("Pourquoi agir dès maintenant ?", [
      ["Des données volées aujourd'hui pourraient être déchiffrées plus tard", true, "C'est l'attaque « stocker maintenant, déchiffrer plus tard »."],
      ["Les ordinateurs quantiques cassent déjà tout", false, "Pas encore, mais la migration prend des années."],
      ["AES-256 est déjà cassé", false, "Le chiffrement symétrique résiste bien avec des clés longues."],
    ]),
    "Inventaire cryptographique terminé, plan de migration post-quantique lancé.",
  ),
  room(
    "impossible-80",
    "Le secret partagé",
    "La clé maîtresse de l'entreprise est découpée en 5 parts confiées à 5 dirigeants. N'importe lesquels 3 d'entre eux peuvent la reconstituer.",
    card("Le partage de secret de Shamir", "Crypto", "🧩", "Découper un secret en n parts dont k suffisent à le reconstituer.", [
      "Avec moins de k parts, on n'apprend absolument rien sur le secret.",
      "Aucune personne seule ne peut utiliser la clé, mais la perte d'une part n'est pas fatale.",
      "Utilisé pour les clés maîtresses, les portefeuilles crypto, les HSM.",
    ], "Combien de parts sont nécessaires ?"),
    answer("Combien de dirigeants au minimum doivent se réunir ?", ["3", "trois"], { placeholder: "Un nombre" }),
    "Trois dirigeants réunis, clé reconstituée, coffre ouvert.",
  ),
];

