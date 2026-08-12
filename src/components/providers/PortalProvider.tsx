"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, AlertCircle } from "lucide-react";

type ProjectData = {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: string;
  created_at: string;
  updated_at: string;
};

type ProfileData = {
  full_name: string;
  company_name: string;
  role: string;
};

type PortalContextType = {
  user: { id: string; email: string };
  profile: ProfileData | null;
  project: ProjectData | null;
  projectRole: string | null;
};

const PortalContext = createContext<PortalContextType | null>(null);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortalContextType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const { data: authData, error: authError } = await supabase.auth.getUser();
        
        if (authError || !authData.user) {
          throw new Error("No autenticado");
        }
        
        const user = { id: authData.user.id, email: authData.user.email || "" };

        // Fetch profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, company_name, role")
          .eq("id", user.id)
          .single();

        console.log("PROFILE RESULT:", { profile, profileError });

        // Fetch project mapping (Query 1)
        const { data: members, error: pmError } = await supabase
          .from("project_members")
          .select("*")
          .eq("user_id", user.id);

        console.log("PROJECT MEMBER RESULT:", { members, pmError });

        let project = null;
        let projectRole = null;

        if (members && members.length > 0) {
          projectRole = members[0].role;
          
          // Fetch actual project (Query 2)
          const { data: projData, error: projError } = await supabase
            .from("projects")
            .select("id, name, description, progress, status, created_at, updated_at")
            .eq("id", members[0].project_id)
            .single();
            
          console.log("PROJECT RESULT:", { projData, projError });
          
          if (projData) {
            project = projData;
          }
        }

        console.log("FINAL PARSED DATA:", { user, profile, project, projectRole });

        if (pmError) {
          console.error("Supabase Error on project_members:", pmError);
        }

        setData({
          user,
          profile,
          project,
          projectRole,
        });
      } catch (err: unknown) {
        console.error("CAUGHT ERROR:", err);
        setError("Error al cargar los datos del portal: " + (err instanceof Error ? err.message : JSON.stringify(err)));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <Loader2 className="animate-spin text-violet-600" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Ha ocurrido un error</h2>
          <p className="text-neutral-500 dark:text-neutral-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!data?.project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Sin proyectos asignados</h2>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-md">
          Actualmente no tienes ningún proyecto asociado a tu cuenta. Contacta con soporte si crees que esto es un error.
        </p>
      </div>
    );
  }

  return (
    <PortalContext.Provider value={data}>
      {children}
    </PortalContext.Provider>
  );
}

export const usePortalData = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error("usePortalData must be used within a PortalProvider");
  }
  return context;
};
