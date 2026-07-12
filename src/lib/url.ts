// import.meta.env.BASE_URL siempre termina en "/", p. ej. "/web-gema-psicologia/".
// Úsalo para construir SIEMPRE los enlaces internos y respetar el `base` de GitHub Pages.
const base = import.meta.env.BASE_URL;

export const url = (path = ''): string => base + path.replace(/^\//, '');
