import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryImage, getCategory } from "@/lib/data/categories";
import type { Course } from "@/lib/data/courses";
import { getDict } from "@/lib/dictionaries";
import { localize, type Locale } from "@/lib/i18n";

export function CourseCard({ course, lang }: { course: Course; lang: Locale }) {
  const d = getDict(lang);
  const cat = getCategory(course.category, lang);
  return (
    <article className="group relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-lg bg-brand-dark p-6 text-white shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl">
      <Image
        src={course.image ?? categoryImage(course.category)}
        alt=""
        fill
        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        className="-z-10 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/20 transition-colors duration-300 group-hover:via-brand-dark/85" aria-hidden />

      <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">{cat?.name}</p>
      <span className="mb-3 block h-0.5 w-8 bg-accent transition-all duration-300 group-hover:w-14" aria-hidden />
      <h3 className="text-xl leading-snug font-semibold text-white">
        <Link href={localize(lang, `/courses/${course.slug}`)} className="after:absolute after:inset-0">
          {course.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">{course.summary}</p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/15 pt-4 text-sm font-medium">
        <span className="inline-flex items-center gap-1.5 text-white/90" aria-hidden>
          {d.course.viewDetails} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        <Link
          href={localize(lang, `/apply?course=${course.slug}`)}
          className="relative z-10 rounded-md bg-accent px-3 py-1.5 font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          {d.course.enquire}<span className="sr-only"> {d.course.about} {course.title}</span>
        </Link>
      </div>
    </article>
  );
}
