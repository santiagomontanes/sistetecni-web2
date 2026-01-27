import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatCOP } from "@/lib/utils";

const storageLabel = (product: Product) =>
  product.storage_type && product.storage_gb
    ? `${product.storage_type} ${product.storage_gb}GB`
    : "-";

type AdminTableProps = {
  products: Product[];
  onDelete: (id: string) => void;
};

export function AdminTable({ products, onDelete }: AdminTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm text-slate-200">
        <thead className="bg-navy-800/80 text-xs uppercase tracking-[0.2em] text-slate-400">
          <tr>
            <th className="px-4 py-3">Producto</th>
            <th className="px-4 py-3">Specs</th>
            <th className="px-4 py-3">Precio</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-white/5 bg-navy-900/40">
              <td className="px-4 py-3">
                <p className="font-semibold text-white">{product.name}</p>
                <p className="text-xs text-slate-400">
                  {product.description ?? "Sin descripción"}
                </p>
              </td>
              <td className="px-4 py-3 text-xs text-slate-300">
                {product.cpu ?? "-"} · {product.ram_gb ? `${product.ram_gb}GB RAM` : "-"} ·
                {storageLabel(product)}
              </td>
              <td className="px-4 py-3 font-semibold text-white">
                {formatCOP(product.price_cop)}
              </td>
              <td className="px-4 py-3 text-xs">
                {product.featured ? (
                  <span className="rounded-full bg-sky-300/20 px-3 py-1 text-sky-200">
                    Destacado
                  </span>
                ) : (
                  <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
                    Activo
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-sky-200 transition hover:border-sky-200/60 hover:text-white"
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(product.id)}
                    className="rounded-full border border-rose-500/40 px-3 py-1 text-xs text-rose-200 transition hover:border-rose-400 hover:text-white"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
