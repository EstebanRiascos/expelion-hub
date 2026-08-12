"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes,
  MoreVertical,
  Paperclip,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Clock3,
  AlertCircle,
  FileSearch,
  ThumbsUp,
  FlaskConical,
} from "lucide-react";

interface RequirementCardProps {
  title: string;
  description: string;
  status: string;
  priority: string;
  fileCount: number;
  commentCount: number;
  lastUpdated: string;
  index: number;
  onDelete: () => void;
  onChangeStatus: () => void;
}

export default function RequirementCard({
  title,
  description,
  status,
  priority,
  fileCount,
  commentCount,
  lastUpdated,
  onDelete,
  onChangeStatus,
}: RequirementCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-neutral-200
        bg-white
        p-7
        shadow-sm
        transition-colors
        hover:border-violet-200
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
      "
    >
      {/* Glow effect */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-violet-50/50
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          pointer-events-none
        "
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-5">
          <div className="flex gap-4">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-violet-100
                transition-transform
                duration-300
                group-hover:scale-105
                group-hover:rotate-3
              "
            >
              <Boxes
                size={26}
                className="text-violet-700"
              />
            </div>

            <div>
              <h3
                className="
                  text-xl
                  font-semibold
                  text-neutral-900
                "
              >
                {title}
              </h3>
              <p
                className="
                  mt-2
                  max-w-2xl
                  leading-7
                  text-neutral-600
                  line-clamp-2
                "
              >
                {description}
              </p>
            </div>
          </div>

          {/* Menú */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="
                rounded-xl
                p-2
                text-neutral-400
                transition
                hover:bg-neutral-100
                hover:text-neutral-700
              "
            >
              <MoreVertical size={20} />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="
                      absolute
                      right-0
                      top-12
                      z-30
                      w-48
                      rounded-2xl
                      border
                      border-neutral-200
                      bg-white
                      p-2
                      shadow-xl
                    "
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeStatus();
                        setMenuOpen(false);
                      }}
                      className="
                        w-full
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        text-sm
                        font-medium
                        text-neutral-700
                        transition-colors
                        hover:bg-neutral-100
                      "
                    >
                      Avanzar estado
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                      }}
                      className="
                        w-full
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        text-sm
                        font-medium
                        text-red-600
                        transition-colors
                        hover:bg-red-50
                      "
                    >
                      Eliminar
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-8 flex flex-wrap gap-3">
          <StatusBadge status={status} />
          <PriorityBadge priority={priority} />
        </div>

        {/* Footer */}
        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
            border-t
            border-neutral-100
            pt-6
          "
        >
          <div className="flex flex-wrap items-center gap-6">
            <Info
              icon={<Paperclip size={16} />}
              text={`${fileCount} archivo${fileCount !== 1 ? 's' : ''}`}
            />
            <Info
              icon={<MessageCircle size={16} />}
              text={`${commentCount} comentario${commentCount !== 1 ? 's' : ''}`}
            />
            <Info
              icon={<Calendar size={16} />}
              text={`Act. ${lastUpdated}`}
            />
          </div>

          <span
            className="
              text-sm
              font-semibold
              text-violet-700
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            Abrir →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Info({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        text-sm
        font-medium
        text-neutral-500
      "
    >
      {icon}
      {text}
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
    Normal: { background: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" },
    Alta:   { background: "#fff7ed", color: "#c2410c", borderColor: "#fed7aa" },
    Urgente:{ background: "#fef2f2", color: "#b91c1c", borderColor: "#fecaca" },
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
