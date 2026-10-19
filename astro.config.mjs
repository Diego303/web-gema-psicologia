// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dominio propio (comprado en IONOS) apuntando a GitHub Pages: la web vive en la raíz.
  site: 'https://gemascaraquepsicologia.com',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
