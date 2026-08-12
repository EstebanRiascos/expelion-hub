"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import FadeIn from "@/components/shared/FadeIn";


export default function CTA() {

  return (

    <section
      id="contacto"
      className="relative overflow-hidden py-32"
    >


      {/* Background */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-violet-200/40 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-200/40 blur-3xl" />

      </div>




      <FadeIn>


        <div className="mx-auto max-w-5xl px-6">


          <div className="rounded-[40px] border border-neutral-200/50 bg-white px-8 py-20 text-center shadow-[0_4px_30px_rgba(0,0,0,0.04)] md:px-16 dark:border-neutral-800 dark:bg-[#13131a] dark:shadow-[0_30px_80px_rgba(0,0,0,.4)] transition-all duration-300">



            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-5 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 transition-colors duration-300">


              <Sparkles size={16}/>


              EXPELION • Desarrollo de Software


            </div>





            <h2 className="mt-8 text-4xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 md:text-6xl transition-colors duration-300">


              Transformemos tu idea en
              <br />

              una solución tecnológica real.


            </h2>





            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">


              Cuéntanos qué necesita tu empresa y diseñaremos una plataforma
              personalizada que permita optimizar procesos, mejorar resultados
              y crecer mediante tecnología.


            </p>





            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">





              <Link

                href="/login"

                className="inline-flex h-14 items-center justify-center rounded-xl bg-neutral-900 px-8 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-xl dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"

              >

                Entrar al Portal


              </Link>







              <a

                href="mailto:contacto@expelion.com"

                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-neutral-300 px-8 font-semibold text-neutral-700 transition-all hover:-translate-y-1 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-[#1a1a24]"

              >

                Agendar reunión


                <ArrowRight size={18}/>


              </a>




            </div>




          </div>


        </div>



      </FadeIn>


    </section>

  );
}
