import type { Metadata } from "next";
import { FileText, MessageSquare, Search, UserCheck } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { ButtonLink, PageHeader, Section, SectionHeading } from "@/components/ui";
import { getDict } from "@/lib/dictionaries";
import { alternates, localize, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.nav.admissions, description: d.admissions.metaDescription, alternates: alternates(lang, "/admissions") };
}

const stepIcons = [Search, MessageSquare, FileText, UserCheck];

export default async function AdmissionsPage({ params }: Props) {
  const { lang } = await params;
  const d = getDict(lang);
  const t = d.admissions;
  return (
    <>
      <PageHeader lang={lang} title={d.nav.admissions} intro={t.intro} image="/images/graduates-caps.jpg" imagePosition="object-[center_35%]" />

      <Section>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map(({ title, text }, i) => {
            const Icon = stepIcons[i];
            return (
              <li key={title} className="relative rounded-xl border border-slate-200 p-6">
                <span className="absolute -top-4 left-6 grid h-8 w-8 place-items-center rounded-full bg-accent text-sm font-bold text-white">{i + 1}</span>
                <Icon className="mt-2 h-9 w-9 text-brand" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-10 text-center"><ButtonLink href={localize(lang, "/apply")}>{t.start}</ButtonLink></div>
      </Section>

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">{t.reqTitle}</h2>
            {/* TODO(college): replace with confirmed entry requirements and required documents. */}
            <p className="mt-4 leading-relaxed text-muted">{t.reqText}</p>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">{t.faqTitle}</h2>
            <FaqList lang={lang} />
          </div>
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
