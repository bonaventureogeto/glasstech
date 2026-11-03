// Social profiles and other external pages. Each URL is written once, here.

// In the order the footer shows them. All of them, plus the Taplink page, go
// in the LocalBusiness schema's sameAs.
export const socials = {
  tiktok: { label: "TikTok", href: "https://www.tiktok.com/@glasstechandinteriors" },
  snapchat: { label: "Snapchat", href: "https://www.snapchat.com/@glasstechandint" },
  // Resolved from the client's share link (facebook.com/share/1RwergJKzi).
  facebook: { label: "Facebook", href: "https://www.facebook.com/glasstechandinteriorsolutions" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/company/glasstechandinteriorsolutionsltd/" },
  x: { label: "X", href: "https://x.com/GlasstechLtd" },
  youtube: { label: "YouTube", href: "https://www.youtube.com/@glasstechandinteriorsolutions" },
  instagram: { label: "Instagram", href: "https://www.instagram.com/glasstechandinteriors/" },
} as const;

export type Social = keyof typeof socials;

/** The Google Business listing's place id: for the review form and the Places API */
export const googlePlaceId = "ChIJ09WJNwINLxgRRN6mpUFDeVs";

// The two lines, one per kind of enquiry. This is the only place the numbers
// are written: every tel: link, WhatsApp link and the structured data are
// built from it.
// TODO(confirm with client): which number is which
export const phones = {
  architectural: {
    display: "+254 714 498 682",
    e164: "254714498682",
    label: "Architectural and interior glass",
    short: "Architectural and interior",
  },
  automotive: {
    display: "+254 726 019 644",
    e164: "254726019644",
    label: "Automotive glass",
    short: "Automotive",
  },
} as const;

export type Line = keyof typeof phones;

export const lines = Object.keys(phones) as Line[];

/** How each line is offered wherever the site asks "which quote?" */
export const quoteOptions: Record<Line, { title: string; blurb: string }> = {
  architectural: { title: "Architectural quote", blurb: "Homes, offices and buildings" },
  automotive: { title: "Automotive quote", blurb: "Windshields and vehicle glass" },
};

/** Opens messages that go on to list the details (service, size, location) */
export const quoteGreeting = "Hi Glasstech, I'd like a quote.";

/** The prefilled WhatsApp message for a quote on each line */
export const quoteMessages: Record<Line, string> = {
  architectural: "Hi Glasstech, I'd like a quote for architectural or interior glass.",
  automotive: "Hi Glasstech, I'd like a quote for automotive glass.",
};

export const telHref = (line: Line) => `tel:+${phones[line].e164}`;

export const whatsappHref = (line: Line, text?: string) =>
  `https://wa.me/${phones[line].e164}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const links = {
  // The client's link-in-bio page: their saved number and every social profile.
  taplink: "https://murtazaglasstech.taplink.ws/",
  // The Google Business listing, resolved from the client's share link
  // (share.google/KP1vFmn0PUdJ0VZ3i). The cid is the listing's own id.
  googleMaps: "https://maps.google.com/?cid=6591373478864543300",
  // Google's "Leave a review" form for the same listing
  googleWriteReview: `https://search.google.com/local/writereview?placeid=${googlePlaceId}`,
} as const;
