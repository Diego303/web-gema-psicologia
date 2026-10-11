# Web de psicoterapia · Astro

Sitio estático de 4 páginas (Inicio, Servicios, Sobre mí, Contacto) construido con
**Astro** y desplegado en **GitHub Pages** mediante GitHub Actions.

- Diseño sereno: hero con un loto realista animado (WebGL), verde menta como color de
  marca, títulos en negro, fundidos de imagen y reveal-on-scroll.
- Sin frameworks de UI, sin Tailwind: CSS propio en `src/styles/global.css`.
- Imágenes optimizadas con `astro:assets`.
- Navegación MPA clásica (sin View Transitions), para que las animaciones se
  reejecuten en cada página.

---

## ✅ Requisitos

- **Node 24** (la misma versión que usa el CI)
- **pnpm 12.6.0**: la versión está fijada en `packageManager` (`package.json`) y el
  CI usa esa misma. Los ajustes de pnpm (scripts de instalación permitidos y
  hoisting de `sharp`) están en `pnpm-workspace.yaml`.

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

**TODO el texto y los datos están centralizados en un único archivo:**
[`src/data/content.json`](src/data/content.json). Cambia ahí cualquier texto,
teléfono, correo, enlace de reserva, etc., y la web se actualiza sola. No hace
falta tocar el código de las páginas.

Está organizado por secciones:

- **`global`** → datos del negocio compartidos por toda la web: `brand`, `name`,
  `role`, `colegiada`, `phone`, `whatsapp`, `email`, la **reserva** (`booking`) y
  el menú (`nav`).
- **`inicio`** → `meta` (SEO), `hero` (título/subtítulo) y `welcome` (bienvenida).
- **`servicios`** → `meta`, `head` (intro), `blocks` (los 5 servicios con su lista
  de ítems) y `cta`.
- **`sobre`** → `meta`, `head`, `intro`, `formacion`, `philo` (cita), `experiencia` y `cta`.
- **`contacto`** → `meta`, textos y etiquetas de los datos.

```jsonc
"global": {
  "colegiada": "...",   // ← nº de colegiada
  "phone": "...",       // ← teléfono para llamadas
  "whatsapp": "...",    // ← número de WhatsApp
  "email": "...",
  "booking": {
    "url": "https://...",  // ← enlace de reserva (Doctoralia, Calendly…)
    "button": "Reservar",  // ← texto del botón
    "modes": [             // ← modalidades, mostradas como texto junto al botón
      { "label": "Presencial", "text": "Alcalá de Henares (Madrid)" },
      { "label": "Online", "text": "Desde cualquier parte" }
    ]
  }
}
```

La reserva se muestra con el componente `Booking` (modalidades en texto + un único
botón «Reservar») en Servicios y Contacto; la banda final de Servicios usa el mismo
enlace y texto de botón.

### Nota técnica
Las páginas leen el JSON directamente; `src/data/site.ts` y `src/data/services.ts`
solo lo *derivan* (calculan los enlaces del menú con el `base` correcto y asocian
cada bloque de Servicios con su imagen). Las **imágenes** no van en el JSON porque
las optimiza `astro:assets`: se importan en las páginas / en `services.ts`.

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

## 🪷 Loto animado del inicio

El fondo del hero de la página de inicio es una animación WebGL (loto, ondas en el
agua y nubes) que vive en `public/lotus/`:

- `public/lotus/index.html` → página de la animación (se incrusta como `<iframe>` en
  `src/components/Hero.astro`).
- `public/lotus/assets/lotus.png` → imagen base. Para más nitidez, sustitúyela por una
  versión 4K **con el mismo encuadre** (mismo nombre).

La animación recorta el encuadre para que el loto quede siempre centrado (PC y
móvil), baja la calidad sola en móviles lentos, se pausa cuando la pestaña está oculta
o el hero sale de pantalla, y muestra una imagen fija con «reducir movimiento». Debe
servirse desde un servidor (`pnpm dev` / `pnpm preview` / GitHub Pages): abierta con
doble clic como archivo puede no cargar.

---

## 🚀 Despliegue en GitHub Pages

El repositorio incluye el workflow `.github/workflows/deploy.yml` (acción oficial
`withastro/action`). Para activarlo **una sola vez**:

1. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Haz `push` a la rama `main`. El workflow construye y publica automáticamente.
3. La web quedará en `https://Diego303.github.io/web-gema-psicologia/`.

> La build del CI es reproducible: instala con el `pnpm-lock.yaml` commiteado y con
> la versión de pnpm de `packageManager`. Si actualizas pnpm en local, cambia
> también ese campo (y commitea el lockfile si se modifica).

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
├─ public/lotus/             # animación WebGL del loto (hero de inicio)
└─ src/
   ├─ assets/                # fotos (las optimiza astro:assets)
   ├─ data/                  # content.json ← edita aquí · site.ts, services.ts (derivan)
   ├─ lib/                   # url.ts (rutas con base), img.ts (widths)
   ├─ styles/global.css      # todo el CSS (paleta menta en :root)
   ├─ components/            # Header, Footer, Hero, Booking, Frame, WorkBlock, Philo, CtaBand, ...
   ├─ layouts/Base.astro     # <head>, header, footer y scripts de cliente
   └─ pages/                 # index, servicios, sobre-mi, contacto
```
