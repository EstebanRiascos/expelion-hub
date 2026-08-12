"use client";

import FadeIn from "@/components/shared/FadeIn";
import { motion } from "framer-motion";
import {
  CalendarCheck2,
  Search,
  Code2,
  Bug,
  Rocket,
} from "lucide-react";


const steps = [
  {
    number: "01",
    icon: CalendarCheck2,
    title: "Reunión",
    description:
      "Escuchamos tus necesidades, objetivos y entendemos el funcionamiento de tu empresa.",
  },
  {
    number: "02",
    icon: Search,
    title: "Análisis",
    description:
      "Diseñamos la solución tecnológica adecuada y definimos el alcance del proyecto.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Desarrollo",
    description:
      "Construimos el software utilizando tecnologías modernas y metodologías ágiles.",
  },
  {
    number: "04",
    icon: Bug,
    title: "Pruebas",
    description:
      "Verificamos cada funcionalidad para garantizar calidad, estabilidad y seguridad.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Entrega",
    description:
      "Publicamos el sistema y continuamos brindando soporte y mejoras continuas.",
  },
];


export default function Process() {
  return (
    <section
      id="proceso"
      className="py-32"
    >

      <FadeIn>

        <div className="mx-auto max-w-7xl px-6">


          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">


            <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 transition-colors duration-300">
              Nuestro proceso
            </span>

            <h2 className="mt-8 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-5xl transition-colors duration-300">
              Así convertimos una idea en software.
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
              Trabajamos mediante un proceso claro y organizado para que
              conozcas cada etapa del desarrollo de tu proyecto.
            </p>


          </div>



          {/* Steps */}

          <div className="mt-20 grid gap-6 lg:grid-cols-5">


            {steps.map((step, index) => {

              const Icon = step.icon;


              return (

                <motion.div

                  key={step.number}

                  initial={{
                    opacity: 0,
                    y: 30,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}

                  whileHover={{
                    y: -8,
                  }}


                  className="group relative overflow-hidden rounded-3xl border border-neutral-200/50 bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-violet-200 hover:shadow-2xl dark:border-neutral-800 dark:bg-[#13131a] dark:hover:bg-[#1a1a24] dark:hover:border-violet-500/50"
                >


                  {/* Número */}

                  <span className="absolute right-5 top-4 text-6xl font-bold text-neutral-200 transition-colors duration-300 group-hover:text-violet-100 dark:text-neutral-800 dark:group-hover:text-violet-900/20">
                    {step.number}
                  </span>



                  {/* Icon */}

                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 transition-all duration-300 group-hover:bg-violet-600 dark:bg-violet-900/30 dark:group-hover:bg-violet-600">


                    <Icon
                      size={26}
                      className="text-violet-700 transition group-hover:text-white dark:text-violet-400"
                    />


                  </div>



                  <h3 className="relative mt-8 text-xl font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                    {step.title}
                  </h3>



                  <p className="mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                    {step.description}
                  </p>



                </motion.div>

              );

            })}


          </div>


        </div>


      </FadeIn>


    </section>
  );
}
