"use client";

import {
  Bell,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export default function PortalHeader() {

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (

    <header
      className="
        h-20
        border-b
        border-neutral-200
        dark:border-neutral-800
        bg-white
        dark:bg-neutral-950
        px-6
        flex
        items-center
        justify-between
        transition-colors
        duration-300
      "
    >


      {/* Información del proyecto */}

      <div>

        <h1
          className="
            font-semibold
            text-neutral-900
            dark:text-neutral-100
          "
        >
          EXPELION Client Portal
        </h1>


        <p
          className="
            text-sm
            text-neutral-500
            dark:text-neutral-400
          "
        >
          Empresa Demo • Sistema ERP Empresarial
        </p>


      </div>




      {/* Acciones usuario */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >


        {/* Estado */}

        <span
          className="
            hidden
            rounded-full
            bg-green-100
            dark:bg-green-900/30
            px-4
            py-2
            text-sm
            font-medium
            text-green-700
            dark:text-green-400
            md:block
          "
        >

          En desarrollo

        </span>


        {/* Toggle tema */}

        {mounted && (
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-neutral-200
              dark:border-neutral-700
              text-neutral-600
              dark:text-neutral-300
              transition-all
              duration-300
              hover:bg-neutral-100
              dark:hover:bg-neutral-800
              hover:scale-105
            "
          >
            {isDark ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-violet-600" />
            )}
          </button>
        )}


        {/* Notificaciones */}

        <button
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-neutral-200
            dark:border-neutral-700
            text-neutral-600
            dark:text-neutral-300
            transition-all
            duration-300
            hover:bg-neutral-100
            dark:hover:bg-neutral-800
          "
        >

          <Bell size={18}/>


          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-violet-600
            "
          />


        </button>




        {/* Usuario */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-2
            py-1
            transition-all
            duration-300
            hover:bg-neutral-100
            dark:hover:bg-neutral-800
          "
        >


          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-violet-600
              font-semibold
              text-white
            "
          >

            JD

          </div>



          <div className="hidden md:block">


            <p
              className="
                text-sm
                font-semibold
                text-neutral-900
                dark:text-neutral-100
              "
            >
              Juan Demo
            </p>


            <p
              className="
                text-xs
                text-neutral-500
                dark:text-neutral-400
              "
            >
              Administrador
            </p>


          </div>




          <ChevronDown
            size={16}
            className="text-neutral-500 dark:text-neutral-400"
          />


        </div>



      </div>



    </header>

  );

}