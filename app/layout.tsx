import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistetecni | Laptops corporativas reacondicionadas",
  description:
    "Sistetecni ofrece laptops corporativas reacondicionadas con batería nueva, garantía de 1 año y contraentrega nacional en Colombia.",
  openGraph: {
    title: "Sistetecni | Laptops corporativas reacondicionadas",
    description:
      "Elegancia y confianza en laptops corporativas: batería nueva, garantía 1 año y contraentrega nacional.",
    type: "website",
    locale: "es_CO"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
