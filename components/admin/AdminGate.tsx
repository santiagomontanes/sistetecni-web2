"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";
import { checkIsAdmin } from "@/lib/supabase/admin";

const supabase = createBrowserClient();

type AdminGateProps = {
  children: React.ReactNode;
};

export function AdminGate({ children }: AdminGateProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const admin = await checkIsAdmin(user.id);
      if (!admin) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkSession();
  }, [router]);

  if (loading) {
    return <p className="text-sm text-slate-300">Validando acceso...</p>;
  }

  if (!isAdmin) {
    return (
      <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 text-sm text-slate-200">
        Acceso denegado. Tu usuario no tiene permisos de administrador.
      </div>
    );
  }

  return <>{children}</>;
}
