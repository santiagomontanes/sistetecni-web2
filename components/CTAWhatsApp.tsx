import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, cn, formatCOP } from "@/lib/utils";

type CTAWhatsAppProps = {
  productName?: string;
  priceCOP?: number;
  label?: string;
  className?: string;
};

export function CTAWhatsApp({
  productName = "una laptop corporativa",
  priceCOP = 0,
  label = "Comprar por WhatsApp",
  className
}: CTAWhatsAppProps) {
  const link = priceCOP
    ? buildWhatsAppLink(productName, priceCOP)
    : buildWhatsAppLink(productName, 0);

  return (
    <Link
      href={link}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-sky-300 px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-white",
        className
      )}
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </Link>
  );
}

export function WhatsAppInline({ productName, priceCOP }: CTAWhatsAppProps) {
  return (
    <Link
      href={buildWhatsAppLink(productName ?? "una laptop corporativa", priceCOP ?? 0)}
      className="inline-flex items-center gap-1 text-sm font-semibold text-sky-200 transition hover:text-white"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp
      {priceCOP ? ` ${formatCOP(priceCOP)}` : ""}
    </Link>
  );
}
