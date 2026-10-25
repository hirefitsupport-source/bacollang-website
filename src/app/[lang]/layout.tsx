import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getDict } from "@/lib/dictionaries";
import { alternates, isLocale, locales, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-poppins" });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s | ${site.shortName}` },
    description: d.meta.description,
    icons: { icon: "/images/logo.png" },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: lang === "fr" ? "fr_FR" : "en_GB",
      images: [{ url: "/images/graduates.png", width: 1448, height: 1086, alt: d.gallery[0] }],
    },
    alternates: alternates(lang, "/"),
  };
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode } & Props>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  return (
    <html lang={lang} className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only z-50 rounded bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
          {d.skip}
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
