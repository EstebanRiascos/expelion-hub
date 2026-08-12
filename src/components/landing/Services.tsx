"use client";

import FadeIn from "@/components/shared/FadeIn";
import { motion } from "framer-motion";
import {
  Code2,
  Globe,
  Smartphone,
  ShieldCheck,
  Database,
  Workflow,
} from "lucide-react";


const services = [
  {
    icon: Code2,
    title: "Software a medida",
    description:
      "Desarrollamos plataformas totalmente adaptadas a los procesos y objetivos específicos de tu empresa.",
  },
  {
    icon: Globe,
    title: "Aplicaciones Web",
    description:
      "Creamos plataformas modernas, rápidas y optimizadas para brindar una experiencia profesional.",
  },
  {
    icon: Smartphone,
    title: "Aplicaciones móviles",
    description:
      "Diseñamos aplicaciones Android e iOS enfocadas en usabilidad y rendimiento.",
  },
  {
    icon: Database,
    title: "Bases de datos",
    description:
      "Construimos arquitecturas seguras, organizadas y preparadas para crecer.",
  },
  {
    icon: Workflow,
    title: "Automatización",
    description:
      "Digitalizamos procesos para reducir tiempos y aumentar la productividad.",
  },
  {
    icon: ShieldCheck,
    title: "Soporte continuo",
    description:
      "Acompañamos la evolución del software después de su implementación.",
  },
];


export default function Services() {
  return (
    <section
      id="servicios"
      className="py-32"
    >

      <FadeIn>

        <div className="mx-auto max-w-7xl px-6">


          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">


            <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 transition-colors duration-300">
              Servicios
            </span>

            <h2 className="mt-8 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-5xl transition-colors duration-300">
              Todo lo que necesitas para digitalizar tu empresa.
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
              Diseñamos soluciones tecnológicas enfocadas en mejorar procesos,
              optimizar recursos y hacer crecer organizaciones mediante software.
            </p>


          </div>



          {/* Cards */}

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">


            {services.map((service, index) => {

              const Icon = service.icon;


              return (

                <motion.div

                  key={service.title}

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
                    delay: index * 0.08,
                  }}

                  whileHover={{
                    y: -8,
                  }}

                  className="group relative overflow-hidden rounded-3xl border border-neutral-200/50 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-violet-200 hover:shadow-2xl dark:border-neutral-800 dark:bg-[#13131a] dark:hover:bg-[#1a1a24] dark:hover:border-violet-500/50"

                >


                  {/* Glow */}

                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-violet-500/10" />



                  <div className="relative">


                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 transition-all duration-300 group-hover:bg-violet-600 dark:bg-violet-900/30 dark:group-hover:bg-violet-600">


                      <Icon
                        size={28}
                        className="text-violet-700 transition group-hover:text-white dark:text-violet-400"
                      />


                    </div>



                    <h3 className="mt-8 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                      {service.title}
                    </h3>



                    <p className="mt-4 leading-8 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                      {service.description}
                    </p>



                  </div>


                </motion.div>

              );

            })}


          </div>


        </div>


      </FadeIn>


    </section>
  );
}
