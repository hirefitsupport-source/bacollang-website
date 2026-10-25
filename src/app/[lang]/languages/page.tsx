import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { ImageSlider } from "@/components/ImageSlider";
import { LanguageCard } from "@/components/LanguageCard";
import { ButtonLink, PageHeader, Section, SectionHeading } from "@/components/ui";
import { getLanguages } from "@/lib/data/languages";
import { getDict } from "@/lib/dictionaries";
import { alternates, localize, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.nav.languages, description: d.lang.metaDescription, alternates: alternates(lang, "/languages") };
}

export default async function LanguagesPage({ params }: Props) {
  const { lang } = await params;
  const d = getDict(lang);
  const t = d.lang;
  const languages = getLanguages(lang);
  const name = (slug: string) => languages.find((l) => l.slug === slug)!.name;

  return (
    <>
      <PageHeader lang={lang} title={d.nav.languages} intro={t.pageIntro} image="/images/resource-room.jpg" />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow={t.eyebrow} title={t.title} />
            <div className="-mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p><strong className="text-brand-dark">{name("english")}</strong> {t.english}</p>
              <p><strong className="text-brand-dark">{name("german")}</strong> {t.german}</p>
              <p>{t.others}</p>
            </div>
            <ButtonLink href={localize(lang, "/apply")} className="mt-8">{t.enquire}</ButtonLink>
          </div>
          <ImageSlider
            lang={lang}
            sizes="(min-width:1024px) 50vw, 100vw"
            slides={[
              { src: "/images/student-speaker.jpg", alt: t.imageAlts[0], position: "object-[center_25%]" },
              { src: "/images/student-presentation.jpg", alt: t.imageAlts[1], position: "object-[center_45%]" },
              { src: "/images/student-podium.jpg", alt: t.imageAlts[2], position: "object-[center_35%]" },
            ]}
          />
        </div>
      </Section>

      <Section tone="light">
        <SectionHeading title={t.available} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {languages.map((l) => <LanguageCard key={l.slug} language={l} lang={lang} />)}
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
