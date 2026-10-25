"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { courses, getCourses } from "@/lib/data/courses";
import { getLanguages } from "@/lib/data/languages";
import { getDict } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { buttonClass } from "./ui";

const initial: EnquiryState = { status: "idle" };

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand aria-[invalid=true]:border-accent";

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-brand-dark">
        {label} {required ? <span className="text-accent" aria-hidden>*</span> : <span className="font-normal text-muted">{optional}</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-accent-dark">{error}</p>}
    </div>
  );
}

// Option values stay English so admissions always receive the same course names;
// only the visible labels are translated.
export function EnquiryForm({ lang, defaultInterest = "" }: { lang: Locale; defaultInterest?: string }) {
  const t = getDict(lang).form;
  const localCourses = getCourses(lang);
  const enLanguages = getLanguages("en");
  const localLanguages = getLanguages(lang);
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};
  const aria = (k: keyof typeof e) => ({ "aria-invalid": !!e[k], "aria-describedby": e[k] ? `${k}-error` : undefined });

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" aria-hidden />
        <p className="mt-4 text-lg font-semibold text-brand-dark">{state.message}</p>
        <p className="mt-2 text-muted">{t.replyNote}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="lang" value={lang} />
      {state.status === "error" && state.message && (
        <div role="alert" className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-accent-dark">
          <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label={t.fullName} optional={t.optional} required error={e.fullName}>
          <input id="fullName" name="fullName" required autoComplete="name" defaultValue={v.fullName} className={inputClass} {...aria("fullName")} />
        </Field>
        <Field id="email" label={t.email} optional={t.optional} required error={e.email}>
          <input id="email" name="email" type="email" required autoComplete="email" defaultValue={v.email} className={inputClass} {...aria("email")} />
        </Field>
        <Field id="phone" label={t.phone} optional={t.optional} error={e.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} className={inputClass} {...aria("phone")} />
        </Field>
        <Field id="interest" label={t.interest} optional={t.optional}>
          <select key={v.interest ?? defaultInterest} id="interest" name="interest" defaultValue={v.interest ?? defaultInterest} className={inputClass}>
            <option value="">{t.notSure}</option>
            <optgroup label={t.professional}>
              {courses.map((c, i) => <option key={c.slug} value={c.title}>{localCourses[i].title}</option>)}
            </optgroup>
            <optgroup label={t.languages}>
              {enLanguages.map((l, i) => <option key={l.slug} value={`${l.name} language`}>{localLanguages[i].name}</option>)}
            </optgroup>
          </select>
        </Field>
      </div>

      <Field id="studyArea" label={t.studyArea} optional={t.optional}>
        <input id="studyArea" name="studyArea" placeholder={t.studyAreaPlaceholder} defaultValue={v.studyArea} className={inputClass} />
      </Field>

      <Field id="message" label={t.message} optional={t.optional} required error={e.message}>
        <textarea id="message" name="message" rows={5} required minLength={10} defaultValue={v.message} className={inputClass} {...aria("message")} />
      </Field>

      {/* Honeypot field, hidden from people and assistive tech */}
      <div className="hidden" aria-hidden>
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <button type="submit" disabled={pending} className={buttonClass("primary", "w-full sm:w-auto disabled:opacity-70")}>
        {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {pending ? t.sending : t.send}
      </button>
    </form>
  );
}
