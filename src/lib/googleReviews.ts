import "server-only";
import file from "@/content/reviews.json";

// The listing's Google rating and reviews, copied by hand from Google Maps into
// src/content/reviews.json. The site makes no requests to Google for them.

export interface Review {
  author: string;
  authorPhoto?: string;
  /** The reviewer's Google Maps profile */
  authorUrl?: string;
  rating: number;
  /** Exactly as the reviewer wrote it */
  text: string;
  /** As Google showed it on the day it was copied, e.g. "3 months ago" */
  relativeTime: string;
  /** ISO 8601 date: the day it was copied, less relativeTime */
  publishTime: string;
  /** Fills the homepage's six slots before the rest */
  featured?: boolean;
}

export interface ReviewData {
  /** Average rating on Google, e.g. 4.3 */
  rating: number | null;
  /** How many ratings it is based on */
  count: number | null;
  reviews: Review[];
}

const saved: ReviewData = file;

/** Reviews with text only, highest rated first, then newest. */
export function getReviews(): ReviewData {
  // A review pasted in twice is shown once
  const unique = new Map<string, Review>();
  for (const r of saved.reviews) {
    if (!r.text.trim()) continue;
    const key = `${r.author}\n${r.text}`.replace(/\s+/g, " ").trim().toLowerCase();
    if (!unique.has(key)) unique.set(key, { ...r, relativeTime: timeAgo(r.publishTime) ?? r.relativeTime });
  }
  return {
    rating: saved.rating,
    count: saved.count,
    reviews: [...unique.values()].sort((a, b) => b.rating - a.rating || time(b) - time(a)),
  };
}

const time = (r: Review) => Date.parse(r.publishTime) || 0;

// Google's wording ("a week ago", "3 months ago"), worked out each time the page
// is generated so a review does not stay "a week ago" forever.
function timeAgo(publishTime: string): string | null {
  const published = Date.parse(publishTime);
  if (Number.isNaN(published)) return null;
  const days = (Date.now() - published) / 86_400_000;
  const units = [
    [365, "a year", "years"],
    [30, "a month", "months"],
    [7, "a week", "weeks"],
    [1, "a day", "days"],
  ] as const;
  for (const [length, one, many] of units) {
    const n = Math.floor(days / length);
    if (n >= 1) return n === 1 ? `${one} ago` : `${n} ${many} ago`;
  }
  return "today";
}
