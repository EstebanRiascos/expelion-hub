"use client";

import {
  Boxes,
  Calendar,
  CircleCheck,
  Flag,
  Pencil,
  AlertCircle,
  FileSearch,
  ThumbsUp,
  Clock3,
  FlaskConical,
  CheckCircle2,
} from "lucide-react";

interface RequirementHeaderProps {
  title: string;
  status: string;
  priority: string;
  createdAt?: string;
  createdBy?: string;
  onEdit?: () => void;
}

export default function RequirementHeader({
  title,
  status,
  priority,
  createdAt = "23 Jul 2026 · 10:45 a.m.",
  createdBy = "Juan Demo",
  onEdit,
}: RequirementHeaderProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
      <div className="flex items-start justify-between px-8 pt-8">
        <div className="flex gap-5">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-violet-100
            "
          >
            <Boxes
              size={30}
              className="text-violet-700"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-neutral-900">
              {title}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <StatusBadge status={status} />
              <PriorityBadge priority={priority} />
            </div>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-violet-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-md
            shadow-violet-200
            transition-all
            duration-200
            hover:bg-violet-700
            hover:shadow-lg
            hover:shadow-violet-300
            active:scale-95
          "
        >
          <Pencil size={15} />
          Editar
        </button>
      </div>

      <div
        className="
          mt-8
          grid
          grid-cols-2
          gap-6
          border-t
          border-neutral-200/60
          px-8
          py-6
          md:grid-cols-4
        "
      >
        <InfoItem
          icon={<CircleCheck size={18} />}
          label="Estado"
          value={status}
        />
        <InfoItem
          icon={<Flag size={18} />}
          label="Prioridad"
          value={priority}
        />
        <InfoItem
          icon={<Calendar size={18} />}
          label="Creado"
          value={createdAt}
        />
        <InfoItem
          icon={<Boxes size={18} />}
          label="Responsable"
          value={createdBy}
        />
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-neutral-400">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm font-medium text-neutral-800">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const config: Record<string, { style: React.CSSProperties; icon: React.ReactNode }> = {
    "Pendiente": {
      style: { background: "#f5f5f5", color: "#404040", borderColor: "#e5e5e5" },
      icon: <AlertCircle size={15} />
    },
    "En revisión": {
      style: { background: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" },
      icon: <FileSearch size={15} />
    },
    "Aprobado": {
      style: { background: "#eef2ff", color: "#4338ca", borderColor: "#c7d2fe" },
      icon: <ThumbsUp size={15} />
    },
    "En desarrollo": {
      style: { background: "#fefce8", color: "#a16207", borderColor: "#fde68a" },
      icon: <Clock3 size={15} />
    },
    "Pruebas": {
      style: { background: "#fff7ed", color: "#c2410c", borderColor: "#fed7aa" },
      icon: <FlaskConical size={15} />
    },
    "Completado": {
      style: { background: "#ecfdf5", color: "#065f46", borderColor: "#a7f3d0" },
      icon: <CheckCircle2 size={15} />
    },
  };

  const item = config[status] ?? config["Pendiente"];

  return (
    <span
      style={item.style}
      className="flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold"
    >
      {item.icon}
      {status}
    </span>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: string;
}) {
  const styles: Record<string, React.CSSProperties> = {
    Normal:  { background: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" },
    Alta:    { background: "#fff7ed", color: "#c2410c", borderColor: "#fed7aa" },
    Urgente: { background: "#fef2f2", color: "#b91c1c", borderColor: "#fecaca" },
  };

  const s = styles[priority] ?? styles.Normal;

  return (
    <span
      style={s}
      className="rounded-full border px-3.5 py-1.5 text-sm font-semibold"
    >
      {priority}
    </span>
  );
}