// Refreshes src/content/reviews.json from the Google Business listing with the
// Places API (New): the rating, the rating count, and any reviews with text
// that are not in the file yet.
//
//   npm run reviews               fetch, merge, check and write reviews.json
//   npm run reviews -- --check    check reviews.json without writing; with a key,
//                                 also fail if Google's rating or count has moved
//
// Needs GOOGLE_PLACES_API_KEY (Places API (New) enabled) in .env.local or the
// environment. The site shows Google's live rating and count when it can reach
// the API, and googleRating and googleRatingCount from this file when it
// cannot, so running this keeps that fallback current.
//
// The API returns at most five reviews, so the hand-copied ones stay: new ones
// are added at the top, and copied ones it also returns get their exact date.
import fs from "node:fs";
import path from "node:path";
import { googlePlaceId } from "../src/content/links.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const FILE = path.join(ROOT, "src/content/reviews.json");
const ENV_FILE = path.join(ROOT, ".env.local");
const checkOnly = process.argv.includes("--check");

if (fs.existsSync(ENV_FILE)) process.loadEnvFile(ENV_FILE);
const key = process.env.GOOGLE_PLACES_API_KEY;

const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const norm = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();
const keyOf = (r) => norm(`${r.author}\n${r.text}`);

// Problems that would put a wrong rating or count on the site.
function problems(file) {
  const found = [];
  const { googleRating: rating, googleRatingCount: count } = file;
  if (typeof rating !== "number" || rating < 1 || rating > 5) found.push(`googleRating must be 1 to 5, got ${rating}`);
  if (!Number.isInteger(count) || count < 0) found.push(`googleRatingCount must be a whole number, got ${count}`);
  const withText = new Set(file.reviews.filter((r) => r.text.trim()).map(keyOf)).size;
  if (Number.isInteger(count) && count < withText) {
    found.push(`googleRatingCount (${count}) is lower than the ${withText} reviews with text in the file`);
  }
  return found;
}

async function fetchPlace(fields) {
  const res = await fetch(`https://places.googleapis.com/v1/places/${googlePlaceId}?languageCode=en`, {
    headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": fields },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Places API answered ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

function fail(lines) {
  for (const line of lines) console.error(`  ✗ ${line}`);
  process.exit(1);
}

const before = { rating: data.googleRating, count: data.googleRatingCount };
console.log(`reviews.json: ${before.rating} from ${before.count} ratings, updated ${data.updatedAt}, ${data.reviews.length} reviews`);

if (checkOnly) {
  const found = problems(data);
  if (key) {
    const place = await fetchPlace("rating,userRatingCount");
    console.log(`Google now:   ${place.rating} from ${place.userRatingCount} ratings`);
    if (place.rating !== before.rating || place.userRatingCount !== before.count) {
      found.push("the saved rating or count is out of date: run `npm run reviews`");
    }
  } else {
    console.log("No GOOGLE_PLACES_API_KEY: checked the file only, not against Google");
  }
  if (found.length) fail(found);
  console.log("  ✓ reviews.json is consistent");
  process.exit(0);
}

if (!key) {
  fail([
    "GOOGLE_PLACES_API_KEY is not set. Add it to .env.local (see .env.example) and run again;",
    "reviews.json was not changed.",
  ]);
}

const place = await fetchPlace("rating,userRatingCount,reviews");
const byKey = new Map(data.reviews.map((r) => [keyOf(r), r]));
const fresh = [];
let redated = 0;

for (const g of place.reviews ?? []) {
  // originalText is what the reviewer wrote; text may be a translation
  const text = (g.originalText ?? g.text)?.text?.trim() ?? "";
  if (!text) continue;
  const review = {
    author: g.authorAttribution?.displayName ?? "A Google user",
    ...(g.authorAttribution?.photoUri && { authorPhoto: g.authorAttribution.photoUri }),
    ...(g.authorAttribution?.uri && { authorUrl: g.authorAttribution.uri }),
    rating: g.rating,
    text,
    relativeTime: g.relativePublishTimeDescription ?? "",
    publishTime: g.publishTime?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
  };
  const copied = byKey.get(keyOf(review));
  if (!copied) {
    fresh.push(review);
    continue;
  }
  // Hand-copied dates are worked back from "5 years ago"; Google's are exact
  if (copied.publishTime !== review.publishTime) {
    copied.publishTime = review.publishTime;
    copied.relativeTime = review.relativeTime;
    redated++;
  }
}

const next = {
  ...data,
  googleRating: typeof place.rating === "number" ? place.rating : data.googleRating,
  googleRatingCount: typeof place.userRatingCount === "number" ? place.userRatingCount : data.googleRatingCount,
  updatedAt: new Date().toISOString().slice(0, 10),
  reviews: [...fresh, ...data.reviews],
};

const found = problems(next);
if (found.length) fail([...found, "reviews.json was not changed."]);

fs.writeFileSync(FILE, JSON.stringify(next, null, 2) + "\n");
console.log(`Wrote reviews.json: ${next.googleRating} from ${next.googleRatingCount} ratings (was ${before.rating} from ${before.count})`);
console.log(`  ${fresh.length} new ${fresh.length === 1 ? "review" : "reviews"}, ${redated} ${redated === 1 ? "date" : "dates"} corrected from Google`);
