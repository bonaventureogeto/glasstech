// JSON-LD builders, typed with schema-dts so a wrong property or type fails
// the build. Rendered with <JsonLd>.
import type { VideoObject, WithContext } from "schema-dts";
import type { MediaItem } from "@/content/media";
import { SITE_URL } from "@/content/company";

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;

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
