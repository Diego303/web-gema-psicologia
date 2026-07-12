# Web de psicoterapia · Astro

Sitio estático de 4 páginas (Inicio, Servicios, Sobre mí, Contacto) construido con
**Astro** y desplegado en **GitHub Pages** mediante GitHub Actions.

- Diseño sereno (loto + ondas, hero con cielo/sol/nubes, fundidos de imagen, reveal-on-scroll).
- Sin frameworks de UI, sin Tailwind: CSS propio en `src/styles/global.css`.
- Imágenes optimizadas con `astro:assets`.
- Navegación MPA clásica (sin View Transitions), para que las animaciones se
  reejecuten en cada página.

---

## ✅ Requisitos

- **Node 20+**
- **pnpm** (gestor de paquetes usado en este proyecto)

## 🧞 Comandos

Todos se ejecutan desde la raíz del proyecto:

| Comando         | Acción                                                  |
| :-------------- | :------------------------------------------------------ |
| `pnpm install`  | Instala las dependencias                                |
| `pnpm dev`      | Servidor de desarrollo en `localhost:4321`              |
| `pnpm build`    | Genera el sitio de producción en `./dist/`              |
| `pnpm preview`  | Previsualiza el build local antes de desplegar          |

> ℹ️ El sitio se publica bajo un subpath (`base: '/web-gema-psicologia/'`).
> En `pnpm dev` y `pnpm preview` la web vive en
> `http://localhost:4321/web-gema-psicologia/` (no en la raíz `/`).

---

## ✏️ Cómo editar los contenidos

Casi todo lo editable está centralizado en **`src/data/`**:

### `src/data/site.ts` — datos del negocio
Nombre, rol, nº de colegiada, teléfono, email, ubicación, horario, navegación y
**los enlaces de reserva**. Edita aquí y se actualiza en todas las páginas:

```ts
export const site = {
  brand: 'Gema Mascaraque Psicología',
  name: 'Gema Mascaraque',
  role: 'Psicóloga General Sanitaria',
  colegiada: 'Col. nº 000',        // ← nº de colegiada real
  phone: '+34 600 00 00 00',       // ← teléfono real
  email: 'hola@tudominio.com',     // ← email real
  location: 'Alcalá de Henares (Madrid)',
  online: 'Desde cualquier parte',
  bookingPresencial: '#', // ← pega aquí tu enlace de reserva presencial (p. ej. Calendly)
  bookingOnline: '#',     // ← pega aquí tu enlace de reserva online
  // ...
};
```

> Quedan como ejemplo (rellénalos con datos reales): `colegiada`, `phone`,
> `email`, `bookingPresencial`, `bookingOnline`.

### `src/data/services.ts` — bloques de la página de Servicios
Son **5 bloques** (Síntomas emocionales, Autoestima, Trauma y estrés, Duelo,
Problemas alimentarios). Cada uno tiene `title`, `items[]`, `image` y `side`
(`'right'` foto a la derecha · `'left'` foto a la izquierda), más `eyebrow` y
`note` opcionales. La página `servicios.astro` los recorre automáticamente.

### Textos largos
Las presentaciones de **Sobre mí** y la **bienvenida** del inicio están como
texto editable (con marcadores `[entre corchetes]`) directamente en
`src/pages/sobre-mi.astro` e `src/pages/index.astro`.

---

## 🖼️ Cambiar las fotos placeholder por reales

Todas las secciones ya usan fotos reales. Las imágenes viven en `src/assets/`:

- `inicio-bienvenida.jpg` → sección de bienvenida (Inicio)
- `servicio-sintomas-emocionales.png` → Servicios · Síntomas emocionales
- `servicio-autoestima.png` → Servicios · Autoestima
- `servicio-trauma-estres.png` → Servicios · Trauma y estrés
- `servicio-duelo.png` → Servicios · Duelo
- `servicio-problemas-alimentarios.png` → Servicios · Problemas alimentarios
- `sobre-mi-1.jpg` · `sobre-mi-2.jpg` → Sobre mí (retrato + online)
- `sobre-mi-3.jpg` → Sobre mí (sesión, junto a la experiencia)
- `contacto.jpg` → Contacto

Para sustituir cualquiera, **reemplaza el archivo manteniendo el mismo nombre**
(o cambia el `import` correspondiente en la página o en `services.ts`).
`astro:assets` las optimiza (las sirve como WebP) y añade el `base` correcto:
nunca escribas rutas a mano.

> Recorte: cada foto se ajusta a la proporción de su hueco con `object-fit: cover`.
> Las fotos apaisadas (sesión de «Sobre mí» y la de «Contacto») se recortan al
> centro del hueco vertical del diseño. Si quieres que se vean completas, avísame
> y ajusto la proporción de ese hueco.

El componente `ImagePlaceholder` sigue disponible como respaldo: si en
`services.ts` pones `image: null` en un bloque, ese bloque mostrará el marcador
gris con silueta en lugar de una foto.

---

## 🚀 Despliegue en GitHub Pages

El repositorio incluye el workflow `.github/workflows/deploy.yml` (acción oficial
`withastro/action`). Para activarlo **una sola vez**:

1. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Haz `push` a la rama `main`. El workflow construye y publica automáticamente.
3. La web quedará en `https://Diego303.github.io/web-gema-psicologia/`.

> Recomendado: ejecuta `pnpm install` una vez y **commitea el `pnpm-lock.yaml`**
> para que la build de CI sea reproducible.

### Configuración de rutas (`astro.config.mjs`)
```js
site: 'https://Diego303.github.io',
base: '/web-gema-psicologia/',  // sitio de proyecto
trailingSlash: 'ignore',
integrations: [sitemap()],
```
Si algún día renombras el repositorio o lo conviertes en sitio de usuario
(`Diego303.github.io`), cambia `base` a `'/'`.

---

## 🗂️ Estructura

```text
.
├─ astro.config.mjs          # site + base (GitHub Pages) + sitemap
├─ .github/workflows/deploy.yml
├─ public/favicon.png        # icono/logo de la web (loto + GM)
└─ src/
   ├─ assets/                # consulta.jpg, emocional.jpg, alimentario.jpg
   ├─ data/                  # site.ts, services.ts  ← edita aquí
   ├─ lib/                   # url.ts (rutas con base), img.ts (widths)
   ├─ styles/global.css      # TODO el CSS del diseño original
   ├─ components/            # Header, Footer, Hero, Frame, WorkBlock, Philo, CtaBand, ...
   ├─ layouts/Base.astro     # <head>, header, footer y scripts de cliente
   └─ pages/                 # index, servicios, sobre-mi, contacto
```
