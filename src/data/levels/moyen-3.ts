import { toDecimal } from "@/lib/crypto";
import type { RoomContent } from "@/lib/types";

const DECIMAL = toDecimal("FORTERESSE");

/** Salles 21 à 40 du niveau Moyen. */
export const MOYEN_3: RoomContent[] = [
  {
    id: "moyen-21",
    name: "Les jumeaux d'écriture",
    story: "Deux liens « ColisExpress » semblent identiques à l'œil nu. Le pirate a utilisé une lettre d'un autre alphabet pour tromper tout le monde.",
    card: {
      title: "Les homoglyphes",
      category: "Web",
      icon: "🔠",
      summary: "Des caractères d'alphabets différents qui se ressemblent comme deux gouttes d'eau.",
      details: [
        "Le « а » cyrillique et le « a » latin sont identiques à l'écran, mais ce sont deux caractères différents.",
        "Un pirate peut ainsi enregistrer un domaine qui ressemble parfaitement au vrai.",
        "Les navigateurs affichent parfois ces domaines sous la forme « xn--… » (punycode) : un signal d'alerte.",
      ],
      hint: "Un domaine qui commence par xn-- contient des caractères spéciaux cachés.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "les deux liens, tels que le navigateur les décode",
      content: `Lien 1 : https://colis-express.fr/suivi
Lien 2 : https://xn--cols-express-3ok.fr/suivi   (affiché « colіs-express.fr »)`,
      question: "Quel lien mène au vrai site ?",
      options: [
        { label: "Le lien 1", correct: true, explanation: "Il utilise uniquement des caractères latins : c'est le vrai domaine." },
        { label: "Le lien 2", correct: false, explanation: "Le préfixe xn-- trahit un « і » cyrillique qui imite le « i »." },
        { label: "Les deux, ils sont identiques", correct: false, explanation: "À l'écran oui, pour l'ordinateur non : ce sont deux domaines différents." },
      ],
    },
    successText: "Homoglyphe démasqué. Le faux domaine est signalé.",
  },
  {
    id: "moyen-22",
    name: "Les nombres du pirate",
    story: "Sur un tableau blanc, une suite de nombres. Ce ne sont pas des maths : chaque nombre correspond à une lettre.",
    card: {
      title: "La table ASCII en décimal",
      category: "Crypto",
      icon: "🔢",
      summary: "Chaque caractère a un numéro : A = 65, B = 66… a = 97.",
      details: [
        "La table ASCII associe un nombre de 0 à 127 à chaque caractère courant.",
        "Le même caractère peut s'écrire en décimal (65), en hexadécimal (41) ou en binaire (01000001).",
        "Les malwares écrivent parfois leurs chaînes en nombres pour échapper aux recherches simples.",
      ],
      hint: "65 = A. Utilise l'étape « Décimal → texte ».",
    },
    puzzle: {
      kind: "answer",
      content: DECIMAL,
      tools: ["decimal", "hex", "binary"],
      workshopInput: DECIMAL,
      question: "Quel mot est écrit sur le tableau ?",
      answers: ["forteresse"],
    },
    successText: "FORTERESSE : le mot était caché en pleine vue.",
  },
  {
    id: "moyen-23",
    name: "Le badge et la porte",
    story: "Un stagiaire s'est connecté avec succès au portail… mais il a pu ouvrir la page des salaires. Ce n'est pas un problème d'identification.",
    card: {
      title: "Authentification et autorisation",
      category: "Défense",
      icon: "🪪",
      summary: "Prouver qui on est, puis vérifier ce qu'on a le droit de faire.",
      details: [
        "Authentification : vérifier l'identité (mot de passe, MFA). « Qui es-tu ? »",
        "Autorisation : vérifier les droits de cette identité. « As-tu le droit de faire ça ? »",
        "Beaucoup de failles viennent d'une autorisation oubliée sur une page ou une API.",
      ],
      hint: "Le stagiaire est bien lui : c'est ce qu'il a le droit de voir qui pose problème.",
    },
    puzzle: {
      kind: "choice",
      question: "Quel contrôle a échoué ?",
      options: [
        { label: "L'authentification", correct: false, explanation: "Il s'est connecté avec ses propres identifiants : son identité est correcte." },
        { label: "L'autorisation", correct: true, explanation: "Ses droits n'auraient pas dû lui permettre d'ouvrir cette page." },
        { label: "Le chiffrement", correct: false, explanation: "Le problème n'est pas la confidentialité de l'échange." },
      ],
    },
    successText: "Droits corrigés : la page des salaires est réservée aux RH.",
  },
  {
    id: "moyen-24",
    name: "Les cases à cocher",
    story: "Le formulaire de contact de l'entreprise reçoit 10 000 messages publicitaires par heure, envoyés par des robots. Que mettre en place ?",
    card: {
      title: "CAPTCHA et robots",
      category: "Web",
      icon: "🤖",
      summary: "Un test pour distinguer un humain d'un programme automatique.",
      details: [
        "Les robots remplissent les formulaires en masse : spam, création de faux comptes, force brute.",
        "Un CAPTCHA (images à cliquer, case « Je ne suis pas un robot », défi invisible) freine ces automates.",
        "Il se combine avec une limitation du nombre de requêtes par adresse IP.",
      ],
      hint: "Il faut prouver qu'on est un humain.",
    },
    puzzle: {
      kind: "choice",
      question: "Quelle protection ajouter au formulaire ?",
      options: [
        { label: "Un CAPTCHA et une limite de requêtes", correct: true, explanation: "Les robots sont freinés, les humains passent." },
        { label: "Un formulaire plus joli", correct: false, explanation: "Les robots ne regardent pas le design." },
        { label: "Supprimer le bouton Envoyer", correct: false, explanation: "Plus personne ne pourrait vous contacter." },
      ],
    },
    successText: "CAPTCHA en place : le spam chute de 99 %.",
  },
  {
    id: "moyen-25",
    name: "Les codes du serveur",
    story: "Dans le journal du serveur web, le pirate a tenté d'ouvrir la page d'administration. Le serveur lui a répondu avec un code précis.",
    card: {
      title: "Les codes de réponse HTTP",
      category: "Web",
      icon: "🔢",
      summary: "Trois chiffres qui résument la réponse du serveur.",
      details: [
        "2xx : succès (200 OK). 3xx : redirection (301, 302).",
        "4xx : erreur du client (401 non authentifié, 403 interdit, 404 introuvable).",
        "5xx : erreur du serveur (500, 503). Beaucoup de 404 d'affilée = un scan en cours.",
      ],
      hint: "Le serveur a compris la demande mais a refusé l'accès.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "access.log",
      content: `203.0.113.77 "GET /index.html"     200
203.0.113.77 "GET /wp-login.php"    404
203.0.113.77 "GET /phpmyadmin/"     404
203.0.113.77 "GET /admin/"          403
203.0.113.77 "GET /backup.zip"      404`,
      question: "Quel code a reçu le pirate sur /admin/ (accès interdit) ?",
      answers: ["403"],
    },
    successText: "403 : la page existe, mais l'accès lui a été refusé. La protection a tenu.",
  },
  {
    id: "moyen-26",
    name: "Les sous-domaines",
    story: "Le pirate a listé tous les sous-domaines de serveur-corp.fr. L'un d'eux est un vieux serveur de test oublié, jamais mis à jour.",
    card: {
      title: "L'énumération de sous-domaines",
      category: "Réseau",
      icon: "🌳",
      summary: "Lister les sous-domaines d'une cible pour trouver des serveurs oubliés.",
      details: [
        "Les attaquants trouvent les sous-domaines via le DNS, les certificats publics ou des moteurs spécialisés.",
        "Les serveurs de test ou de préproduction (test, dev, staging) sont souvent moins protégés.",
        "Tenir l'inventaire de ses sous-domaines et supprimer ceux qui ne servent plus est essentiel.",
      ],
      hint: "Cherche le sous-domaine qui sert à tester avant la mise en production.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "sous-domaines trouvés",
      content: `www.serveur-corp.fr          → site vitrine
intranet.serveur-corp.fr     → intranet (VPN obligatoire)
mail.serveur-corp.fr         → messagerie
staging-2019.serveur-corp.fr → « Version de test – ne pas utiliser »
cdn.serveur-corp.fr          → images`,
      question: "Quel sous-domaine est le serveur de test oublié ?",
      answers: ["staging-2019.serveur-corp.fr", "staging-2019"],
    },
    successText: "Serveur de test oublié éteint. Une porte d'entrée de moins.",
  },
  {
    id: "moyen-27",
    name: "L'acte de naissance du domaine",
    story: "Un mail de « Banque Horizon » a l'air parfait. Tu consultes la fiche WHOIS de son domaine, qui indique quand et par qui il a été enregistré.",
    card: {
      title: "WHOIS et âge d'un domaine",
      category: "Réseau",
      icon: "📇",
      summary: "Un domaine créé il y a quelques jours qui imite une banque est très suspect.",
      details: [
        "Le WHOIS indique la date de création d'un domaine, son registraire et parfois son propriétaire.",
        "Les domaines de phishing sont souvent créés quelques jours, voire quelques heures, avant l'attaque.",
        "Les vraies banques utilisent des domaines anciens, enregistrés depuis des années.",
      ],
      hint: "Compare la date de création avec la date d'aujourd'hui (13 novembre 2026).",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "whois banque-horizon-clients.com",
      content: `Domain Name: BANQUE-HORIZON-CLIENTS.COM
Creation Date: 2026-11-11T22:14:03Z
Registrar: Registraire-Pas-Cher Ltd
Registrant: REDACTED FOR PRIVACY`,
      question: "Que révèle cette fiche ?",
      options: [
        { label: "Le domaine est ancien et fiable", correct: false, explanation: "Il a été créé il y a deux jours." },
        { label: "Le domaine a été créé il y a deux jours : très suspect pour une banque", correct: true, explanation: "Un domaine tout neuf qui imite une banque est typique du phishing." },
        { label: "Rien, le WHOIS ne sert à rien", correct: false, explanation: "La date de création est un excellent indicateur." },
      ],
    },
    successText: "Domaine de deux jours démasqué et bloqué sur la messagerie.",
  },
  {
    id: "moyen-28",
    name: "Le tunnel",
    story: "L'admin travaille à distance depuis un hôtel. Il veut accéder à l'intranet sans que le Wi-Fi de l'hôtel puisse lire son trafic.",
    card: {
      title: "Le VPN",
      category: "Réseau",
      icon: "🚇",
      summary: "Un tunnel chiffré entre ton appareil et un serveur de confiance.",
      details: [
        "Le VPN chiffre tout le trafic entre ton appareil et le serveur VPN : le réseau local ne voit rien.",
        "En entreprise, il permet d'accéder aux ressources internes à distance.",
        "Il ne protège ni du phishing, ni des malwares, et ne rend pas anonyme.",
      ],
      hint: "Il faut un tunnel chiffré jusqu'au réseau de l'entreprise.",
    },
    puzzle: {
      kind: "choice",
      question: "Que doit utiliser l'admin ?",
      options: [
        { label: "Le VPN de l'entreprise", correct: true, explanation: "Le trafic est chiffré de bout en bout jusqu'au réseau interne." },
        { label: "La navigation privée", correct: false, explanation: "Elle n'empêche pas le Wi-Fi de voir le trafic." },
        { label: "Rien, l'hôtel est un lieu sûr", correct: false, explanation: "Un Wi-Fi d'hôtel est partagé avec des inconnus." },
      ],
    },
    successText: "Connexion via le VPN : le Wi-Fi de l'hôtel ne voit que du chiffré.",
  },
  {
    id: "moyen-29",
    name: "Le code qui change",
    story: "L'application d'authentification de l'admin affiche un code à 6 chiffres avec une petite barre qui se vide. Le pirate a volé un code… il y a 5 minutes.",
    card: {
      title: "Les codes TOTP",
      category: "Mots de passe",
      icon: "⏳",
      summary: "Des codes à usage unique qui changent toutes les 30 secondes.",
      details: [
        "TOTP = mot de passe à usage unique basé sur le temps. Le code est calculé à partir d'un secret partagé et de l'heure.",
        "Il change toutes les 30 secondes : un code volé devient vite inutile.",
        "Plus sûr qu'un SMS, qui peut être intercepté ou détourné (SIM swapping).",
      ],
      hint: "Regarde la durée de vie indiquée dans la configuration.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "configuration de l'application",
      content: `Type      : TOTP
Algorithme: SHA1
Chiffres  : 6
Période   : 30 s`,
      question: "Pendant combien de secondes un code reste-t-il valable ?",
      answers: ["30", "30 s", "30s", "30 secondes"],
    },
    successText: "Le code volé a expiré depuis longtemps. La double authentification a tenu.",
  },
  {
    id: "moyen-30",
    name: "L'annuaire local",
    story: "Sur le poste d'un employé, chaque visite de l'intranet mène vers un faux site. Le DNS est correct… le problème est sur l'ordinateur lui-même.",
    card: {
      title: "Le fichier hosts",
      category: "Système",
      icon: "📒",
      summary: "Un petit fichier qui passe avant le DNS pour traduire les noms en adresses.",
      details: [
        "Le fichier hosts (C:\\Windows\\System32\\drivers\\etc\\hosts ou /etc/hosts) associe des noms à des IP.",
        "L'ordinateur le consulte avant de demander au DNS.",
        "Un malware peut y ajouter une ligne pour rediriger un site vers un serveur pirate.",
      ],
      hint: "Cherche la ligne qui associe un domaine de l'entreprise à une IP externe.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "C:\\Windows\\System32\\drivers\\etc\\hosts",
      content: `# Fichier hosts par défaut
127.0.0.1       localhost
::1             localhost
198.51.100.66   intranet.serveur-corp.fr`,
      question: "Quel domaine est redirigé par le pirate ?",
      answers: ["intranet.serveur-corp.fr"],
    },
    successText: "Ligne supprimée du fichier hosts. L'intranet pointe à nouveau au bon endroit.",
  },
  {
    id: "moyen-31",
    name: "Le règlement",
    story: "La direction veut une nouvelle politique de mots de passe. Plusieurs règles sont proposées. Lesquelles suivent les recommandations actuelles ?",
    card: {
      title: "Une bonne politique de mots de passe",
      category: "Mots de passe",
      icon: "📜",
      summary: "Longueur, double authentification et vérification des fuites, plutôt que changements forcés.",
      details: [
        "Les recommandations récentes (ANSSI, NIST) privilégient la longueur à la complexité imposée.",
        "Forcer un changement tous les mois pousse à des mots de passe prévisibles (Été2026!, Automne2026!).",
        "On change un mot de passe quand il y a un soupçon de compromission, et on bloque ceux qui ont déjà fuité.",
      ],
      hint: "Les changements forcés réguliers ne font plus partie des recommandations.",
    },
    puzzle: {
      kind: "multi",
      question: "Quelles règles sont de bonnes pratiques ?",
      options: [
        { label: "12 caractères minimum, phrases de passe acceptées", correct: true, explanation: "La longueur est le facteur le plus important." },
        { label: "Double authentification obligatoire", correct: true, explanation: "Elle protège même si le mot de passe fuite." },
        { label: "Obligation de changer de mot de passe tous les mois", correct: false, explanation: "Cela pousse à des mots de passe prévisibles : ce n'est plus recommandé." },
        { label: "Refuser les mots de passe présents dans des fuites connues", correct: true, explanation: "Ces mots de passe sont les premiers testés par les pirates." },
        { label: "Limiter les mots de passe à 8 caractères maximum", correct: false, explanation: "Limiter la longueur affaiblit la sécurité." },
      ],
    },
    successText: "Nouvelle politique adoptée, conforme aux recommandations actuelles.",
  },
  {
    id: "moyen-32",
    name: "Le gardien des mails",
    story: "Le pirate envoie des mails au nom de serveur-corp.fr. Les enregistrements DNS du domaine indiquent aux serveurs de messagerie quoi faire de ces faux mails.",
    card: {
      title: "DMARC",
      category: "Social",
      icon: "📮",
      summary: "La règle qui dit quoi faire d'un mail qui échoue aux contrôles SPF et DKIM.",
      details: [
        "SPF liste les serveurs autorisés à envoyer pour un domaine ; DKIM signe les mails.",
        "DMARC indique la politique en cas d'échec : none (ne rien faire), quarantine (spam), reject (rejeter).",
        "p=reject est la protection la plus forte contre l'usurpation d'un domaine.",
      ],
      hint: "Cherche l'enregistrement qui commence par v=DMARC1, puis la valeur après p=.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "enregistrements DNS TXT de serveur-corp.fr",
      content: `serveur-corp.fr         TXT  "v=spf1 include:mail.serveur-corp.fr -all"
_dmarc.serveur-corp.fr  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc@serveur-corp.fr"
sel1._domainkey         TXT  "v=DKIM1; k=rsa; p=MIIBIjANBgkq..."`,
      question: "Quelle politique DMARC (valeur de p=) applique le domaine ?",
      answers: ["reject", "p=reject"],
    },
    successText: "p=reject : les faux mails du pirate sont rejetés avant d'arriver.",
  },
  {
    id: "moyen-33",
    name: "La signature de l'outil",
    story: "Le serveur web a reçu des centaines de requêtes étranges en une minute. Chaque requête indique le nom du programme qui l'a envoyée.",
    card: {
      title: "Le User-Agent",
      category: "Web",
      icon: "🏷️",
      summary: "Le champ où chaque client HTTP indique qui il est… ou prétend être.",
      details: [
        "Les navigateurs s'annoncent (Mozilla/5.0…), les outils aussi (curl, python-requests, sqlmap, nikto).",
        "Un User-Agent d'outil d'attaque dans les journaux est un indice précieux.",
        "Attention : il se falsifie très facilement, il ne prouve rien à lui seul.",
      ],
      hint: "Cherche le nom d'un outil connu pour automatiser les injections SQL.",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "access.log",
      content: `"GET /produit?id=1" 200 "Mozilla/5.0 (Windows NT 10.0) Chrome/130"
"GET /produit?id=1' AND 1=1--" 500 "sqlmap/1.8#stable (https://sqlmap.org)"
"GET /produit?id=1' UNION SELECT--" 500 "sqlmap/1.8#stable (https://sqlmap.org)"
"GET /contact" 200 "Mozilla/5.0 (iPhone) Safari/604.1"`,
      question: "Quel outil le pirate utilise-t-il ?",
      answers: ["sqlmap"],
    },
    successText: "sqlmap repéré : les requêtes sont bloquées et la faille corrigée.",
  },
  {
    id: "moyen-34",
    name: "Le voyageur impossible",
    story: "Le compte d'une commerciale s'est connecté deux fois ce matin. Les deux villes sont très éloignées… et les connexions très proches dans le temps.",
    card: {
      title: "Le voyage impossible",
      category: "Défense",
      icon: "✈️",
      summary: "Deux connexions trop éloignées pour qu'une seule personne ait pu voyager entre les deux.",
      details: [
        "Si un compte se connecte depuis Paris puis depuis Tokyo 20 minutes plus tard, l'une des deux connexions est frauduleuse.",
        "Les SOC utilisent cette règle pour repérer les identifiants volés.",
        "Attention aux faux positifs : VPN, relais d'entreprise ou téléphone en itinérance.",
      ],
      hint: "La commerciale travaille à Paris. Quelle connexion est impossible ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "connexions du compte c.leroy",
      content: `09:02  Paris, France       Chrome / Windows   succès
09:21  Sao Paulo, Brésil    Firefox / Linux    succès
09:45  Paris, France       Chrome / Windows   succès`,
      question: "Depuis quelle ville vient la connexion frauduleuse ?",
      answers: ["Sao Paulo", "São Paulo", "Sao Paulo, Brésil"],
    },
    successText: "Session de Sao Paulo révoquée, mot de passe réinitialisé.",
  },
  {
    id: "moyen-35",
    name: "Le casier judiciaire du fichier",
    story: "Tu as un fichier suspect, mais il contient peut-être des données confidentielles de l'entreprise. Comment savoir s'il est déjà connu comme malveillant ?",
    card: {
      title: "Rechercher la réputation d'un hash",
      category: "Défense",
      icon: "🔎",
      summary: "Le hash d'un fichier permet de vérifier s'il est connu, sans envoyer le fichier.",
      details: [
        "Les plateformes d'analyse en ligne gardent les résultats de millions de fichiers déjà analysés.",
        "Envoyer un fichier le rend parfois visible par d'autres utilisateurs de la plateforme.",
        "Rechercher d'abord son hash (SHA-256) évite de divulguer un document confidentiel.",
      ],
      hint: "Comment vérifier un fichier sans le partager ?",
    },
    puzzle: {
      kind: "choice",
      question: "Que fais-tu en premier ?",
      options: [
        { label: "J'envoie le fichier sur une plateforme d'analyse publique", correct: false, explanation: "Si le fichier contient des données internes, elles peuvent être exposées." },
        { label: "Je calcule son hash SHA-256 et je recherche ce hash", correct: true, explanation: "On vérifie la réputation sans divulguer le contenu." },
        { label: "Je l'ouvre pour voir ce qu'il fait", correct: false, explanation: "Jamais sur un poste de travail." },
      ],
    },
    successText: "Le hash était connu : c'est un cheval de Troie répertorié depuis un mois.",
  },
  {
    id: "moyen-36",
    name: "Le trajet d'une page",
    story: "Pour comprendre où le pirate peut intercepter le trafic, remets dans l'ordre ce qui se passe quand on ouvre https://serveur-corp.fr.",
    card: {
      title: "Le trajet d'une requête web",
      category: "Réseau",
      icon: "🛣️",
      summary: "DNS, connexion, chiffrement, puis enfin la page.",
      details: [
        "Le navigateur demande d'abord l'adresse IP du site au DNS.",
        "Il ouvre ensuite une connexion TCP (port 443), puis négocie le chiffrement TLS.",
        "Ce n'est qu'après qu'il envoie la requête HTTP et reçoit la page.",
      ],
      hint: "Avant de parler à un serveur, il faut connaître son adresse.",
    },
    puzzle: {
      kind: "order",
      question: "Remets les étapes dans l'ordre.",
      items: [
        "Requête DNS pour obtenir l'adresse IP",
        "Connexion TCP sur le port 443",
        "Négociation TLS (chiffrement et certificat)",
        "Envoi de la requête HTTP et réception de la page",
      ],
    },
    successText: "Trajet reconstitué : tu sais maintenant où chaque protection intervient.",
  },
  {
    id: "moyen-37",
    name: "Le registre des données",
    story: "La CNIL va contrôler l'entreprise. Il faut identifier lesquelles de ces informations sont des données personnelles au sens du RGPD.",
    card: {
      title: "Les données personnelles",
      category: "Défense",
      icon: "🗂️",
      summary: "Toute information qui permet d'identifier une personne, directement ou indirectement.",
      details: [
        "Nom, adresse e-mail, numéro de téléphone, mais aussi adresse IP ou identifiant client.",
        "Une donnée anonyme et agrégée (ex. une moyenne de température) n'est pas personnelle.",
        "Les données personnelles doivent être protégées, limitées au nécessaire et supprimées quand elles ne servent plus.",
      ],
      hint: "Une information qui ne concerne aucune personne précise n'est pas une donnée personnelle.",
    },
    puzzle: {
      kind: "multi",
      question: "Quelles informations sont des données personnelles ?",
      options: [
        { label: "L'adresse e-mail d'un client", correct: true, explanation: "Elle identifie directement une personne." },
        { label: "L'adresse IP d'un visiteur", correct: true, explanation: "Elle peut permettre d'identifier une personne indirectement." },
        { label: "La température moyenne à Paris en novembre", correct: false, explanation: "Elle ne concerne aucune personne." },
        { label: "Le numéro de téléphone d'un employé", correct: true, explanation: "Il identifie directement une personne." },
        { label: "Le nombre total de visiteurs du site hier", correct: false, explanation: "C'est un chiffre agrégé et anonyme." },
      ],
    },
    successText: "Registre des traitements à jour. Le contrôle de la CNIL se passera bien.",
  },
  {
    id: "moyen-38",
    name: "Le nouveau RIB",
    story: "La comptabilité reçoit trois mails de fournisseurs. L'un d'eux annonce un changement de coordonnées bancaires… et c'est le pirate.",
    card: {
      title: "La fraude au changement de RIB",
      category: "Social",
      icon: "🏦",
      summary: "Un faux fournisseur annonce un nouveau RIB pour détourner les paiements.",
      details: [
        "Le pirate imite un vrai fournisseur (parfois après avoir piraté sa messagerie) et envoie un « nouveau RIB ».",
        "Les factures suivantes sont payées sur le compte du pirate.",
        "Parade : toute modification de RIB se confirme par téléphone, au numéro déjà connu.",
      ],
      hint: "Le vrai fournisseur Bureautix utilise le domaine bureautix.fr.",
    },
    puzzle: {
      kind: "phishing",
      emails: [
        {
          id: "facture",
          fromName: "Bureautix – Facturation",
          fromAddress: "facturation@bureautix.fr",
          subject: "Facture n°F-2026-1187",
          body: "Bonjour, vous trouverez ci-joint la facture du mois d'octobre, payable comme d'habitude sur notre compte habituel.",
          linkText: "Télécharger la facture",
          linkHref: "https://espace-client.bureautix.fr/factures/F-2026-1187",
          isPhishing: false,
          explanation: "Domaine officiel, aucune modification demandée : légitime.",
        },
        {
          id: "rib",
          fromName: "Bureautix – Comptabilité",
          fromAddress: "compta@bureautix-finance.com",
          subject: "Changement de nos coordonnées bancaires – urgent",
          body: "Suite à un changement de banque, merci d'effectuer dès aujourd'hui tous vos règlements sur notre nouveau compte. L'ancien compte sera clôturé demain.",
          linkText: "Nouveau RIB",
          linkHref: "https://bureautix-finance.com/rib.pdf",
          isPhishing: true,
          explanation: "Domaine différent, urgence et nouveau RIB : c'est une fraude au changement de coordonnées bancaires.",
        },
        {
          id: "livraison",
          fromName: "Bureautix – Livraisons",
          fromAddress: "livraison@bureautix.fr",
          subject: "Votre commande de cartouches est expédiée",
          body: "Votre commande n°C-55120 a été expédiée et sera livrée jeudi.",
          linkText: "Suivre la commande",
          linkHref: "https://espace-client.bureautix.fr/commandes/C-55120",
          isPhishing: false,
          explanation: "Simple information sur le domaine officiel : légitime.",
        },
      ],
    },
    successText: "Faux RIB démasqué. Un appel au vrai fournisseur l'a confirmé.",
  },
  {
    id: "moyen-39",
    name: "Les deux installateurs",
    story: "Deux fichiers « setup_antivirus.exe » sont sur le bureau. Leurs propriétés indiquent qui les a signés numériquement.",
    card: {
      title: "La signature de code",
      category: "Système",
      icon: "✍️",
      summary: "Une signature numérique prouve l'éditeur d'un programme et qu'il n'a pas été modifié.",
      details: [
        "Les éditeurs sérieux signent leurs programmes avec un certificat délivré par une autorité reconnue.",
        "Un programme non signé ou signé par un inconnu doit éveiller la méfiance.",
        "Attention : des certificats volés existent. La signature est un indice fort, pas une preuve absolue.",
      ],
      hint: "Compare l'éditeur indiqué et l'état de la signature.",
    },
    puzzle: {
      kind: "choice",
      contentLabel: "propriétés > signatures numériques",
      content: `setup_antivirus.exe (Bureau\\Téléchargements)
  Signataire : Bouclier Logiciels SAS
  État       : Cette signature numérique est valide.

setup_antivirus(1).exe (Bureau)
  Signataire : (aucune signature)
  État       : —`,
      question: "Quel installateur est le plus digne de confiance ?",
      options: [
        { label: "Celui signé par Bouclier Logiciels SAS, avec une signature valide", correct: true, explanation: "L'éditeur est identifié et le fichier n'a pas été modifié." },
        { label: "Celui sans signature", correct: false, explanation: "Impossible de savoir qui l'a créé ni s'il a été modifié." },
        { label: "Les deux se valent", correct: false, explanation: "La signature fait toute la différence." },
      ],
    },
    successText: "L'installateur non signé contenait un cheval de Troie. Bonne pioche.",
  },
  {
    id: "moyen-40",
    name: "Le vieux protocole",
    story: "Le pare-feu a bloqué une tentative de connexion vers un vieux service qui transmet tout en clair, mots de passe compris.",
    card: {
      title: "Les protocoles en clair",
      category: "Réseau",
      icon: "📢",
      summary: "Telnet, FTP ou HTTP envoient tout en clair : n'importe qui sur le réseau peut lire.",
      details: [
        "Telnet (port 23) et FTP (port 21) transmettent identifiants et données sans chiffrement.",
        "Leurs remplaçants chiffrés : SSH (22), SFTP et HTTPS (443).",
        "Un protocole en clair encore utilisé est une faiblesse à corriger en priorité.",
      ],
      hint: "Quel ancien protocole d'administration à distance utilise le port 23 ?",
    },
    puzzle: {
      kind: "answer",
      contentLabel: "journal du pare-feu",
      content: `14:02:11 ALLOW 10.0.0.37 → 10.0.0.5:443  (HTTPS)
14:02:15 ALLOW 10.0.0.37 → 10.0.0.5:22   (SSH)
14:03:02 DENY  198.51.100.66 → 10.0.0.5:23`,
      question: "Quel protocole en clair le pirate a-t-il tenté d'utiliser (port 23) ?",
      answers: ["telnet"],
    },
    successText: "Telnet bloqué et désinstallé du serveur. Un cap est franchi, la suite t'attend !",
  },
];
