import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getCategories } from "@/lib/data/categories";
import { getDict } from "@/lib/dictionaries";
import { localize, type Locale } from "@/lib/i18n";
import { navLinks, site } from "@/lib/site";
import languageCredits from "@/lib/data/image-credits.json";
import categoryCredits from "@/lib/data/category-image-credits.json";
import { Container } from "./ui";
import { Logo } from "./Header";
import { FacebookIcon, InstagramIcon } from "./FacebookIcon";

// Third-party photo attributions; the credits link only shows while any are in use.
const hasCredits = languageCredits.length + categoryCredits.length > 0;

const gallery =["/images/graduates.png", "/images/event-hall.png", "/images/campus-front.png", "/images/campus-gate.png"];

export function Footer({ lang }: { lang: Locale }) {
  const d = getDict(lang);
  const hasContact = site.phones.length > 0 || site.emails.length > 0 || site.address;
  return (
    <footer className="bg-brand-dark text-white/80">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo lang={lang} inverted />
          <p className="mt-5 text-sm leading-relaxed">{d.meta.description}</p>
          <p className="mt-4 text-sm font-semibold text-white">“{d.motto}”</p>
          <div className="mt-5 flex gap-3">
            {[
              { href: site.facebook, label: d.contact.facebook, Icon: FacebookIcon },
              { href: site.instagram, label: d.contact.instagram, Icon: InstagramIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold text-white">{d.footer.quickLinks}</h2>
          <ul className="space-y-2 text-sm">
            {navLinks.slice(1).map((l) => (
              <li key={l.href}><Link href={localize(lang, l.href)} className="hover:text-white">{d.nav[l.key]}</Link></li>
            ))}
            <li><Link href={localize(lang, "/faq")} className="hover:text-white">{d.nav.faq}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold text-white">{d.footer.courseAreas}</h2>
          <ul className="space-y-2 text-sm">
            {getCategories(lang).slice(0, 7).map((c) => (
              <li key={c.slug}>
                <Link href={localize(lang, c.slug === "languages" ? "/languages" : `/courses?category=${c.slug}`)} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold text-white">{d.footer.gallery}</h2>
          <ul className="grid grid-cols-2 gap-2">
            {gallery.map((src, i) => (
              <li key={src} className="relative aspect-[4/3] overflow-hidden rounded">
                <Image src={src} alt={d.gallery[i]} fill sizes="120px" className="object-cover" />
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 text-sm">
            {site.address && <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" />{site.address}</p>}
            {site.phones.map((p) => (
              <p key={p} className="flex gap-2"><Phone className="h-4 w-4 shrink-0" /><a href={`tel:+233${p.replace(/^0/, "")}`}>{p}</a></p>
            ))}
            {site.emails.map((e) => (
              <p key={e} className="flex gap-2"><Mail className="h-4 w-4 shrink-0" /><a href={`mailto:${e}`} className="break-all hover:text-white">{e}</a></p>
            ))}
            {!hasContact && <Link href={localize(lang, "/contact")} className="font-semibold text-white underline">{d.footer.sendEnquiry}</Link>}
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. {d.footer.rights}</p>
          <p>
            {d.tagline}
            {hasCredits && (
              <> · <Link href={localize(lang, "/credits")} className="hover:text-white">{d.footer.credits}</Link></>
            )}
          </p>
        </Container>
      </div>
    </footer>
  );
}
