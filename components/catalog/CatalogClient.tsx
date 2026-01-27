"use client";

import { useEffect, useMemo, useState } from "react";
import { FiltersBar } from "@/components/FiltersBar";
import { createBrowserClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";

const supabase = createBrowserClient();

type CatalogClientProps = {
  showSearch?: boolean;
  showSort?: boolean;
  limit?: number;
};

export function CatalogClient({ showSearch = false, showSort = false, limit }: CatalogClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", {
      ascending: false
    });
    setProducts((data as Product[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel("products-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => fetchProducts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const hasProducts = useMemo(() => products.length > 0, [products]);

  if (loading) {
    return <p className="text-sm text-slate-300">Cargando catálogo...</p>;
  }

  if (!hasProducts) {
    return (
      <p className="text-sm text-slate-300">
        Aún no hay productos publicados. Vuelve pronto o contáctanos por WhatsApp.
      </p>
    );
  }

  return <FiltersBar products={products} showSearch={showSearch} showSort={showSort} limit={limit} />;
}
