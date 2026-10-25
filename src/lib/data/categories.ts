import type { Locale } from "../i18n";

export type Category = {
  slug: string;
  name: string;
  description: string;
  imageAlt: string;
};

type Text = Omit<Category, "slug">;

export const categoryImage = (slug: string) => `/images/categories/${slug}.jpg`;

const data: { slug: string; en: Text; fr: Text }[] = [
  {
    slug: "business-management",
    en: { name: "Business & Management", description: "Administration, marketing, HR, project and office management.", imageAlt: "Business professionals shaking hands over a desk with documents and a laptop" },
    fr: { name: "Commerce et management", description: "Administration, marketing, RH, gestion de projet et de bureau.", imageAlt: "Des professionnels se serrant la main au-dessus d’un bureau avec des documents et un ordinateur portable" },
  },
  {
    slug: "finance-accounting",
    en: { name: "Finance & Accounting", description: "Accounting, banking and finance fundamentals.", imageAlt: "A calculator, pen and financial reports with charts on a desk" },
    fr: { name: "Finance et comptabilité", description: "Les fondamentaux de la comptabilité, de la banque et de la finance.", imageAlt: "Une calculatrice, un stylo et des rapports financiers avec des graphiques sur un bureau" },
  },
  {
    slug: "logistics-supply-chain",
    en: { name: "Logistics & Supply Chain", description: "Procurement, transport and supply chain management.", imageAlt: "A container ship, cargo trucks and an aircraft at a port beside a city skyline" },
    fr: { name: "Logistique et chaîne d’approvisionnement", description: "Achats, transport et gestion de la chaîne d’approvisionnement.", imageAlt: "Un porte-conteneurs, des camions et un avion dans un port près d’une ville" },
  },
  {
    slug: "health-safety",
    en: { name: "Health & Safety", description: "Occupational health, safety and environmental management.", imageAlt: "A health worker holding a clipboard, raising a hand beside safety warning signs" },
    fr: { name: "Santé et sécurité", description: "Santé au travail, sécurité et gestion environnementale.", imageAlt: "Une professionnelle de santé tenant un porte-documents, la main levée près de panneaux d’avertissement" },
  },
  {
    slug: "oil-gas-mining",
    en: { name: "Oil, Gas & Mining", description: "Mining operations, mineral economics and oil and gas.", imageAlt: "Pipes, tanks and walkways of an oil and gas processing plant" },
    fr: { name: "Pétrole, gaz et mines", description: "Opérations minières, économie minérale, pétrole et gaz.", imageAlt: "Tuyaux, réservoirs et passerelles d’une usine de traitement de pétrole et de gaz" },
  },
  {
    slug: "maritime-aviation",
    en: { name: "Maritime & Aviation", description: "Programmes for the maritime and aviation sectors.", imageAlt: "An aircraft flying over a container ship at a port at sunset" },
    fr: { name: "Maritime et aviation", description: "Des programmes pour les secteurs maritime et aéronautique.", imageAlt: "Un avion survolant un porte-conteneurs dans un port au coucher du soleil" },
  },
  {
    slug: "media-communication",
    en: { name: "Media & Communication", description: "Journalism, public speaking, translation and secretarial work.", imageAlt: "A student wearing headphones working on a laptop" },
    fr: { name: "Médias et communication", description: "Journalisme, prise de parole, traduction et secrétariat.", imageAlt: "Une étudiante avec un casque travaillant sur un ordinateur portable" },
  },
  {
    slug: "international-relations",
    en: { name: "International Relations", description: "Diplomacy and international affairs.", imageAlt: "Flags of many nations flying against a blue sky" },
    fr: { name: "Relations internationales", description: "Diplomatie et affaires internationales.", imageAlt: "Des drapeaux de nombreux pays flottant dans un ciel bleu" },
  },
  {
    slug: "tourism-hospitality",
    en: { name: "Tourism & Hospitality", description: "Hospitality management, tourism and business studies.", imageAlt: "Three smiling students holding books outdoors among palm trees" },
    fr: { name: "Tourisme et hôtellerie", description: "Management de l’hôtellerie, tourisme et études commerciales.", imageAlt: "Trois étudiants souriants tenant des livres en plein air parmi des palmiers" },
  },
  {
    slug: "languages",
    en: { name: "Languages & Literature", description: "English, French, German, Spanish, Arabic, Portuguese, Mandarin and Russian.", imageAlt: "A graduate in cap and gown in front of the college crest" },
    fr: { name: "Langues et littérature", description: "Anglais, français, allemand, espagnol, arabe, portugais, mandarin et russe.", imageAlt: "Une diplômée en toque et toge devant le blason du collège" },
  },
];

export const getCategories = (lang: Locale): Category[] => data.map((c) => ({ slug: c.slug, ...c[lang] }));
export const getCategory = (slug: string, lang: Locale = "en") => getCategories(lang).find((c) => c.slug === slug);
