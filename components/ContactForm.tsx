"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { CTAWhatsApp } from "@/components/CTAWhatsApp";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid = name.trim().length > 2 && phone.trim().length > 6 && message.trim().length > 6;

  return (
    <div className="rounded-3xl border border-white/10 bg-navy-800/60 p-6 shadow-card">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (isValid) {
            setSubmitted(true);
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="text-xs font-semibold text-slate-200">Nombre completo</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-200">Celular</label>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
            placeholder="Ej: 3001234567"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-200">Mensaje</label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-2 min-h-[120px] w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-3 text-sm text-white focus:border-sky-200/40 focus:outline-none"
            placeholder="Cuéntanos qué equipo buscas"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-300 px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!isValid}
        >
          <Send className="h-4 w-4" />
          Enviar solicitud
        </button>
        {submitted ? (
          <p className="text-sm text-sky-200">Gracias, pronto te contactaremos.</p>
        ) : null}
      </form>
      <div className="mt-6 border-t border-white/10 pt-6">
        <CTAWhatsApp label="Escríbenos por WhatsApp" className="w-full" />
      </div>
    </div>
  );
}
