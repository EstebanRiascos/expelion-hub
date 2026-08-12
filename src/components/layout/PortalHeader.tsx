"use client";

import {
  Bell,
  ChevronDown,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { usePortalData } from "@/components/providers/PortalProvider";

export default function PortalHeader() {

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user, profile, project } = usePortalData();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const displayName = profile?.full_name || user.email;
  const initials = displayName.substring(0, 2).toUpperCase();
  const displayRole = profile?.role === "client" ? "Cliente" : profile?.role === "admin" ? "Administrador" : profile?.role || "Usuario";
  const projectName = project?.name || "Sin Proyecto";

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
          {profile?.company_name || "Mi Empresa"} • {projectName}
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

        {project?.status && (
          <span
            className={`
              hidden
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              md:block
              ${
                project.status === 'En desarrollo' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                project.status === 'Completado' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              }
            `}
          >
            {project.status}
          </span>
        )}


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
              <Moon size={18} className="text-violet-400" />
            ) : (
              <Sun size={18} className="text-amber-500" />
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


        {/* Logout */}
        <button
          onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            window.location.href = "/login";
          }}
          title="Cerrar sesión"
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
            hover:bg-red-50
            dark:hover:bg-red-900/20
            hover:text-red-600
            dark:hover:text-red-400
          "
        >
          <LogOut size={18} />
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
              uppercase
            "
          >

            {initials}

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
              {displayName}
            </p>


            <p
              className="
                text-xs
                text-neutral-500
                dark:text-neutral-400
                capitalize
              "
            >
              {displayRole}
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