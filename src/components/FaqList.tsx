import { ChevronDown } from "lucide-react";
import { getFaqs } from "@/lib/data/faqs";
import type { Locale } from "@/lib/i18n";

export function FaqList({ lang, limit }: { lang: Locale; limit?: number }) {
  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {getFaqs(lang).slice(0, limit).map((f) => (
        <details key={f.q} className="group p-5 md:p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-brand-dark">
            {f.q}
            <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
