"use client";

import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";
import type { ProductImage, StorageUsage } from "@/lib/types";
import { cn } from "@/lib/utils";

const supabase = createBrowserClient();
const MAX_IMAGES = 6;
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const bytesAvailable = (usage: StorageUsage | null) =>
  usage ? usage.bytes_limit - usage.bytes_used : 0;

const formatBytes = (value: number) => `${(value / 1024 / 1024).toFixed(2)} MB`;

type ImageUploaderProps = {
  productId: string;
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  usage: StorageUsage | null;
  onUsageUpdate: (usage: StorageUsage) => void;
};

export function ImageUploader({
  productId,
  images,
  onChange,
  usage,
  onUsageUpdate
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;
    setError(null);

    const currentCount = images.length;
    const filesArray = Array.from(files);

    if (currentCount + filesArray.length > MAX_IMAGES) {
      setError(`Máximo ${MAX_IMAGES} imágenes por producto.`);
      return;
    }

    const available = bytesAvailable(usage);
    const totalSize = filesArray.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > available) {
      setError("No hay espacio suficiente para subir estas imágenes.");
      return;
    }

    for (const file of filesArray) {
      if (file.size > MAX_SIZE) {
        setError(`El archivo ${file.name} supera 2MB.`);
        return;
      }
    }

    setUploading(true);

    const uploadedImages: ProductImage[] = [];

    for (const file of filesArray) {
      const fileExt = file.name.split(".").pop() ?? "jpg";
      const filePath = `products/${productId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (uploadError) {
        setError(uploadError.message);
        setUploading(false);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      uploadedImages.push({
        url: publicUrl.publicUrl,
        path: filePath,
        sizeBytes: file.size
      });
    }

    const newImages = [...images, ...uploadedImages];
    onChange(newImages);

    if (usage) {
      const updatedUsage = {
        ...usage,
        bytes_used: usage.bytes_used + uploadedImages.reduce((sum, img) => sum + img.sizeBytes, 0)
      };
      const { error: usageError } = await supabase
        .from("storage_usage")
        .update({ bytes_used: updatedUsage.bytes_used })
        .eq("id", usage.id);

      if (!usageError) {
        onUsageUpdate(updatedUsage);
      }
    }

    setUploading(false);
  };

  const handleRemove = async (image: ProductImage) => {
    setError(null);
    const { error: removeError } = await supabase.storage
      .from("product-images")
      .remove([image.path]);

    if (removeError) {
      setError(removeError.message);
      return;
    }

    const updatedImages = images.filter((item) => item.path !== image.path);
    onChange(updatedImages);

    if (usage) {
      const updatedUsage = {
        ...usage,
        bytes_used: Math.max(usage.bytes_used - image.sizeBytes, 0)
      };
      const { error: usageError } = await supabase
        .from("storage_usage")
        .update({ bytes_used: updatedUsage.bytes_used })
        .eq("id", usage.id);

      if (!usageError) {
        onUsageUpdate(updatedUsage);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-dashed border-white/20 bg-navy-900/40 p-4">
        <div className="flex flex-col gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-2 text-sky-200">
            <Upload className="h-4 w-4" />
            <span>Subir imágenes (máx {MAX_IMAGES})</span>
          </div>
          <p className="text-xs text-slate-400">
            Tamaño máximo por imagen: 2MB. Espacio disponible: {formatBytes(bytesAvailable(usage))}.
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => handleUpload(event.target.files)}
            disabled={uploading}
            className="text-xs"
          />
        </div>
      </div>

      {error ? <p className="text-xs text-rose-200">{error}</p> : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <div
            key={image.path}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-navy-800/60 px-4 py-3"
          >
            <div className="text-xs text-slate-300">
              <p className="font-semibold text-white">Imagen</p>
              <p className="text-[10px] text-slate-400">{formatBytes(image.sizeBytes)}</p>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(image)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-rose-500/40 px-3 py-2 text-xs text-rose-200",
                uploading && "opacity-60"
              )}
              disabled={uploading}
            >
              <Trash2 className="h-3 w-3" />
              Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
