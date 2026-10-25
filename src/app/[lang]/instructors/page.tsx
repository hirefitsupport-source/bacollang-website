import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { InstructorCard, InstructorsComingSoon } from "@/components/InstructorCard";
import { PageHeader, Section } from "@/components/ui";
import { instructors } from "@/lib/data/instructors";
import { getDict } from "@/lib/dictionaries";
import { alternates, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.nav.instructors, description: d.instructors.metaDescription, alternates: alternates(lang, "/instructors") };
}

export default async function InstructorsPage({ params }: Props) {
  const { lang } = await params;
  const d = getDict(lang);
  return (
    <>
      <PageHeader lang={lang} title={d.nav.instructors} intro={d.instructors.intro} />
      <Section tone="gray">
        {instructors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {instructors.map((i) => <InstructorCard key={i.slug} instructor={i} lang={lang} />)}
          </div>
        ) : (
          <InstructorsComingSoon lang={lang} />
        )}
      </Section>
      <CtaBand lang={lang} />
    </>
  );
}
