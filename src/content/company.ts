// Business facts used across the site and in the LocalBusiness schema
// (src/lib/structuredData.ts). Change a figure, the address or the hours here
// and it updates everywhere. Phone numbers and WhatsApp links are in links.ts.

/** The canonical origin. Every absolute URL on the site is built from it. */
export const SITE_URL = "https://www.glasstech.co.ke";

export const company = {
  name: "Glasstech and Interior Solutions Limited",
  email: "hello@glasstech.co.ke",
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
    // The listing's own coordinates: its Google Maps page, opened by the place
    // id in links.ts, read on 3 November 2026.
    geo: { latitude: -1.2160668, longitude: 36.8272599 },
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
  // TODO(confirm with client): is 80+ the years trading, or the team's
  // combined experience? Until confirmed it is labelled as combined
  // experience. If the client confirms the stronger claim, change this one
  // label to the "in business" wording: the hero stat and the meta
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
