import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { getDict } from "@/lib/dictionaries";
import { localize, type Locale } from "@/lib/i18n";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({
  tone = "white",
  className = "",
  children,
  id,
}: {
  tone?: "white" | "light" | "gray";
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const bg = { white: "bg-white", light: "bg-brand-light", gray: "bg-surface" }[tone];
  return (
    <section id={id} className={`${bg} py-16 md:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  const a = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`mb-10 max-w-2xl md:mb-14 ${a}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold tracking-wider text-accent uppercase">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

const variants = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  secondary: "border-2 border-brand text-brand hover:bg-brand hover:text-white",
  ghost: "border-2 border-white/80 text-white hover:bg-white hover:text-brand-dark",
  blue: "bg-brand text-white hover:bg-brand-dark",
};

export const buttonClass = (variant: keyof typeof variants = "primary", extra = "") =>
  `inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${extra}`;

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof variants }) {
  return <Link {...props} className={buttonClass(variant, className)} />;
}

export function PageHeader({
  lang,
  title,
  intro,
  crumb,
  image,
  imagePosition = "object-center",
}: {
  lang: Locale;
  title: string;
  intro?: string;
  crumb?: string;
  image?: string;
  imagePosition?: string;
}) {
  const d = getDict(lang);
  return (
    <section className={`relative isolate overflow-hidden bg-brand-dark text-white ${image ? "py-20 md:py-28" : "py-14 md:py-20"}`}>
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className={`-z-10 object-cover ${imagePosition}`} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/40" aria-hidden />
        </>
      )}
      <Container>
        <nav aria-label={d.breadcrumb} className="mb-3 text-sm text-white/70">
          <Link href={localize(lang, "/")} className="hover:text-white">{d.nav.home}</Link>
          <span aria-hidden> / </span>
          <span aria-current="page">{crumb ?? title}</span>
        </nav>
        <h1 className="text-3xl font-bold text-white md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-white/85">{intro}</p>}
      </Container>
    </section>
  );
}
