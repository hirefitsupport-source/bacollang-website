// `levels: null` means the college has not yet published levels for that language.
// Background photos are from Wikimedia Commons; see image-credits.json and /credits.
import type { Locale } from "../i18n";

export type Language = {
  slug: string;
  name: string;
  levels: string[] | null;
  code: string;
  /** Show the red language-code badge on the card. */
  showCode: boolean;
  /** Fit the whole image at the top of the card instead of cropping it to fill. */
  showWholeImage: boolean;
  image: string;
  imageAlt: string;
};

// Languages whose card shows a supplied flag image (whole, no code badge).
const flagImages = new Set(["english", "german", "french", "spanish", "russian", "chinese-mandarin", "portuguese", "arabic"]);

type Text ={ name: string; imageAlt: string; levels?: string[] };

const data: { slug: string; code: string; levels: string[] | null; en: Text; fr: Text }[] = [
  {
    slug: "english", code: "EN", levels: ["Beginner", "Intermediate", "Advanced", "Proficiency"],
    en: { name: "English", imageAlt: "The American and British flags combined" },
    fr: { name: "Anglais", imageAlt: "Les drapeaux américain et britannique réunis", levels: ["Débutant", "Intermédiaire", "Avancé", "Maîtrise"] },
  },
  {
    slug: "german", code: "DE", levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    en: { name: "German", imageAlt: "The German flag" },
    fr: { name: "Allemand", imageAlt: "Le drapeau allemand" },
  },
  {
    slug: "french", code: "FR", levels: null,
    en: { name: "French", imageAlt: "The French flag" },
    fr: { name: "Français", imageAlt: "Le drapeau français" },
  },
  {
    slug: "spanish", code: "ES", levels: null,
    en: { name: "Spanish", imageAlt: "The Spanish flag" },
    fr: { name: "Espagnol", imageAlt: "Le drapeau espagnol" },
  },
  {
    slug: "arabic", code: "AR", levels: null,
    en: { name: "Arabic", imageAlt: "The Saudi Arabian flag" },
    fr: { name: "Arabe", imageAlt: "Le drapeau de l’Arabie saoudite" },
  },
  {
    slug: "portuguese", code: "PT", levels: null,
    en: { name: "Portuguese", imageAlt: "The Portuguese flag" },
    fr: { name: "Portugais", imageAlt: "Le drapeau portugais" },
  },
  {
    slug: "chinese-mandarin", code: "ZH", levels: null,
    en: { name: "Chinese (Mandarin)", imageAlt: "The Chinese flag" },
    fr: { name: "Chinois (mandarin)", imageAlt: "Le drapeau chinois" },
  },
  {
    slug: "russian", code: "RU", levels: null,
    en: { name: "Russian", imageAlt: "The Russian flag" },
    fr: { name: "Russe", imageAlt: "Le drapeau russe" },
  },
];

export const getLanguages = (lang: Locale): Language[] =>
  data.map((l) => ({
    slug: l.slug,
    code: l.code,
    showCode: !flagImages.has(l.slug),
    showWholeImage: flagImages.has(l.slug),
    image: `/images/languages/${l.slug}.jpg`,
    name: l[lang].name,
    imageAlt: l[lang].imageAlt,
    levels: l[lang].levels ?? l.levels,
  }));
