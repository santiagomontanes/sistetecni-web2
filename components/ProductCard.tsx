import { ImageWithFallback } from "@/components/ImageWithFallback";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, formatCOP } from "@/lib/utils";
import { CTAWhatsApp } from "@/components/CTAWhatsApp";

const placeholderImage = "/images/laptop-placeholder.svg";

type ProductCardProps = {
  product: Product;
  showDetail?: boolean;
  className?: string;
};

export function ProductCard({ product, showDetail = true, className }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.url ?? placeholderImage;

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60 shadow-card transition hover:-translate-y-1 hover:border-sky-200/40",
        className
      )}
    >
      <div className="relative h-44 w-full overflow-hidden bg-navy-700">
        <ImageWithFallback src={imageUrl} alt={product.name} fill className="object-cover" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100">
          <BadgeCheck className="h-3 w-3" />
          Batería nueva
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-base font-semibold text-white">{product.name}</p>
          <p className="mt-2 text-sm text-slate-300">
            {product.description ?? "Equipo corporativo reacondicionado de alto rendimiento."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-200">
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
        <div className="mt-auto">
          <p className="text-lg font-semibold text-white">{formatCOP(product.price_cop)}</p>
          <p className="text-xs text-slate-400">Contraentrega nacional</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <CTAWhatsApp
              productName={product.name}
              priceCOP={product.price_cop}
              label="WhatsApp"
              className="px-4 py-2 text-xs"
            />
            {showDetail ? (
              <Link
                href={`/catalogo/${product.id}`}
                className="text-xs font-semibold text-sky-200 transition hover:text-white"
              >
                Ver detalle
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
