import Link from "next/link";
import { ShieldCheck, Sparkles, Truck, Zap, Star } from "lucide-react";
import { products } from "@/data/products";
import { CTAWhatsApp } from "@/components/CTAWhatsApp";
import { FiltersBar } from "@/components/FiltersBar";
import { SectionHeading } from "@/components/SectionHeading";
import { Steps } from "@/components/Steps";
import { Testimonials } from "@/components/Testimonials";
import { FAQAccordion } from "@/components/FAQAccordion";

const featured = products.filter((product) => product.featured).slice(0, 3);

export default function HomePage() {
  return (
    <main>
      <section id="inicio" className="bg-hero-gradient pb-16 pt-16 md:pt-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center lg:px-0">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/40 bg-white/5 px-4 py-2 text-xs font-semibold text-sky-100">
              <Sparkles className="h-4 w-4" />
              Temporada escolar
            </span>
            <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
              Laptops corporativas premium con garantía real y entrega segura
            </h1>
            <p className="text-base text-slate-300 md:text-lg">
              Sistetecni reacondiciona laptops HP corporativas para que disfrutes rendimiento,
              durabilidad y estilo a un precio inteligente en Colombia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#catalogo"
                className="rounded-full bg-sky-300 px-6 py-3 text-sm font-semibold text-navy-900 transition hover:bg-white"
              >
                Ver catálogo
              </Link>
              <CTAWhatsApp />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: <ShieldCheck className="h-4 w-4" />, text: "1 año de garantía" },
                { icon: <Zap className="h-4 w-4" />, text: "Batería nueva" },
                { icon: <Truck className="h-4 w-4" />, text: "Contraentrega nacional" },
                { icon: <Star className="h-4 w-4" />, text: "Equipos corporativos" }
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-sky-100"
                >
                  {badge.icon}
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-3xl border border-white/10 bg-navy-800/60 p-8 shadow-card">
              <p className="text-sm font-semibold text-sky-200">Destacados del mes</p>
              <div className="mt-6 space-y-4">
                {featured.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-navy-900/60 p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.shortDescription}</p>
                    </div>
                    <CTAWhatsApp
                      productName={item.name}
                      priceCOP={item.priceCOP}
                      label="WhatsApp"
                      className="px-4 py-2 text-xs"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
                Inventario limitado · Asesoría personalizada en menos de 5 minutos.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl space-y-10 px-4 lg:px-0">
          <SectionHeading
            eyebrow="Por qué elegirnos"
            title="Rendimiento, durabilidad corporativa y precio inteligente"
            description="Equipos revisados por expertos, listos para entregar resultados desde el primer día."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Rendimiento",
                description:
                  "Procesadores confiables y configuraciones optimizadas para estudio, trabajo y multitarea."
              },
              {
                title: "Durabilidad corporativa",
                description:
                  "Chasis premium HP, diseñados para uso intensivo y larga vida útil."
              },
              {
                title: "Precio inteligente",
                description:
                  "Ahorra frente a equipos nuevos sin sacrificar calidad ni respaldo."
              }
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-navy-800/60 p-6 shadow-soft transition hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="bg-navy-800/40 py-16">
        <div className="mx-auto w-full max-w-6xl space-y-10 px-4 lg:px-0">
          <SectionHeading
            eyebrow="Catálogo rápido"
            title="Encuentra tu laptop ideal en minutos"
            description="Filtra por RAM, almacenamiento y precio para seleccionar tu equipo corporativo ideal."
          />
          <FiltersBar products={products} limit={6} />
          <div className="text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-full border border-sky-200/40 px-6 py-3 text-sm font-semibold text-sky-100 transition hover:border-sky-200 hover:text-white"
            >
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl space-y-10 px-4 lg:px-0">
          <SectionHeading
            eyebrow="Cómo comprar"
            title="Proceso simple y seguro"
            description="Te acompañamos desde la selección hasta la entrega en tu ciudad."
          />
          <Steps />
        </div>
      </section>

      <section id="garantia" className="bg-navy-800/40 py-16">
        <div className="mx-auto w-full max-w-6xl space-y-10 px-4 lg:px-0">
          <SectionHeading
            eyebrow="Garantía y soporte"
            title="Respaldo real por 1 año"
            description="Tu compra está respaldada con garantía de hardware, batería nueva y revisión técnica certificada."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Revisión técnica completa",
              "Batería nueva certificada",
              "Soporte personalizado por WhatsApp"
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-navy-900/70 p-6 text-sm text-slate-200 shadow-soft"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonios" className="py-16">
        <div className="mx-auto w-full max-w-6xl space-y-10 px-4 lg:px-0">
          <SectionHeading
            eyebrow="Testimonios"
            title="Clientes felices en todo Colombia"
            description="La confianza es nuestro mejor respaldo."
          />
          <Testimonials />
        </div>
      </section>

      <section id="preguntas" className="bg-navy-800/40 py-16">
        <div className="mx-auto w-full max-w-6xl space-y-10 px-4 lg:px-0">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Todo lo que necesitas saber"
            description="Resolvemos las dudas más comunes antes de tu compra."
          />
          <FAQAccordion />
        </div>
      </section>
    </main>
  );
}
