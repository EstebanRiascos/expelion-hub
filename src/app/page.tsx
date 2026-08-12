import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/Footer";

import PromoBanner from "@/components/landing/PromoBanner";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Stats from "@/components/landing/Stats";
import Services from "@/components/landing/Services";
import Process from "@/components/landing/Process";
import Portal from "@/components/landing/Portal";
import Technologies from "@/components/landing/Technologies";
import CTA from "@/components/landing/CTA";
import GlobalBackground from "@/components/landing/GlobalBackground";

export default function HomePage() {
  return (
    <>
      <GlobalBackground />
      <Navbar />

      <main className="pt-20">
        <PromoBanner />
        
        <Hero />

        <About />

        <Stats />

        <Services />

        <Process />

        <Portal />

        <Technologies />

        <CTA />

      </main>

      <Footer />

    </>
  );
}