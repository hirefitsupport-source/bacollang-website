"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { getDict, type Dict } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"fullName" | "email" | "phone" | "message", string>>;
  values?: Record<string, string>;
};

const makeSchema = (err: Dict["form"]["errors"]) =>
  z.object({
    fullName: z.string().trim().min(2, err.fullName).max(120),
    email: z.string().trim().email(err.email),
    phone: z.string().trim().max(30).optional().or(z.literal("")),
    interest: z.string().trim().max(160).optional().or(z.literal("")),
    studyArea: z.string().trim().max(120).optional().or(z.literal("")),
    message: z.string().trim().min(10, err.message).max(3000),
  });

// Simple in-memory rate limit: 5 submissions per IP per 10 minutes.
// Resets on server restart; replace with a shared store if traffic warrants it.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const langField = String(formData.get("lang") ?? "");
  const lang: Locale = isLocale(langField) ? langField : "en";
  const t = getDict(lang).form;

  // Honeypot: real users never fill this hidden field.
  if (formData.get("website")) return { status: "error", message: t.errors.rejected };

  const raw = Object.fromEntries(
    [...formData.entries()].filter(([k, v]) => typeof v === "string" && !k.startsWith("$")),
  ) as Record<string, string>;
  const fail = (s: Omit<EnquiryState, "status" | "values">): EnquiryState => ({ status: "error", values: raw, ...s });

  const parsed = makeSchema(t.errors).safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: EnquiryState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<EnquiryState["fieldErrors"]>;
      fieldErrors[key] ??= issue.message;
    }
    return fail({ message: t.errors.fix, fieldErrors });
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return fail({ message: t.errors.tooMany });
  }

  const d = parsed.data;
  const subject = `Website enquiry${lang === "fr" ? " (FR)" : ""}${d.interest ? `: ${d.interest}` : ""} — ${d.fullName}`;
  const success: EnquiryState = { status: "success", message: t.success(d.fullName.split(" ")[0], site.shortName) };
  const to = process.env.ENQUIRY_TO_EMAIL || site.emails[0];
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  // Without Resend configured, deliver through FormSubmit (no account or key needed).
  // The first enquiry triggers a one-time activation email to `to`; until that link
  // is clicked FormSubmit reports failure, so the visitor never sees a false success.
  if (!apiKey || !from) {
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Origin: site.url, Referer: `${site.url}/contact` },
        body: JSON.stringify({
          _subject: subject,
          _replyto: d.email,
          _template: "table",
          _captcha: "false",
          Name: d.fullName,
          Email: d.email,
          Phone: d.phone || "—",
          "Interested in": d.interest || "Not sure yet",
          "Preferred study mode or time": d.studyArea || "—",
          Message: d.message,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      if (!res.ok || String(body.success) !== "true") throw new Error(body.message ?? `HTTP ${res.status}`);
    } catch (err) {
      console.error("Enquiry send failed (FormSubmit)", err);
      return fail({ message: t.errors.failed });
    }
    return success;
  }

  const rows: [string, string | undefined][] = [
    ["Name", d.fullName],
    ["Email", d.email],
    ["Phone", d.phone],
    ["Interested in", d.interest],
    ["Preferred study area", d.studyArea],
  ];
  const html =
    `<h2>New website enquiry</h2><table>` +
    rows.filter(([, v]) => v).map(([k, v]) => `<tr><th align="left">${k}</th><td>${escape(v!)}</td></tr>`).join("") +
    `</table><p style="white-space:pre-wrap">${escape(d.message)}</p>`;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: d.email,
      subject,
      html,
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("Enquiry send failed", err);
    return fail({ message: t.errors.failed });
  }

  return success;
}
