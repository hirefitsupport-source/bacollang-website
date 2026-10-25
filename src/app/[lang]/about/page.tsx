import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, Compass, Eye, Target, Users } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader, Section, SectionHeading } from "@/components/ui";
import { getDict } from "@/lib/dictionaries";
import { alternates, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.nav.about, description: d.about.metaDescription, alternates: alternates(lang, "/about") };
}

// TODO(college): replace mission and vision with the college's approved wording.
const pillarIcons = [Target, Eye, Compass];
// Decorative header images per pillar (Mission, Vision, Approach); undefined = none.
const pillarImages: (string | undefined)[] = ["/images/mission.jpg", "/images/vision.jpg", "/images/approach.jpg"];
const valueIcons = [Target, BookOpen, Users];
// Background images per value (Determination, Focus, Success); undefined = plain card.
const valueImages: (string | undefined)[] = ["/images/determination.jpg", "/images/focus.jpg", "/images/success.jpg"];

// Order matches dict.about.galleryAlts.
const gallery = [1, 2, 4, 5, 6, 7, 9, 10].map((n) => `/images/gallery/g${n}.jpg`);
// Crop overrides for tall photos whose subject would otherwise be cut off.
const galleryPosition: Record<string, string> = { "/images/gallery/g2.jpg": "object-[center_15%]" };

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const d = getDict(lang);
  const a = d.about;
  return (
    <>
      <PageHeader lang={lang} title={d.nav.about} intro={`${site.name}: ${d.motto}.`} image="/images/campus-facade.jpg" imagePosition="object-[center_40%]" />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow={a.whoEyebrow} title={a.whoTitle} />
            <div className="-mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>{a.whoP1(site.name)}</p>
              <p>{a.whoP2}</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image src="/images/campus-building.jpg" alt={a.whoImageAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      <Section tone="light">
        <div className="grid gap-6 md:grid-cols-3">
          {a.pillars.map(({ title, text }, i) => {
            const Icon = pillarIcons[i];
            const image = pillarImages[i];
            return (
              <article key={title} className="relative isolate overflow-hidden rounded-xl bg-white p-8 shadow-sm">
                {image && (
                  <>
                    <Image src={image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="-z-10 object-cover" />
                    <div className="absolute inset-0 -z-10 bg-brand-dark/75" aria-hidden />
                  </>
                )}
                {!image && <Icon className="mb-4 h-10 w-10 text-accent" aria-hidden />}
                <h2 className={`text-xl font-semibold ${image ? "text-white" : ""}`}>{title}</h2>
                <p className={`mt-2 leading-relaxed ${image ? "text-white/90" : "text-muted"}`}>{text}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={a.valuesEyebrow} title={d.motto} intro={a.valuesIntro} />
        <div className="grid gap-6 md:grid-cols-3">
          {a.values.map(({ title, text }, i) => {
            const Icon = valueIcons[i];
            const image = valueImages[i];
            return (
              <div key={title} className="relative isolate overflow-hidden rounded-xl border border-slate-200 p-8 text-center">
                {image && (
                  <>
                    <Image src={image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="-z-10 object-cover" />
                    <div className="absolute inset-0 -z-10 bg-brand-dark/75" aria-hidden />
                  </>
                )}
                <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand text-white"><Icon aria-hidden /></span>
                <h3 className={`text-xl font-semibold ${image ? "text-white" : ""}`}>{title}</h3>
                <p className={`mt-2 ${image ? "text-white/90" : "text-muted"}`}>{text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="gray">
        <SectionHeading eyebrow={a.galleryEyebrow} title={a.galleryTitle} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((src, i) => (
            <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={src} alt={a.galleryAlts[i]} fill sizes="(min-width:1024px) 25vw, 50vw" className={`object-cover ${galleryPosition[src] ?? "object-center"} transition-transform duration-500 hover:scale-105`} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
