import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, order, room } from "./_build";

/** Salles 101 à 120 du niveau Très difficile. */
export const TRES_DIFFICILE_7: RoomContent[] = [
  room(
    "tres-difficile-101",
    "La vague de verrouillages",
    "Lundi, 9 h 05 : le support croule sous les appels. Des dizaines de comptes sont verrouillés en même temps. Le SOC ouvre les journaux du contrôleur de domaine.",
    card("L'événement 4740 : compte verrouillé", "Défense", "🔒", "L'ID 4740 indique qu'un compte a été verrouillé, et depuis quel poste.", [
      "Il est journalisé sur le contrôleur de domaine (souvent celui qui a le rôle PDC).",
      "Le champ « Caller Computer Name » donne le poste d'où viennent les échecs.",
      "Beaucoup de comptes verrouillés depuis un même poste : pense à une pulvérisation de mots de passe… ou à un vieux mot de passe enregistré.",
      "Croise avec les 4625 (échecs) et les 4771 (pré-authentification Kerberos refusée).",
    ], "Regarde le champ qui revient à chaque ligne."),
    answer("Depuis quel poste viennent les verrouillages ?", ["PC-COMPTA-07", "pc-compta-07", "pccompta07"], {
      content:
        "09:01:12  4740  Compte: m.durand   Caller Computer Name: PC-COMPTA-07\n09:01:15  4740  Compte: l.bernard  Caller Computer Name: PC-COMPTA-07\n09:01:19  4740  Compte: s.petit    Caller Computer Name: PC-COMPTA-07\n09:01:22  4740  Compte: a.moreau   Caller Computer Name: PC-COMPTA-07\n09:02:40  4740  Compte: j.roux     Caller Computer Name: PC-RH-02",
      contentLabel: "Journal Sécurité du contrôleur de domaine",
      placeholder: "Nom du poste",
    }),
    "PC-COMPTA-07 isolé. L'analyse confirme une pulvérisation de mots de passe : les comptes sont déverrouillés et protégés.",
  ),
  room(
    "tres-difficile-102",
    "La copie du coffre-fort",
    "3 h 12 : l'EDR remonte une commande lancée sur le contrôleur de domaine DC01. Si c'est ce que tu crois, l'attaquant vient d'emporter tous les mots de passe du domaine.",
    card("Détecter le vol de NTDS.dit", "Défense", "🗄️", "NTDS.dit contient les hachages de tous les comptes du domaine : une copie hors procédure est un incident majeur.", [
      "Le fichier est verrouillé par Windows : les attaquants passent par ntdsutil (option IFM), un cliché instantané ou une réplication.",
      "Surveille sur les contrôleurs de domaine : ntdsutil avec « ifm », la création de clichés, des copies de fichiers .dit.",
      "Le fichier SYSTEM du registre est souvent copié en même temps : il sert à déchiffrer la base.",
      "Réaction : isoler, chercher la sortie des fichiers, puis réinitialiser les mots de passe, dont krbtgt deux fois.",
    ], "Que contient le dossier créé par la commande ?"),
    choice("Comment interpréter cette commande ?", [
      ["Une copie de la base Active Directory : à traiter comme un vol de tous les hachages du domaine", true, "IFM crée une copie complète de NTDS.dit et du registre SYSTEM."],
      ["Une simple défragmentation de la base, sans risque", false, "La défragmentation ne crée pas de copie IFM dans un dossier temporaire."],
      ["Une mise à jour Windows automatique", false, "Windows Update ne lance pas ntdsutil à 3 h du matin vers C:\\Windows\\Temp."],
    ], {
      content: "Process: ntdsutil.exe\nCommandLine: ntdsutil \"ac i ntds\" \"ifm\" \"create full C:\\Windows\\Temp\\x\" q q\nUser: SERVEUR-CORP\\svc-backup\nHost: DC01",
      contentLabel: "Alerte EDR sur DC01",
    }),
    "Copie interceptée avant sa sortie. Compte svc-backup désactivé, krbtgt réinitialisé deux fois.",
  ),
  room(
    "tres-difficile-103",
    "Le tuyau invisible",
    "Sysmon remonte une série d'événements 17 et 18 sur un poste comptable. Des processus créent et ouvrent des canaux nommés. La plupart sont banals, mais l'EDR signale une communication étrange entre deux machines.",
    card("Les canaux nommés suspects", "Défense", "🔀", "Un canal nommé (named pipe) permet à des processus de discuter, même à travers le réseau : les outils d'attaque s'en servent pour se cacher.", [
      "Sysmon trace leur création (événement 17) et leur ouverture (événement 18).",
      "Windows en utilise des milliers de légitimes : il faut une référence de ce qui est normal sur ton parc.",
      "Signaux suspects : nom aléatoire, nom connu d'un outil d'administration à distance, processus inattendu (rundll32, Office), connexion depuis une autre machine via SMB.",
      "Croise toujours avec l'arbre de processus et les connexions réseau avant de conclure.",
    ], "Qui crée le canal, avec quel nom, et depuis où ?"),
    multi("Quels éléments rendent ces canaux nommés suspects ?", [
      ["Un canal au nom aléatoire créé par rundll32.exe sans ligne de commande", true, "Processus détourné et nom généré : signature classique d'un implant."],
      ["Un canal PSEXESVC créé sur un poste comptable où personne n'administre à distance", true, "Outil d'exécution à distance hors de son contexte habituel : mouvement latéral possible."],
      ["Un canal ouvert via SMB depuis un autre poste utilisateur", true, "Deux postes clients n'ont pas de raison de se parler ainsi."],
      ["Un canal créé par le service d'impression (spoolsv.exe) avec son nom habituel", false, "C'est le fonctionnement normal du spouleur."],
      ["Le simple fait qu'un événement 17 existe", false, "Windows crée des canaux en permanence : seul le contexte compte."],
    ]),
    "Le poste est isolé, l'implant identifié. Une règle de détection surveille désormais ces canaux.",
  ),
  room(
    "tres-difficile-104",
    "Le même mot de passe partout",
    "Après un incident, l'enquête montre que l'attaquant a sauté d'un poste à 300 autres en une heure. La raison : le compte administrateur local a le même mot de passe sur toutes les machines, depuis 2019.",
    card("LAPS : un mot de passe local par poste", "Défense", "🔑", "Windows LAPS donne à chaque poste un mot de passe administrateur local unique, aléatoire et changé automatiquement.", [
      "Un mot de passe local identique partout permet de rejouer la même empreinte (pass-the-hash) sur tout le parc.",
      "Windows LAPS est intégré à Windows : il génère, fait tourner et sauvegarde le mot de passe dans l'Active Directory ou Entra ID.",
      "Seuls des groupes autorisés peuvent lire le mot de passe, et chaque lecture peut être journalisée.",
      "Le mot de passe peut aussi être changé automatiquement après chaque utilisation.",
    ], "Quelle mesure casse le lien entre tous les postes ?"),
    choice("Quelle mesure empêche le mieux ce rebond d'un poste à l'autre ?", [
      ["Déployer Windows LAPS pour un mot de passe local unique et renouvelé sur chaque poste", true, "Une empreinte volée ne sert plus que sur une seule machine, et pas longtemps."],
      ["Changer le mot de passe commun une fois par an", false, "Il reste identique partout : le rebond reste possible."],
      ["Écrire le mot de passe dans un script de démarrage partagé", false, "Tout utilisateur du domaine pourrait le lire."],
      ["Renommer le compte Administrateur", false, "Ça gêne un peu les scripts, pas l'attaquant qui lit les SID."],
    ]),
    "LAPS déployé sur les 300 postes. Chaque machine garde désormais son propre secret.",
  ),
  room(
    "tres-difficile-105",
    "Le domaine détourné",
    "L'équipe réseau de serveur-corp.fr a redirigé un domaine de commande de malware vers un serveur interne inoffensif. Ce matin, le serveur piège a reçu des requêtes. À toi de trouver le poste infecté.",
    card("Le sinkhole DNS", "Défense", "🕳️", "Un sinkhole répond aux noms de domaine malveillants par une adresse contrôlée par les défenseurs : le malware ne joint plus son serveur et se dénonce.", [
      "Le résolveur DNS interne ou un pare-feu DNS (RPZ) renvoie une adresse piège au lieu de la vraie.",
      "Les postes qui interrogent ce domaine sont probablement infectés : ce sont eux qu'on isole.",
      "Attention à lire la bonne colonne : c'est le client qui pose la question qui compte, pas l'adresse renvoyée.",
      "Des chercheurs ont déjà neutralisé des campagnes entières en prenant le contrôle d'un domaine (WannaCry en 2017).",
    ], "Qui a posé la question au DNS ?"),
    answer("Quelle adresse IP interne correspond au poste infecté ?", ["10.20.4.37"], {
      content: "16/11 07:58:02 client=10.20.4.12 query=www.example.com answer=93.184.215.14\n16/11 08:01:44 client=10.20.4.37 query=update-cdn-check.example.net answer=10.99.0.53 [SINKHOLE]\n16/11 08:01:45 client=10.20.4.12 query=intranet.serveur-corp.fr answer=10.20.1.5\n16/11 08:06:44 client=10.20.4.37 query=update-cdn-check.example.net answer=10.99.0.53 [SINKHOLE]",
      contentLabel: "journal du résolveur DNS",
      placeholder: "10.x.x.x",
    }),
    "Poste 10.20.4.37 isolé et nettoyé. Le piège a fait son travail.",
  ),
  room(
    "tres-difficile-106",
    "La commande dans le conteneur",
    "Une alerte remonte du cluster Kubernetes de serveur-corp.fr. Dans le journal d'audit, un compte de service a lancé une commande dans un pod de production. Tu dois dire ce qui cloche.",
    card("Les journaux d'audit Kubernetes", "Système", "☸️", "Le journal d'audit Kubernetes enregistre chaque appel à l'API du cluster : qui, quoi, sur quelle ressource, depuis où.", [
      "Chaque ligne indique l'utilisateur ou le compte de service, le verbe (create, delete, get…), la ressource et le résultat.",
      "Signaux à surveiller : « exec » dans un pod de production, lecture de secrets, création de rôles ou de pods privilégiés.",
      "Un compte de service d'application n'a normalement aucune raison d'ouvrir un terminal dans un autre pod.",
      "La politique d'audit doit être activée et ses journaux envoyés au SIEM, hors du cluster.",
    ], "Un robot ouvre-t-il un terminal ?"),
    choice("Quel élément de ce journal doit déclencher l'enquête ?", [
      ["Le compte de service de l'appli web fait un « exec » dans le pod de la base de paiement", true, "Un compte d'application qui ouvre un shell ailleurs suggère un compte volé ou un pod compromis."],
      ["Le code de réponse 201", false, "Il indique seulement que la demande a été acceptée."],
      ["L'espace de noms s'appelle « prod »", false, "C'est le contexte, pas l'anomalie."],
      ["La ligne est écrite au format JSON", false, "C'est le format normal du journal d'audit."],
    ], {
      content: "{\"verb\":\"create\",\"user\":{\"username\":\"system:serviceaccount:prod:web-front\"},\"objectRef\":{\"resource\":\"pods\",\"subresource\":\"exec\",\"namespace\":\"prod\",\"name\":\"paiement-db-0\"},\"responseStatus\":{\"code\":201}}",
      contentLabel: "journal d'audit",
    }),
    "Jeton du compte de service révoqué, pod web isolé. Les droits « exec » sont retirés.",
  ),
  room(
    "tres-difficile-107",
    "Les requêtes DNS invisibles",
    "Le SOC de serveur-corp.fr surveille les requêtes DNS pour repérer les domaines malveillants. Mais sur certains postes, plus aucune requête n'apparaît dans les journaux : le navigateur résout désormais les noms en HTTPS, vers un résolveur public.",
    card("Le DNS over HTTPS (DoH) en entreprise", "Réseau", "🕶️", "DoH chiffre les requêtes DNS dans du HTTPS : excellent pour la vie privée, mais il peut contourner le résolveur et la surveillance de l'entreprise.", [
      "Avec DoH, une requête DNS ressemble à du trafic web ordinaire sur le port 443.",
      "Un navigateur ou un malware qui utilise un résolveur DoH externe échappe au filtrage DNS et aux journaux du SOC.",
      "En entreprise, on configure les navigateurs par stratégie pour utiliser le résolveur interne (qui peut lui-même proposer DoH).",
      "On bloque les résolveurs DoH publics connus au proxy ou au pare-feu, et on alerte sur les postes qui essaient quand même.",
    ], "Garder le chiffrement, mais vers quel résolveur ?"),
    multi("Quelles mesures rendent la visibilité au SOC sans sacrifier la sécurité ?", [
      ["Imposer par stratégie le résolveur interne dans les navigateurs", true, "Les requêtes repassent par le résolveur que le SOC journalise et filtre."],
      ["Bloquer au proxy les résolveurs DoH publics connus", true, "Un logiciel qui tente de les joindre échoue… et se signale."],
      ["Alerter quand un poste tente de joindre un résolveur DoH externe", true, "Un malware qui veut se cacher se trahit ainsi."],
      ["Interdire tout le trafic HTTPS sortant", false, "Plus personne ne pourrait travailler."],
      ["Revenir partout au DNS en clair vers Internet", false, "Tu perdrais la confidentialité sans gagner en contrôle."],
    ]),
    "Navigateurs configurés, résolveurs externes bloqués. Les requêtes DNS réapparaissent dans le SIEM.",
  ),
  room(
    "tres-difficile-108",
    "Le dépanneur que personne n'a appelé",
    "L'EDR signale l'installation d'un outil de prise en main à distance sur le poste d'une comptable. L'outil est légitime et signé… mais aucun ticket de support n'existe. Dans la ligne de commande, l'adresse du serveur de connexion est encodée.",
    card("Les outils de télémaintenance détournés (RMM)", "Défense", "🛠️", "Les attaquants installent de vrais outils de prise en main à distance : signés et connus, ils passent sous les radars des antivirus.", [
      "Ces outils (RMM) sont légitimes : ils sont signés, et l'antivirus ne les bloque pas.",
      "Les arnaques au faux support et les rançongiciels s'en servent pour garder un accès discret.",
      "Établis la liste des outils autorisés dans l'entreprise et bloque ou alerte sur tous les autres.",
      "Signaux à surveiller : installation sans ticket, serveur de connexion inconnu, exécution depuis le dossier Téléchargements.",
    ], "Décode l'adresse : à qui ce poste allait-il se connecter ?"),
    answer("Quel est le nom du serveur de connexion caché dans la commande ?", ["depannage-express.example.net"], {
      content: "C:\\Users\\compta\\Downloads\\assist_setup.exe /silent /relay=dGVuLmVscG1heGUuc3NlcnB4ZS1lZ2FubmFwZWQ=",
      contentLabel: "ligne de commande remontée par l'EDR",
      tools: ["base64", "hex", "reverse", "rot13"],
      workshopInput: "dGVuLmVscG1heGUuc3NlcnB4ZS1lZ2FubmFwZWQ=",
      placeholder: "nom.de.domaine",
    }),
    "Domaine bloqué, outil désinstallé et poste examiné. Seuls les outils de support autorisés restent permis.",
  ),
  room(
    "tres-difficile-109",
    "Le gabarit modifié",
    "Une alerte remonte sur un contrôleur de domaine : un objet très particulier de l'Active Directory a vu ses permissions changer. Toutes les heures, ces permissions sont recopiées sur les comptes les plus puissants.",
    card("La persistance via AdminSDHolder", "Défense", "🛡️", "AdminSDHolder sert de modèle de droits pour les comptes privilégiés : le modifier offre une persistance discrète.", [
      "AdminSDHolder est un objet du conteneur System de l'Active Directory.",
      "Toutes les 60 minutes, le processus SDProp recopie ses permissions sur les groupes protégés (Admins du domaine, etc.).",
      "Un attaquant qui ajoute ses droits sur AdminSDHolder les retrouve sur tous ces comptes, même après nettoyage.",
      "Détection : l'événement 5136 (modification d'objet annuaire) sur CN=AdminSDHolder doit déclencher une alerte.",
    ], "Quel objet recopie ses droits sur les comptes protégés ?"),
    choice("Que dois-tu conclure de cet événement ?", [
      ["Un compte non privilégié s'est donné des droits sur AdminSDHolder : c'est une persistance à traiter en priorité", true, "Ses droits vont être recopiés sur tous les groupes protégés : il faut retirer l'entrée et enquêter sur le compte."],
      ["C'est la tâche SDProp normale, aucune action n'est nécessaire", false, "SDProp lit AdminSDHolder ; il ne le modifie pas, et sûrement pas avec un compte de stagiaire."],
      ["Il suffit de retirer le compte du groupe Admins du domaine", false, "Il n'y est peut-être pas : ses droits viennent du modèle, qu'il faut corriger."],
    ], {
      content: "EventID 5136 - Un objet du service d'annuaire a été modifié\nCompte : SERVEUR-CORP\\stagiaire.web\nObjet DN : CN=AdminSDHolder,CN=System,DC=serveur-corp,DC=fr\nAttribut : nTSecurityDescriptor\nOpération : Valeur ajoutée\nNouvelle ACE : (A;;GA;;;S-1-5-21-…-4127)  # Contrôle total pour stagiaire.web",
      contentLabel: "journal de sécurité du contrôleur de domaine",
    }),
    "Entrée retirée d'AdminSDHolder, compte désactivé et alerte 5136 ajoutée au SOC. La porte dérobée est refermée.",
  ),
  room(
    "tres-difficile-110",
    "Le mot de passe de 2014",
    "Le compte de service svc-sauvegarde tourne sur trois serveurs. Son mot de passe n'a pas changé depuis 2014, et il est écrit dans un vieux script. L'équipe veut passer à un compte de service géré.",
    card("Les comptes de service gérés (gMSA)", "Défense", "🤖", "Un gMSA est un compte de service dont l'Active Directory change lui-même le mot de passe, long et aléatoire.", [
      "Les comptes de service classiques ont souvent des mots de passe anciens, partagés et jamais changés : une cible idéale (Kerberoasting).",
      "Avec un gMSA, l'AD génère un mot de passe de 240 caractères et le renouvelle automatiquement (tous les 30 jours par défaut).",
      "Seuls les serveurs autorisés peuvent récupérer ce mot de passe : personne n'a besoin de le connaître.",
      "La migration se fait service par service, puis l'ancien compte est désactivé.",
    ], "Et si plus personne ne connaissait le mot de passe ?"),
    order("Remets la migration vers un gMSA dans le bon ordre.", [
      "Créer la clé racine KDS du domaine (une seule fois)",
      "Créer le gMSA en autorisant uniquement les trois serveurs concernés",
      "Installer et tester le gMSA sur chaque serveur",
      "Configurer le service de sauvegarde pour qu'il tourne avec le gMSA",
      "Désactiver l'ancien compte svc-sauvegarde et effacer le mot de passe du script",
    ]),
    "Migration terminée. svc-sauvegarde est désactivé, et plus aucun mot de passe ne traîne dans les scripts.",
  ),
  room(
    "tres-difficile-111",
    "L'antivirus qui s'endort",
    "Ton SIEM remonte une rafale d'événements Microsoft Defender sur le poste PC-COMPTA-07, quelques minutes avant une alerte de chiffrement de fichiers.",
    card("La désactivation de l'antivirus (événements 5001 et 5007)", "Défense", "🛡️", "Avant de lancer leur charge, beaucoup d'attaquants coupent l'antivirus : les journaux de Defender le racontent.", [
      "5001 : la protection en temps réel a été désactivée.",
      "5007 : la configuration de Defender a changé (exclusion ajoutée, réglage modifié).",
      "Une exclusion sur C:\\Users\\Public ou un dossier temporaire juste avant une alerte est très suspecte.",
      "Défense : protection contre les modifications (Tamper Protection), alerte SIEM sur 5001/5007 hors maintenance.",
    ], "Quel événement montre l'antivirus éteint ?"),
    order("Remets dans l'ordre la séquence de l'attaque, telle que la racontent les journaux.", [
      "5007 : exclusion ajoutée sur C:\\Users\\Public",
      "5001 : protection en temps réel désactivée",
      "Création de C:\\Users\\Public\\upd.exe",
      "Alerte : renommage massif de fichiers en .locked",
    ], {
      content: "02:14:09 PC-COMPTA-07 Defender 5001 Protection en temps réel désactivée\n02:16:40 PC-COMPTA-07 Sysmon 11 Fichier créé C:\\Users\\Public\\upd.exe\n02:13:52 PC-COMPTA-07 Defender 5007 Exclusion ajoutée : C:\\Users\\Public\n02:19:03 PC-COMPTA-07 EDR Renommage massif de fichiers (.locked)",
      contentLabel: "extrait du SIEM (non trié)",
    }),
    "Poste isolé à 02:19, Tamper Protection activée partout. La prochaine tentative de couper Defender échouera.",
  ),
  room(
    "tres-difficile-112",
    "Le ticket qui voyage",
    "Le contrôleur de domaine enregistre des accès au serveur de fichiers FS-01 avec le compte de l'administratrice a.martin. Pourtant, elle est en congé, et aucune connexion par mot de passe n'apparaît.",
    card("Le pass-the-ticket Kerberos", "Système", "🎫", "Un ticket Kerberos volé en mémoire peut être réutilisé sur une autre machine, sans connaître le mot de passe.", [
      "Kerberos donne un TGT à la connexion, puis des tickets de service (TGS) pour chaque serveur.",
      "Un attaquant qui copie ces tickets depuis la mémoire d'un poste peut les rejouer ailleurs.",
      "Indices : tickets de service (4769) pour un compte depuis une adresse IP inhabituelle, sans demande de TGT (4768) associée.",
      "Défense : groupe Protected Users, Credential Guard, postes d'administration dédiés, réinitialisation des tickets du compte.",
    ], "Un ticket demandé sans connexion préalable…"),
    choice("Quel indice trahit le mieux le pass-the-ticket ?", [
      ["Des 4769 pour a.martin depuis 10.0.8.23, sans aucun 4768 depuis cette adresse", true, "Le ticket est utilisé sans avoir été obtenu normalement : il a été importé."],
      ["Un 4768 de a.martin depuis son poste habituel la semaine dernière", false, "C'est une connexion normale, avant son congé."],
      ["Un 4624 de type 2 pour le compte svc-backup", false, "Un autre compte, connecté normalement."],
    ], {
      content: "11/22 09:41 DC01 4769 Compte=a.martin Service=cifs/FS-01 IP=10.0.8.23\n11/22 09:42 DC01 4769 Compte=a.martin Service=ldap/DC01 IP=10.0.8.23\n11/22 09:40 DC01 4624 Type=2 Compte=svc-backup IP=10.0.2.5\n11/15 08:02 DC01 4768 Compte=a.martin IP=10.0.1.14",
      contentLabel: "journal de sécurité de DC01",
    }),
    "Poste 10.0.8.23 isolé, mot de passe et tickets de a.martin réinitialisés. Le ticket volé ne vaut plus rien.",
  ),
];
