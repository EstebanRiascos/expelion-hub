"use client";

import Link from "next/link";
import FadeIn from "@/components/shared/FadeIn";
import { motion } from "framer-motion";
import {
  FolderKanban,
  MessageCircle,
  FileText,
  CheckCircle2,
  ArrowRight,
  Clock3,
  Users,
} from "lucide-react";


export default function Portal() {
  return (
    <section
      id="portal"
      className="py-32"
    >

      <FadeIn>

        <div className="mx-auto max-w-7xl px-6">


          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">


            <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 transition-colors duration-300">
              Client Portal
            </span>

            <h2 className="mt-8 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-5xl transition-colors duration-300">
              Tu proyecto siempre bajo control.
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
              Consulta avances, comenta requerimientos, gestiona archivos y
              mantente informado del estado del desarrollo desde un único lugar.
            </p>


          </div>




          {/* Dashboard */}

          <motion.div

            initial={{
              opacity: 0,
              y: 40,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once:true,
            }}

            transition={{
              duration:0.7,
            }}

            className="mt-20 overflow-hidden rounded-[40px] border border-neutral-200/50 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.04)] dark:border-neutral-800 dark:bg-[#13131a] dark:shadow-[0_30px_80px_rgba(0,0,0,.4)] transition-all duration-300"
          >

            {/* Top */}
            <div className="flex flex-col gap-5 border-b border-neutral-200 dark:border-neutral-800 px-8 py-7 md:flex-row md:items-center md:justify-between transition-colors duration-300">

              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                    EXPELION Client Portal
                  </h3>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400 transition-colors duration-300">
                    Activo
                  </span>
                </div>

                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                  Sistema empresarial personalizado
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm text-neutral-900 dark:text-neutral-200 transition-colors duration-300">
                <Users size={16}/>
                4 usuarios
              </div>


            </div>




            <div className="grid lg:grid-cols-4">



              {/* Sidebar */}
              <div className="border-r border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-[#0a0a0f] p-6 transition-colors duration-300">

                <MenuItem
                  icon={<FolderKanban size={19}/>}
                  title="Proyecto"
                  active
                />

                <MenuItem
                  icon={<CheckCircle2 size={19}/>}
                  title="Requerimientos"
                />

                <MenuItem
                  icon={<FileText size={19}/>}
                  title="Documentos"
                />

                <MenuItem
                  icon={<MessageCircle size={19}/>}
                  title="Comentarios"
                />

              </div>


              {/* Content */}
              <div className="lg:col-span-3 p-8 md:p-10">

                <div className="flex flex-col justify-between gap-4 md:flex-row">

                  <div>
                    <h3 className="text-2xl font-semibold dark:text-neutral-100 transition-colors duration-300">
                      Estado general
                    </h3>

                    <p className="mt-2 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                      El desarrollo avanza correctamente según planificación.
                    </p>
                  </div>



                  <div className="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">

                    <Clock3 size={16}/>

                    Última actualización reciente

                  </div>


                </div>





                {/* Progress */}

                <div className="mt-10">


                  <div className="mb-3 flex justify-between text-sm">

                    <span className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                      Desarrollo
                    </span>


                    <span className="font-semibold dark:text-neutral-100 transition-colors duration-300">
                      78%
                    </span>


                  </div>



                  <div className="h-3 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800 transition-colors duration-300">


                    <motion.div

                      initial={{
                        width:0,
                      }}

                      whileInView={{
                        width:"78%",
                      }}

                      viewport={{
                        once:true,
                      }}

                      transition={{
                        duration:1.5,
                      }}

                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-600"

                    />


                  </div>


                </div>





                {/* Stats */}

                <div className="mt-10 grid gap-5 md:grid-cols-2">


                  <Card
                    title="Última actualización"
                    value="Hace 2 horas"
                  />


                  <Card
                    title="Archivos"
                    value="12 disponibles"
                  />


                  <Card
                    title="Comentarios"
                    value="8 nuevos"
                  />


                  <Card
                    title="Próxima reunión"
                    value="Viernes · 10:00 AM"
                  />


                </div>





                <Link href="/login">
                  <button className="mt-10 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-7 py-3 font-medium text-white transition hover:-translate-y-1 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
                    Acceder al Portal
                    <ArrowRight size={18}/>
                  </button>
                </Link>

              </div>

            </div>

          </motion.div>

        </div>

      </FadeIn>

    </section>
  );
}




function MenuItem({
  icon,
  title,
  active=false,
}:{
  icon:React.ReactNode;
  title:string;
  active?:boolean;
}){

  return(

    <div
      className={`mb-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300 ${
        active
        ? "bg-violet-600 text-white"
        :"text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800"
      }`}
    >

      {icon}

      {title}

    </div>

  );
}




function Card({
  title,
  value,
}:{
  title:string;
  value:string;
}){

  return(

    <div className="rounded-2xl border border-neutral-200/50 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-[#0a0a0f] dark:hover:bg-[#13131a] dark:hover:shadow-violet-900/10">


      <p className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
        {title}
      </p>


      <h4 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        {value}
      </h4>


    </div>

  );

}
