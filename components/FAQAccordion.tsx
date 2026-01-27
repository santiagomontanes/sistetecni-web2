"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "¿La compra es contraentrega?",
    answer:
      "Sí. Entregamos en todo el país con pago contraentrega para que recibas tu equipo y pagues con confianza."
  },
  {
    question: "¿Qué garantía ofrecen?",
    answer:
      "Incluimos 1 año de garantía por hardware, además de soporte técnico especializado durante todo el proceso."
  },
  {
    question: "¿Las baterías son nuevas?",
    answer: "Sí, cada laptop incluye batería nueva y revisión técnica completa."
  },
  {
    question: "¿Hacen envíos a todo Colombia?",
    answer: "Sí, trabajamos con transportadoras aliadas para envíos seguros en todo el territorio nacional."
  },
  {
    question: "¿Qué incluye la compra?",
    answer:
      "Laptop, cargador original o compatible certificado, batería nueva y certificado de revisión técnica."
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <button
            key={faq.question}
            type="button"
            onClick={() => setOpenIndex(isOpen ? null : index)}
            className="w-full rounded-2xl border border-white/10 bg-navy-800/60 p-5 text-left shadow-soft transition hover:border-sky-200/40"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-white">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-sky-200 transition",
                  isOpen ? "rotate-180" : "rotate-0"
                )}
              />
            </div>
            {isOpen ? (
              <p className="mt-3 text-sm text-slate-300">{faq.answer}</p>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
