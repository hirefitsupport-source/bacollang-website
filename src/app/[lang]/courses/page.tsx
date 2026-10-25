import type { Metadata } from "next";
import { Suspense } from "react";
import { CourseCatalog } from "@/components/CourseCatalog";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader, Section } from "@/components/ui";
import { courses } from "@/lib/data/courses";
import { getDict } from "@/lib/dictionaries";
import { alternates, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.nav.courses, description: d.course.metaDescription(courses.length), alternates: alternates(lang, "/courses") };
}

export default async function CoursesPage({ params }: Props) {
  const { lang } = await params;
  const d = getDict(lang);
  return (
    <>
      <PageHeader lang={lang} title={d.course.pageTitle} crumb={d.nav.courses} intro={d.course.pageIntro} image="/images/courses-flags.jpg" imagePosition="object-[center_40%]" />
      <Section tone="gray">
        <Suspense>
          <CourseCatalog lang={lang} />
        </Suspense>
      </Section>
      <CtaBand lang={lang} />
    </>
  );
}
