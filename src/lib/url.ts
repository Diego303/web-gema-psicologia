// import.meta.env.BASE_URL siempre termina en "/" (ahora "/", con dominio propio).
// Úsalo para construir SIEMPRE los enlaces internos y respetar el `base` de astro.config.mjs.
const base = import.meta.env.BASE_URL;

export const url = (path = ''): string => base + path.replace(/^\//, '');
