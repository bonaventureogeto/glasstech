import type { Metadata } from "next";
import Nav from "@/components/Nav";
import FeatureVideo from "@/components/FeatureVideo";
import WorkLibrary from "@/components/WorkLibrary";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import MotionSystem from "@/components/MotionSystem";
import JsonLd from "@/components/JsonLd";
import { media } from "@/content/media";
import { videoObject } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Our work | Glasstech & Interior Solutions",
  description:
    "Photos and short clips of glass jobs by Glasstech and Interior Solutions: facades, glass balconies, windows and sliding doors, office partitions, shower cubicles and interiors across Kenya.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const feature = media.find((m) => m.featured && m.type === "video");
  const library = media.filter((m) => !m.featured);

  return (
    <>
      {feature && <JsonLd data={videoObject(feature)} />}
      <Nav />
      <main>
        <section aria-labelledby="work-title" className="border-b border-line bg-frost">
          <div className="shell flex flex-col gap-3 py-12 md:gap-4 md:py-20">
            <p className="eyebrow text-[11px] text-navy md:text-xs">Our work</p>
            <h1 id="work-title" className="text-h2 font-bold md:max-w-[760px]">
              Every project measured, cut and <span className="text-red">fitted.</span>
            </h1>
            <p className="max-w-[640px] text-[15px] text-muted md:text-[17px] md:leading-[1.65]">
              Photos and short clips from real jobs, grouped by the kind of glass work. Select any one to view it full
              size.
            </p>
          </div>
        </section>
        <div className="shell flex flex-col gap-12 py-10 md:gap-16 md:py-16">
          {feature && (
            <section aria-labelledby="featured-title">
              <FeatureVideo video={feature} label="Featured" labelAs="h2" labelId="featured-title" />
            </section>
          )}
          <WorkLibrary items={library} />
        </div>
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <MotionSystem />
    </>
  );
}
