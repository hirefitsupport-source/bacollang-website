// not-found receives no params, so the language comes from the x-locale header set by middleware.
import { headers } from "next/headers";
import { ButtonLink, Section } from "@/components/ui";
import { getDict } from "@/lib/dictionaries";
import { localize, type Locale } from "@/lib/i18n";

export default async function NotFound() {
  const lang: Locale = (await headers()).get("x-locale") === "fr" ? "fr" : "en";
  const t = getDict(lang).notFound;
  return (
    <Section>
      <div className="mx-auto max-w-xl py-10 text-center">
        <p className="font-display text-6xl font-bold text-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold">{t.title}</h1>
        <p className="mt-3 text-muted">{t.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={localize(lang, "/")}>{t.home}</ButtonLink>
          <ButtonLink href={localize(lang, "/courses")} variant="secondary">{t.courses}</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
