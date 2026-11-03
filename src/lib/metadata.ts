import type { Metadata } from "next";
import { SITE_URL } from "@/content/company";

export const SITE_NAME = "Glasstech and Interior Solutions";

/** The homepage's title; every other page is "{Page} | Glasstech and Interior Solutions". */
export const HOME_TITLE = `${SITE_NAME} | Automotive and Architectural Glass, Nairobi`;

export const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Glasstech and Interior Solutions logo beside a black-framed glass conservatory the team installed",
};

/**
 * A page's complete metadata: title, description, absolute canonical URL,
 * Open Graph and Twitter cards with the shared image, and robots. Next.js
 * replaces (does not merge) nested objects such as openGraph, so each page
 * sets all of it. Leave `title` out for the homepage.
 */
export function pageMetadata({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : HOME_TITLE;
  const url = new URL(path, SITE_URL).href;
  return {
    // The layout's template turns "Our work" into "Our work | Glasstech and Interior Solutions"
    title: title ?? { absolute: HOME_TITLE },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_KE",
      siteName: SITE_NAME,
      url,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}
