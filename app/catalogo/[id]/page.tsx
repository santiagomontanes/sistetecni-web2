import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { CTAWhatsApp } from "@/components/CTAWhatsApp";
import { formatCOP } from "@/lib/utils";
import { createServerClient } from "@/lib/supabase/server";
import type { Product, ProductImage } from "@/lib/types";

const placeholderImage = "/images/laptop-placeholder.svg";

type ProductDetailProps = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const supabase = createServerClient();
  const { data } = await supabase.from("products").select("*").eq("id", params.id).single();
  const product = data as Product | null;

  if (!product) {
    notFound();
  }

  const fallbackImage: ProductImage = { url: placeholderImage, path: "", sizeBytes: 0 };
  const images = product.images?.length ? product.images : [fallbackImage];

  return (
    <main className="min-h-screen bg-navy-900 pb-16 pt-12">
      <div className="mx-auto w-full max-w-6xl space-y-12 px-4 lg:px-0">
        <Link href="/catalogo" className="text-sm text-sky-200 hover:text-white">
          ← Volver al catálogo
        </Link>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-navy-800/60">
              <Image src={images[0].url} alt={product.name} fill className="object-cover" />
            </div>
            {images.length > 1 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {images.slice(1).map((image, index) => (
                  <div
                    key={`${image.url}-${index}`}
                    className="relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60"
                  >
                    <Image src={image.url} alt={`${product.name} ${index + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
                Laptop corporativa
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-base text-slate-300">
                {product.description ?? "Equipo corporativo reacondicionado de alto rendimiento."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              {product.cpu ? (
                <span className="rounded-full border border-white/10 px-3 py-1">{product.cpu}</span>
              ) : null}
              {product.ram_gb ? (
                <span className="rounded-full border border-white/10 px-3 py-1">
                  {product.ram_gb}GB RAM
                </span>
              ) : null}
              {product.storage_type && product.storage_gb ? (
                <span className="rounded-full border border-white/10 px-3 py-1">
                  {product.storage_type} {product.storage_gb}GB
                </span>
              ) : null}
            </div>
            <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6">
              <p className="text-2xl font-semibold text-white">{formatCOP(product.price_cop)}</p>
              <p className="mt-2 text-sm text-slate-300">Batería nueva · Garantía 1 año</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <CTAWhatsApp productName={product.name} priceCOP={product.price_cop} className="w-full" />
                <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-xs text-slate-200">
                  <Truck className="h-4 w-4 text-sky-200" />
                  Contraentrega nacional
                </div>
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border border-white/10 bg-navy-800/60 p-6">
              <p className="text-sm font-semibold text-white">Beneficios destacados</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-200" />
                  Ideal para estudio y trabajo remoto.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-200" />
                  Arranque rápido gracias al almacenamiento {product.storage_type ?? "SSD"}.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-200" />
                  Chasis corporativo resistente y elegante.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6">
              <p className="text-sm font-semibold text-white">Incluye</p>
              <div className="mt-3 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                {["Cargador", "Batería nueva", "Garantía 1 año", "Revisión técnica"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-sky-200" />
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
