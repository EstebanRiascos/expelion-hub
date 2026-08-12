import HeroBadge from "./HeroBadge";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import HeroButtons from "./HeroButtons";
import HeroPreview from "./HeroPreview";

import BackgroundGlow from "@/components/ui/BackgroundGlow";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
    >

      {/* Glow dinámico */}
      <BackgroundGlow />


      {/* Fondo radial */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#8b5cf620,transparent_40%),radial-gradient(circle_at_bottom_left,#6366f120,transparent_35%)]" />


      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">


        {/* Columna izquierda */}

        <div className="max-w-xl">

          <HeroBadge />

          <HeroTitle />

          <HeroDescription />

          <HeroButtons />

        </div>



        {/* Columna derecha */}

        <HeroPreview />


      </div>


    </section>
  );
}
