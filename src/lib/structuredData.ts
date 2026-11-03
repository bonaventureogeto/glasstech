// JSON-LD builders, typed with schema-dts so a wrong property or type fails
// the build. Rendered with <JsonLd>.
import type { LocalBusiness, VideoObject, WithContext } from "schema-dts";
import { company, SITE_URL } from "@/content/company";
import { links, socials } from "@/content/links";
import type { MediaItem } from "@/content/media";
import type { ReviewData } from "@/lib/googleReviews";

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;

/**
 * The business, for the homepage. The AggregateRating is the same rating and
 * count the page shows, from getGoogleReviews().
 */
export function localBusiness({ rating, count }: ReviewData): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: company.name,
    url: SITE_URL,
    logo: absoluteUrl("/apple-touch-icon.png"),
    image: absoluteUrl("/og.jpg"),
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
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: { "@type": "Country", name: company.workshop.country },
    sameAs: [...Object.values(socials).map((s) => s.href), links.taplink],
    ...(rating !== null &&
      count !== null && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating,
          ratingCount: count,
          bestRating: 5,
          worstRating: 1,
        },
      }),
  };
}

/** A video that can be watched on the page it is marked up on. */
export function videoObject(video: MediaItem): WithContext<VideoObject> {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description ?? video.alt,
    thumbnailUrl: absoluteUrl(video.poster ?? video.thumb),
    contentUrl: absoluteUrl(video.src),
    ...(video.uploadDate && { uploadDate: video.uploadDate }),
    ...(video.duration && { duration: `PT${Math.round(video.duration)}S` }),
  };
}
