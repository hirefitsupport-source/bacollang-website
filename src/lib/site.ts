// Central institutional details. Translatable wording (motto, tagline, description)
// lives in dictionaries.ts. A `null` value means "not yet confirmed by the college"
// — components hide anything that is null rather than showing a guess.

export const site = {
  name: "British & American College of Languages and Professional Studies",
  shortName: "British & American College",
  url: "https://www.bacollang.com",

  phones: ["0233673775", "0244176689", "0244693987", "0244671726", "0544751356"],
  whatsapp: null as string | null,
  emails: ["britishamericancollegeaccra@gmail.com", "bacollangps@gmail.com"],
  address: "Lapaz Abrantie, 171 George W. Bush Hwy, Accra, Ghana" as string | null,
  mapUrl: "https://maps.app.goo.gl/PaH12coKiyG42qhU6",
  mapEmbed: "https://www.google.com/maps?q=bacollang&ll=5.6051182,-0.2540459&z=17&output=embed",
  facebook: "https://www.facebook.com/share/1C7VzdW4Ln/",
  instagram: "https://www.instagram.com/bacollang_institute",
};

// Labels come from dict.nav[key]; paths are unprefixed and passed through localize().
export const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/courses", key: "courses" },
  { href: "/languages", key: "languages" },
  { href: "/admissions", key: "admissions" },
  { href: "/instructors", key: "instructors" },
  { href: "/contact", key: "contact" },
] as const;
