import type { RoomContent } from "@/lib/types";
import { answer, card, choice, multi, room } from "./_build";

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
];
