import "server-only";
import { cache } from "react";
import file from "@/content/reviews.json";
import { googlePlaceId } from "@/content/links";

// The listing's Google rating, its rating count and its reviews: the one
// source for every rating, count and review on the site.
//
// The rating and count come live from the Places API when GOOGLE_PLACES_API_KEY
// is set and Google answers, cached for a day like the pages that show them.
// Otherwise they fall back to googleRating and googleRatingCount in
// src/content/reviews.json, which `npm run reviews` refreshes. The reviews
// themselves always come from reviews.json: the API returns five at most.

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
  /** How many ratings the average is based on: the count Google shows. Not
   *  reviews.length, which only holds the reviews with text. */
  count: number | null;
  /** Reviews with text, highest rated first, then newest */
  reviews: Review[];
}

interface ReviewFile {
  googleRating: number | null;
  googleRatingCount: number | null;
  updatedAt: string;
  reviews: Review[];
}

const saved: ReviewFile = file;

const PLACES_URL = `https://places.googleapis.com/v1/places/${googlePlaceId}`;

/** The live rating and count, or null when there is no key or no answer. */
async function fetchLiveRating(): Promise<{ rating?: number; count?: number } | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(PLACES_URL, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount" },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.warn(`Places API answered ${res.status}; using the rating saved in reviews.json`);
      return null;
    }
    const place: { rating?: unknown; userRatingCount?: unknown } = await res.json();
    return {
      rating: typeof place.rating === "number" ? place.rating : undefined,
      count: typeof place.userRatingCount === "number" ? place.userRatingCount : undefined,
    };
  } catch (error) {
    console.warn(`Places API unavailable (${(error as Error).message}); using the rating saved in reviews.json`);
    return null;
  }
}

/** Rating, count and reviews: one call per render, shared by every section. */
export const getGoogleReviews = cache(async (): Promise<ReviewData> => {
  const live = await fetchLiveRating();
  const rating = live?.rating ?? saved.googleRating;
  return {
    rating: rating === null ? null : Math.round(rating * 10) / 10,
    count: live?.count ?? saved.googleRatingCount,
    reviews: textReviews(),
  };
});

/** The label of every link to the listing's reviews on Google. */
export const readAllOnGoogle = (count: number | null) =>
  count !== null ? `Read all ${count} reviews on Google` : "Read all reviews on Google";

/** Reviews with text only, highest rated first, then newest. */
function textReviews(): Review[] {
  // A review pasted in twice is shown once
  const unique = new Map<string, Review>();
  for (const r of saved.reviews) {
    if (!r.text.trim()) continue;
    const key = `${r.author}\n${r.text}`.replace(/\s+/g, " ").trim().toLowerCase();
    if (!unique.has(key)) unique.set(key, { ...r, relativeTime: timeAgo(r.publishTime) ?? r.relativeTime });
  }
  return [...unique.values()].sort((a, b) => b.rating - a.rating || time(b) - time(a));
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
