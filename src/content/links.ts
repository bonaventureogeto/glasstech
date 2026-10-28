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

export const links = {
  // The client's link-in-bio page: their saved number and every social profile.
  taplink: "https://murtazaglasstech.taplink.ws/",
  // The Google Business listing, resolved from the client's share link
  // (share.google/KP1vFmn0PUdJ0VZ3i). The cid is the listing's own id.
  googleMaps: "https://maps.google.com/?cid=6591373478864543300",
} as const;
