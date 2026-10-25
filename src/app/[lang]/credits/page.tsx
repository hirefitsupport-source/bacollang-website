import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { getDict } from "@/lib/dictionaries";
import { alternates, type Locale } from "@/lib/i18n";
import languageCredits from "@/lib/data/image-credits.json";
import categoryCredits from "@/lib/data/category-image-credits.json";

type Credit = { slug: string; title: string; author: string; license: string; source: string };
const credits: Credit[] = [...languageCredits, ...categoryCredits];

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.credits.title, description: d.credits.metaDescription, alternates: alternates(lang, "/credits") };
}

export default async function CreditsPage({ params }: Props) {
  const { lang } = await params;
  const t = getDict(lang).credits;
  return (
    <>
      <PageHeader lang={lang} title={t.title} />
      <Section>
        <p className="mb-6 max-w-2xl text-muted">{t.text}</p>
        <ul className="space-y-3 text-sm">
          {credits.map((c) => (
            <li key={c.source}>
              <a href={c.source} className="font-semibold text-brand hover:underline" rel="noopener noreferrer">
                {c.title.replace(/^File:/, "")}
              </a>{" "}
              — {c.author || t.unknown}, {c.license}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
