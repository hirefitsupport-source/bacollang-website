import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { PageHeader, Section } from "@/components/ui";
import { getDict } from "@/lib/dictionaries";
import { alternates, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.faq.title, description: d.faq.metaDescription, alternates: alternates(lang, "/faq") };
}

export default async function FaqPage({ params }: Props) {
  const { lang } = await params;
  const d = getDict(lang);
  return (
    <>
      <PageHeader lang={lang} title={d.faq.title} crumb={d.nav.faq} />
      <Section tone="gray">
        <div className="mx-auto max-w-3xl"><FaqList lang={lang} /></div>
      </Section>
      <CtaBand lang={lang} />
    </>
  );
}
