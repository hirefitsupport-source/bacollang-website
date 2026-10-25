import Image from "next/image";
import type { Instructor } from "@/lib/data/instructors";
import { getDict } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export function InstructorCard({ instructor, lang }: { instructor: Instructor; lang: Locale }) {
  const d = getDict(lang);
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white text-center shadow-sm">
      <div className="relative aspect-square bg-brand-light">
        <Image src={instructor.photo} alt={d.instructors.portrait(instructor.name)} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold">{instructor.name}</h3>
        <p className="text-sm font-semibold text-accent">{instructor.title}</p>
        <p className="mt-1 text-sm text-muted">{instructor.expertise}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{instructor.bio}</p>
      </div>
    </article>
  );
}

export function InstructorsComingSoon({ lang }: { lang: Locale }) {
  const d = getDict(lang);
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <p className="text-lg font-semibold text-brand-dark">{d.instructors.soon}</p>
      <p className="mt-2 text-muted">{d.instructors.soonText}</p>
    </div>
  );
}
