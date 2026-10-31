// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'CubyCloud',
      customCss: ['./src/docs/starlight.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/septian-padli/cubycloud',
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
          label: 'Troubleshooting',
          items: [
            { label: 'Operational Diagnostics', slug: 'docs/troubleshooting' },
          ],
        },
      ],
    }),
  ],
});
