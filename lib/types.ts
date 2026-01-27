export type ProductImage = {
  url: string;
  path: string;
  sizeBytes: number;
};

export type Product = {
  id: string;
  name: string;
  price_cop: number;
  cpu: string | null;
  ram_gb: number | null;
  storage_type: "SSD" | "HDD" | null;
  storage_gb: number | null;
  description: string | null;
  featured: boolean;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
};

export type StorageUsage = {
  id: number;
  bytes_used: number;
  bytes_limit: number;
};
