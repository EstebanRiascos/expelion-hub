"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  MessageSquare,
  FileText,
  Users,
  Activity,
} from "lucide-react";

export default function HeroPreview() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="relative mx-auto w-full max-w-xl scale-95 lg:scale-100"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes premium-float {
          0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 30px 70px rgba(0,0,0,0.08); }
          50% { transform: translateY(-8px) scale(1.005); box-shadow: 0 35px 80px rgba(0,0,0,0.1); }
        }
        @keyframes premium-float-mobile {
          0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 20px 50px rgba(0,0,0,0.08); }
          50% { transform: translateY(-5px) scale(1.005); box-shadow: 0 25px 60px rgba(0,0,0,0.1); }
        }
        .animate-premium-float {
          animation: premium-float-mobile 10s ease-in-out infinite;
          will-change: transform, box-shadow;
        }
        @media (min-width: 1024px) {
          .animate-premium-float {
            animation: premium-float 10s ease-in-out infinite;
          }
        }
      `}} />

      <div className="animate-premium-float rounded-[28px] border border-neutral-200/50 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:border-neutral-800 dark:bg-[#13131a] transition-colors duration-300">
        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <div className="flex items-center gap-2">

              <h3 className="text-base font-semibold dark:text-neutral-200 transition-colors duration-300">
                EXPELION Portal
              </h3>


              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[11px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400 transition-colors duration-300">

                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                Live

              </span>

            </div>


            <p className="mt-1 text-xs text-neutral-500">
              Gestión de proyecto empresarial
            </p>

          </div>


          <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">

            <Users size={14} />

            <span className="text-xs font-medium">
              4 usuarios
            </span>

          </div>


        </div>



        {/* Progreso */}


        <div className="mt-6">


          <div className="mb-2 flex items-center justify-between text-xs">


            <span className="text-neutral-600">
              Estado del proyecto
            </span>


            <span className="font-semibold">
              78%
            </span>


          </div>



          <div className="h-2.5 overflow-hidden rounded-full bg-neutral-200">


            <motion.div

              initial={{
                width: 0,
              }}

              animate={{
                width: "78%",
              }}

              transition={{
                duration: 1.5,
              }}

              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-600"

            />


          </div>


        </div>




        {/* Actividad */}

        <div className="mt-6">


          <div className="mb-3 flex items-center gap-2">


            <Activity size={16} />


            <h4 className="text-sm font-semibold">
              Actividad reciente
            </h4>


          </div>




          <div className="space-y-3">


            <Card
              icon={<CheckCircle2 size={18} />}
              title="Módulo de Inventario"
              subtitle="Completado"
              color="bg-green-100 text-green-700"
            />


            <Card
              icon={<Clock3 size={18} />}
              title="Facturación electrónica"
              subtitle="En desarrollo"
              color="bg-yellow-100 text-yellow-700"
            />


            <Card
              icon={<MessageSquare size={18} />}
              title="Nuevo comentario"
              subtitle="Cliente respondió"
              color="bg-blue-100 text-blue-700"
            />


            <Card
              icon={<FileText size={18} />}
              title="Documento actualizado"
              subtitle="Hace 10 minutos"
              color="bg-violet-100 text-violet-700"
            />


          </div>


        </div>


      </div>


    </motion.div>
  );
}



interface CardProps {

  icon: React.ReactNode;

  title: string;

  subtitle: string;

  color: string;

}



function Card({
  icon,
  title,
  subtitle,
  color,
}: CardProps) {


  return (

    <motion.div

      whileHover={{
        x: 5,
      }}

      className="flex items-center justify-between rounded-2xl border border-neutral-200 px-4 py-3 transition-all dark:border-neutral-800/60 dark:bg-[#0a0a0f]"

    >


      <div className="flex items-center gap-3">


        <div className={`rounded-xl p-2.5 ${color} dark:bg-opacity-20`}>

          {icon}

        </div>



        <div>


          <p className="text-sm font-semibold dark:text-neutral-200">
            {title}
          </p>


          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </p>


        </div>


      </div>



      <div className="h-2 w-2 rounded-full bg-green-500" />


    </motion.div>

  );

}
