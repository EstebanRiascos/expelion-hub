"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    href: "/portal",
    icon: LayoutDashboard,
  },
  {
    name: "Requerimientos",
    href: "/portal/requerimientos",
    icon: ClipboardList,
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (

    <aside
      className="
        hidden
        fixed
        left-0
        top-0
        h-screen
        w-72
        border-r
        border-neutral-200
        dark:border-neutral-800
        bg-white
        dark:bg-neutral-950
        p-6
        lg:block
        transition-colors
        duration-300
      "
    >

      {/* Logo */}

      <div>

        <h2
          className="
            text-2xl
            font-bold
            tracking-tight
            text-neutral-900
            dark:text-neutral-100
          "
        >
          EXPELION
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-neutral-500
            dark:text-neutral-400
          "
        >
          Client Portal
        </p>

      </div>

      {/* Navegación */}

      <nav
        className="
          mt-10
          space-y-2
        "
      >

        {menu.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (

            <Link
              key={item.name}
              href={item.href}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all

                ${
                  active
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-200 dark:shadow-violet-900/40"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                }
              `}
            >

              <Icon size={20} />

              {item.name}

            </Link>

          );

        })}

      </nav>

      {/* Proyecto activo */}

      <div
        className="
          absolute
          bottom-6
          left-6
          right-6
          rounded-2xl
          border
          border-violet-100
          dark:border-violet-900/40
          bg-violet-50
          dark:bg-violet-950/40
          p-4
        "
      >

        <p
          className="
            text-sm
            font-semibold
            text-violet-700
            dark:text-violet-400
          "
        >
          Proyecto activo
        </p>

        <p
          className="
            mt-1
            text-xs
            text-neutral-600
            dark:text-neutral-400
          "
        >
          Sistema ERP Empresarial
        </p>

      </div>

    </aside>

  );

}