"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import RequirementHeader from "./RequirementHeader";
import RequirementInfo from "./RequirementInfo";
import RequirementFiles from "./RequirementFiles";
import RequirementComments from "./RequirementComments";
import RequirementHistory from "./RequirementHistory";
import { 
  Requirement, 
  RequirementFile 
} from "@/types/requirements";

interface RequirementDrawerProps {
  open: boolean;
  onClose: () => void;
  requirement: Requirement | null;
  onAddComment: (message: string) => void;
  onUploadFile: (file: File) => Promise<void>;
  onRemoveFile: (fileId: number, storagePath?: string) => Promise<void>;
}

export default function RequirementDrawer({
  open,
  onClose,
  requirement,
  onAddComment,
  onUploadFile,
  onRemoveFile,
}: RequirementDrawerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Redirect wheel events to the inner scrollable container
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (scrollRef.current) {
      scrollRef.current.scrollTop += e.deltaY;
    }
  };

  if (!requirement) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay — pointer-events-none so wheel events go to drawer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-40
              bg-neutral-900/40
              backdrop-blur-sm
            "
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
            onWheel={handleWheel}
            className="
              fixed
              right-0
              top-0
              z-50
              flex
              h-screen
              w-full
              max-w-[800px]
              flex-col
              border-l
              border-neutral-200
              bg-neutral-50
              shadow-[0_30px_80px_rgba(0,0,0,.15)]
            "
          >
            <div
              ref={scrollRef}
              className="
                flex-1
                overflow-y-auto
                bg-neutral-50/50
              "
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#d4d4d4 transparent",
                overscrollBehavior: "contain",
              }}
            >
              <RequirementHeader
                title={requirement.title}
                status={requirement.status}
                priority={requirement.priority}
                createdAt={requirement.createdAt}
                createdBy={requirement.createdBy}
              />

              <div className="space-y-6 p-8">
                <RequirementInfo
                  description={requirement.description}
                  createdBy={requirement.createdBy}
                  createdAt={requirement.createdAt}
                  objective={requirement.objective}
                />

                <RequirementFiles
                  files={requirement.files}
                  onUploadFile={onUploadFile}
                  onRemoveFile={onRemoveFile}
                />

                <RequirementComments
                  comments={requirement.comments}
                  onAddComment={onAddComment}
                />

                <RequirementHistory
                  history={requirement.history}
                />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}