"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

import RequirementCard from "@/components/requirements/RequirementCard";
import RequirementDrawer from "@/components/requirements/RequirementDrawer";
import RequirementModal from "@/components/requirements/RequirementModal";

import { 
  Requirement, 
  RequirementFile, 
  RequirementComment, 
  RequirementHistoryItem 
} from "@/types/requirements";

const initialRequirements: Requirement[] = [
  {
    id: 1,
    title: "Módulo de inventario",
    description: "Control de productos, entradas y salidas del sistema.",
    status: "Completado",
    priority: "Normal",
    createdBy: "Juan Pérez",
    createdAt: "23 Jul 2026",
    lastUpdated: "23 Jul 2026",
    objective: "Automatizar el control del inventario de la empresa.",
    files: [
      {
        id: 101,
        name: "Especificaciones_Inventario.pdf",
        type: "pdf",
        size: "2.4 MB",
        uploadedBy: "Juan Pérez",
        uploadedAt: "23 Jul 2026",
      }
    ],
    comments: [],
    history: [
      {
        id: 1001,
        title: "Requerimiento completado",
        description: "El requerimiento fue finalizado exitosamente.",
        date: "23 Jul 2026",
        type: "completed",
      }
    ],
  },
  {
    id: 2,
    title: "Facturación electrónica",
    description: "Integración con sistema de facturación empresarial.",
    status: "En desarrollo",
    priority: "Alta",
    createdBy: "Juan Pérez",
    createdAt: "24 Jul 2026",
    lastUpdated: "25 Jul 2026",
    objective: "Integrar el sistema con la DIAN.",
    files: [],
    comments: [
      {
        id: 201,
        author: "Soporte EXPELION",
        company: true,
        message: "Estamos analizando los requisitos de la DIAN para la integración.",
        time: "Hace 1 día"
      }
    ],
    history: [
      {
        id: 1002,
        title: "Estado actualizado",
        description: "El estado cambió a En desarrollo.",
        date: "25 Jul 2026",
        type: "status",
      }
    ],
  },
  {
    id: 3,
    title: "Panel administrativo",
    description: "Dashboard para gestión interna de usuarios.",
    status: "Pendiente",
    priority: "Normal",
    createdBy: "Juan Pérez",
    createdAt: "25 Jul 2026",
    lastUpdated: "25 Jul 2026",
    objective: "Centralizar la administración del sistema.",
    files: [],
    comments: [],
    history: [
      {
        id: 1003,
        title: "Requerimiento creado",
        description: "El cliente registró una nueva solicitud en el portal.",
        date: "25 Jul 2026",
        type: "created" as const,
      }
    ],
  },
];

