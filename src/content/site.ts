// Business facts used across the site and in the LocalBusiness schema.
// Change a number, phone or address here and it updates everywhere.

export const site = {
  name: "Glasstech and Interior Solutions Limited",
  url: "https://www.glasstech.co.ke",
  email: "hello@glasstechandinteriors.com",
  phones: [
    { display: "+254 714 498 682", href: "tel:+254714498682", e164: "+254714498682" },
    { display: "+254 726 019 644", href: "tel:+254726019644", e164: "+254726019644" },
  ],
  whatsappNumber: "254714498682",
  workshop: {
    label: "Workshop and showroom",
    name: "Sunrise Centre, Northern Bypass",
    street: "Sunrise Centre, Northern Bypass",
    city: "Nairobi",
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
  stats: [
    { value: 80, suffix: "+", label: "Years in business" },
    { value: 100, suffix: "+", label: "Completed projects" },
    { value: 10, suffix: "", label: "Specialist craftsmen" },
  ],
  socials: [
    { label: "Facebook", href: "https://facebook.com/glasstechandinteriorsolutionsltd" },
    { label: "X", href: "https://x.com/GlasstechLtd" },
    { label: "Instagram", href: "https://instagram.com/glasstechandinteriors/" },
    { label: "LinkedIn", href: "https://linkedin.com/company/glasstechandinteriorsolutionsltd/" },
  ],
} as const;

export const quoteMessage = "Hi Glasstech, I'd like a quote.";

export function whatsappLink(text: string = quoteMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  logo: `${site.url}/apple-touch-icon.png`,
  image: `${site.url}/og.jpg`,
  description:
    "Automotive, architectural and interior glass: windshields, shower cubicles, office partitions, balconies and facades, measured, fabricated and fitted from one Nairobi workshop.",
  email: site.email,
  telephone: site.phones.map((p) => p.e164),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.workshop.street,
    addressLocality: site.workshop.city,
    addressCountry: site.workshop.countryCode,
  },
  openingHoursSpecification: site.hours.schema.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  areaServed: { "@type": "Country", name: site.workshop.country },
  sameAs: site.socials.map((s) => s.href),
};
