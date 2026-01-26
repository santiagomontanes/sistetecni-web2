import Link from "next/link";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 lg:grid-cols-3 lg:px-0">
        <div>
          <p className="text-lg font-semibold">Sistetecni</p>
          <p className="mt-3 text-sm text-slate-300">
            Laptops corporativas reacondicionadas con garantía real, batería nueva y contraentrega
            nacional.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-200">Contacto directo</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>WhatsApp: +57 3XX XXX XXXX</li>
            <li>Bogotá, Colombia</li>
            <li>Lunes a sábado: 8:00 a.m. - 6:00 p.m.</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-200">Redes</p>
          <div className="mt-3 flex items-center gap-3 text-slate-300">
            <Link href="https://instagram.com" className="transition hover:text-white">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://facebook.com" className="transition hover:text-white">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://wa.me/57XXXXXXXXXX" className="transition hover:text-white">
              <MessageCircle className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-400">
        © 2024 Sistetecni. Todos los derechos reservados.
      </div>
    </footer>
  );
}
