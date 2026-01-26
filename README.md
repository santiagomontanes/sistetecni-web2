# Sistetecni Web

Landing, catálogo y panel administrador para laptops corporativas reacondicionadas con Supabase.

## Requisitos
- Node.js 18+
- Cuenta Supabase

## Configuración Supabase

1. **Crea un proyecto en Supabase** y copia:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Crea el bucket de Storage**
   - Nombre: `product-images`
   - Público: **ON** (para servir imágenes en el catálogo)

3. **Ejecuta el SQL de base de datos**
   - Abre el SQL editor en Supabase.
   - Ejecuta `supabase/schema.sql` para crear tablas y triggers.
   - Ejecuta `supabase/rls.sql` para activar RLS y políticas.

4. **Crea un usuario administrador**
   - Registra el usuario en Supabase Auth (email/password).
   - Inserta su `user_id` en la tabla `admins`:

```sql
insert into public.admins (user_id)
values ('UUID_DEL_USUARIO');
```

## Variables de entorno

Crea un archivo `.env.local` con:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
```

## Instalación

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` en tu navegador.

## Panel administrador

- Login: `http://localhost:3000/admin/login`
- Dashboard: `http://localhost:3000/admin`
- Productos: `http://localhost:3000/admin/products`

## Realtime

El catálogo público se actualiza en tiempo real mediante Supabase Realtime.
