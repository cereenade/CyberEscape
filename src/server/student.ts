import "server-only";
import { createHash } from "node:crypto";
import { getAdminSupabase } from "./supabase-admin";

/** Messageries grand public : jamais acceptées comme adresse d'école. */
const PERSONAL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "outlook.com", "outlook.fr", "hotmail.com", "hotmail.fr", "live.com", "live.fr", "msn.com",
  "yahoo.com", "yahoo.fr", "ymail.com", "icloud.com", "me.com", "mac.com", "aol.com", "proton.me", "protonmail.com",
  "pm.me", "gmx.com", "gmx.fr", "laposte.net", "orange.fr", "wanadoo.fr", "free.fr", "sfr.fr", "neuf.fr", "bbox.fr",
  "numericable.fr", "yandex.com", "mail.com", "zoho.com", "tutanota.com", "tuta.io", "yopmail.com", "yopmail.fr",
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "temp-mail.org",
]);

/** Domaines d'écoles connues qui ne suivent pas les règles générales. */
const KNOWN_SCHOOLS = [
  "sciencespo.fr", "epitech.eu", "epita.fr", "epf.fr", "efrei.net", "esiee.fr", "ece.fr", "isep.fr", "utc.fr", "utt.fr",
  "utbm.fr", "centralesupelec.fr", "centrale-marseille.fr", "ec-lyon.fr", "ec-nantes.fr", "ec-lille.fr", "mines-paristech.fr",
  "minesparis.psl.eu", "telecom-paris.fr", "telecom-sudparis.eu", "imt-atlantique.net", "imt-atlantique.fr", "ensta-paris.fr",
  "polytechnique.edu", "essec.edu", "hec.edu", "edhec.com", "em-lyon.com", "neoma-bs.com", "skema.edu", "kedgebs.com",
  "audencia.com", "grenoble-em.com", "tbs-education.org", "iscparis.com", "esme.fr", "esiea.fr", "estiam.education",
  "supinfo.com", "hetic.net", "iim.fr", "gobelins.fr", "epsi.fr", "wis.fr", "ynov.com", "cesi.fr", "viacesi.fr",
  "guardia.school", "42.fr", "psl.eu", "sorbonne-universite.fr", "u-paris.fr", "u-psud.fr", "universite-paris-saclay.fr",
  "u-bordeaux.fr", "u-pec.fr", "u-cergy.fr", "cyu.fr", "u-picardie.fr", "u-bourgogne.fr", "u-strasbg.fr", "unistra.fr",
  "unice.fr", "univ-cotedazur.fr", "umontpellier.fr", "unilim.fr", "unicaen.fr", "unilasalle.fr", "unamur.be", "ulb.be",
  "uclouvain.be", "ulg.ac.be", "uliege.be", "unige.ch", "unil.ch", "epfl.ch", "ethz.ch", "umontreal.ca", "ulaval.ca",
  "etsmtl.ca", "uqam.ca", "mcgill.ca", "insa-lyon.fr", "insa-rennes.fr", "insa-toulouse.fr", "insa-rouen.fr",
  "insa-strasbourg.fr", "insa-cvl.fr", "insa-hdf.fr", "ens.fr", "ens-lyon.fr", "ens-paris-saclay.fr", "ens-rennes.fr",
  "ac-paris.fr", "ac-versailles.fr", "ac-creteil.fr", "ac-lyon.fr", "ac-aix-marseille.fr", "ac-lille.fr", "ac-toulouse.fr",
  "ac-bordeaux.fr", "ac-nantes.fr", "ac-rennes.fr", "ac-grenoble.fr", "ac-montpellier.fr", "ac-nice.fr", "ac-strasbourg.fr",
];

/** Sous-domaines typiques des adresses étudiantes (etu.univ-xxx.fr, student.xxx.com…). */
const STUDENT_LABELS = /^(etu|etud|etudiant|etudiants|student|students|stu|eleve|eleves|edu)$/;
/** Mots qu'on retrouve dans les domaines d'établissements d'enseignement. */
const SCHOOL_WORDS = /(^|[.-])(univ|universite|university|uni|ecole|school|college|lycee|campus|academy|academie|iut|insa|ens|ensi[a-z]{0,4}|ensa[a-z]{0,4}|business-school|polytech|enseignement|education)([.-]|$)/;

const EMAIL_PATTERN = /^[^\s@]{1,64}@([a-z0-9-]+\.)+[a-z]{2,}$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Vérifie qu'une adresse ressemble à une adresse d'école ou d'université. */
export function isSchoolEmail(raw: string): boolean {
  const email = normalizeEmail(raw);
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return false;
  const domain = email.split("@")[1];
  if (PERSONAL_DOMAINS.has(domain)) return false;

  const labels = domain.split(".");
  const matches = (known: string) => domain === known || domain.endsWith(`.${known}`);
  if (KNOWN_SCHOOLS.some(matches)) return true;
  // .edu, .edu.xx, .ac.xx (ac.uk, ac.be…), et .ac.<pays>.
  if (labels.includes("edu") || (labels.length >= 3 && labels[labels.length - 2] === "ac")) return true;
  if (/^univ-|^u-/.test(labels[labels.length - 2] ?? "")) return true;
  if (labels.length >= 3 && STUDENT_LABELS.test(labels[0])) return true;
  return SCHOOL_WORDS.test(domain);
}

/** Validité d'une vérification étudiante : un an, à renouveler ensuite. */
export const STUDENT_VALIDITY_DAYS = 365;

export async function isVerifiedStudent(userId: string): Promise<boolean> {
  const admin = getAdminSupabase();
  if (!admin) return false;
  const { data } = await admin.from("student_verifications").select("verified_at, expires_at").eq("user_id", userId).maybeSingle();
  if (!data?.verified_at) return false;
  return !data.expires_at || new Date(data.expires_at as string).getTime() > Date.now();
}

/** Empreinte d'un jeton de vérification : seule l'empreinte est stockée en base. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
