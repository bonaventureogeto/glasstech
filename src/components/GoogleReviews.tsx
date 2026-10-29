import Image from "next/image";
import Link from "next/link";
import ReviewText from "@/components/ReviewText";
import { GoogleIcon, StarIcon } from "@/components/icons";
import { links } from "@/content/links";
import type { Review, ReviewData } from "@/lib/googleReviews";

// The Google rating row and review cards. With `limit` only that many are shown,
// featured reviews first, with a link to /reviews for the rest. The rating row
// always renders; the grid only when there are reviews to put in it.
export default function GoogleReviews({ data, limit }: { data: ReviewData; limit?: number }) {
  const shown = limit
    ? [...data.reviews.filter((r) => r.featured), ...data.reviews.filter((r) => !r.featured)].slice(0, limit)
    : data.reviews;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="reveal flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <GoogleIcon size={28} />
          {data.rating !== null ? (
            <>
              <span aria-hidden="true" className="font-display text-[32px] leading-none font-extrabold">
                {data.rating.toFixed(1)}
              </span>
              <Stars rating={data.rating} size="lg" label={`Rated ${data.rating.toFixed(1)} out of 5 on Google`} />
              {data.count !== null && (
                <span className="text-sm text-muted">
                  Based on {data.count} Google {data.count === 1 ? "review" : "reviews"}
                </span>
              )}
            </>
          ) : (
            <span className="font-display text-xl font-semibold">Our reviews on Google</span>
          )}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={links.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Read all on Google
          </a>
          <a href={links.googleWriteReview} target="_blank" rel="noopener noreferrer" className="btn btn-red">
            Leave a review
          </a>
        </div>
      </div>

      {shown.length > 0 && (
        <>
          <ul className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {shown.map((r) => (
              <ReviewCard key={`${r.author}-${r.publishTime}`} review={r} />
            ))}
          </ul>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">Ratings and reviews from Google Maps.</p>
            {shown.length < data.reviews.length && (
              <Link href="/reviews" className="btn btn-outline">
                See all {data.reviews.length} reviews
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ReviewCard({ review: r }: { review: Review }) {
  return (
    <li className="reveal flex flex-col gap-4 rounded-card border border-line bg-frost p-6">
      <Stars rating={r.rating} size="sm" label={`Rated ${r.rating} out of 5`} />
      <ReviewText text={r.text} />
      <div className="mt-auto flex items-center gap-3">
        {r.authorPhoto ? (
          <Image src={r.authorPhoto} alt="" width={40} height={40} className="size-10 rounded-full bg-tile object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-10 flex-none items-center justify-center rounded-full bg-tile font-semibold text-navy"
          >
            {Array.from(r.author)[0]?.toUpperCase()}
          </span>
        )}
        <div className="flex min-w-0 flex-col">
          {r.authorUrl ? (
            <a
              href={r.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-sm font-semibold text-ink hover:text-red"
            >
              {r.author}
            </a>
          ) : (
            <span className="truncate text-sm font-semibold">{r.author}</span>
          )}
          {r.relativeTime && <span className="text-xs text-muted">{r.relativeTime}</span>}
        </div>
      </div>
      <p className="border-t border-line pt-3 text-xs text-muted">Posted on Google</p>
    </li>
  );
}

// Red stars for the rating, to the nearest half star; the rest in outline grey.
function Stars({ rating, size, label }: { rating: number; size: "sm" | "lg"; label: string }) {
  const halves = Math.round(rating * 2);
  const box = size === "sm" ? "size-4" : "size-5";
  return (
    <span role="img" aria-label={label} className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={`relative ${box}`}>
          <StarIcon className={`block ${box} text-outline`} />
          {halves > i * 2 && (
            <span className={`absolute inset-y-0 left-0 overflow-hidden ${halves === i * 2 + 1 ? "w-1/2" : "w-full"}`}>
              <StarIcon className={`block ${box} max-w-none text-red`} />
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
