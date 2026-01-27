"use client";

import { useState } from "react";
import type { Product, ProductImage, StorageUsage } from "@/lib/types";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { cn } from "@/lib/utils";

const defaultProduct = {
  name: "",
  price_cop: 0,
  cpu: "",
  ram_gb: 8,
  storage_type: "SSD" as const,
  storage_gb: 256,
  description: "",
  featured: false,
  images: [] as ProductImage[]
};

type ProductFormProps = {
  productId: string;
  initialData?: Product | null;
  usage: StorageUsage | null;
  onUsageUpdate: (usage: StorageUsage) => void;
  onSubmit: (payload: Omit<Product, "id" | "created_at" | "updated_at">) => Promise<void>;
  submitLabel: string;
};

export function ProductForm({
  productId,
  initialData,
  usage,
  onUsageUpdate,
  onSubmit,
  submitLabel
}: ProductFormProps) {
  const [form, setForm] = useState<Omit<Product, "id" | "created_at" | "updated_at">>(
    initialData
      ? {
          name: initialData.name,
          price_cop: initialData.price_cop,
          cpu: initialData.cpu,
          ram_gb: initialData.ram_gb,
          storage_type: initialData.storage_type,
          storage_gb: initialData.storage_gb,
          description: initialData.description,
          featured: initialData.featured,
          images: initialData.images ?? []
        }
      : defaultProduct
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof typeof form, value: string | number | boolean | ProductImage[]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSaving(true);

    if (!form.name.trim()) {
      setError("El nombre es obligatorio.");
      setSaving(false);
      return;
    }

    if (form.images.length > 6) {
      setError("Máximo 6 imágenes.");
      setSaving(false);
      return;
    }

    await onSubmit(form);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-xs font-semibold text-slate-300">
          Nombre
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
            placeholder="HP EliteBook Core i5 16GB"
            required
          />
        </label>
        <label className="text-xs font-semibold text-slate-300">
          Precio (COP)
          <input
            type="number"
            value={form.price_cop}
            onChange={(event) => updateField("price_cop", Number(event.target.value))}
            className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
            min={0}
            required
          />
        </label>
        <label className="text-xs font-semibold text-slate-300">
          CPU
          <input
            value={form.cpu ?? ""}
            onChange={(event) => updateField("cpu", event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
            placeholder="Intel Core i5"
          />
        </label>
        <label className="text-xs font-semibold text-slate-300">
          RAM (GB)
          <input
            type="number"
            value={form.ram_gb ?? 0}
            onChange={(event) => updateField("ram_gb", Number(event.target.value))}
            className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
            min={0}
          />
        </label>
        <label className="text-xs font-semibold text-slate-300">
          Tipo de almacenamiento
          <select
            value={form.storage_type ?? "SSD"}
            onChange={(event) => updateField("storage_type", event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
          >
            <option value="SSD">SSD</option>
            <option value="HDD">HDD</option>
          </select>
        </label>
        <label className="text-xs font-semibold text-slate-300">
          Almacenamiento (GB)
          <input
            type="number"
            value={form.storage_gb ?? 0}
            onChange={(event) => updateField("storage_gb", Number(event.target.value))}
            className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
            min={0}
          />
        </label>
      </div>

      <label className="text-xs font-semibold text-slate-300">
        Descripción
        <textarea
          value={form.description ?? ""}
          onChange={(event) => updateField("description", event.target.value)}
          className="mt-2 min-h-[120px] w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
          placeholder="Describe el estado, accesorios e ideal de uso."
        />
      </label>

      <label className="flex items-center gap-3 text-xs font-semibold text-slate-300">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(event) => updateField("featured", event.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-navy-900"
        />
        Marcar como destacado
      </label>

      <ImageUploader
        productId={productId}
        images={form.images}
        onChange={(images) => updateField("images", images)}
        usage={usage}
        onUsageUpdate={onUsageUpdate}
      />

      {error ? <p className="text-xs text-rose-200">{error}</p> : null}

      <button
        type="submit"
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-sky-300 px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-white",
          saving && "opacity-70"
        )}
        disabled={saving}
      >
        {submitLabel}
      </button>
    </form>
  );
}
