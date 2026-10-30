// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'CubyCloud Docs',
    }),
  ],
});
