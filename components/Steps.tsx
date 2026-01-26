import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Eliges tu equipo",
    description: "Te asesoramos según tu necesidad y presupuesto."
  },
  {
    title: "Confirmas envío",
    description: "Agendamos la entrega y validamos tu ciudad."
  },
  {
    title: "Pagas contraentrega",
    description: "Recibes el equipo y pagas con total tranquilidad."
  }
];

export function Steps() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 shadow-soft"
        >
          <div className="flex items-center gap-2 text-sky-200">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-semibold">Paso {index + 1}</span>
          </div>
          <p className="mt-4 text-base font-semibold text-white">{step.title}</p>
          <p className="mt-2 text-sm text-slate-300">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
