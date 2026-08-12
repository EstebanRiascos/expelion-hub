"use client";

import FadeIn from "@/components/shared/FadeIn";
import { motion } from "framer-motion";
import {
  Code2,
  Layers3,
  Headphones,
} from "lucide-react";


const features = [
  {
    icon: Code2,
    title: "Desarrollo a medida",
    description:
      "Creamos soluciones digitales adaptadas a los procesos, objetivos y necesidades reales de cada empresa.",
  },
  {
    icon: Layers3,
    title: "Tecnología moderna",
    description:
      "Utilizamos herramientas actuales para construir plataformas rápidas, seguras y escalables.",
  },
  {
    icon: Headphones,
    title: "Acompañamiento continuo",
    description:
      "Trabajamos junto a nuestros clientes durante todo el proceso de evolución del software.",
  },
];


export default function About() {

  return (

    <section
      id="nosotros"
      className="py-32"
    >

      <FadeIn>

        <div className="mx-auto max-w-7xl px-6">


          <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">



            {/* Texto */}

            <div className="max-w-2xl">


              <span className="inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 transition-colors duration-300">
                ¿Quiénes somos?
              </span>

              <h2 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 md:text-5xl transition-colors duration-300">
                Construimos software pensado para hacer crecer empresas.
              </h2>

              <p className="mt-8 text-lg leading-8 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                En EXPELION desarrollamos soluciones digitales personalizadas
                que permiten optimizar procesos, automatizar tareas y mejorar
                la experiencia de los usuarios mediante tecnología moderna.
              </p>

              <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                Nuestro objetivo es convertir ideas empresariales en sistemas
                funcionales, escalables y preparados para el futuro.
              </p>



            </div>




            {/* Características */}

            <div className="space-y-5">


              {features.map((feature, index) => {

                const Icon = feature.icon;


                return (

                  <motion.div

                    key={feature.title}

                    initial={{
                      opacity:0,
                      x:40,
                    }}

                    whileInView={{
                      opacity:1,
                      x:0,
                    }}

                    viewport={{
                      once:true,
                    }}

                    transition={{
                      duration:0.5,
                      delay:index * 0.12,
                    }}

                    whileHover={{
                      y:-6,
                    }}

                    className="
                      group
                      flex
                      gap-5
                      rounded-3xl
                      border
                      border-neutral-200/50
                      bg-white
                      p-7
                      shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                      transition-all
                      duration-300
                      hover:shadow-xl
                      dark:border-neutral-800
                      dark:bg-[#13131a]
                      dark:hover:bg-[#1a1a24]
                      dark:hover:border-violet-500/50
                    "
                  >

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-violet-100
                        transition-all
                        duration-300
                        group-hover:bg-violet-600
                        dark:bg-violet-900/30
                        dark:group-hover:bg-violet-600
                      "
                    >
                      <Icon
                        size={26}
                        className="
                          text-violet-700
                          transition
                          group-hover:text-white
                          dark:text-violet-400
                        "
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                        {feature.title}
                      </h3>

                      <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>


                  </motion.div>


                );

              })}


            </div>


          </div>


        </div>


      </FadeIn>


    </section>

  );

}
