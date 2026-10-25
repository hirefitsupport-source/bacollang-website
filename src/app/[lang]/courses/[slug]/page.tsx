import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Container, Section } from "@/components/ui";
import { getCategory } from "@/lib/data/categories";
import { courses, getCourse, getCourses } from "@/lib/data/courses";
import { getDict } from "@/lib/dictionaries";
import { alternates, localize, locales, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: Locale; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => courses.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const course = getCourse(slug, lang);
  if (!course) return {};
  return {
    title: course.title,
    description: `${course.title}: ${course.summary}`,
    alternates: alternates(lang, `/courses/${course.slug}`),
  };
}

export default async function CoursePage({ params }: Props) {
  const { lang, slug } = await params;
  const course = getCourse(slug, lang);
  if (!course) notFound();
  const d = getDict(lang);
  const t = d.course;
  const cat = getCategory(course.category, lang);
  const related = getCourses(lang).filter((c) => c.category === course.category && c.slug !== course.slug).slice(0, 3);

  const facts = [
    [t.facts.duration, course.duration],
    [t.facts.delivery, course.delivery],
    [t.facts.fees, course.fees],
    [t.facts.certificate, course.certificate],
  ].filter(([, v]) => v) as [string, string][];

  const lists = [
    [t.lists.objectives, course.objectives],
    [t.lists.content, course.content],
    [t.lists.requirements, course.requirements],
  ].filter(([, v]) => v?.length) as [string, string[]][];

  return (
    <>
      <section className="bg-brand-dark py-14 text-white md:py-20">
        <Container>
          <nav aria-label={d.breadcrumb} className="mb-3 text-sm text-white/70">
            <Link href={localize(lang, "/")} className="hover:text-white">{d.nav.home}</Link> /{" "}
            <Link href={localize(lang, "/courses")} className="hover:text-white">{d.nav.courses}</Link> /{" "}
            <span aria-current="page">{course.title}</span>
          </nav>
          {cat && (
            <Link href={localize(lang, `/courses?category=${cat.slug}`)} className="mb-3 inline-block rounded bg-accent px-3 py-1 text-xs font-semibold tracking-wider uppercase">
              {cat.name}
            </Link>
          )}
          <h1 className="text-3xl font-bold text-white md:text-5xl">{course.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{course.summary}</p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">{t.overview}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {course.overview ?? t.defaultOverview(course.title, cat?.name ?? t.professionalStudies)}
            </p>

            {facts.length > 0 && (
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                {facts.map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-brand-light p-4">
                    <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{k}</dt>
                    <dd className="mt-1 font-semibold text-brand-dark">{v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {lists.map(([heading, items]) => (
              <div key={heading} className="mt-10">
                <h2 className="text-2xl font-bold">{heading}</h2>
                <ul className="mt-4 space-y-2">
                  {items.map((i) => (
                    <li key={i} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <aside id="enquire" className="h-fit rounded-2xl border border-slate-200 bg-surface p-6 md:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl font-bold">{t.enquireTitle}</h2>
            <p className="mt-2 mb-6 text-sm text-muted">{t.enquireText}</p>
            {/* Interest values are the English titles; see EnquiryForm. */}
            <EnquiryForm lang={lang} defaultInterest={getCourse(slug, "en")!.title} />
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="gray">
          <h2 className="mb-8 text-2xl font-bold">{t.related}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => <CourseCard key={c.slug} course={c} lang={lang} />)}
          </div>
        </Section>
      )}
    </>
  );
}
