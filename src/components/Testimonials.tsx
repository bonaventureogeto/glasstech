import GoogleReviews from "@/components/GoogleReviews";
import VideoTestimonials from "@/components/VideoTestimonials";
import { YouTubeIcon } from "@/components/icons";
import { socials } from "@/content/links";
import { media } from "@/content/media";
import { testimonials } from "@/content/testimonials";
import { getGoogleReviews } from "@/lib/googleReviews";

// "What clients say": Jeff Koinange's feature, then the client videos from
// src/content/testimonials.ts, all played in place, then the Google rating
// and six reviews, featured ones first.
export default async function Testimonials() {
  const reviews = await getGoogleReviews();
  const feature = media.find((m) => m.featured && m.type === "video");

  return (
    <section aria-labelledby="testimonials-title" className="bg-white">
      <div className="shell flex flex-col gap-10 py-16 md:gap-14 md:py-24">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="reveal flex max-w-[640px] flex-col gap-3 md:gap-4">
            <p className="eyebrow text-[11px] text-navy md:text-xs">What clients say</p>
            <h2 id="testimonials-title" className="text-h2 font-bold">
              Fitted once, done right.
            </h2>
          </div>
          <VideoTestimonials
            feature={feature}
            items={testimonials}
            aside={
              <div className="flex max-w-[420px] flex-col items-start gap-3 md:gap-4">
                <p className="eyebrow text-[11px] text-navy md:text-xs">Client videos</p>
                <p className="text-[15px] text-muted md:text-[17px] md:leading-[1.65]">
                  Clients on the work we did for them, in their own words.
                </p>
                <a
                  href={socials.youtube.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline px-[22px]"
                >
                  <YouTubeIcon size={18} />
                  Watch more on YouTube
                </a>
              </div>
            }
          />
        </div>
        <div className="border-t border-line pt-10 md:pt-14">
          <GoogleReviews data={reviews} limit={6} />
        </div>
      </div>
    </section>
  );
}
