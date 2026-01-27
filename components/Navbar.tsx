import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#garantia", label: "Garantía" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "/contacto", label: "Contacto" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy-900/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 lg:px-0">
        <Link href="/" className="text-xl font-semibold text-white">
          Sistetecni
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-200 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="https://wa.me/57XXXXXXXXXX"
            className="inline-flex items-center gap-2 rounded-full border border-sky-200/40 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:border-sky-200 hover:text-white"
          >
            <PhoneCall className="h-4 w-4" />
            WhatsApp
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/5 px-4 py-3 text-xs text-slate-200 lg:hidden">
        <span>Venta corporativa premium</span>
        <Link
          href="https://wa.me/57XXXXXXXXXX"
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-sky-300 px-4 py-2 text-xs font-semibold text-navy-900"
          )}
        >
          <PhoneCall className="h-3 w-3" />
          WhatsApp
        </Link>
      </div>
    </header>
  );
}
