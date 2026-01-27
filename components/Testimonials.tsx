import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Laura R.",
    city: "Bogotá",
    message:
      "Recibí el equipo en perfectas condiciones, la batería nueva marca la diferencia. Atención 10/10."
  },
  {
    name: "Carlos M.",
    city: "Medellín",
    message:
      "Compré para mi empresa y llegaron rápido, todo con garantía y soporte. Muy recomendados."
  },
  {
    name: "Natalia G.",
    city: "Cali",
    message:
      "Me asesoraron por WhatsApp y elegí el mejor modelo para mis clases. Super confiables."
  }
];

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.name}
          className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 shadow-soft"
        >
          <div className="flex gap-1 text-sky-200">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-sky-200" />
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-200">“{testimonial.message}”</p>
          <p className="mt-4 text-xs font-semibold text-slate-400">
            {testimonial.name} · {testimonial.city}
          </p>
        </div>
      ))}
    </div>
  );
}
