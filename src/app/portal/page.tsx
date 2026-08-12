"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  FileText,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";
import { usePortalData } from "@/components/providers/PortalProvider";
import { createClient } from "@/lib/supabase/client";

type ActivityItem = {
  icon: React.ElementType;
  title: string;
  date: string;
};

function getActivityInfo(event: string, title: string) {
  switch (event) {
    case "created":
      return { title: `Requerimiento creado: ${title}`, icon: FileText };
    case "status_changed":
      return { title: `Estado actualizado: ${title}`, icon: TrendingUp };
    case "comment_added":
      return { title: `Nuevo comentario en: ${title}`, icon: MessageCircle };
    case "file_added":
      return { title: `Archivo subido en: ${title}`, icon: FileText };
    case "file_deleted":
      return { title: `Archivo eliminado en: ${title}`, icon: CheckCircle2 };
    default:
      return { title: `Actividad en: ${title}`, icon: CheckCircle2 };
  }
}

export default function PortalDashboard() {
  const { user, profile, project } = usePortalData();
  const supabase = createClient();

  const [stats, setStats] = useState({ files: 0, comments: 0 });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  const displayName = profile?.company_name || profile?.full_name || user.email.split("@")[0];
  const progress = project?.progress || 0;
  const status = project?.status || "Sin definir";

  useEffect(() => {
    async function loadDashboard() {
      if (!project) return;

      const { data, error } = await supabase
        .from("requirements")
        .select(`
          id,
          title,
          requirement_files (id),
          requirement_comments (id),
          requirement_history (
            event_type,
            created_at
          )
        `)
        .eq("project_id", project.id);

      if (!error && data) {
        let totalFiles = 0;
        let totalComments = 0;
        const allHistory: { reqTitle: string; event: string; date: string }[] = [];

        type ReqType = {
          title: string;
          requirement_files: { id: string }[];
          requirement_comments: { id: string }[];
          requirement_history: { event_type: string; created_at: string }[];
        };

        data.forEach((req: unknown) => {
          const r = req as ReqType;
          totalFiles += r.requirement_files?.length || 0;
          totalComments += r.requirement_comments?.length || 0;

          (r.requirement_history || []).forEach((h) => {
            allHistory.push({
              reqTitle: r.title,
              event: h.event_type,
              date: h.created_at,
            });
          });
        });

        setStats({ files: totalFiles, comments: totalComments });

        allHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        const topActivities = allHistory.slice(0, 3).map((item) => {
          const info = getActivityInfo(item.event, item.reqTitle);
          return {
            title: info.title,
            icon: info.icon,
            date: new Date(item.date).toLocaleString("es-CO"),
          };
        });

        setActivities(topActivities);
      }
      setLoading(false);
    }
    loadDashboard();
  }, [project, supabase]);

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Hola, {displayName} 👋
        </h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Aquí puedes consultar el estado actual de tu proyecto.
        </p>
      </div>

      {/* Cards principales */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Estado" value={status} icon={<Clock3 />} />
        <StatCard title="Avance" value={`${progress}%`} icon={<TrendingUp />} />
        <StatCard
          title="Archivos"
          value={loading ? "..." : stats.files.toString()}
          icon={<FileText />}
        />
        <StatCard
          title="Comentarios"
          value={loading ? "..." : stats.comments.toString()}
          icon={<MessageCircle />}
        />
      </div>

      {/* Progreso */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 transition-colors duration-300"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Progreso del proyecto
            </h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {project?.name}
            </p>
          </div>
          <span className="font-semibold text-violet-600 dark:text-violet-400">
            {progress}%
          </span>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2 }}
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-600"
          />
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Actividad */}
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Actividad reciente
          </h2>

          <div className="mt-6 space-y-5">
            {loading ? (
              <p className="text-sm text-neutral-500">Cargando actividad...</p>
            ) : activities.length === 0 ? (
              <p className="text-sm text-neutral-500">Aún no hay actividad reciente.</p>
            ) : (
              activities.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
                      <Icon size={20} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {item.title}
                      </p>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {item.date}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Próximos pasos */}
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Próximos pasos
          </h2>
          <ul className="mt-6 space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
            {/* Mantengo los próximos pasos estáticos ya que no hay una tabla real para ellos actualmente, y el usuario indicó solo reemplazar los mock confirmados */}
            <li>✓ Finalizar módulo de facturación</li>
            <li>✓ Validar requerimientos pendientes</li>
            <li>✓ Revisión con el cliente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          {title}
        </span>
        <div className="text-violet-600 dark:text-violet-400">{icon}</div>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        {value}
      </h3>
    </div>
  );
}