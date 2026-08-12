"use client";

import FadeIn from "@/components/shared/FadeIn";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Layers,
  Server,
  Sparkles,
  Terminal,
  Boxes,
} from "lucide-react";


const technologies = [
  {
    name: "Next.js",
    description:
      "Framework moderno para crear aplicaciones rápidas, escalables y optimizadas.",
    icon: Globe,
  },
  {
    name: "React",
    description:
      "Construcción de interfaces dinámicas con excelente experiencia de usuario.",
    icon: Code2,
  },
  {
    name: "TypeScript",
    description:
      "Código más seguro, mantenible y preparado para proyectos empresariales.",
    icon: Terminal,
  },
  {
    name: "Node.js",
    description:
      "Desarrollo de servicios backend eficientes y capaces de crecer.",
    icon: Server,
  },
  {
    name: "PostgreSQL",
    description:
      "Bases de datos robustas para manejar información de forma segura.",
    icon: Database,
  },
  {
    name: "Supabase",
    description:
      "Infraestructura moderna con autenticación y servicios en la nube.",
    icon: Layers,
  },
  {
    name: "Tailwind CSS",
    description:
      "Diseños modernos, rápidos y consistentes para mejores interfaces.",
    icon: Sparkles,
  },
  {
    name: "Docker",
    description:
      "Entornos seguros y preparados para despliegues profesionales.",
    icon: Boxes,
  },
];


export default function Technologies() {

  return (

    <section
      className="py-32"
    >

      <FadeIn>


        <div className="mx-auto max-w-7xl px-6">


          <div className="text-center">


            <span className="inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 transition-colors duration-300">
              Tecnología
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-5xl transition-colors duration-300">
              Construimos con herramientas modernas.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
              Utilizamos tecnologías actuales para crear software rápido,
              seguro, escalable y preparado para crecer junto a tu empresa.
            </p>


          </div>





          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">



            {technologies.map((tech,index)=>{

              const Icon = tech.icon;


              return (

                <motion.div

                  key={tech.name}


                  initial={{
                    opacity:0,
                    y:20,
                  }}


                  whileInView={{
                    opacity:1,
                    y:0,
                  }}


                  viewport={{
                    once:true,
                  }}


                  transition={{
                    duration:0.4,
                    delay:index * 0.05,
                  }}


                  whileHover={{
                    y:-8,
                  }}


                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-neutral-200/50
                    bg-white
                    p-8
                    shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                    transition-all
                    duration-300
                    hover:border-violet-200
                    hover:shadow-xl
                    dark:border-neutral-800
                    dark:bg-[#13131a]
                    dark:hover:bg-[#1a1a24]
                    dark:hover:border-violet-500/50
                  "
                >

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-violet-100/40
                      to-transparent
                      opacity-0
                      transition
                      group-hover:opacity-100
                      dark:from-violet-500/10
                    "
                  />


                  <div className="relative z-10">

                    <div
                      className="
                        flex
                        h-12
                        w-12
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
                        size={24}
                        className="
                          text-violet-700
                          transition
                          group-hover:text-white
                          dark:text-violet-400
                        "
                      />

                    </div>


                    <h3
                      className="
                        mt-6
                        text-xl
                        font-semibold
                        text-neutral-900
                        dark:text-neutral-100
                        transition-colors
                        duration-300
                      "
                    >
                      {tech.name}
                    </h3>


                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-neutral-600
                        dark:text-neutral-400
                        transition-colors
                        duration-300
                      "
                    >
                      {tech.description}
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
