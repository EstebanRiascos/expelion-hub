import Link from "next/link";
import {
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";


const navigation = [
  {
    title: "Empresa",
    links: [
      {
        name: "Inicio",
        href: "#inicio",
      },
      {
        name: "Quiénes somos",
        href: "#about",
      },
      {
        name: "Servicios",
        href: "#servicios",
      },
      {
        name: "Proceso",
        href: "#proceso",
      },
    ],
  },
  {
    title: "Soluciones",
    links: [
      {
        name: "Software a medida",
        href: "#servicios",
      },
      {
        name: "Aplicaciones Web",
        href: "#servicios",
      },
      {
        name: "Automatización",
        href: "#servicios",
      },
      {
        name: "Client Portal",
        href: "#portal",
      },
    ],
  },
];


export default function Footer() {
  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800/60 transition-colors duration-300">


      <div className="mx-auto max-w-7xl px-6 py-20">


        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">



          {/* Marca */}


          <div className="lg:col-span-1">


            <Link
              href="#inicio"
              className="flex items-center gap-3"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 font-bold text-white">
                X
              </div>


              <div>

                <p className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                  EXPELION
                </p>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                  Software & Technology
                </p>

              </div>

            </Link>



            <p className="mt-6 max-w-sm leading-7 text-neutral-600 dark:text-neutral-400 transition-colors duration-300">

              Creamos soluciones digitales personalizadas que ayudan a las
              empresas a optimizar procesos y crecer mediante tecnología.

            </p>



          </div>





          {/* Links */}


          {navigation.map((section)=>(
            <div
              key={section.title}
            >

              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                {section.title}
              </h3>


              <ul className="mt-6 space-y-4">

                {section.links.map((link)=>(
                  <li
                    key={link.name}
                  >

                    <Link
                      href={link.href}
                      className="text-neutral-600 transition hover:text-violet-600 dark:text-neutral-400 dark:hover:text-violet-400"
                    >

                      {link.name}

                    </Link>

                  </li>
                ))}

              </ul>


            </div>
          ))}




          {/* Contacto */}


          <div>


            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
              Contacto
            </h3>


            <div className="mt-6 space-y-5">


              <div className="flex gap-3">

                <Mail
                  size={20}
                  className="text-violet-600"
                />

                <div>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                    Email
                  </p>

                  <p className="font-medium text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                    contacto@expelion.com
                  </p>

                </div>

              </div>



              <div className="flex gap-3">

                <MapPin
                  size={20}
                  className="text-violet-600 dark:text-violet-400"
                />

                <div>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                    Ubicación
                  </p>

                  <p className="font-medium text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                    Colombia
                  </p>

                </div>

              </div>



              <Link
                href="#contacto"
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
              >

                Trabajemos juntos

                <ArrowUpRight size={16}/>

              </Link>



            </div>


          </div>



        </div>





        {/* Bottom */}


        <div className="mt-16 flex flex-col gap-4 border-t border-neutral-200/60 pt-8 text-sm text-neutral-500 dark:border-neutral-800/60 dark:text-neutral-400 md:flex-row md:items-center md:justify-between transition-colors duration-300">


          <p>
            © {new Date().getFullYear()} EXPELION. Todos los derechos reservados.
          </p>


          <p>
            Desarrollo de software personalizado.
          </p>


        </div>



      </div>


    </footer>
  );
}
