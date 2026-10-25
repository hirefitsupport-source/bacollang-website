// English is served at the site root (/courses); French under /fr (/fr/courses).
// src/middleware.ts rewrites unprefixed paths to /en internally.

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/** Public URL for `path` (which must start with "/") in the given language. */
export function localize(lang: Locale, path: string) {
  if (lang === defaultLocale) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** Strip the language prefix from a public pathname. */
export function stripLocale(pathname: string) {
  const m = pathname.match(/^\/(fr)(\/.*)?$/);
  return m ? m[2] || "/" : pathname;
}

export const localeFromPath = (pathname: string): Locale => (/^\/fr(\/|$)/.test(pathname) ? "fr" : "en");

/** Pair fixed per-item settings (image paths, crop) with translated text by index. */
export const zip = <A extends object, B extends object>(a: A[], b: B[]): (A & B)[] => a.map((x, i) => ({ ...x, ...b[i] }));

/** Metadata alternates (canonical + hreflang) for a path. */
export function alternates(lang: Locale, path: string) {
  return {
    canonical: localize(lang, path),
    languages: { en: localize("en", path), fr: localize("fr", path), "x-default": localize("en", path) },
  };
}
