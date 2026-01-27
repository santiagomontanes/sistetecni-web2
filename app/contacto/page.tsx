import type { Metadata } from "next";
import { MapPin, Clock } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Sistetecni",
  description: "Habla con Sistetecni para asesoría personalizada y compras seguras."
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-navy-900 pb-16 pt-12">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 lg:px-0">
        <SectionHeading
          eyebrow="Contacto"
          title="Estamos listos para asesorarte"
          description="Déjanos tu mensaje o escríbenos directo por WhatsApp para cotizar tu laptop ideal."
        />
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 shadow-soft">
              <div className="flex items-center gap-2 text-sky-200">
                <MapPin className="h-4 w-4" />
                <p className="text-sm font-semibold">Ciudad</p>
              </div>
              <p className="mt-3 text-sm text-slate-300">Bogotá, Colombia</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 shadow-soft">
              <div className="flex items-center gap-2 text-sky-200">
                <Clock className="h-4 w-4" />
                <p className="text-sm font-semibold">Horario de atención</p>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Lunes a sábado · 8:00 a.m. - 6:00 p.m.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
