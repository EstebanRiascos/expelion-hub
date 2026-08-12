"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import useActiveSection from "@/hooks/useActiveSection";


const links = [
  {
    name: "Inicio",
    href: "#inicio",
    id: "inicio",
  },
  {
    name: "Servicios",
    href: "#servicios",
    id: "servicios",
  },
  {
    name: "Proceso",
    href: "#proceso",
    id: "proceso",
  },
  {
    name: "Portal",
    href: "#portal",
    id: "portal",
  },
  {
    name: "Contacto",
    href: "#contacto",
    id: "contacto",
  },
];


export default function Navbar() {

  const active = useActiveSection();

  const [open,setOpen] = useState(false);


  return (

    <header
      className="
        fixed
        top-0
        z-50
        w-full
        border-b
        border-neutral-200/60
        bg-white/80
        backdrop-blur-xl
        dark:border-neutral-800/60
        dark:bg-[#0a0a0f]/80
        transition-colors
        duration-300
      "
    >


      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
        "
      >



        {/* Logo */}


        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={()=>setOpen(false)}
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-neutral-900
              text-white
              font-bold
            "
          >
            X
          </div>



          <div>

            <p className="text-lg font-semibold tracking-tight">
              EXPELION
            </p>


            <p className="text-xs text-neutral-500">
              Client Portal
            </p>


          </div>


        </Link>





        {/* Desktop Menu */}


        <nav
          className="
            hidden
            items-center
            gap-8
            md:flex
          "
        >

          {links.map((link)=>(

            <Link

              key={link.id}

              href={link.href}

              className={`
                relative
                text-sm
                font-medium
                transition-colors
                ${
                  active === link.id
                  ? "text-violet-600 dark:text-violet-400"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                }
              `}
            >

              {link.name}



              {active === link.id && (

                <span
                  className="
                    absolute
                    -bottom-2
                    left-0
                    h-[2px]
                    w-full
                    rounded-full
                    bg-violet-600
                  "
                />

              )}



            </Link>

          ))}


        </nav>






        {/* Desktop button */}

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Link href="/login">
            <Button size="lg">
              Iniciar sesión
            </Button>
          </Link>
        </div>


        {/* Mobile buttons */}

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-neutral-200
            "
            onClick={()=>setOpen(!open)}
          >
            {open ? (
              <X size={22}/>
            ) : (
              <Menu size={22}/>
            )}
          </button>
        </div>




      </div>







      {/* Mobile menu */}


      {open && (

        <div
          className="
            border-t
            border-neutral-200
            bg-white
            px-6
            py-6
            md:hidden
            dark:border-neutral-800
            dark:bg-[#0a0a0f]
            transition-colors
            duration-300
          "
        >


          <nav
            className="
              flex
              flex-col
              gap-5
            "
          >


            {links.map((link)=>(


              <Link

                key={link.id}

                href={link.href}

                onClick={()=>setOpen(false)}

                className={`
                  text-sm
                  font-medium
                  ${
                    active === link.id
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                  }
                `}
              >

                {link.name}


              </Link>


            ))}




            <Link href="/login" onClick={() => setOpen(false)}>
              <Button size="lg" className="mt-3 w-full">
                Iniciar sesión
              </Button>
            </Link>



          </nav>


        </div>

      )}



    </header>

  );

}
