// Congrès : opportunités de la catégorie CONGRES. Leurs informations
// détaillées sont rangées dans la liste des conditions, une ligne par
// information, au format « Libellé : valeur » (voir prisma/data/congres.json).

export const CONGRESS_PROCEDURE_SLUG = "participation-congres";

export function isCongressProcedure(slug: string) {
  return slug === CONGRESS_PROCEDURE_SLUG;
}

// Une condition de la forme « Libellé : https://… » s'affiche comme un lien
export const linkRequirementPattern = /^(.+?)\s:\s(https:\/\/\S+)$/;

export interface CongressLink {
  label: string;
  href: string;
}

export interface CongressInfo {
  id: string;
  title: string;
  venue: string;
  city: string;
  country: string;
  startDate: string | null;
  dates: string | null;
  organizer: string | null;
  // true : ouvertes, false : pas encore ouvertes, null : non précisé
  registrationOpen: boolean | null;
  registrationLink: CongressLink | null;
  membershipLink: CongressLink | null;
  websiteLink: CongressLink | null;
}

interface CongressRow {
  id: string;
  title: string;
  hospital: string;
  location: string;
  country: string;
  deadline: Date | null;
  requirements: string[];
}

function textAfter(lines: string[], label: string) {
  const prefix = `${label} : `;
  const line = lines.find((item) => item.startsWith(prefix));
  return line ? line.slice(prefix.length).trim() : null;
}

function linkFor(lines: string[], labels: string[]): CongressLink | null {
  for (const line of lines) {
    const match = linkRequirementPattern.exec(line);
    if (match && labels.includes(match[1])) {
      return { label: match[1], href: match[2] };
    }
  }
  return null;
}

export function getCongressInfo(row: CongressRow): CongressInfo {
  const lines = row.requirements;
  return {
    id: row.id,
    title: row.title,
    venue: row.hospital,
    city: row.location,
    country: row.country,
    startDate: row.deadline ? row.deadline.toISOString() : null,
    dates: textAfter(lines, "Dates"),
    organizer: textAfter(lines, "Organisé par"),
    registrationOpen: lines.includes("Inscriptions ouvertes")
      ? true
      : lines.includes("Inscriptions pas encore ouvertes")
        ? false
        : null,
    registrationLink: linkFor(lines, [
      "S'inscrire au congrès",
      "Page du congrès",
    ]),
    membershipLink: linkFor(lines, ["Adhérer à la société"]),
    websiteLink: linkFor(lines, ["Site officiel de la société"]),
  };
}

// Recherche du lieu sur une carte, pour réserver un hôtel à proximité
export function getCongressMapUrl(congress: CongressInfo) {
  const place = congress.venue.startsWith("Lieu à confirmer")
    ? congress.city
    : `${congress.venue}, ${congress.city}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place}, ${congress.country}`
  )}`;
}
