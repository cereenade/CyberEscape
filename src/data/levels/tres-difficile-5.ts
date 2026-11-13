import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 61 à 80 du niveau Très difficile. */
export const TRES_DIFFICILE_5: RoomContent[] = [
  room(
    "tres-difficile-61",
    "Le faux positif",
    "L'alerte « exécution PowerShell suspecte » sonne 40 fois par jour. Chaque fois, c'est le script d'inventaire de l'équipe système.",
    card("Les faux positifs", "Défense", "🔕", "Une alerte qui se déclenche sur une activité légitime.", [
      "Trop de faux positifs épuisent les analystes : les vraies alertes finissent ignorées.",
      "On ajuste la règle (exclusion précise, par hash ou chemin signé), on ne la supprime pas.",
      "Une exclusion trop large crée un angle mort que les attaquants peuvent exploiter.",
    ], "Faut-il supprimer la règle ?"),
    choice("Quelle est la bonne réaction ?", [
      ["Ajouter une exclusion précise pour ce script (hash, signature, chemin)", true, "L'alerte reste active pour tout le reste."],
      ["Désactiver la règle", false, "Les vraies attaques PowerShell passeraient inaperçues."],
      ["Exclure tout PowerShell", false, "Un énorme angle mort pour les attaquants."],
    ]),
    "Règle ajustée. Plus de bruit, toujours la même vigilance.",
  ),
  room(
    "tres-difficile-62",
    "Trois alertes en même temps",
    "Lundi 9 h, trois alertes arrivent ensemble. Tu ne peux en traiter qu'une à la fois.",
    card("Prioriser les alertes", "Défense", "🧯", "On traite d'abord ce qui a le plus d'impact potentiel et le plus de confiance.", [
      "Criticité de l'actif (contrôleur de domaine, serveur de paie) × gravité du comportement.",
      "Une activité en cours (chiffrement, exfiltration) passe avant une tentative bloquée.",
      "Le contexte compte : un compte admin, un poste VIP, une heure inhabituelle.",
    ], "Qu'est-ce qui est en cours et sur un actif critique ?"),
    order("Classe les alertes de la plus urgente à la moins urgente.", [
      "Chiffrement massif de fichiers en cours sur le serveur de fichiers",
      "Connexion admin réussie depuis un pays inhabituel",
      "Mail de phishing bloqué par la passerelle",
    ]),
    "Priorités respectées : le chiffrement est stoppé en premier.",
  ),
  room(
    "tres-difficile-63",
    "Le guide de réponse",
    "Une alerte « phishing signalé » arrive. Au lieu d'improviser, l'analyste ouvre un document qui décrit chaque étape à suivre.",
    card("Les playbooks", "Défense", "📘", "Une procédure écrite pour répondre de façon rapide et identique à un type d'incident.", [
      "Un playbook décrit les étapes : analyse, confinement, éradication, communication.",
      "Les outils SOAR automatisent une partie des étapes (recherche du mail chez tous, blocage de l'URL…).",
      "Il évite les oublis sous la pression.",
    ], "Quel outil automatise les playbooks ?"),
    choice("Comment s'appelle la famille d'outils qui automatise ces étapes ?", [
      ["SOAR", true, "Orchestration, automatisation et réponse."],
      ["DNS", false, "Aucun rapport."],
      ["RAID", false, "Aucun rapport."],
    ]),
    "Playbook suivi, étapes automatisées. Le phishing est traité en 6 minutes.",
  ),
  room(
    "tres-difficile-64",
    "Le poste en quarantaine",
    "Un poste communique avec un serveur C2. L'utilisateur est en réunion. L'EDR propose : « Isoler l'appareil du réseau ».",
    card("Isoler un poste", "Défense", "🧪", "L'EDR coupe le poste du réseau tout en gardant le lien avec la console de sécurité.", [
      "Le poste ne peut plus parler au pirate ni contaminer les autres.",
      "L'analyste peut toujours enquêter à distance via l'EDR.",
      "On évite d'éteindre : la mémoire contient des preuves précieuses.",
    ], "Pourquoi ne pas simplement éteindre ?"),
    multi("Quels sont les avantages de l'isolement par l'EDR ?", [
      ["Le pirate perd le contrôle du poste", true, "La communication C2 est coupée."],
      ["L'infection ne peut plus se propager", true, "Le poste est coupé des autres machines."],
      ["L'analyste garde l'accès pour enquêter", true, "La console EDR reste connectée."],
      ["La mémoire est effacée", false, "Au contraire, elle est préservée car le poste reste allumé."],
    ]),
    "Poste isolé. Le pirate a perdu la main, la preuve est intacte.",
  ),
  room(
    "tres-difficile-65",
    "Le cadre d'attaque",
    "Les balises réseau ont un intervalle de 60 s avec 10 % de variation, des URL du type /jquery-3.3.1.min.js et un User-Agent forgé.",
    card("Les frameworks de C2", "Réseau", "🎛️", "Des outils comme Cobalt Strike ou Sliver pilotent les machines compromises.", [
      "Ils ont des profils de trafic personnalisables pour imiter du trafic légitime.",
      "Le délai entre les contacts (sleep) et sa variation (jitter) aident à les repérer statistiquement.",
      "Ces outils de test d'intrusion sont très utilisés par les vrais attaquants.",
    ], "Comment appelle-t-on la variation du délai ?"),
    answer("Comment appelle-t-on la variation aléatoire du délai entre deux balises ?", ["jitter", "le jitter", "gigue"], { placeholder: "Un mot anglais" }),
    "Balise identifiée malgré le jitter. Le serveur C2 est bloqué.",
  ),
  room(
    "tres-difficile-66",
    "Le parent menteur",
    "Dans l'arbre de processus, un rundll32.exe a pour parent explorer.exe. Mais Sysmon révèle qu'il a été créé par un processus Word.",
    card("L'usurpation du processus parent", "Système", "👪", "Un malware peut faire croire qu'un autre processus est son parent.", [
      "Le PPID spoofing trompe les règles basées sur la relation parent/enfant.",
      "Les journaux ETW et certains EDR gardent le vrai créateur du processus.",
      "Un rundll32 lancé par explorer sans action de l'utilisateur reste suspect.",
    ], "Le parent affiché est-il le vrai créateur ?"),
    choice("Quelle technique est utilisée ?", [
      ["L'usurpation de PPID (processus parent)", true, "Le parent affiché n'est pas le vrai créateur."],
      ["Une mise à jour normale de Windows", false, "Word ne lance pas rundll32 lors des mises à jour."],
      ["Un plantage d'explorer.exe", false, "Aucun plantage ici."],
    ]),
    "Usurpation démasquée. La règle de détection utilise désormais le vrai créateur.",
  ),
  room(
    "tres-difficile-67",
    "Le dossier Prefetch",
    "Le malware a été supprimé, mais l'analyste trouve C:\\Windows\\Prefetch\\MIMI.EXE-5B1D4A2C.pf.",
    card("Le Prefetch", "Système", "📁", "Windows garde une trace des programmes exécutés pour accélérer leur prochain lancement.", [
      "Chaque fichier .pf contient le nom du programme, le nombre d'exécutions et les dernières dates.",
      "Il reste même si le programme a été supprimé.",
      "Avec Amcache et Shimcache, il permet de prouver qu'un outil a été lancé.",
    ], "Que prouve ce fichier ?"),
    choice("Que prouve ce fichier ?", [
      ["Que MIMI.EXE a été exécuté sur ce poste", true, "Même si l'exécutable a été supprimé ensuite."],
      ["Que MIMI.EXE est toujours présent", false, "Le .pf survit à la suppression de l'exécutable."],
      ["Rien du tout", false, "C'est un artefact d'exécution précieux."],
    ]),
    "Exécution prouvée, horaires récupérés. La chronologie avance.",
  ),
  room(
    "tres-difficile-68",
    "La liste des fichiers vus",
    "Pour reconstruire ce qu'a fait l'attaquant sur un poste, l'analyste rassemble plusieurs artefacts Windows. Associe-les à ce qu'ils racontent.",
    card("Les artefacts d'exécution Windows", "Système", "🗃️", "Plusieurs traces gardées par Windows prouvent qu'un programme a été présent ou lancé.", [
      "Prefetch : programmes exécutés, dates et nombre d'exécutions.",
      "Amcache : programmes présents ou exécutés, avec leur hash SHA-1.",
      "UserAssist (registre) : programmes lancés par l'utilisateur via l'interface.",
    ], "Lequel garde le hash ?"),
    choice("Quel artefact conserve le hash SHA-1 des exécutables ?", [
      ["Amcache", true, "Il stocke chemin, date et hash."],
      ["Le fond d'écran", false, "Non."],
      ["La corbeille", false, "Elle garde les fichiers supprimés, pas les hashs d'exécution."],
    ]),
    "Hash récupéré dans Amcache et partagé comme indicateur.",
  ),
  room(
    "tres-difficile-69",
    "L'historique du navigateur",
    "Le poste a téléchargé un malware. L'analyste veut savoir depuis quelle page exactement.",
    card("Les traces du navigateur", "Système", "🌐", "L'historique, les téléchargements et le cache du navigateur sont des preuves.", [
      "Chrome et Edge stockent l'historique dans une base SQLite (fichier History).",
      "La table des téléchargements garde l'URL d'origine et la page référente.",
      "Windows ajoute aussi un flux Zone.Identifier aux fichiers téléchargés, avec l'URL source.",
    ], "Un petit flux caché accompagne les fichiers téléchargés."),
    multi("Où retrouver l'origine du fichier ?", [
      ["La table des téléchargements de l'historique du navigateur", true, "Elle garde l'URL et la page référente."],
      ["Le flux Zone.Identifier du fichier", true, "Il contient souvent l'URL de téléchargement."],
      ["Les journaux du proxy", true, "Ils montrent la requête de téléchargement."],
      ["Le planning des congés", false, "Aucun rapport."],
    ]),
    "Origine trouvée : une fausse page de mise à jour de navigateur.",
  ),
  room(
    "tres-difficile-70",
    "Le hash flou",
    "Deux échantillons de malware ont des SHA-256 différents, mais un outil indique qu'ils sont similaires à 92 %.",
    card("Le hachage flou", "Défense", "🌫️", "Un hash qui reste proche quand le fichier change un peu.", [
      "Un hash classique change totalement au moindre octet modifié.",
      "ssdeep ou TLSH donnent des empreintes comparables : on mesure une similarité.",
      "Pratique pour regrouper des variantes d'une même famille de malware.",
    ], "Un hash classique change-t-il au moindre octet modifié ?"),
    choice("Pourquoi utiliser un hachage flou ici ?", [
      ["Pour repérer des variantes proches malgré des hashs classiques différents", true, "Les attaquants modifient un peu chaque version."],
      ["Pour chiffrer le malware", false, "Le hachage ne chiffre rien."],
      ["Parce que SHA-256 est cassé", false, "SHA-256 est solide, il répond à une autre question."],
    ]),
    "Les deux échantillons sont rattachés à la même famille de malware.",
  ),
  room(
    "tres-difficile-71",
    "Le feu de circulation",
    "Le rapport de menace partagé par un partenaire porte la mention « TLP:AMBER ». Ton collègue veut le publier sur LinkedIn.",
    card("Le Traffic Light Protocol", "Défense", "🚥", "Un code couleur qui dit avec qui on peut partager une information.", [
      "TLP:RED : réservé aux destinataires présents ; TLP:AMBER : son organisation, selon le besoin.",
      "TLP:GREEN : la communauté, mais pas publiquement ; TLP:CLEAR : public.",
      "Respecter le TLP est indispensable pour garder la confiance des partenaires.",
    ], "AMBER permet-il une publication publique ?"),
    choice("Peut-il publier le rapport ?", [
      ["Non : AMBER limite le partage à son organisation, selon le besoin", true, "Seul TLP:CLEAR peut être publié."],
      ["Oui, c'est de la veille", false, "Le partenaire perdrait toute confiance."],
      ["Oui, s'il cite la source", false, "Citer la source ne change pas la restriction."],
    ]),
    "Rapport gardé en interne. La confiance du partenaire est préservée.",
  ),
  room(
    "tres-difficile-72",
    "Le format d'échange",
    "Deux SOC veulent échanger automatiquement leurs indicateurs de compromission, dans un format que leurs outils comprennent.",
    card("STIX et TAXII", "Défense", "🔁", "Un format (STIX) et un protocole (TAXII) pour partager le renseignement sur les menaces.", [
      "STIX décrit les indicateurs, campagnes, acteurs et techniques de façon structurée.",
      "TAXII transporte ces objets entre plateformes.",
      "Des plateformes comme MISP ou OpenCTI les utilisent.",
    ], "Un format + un protocole."),
    choice("Quel couple format/protocole utiliser ?", [
      ["STIX / TAXII", true, "Le standard du partage de renseignement sur les menaces."],
      ["MP3 / FTP", false, "Non."],
      ["HTML / SMTP", false, "Pas adapté au renseignement structuré."],
    ]),
    "Échange automatique en place. Chaque indicateur découvert profite aux deux SOC.",
  ),
  room(
    "tres-difficile-73",
    "Le diamant",
    "Pour décrire une intrusion, l'analyste place quatre éléments aux coins d'un losange : l'adversaire, l'infrastructure, la capacité et la victime.",
    card("Le modèle du diamant", "Défense", "💎", "Chaque événement d'intrusion relie un adversaire, une infrastructure, une capacité et une victime.", [
      "Adversaire : qui attaque ; capacité : avec quels outils ou malwares.",
      "Infrastructure : serveurs, domaines, adresses utilisés ; victime : la cible.",
      "Partir d'un coin permet de pivoter vers les autres (même infrastructure → autres victimes).",
    ], "Quatre coins."),
    multi("Quels sont les quatre sommets du modèle ?", [
      ["L'adversaire", true, "Qui attaque."],
      ["L'infrastructure", true, "Les moyens techniques utilisés."],
      ["La capacité", true, "Les outils et techniques."],
      ["La victime", true, "La cible de l'attaque."],
      ["Le budget de l'attaquant", false, "Ce n'est pas un sommet du modèle."],
    ]),
    "Intrusion modélisée. En pivotant sur l'infrastructure, trois autres victimes apparaissent.",
  ),
  room(
    "tres-difficile-74",
    "La requête de chasse",
    "Dans le SIEM, l'analyste écrit une requête pour trouver toutes les exécutions de certutil.exe avec l'argument « -urlcache ».",
    card("Les langages de requête du SIEM", "Défense", "⌨️", "KQL, SPL ou EQL permettent de fouiller des millions d'événements.", [
      "Exemple KQL : DeviceProcessEvents | where FileName =~ \"certutil.exe\" and ProcessCommandLine has \"urlcache\".",
      "On filtre, on compte, on regroupe par poste ou par utilisateur.",
      "Une bonne requête de chasse devient ensuite une règle de détection.",
    ], "Quel opérateur KQL enchaîne les étapes ?"),
    choice("Que cherche cette requête ?", [
      ["certutil utilisé pour télécharger un fichier (LOLBin)", true, "L'argument -urlcache sert à télécharger depuis une URL."],
      ["Les certificats expirés", false, "L'argument -urlcache ne sert pas à ça."],
      ["Les mots de passe des utilisateurs", false, "Non."],
    ]),
    "Trois postes trouvés. La requête devient une règle de détection permanente.",
  ),
  room(
    "tres-difficile-75",
    "L'utilisateur inhabituel",
    "La comptable télécharge d'habitude 50 Mo par jour. Hier : 12 Go depuis le partage RH, entre 22 h et minuit.",
    card("L'analyse comportementale (UEBA)", "Défense", "📊", "Repérer ce qui s'écarte du comportement habituel d'un utilisateur ou d'une machine.", [
      "On établit une base de référence : horaires, volumes, ressources consultées.",
      "Un écart fort (volume, horaire, ressource jamais consultée) déclenche une alerte.",
      "Cela détecte aussi bien un compte volé qu'une menace interne.",
    ], "Comparé à quoi ?"),
    multi("Quels écarts sont significatifs ?", [
      ["Le volume : 12 Go au lieu de 50 Mo", true, "Plus de 200 fois la normale."],
      ["L'horaire : entre 22 h et minuit", true, "Hors des heures de travail habituelles."],
      ["La ressource : le partage RH, hors de son périmètre", true, "Elle n'y accède jamais."],
      ["Elle utilise Windows", false, "Comme d'habitude."],
    ]),
    "Compte volé confirmé. L'exfiltration est stoppée.",
  ),
  room(
    "tres-difficile-76",
    "Les horloges désaccordées",
    "Pour corréler un incident, l'analyste compare les journaux du pare-feu, du serveur et du proxy. Les heures ne collent pas : 7 minutes d'écart.",
    card("La synchronisation de l'heure", "Défense", "⏰", "Sans horloges synchronisées, impossible de reconstruire une chronologie fiable.", [
      "NTP synchronise les horloges de toutes les machines sur une source commune.",
      "Kerberos refuse d'ailleurs les écarts de plus de 5 minutes par défaut.",
      "Stocke les journaux en UTC pour éviter les confusions de fuseau.",
    ], "Quel protocole synchronise les horloges ?"),
    answer("Quel protocole sert à synchroniser l'heure des machines ?", ["ntp"], { placeholder: "Sigle" }),
    "NTP configuré partout. Les journaux racontent enfin la même histoire.",
  ),
  room(
    "tres-difficile-77",
    "L'angle mort",
    "Après un incident, l'équipe découvre que le serveur compromis n'envoyait aucun journal au SIEM depuis sa migration, six mois plus tôt.",
    card("La couverture des journaux", "Défense", "🕳️", "Une source qui n'envoie pas ses journaux est un angle mort total.", [
      "On tient l'inventaire des sources attendues et on vérifie qu'elles remontent bien.",
      "Une alerte « source silencieuse depuis X heures » détecte les coupures.",
      "MITRE ATT&CK aide à vérifier quelles techniques sont réellement visibles.",
    ], "Comment savoir qu'une source s'est tue ?"),
    choice("Quelle mesure aurait évité cet angle mort ?", [
      ["Une alerte quand une source arrête d'envoyer ses journaux", true, "La coupure aurait été vue le jour même."],
      ["Plus de règles de détection", false, "Sans journaux, aucune règle ne se déclenche."],
      ["Un plus grand écran au SOC", false, "Non."],
    ]),
    "Surveillance des sources silencieuses activée.",
  ),
  room(
    "tres-difficile-78",
    "Le journal du cloud",
    "Une clé d'accès AWS a fuité. L'analyste veut savoir quelles actions ont été faites avec, et depuis quelles adresses.",
    card("CloudTrail", "Défense", "🧭", "Le journal d'audit d'AWS : qui a fait quoi, quand, d'où.", [
      "Chaque appel d'API est enregistré : utilisateur ou clé, action, IP source, résultat.",
      "On cherche par identifiant de clé (AccessKeyId) pour suivre un attaquant.",
      "Les équivalents : Azure Activity Log, Google Cloud Audit Logs.",
    ], "Le journal d'audit des appels d'API AWS."),
    choice("Où chercher ces informations ?", [
      ["Dans CloudTrail, en filtrant sur l'AccessKeyId", true, "Toutes les actions de la clé y sont listées."],
      ["Dans le journal du navigateur", false, "Les appels d'API ne passent pas par ton navigateur."],
      ["Dans la facture seulement", false, "Utile pour voir les coûts, pas les actions détaillées."],
    ]),
    "Actions retracées : l'attaquant a lancé des serveurs de minage. Clé révoquée.",
  ),
  room(
    "tres-difficile-79",
    "La clé trop puissante",
    "La clé utilisée par le script de sauvegarde a la politique « AdministratorAccess » : elle peut tout faire sur le compte cloud.",
    card("Les droits IAM excessifs", "Défense", "🎚️", "Une identité cloud ne doit avoir que les droits strictement nécessaires.", [
      "Le script n'a besoin que d'écrire dans un seul bucket de sauvegarde.",
      "Une clé admin qui fuit = tout le compte compromis.",
      "Préfère les rôles temporaires aux clés permanentes, et révise les droits régulièrement.",
    ], "De quoi le script a-t-il vraiment besoin ?"),
    choice("Quelle politique appliquer à la clé du script ?", [
      ["Écriture seulement sur le bucket de sauvegarde", true, "Si elle fuit, l'impact est minime."],
      ["AdministratorAccess pour éviter les erreurs", false, "C'est la situation actuelle, dangereuse."],
      ["Lecture sur tout le compte", false, "Bien trop large pour un script de sauvegarde."],
    ]),
    "Droits réduits au minimum. Une fuite ne serait plus une catastrophe.",
  ),
  room(
    "tres-difficile-80",
    "Les règles d'audit Linux",
    "Sur un serveur Linux sensible, l'équipe veut savoir qui modifie /etc/passwd et quand.",
    card("auditd", "Système", "🐧", "Le système d'audit de Linux journalise les accès aux fichiers et les appels système.", [
      "Une règle comme -w /etc/passwd -p wa -k identite surveille les écritures et changements d'attributs.",
      "Les événements sont consultables avec ausearch -k identite.",
      "Envoyer ces journaux au SIEM permet de corréler avec le reste.",
    ], "-w = surveiller, -p wa = écriture et attributs."),
    choice("Que fait la règle -w /etc/passwd -p wa ?", [
      ["Elle journalise les écritures et changements d'attributs de /etc/passwd", true, "w = write, a = attribute change."],
      ["Elle supprime /etc/passwd", false, "Elle observe seulement."],
      ["Elle chiffre /etc/passwd", false, "auditd ne chiffre rien."],
    ]),
    "Règle auditd en place. Toute modification des comptes est tracée.",
  ),
];
