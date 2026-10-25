import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHeader, Section } from "@/components/ui";
import { getCourse } from "@/lib/data/courses";
import { getLanguages } from "@/lib/data/languages";
import { getDict } from "@/lib/dictionaries";
import { alternates, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ course?: string; language?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.applyNow, description: d.apply.metaDescription, alternates: alternates(lang, "/apply") };
}

export default async function ApplyPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { course, language } = await searchParams;
  const d = getDict(lang);
  // Interest values are English (see EnquiryForm), whatever the page language.
  const enLang = getLanguages("en").find((l) => l.slug === language);
  const interest = (course && getCourse(course, "en")?.title) || (enLang ? `${enLang.name} language` : "");

  return (
    <>
      <PageHeader lang={lang} title={d.applyNow} intro={d.apply.intro} />
      <Section tone="gray">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <EnquiryForm lang={lang} defaultInterest={interest} />
        </div>
      </Section>
    </>
  );
}
