export type Product = {
  slug: string;
  name: string;
  cpu: string;
  ram: number;
  storageType: "SSD" | "HDD";
  storageSize: string;
  priceCOP: number;
  tags: string[];
  shortDescription: string;
  longDescription: string;
  images: string[];
  featured: boolean;
};

export const products: Product[] = [
  {
    slug: "hp-probook-i5-8gb-500gb-hdd",
    name: "HP ProBook Core i5 8GB 500GB HDD",
    cpu: "Intel Core i5",
    ram: 8,
    storageType: "HDD",
    storageSize: "500GB",
    priceCOP: 550000,
    tags: ["Batería nueva", "Corporativo"],
    shortDescription: "Fluidez para tareas diarias y oficina con respaldo corporativo.",
    longDescription:
      "El HP ProBook reacondicionado ofrece un rendimiento confiable para estudio y trabajo. Perfecto para productividad diaria con un enfoque en durabilidad corporativa.",
    images: ["/images/laptop-placeholder.svg", "/images/laptop-placeholder.svg"],
    featured: true
  },
  {
    slug: "hp-elitebook-i5-16gb-500gb-ssd",
    name: "HP EliteBook Core i5 16GB (8+8) SSD 500GB",
    cpu: "Intel Core i5",
    ram: 16,
    storageType: "SSD",
    storageSize: "500GB",
    priceCOP: 750000,
    tags: ["Batería nueva", "Premium"],
    shortDescription: "Arranque veloz y multitarea estable para profesionales.",
    longDescription:
      "Equipado con SSD y 16GB de RAM, este EliteBook es ideal para multitarea, videollamadas y navegación rápida. Con garantía de 1 año incluida.",
    images: ["/images/laptop-placeholder.svg", "/images/laptop-placeholder.svg"],
    featured: true
  },
  {
    slug: "hp-probook-i7-16gb-256gb-ssd",
    name: "HP ProBook Core i7 16GB SSD 256GB",
    cpu: "Intel Core i7",
    ram: 16,
    storageType: "SSD",
    storageSize: "256GB",
    priceCOP: 820000,
    tags: ["Batería nueva", "Alto desempeño"],
    shortDescription: "Potencia premium con almacenamiento veloz.",
    longDescription:
      "Ideal para profesionales que requieren alto rendimiento en edición ligera, hojas de cálculo y gestión simultánea de tareas.",
    images: ["/images/laptop-placeholder.svg", "/images/laptop-placeholder.svg"],
    featured: true
  },
  {
    slug: "hp-elitebook-i5-8gb-256gb-ssd",
    name: "HP EliteBook Core i5 8GB SSD 256GB",
    cpu: "Intel Core i5",
    ram: 8,
    storageType: "SSD",
    storageSize: "256GB",
    priceCOP: 620000,
    tags: ["Batería nueva", "Ligero"],
    shortDescription: "Equilibrio entre precio y velocidad para productividad.",
    longDescription:
      "La línea EliteBook ofrece diseño elegante y rendimiento corporativo, perfecta para movilidad y trabajo remoto.",
    images: ["/images/laptop-placeholder.svg", "/images/laptop-placeholder.svg"],
    featured: false
  },
  {
    slug: "hp-probook-i5-8gb-1tb-hdd",
    name: "HP ProBook Core i5 8GB 1TB HDD",
    cpu: "Intel Core i5",
    ram: 8,
    storageType: "HDD",
    storageSize: "1TB",
    priceCOP: 580000,
    tags: ["Batería nueva", "Gran almacenamiento"],
    shortDescription: "Espacio amplio para archivos y documentos.",
    longDescription:
      "Ideal para quienes necesitan almacenar grandes volúmenes de información sin sacrificar estabilidad.",
    images: ["/images/laptop-placeholder.svg", "/images/laptop-placeholder.svg"],
    featured: false
  },
  {
    slug: "hp-elitebook-i7-16gb-512gb-ssd",
    name: "HP EliteBook Core i7 16GB SSD 512GB",
    cpu: "Intel Core i7",
    ram: 16,
    storageType: "SSD",
    storageSize: "512GB",
    priceCOP: 920000,
    tags: ["Batería nueva", "Top performance"],
    shortDescription: "Potencia total para flujo de trabajo exigente.",
    longDescription:
      "La opción perfecta para analistas, diseñadores y profesionales que requieren velocidad y confiabilidad.",
    images: ["/images/laptop-placeholder.svg", "/images/laptop-placeholder.svg"],
    featured: true
  },
  {
    slug: "hp-probook-i5-12gb-256gb-ssd",
    name: "HP ProBook Core i5 12GB SSD 256GB",
    cpu: "Intel Core i5",
    ram: 12,
    storageType: "SSD",
    storageSize: "256GB",
    priceCOP: 690000,
    tags: ["Batería nueva", "Equilibrado"],
    shortDescription: "Una opción equilibrada para estudiantes y profesionales.",
    longDescription:
      "Con 12GB de RAM y SSD, brinda un rendimiento fluido para multitarea diaria.",
    images: ["/images/laptop-placeholder.svg", "/images/laptop-placeholder.svg"],
    featured: false
  },
  {
    slug: "hp-elitebook-i5-16gb-1tb-hdd",
    name: "HP EliteBook Core i5 16GB 1TB HDD",
    cpu: "Intel Core i5",
    ram: 16,
    storageType: "HDD",
    storageSize: "1TB",
    priceCOP: 720000,
    tags: ["Batería nueva", "Gran almacenamiento"],
    shortDescription: "Amplio almacenamiento y multitarea fluida.",
    longDescription:
      "Perfecto para quienes manejan archivos pesados y necesitan estabilidad corporativa.",
    images: ["/images/laptop-placeholder.svg", "/images/laptop-placeholder.svg"],
    featured: false
  },
  {
    slug: "hp-probook-i3-8gb-256gb-ssd",
    name: "HP ProBook Core i3 8GB SSD 256GB",
    cpu: "Intel Core i3",
    ram: 8,
    storageType: "SSD",
    storageSize: "256GB",
    priceCOP: 480000,
    tags: ["Batería nueva", "Accesible"],
    shortDescription: "Entrada ideal para estudio y tareas esenciales.",
    longDescription:
      "Un equipo confiable y accesible, listo para clases virtuales y trabajo administrativo.",
    images: ["/images/laptop-placeholder.svg", "/images/laptop-placeholder.svg"],
    featured: false
  },
  {
    slug: "hp-elitebook-i5-8gb-500gb-hdd",
    name: "HP EliteBook Core i5 8GB 500GB HDD",
    cpu: "Intel Core i5",
    ram: 8,
    storageType: "HDD",
    storageSize: "500GB",
    priceCOP: 560000,
    tags: ["Batería nueva", "Corporativo"],
    shortDescription: "Diseño elegante con rendimiento estable.",
    longDescription:
      "Equipo corporativo con acabados premium, listo para productividad diaria con garantía incluida.",
    images: ["/images/laptop-placeholder.svg", "/images/laptop-placeholder.svg"],
    featured: false
  }
];
