"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  Download,
  Trash2,
  Upload,
  FolderOpenDot,
  File as FileIcon,
} from "lucide-react";
import { RequirementFile } from "@/types/requirements";
import { createClient } from "@/lib/supabase/client";

interface RequirementFilesProps {
  files: RequirementFile[];
  onUploadFile: (file: File) => Promise<void>;
  onRemoveFile: (fileId: number, storagePath?: string) => Promise<void>;
}

export default function RequirementFiles({
  files,
  onUploadFile,
  onRemoveFile,
}: RequirementFilesProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await onUploadFile(file);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Hubo un error al subir el archivo.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900">
            Archivos
          </h3>
          <p className="mt-2 text-sm text-neutral-500">
            Documentos relacionados con este requerimiento.
          </p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={handleUploadClick}
          disabled={isUploading}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-violet-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-violet-700
            active:scale-95
            disabled:opacity-70
            disabled:active:scale-100
          "
        >
          <Upload size={17} className={isUploading ? "animate-bounce" : ""} />
          {isUploading ? "Subiendo..." : "Subir archivo"}
        </button>
      </div>

      {/* Lista */}
      <div className="mt-8 space-y-4">
        <AnimatePresence mode="popLayout">
          {files.length === 0 ? (
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
              <div className="rounded-full bg-violet-100 p-4 text-violet-600 mb-4">
                <FolderOpenDot size={32} />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-1">
                No hay archivos adjuntos
              </h4>
              <p className="text-sm text-neutral-500 max-w-sm">
                Sube documentos, hojas de cálculo o imágenes para complementar este requerimiento.
              </p>
            </motion.div>
          ) : (
            files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -10 }}
                layout
              >
                <FileCard
                  file={file}
                  onDelete={() => onRemoveFile(file.id, file.storage_path)}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function FileCard({
  file,
  onDelete,
}: {
  file: RequirementFile;
  onDelete: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = createClient();

  const handleDownload = async () => {
    if (!file.storage_path) {
      alert("Este archivo es de prueba y no se puede descargar.");
      return;
    }
    
    // Obtener la URL pública (asumiendo que el bucket "requirements" es público)
    const { data } = supabase.storage
      .from("requirements")
      .getPublicUrl(file.storage_path);
      
    if (data?.publicUrl) {
      window.open(data.publicUrl, "_blank");
    } else {
      alert("No se pudo obtener la URL de descarga.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Seguro que deseas eliminar este archivo?")) {
      setIsDeleting(true);
      await onDelete();
      setIsDeleting(false);
    }
  };

  const config = {
    pdf: {
      icon: <FileText size={22} />,
      color: "bg-red-100 text-red-600",
    },
    excel: {
      icon: <FileSpreadsheet size={22} />,
      color: "bg-green-100 text-green-600",
    },
    image: {
      icon: <FileImage size={22} />,
      color: "bg-blue-100 text-blue-600",
    },
    zip: {
      icon: <FileArchive size={22} />,
      color: "bg-yellow-100 text-yellow-700",
    },
    other: {
      icon: <FileIcon size={22} />,
      color: "bg-neutral-100 text-neutral-600",
    }
  };

  const current = config[file.type as keyof typeof config] || config.other;

  return (
    <div
      className="
        group
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-neutral-200
        bg-neutral-50
        p-5
        transition-all
        hover:border-violet-200
        hover:bg-white
        hover:shadow-sm
      "
    >
      <div className="flex items-center gap-4">
        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            transition-transform
            group-hover:scale-110
            ${current.color}
          `}
        >
          {current.icon}
        </div>

        <div>
          <h4 className="font-semibold text-neutral-900 line-clamp-1">
            {file.name}
          </h4>
          <p className="mt-1 text-sm text-neutral-500">
            {file.size} • {file.uploadedBy} • {file.uploadedAt}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleDownload}
          className="
            rounded-xl
            p-3
            text-neutral-400
            transition-colors
            hover:bg-neutral-200
            hover:text-neutral-700
          "
          title="Descargar archivo"
        >
          <Download size={18} />
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="
            rounded-xl
            p-3
            text-neutral-400
            transition-colors
            hover:bg-red-50
            hover:text-red-600
            disabled:opacity-50
          "
          title="Eliminar archivo"
        >
          <Trash2 size={18} className={isDeleting ? "animate-pulse" : ""} />
        </button>
      </div>
    </div>
  );
}
