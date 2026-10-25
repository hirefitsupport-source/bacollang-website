// Course catalogue as listed on the college's flyer and campus signage.
// Optional fields (duration, fees, etc.) are left undefined until the college
// confirms them; the detail page only renders fields that are present.
import type { Locale } from "../i18n";

export type Course = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  featured?: boolean;
  overview?: string;
  objectives?: string[];
  content?: string[];
  requirements?: string[];
  duration?: string;
  delivery?: string;
  fees?: string;
  certificate?: string;
  /** Card background; defaults to the category image. */
  image?: string;
};

// Courses with their own card photo, at /images/courses/<slug>.jpg.
const ownImage = new Set(["banking-and-finance", "marketing-management", "human-resource-management", "project-management"]);

const c = (
  title: string,
  category: string,
  summary: string,
  featured = false,
): Course => ({
  ...withSlug(title),
  title,
  category,
  summary,
  featured,
});

function withSlug(title: string) {
  const slug = title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return { slug, image: ownImage.has(slug) ? `/images/courses/${slug}.jpg` : undefined };
}

export const courses: Course[] = [
  // Business & Management
  c("Business Administration", "business-management", "Core principles of organising, running and growing a business.", true),
  c("Marketing Management", "business-management", "Plan and manage marketing activity for products and services.", true),
  c("Sales Management & Marketing", "business-management", "Lead sales teams and connect sales with marketing strategy."),
  c("Human Resource Management", "business-management", "Recruitment, people development and workplace relations.", true),
  c("Project Management", "business-management", "Plan, execute and close projects on scope, time and budget.", true),
  c("Office Management", "business-management", "Organise office operations, records and administrative workflows."),
  c("Management Studies", "business-management", "A broad grounding in management theory and practice."),
  c("Commercial Management", "business-management", "Contracts, commercial risk and value in business dealings."),

  // Finance & Accounting
  c("Accounting and Finance", "finance-accounting", "Financial records, reporting and the basics of financial management.", true),
  c("Banking and Finance", "finance-accounting", "How banks operate and the principles of financial services."),

  // Logistics & Supply Chain
  c("Procurement and Supply", "logistics-supply-chain", "Sourcing, purchasing and supplier management."),
  c("Logistics and Supply Chain Management", "logistics-supply-chain", "Manage the flow of goods from supplier to customer.", true),
  c("Logistics and Transport Management", "logistics-supply-chain", "Transport planning and logistics operations."),

  // Health & Safety
  c("Health and Safety Management", "health-safety", "Identify hazards and manage safety in the workplace."),
  c("Occupational Health and Safety", "health-safety", "Protect the health and wellbeing of people at work."),
  c("Quality Health, Safety and Environmental Management", "health-safety", "Integrated QHSE practice for organisations."),

  // Oil, Gas & Mining
  c("Oil and Gas Management", "oil-gas-mining", "An introduction to managing in the oil and gas sector."),
  c("Mining Operations", "oil-gas-mining", "Key processes and management of mining operations."),
  c("Mineral Economics", "oil-gas-mining", "The economics of mineral resources and markets."),

  // Maritime & Aviation
  c("Maritime Management", "maritime-aviation", "Management in shipping, ports and maritime business."),
  c("Aviation", "maritime-aviation", "An introduction to the aviation industry."),

  // Media & Communication
  c("Journalism and Media Studies", "media-communication", "Reporting, writing and the role of media in society."),
  c("Public Speaking", "media-communication", "Speak with clarity and confidence to any audience."),
  c("Translation and Interpretation", "media-communication", "Convey meaning accurately between languages."),
  c("Bilingual Secretary", "media-communication", "Secretarial and administrative skills in two languages."),

  // International Relations
  c("International Relations and Diplomacy", "international-relations", "Global affairs, diplomacy and international cooperation."),

  // Tourism & Hospitality
  c("Hospitality Management", "tourism-hospitality", "Manage guest services in hotels and hospitality businesses."),
  c("Tourism and Business Studies", "tourism-hospitality", "The business of tourism and travel."),
];

