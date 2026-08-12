"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function HeroButtons() {

  return (

    <div className="mt-10 flex flex-col gap-4 sm:flex-row">


      <Link href="/login">

        <Button
          size="lg"
          className="
            h-12
            px-8
            transition-all
            hover:-translate-y-1
            hover:shadow-xl
          "
        >

          Iniciar sesión

        </Button>

      </Link>





      <Link href="#servicios">

        <Button
          variant="outline"
          size="lg"
          className="
            h-12
            px-8
            transition-all
            hover:-translate-y-1
            hover:shadow-lg
          "
        >

          Conocer servicios

        </Button>

      </Link>


    </div>

  );

}
