import type { MetadataRoute } from "next";
import { courses } from "@/lib/data/courses";
import { localize, locales } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about", "/courses", "/languages", "/admissions", "/instructors", "/contact", "/faq", "/apply"];
  const paths = [...pages, ...courses.map((c) => `/courses/${c.slug}`)];
  return paths.flatMap((p) =>
    locales.map((lang) => ({
      url: `${site.url}${localize(lang, p) === "/" ? "" : localize(lang, p)}`,
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : p.startsWith("/courses/") ? 0.6 : 0.8,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${localize(l, p)}`])) },
    })),
  );
}
