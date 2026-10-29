import GoogleReviews from "@/components/GoogleReviews";
import VideoTestimonials from "@/components/VideoTestimonials";
import { YouTubeIcon } from "@/components/icons";
import { socials } from "@/content/links";
import { testimonials } from "@/content/testimonials";
import { getReviews } from "@/lib/googleReviews";

// "What clients say": the client videos from src/content/testimonials.ts, played
// in place, then the Google rating and six reviews, featured ones first. From
// 1024px the heading and YouTube link sit to the left of the videos.
export default function Testimonials() {
  const reviews = getReviews();

  return (
    <section aria-labelledby="testimonials-title" className="bg-white">
      <div className="shell flex flex-col gap-10 py-16 md:gap-14 md:py-24">
        <div className="grid gap-6 md:gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
          <div className="reveal flex max-w-[640px] flex-col gap-3 md:gap-4">
            <p className="eyebrow text-[11px] text-navy md:text-xs">What clients say</p>
            <h2 id="testimonials-title" className="text-h2 font-bold">
              Fitted once, done right.
            </h2>
          </div>
          {testimonials.length > 0 && (
            <>
              <VideoTestimonials
                items={testimonials}
                className="reveal lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-[680px]"
              />
              <div className="lg:col-start-1 lg:row-start-2">
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
            </>
          )}
        </div>
        <div className="border-t border-line pt-10 md:pt-14">
          <GoogleReviews data={reviews} limit={6} />
        </div>
      </div>
    </section>
  );
}
