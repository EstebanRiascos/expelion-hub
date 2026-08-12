"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

import RequirementCard from "@/components/requirements/RequirementCard";
import RequirementDrawer from "@/components/requirements/RequirementDrawer";
import RequirementModal from "@/components/requirements/RequirementModal";
import { usePortalData } from "@/components/providers/PortalProvider";

import { 
  Requirement, 
  RequirementFile, 
  RequirementComment, 
  RequirementHistoryItem 
} from "@/types/requirements";

const STATUS_FLOW = [
  "Pendiente",
  "En revisión",
  "Aprobado",
  "En desarrollo",
  "Pruebas",
  "Completado"
];

type RequirementFileRow = {
  id: string;
  name: string;
  file_type: string;
  size_bytes: number | null;
  uploaded_by: string;
  created_at: string | null;
  storage_path: string | null;
};

type RequirementCommentRow = {
  id: string;
  author_id: string;
  profiles?: { full_name: string; role: string } | null;
  message: string;
  created_at: string | null;
};

type RequirementHistoryRow = {
  id: string;
  title: string;
  description: string;
  event_type: RequirementHistoryItem["type"];
  created_at: string | null;
};

type RequirementRow = {
  id: string;
  title?: string | null;
  name?: string | null;
  description: string | null;
  status: string | null;
  priority: string | null;
  created_by: string | null;
  created_by_name?: string | null;
  created_at: string | null;
  updated_at: string | null;
  objective: string | null;
  requirement_files?: RequirementFileRow[];
  requirement_comments?: RequirementCommentRow[];
  requirement_history?: RequirementHistoryRow[];
};

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
  const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);
  
  const supabase = useMemo(() => createClient(), []);
  const { project, profile, user } = usePortalData();
  const displayName = profile?.full_name || user.email.split('@')[0];

  useEffect(() => {
    async function loadRequirements() {
      if (!project?.id) return;
      try {
        const { data, error: fetchError } = await supabase
          .from("requirements")
          .select(`
            *,
            requirement_files(*),
            requirement_comments(*, profiles:author_id(full_name, role)),
            requirement_history(*)
          `)
          .eq("project_id", project.id)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        const formatted: Requirement[] = ((data || []) as RequirementRow[]).map((req) => ({
          id: req.id,
          title: req.title || req.name || "",
          description: req.description || "",
          status: req.status || "Pendiente",
          priority: req.priority || "Normal",
          createdBy: req.created_by || req.created_by_name || "Usuario",
          createdAt: req.created_at ? new Date(req.created_at).toLocaleDateString("es-CO") : "",
          lastUpdated: req.updated_at ? new Date(req.updated_at).toLocaleDateString("es-CO") : "",
          objective: req.objective || "Pendiente de definir.",
          files: (req.requirement_files || []).map((f) => {
            const mb = f.size_bytes ? (f.size_bytes / (1024 * 1024)).toFixed(1) + " MB" : "0 MB";
            return {
              id: f.id,
              name: f.name,
              type: f.file_type,
              size: mb,
              uploadedBy: f.uploaded_by,
              uploadedAt: f.created_at ? new Date(f.created_at).toLocaleDateString("es-CO") : "",
              storage_path: f.storage_path || undefined
            };
          }).sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()),
          comments: (req.requirement_comments || []).map((c) => ({
            id: c.id,
            author: c.profiles?.full_name || "Usuario",
            company: c.profiles?.role !== 'client',
            message: c.message,
            time: c.created_at ? new Date(c.created_at).toLocaleString("es-CO") : ""
          })).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()),
          history: (req.requirement_history || []).map((h) => ({
            id: h.id,
            title: h.title,
            description: h.description,
            date: h.created_at ? new Date(h.created_at).toLocaleDateString("es-CO") : "",
            type: h.event_type
          })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }));

        setRequirements(formatted);
      } catch (err: unknown) {
        console.error(err);
        setError("Error al cargar los requerimientos. " + (err instanceof Error ? err.message : JSON.stringify(err)));
      } finally {
        setLoading(false);
      }
    }
    loadRequirements();
  }, [displayName, project?.id, supabase]);

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
      } else {
        setOpenDrawer(false);
      }
    }
  }

  async function addRequirement(data: {
    title: string;
    description: string;
    priority: string;
    status: string;
  }) {
    if (!project?.id) return;
    
    const { data: inserted, error: insertError } = await supabase
      .from('requirements')
      .insert({
        project_id: project.id,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        created_by: user.id,
        objective: "Pendiente de definir."
      })
      .select()
      .single();
      
    if (insertError) {
      console.error(insertError);
      alert("Error al crear el requerimiento");
      return;
    }

    // Insert initial history
    await supabase.from('requirement_history').insert({
      requirement_id: inserted.id,
      title: "Requerimiento creado",
      description: "El cliente registró una nueva solicitud en el portal.",
      event_type: "created",
      triggered_by: user.id
    });

    const today = getTodayStr();
    const newRequirement: Requirement = {
      id: inserted.id,
      title: inserted.title,
      description: inserted.description,
      priority: inserted.priority,
      status: inserted.status,
      createdBy: inserted.created_by || displayName,
      createdAt: today,
      lastUpdated: today,
      objective: inserted.objective || "Pendiente de definir.",
      files: [],
      comments: [],
      history: [
        {
          id: Date.now().toString(),
          title: "Requerimiento creado",
          description: "El cliente registró una nueva solicitud en el portal.",
          date: today,
          type: "created" as const,
        },
      ],
    };

    setRequirements((currentRequirements) => [newRequirement, ...currentRequirements]);
  }

  async function updateRequirement(data: {
    title: string;
    description: string;
    priority: string;
    status: string;
  }) {
    if (!editingRequirement) return;

    const { data: updatedRow, error: updateError } = await supabase
      .from('requirements')
      .update({
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
      })
      .eq('id', editingRequirement.id)
      .select()
      .single();

    if (updateError) {
      console.error(updateError);
      alert("Error al editar el requerimiento");
      return;
    }

    const updated = requirements.map((item) =>
      item.id === editingRequirement.id
        ? {
            ...item,
            title: updatedRow.title,
            description: updatedRow.description,
            priority: updatedRow.priority,
            status: updatedRow.status,
            lastUpdated: getTodayStr(),
          }
        : item
    );

    setRequirements(updated);
    syncSelectedRequirement(updated);
    setEditingRequirement(null);
    setOpenModal(false);
  }

  async function deleteRequirement(index: number) {
    const reqToDelete = requirements[index];
    const { error } = await supabase.from('requirements').delete().eq('id', reqToDelete.id);
    
    if (error) {
      console.error(error);
      alert("Error al eliminar el requerimiento");
      return;
    }
    
    const updated = requirements.filter((_, i) => i !== index);
    setRequirements(updated);
    syncSelectedRequirement(updated);
  }

  async function changeStatus(index: number) {
    const req = requirements[index];
    const currentIndex = STATUS_FLOW.indexOf(req.status);
    const nextStatus = currentIndex >= 0 && currentIndex < STATUS_FLOW.length - 1
      ? STATUS_FLOW[currentIndex + 1]
      : STATUS_FLOW[0];

    const { error } = await supabase.from('requirements').update({ status: nextStatus }).eq('id', req.id);
    if (error) {
      console.error(error);
      alert("Error al actualizar el estado");
      return;
    }
    
    const isCompleted = nextStatus === "Completado";
    const historyTitle = isCompleted ? "Requerimiento completado" : "Estado actualizado";
    const historyDesc = `El estado cambió de ${req.status} a ${nextStatus}.`;
    const historyType = (isCompleted ? "completed" : "status") as "completed" | "status";

    const { data: histRow } = await supabase.from('requirement_history').insert({
      requirement_id: req.id,
      title: historyTitle,
      description: historyDesc,
      event_type: historyType,
      triggered_by: user.id
    }).select().single();

    const today = getTodayStr();
    const updated = requirements.map((item, i) => {
      if (i !== index) return item;
      return {
        ...item,
        status: nextStatus,
        lastUpdated: today,
        history: [
          {
            id: histRow?.id || Date.now().toString(),
            title: historyTitle,
            description: historyDesc,
            date: today,
            type: historyType,
          },
          ...item.history,
        ],
      };
    });

    setRequirements(updated);
    syncSelectedRequirement(updated);
  }

  async function addComment(message: string) {
    if (!selectedRequirement) return;

    const { data: commentRow, error } = await supabase.from('requirement_comments').insert({
      requirement_id: selectedRequirement.id,
      author_id: user.id,
      message: message
    }).select().single();
    
    if (error) {
      console.error(error);
      alert("Error al añadir el comentario");
      return;
    }

    const { data: histRow } = await supabase.from('requirement_history').insert({
      requirement_id: selectedRequirement.id,
      title: "Nuevo comentario",
      description: "El cliente añadió un nuevo comentario.",
      event_type: "comment",
      triggered_by: user.id
    }).select().single();

    const today = getTodayStr();
    const newComment: RequirementComment = {
      id: commentRow.id,
      author: displayName,
      company: false,
      message: commentRow.message,
      time: new Date(commentRow.created_at).toLocaleString("es-CO"),
    };

    const updated = requirements.map((item) => {
      if (item.id !== selectedRequirement.id) return item;
      return {
        ...item,
        lastUpdated: today,
        comments: [...item.comments, newComment], 
        history: [
          {
            id: histRow?.id || Date.now().toString(),
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
    
    // 1. Upload to Supabase Storage - Use project-files bucket with correct path
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    // The path MUST start with project_id to satisfy RLS: pm.project_id::text = (storage.foldername(name))[1]
    const filePath = `${project?.id}/${selectedRequirement.id}/${fileName}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('project-files')
      .upload(filePath, file);

    if (storageError) {
      console.error("Storage upload error:", storageError);
      alert("Error al subir el archivo. " + storageError.message);
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
        file_type: type,
        size_bytes: file.size,
        uploaded_by: user.id, 
        storage_path: storageData.path,
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB Insert failed", dbError);
      if (storageData?.path) {
        await supabase.storage.from('project-files').remove([storageData.path]);
      }
      alert("Error al registrar el archivo. Inténtalo de nuevo.");
      return;
    }

    // 3. Insert into History (requirement_history)
    const { data: historyData } = await supabase
      .from('requirement_history')
      .insert({
        requirement_id: selectedRequirement.id,
        title: "Archivo adjuntado",
        description: `Se subió el archivo ${file.name}.`,
        event_type: "file",
        triggered_by: user.id
      })
      .select()
      .single();

    const today = getTodayStr();
    const newFile: RequirementFile = fileData ? {
      id: fileData.id,
      name: fileData.name,
      type: fileData.file_type,
      size: (fileData.size_bytes / (1024 * 1024)).toFixed(1) + " MB",
      uploadedBy: fileData.uploaded_by,
      uploadedAt: new Date(fileData.created_at).toLocaleDateString("es-CO"),
      storage_path: fileData.storage_path
    } : {
      id: Date.now().toString(),
      name: file.name,
      type: type,
      size: sizeMb,
      uploadedBy: displayName,
      uploadedAt: today,
      storage_path: storageData.path
    };

    const newHistoryItem: RequirementHistoryItem = historyData ? {
      id: historyData.id,
      title: historyData.title,
      description: historyData.description,
      date: new Date(historyData.created_at).toLocaleDateString("es-CO"),
      type: historyData.event_type as RequirementHistoryItem["type"],
    } : {
      id: Date.now().toString(),
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

  async function removeFile(fileId: string, storagePath?: string) {
    if (!selectedRequirement) return;
    
    const fileToRemove = selectedRequirement.files.find(f => f.id === fileId);

    // 1. Delete from Storage
    if (storagePath) {
      const { error: storageError } = await supabase.storage
        .from('project-files')
        .remove([storagePath]);
        
      if (storageError) {
        console.error("Storage remove error:", storageError);
        // Continuamos para intentar borrar de BD incluso si falla Storage (podría estar ya borrado físicamente)
      }
    }

    // 2. Delete from DB
    const { error: deleteError } = await supabase
      .from('requirement_files')
      .delete()
      .eq('id', fileId);

    if (deleteError) {
      console.error("DB delete error:", deleteError);
      alert("Error al eliminar el registro del archivo en la base de datos.");
      return;
    }

    // 3. Insert history
    const { data: historyData } = await supabase
      .from('requirement_history')
      .insert({
        requirement_id: selectedRequirement.id,
        title: "Archivo eliminado",
        description: `Se eliminó el archivo ${fileToRemove?.name || ''}.`,
        event_type: "file",
        triggered_by: user.id
      })
      .select()
      .single();

    const today = getTodayStr();
    const newHistoryItem: RequirementHistoryItem = historyData ? {
      id: historyData.id,
      title: historyData.title,
      description: historyData.description,
      date: new Date(historyData.created_at).toLocaleDateString("es-CO"),
      type: historyData.event_type as RequirementHistoryItem["type"],
    } : {
      id: Date.now().toString(),
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

  function openEditRequirement() {
    if (!selectedRequirement) return;
    setEditingRequirement(selectedRequirement);
    setOpenModal(true);
  }

  function closeRequirementModal() {
    setEditingRequirement(null);
    setOpenModal(false);
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="animate-spin text-violet-600" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center text-center">
        <AlertCircle className="mb-4 text-red-500" size={48} />
        <h2 className="mb-2 text-xl font-bold text-neutral-900 dark:text-white">Error</h2>
        <p className="max-w-md text-neutral-500 dark:text-neutral-400">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
              Requerimientos
            </h1>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
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
              dark:bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              dark:text-neutral-900
              transition
              hover:bg-neutral-800
              dark:hover:bg-neutral-200
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
            <div className="rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 py-16 text-center text-neutral-500 dark:text-neutral-400">
              Actualmente no hay requerimientos registrados para este proyecto.
            </div>
          )}
        </div>
      </div>

      <RequirementModal
        open={openModal}
        onClose={closeRequirementModal}
        onSubmit={editingRequirement ? updateRequirement : addRequirement}
        editingData={editingRequirement}
      />

      <RequirementDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        requirement={selectedRequirement}
        onAddComment={addComment}
        onUploadFile={uploadFile}
        onRemoveFile={removeFile}
        onEdit={openEditRequirement}
      />
    </>
  );
}
