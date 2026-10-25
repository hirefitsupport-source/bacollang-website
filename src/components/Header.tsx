"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { getDict } from "@/lib/dictionaries";
import { localize, localeFromPath, stripLocale, type Locale } from "@/lib/i18n";
import { navLinks, site } from "@/lib/site";
import { buttonClass, Container } from "./ui";

export function Logo({ lang, inverted = false }: { lang: Locale; inverted?: boolean }) {
  const d = getDict(lang);
  return (
    <Link href={localize(lang, "/")} className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label={`${site.name} — ${d.homeAria}`}>
      <Image src="/images/logo.png" alt="" width={52} height={52} className="h-10 w-10 shrink-0 rounded-full bg-white sm:h-12 sm:w-12" priority />
      <span className="min-w-0 leading-tight">
        <span className={`block font-display text-sm font-bold sm:text-base sm:whitespace-nowrap ${inverted ? "text-white" : "text-brand-dark"}`}>
          {site.shortName}
        </span>
        {/* Subtitle is dropped on narrow phones so the menu and language buttons fit. */}
        <span className={`hidden max-w-60 text-[10px] font-medium tracking-wide uppercase sm:block ${inverted ? "text-white/70" : "text-muted"}`}>
          {d.logoSubtitle}
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const lang = localeFromPath(pathname);
  const d = getDict(lang);
  const path = stripLocale(pathname);
  const otherLang: Locale = lang === "en" ? "fr" : "en";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  const switcher = (extra = "") => (
    <Link
      href={localize(otherLang, path)}
      hrefLang={otherLang}
      lang={otherLang}
      aria-label={d.switchToAria}
      className={`inline-flex h-11 shrink-0 items-center gap-1.5 rounded-md border border-slate-300 px-2.5 text-sm font-semibold sm:px-3 text-brand-dark transition-colors hover:border-brand hover:text-brand ${extra}`}
    >
      <Globe className="h-4 w-4" aria-hidden />
      {otherLang.toUpperCase()}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="h-1 bg-gradient-to-r from-brand via-accent to-brand" />
      <Container className="flex h-16 items-center justify-between gap-2 sm:h-20 sm:gap-3">
        <Logo lang={lang} />
        <nav aria-label={d.mainNav} className="hidden xl:block">
          <ul className="flex items-center">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={localize(lang, l.href)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`rounded-md px-1.5 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:text-accent 2xl:px-3 ${
                    isActive(l.href) ? "text-accent" : "text-ink"
                  }`}
                >
                  {d.nav[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {switcher()}
          <Link href={localize(lang, "/apply")} className={buttonClass("primary", "h-11 shrink-0 whitespace-nowrap max-sm:hidden")}>
            {d.applyNow}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-dark hover:bg-brand-light xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? d.closeMenu : d.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label={d.mobileNav} className="max-h-[calc(100dvh-84px)] overflow-y-auto border-t border-slate-200 bg-white xl:hidden">
          <Container className="py-4">
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localize(lang, l.href)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`block rounded-md px-3 py-3 font-medium hover:bg-brand-light ${
                      isActive(l.href) ? "text-accent" : "text-ink"
                    }`}
                  >
                    {d.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={localize(lang, "/apply")} className={buttonClass("primary", "mt-4 w-full")}>
              {d.applyNow}
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
