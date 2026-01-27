import type { StorageUsage } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatBytes(value: number) {
  if (value >= 1024 * 1024 * 1024) return `${(value / 1024 / 1024 / 1024).toFixed(2)} GB`;
  if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(1)} MB`;
  if (value >= 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${value} B`;
}

type StorageBarProps = {
  usage: StorageUsage | null;
};

export function StorageBar({ usage }: StorageBarProps) {
  if (!usage) {
    return null;
  }

  const percentage = Math.min((usage.bytes_used / usage.bytes_limit) * 100, 100);
  const isNearLimit = percentage > 85;

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-5">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span>Espacio usado</span>
        <span>
          {formatBytes(usage.bytes_used)} / {formatBytes(usage.bytes_limit)}
        </span>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-white/10">
        <div
          className={cn("h-2 rounded-full", isNearLimit ? "bg-rose-400" : "bg-sky-300")}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {isNearLimit ? (
        <p className="mt-2 text-xs text-rose-200">
          Estás cerca del límite. Considera eliminar imágenes antiguas.
        </p>
      ) : null}
    </div>
  );
}
