"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Building2,
  MessageSquareOff,
} from "lucide-react";
import { RequirementComment } from "@/types/requirements";

interface RequirementCommentsProps {
  comments: RequirementComment[];
  onAddComment: (message: string) => void;
}

export default function RequirementComments({
  comments,
  onAddComment,
}: RequirementCommentsProps) {
  const [message, setMessage] = useState("");

  function sendComment() {
    if (!message.trim()) return;
    onAddComment(message);
    setMessage("");
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
          Comentarios
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          Conversación entre el cliente y el equipo de EXPELION.
        </p>
      </div>

      {/* Lista */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {comments.length === 0 ? (
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
                <MessageSquareOff size={32} />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-1">
                Aún no hay comentarios
              </h4>
              <p className="text-sm text-neutral-500 max-w-sm">
                Envía un mensaje para solicitar más información o actualizar sobre el avance del requerimiento.
              </p>
            </motion.div>
          ) : (
            comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  delay: index === comments.length - 1 ? 0 : 0.05 // Animate mostly new ones
                }}
                layout
                className={`
                  flex
                  gap-4
                  ${comment.company ? "" : "flex-row-reverse"}
                `}
              >
                {/* Avatar */}
                <div
                  style={comment.company
                    ? { background: "#ede9fe", color: "#7c3aed" }
                    : { background: "#171717", color: "#ffffff" }
                  }
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                >
                  {comment.company ? <Building2 size={18} /> : <User size={18} />}
                </div>

                {/* Burbuja */}
                <div
                  style={comment.company
                    ? { background: "rgba(237, 233, 254, 0.5)" }
                    : { background: "#fafafa", border: "1px solid #f5f5f5" }
                  }
                  className="max-w-[80%] rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-neutral-900">
                      {comment.author}
                    </p>
                    <span className="text-xs font-medium text-neutral-400">
                      {comment.time}
                    </span>
                  </div>
                  <p className="mt-3 leading-7 text-neutral-700 whitespace-pre-wrap">
                    {comment.message}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="mt-8 border-t border-neutral-100 pt-6">
        <div className="flex gap-3 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendComment();
              }
            }}
            rows={3}
            placeholder="Escribe un comentario..."
            className="
              flex-1
              resize-none
              rounded-2xl
              border
              border-neutral-200
              bg-neutral-50/50
              px-5
              py-4
              text-neutral-900
              placeholder:text-neutral-400
              outline-none
              transition
              focus:border-violet-500
              focus:bg-white
              focus:ring-4
              focus:ring-violet-500/10
            "
          />
          <button
            onClick={sendComment}
            disabled={!message.trim()}
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-violet-600
              text-white
              transition
              hover:bg-violet-700
              active:scale-95
              disabled:opacity-50
              disabled:hover:bg-violet-600
              disabled:active:scale-100
              absolute
              right-3
              bottom-3
            "
          >
            <Send size={20} className="mr-0.5 mt-0.5" />
          </button>
        </div>
        <p className="text-xs text-neutral-400 mt-3 ml-2">
          Presiona <kbd className="font-sans px-1.5 py-0.5 bg-neutral-100 rounded-md">Enter</kbd> para enviar
        </p>
      </div>
    </section>
  );
}
