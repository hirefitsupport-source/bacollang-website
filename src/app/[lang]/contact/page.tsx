import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { FacebookIcon, InstagramIcon } from "@/components/FacebookIcon";
import { PageHeader, Section } from "@/components/ui";
import { getDict } from "@/lib/dictionaries";
import { alternates, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang);
  return { title: d.nav.contact, description: d.contact.metaDescription, alternates: alternates(lang, "/contact") };
}

function ContactItem({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-5">
      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-md bg-brand text-white shadow-sm" aria-hidden>
        {icon}
      </span>
      <div>
        <h3 className="text-xl font-semibold text-accent">{title}</h3>
        <div className="mt-1.5 leading-relaxed text-muted">{children}</div>
      </div>
    </li>
  );
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const d = getDict(lang);
  const t = d.contact;
  return (
    <>
      <PageHeader lang={lang} title={d.nav.contact} intro={t.intro} image="/images/courses-banner.jpg" imagePosition="object-[center_30%]" />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-bold">{t.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t.text(site.name)}</p>

            <ul className="mt-10 space-y-8">
              {site.address && (
                <ContactItem icon={<MapPin className="h-6 w-6" />} title={t.office}>
                  <p>{site.address}</p>
                </ContactItem>
              )}
              {site.phones.length > 0 && (
                <ContactItem icon={<Phone className="h-6 w-6" />} title={t.mobile}>
                  <p className="flex flex-wrap gap-x-2 gap-y-1">
                    {site.phones.map((p, i) => (
                      <span key={p}>
                        <a href={`tel:+233${p.replace(/^0/, "")}`} className="hover:text-brand">{p}</a>
                        {i < site.phones.length - 1 && <span aria-hidden> /</span>}
                      </span>
                    ))}
                  </p>
                </ContactItem>
              )}
              {site.emails.length > 0 && (
                <ContactItem icon={<Mail className="h-6 w-6" />} title={t.email}>
                  {site.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="block break-all hover:text-brand">{e}</a>
                  ))}
                </ContactItem>
              )}
              {site.facebook && (
                <ContactItem icon={<FacebookIcon className="h-6 w-6" />} title="Facebook">
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand">{t.facebook}</a>
                </ContactItem>
              )}
              {site.instagram && (
                <ContactItem icon={<InstagramIcon className="h-6 w-6" />} title="Instagram">
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand">@bacollang_institute</a>
                </ContactItem>
              )}
              {site.whatsapp && (
                <ContactItem icon={<MessageCircle className="h-6 w-6" />} title="WhatsApp">
                  <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} className="hover:text-brand">{t.whatsapp}</a>
                </ContactItem>
              )}
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm lg:mt-40">
            <iframe
              src={`${site.mapEmbed}&hl=${lang}`}
              title={t.map(site.shortName, site.address ?? "")}
              className="block h-[420px] w-full lg:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              <ExternalLink className="h-4 w-4" aria-hidden /> {t.openMap}
            </a>
          </div>
        </div>
      </Section>

      <Section tone="gray">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <h2 className="mb-6 text-2xl font-bold">{t.formTitle}</h2>
          <EnquiryForm lang={lang} />
        </div>
      </Section>
    </>
  );
}
