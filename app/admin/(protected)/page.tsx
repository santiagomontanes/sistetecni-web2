"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@/lib/supabase/client";
import type { StorageUsage } from "@/lib/types";
import { StorageBar } from "@/components/admin/StorageBar";

const supabase = createBrowserClient();

type Metrics = {
  total: number;
  featured: number;
};

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics>({ total: 0, featured: 0 });
  const [usage, setUsage] = useState<StorageUsage | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data: products } = await supabase.from("products").select("featured");
      const featuredCount = products?.filter((item) => item.featured).length ?? 0;
      setMetrics({ total: products?.length ?? 0, featured: featuredCount });

      const { data: storage } = await supabase.from("storage_usage").select("*").eq("id", 1).single();
      setUsage((storage as StorageUsage) ?? null);
    };

    fetchMetrics();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Productos</p>
          <p className="mt-3 text-3xl font-semibold text-white">{metrics.total}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Destacados</p>
          <p className="mt-3 text-3xl font-semibold text-white">{metrics.featured}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Acciones</p>
          <Link
            href="/admin/products/new"
            className="mt-3 inline-flex rounded-full bg-sky-300 px-4 py-2 text-sm font-semibold text-navy-900"
          >
            Nuevo producto
          </Link>
        </div>
      </div>

      <StorageBar usage={usage} />
    </div>
  );
}
