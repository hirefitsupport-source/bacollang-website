import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Language } from "@/lib/data/languages";
import { getDict } from "@/lib/dictionaries";
import { localize, type Locale } from "@/lib/i18n";

export function LanguageCard({ language, lang }: { language: Language; lang: Locale }) {
  const d = getDict(lang);
  return (
    <article
      id={language.slug}
      className="group relative isolate flex min-h-72 scroll-mt-28 flex-col justify-end overflow-hidden rounded-xl bg-brand-dark p-6 text-white shadow-md"
    >
      <Image
        src={language.image}
        alt={language.imageAlt}
        fill
        sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
        className={`-z-10 transition-transform duration-700 group-hover:scale-110 ${
          language.showWholeImage ? "object-contain object-top" : "object-cover"
        }`}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark via-brand-dark/75 to-brand-dark/10" aria-hidden />

      {language.showCode && (
        <span className="absolute top-5 left-5 grid h-11 w-11 place-items-center rounded-full bg-accent font-display text-sm font-bold shadow-lg" aria-hidden>
          {language.code}
        </span>
      )}

      <h3 className="text-xl font-semibold text-white">{language.name}</h3>
      <div className="mt-3">
        {language.levels ? (
          <ul aria-label={d.lang.levelsOf(language.name)} className="flex flex-wrap gap-1.5">
            {language.levels.map((l) => (
              <li key={l} className="rounded bg-white/15 px-2 py-1 text-xs font-semibold backdrop-blur-sm">{l}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-white/80">{d.lang.levelsOnEnquiry}</p>
        )}
      </div>
      <Link
        href={localize(lang, `/apply?language=${language.slug}`)}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-white/80 after:absolute after:inset-0"
      >
        {d.lang.enquireAbout(language.name)}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  );
}
