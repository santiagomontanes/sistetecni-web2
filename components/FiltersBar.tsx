"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const priceRanges = [
  { label: "Todos", value: "all" },
  { label: "Hasta $600.000", value: "0-600000" },
  { label: "$600.000 - $800.000", value: "600000-800000" },
  { label: "Más de $800.000", value: "800000-9999999" }
];

type FiltersBarProps = {
  products: Product[];
  showSearch?: boolean;
  showSort?: boolean;
  limit?: number;
  className?: string;
};

export function FiltersBar({
  products,
  showSearch = false,
  showSort = false,
  limit,
  className
}: FiltersBarProps) {
  const [query, setQuery] = useState("");
  const [ram, setRam] = useState("all");
  const [storageType, setStorageType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("asc");

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

    if (showSort) {
      return filtered.sort((a, b) =>
        sort === "asc" ? a.price_cop - b.price_cop : b.price_cop - a.price_cop
      );
    }

    return filtered;
  }, [products, query, ram, storageType, priceRange, showSort, sort]);

  const visibleProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid gap-4 rounded-2xl border border-white/10 bg-navy-800/60 p-4 md:grid-cols-4">
        {showSearch ? (
          <label className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busca por modelo o referencia"
              className="w-full rounded-full border border-white/10 bg-navy-900 py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-sky-200/40 focus:outline-none"
            />
          </label>
        ) : null}
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
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
        {showSort ? (
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border border-white/10 bg-navy-900 px-4 py-2 text-sm text-white focus:border-sky-200/40 focus:outline-none"
          >
            <option value="asc">Menor precio</option>
            <option value="desc">Mayor precio</option>
          </select>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleProducts.length === 0 ? (
        <p className="text-center text-sm text-slate-300">
          No encontramos equipos con esos filtros. Ajusta la búsqueda.
        </p>
      ) : null}
    </div>
  );
}
