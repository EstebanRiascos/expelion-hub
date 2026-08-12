"use client";

import {
  AlignLeft,
  CalendarDays,
  User2,
  Target,
} from "lucide-react";

interface RequirementInfoProps {
  description: string;
  createdBy: string;
  createdAt: string;
  objective: string;
}

export default function RequirementInfo({
  description,
  createdBy,
  createdAt,
  objective,
}: RequirementInfoProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-neutral-200
        bg-white
        p-8
        shadow-sm
      "
    >
      {/* Encabezado */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-neutral-900">
          Información general
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          Información principal del requerimiento registrada por el cliente.
        </p>
      </div>

      <div className="space-y-6">
        {/* Descripción */}
        <InfoBlock
          icon={<AlignLeft size={18} />}
          title="Descripción"
        >
          <p className="leading-relaxed text-neutral-600 whitespace-pre-wrap">
            {description}
          </p>
        </InfoBlock>

        {/* Objetivo */}
        <InfoBlock
          icon={<Target size={18} />}
          title="Objetivo"
        >
          <p className="leading-relaxed text-neutral-600 whitespace-pre-wrap">
            {objective}
          </p>
        </InfoBlock>

        {/* Información secundaria */}
        <div className="grid gap-6 md:grid-cols-2">
          <InfoBlock
            icon={<User2 size={18} />}
            title="Solicitado por"
          >
            <p className="font-medium text-neutral-700">
              {createdBy}
            </p>
          </InfoBlock>

          <InfoBlock
            icon={<CalendarDays size={18} />}
            title="Fecha de creación"
          >
            <p className="font-medium text-neutral-700">
              {createdAt}
            </p>
          </InfoBlock>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <div className="mb-3 flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-violet-50
            text-violet-600
            transition-transform
            duration-300
            group-hover:scale-110
            group-hover:bg-violet-100
            group-hover:text-violet-700
          "
        >
          {icon}
        </div>
        <span className="font-semibold text-neutral-900">
          {title}
        </span>
      </div>

      <div
        className="
          rounded-2xl
          border
          border-neutral-100
          bg-neutral-50/50
          p-5
          transition-colors
          duration-300
          group-hover:bg-neutral-50
          group-hover:border-neutral-200
        "
      >
        {children}
      </div>
    </div>
  );
}