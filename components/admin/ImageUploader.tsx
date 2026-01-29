"use client";

import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";
import type { ProductImage, StorageUsage } from "@/lib/types";
import { cn } from "@/lib/utils";

const supabase = createBrowserClient();
const MAX_IMAGES = 6;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_TOTAL_SIZE = 30 * 1024 * 1024; // 30MB

const bytesAvailable = (usage: StorageUsage | null) =>
  usage ? usage.bytes_limit - usage.bytes_used : 0;

const formatBytes = (value: number) => `${(value / 1024 / 1024).toFixed(2)} MB`;

const compressImage = async (file: File) => {
  if (file.size <= MAX_IMAGE_SIZE) return file;

  const imageBitmap = await createImageBitmap(file);
  let scale = 1;
  let quality = 0.92;
  let outputBlob: Blob | null = null;

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(imageBitmap.width * scale));
    canvas.height = Math.max(1, Math.floor(imageBitmap.height * scale));

    const context = canvas.getContext("2d");
    if (!context) {
      imageBitmap.close?.();
      throw new Error("No se pudo procesar la imagen.");
    }

    context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

    outputBlob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );

    if (!outputBlob) {
      imageBitmap.close?.();
      throw new Error("No se pudo comprimir la imagen.");
    }

    if (outputBlob.size <= MAX_IMAGE_SIZE) {
      break;
    }

    if (quality > 0.6) {
      quality -= 0.1;
    } else {
      scale *= 0.9;
    }
  }

  imageBitmap.close?.();

  if (!outputBlob || outputBlob.size > MAX_IMAGE_SIZE) {
    throw new Error(`No se pudo comprimir ${file.name} a 10MB.`);
  }

  const newName = file.name.replace(/\.[^.]+$/, ".jpg");
  return new File([outputBlob], newName, { type: "image/jpeg" });
};

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

    setUploading(true);

    const uploadedImages: ProductImage[] = [];
    let processedFiles: File[];

    try {
      processedFiles = await Promise.all(filesArray.map((file) => compressImage(file)));
    } catch (compressionError) {
      setError(
        compressionError instanceof Error
          ? compressionError.message
          : "No se pudieron procesar las imágenes."
      );
      setUploading(false);
      return;
    }

    const totalCurrentSize = images.reduce((sum, image) => sum + image.sizeBytes, 0);
    const totalNewSize = processedFiles.reduce((sum, file) => sum + file.size, 0);

    if (totalCurrentSize + totalNewSize > MAX_TOTAL_SIZE) {
      setError(`El catálogo permite hasta ${formatBytes(MAX_TOTAL_SIZE)} en total para las imágenes.`);
      setUploading(false);
      return;
    }

    const available = bytesAvailable(usage);

    if (totalNewSize > available) {
      setError("No hay espacio suficiente para subir estas imágenes.");
      setUploading(false);
      return;
    }

    for (const file of processedFiles) {
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
            Imágenes mayores a 10MB se comprimen a 10MB. Total máximo: {formatBytes(MAX_TOTAL_SIZE)}.
            Espacio disponible: {formatBytes(bytesAvailable(usage))}.
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