// French title and summary per slug. Slugs stay English in both languages.
const fr: Record<string, { title: string; summary: string }> = {
  "business-administration": { title: "Administration des affaires", summary: "Les principes essentiels pour organiser, gérer et développer une entreprise." },
  "marketing-management": { title: "Management du marketing", summary: "Planifier et gérer les actions marketing pour des produits et des services." },
  "sales-management-and-marketing": { title: "Gestion des ventes et marketing", summary: "Diriger des équipes commerciales et relier les ventes à la stratégie marketing." },
  "human-resource-management": { title: "Gestion des ressources humaines", summary: "Recrutement, développement des talents et relations sociales." },
  "project-management": { title: "Gestion de projet", summary: "Planifier, exécuter et clôturer des projets dans le respect du périmètre, des délais et du budget." },
  "office-management": { title: "Gestion de bureau", summary: "Organiser le fonctionnement du bureau, l’archivage et les processus administratifs." },
  "management-studies": { title: "Études en management", summary: "Des bases solides en théorie et pratique du management." },
  "commercial-management": { title: "Gestion commerciale", summary: "Contrats, risques commerciaux et création de valeur dans les affaires." },
  "accounting-and-finance": { title: "Comptabilité et finance", summary: "Tenue des comptes, états financiers et bases de la gestion financière." },
  "banking-and-finance": { title: "Banque et finance", summary: "Le fonctionnement des banques et les principes des services financiers." },
  "procurement-and-supply": { title: "Achats et approvisionnement", summary: "Sourcing, achats et gestion des fournisseurs." },
  "logistics-and-supply-chain-management": { title: "Logistique et gestion de la chaîne d’approvisionnement", summary: "Gérer le flux des marchandises, du fournisseur au client." },
  "logistics-and-transport-management": { title: "Logistique et gestion des transports", summary: "Planification des transports et opérations logistiques." },
  "health-and-safety-management": { title: "Gestion de la santé et de la sécurité", summary: "Identifier les risques et gérer la sécurité au travail." },
  "occupational-health-and-safety": { title: "Santé et sécurité au travail", summary: "Protéger la santé et le bien-être des personnes au travail." },
  "quality-health-safety-and-environmental-management": { title: "Gestion qualité, santé, sécurité et environnement (QHSE)", summary: "Une pratique QHSE intégrée pour les organisations." },
  "oil-and-gas-management": { title: "Management pétrolier et gazier", summary: "Une introduction au management dans le secteur du pétrole et du gaz." },
  "mining-operations": { title: "Opérations minières", summary: "Les principaux processus et la gestion des opérations minières." },
  "mineral-economics": { title: "Économie des ressources minérales", summary: "L’économie des ressources minérales et de leurs marchés." },
  "maritime-management": { title: "Management maritime", summary: "Le management dans le transport maritime, les ports et le commerce maritime." },
  aviation: { title: "Aviation", summary: "Une introduction au secteur de l’aviation." },
  "journalism-and-media-studies": { title: "Journalisme et études des médias", summary: "Le reportage, l’écriture et le rôle des médias dans la société." },
  "public-speaking": { title: "Prise de parole en public", summary: "S’exprimer avec clarté et assurance devant tout public." },
  "translation-and-interpretation": { title: "Traduction et interprétation", summary: "Transmettre fidèlement le sens d’une langue à une autre." },
  "bilingual-secretary": { title: "Secrétariat bilingue", summary: "Compétences de secrétariat et d’administration dans deux langues." },
  "international-relations-and-diplomacy": { title: "Relations internationales et diplomatie", summary: "Les affaires mondiales, la diplomatie et la coopération internationale." },
  "hospitality-management": { title: "Management de l’hôtellerie", summary: "Gérer l’accueil et les services dans l’hôtellerie." },
  "tourism-and-business-studies": { title: "Tourisme et études commerciales", summary: "Les métiers et l’économie du tourisme et du voyage." },
};

const localizeCourse = (c: Course, lang: Locale): Course => (lang === "fr" && fr[c.slug] ? { ...c, ...fr[c.slug] } : c);

export const getCourses = (lang: Locale) => courses.map((c) => localizeCourse(c, lang));
export const getCourse = (slug: string, lang: Locale = "en") => {
  const c = courses.find((x) => x.slug === slug);
  return c && localizeCourse(c, lang);
};
export const getFeaturedCourses = (lang: Locale) => getCourses(lang).filter((x) => x.featured).slice(0, 6);
