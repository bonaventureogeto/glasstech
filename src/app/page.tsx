import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Configurator from "@/components/Configurator";
import Marquee from "@/components/Marquee";
import TwoPillars from "@/components/TwoPillars";
import ServicesGrid from "@/components/ServicesGrid";
import WorkRail from "@/components/WorkRail";
import Process from "@/components/Process";
import StatsWhy from "@/components/StatsWhy";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MotionSystem from "@/components/MotionSystem";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Configurator />
        <Marquee />
        <TwoPillars />
        <ServicesGrid />
        <WorkRail />
        <Process />
        <StatsWhy />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <MotionSystem />
    </>
  );
}
