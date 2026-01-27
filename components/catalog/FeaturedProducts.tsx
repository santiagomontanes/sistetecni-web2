"use client";

import { useEffect, useState } from "react";
import { CTAWhatsApp } from "@/components/CTAWhatsApp";
import { createBrowserClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";

const supabase = createBrowserClient();

export function FeaturedProducts() {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .order("updated_at", { ascending: false })
        .limit(3);
      setFeatured((data as Product[]) ?? []);
    };

    fetchFeatured();

    const channel = supabase
      .channel("featured-products")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => fetchFeatured()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (featured.length === 0) {
    return (
      <p className="text-xs text-slate-400">
        Estamos preparando nuevos equipos destacados. Escríbenos para asesoría personalizada.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {featured.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-navy-900/60 p-4"
        >
          <div>
            <p className="text-sm font-semibold text-white">{item.name}</p>
            <p className="text-xs text-slate-400">
              {item.description ?? "Equipo corporativo reacondicionado."}
            </p>
          </div>
          <CTAWhatsApp
            productName={item.name}
            priceCOP={item.price_cop}
            label="WhatsApp"
            className="px-4 py-2 text-xs"
          />
        </div>
      ))}
    </div>
  );
}
