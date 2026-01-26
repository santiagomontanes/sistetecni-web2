"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";
import { ProductForm } from "@/components/admin/ProductForm";
import type { Product, StorageUsage } from "@/lib/types";

const supabase = createBrowserClient();

type ProductEditPageProps = {
  params: { id: string };
};

export default function ProductEditPage({ params }: ProductEditPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [usage, setUsage] = useState<StorageUsage | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("products").select("*").eq("id", params.id).single();
      setProduct((data as Product) ?? null);

      const { data: usageData } = await supabase
        .from("storage_usage")
        .select("*")
        .eq("id", 1)
        .single();
      setUsage((usageData as StorageUsage) ?? null);
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async (payload: any) => {
    await supabase.from("products").update(payload).eq("id", params.id);
    setNotice("Cambios guardados correctamente.");
    setTimeout(() => router.push("/admin/products"), 800);
  };

  if (!product) {
    return <p className="text-sm text-slate-300">Cargando producto...</p>;
  }

  return (
    <div className="space-y-6">
      {notice ? <p className="text-xs text-sky-200">{notice}</p> : null}
      <ProductForm
        productId={product.id}
        initialData={product}
        usage={usage}
        onUsageUpdate={(updated) => setUsage(updated)}
        onSubmit={handleSubmit}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}
