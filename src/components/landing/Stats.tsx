"use client";

import FadeIn from "@/components/shared/FadeIn";
import AnimatedStat from "@/components/ui/AnimatedStat";

const stats = [
  {
    end: 20,
    suffix: "+",
    title: "Proyectos desarrollados",
  },
  {
    end: 98,
    suffix: "%",
    title: "Clientes satisfechos",
  },
  {
    end: 100,
    suffix: "%",
    title: "Software personalizado",
  },
  {
    end: 24,
    suffix: "/7",
    title: "Acompañamiento",
  },
];


export default function Stats() {
  return (
    <section
      className="py-32"
    >

      <FadeIn>

        <div className="mx-auto max-w-7xl px-6">


          <div className="mx-auto max-w-3xl text-center">


            <span className="inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 transition-colors duration-300">
              Nuestra experiencia
            </span>

            <h2 className="mt-8 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-5xl transition-colors duration-300">
              Resultados que respaldan nuestro trabajo.
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
              Creamos soluciones digitales enfocadas en generar valor,
              mejorar procesos y acompañar el crecimiento de cada empresa.
            </p>


          </div>



          <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">


            {stats.map((stat) => (

              <div
                key={stat.title}
                className="group rounded-3xl border border-neutral-200/50 bg-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-neutral-800 dark:bg-[#13131a] dark:hover:shadow-violet-900/10"
              >

                <AnimatedStat
                  end={stat.end}
                  suffix={stat.suffix}
                  title={stat.title}
                />

              </div>

            ))}


          </div>


        </div>


      </FadeIn>


    </section>
  );
}
