create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_cop int not null,
  cpu text,
  ram_gb int,
  storage_type text check (storage_type in ('SSD', 'HDD')),
  storage_gb int,
  description text,
  featured boolean default false,
  images jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.storage_usage (
  id int primary key default 1,
  bytes_used bigint not null default 0,
  bytes_limit bigint not null default 524288000
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

insert into public.storage_usage (id, bytes_used, bytes_limit)
values (1, 0, 524288000)
on conflict (id) do nothing;
