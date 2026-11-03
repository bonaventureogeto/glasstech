// Business facts used across the site and in the LocalBusiness schema.
// Change a number, phone or address here and it updates everywhere.

import { links, socials } from "@/content/links";

/** The canonical origin. Every absolute URL on the site is built from it. */
export const SITE_URL = "https://www.glasstech.co.ke";

export const company = {
  name: "Glasstech and Interior Solutions Limited",
  email: "hello@glasstech.co.ke",
  phones: [
    { display: "+254 714 498 682", href: "tel:+254714498682", e164: "+254714498682" },
    { display: "+254 726 019 644", href: "tel:+254726019644", e164: "+254726019644" },
  ],
  whatsappNumber: "254714498682",
  workshop: {
    label: "Workshop and showroom",
    name: "Sunrise Centre, Northern Bypass",
    // The client's exact wording; keep `street` and `lines` in step. The
    // contact card shows `lines`, the footer the first line and then the rest.
    street:
      "Sunrise Centre, Northern Bypass, next to PCEA Beulah Church, off Kiambu Road, Fourways Junction, near Glee Hotel",
    city: "Nairobi",
    lines: [
      "Sunrise Centre, Northern Bypass",
      "Next to PCEA Beulah Church, off Kiambu Road",
      "Fourways Junction, near Glee Hotel, Nairobi",
    ],
    country: "Kenya",
    countryCode: "KE",
  },
  hours: {
    display: "Mon to Fri 8:00 to 16:30 · Sat 8:00 to 14:00",
    schema: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "16:30" },
      { days: ["Saturday"], opens: "08:00", closes: "14:00" },
    ],
  },
} as const;

export const stats = {
  // Not yet confirmed as years trading, so it is labelled as the team's
  // combined experience. If the client confirms the stronger claim, change
  // this one label to the "in business" wording: the hero stat and the meta
  // description both read it from here.
  experienceYears: 80,
  experienceLabel: "Years of combined experience",
  projects: 100,
  craftsmen: 10,
} as const;

/** The three figures under the hero */
export const heroStats = [
  { value: stats.experienceYears, suffix: "+", label: stats.experienceLabel },
  { value: stats.projects, suffix: "+", label: "Completed projects" },
  { value: stats.craftsmen, suffix: "", label: "Specialist craftsmen" },
];

/** The experience figure for running text: "80+ years of combined experience" */
export const experience = `${stats.experienceYears}+ ${stats.experienceLabel.toLowerCase()}`;

export const quoteMessage = "Hi Glasstech, I'd like a quote.";

export const whatsappUrl = `https://wa.me/${company.whatsappNumber}`;

export function whatsappLink(text: string = quoteMessage) {
  return `${whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  image: `${SITE_URL}/og.jpg`,
  description:
    "Automotive, architectural and interior glass: windshields, shower cubicles, office partitions, balconies and facades, measured, fabricated and fitted from one Nairobi workshop.",
  email: company.email,
  telephone: company.phones.map((p) => p.e164),
  address: {
    "@type": "PostalAddress",
    streetAddress: company.workshop.street,
    addressLocality: company.workshop.city,
    addressCountry: company.workshop.countryCode,
  },
  hasMap: links.googleMaps,
  openingHoursSpecification: company.hours.schema.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  areaServed: { "@type": "Country", name: company.workshop.country },
  sameAs: [...Object.values(socials).map((s) => s.href), links.taplink],
};
