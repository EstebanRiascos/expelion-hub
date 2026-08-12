"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockKeyhole, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);

    // TODO: Reemplazar con validación de Supabase Auth
    // Simulación de carga (Mock validation)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email.includes("@")) {
      // Mock de lógica de roles
      const userRole: string = "client"; // Puede venir del DB: 'admin', 'client', 'dev'
      
      switch (userRole) {
        case "client":
          router.push("/portal");
          break;
        case "admin":
          // Redirigir a panel de admin en el futuro
          router.push("/portal"); 
          break;
        default:
          router.push("/portal");
      }
    } else {
      setError("Credenciales inválidas. Intenta nuevamente.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 transition hover:text-neutral-900"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>

        <div className="rounded-[32px] border border-neutral-200 bg-white p-10 shadow-[0_30px_80px_rgba(0,0,0,.08)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <LockKeyhole size={28} />
          </div>

          <h1 className="mt-8 text-center text-3xl font-bold text-neutral-900">
            Acceso al Portal
          </h1>

          <p className="mt-3 text-center text-sm leading-6 text-neutral-600">
            Ingresa para consultar el estado de tu proyecto, requerimientos y documentos.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-neutral-700">
                Correo empresarial
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@empresa.com"
                className="mt-2 h-12 w-full rounded-xl border border-neutral-200 px-4 outline-none transition focus:border-violet-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700">
                Contraseña
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 w-full rounded-xl border border-neutral-200 pl-4 pr-12 outline-none transition focus:border-violet-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-neutral-600 cursor-pointer">
                <input type="checkbox" className="rounded border-neutral-300 text-violet-600 focus:ring-violet-500" />
                Recordarme
              </label>
              <a href="#" className="font-medium text-violet-600 hover:text-violet-700">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Iniciando sesión..." : "Ingresar al Portal"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-neutral-500">
            ¿Problemas para ingresar? Contacta al equipo de EXPELION.
          </p>
        </div>
      </div>
    </main>
  );
}