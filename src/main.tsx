import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import DocsApp from './docs/DocsApp';
import './styles.css';
import './responsive.css';
import './cinematic.css';
import './finishing.css';
import './navbar.css';

createRoot(document.getElementById('root')!).render(<React.StrictMode>{location.pathname === '/docs' || location.pathname.startsWith('/docs/') ? <DocsApp /> : <App />}</React.StrictMode>);
