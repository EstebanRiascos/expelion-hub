"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  MessageCircle,
  Paperclip,
  PlusCircle,
  History,
} from "lucide-react";
import { RequirementHistoryItem } from "@/types/requirements";

interface RequirementHistoryProps {
  history: RequirementHistoryItem[];
}

export default function RequirementHistory({
  history,
}: RequirementHistoryProps) {

  function getConfig(type: RequirementHistoryItem["type"]) {
    switch (type) {
      case "created":
        return {
          icon: <PlusCircle size={18} />,
          style: { background: "#dbeafe", color: "#2563eb", boxShadow: "0 0 0 4px #eff6ff" } as React.CSSProperties,
        };
      case "status":
        return {
          icon: <Clock3 size={18} />,
          style: { background: "#fef9c3", color: "#a16207", boxShadow: "0 0 0 4px #fefce8" } as React.CSSProperties,
        };
      case "file":
        return {
          icon: <Paperclip size={18} />,
          style: { background: "#ede9fe", color: "#7c3aed", boxShadow: "0 0 0 4px #f5f3ff" } as React.CSSProperties,
        };
      case "comment":
        return {
          icon: <MessageCircle size={18} />,
          style: { background: "#e0e7ff", color: "#4338ca", boxShadow: "0 0 0 4px #eef2ff" } as React.CSSProperties,
        };
      case "completed":
        return {
          icon: <CheckCircle2 size={18} />,
          style: { background: "#d1fae5", color: "#065f46", boxShadow: "0 0 0 4px #ecfdf5" } as React.CSSProperties,
        };
      default:
        return {
          icon: <Clock3 size={18} />,
          style: { background: "#f5f5f5", color: "#525252", boxShadow: "0 0 0 4px #fafafa" } as React.CSSProperties,
        };
    }
  }

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
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-neutral-900">
          Historial de actividad
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          Registro cronológico de todos los cambios realizados sobre este requerimiento.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {history.length > 0 && (
          <div
            className="
              absolute
              left-[22px]
              top-4
              bottom-4
              w-px
              bg-neutral-200
            "
          />
        )}

        <div className="space-y-8 relative z-10">
          <AnimatePresence mode="popLayout">
            {history.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border-2
                  border-dashed
                  border-neutral-200
                  bg-neutral-50/50
                  py-12
                  text-center
                "
              >
                <div className="rounded-full bg-neutral-100 p-4 text-neutral-400 mb-4">
                  <History size={32} />
                </div>
                <h4 className="font-semibold text-neutral-900 mb-1">
                  Sin actividad reciente
                </h4>
                <p className="text-sm text-neutral-500 max-w-sm">
                  Las acciones como cambios de estado, nuevos comentarios o archivos aparecerán aquí.
                </p>
              </motion.div>
            ) : (
              history.map((item, index) => {
                const config = getConfig(item.type);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                    className="relative flex gap-5 group"
                  >
                    <div
                      style={config.style}
                      className="
                        relative
                        z-10
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                    >
                      {config.icon}
                    </div>

                    <div className="flex-1 pt-2.5 pb-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="font-semibold text-neutral-900">
                          {item.title}
                        </h4>
                        <span className="text-xs font-medium text-neutral-400">
                          {item.date}
                        </span>
                      </div>
                      <p className="mt-1.5 leading-relaxed text-sm text-neutral-600">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
