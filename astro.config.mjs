// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://Diego303.github.io',
  base: '/web-gema-psicologia/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
