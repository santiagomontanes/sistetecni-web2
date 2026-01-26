"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";

const supabase = createBrowserClient();

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setError("Credenciales inválidas o usuario no registrado.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-navy-900 pb-16 pt-16">
      <div className="mx-auto w-full max-w-md space-y-6 px-4">
        <div className="rounded-3xl border border-white/10 bg-navy-800/60 p-8 shadow-card">
          <h1 className="text-2xl font-semibold text-white">Ingreso administrador</h1>
          <p className="mt-2 text-sm text-slate-300">
            Accede con tu usuario autorizado para gestionar el catálogo.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="text-xs font-semibold text-slate-300">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
                required
              />
            </label>
            <label className="text-xs font-semibold text-slate-300">
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
                required
              />
            </label>
            {error ? <p className="text-xs text-rose-200">{error}</p> : null}
            <button
              type="submit"
              className="w-full rounded-full bg-sky-300 px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-white"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
