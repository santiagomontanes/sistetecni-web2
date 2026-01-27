"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";
import { ProductForm } from "@/components/admin/ProductForm";
import type { StorageUsage } from "@/lib/types";

const supabase = createBrowserClient();

export default function NewProductPage() {
  const router = useRouter();
  const [usage, setUsage] = useState<StorageUsage | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [productId] = useState(() => crypto.randomUUID());

  useEffect(() => {
    const fetchUsage = async () => {
      const { data } = await supabase.from("storage_usage").select("*").eq("id", 1).single();
      setUsage((data as StorageUsage) ?? null);
    };

    fetchUsage();
  }, []);

  const handleSubmit = async (payload: any) => {
    await supabase
      .from("products")
      .insert({
        id: productId,
        ...payload
      })
      .select();

    setNotice("Producto creado y publicado en el catálogo.");
    setTimeout(() => router.push("/admin/products"), 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-300">Crea un nuevo producto para el catálogo.</p>
        {notice ? <p className="mt-2 text-xs text-sky-200">{notice}</p> : null}
      </div>
      <ProductForm
        productId={productId}
        usage={usage}
        onUsageUpdate={(updated) => setUsage(updated)}
        onSubmit={handleSubmit}
        submitLabel="Crear producto"
      />
    </div>
  );
}
