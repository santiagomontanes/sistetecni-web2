alter table public.products enable row level security;
alter table public.admins enable row level security;
alter table public.storage_usage enable row level security;

create policy "Public products are readable"
  on public.products
  for select
  using (true);

create policy "Admins can insert products"
  on public.products
  for insert
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admins can update products"
  on public.products
  for update
  using (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admins can delete products"
  on public.products
  for delete
  using (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admins can read admins"
  on public.admins
  for select
  using (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admins can insert admins"
  on public.admins
  for insert
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admins can delete admins"
  on public.admins
  for delete
  using (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admins can read storage usage"
  on public.storage_usage
  for select
  using (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admins can update storage usage"
  on public.storage_usage
  for update
  using (exists (select 1 from public.admins where user_id = auth.uid()));
