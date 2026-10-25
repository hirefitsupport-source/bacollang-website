// Only answers that are true regardless of unconfirmed policy details.
// TODO(college): add questions on fees, payment, schedules and certificates once confirmed.
import type { Locale } from "../i18n";

const faqs: Record<Locale, { q: string; a: string }[]> = {
  en: [
    {
      q: "What courses do you offer?",
      a: "We offer international certificate courses in areas such as business and management, finance, logistics, health and safety, oil, gas and mining, maritime and aviation, media, international relations and tourism. See the Courses page for the full list.",
    },
    { q: "Which languages can I study?", a: "English, German, French, Spanish, Arabic, Portuguese, Chinese (Mandarin) and Russian." },
    {
      q: "What levels are available for English and German?",
      a: "English is offered at Beginner, Intermediate, Advanced and Proficiency levels. German is offered at levels A1, A2, B1, B2, C1 and C2. For other languages, please contact us.",
    },
    { q: "How do I apply?", a: "Send an enquiry through our Apply page with the course you are interested in. Our admissions team will contact you with the next steps." },
    { q: "Where can I find fees and schedules?", a: "Fees and class schedules vary by course. Please send an enquiry and our admissions team will share the latest details." },
  ],
  fr: [
    {
      q: "Quelles formations proposez-vous ?",
      a: "Nous proposons des formations certifiantes internationales dans des domaines comme le commerce et le management, la finance, la logistique, la santé et la sécurité, le pétrole, le gaz et les mines, le maritime et l’aviation, les médias, les relations internationales et le tourisme. Consultez la page Formations pour la liste complète.",
    },
    { q: "Quelles langues puis-je étudier ?", a: "L’anglais, l’allemand, le français, l’espagnol, l’arabe, le portugais, le chinois (mandarin) et le russe." },
    {
      q: "Quels niveaux sont proposés en anglais et en allemand ?",
      a: "L’anglais est proposé aux niveaux Débutant, Intermédiaire, Avancé et Maîtrise. L’allemand est proposé aux niveaux A1, A2, B1, B2, C1 et C2. Pour les autres langues, contactez-nous.",
    },
    { q: "Comment m’inscrire ?", a: "Envoyez une demande depuis notre page d’inscription en indiquant la formation qui vous intéresse. Notre service des admissions vous contactera avec les prochaines étapes." },
    { q: "Où trouver les frais et les horaires ?", a: "Les frais et les horaires varient selon la formation. Envoyez-nous une demande et notre service des admissions vous communiquera les dernières informations." },
  ],
};

export const getFaqs = (lang: Locale) => faqs[lang];
