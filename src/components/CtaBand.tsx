import { getDict } from "@/lib/dictionaries";
import { localize, type Locale } from "@/lib/i18n";
import { ButtonLink, Container } from "./ui";

export function CtaBand({ lang }: { lang: Locale }) {
  const d = getDict(lang);
  return (
    <section className="relative overflow-hidden bg-brand py-16 md:py-20">
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/20" aria-hidden />
      <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5" aria-hidden />
      <Container className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{d.cta.title}</h2>
          <p className="mt-3 text-lg text-white/85">{d.cta.text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={localize(lang, "/courses")}>{d.cta.courses}</ButtonLink>
          <ButtonLink href={localize(lang, "/contact")} variant="ghost">{d.cta.contact}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
