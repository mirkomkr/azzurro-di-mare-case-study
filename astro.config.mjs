// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Placeholder: replace with the definitive production domain when available.
  site: 'https://azzurro-di-mare.mirkopasseri.it',
  integrations: [vue(), sitemap()],
});
