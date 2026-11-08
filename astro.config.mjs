// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://cubycrate.com',
  integrations: [
    react(),
    starlight({
      title: 'CubyCrate',
      logo: {
        light: './public/logos/horizontal/default/cubycrate-horizontal-color.webp',
        dark: './public/logos/horizontal/default/cubycrate-horizontal-white.webp',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      customCss: ['./src/docs/starlight.css'],
      components: {
        ThemeSelect: './src/docs/ThemeSelect.astro',
      },
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://cubycrate.com/og-image.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:width',
            content: '1200',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:height',
            content: '630',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:type',
            content: 'image/png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: 'https://cubycrate.com/og-image.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:site_name',
            content: 'CubyCrate',
          },
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/septian-padli/cubycrate',
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'docs' },
            { label: 'Installation', slug: 'docs/getting-started/installation' },
            { label: 'Configuration & Reverse Proxy', slug: 'docs/getting-started/configuration' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Self-Hosted File Storage', slug: 'docs/guides/self-hosted-file-storage' },
            { label: 'Local vs S3 Storage', slug: 'docs/guides/local-vs-s3-storage' },
            { label: 'Docker Deployment Checklist', slug: 'docs/guides/docker-deployment-checklist' },
          ],
        },
        {
          label: 'User Guide',
          items: [
            { label: 'File Management', slug: 'docs/user-guide/file-management' },
            { label: 'Sharing & Permissions', slug: 'docs/user-guide/sharing' },
          ],
        },
        {
          label: 'Administrator Guide',
          items: [
            { label: 'Backup & Disaster Recovery', slug: 'docs/administrator-guide/backup-restore' },
          ],
        },
        {
          label: 'Project',
          items: [
            { label: 'About CubyCrate', slug: 'docs/about' },
            { label: 'Release History', slug: 'docs/changelog' },
          ],
        },
        {
          label: 'Troubleshooting',
          items: [
            { label: 'Operational Diagnostics', slug: 'docs/troubleshooting' },
          ],
        },
      ],
    }),
  ],
});
