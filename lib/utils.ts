import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

export function buildWhatsAppLink(productName: string, priceCOP: number) {
  const message = `Hola, vengo de la web de Sistetecni. Me interesa: ${productName}, precio ${formatCOP(
    priceCOP
  )}. Mi ciudad es: ____`;
  return `https://wa.me/57XXXXXXXXXX?text=${encodeURIComponent(message)}`;
}
