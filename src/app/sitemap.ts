import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/company";
import { categoryOrder } from "@/content/labels";
import { bentoPicks, heroLoop, media, pillarMedia, serviceMedia, type MediaItem } from "@/content/media";

// Every public page (each page.tsx under src/app), with absolute URLs from
// SITE_URL. Section anchors such as #services and #work are parts of the
// homepage, not pages, so they stay out. Add a page here when one is added.

// The homepage as SITE_URL, matching its canonical tag (no trailing slash)
const url = (path: string) => (path === "/" ? SITE_URL : new URL(path, SITE_URL).href);

/**
 * When `paths` last changed: the date of the last commit that touched any of
 * them. Left out when git cannot say (no history in the build), rather than
 * claiming a date that is not true.
 */
function lastCommit(...paths: string[]): Date | undefined {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
}

const still = (m: MediaItem) => url(m.poster ?? m.src);
const byId = (id: string | null) => (id ? media.find((m) => m.id === id) : undefined);
const firstSix = (items: (MediaItem | undefined)[]) =>
  [...new Set(items.filter((m): m is MediaItem => Boolean(m)).map(still))].slice(0, 6);

const feature = media.find((m) => m.featured && m.type === "video");

// The first six work images each page shows, in the order it shows them
const homeWork = firstSix([pillarMedia.automotive, pillarMedia.architectural, serviceMedia.automotive, ...bentoPicks.all].map(byId));
const workPageWork = firstSix(categoryOrder.flatMap((c) => media.filter((m) => !m.featured && m.category === c)));

const posters = (...paths: (string | undefined)[]) => paths.filter((p): p is string => Boolean(p)).map(url);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: url("/"),
      // The homepage is put together from the components and content files
      lastModified: lastCommit("src/app/page.tsx", "src/app/layout.tsx", "src/components", "src/content"),
      changeFrequency: "weekly",
      priority: 1,
      images: [...posters(heroLoop?.poster, feature?.poster), ...homeWork],
    },
    {
      url: url("/work"),
      // The newest media entry: media.ts is regenerated whenever one is added
      lastModified: lastCommit("src/content/media.ts"),
      changeFrequency: "weekly",
      priority: 0.8,
      images: [...posters(feature?.poster), ...workPageWork],
    },
    {
      url: url("/reviews"),
      lastModified: lastCommit("src/app/reviews/page.tsx", "src/components/GoogleReviews.tsx", "src/content/reviews.json"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
