import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { FiltersBar } from "@/components/FiltersBar";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Catálogo | Sistetecni",
  description: "Explora el catálogo de laptops corporativas reacondicionadas de Sistetecni."
};

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-navy-900 pb-16 pt-12">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 lg:px-0">
        <SectionHeading
          eyebrow="Catálogo"
          title="Laptops HP corporativas listas para entregar"
          description="Filtra por especificaciones y ordena por precio para encontrar tu equipo ideal."
        />
        <FiltersBar products={products} showSearch showSort />
      </div>
    </main>
  );
}
