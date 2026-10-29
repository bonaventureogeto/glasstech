import type { Metadata } from "next";
import Nav from "@/components/Nav";
import GoogleReviews from "@/components/GoogleReviews";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import MotionSystem from "@/components/MotionSystem";
import { getReviews } from "@/lib/googleReviews";

// Regenerated daily so review dates ("3 months ago") stay current.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Reviews | Glasstech & Interior Solutions",
  description:
    "Google reviews of Glasstech and Interior Solutions: what clients say about our automotive, architectural and interior glass work in Nairobi.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const reviews = getReviews();

  return (
    <>
      <Nav />
      <main>
        <section aria-labelledby="reviews-title" className="border-b border-line bg-frost">
          <div className="shell flex flex-col gap-3 py-12 md:gap-4 md:py-20">
            <p className="eyebrow text-[11px] text-navy md:text-xs">Reviews</p>
            <h1 id="reviews-title" className="text-h2 font-bold md:max-w-[760px]">
              What clients say, in their own <span className="text-red">words.</span>
            </h1>
            <p className="max-w-[640px] text-[15px] text-muted md:text-[17px] md:leading-[1.65]">
              Reviews posted on Google by people we have measured, made and fitted for, shown exactly as they were
              written.
            </p>
          </div>
        </section>
        <div className="shell py-10 md:py-16">
          <GoogleReviews data={reviews} />
        </div>
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <MotionSystem />
    </>
  );
}