const STATUS_FLOW = [
  "Pendiente",
  "En revisión",
  "Aprobado",
  "En desarrollo",
  "Pruebas",
  "Completado"
];

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
  const supabase = createClient();

  function getTodayStr() {
    return new Date().toLocaleDateString("es-CO", { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function syncSelectedRequirement(updatedRequirements: Requirement[]) {
    if (selectedRequirement) {
      const current = updatedRequirements.find(
        (item) => item.id === selectedRequirement.id
      );
      if (current) {
        setSelectedRequirement(current);
      }
    }
  }

  function addRequirement(data: {
    title: string;
    description: string;
    priority: string;
    status: string;
  }) {
    const today = getTodayStr();
    const newRequirement: Requirement = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      createdBy: "Juan Pérez",
      createdAt: today,
      lastUpdated: today,
      objective: "Pendiente de definir.",
      files: [],
      comments: [],
      history: [
        {
          id: Date.now(),
          title: "Requerimiento creado",
          description: "El cliente registró una nueva solicitud en el portal.",
          date: today,
          type: "created" as const,
        },
      ],
    };

    setRequirements([newRequirement, ...requirements]);
  }

  function deleteRequirement(index: number) {
    setRequirements(requirements.filter((_, i) => i !== index));
  }

  function changeStatus(index: number) {
    const updated = requirements.map((item, i) => {
      if (i !== index) return item;

      const currentIndex = STATUS_FLOW.indexOf(item.status);
      const nextStatus = currentIndex >= 0 && currentIndex < STATUS_FLOW.length - 1
        ? STATUS_FLOW[currentIndex + 1]
        : STATUS_FLOW[0];

      const today = getTodayStr();
      const isCompleted = nextStatus === "Completado";

      return {
        ...item,
        status: nextStatus,
        lastUpdated: today,
        history: [
          {
            id: Date.now(),
            title: isCompleted ? "Requerimiento completado" : "Estado actualizado",
            description: `El estado cambió de ${item.status} a ${nextStatus}.`,
            date: today,
            type: (isCompleted ? "completed" : "status") as "completed" | "status",
          },
          ...item.history,
        ],
      };
    });

    setRequirements(updated);
    syncSelectedRequirement(updated);
  }

  function addComment(message: string) {
    if (!selectedRequirement) return;

    const today = getTodayStr();
    const newComment: RequirementComment = {
      id: Date.now(),
      author: "Juan Pérez",
      company: false,
      message,
      time: "Ahora",
    };

    const updated = requirements.map((item) => {
      if (item.id !== selectedRequirement.id) return item;
      return {
        ...item,
        lastUpdated: today,
        comments: [...item.comments, newComment], // Add to bottom in page state
        history: [
          {
            id: Date.now(),
            title: "Nuevo comentario",
            description: "El cliente añadió un nuevo comentario.",
            date: today,
            type: "comment" as const,
          },
          ...item.history,
        ],
      };
    });

    setRequirements(updated);
    syncSelectedRequirement(updated);
  }

  async function uploadFile(file: File) {
    if (!selectedRequirement) return;
    const today = getTodayStr();
    
    // 1. Upload to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `req_${selectedRequirement.id}/${fileName}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('requirements')
      .upload(filePath, file);

    if (storageError) {
      console.error("Storage upload error:", storageError);
      alert("Error al subir el archivo. Revisa que el bucket 'requirements' exista en Supabase.");
      return;
    }

    // Determine type
    let type = "other";
    if (file.type === "application/pdf") type = "pdf";
    else if (file.type.includes("excel") || file.type.includes("spreadsheet")) type = "excel";
    else if (file.type.startsWith("image/")) type = "image";
    else if (file.type.includes("zip")) type = "zip";

    const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + " MB";

    // 2. Insert into DB (requirement_files)
    const { data: fileData, error: dbError } = await supabase
      .from('requirement_files')
      .insert({
        requirement_id: selectedRequirement.id,
        name: file.name,
        type: type,
        size: sizeMb,
        uploaded_by: "Usuario Actual", 
        storage_path: storageData.path,
      })
      .select()
      .single();

    if (dbError) {
      console.warn("DB Insert failed (probably missing tables), falling back to local state", dbError);
    }

    // 3. Insert into History (requirement_history)
    const { data: historyData } = await supabase
      .from('requirement_history')
      .insert({
        requirement_id: selectedRequirement.id,
        title: "Archivo adjuntado",
        description: `Se subió el archivo ${file.name}.`,
        type: "file" as const,
      })
      .select()
      .single();

    const newFile: RequirementFile = fileData ? {
      id: fileData.id,
      name: fileData.name,
      type: fileData.type,
      size: fileData.size,
      uploadedBy: fileData.uploaded_by,
      uploadedAt: new Date(fileData.uploaded_at).toLocaleDateString("es-CO"),
      storage_path: fileData.storage_path
    } : {
      id: Date.now(),
      name: file.name,
      type: type,
      size: sizeMb,
      uploadedBy: "Usuario Actual",
      uploadedAt: today,
      storage_path: storageData.path
    };

    const newHistoryItem: RequirementHistoryItem = historyData ? {
      id: historyData.id,
      title: historyData.title,
      description: historyData.description,
      date: new Date(historyData.date).toLocaleDateString("es-CO"),
      type: historyData.type as "created" | "status" | "file" | "comment" | "completed",
    } : {
      id: Date.now(),
      title: "Archivo adjuntado",
      description: `Se subió el archivo ${file.name}.`,
      date: today,
      type: "file" as const,
    };
    
    const updated = requirements.map((item) => {
      if (item.id !== selectedRequirement.id) return item;
      return {
        ...item,
        lastUpdated: today,
        files: [newFile, ...item.files],
        history: [newHistoryItem, ...item.history],
      };
    });

    setRequirements(updated);
    syncSelectedRequirement(updated);
  }

  async function removeFile(fileId: number, storagePath?: string) {
    if (!selectedRequirement) return;
    const today = getTodayStr();
    
    const fileToRemove = selectedRequirement.files.find(f => f.id === fileId);

    // 1. Delete from Storage
    if (storagePath) {
      const { error: storageError } = await supabase.storage
        .from('requirements')
        .remove([storagePath]);
      if (storageError) console.error("Error removing from storage:", storageError);
    }

    // 2. Delete from DB
    await supabase
      .from('requirement_files')
      .delete()
      .eq('id', fileId);

    // 3. Insert history
    const { data: historyData } = await supabase
      .from('requirement_history')
      .insert({
        requirement_id: selectedRequirement.id,
        title: "Archivo eliminado",
        description: `Se eliminó el archivo ${fileToRemove?.name || ''}.`,
        type: "file" as const,
      })
      .select()
      .single();

    const newHistoryItem: RequirementHistoryItem = historyData ? {
      id: historyData.id,
      title: historyData.title,
      description: historyData.description,
      date: new Date(historyData.date).toLocaleDateString("es-CO"),
      type: historyData.type as "created" | "status" | "file" | "comment" | "completed",
    } : {
      id: Date.now(),
      title: "Archivo eliminado",
      description: `Se eliminó el archivo ${fileToRemove?.name || ''}.`,
      date: today,
      type: "file" as const,
    };
    
    const updated = requirements.map((item) => {
      if (item.id !== selectedRequirement.id) return item;
      
      return {
        ...item,
        lastUpdated: today,
        files: item.files.filter(f => f.id !== fileId),
        history: [newHistoryItem, ...item.history],
      };
    });

    setRequirements(updated);
    syncSelectedRequirement(updated);
  }

  function openRequirement(requirement: Requirement) {
    setSelectedRequirement(requirement);
    setOpenDrawer(true);
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              Requerimientos
            </h1>
            <p className="mt-2 text-neutral-500">
              Gestiona las solicitudes y necesidades del proyecto.
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-neutral-900
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-neutral-800
              active:scale-95
            "
          >
            <Plus size={18} />
            Nuevo requerimiento
          </button>
        </div>

        <div className="grid gap-5">
          {requirements.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openRequirement(item)}
              className="cursor-pointer"
            >
              <RequirementCard
                title={item.title}
                description={item.description}
                status={item.status}
                priority={item.priority}
                fileCount={item.files.length}
                commentCount={item.comments.length}
                lastUpdated={item.lastUpdated}
                index={index}
                onDelete={() => deleteRequirement(index)}
                onChangeStatus={() => changeStatus(index)}
              />
            </div>
          ))}
          {requirements.length === 0 && (
            <div className="rounded-3xl border border-dashed border-neutral-300 py-16 text-center text-neutral-500">
              No hay requerimientos creados aún.
            </div>
          )}
        </div>
      </div>

      <RequirementModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={addRequirement}
      />

      <RequirementDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        requirement={selectedRequirement}
        onAddComment={addComment}
        onUploadFile={uploadFile}
        onRemoveFile={removeFile}
      />
    </>
  );
}
