"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getCategories } from "@/lib/data/categories";
import { getCourses } from "@/lib/data/courses";
import { getDict } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { CourseCard } from "./CourseCard";

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function CourseCatalog({ lang }: { lang: Locale }) {
  const d = getDict(lang);
  const courses = getCourses(lang);
  const categories = getCategories(lang);
  const courseCategories = categories.filter((c) => c.slug !== "languages");

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get("category") ?? "all";
  const [query, setQuery] = useState(params.get("q") ?? "");

  const setCategory = (slug: string) => {
    const next = new URLSearchParams(params);
    if (slug === "all") next.delete("category");
    else next.set("category", slug);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return courses.filter((c) => {
      if (active !== "all" && c.category !== active) return false;
      if (!q) return true;
      const catName = categories.find((x) => x.slug === c.category)?.name ?? "";
      return normalize(`${c.title} ${catName} ${c.summary}`).includes(q);
    });
  }, [query, active, courses, categories]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5">
        <label className="relative block max-w-xl">
          <span className="sr-only">{d.course.searchLabel}</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={d.course.searchPlaceholder}
            className="h-12 w-full rounded-lg border border-slate-300 bg-white pr-4 pl-12 focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </label>
        <div role="group" aria-label={d.course.filterLabel} className="flex flex-wrap gap-2">
          {[{ slug: "all", name: d.course.all }, ...courseCategories].map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategory(c.slug)}
              aria-pressed={active === c.slug}
              className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === c.slug
                  ? "border-brand bg-brand text-white"
                  : "border-slate-300 bg-white text-ink hover:border-brand hover:text-brand"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-6 text-sm text-muted" aria-live="polite">
        {d.course.showing(results.length, courses.length)}
      </p>

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => <CourseCard key={c.slug} course={c} lang={lang} />)}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-semibold text-brand-dark">{d.course.none}</p>
          <button
            type="button"
            className="mt-3 text-sm font-semibold text-accent underline"
            onClick={() => { setQuery(""); setCategory("all"); }}
          >
            {d.course.clear}
          </button>
        </div>
      )}
    </div>
  );
}
