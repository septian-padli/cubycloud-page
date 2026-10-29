export type Heading = { id: string; title: string; level: 2 | 3 };
export type Article = { path: string; title: string; category: string; summary: string; keywords: string; headings: Heading[] };
export const articles: Article[] = [
  { path: '/docs', title: 'Introduction', category: 'Getting Started', summary: 'A practical overview of the self-hosted file drive.', keywords: 'overview self hosted drive sharing storage', headings: [
    { id: 'what-is-cubycloud', title: 'What is CubyCloud?', level: 2 }, { id: 'core-capabilities', title: 'Core Capabilities', level: 2 }, { id: 'how-storage-works', title: 'How Storage Works', level: 2 }, { id: 'my-storage-and-organization', title: 'My Storage and Organization', level: 2 }, { id: 'who-is-cubycloud-for', title: 'Who Is CubyCloud For?', level: 2 }, { id: 'next-steps', title: 'Next Steps', level: 2 },
  ] },
  { path: '/docs/getting-started/installation', title: 'Installation', category: 'Getting Started', summary: 'A documentation design draft for deployment and first launch.', keywords: 'docker setup deployment configuration prerequisites', headings: [
    { id: 'before-you-begin', title: 'Before You Begin', level: 2 }, { id: 'prerequisites', title: 'Prerequisites', level: 2 }, { id: 'deployment-overview', title: 'Deployment Overview', level: 2 }, { id: 'docker-setup', title: 'Docker Setup', level: 2 }, { id: 'configuration', title: 'Configuration', level: 2 }, { id: 'first-launch', title: 'First Launch', level: 2 }, { id: 'next-steps', title: 'Next Steps', level: 2 },
  ] },
  { path: '/docs/user-guide/file-management', title: 'File Management', category: 'User Guide', summary: 'Find, organize, and preview files in the browser.', keywords: 'folders preview starred trash organization', headings: [
    { id: 'overview', title: 'Overview', level: 2 }, { id: 'navigating-my-storage', title: 'Navigating My Storage', level: 2 }, { id: 'understanding-organization-storage', title: 'Understanding Organization Storage', level: 2 }, { id: 'working-with-files-and-folders', title: 'Working with Files and Folders', level: 2 }, { id: 'previewing-files', title: 'Previewing Files', level: 2 }, { id: 'supported-previews', title: 'Supported previews', level: 3 }, { id: 'starred-items', title: 'Starred Items', level: 2 }, { id: 'trash', title: 'Trash', level: 2 }, { id: 'related-topics', title: 'Related Topics', level: 2 },
  ] },
];
export const groups = [
  { title: 'Getting Started', entries: [{ title: 'Introduction', path: '/docs' }, { title: 'Installation', path: '/docs/getting-started/installation' }, { title: 'Initial Setup' }] },
  { title: 'User Guide', entries: [{ title: 'File Management', path: '/docs/user-guide/file-management' }, { title: 'Sharing Files' }, { title: 'Starred & Trash' }] },
  { title: 'Administrator Guide', entries: [{ title: 'Storage Nodes' }, { title: 'Users & Quotas' }] },
  { title: 'Deployment', entries: [{ title: 'Docker Deployment' }, { title: 'Reverse Proxy & HTTPS' }] },
  { title: 'Reference', entries: [{ title: 'Configuration' }, { title: 'Architecture' }] },
];
export function navigateDocs(path: string) {
  const sameUrl = window.location.pathname + window.location.hash === path;
  if (!sameUrl) window.history.pushState(null, '', path);
  if (sameUrl && path.includes('#')) document.getElementById(decodeURIComponent(path.split('#')[1]))?.scrollIntoView();
  else if (!path.includes('#') && window.location.pathname === path) window.scrollTo(0, 0);
  window.dispatchEvent(new Event('docs:navigate'));
}
