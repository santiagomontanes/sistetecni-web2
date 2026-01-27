"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";
import type { Product, ProductImage, StorageUsage } from "@/lib/types";
import { AdminTable } from "@/components/admin/AdminTable";

const supabase = createBrowserClient();

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [usage, setUsage] = useState<StorageUsage | null>(null);
  const [query, setQuery] = useState("");
  const [ram, setRam] = useState("all");
  const [storageType, setStorageType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("desc");

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts((data as Product[]) ?? []);

    const { data: usageData } = await supabase
      .from("storage_usage")
      .select("*")
      .eq("id", 1)
      .single();
    setUsage((usageData as StorageUsage) ?? null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesQuery = query
        ? product.name.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesRam = ram === "all" ? true : product.ram_gb === Number(ram);
      const matchesStorage = storageType === "all" ? true : product.storage_type === storageType;
      const matchesPrice = (() => {
        if (priceRange === "all") return true;
        const [min, max] = priceRange.split("-").map(Number);
        return product.price_cop >= min && product.price_cop <= max;
      })();
      return matchesQuery && matchesRam && matchesStorage && matchesPrice;
    });

    return filtered.sort((a, b) =>
      sort === "asc" ? a.price_cop - b.price_cop : b.price_cop - a.price_cop
    );
  }, [products, query, ram, storageType, priceRange, sort]);

  const handleDelete = async (id: string) => {
    const product = products.find((item) => item.id === id);
    const images = (product?.images ?? []) as ProductImage[];

    if (images.length) {
      await supabase.storage.from("product-images").remove(images.map((image) => image.path));

      if (usage) {
        const bytesToRemove = images.reduce((sum, image) => sum + image.sizeBytes, 0);
        const updatedUsage = {
          ...usage,
          bytes_used: Math.max(usage.bytes_used - bytesToRemove, 0)
        };
        const { error: usageError } = await supabase
          .from("storage_usage")
          .update({ bytes_used: updatedUsage.bytes_used })
          .eq("id", usage.id);

        if (!usageError) {
          setUsage(updatedUsage);
        }
      }
    }

    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-300">Gestiona el catálogo y sus actualizaciones.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-sky-300 px-4 py-2 text-sm font-semibold text-navy-900"
        >
          Nuevo producto
        </Link>
      </div>

      <div className="grid gap-4 rounded-2xl border border-white/10 bg-navy-800/60 p-4 md:grid-cols-4">
        <label className="relative md:col-span-2">
          <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar producto"
            className="w-full rounded-full border border-white/10 bg-navy-900 py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-sky-200/40 focus:outline-none"
          />
        </label>
        <select
          value={ram}
          onChange={(event) => setRam(event.target.value)}
          className="rounded-full border border-white/10 bg-navy-900 px-4 py-2 text-sm text-white focus:border-sky-200/40 focus:outline-none"
        >
          <option value="all">RAM</option>
          <option value="8">8GB</option>
          <option value="12">12GB</option>
          <option value="16">16GB</option>
        </select>
        <select
          value={storageType}
          onChange={(event) => setStorageType(event.target.value)}
          className="rounded-full border border-white/10 bg-navy-900 px-4 py-2 text-sm text-white focus:border-sky-200/40 focus:outline-none"
        >
          <option value="all">Almacenamiento</option>
          <option value="SSD">SSD</option>
          <option value="HDD">HDD</option>
        </select>
        <select
          value={priceRange}
          onChange={(event) => setPriceRange(event.target.value)}
          className="rounded-full border border-white/10 bg-navy-900 px-4 py-2 text-sm text-white focus:border-sky-200/40 focus:outline-none"
        >
          <option value="all">Todos</option>
          <option value="0-600000">Hasta $600.000</option>
          <option value="600000-800000">$600.000 - $800.000</option>
          <option value="800000-9999999">Más de $800.000</option>
        </select>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="rounded-full border border-white/10 bg-navy-900 px-4 py-2 text-sm text-white focus:border-sky-200/40 focus:outline-none"
        >
          <option value="desc">Mayor precio</option>
          <option value="asc">Menor precio</option>
        </select>
      </div>

      <AdminTable products={filteredProducts} onDelete={handleDelete} />
    </div>
  );
}
