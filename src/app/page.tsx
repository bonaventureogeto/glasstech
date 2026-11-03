import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import TwoPillars from "@/components/TwoPillars";
import ServicesGrid from "@/components/ServicesGrid";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import MotionSystem from "@/components/MotionSystem";
import JsonLd from "@/components/JsonLd";
import { experience } from "@/content/company";
import { media } from "@/content/media";
import { getGoogleReviews } from "@/lib/googleReviews";
import { pageMetadata } from "@/lib/metadata";
import { localBusiness, videoObject } from "@/lib/structuredData";

// Regenerated daily so review dates ("3 months ago") stay current.
export const revalidate = 86400;

// The experience figure comes from company.ts, so it follows the stat label.
export const metadata = pageMetadata({
  path: "/",
  description: `Automotive and architectural glass in Nairobi: windshields, shower cubicles, partitions and facades from a team with ${experience}.`,
});

export default async function Home() {
  const feature = media.find((m) => m.featured && m.type === "video");
  const reviews = await getGoogleReviews();

  return (
    <>
      <JsonLd data={localBusiness(reviews)} />
      {feature && <JsonLd data={videoObject(feature)} />}
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <TwoPillars />
        <ServicesGrid />
        <Work />
        <Process />
        <Testimonials />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <MotionSystem />
    </>
  );
}
