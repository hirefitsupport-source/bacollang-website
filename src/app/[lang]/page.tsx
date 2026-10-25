import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CheckCircle2,
  Compass,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Languages as LanguagesIcon,
  Layers,
  TrendingUp,
} from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { CourseCard } from "@/components/CourseCard";
import { LanguageCard } from "@/components/LanguageCard";
import { CtaBand } from "@/components/CtaBand";
import { InstructorCard } from "@/components/InstructorCard";
import { ImageSlider } from "@/components/ImageSlider";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui";
import { categoryImage, getCategories } from "@/lib/data/categories";
import { courses, getFeaturedCourses } from "@/lib/data/courses";
import { getLanguages } from "@/lib/data/languages";
import { instructors } from "@/lib/data/instructors";
import { getDict } from "@/lib/dictionaries";
import { localize, zip, type Locale } from "@/lib/i18n";

const heroImages = [
  { src: "/images/campus-front.png", position: "object-center" },
  { src: "/images/event-hall.png", position: "object-top" },
  { src: "/images/classroom.png", position: "object-top" },
  { src: "/images/computer-lab.png", position: "object-[center_40%]" },
  { src: "/images/flyer.png", position: "object-left" },
  { src: "/images/campus-gate.png", position: "object-center" },
  { src: "/images/lecture-hall.jpg", position: "object-[center_40%]" },
  { src: "/images/resource-room.jpg", position: "object-center" },
  { src: "/images/graduation-ceremony.jpg", position: "object-[center_35%]" },
  { src: "/images/field-trip.jpg", position: "object-[center_40%]" },
];

const features = [
  { icon: Award, href: "/courses" },
  { icon: LanguagesIcon, href: "/languages" },
  { icon: TrendingUp, href: "/about" },
  { icon: HeartHandshake, href: "/admissions" },
];

const reasonIcons = [Layers, Globe2, BookOpenCheck, Compass, GraduationCap];

const whyPhotos = [
  { src: "/images/event-hall.png" },
  { src: "/images/graduates-group.jpg" },
  { src: "/images/certificate-handover.jpg", position: "object-[center_30%]" },
  { src: "/images/lesson-whiteboard.jpg", position: "object-[center_35%]" },
  { src: "/images/graduation-handshake-1.jpg", position: "object-[center_30%]" },
  { src: "/images/graduation-handshake-2.jpg", position: "object-[center_30%]" },
];

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = getDict(lang);
  const h = d.home;
  const languages = getLanguages(lang);

  return (
    <>
      <HeroSlider lang={lang} slides={zip(heroImages, d.hero.slides)} />

      {/* Feature cards */}
      <div className="bg-white pt-12 md:pt-16">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, href }, i) => (
              <li key={href}>
                <Link
                  href={localize(lang, href)}
                  className={`group flex h-full flex-col rounded-xl p-6 shadow-lg transition hover:-translate-y-1 ${
                    i === 0 ? "bg-accent text-white" : "bg-white text-ink"
                  }`}
                >
                  <Icon className={`h-10 w-10 ${i === 0 ? "text-white" : "text-brand"}`} aria-hidden />
                  <h2 className={`mt-4 text-lg font-semibold ${i === 0 ? "text-white" : ""}`}>{h.features[i].title}</h2>
                  <p className={`mt-2 flex-1 text-sm leading-relaxed ${i === 0 ? "text-white/90" : "text-muted"}`}>{h.features[i].text(courses.length)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                    {d.learnMore} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* About */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image src="/images/campus-front.png" alt={h.aboutImageAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -right-3 -bottom-6 hidden w-40 rounded-xl bg-white p-3 shadow-lg sm:block">
              <Image src="/images/logo.png" alt="" width={160} height={160} className="h-auto w-full" />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold tracking-wider text-accent uppercase">{h.aboutEyebrow}</p>
            <h2 className="text-3xl font-bold md:text-4xl">{h.aboutTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{h.aboutP1}</p>
            <p className="mt-4 leading-relaxed text-muted">
              {h.aboutP2a}<strong className="text-brand-dark">“{d.motto}”</strong>{h.aboutP2b}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {h.aboutPoints.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm font-medium">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />{t}
                </li>
              ))}
            </ul>
            <ButtonLink href={localize(lang, "/about")} variant="blue" className="mt-8">{h.moreAbout}</ButtonLink>
          </div>
        </div>
      </Section>

      {/* Categories */}
      <Section tone="light">
        <SectionHeading eyebrow={h.catEyebrow} title={h.catTitle} intro={h.catIntro} />
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {getCategories(lang).map(({ slug, name, description, imageAlt }) => {
            const isLang = slug === "languages";
            const count = isLang ? languages.length : courses.filter((c) => c.category === slug).length;
            return (
              <li key={slug}>
                <Link
                  href={localize(lang, isLang ? "/languages" : `/courses?category=${slug}`)}
                  className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-lg bg-brand-dark p-5 text-white shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl"
                >
                  <Image
                    src={categoryImage(slug)}
                    alt={imageAlt}
                    fill
                    sizes="(min-width:1024px) 20vw, (min-width:768px) 33vw, 50vw"
                    className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent transition-colors duration-300 group-hover:via-brand-dark/75" aria-hidden />

                  <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">{h.count(count, isLang)}</p>
                  <span className="mb-3 block h-0.5 w-8 bg-accent transition-all duration-300 group-hover:w-14" aria-hidden />
                  <h3 className="text-lg leading-snug font-semibold text-white">{name}</h3>
                  <p className="mt-2 hidden text-sm leading-relaxed text-white/75 sm:line-clamp-2">{description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
                    {d.explore} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Why choose us */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading align="left" eyebrow={h.whyEyebrow} title={h.whyTitle} intro={h.whyIntro} />
            <ImageSlider
              lang={lang}
              sizes="(min-width:1024px) 40vw, 100vw"
              slides={whyPhotos.map((p, i) => ({ ...p, alt: h.whyPhotos[i] }))}
            />
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {h.reasons.map(({ title, text }, i) => {
              const Icon = reasonIcons[i];
              return (
                <li key={title} className="rounded-xl bg-surface p-6">
                  <Icon className="h-8 w-8 text-accent" aria-hidden />
                  <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* Featured courses */}
      <Section tone="gray">
        <SectionHeading eyebrow={h.featuredEyebrow} title={h.featuredTitle} intro={h.featuredIntro} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getFeaturedCourses(lang).map((c) => <CourseCard key={c.slug} course={c} lang={lang} />)}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href={localize(lang, "/courses")} variant="secondary">{h.viewAll(courses.length)}</ButtonLink>
        </div>
      </Section>

      {/* Languages */}
      <Section>
        <SectionHeading eyebrow={h.langEyebrow} title={h.langTitle} intro={h.langIntro} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {languages.map((l) => <LanguageCard key={l.slug} language={l} lang={lang} />)}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href={localize(lang, "/languages")} variant="secondary">{h.exploreLangs}</ButtonLink>
        </div>
      </Section>

      {instructors.length > 0 && (
        <Section tone="light">
          <SectionHeading eyebrow={h.teamEyebrow} title={h.teamTitle} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {instructors.slice(0, 4).map((i) => <InstructorCard key={i.slug} instructor={i} lang={lang} />)}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href={localize(lang, "/instructors")} variant="secondary">{h.viewAllInstructors}</ButtonLink>
          </div>
        </Section>
      )}

      <CtaBand lang={lang} />
    </>
  );
}
