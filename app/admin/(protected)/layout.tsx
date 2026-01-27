import Link from "next/link";
import { AdminGate } from "@/components/admin/AdminGate";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-navy-900 pb-16 pt-12">
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 lg:px-0">
        <AdminGate>
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-sky-200">Panel</p>
              <h1 className="text-2xl font-semibold text-white">Administrador Sistetecni</h1>
            </div>
            <nav className="flex flex-wrap gap-3 text-sm text-slate-200">
              <Link href="/admin" className="hover:text-white">
                Dashboard
              </Link>
              <Link href="/admin/products" className="hover:text-white">
                Productos
              </Link>
              <Link href="/" className="hover:text-white">
                Ir al sitio
              </Link>
            </nav>
          </header>
          {children}
        </AdminGate>
      </div>
    </main>
  );
}
