import { ArrowUpRight, Check, ChevronDown, Monitor, Moon, Search, Sun, X, Menu } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { articles, groups, navigateDocs, type Article } from './content';
import { Introduction, Installation, FileManagement } from './Articles';
import { links } from '../config';
import './docs.css';

type Theme = 'light' | 'dark' | 'system';

const useDocsLocation = () => useSyncExternalStore(
  callback => {
    window.addEventListener('popstate', callback);
    window.addEventListener('docs:navigate', callback);
    return () => {
      window.removeEventListener('popstate', callback);
      window.removeEventListener('docs:navigate', callback);
    };
  },
  () => window.location.pathname + window.location.hash
);

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  try {
    const value = localStorage.getItem('cubycloud-docs-theme');
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch { return 'system'; }
};

export default function DocsApp() {
  const url = useDocsLocation();
  const pathname = url.split('#')[0].replace(/\/$/, '') || '/docs';
  const article = articles.find(item => item.path === pathname) ?? articles[0];
  const [active] = useState(article.headings[0]?.id ?? '');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'Getting Started': true,
    'User Guide': true,
    'Administrator Guide': false,
    'Deployment': false,
    'Reference': false,
  });
  const [preference, setPreference] = useState<Theme>(getStoredTheme);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const drawer = useRef<HTMLDivElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sync = () => {
      if (preference === 'system') {
        const matches = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(matches ? 'dark' : 'light');
      } else {
        setTheme(preference);
      }
    };
    sync();
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [preference]);

  useEffect(() => {
    try { localStorage.setItem('cubycloud-docs-theme', preference); } catch { /* storage unavailable */ }
  }, [preference]);

  useEffect(() => {
    document.title = `${article.title} — CubyCrate Documentation`;
  }, [article]);

  const articleBody = article.path === '/docs' ? <Introduction /> : article.path === '/docs/getting-started/installation' ? <Installation /> : <FileManagement />;

  return <div className="docs-root" data-theme={theme}>
    <a className="docs-skip" href="#docs-article">Skip to article</a>
    <header className="docs-header"><div className="docs-header-inner">
      <button ref={menuTrigger} className="docs-menu-trigger docs-icon-button" type="button" onClick={() => setDrawerOpen(true)} aria-label="Open documentation menu" aria-expanded={drawerOpen}><Menu size={21} /></button>
      <DocsLink href="/docs" className="docs-logo" aria-label="CubyCrate documentation home">
        <img src={theme === 'dark' ? '/logos/horizontal/default/cubycrate-horizontal-white.webp' : '/logos/horizontal/default/cubycrate-horizontal-color.webp'} alt="CubyCrate" width="78" height="24" style={{ height: '24px', width: 'auto', display: 'block' }} />
      </DocsLink>
      <span className="docs-header-label">/ DOCS <small>PROTOTYPE</small></span>
      <div className="docs-header-tools">
        <DocsLink href="/" className="docs-back-link">WEBSITE <ArrowUpRight size={14} /></DocsLink>
        <button type="button" className="docs-search-trigger" onClick={() => setSearchOpen(true)} aria-label="Search documentation"><Search size={17} /><span>Search documentation</span><kbd>⌘ K</kbd></button>
        <div className="docs-theme" role="group" aria-label="Documentation color theme">
          <button type="button" onClick={() => setPreference('light')} aria-label="Light theme" aria-pressed={preference === 'light'} title="Light"><Sun size={16} /></button>
          <button type="button" onClick={() => setPreference('dark')} aria-label="Dark theme" aria-pressed={preference === 'dark'} title="Dark"><Moon size={16} /></button>
          <button type="button" onClick={() => setPreference('system')} aria-label="System theme" aria-pressed={preference === 'system'} title="System"><Monitor size={16} /></button>
        </div>
        <a className="docs-github" href={links.github} target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={15} /></a>
      </div>
    </div></header>
    <div className="docs-layout">
      <aside className="docs-left"><DocsSidebar article={article} close={() => setDrawerOpen(false)} expanded={expanded} setExpanded={setExpanded} prefix="desktop" /></aside>
      <main id="docs-article" className="docs-main">
        <nav className="docs-breadcrumb" aria-label="Breadcrumb"><DocsLink href="/docs">Docs</DocsLink><span>/</span><span>{article.category}</span><span>/</span><strong>{article.title}</strong></nav>
        <div className="docs-article-intro"><span className="docs-article-label">CUBYCRATE / {article.category.toUpperCase()}</span><h1 tabIndex={-1}>{article.title}</h1><p>{article.summary}</p></div>
        <div className="docs-mobile-toc"><button type="button" aria-expanded={mobileTocOpen} onClick={() => setMobileTocOpen(!mobileTocOpen)}>ON THIS PAGE <span>{article.headings.find(heading => heading.id === active)?.title}</span><ChevronDown size={16} /></button>{mobileTocOpen && <DocsToc article={article} active={active} select={() => setMobileTocOpen(false)} />}</div>
        <article key={article.path} className="docs-article">{articleBody}</article>
        <ArticleNavigation article={article} />
        <footer className="docs-footer">CUBYCRATE / DOCUMENTATION DESIGN PROTOTYPE <span>NOT THE VERIFIED DEPLOYMENT GUIDE</span></footer>
      </main>
      <aside className="docs-right"><div className="docs-right-sticky"><span>ON THIS PAGE</span><DocsToc article={article} active={active} select={() => {}} /><div className="docs-right-foot"><Check size={13} /> ARTICLE {articles.indexOf(article) + 1} / {articles.length}</div></div></aside>
    </div>
    {drawerOpen && <div className="docs-drawer-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) setDrawerOpen(false); }}><div ref={drawer} className="docs-drawer" role="dialog" aria-modal="true" aria-label="Documentation navigation"><div className="docs-drawer-head"><strong>DOCUMENTATION</strong><button type="button" aria-label="Close documentation menu" onClick={() => setDrawerOpen(false)}><X size={20} /></button></div><DocsSidebar article={article} close={() => setDrawerOpen(false)} expanded={expanded} setExpanded={setExpanded} prefix="mobile" /><a href={links.github} target="_blank" rel="noopener noreferrer" className="docs-drawer-home">GitHub <ArrowUpRight size={16} /></a><DocsLink href="/" className="docs-drawer-home" onClick={() => setDrawerOpen(false)}>Website <ArrowUpRight size={16} /></DocsLink></div></div>}
    <DocsSearch open={searchOpen} close={() => setSearchOpen(false)} />
  </div>;
}

function DocsSidebar({ article, close, expanded, setExpanded, prefix }: { article: Article; close: () => void; expanded: Record<string, boolean>; setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>; prefix: string }) {
  return <nav className="docs-sidebar-nav" aria-label="Documentation navigation">{groups.map(group => {
    const isExpanded = expanded[group.title] ?? true;
    const contentId = `${prefix}-docs-group-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    return <div key={group.title} className="docs-group">
      <button type="button" className="docs-group-trigger" onClick={() => setExpanded(prev => ({ ...prev, [group.title]: !prev[group.title] }))} aria-expanded={isExpanded} aria-controls={contentId}><span>{group.title}</span><ChevronDown size={15} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform .18s ease' }} /></button>
      <div id={contentId} className="docs-group-items" hidden={!isExpanded}>{group.entries.map(entry => {
        if (!entry.path) return <span key={entry.title} className="docs-item is-placeholder"><span>{entry.title}</span><small>DRAFT</small></span>;
        const active = entry.path === article.path;
        return <DocsLink key={entry.path} href={entry.path} className={`docs-item ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined} onClick={close}><span>{entry.title}</span></DocsLink>;
      })}</div>
    </div>;
  })}</nav>;
}

function DocsToc({ article, active, select }: { article: Article; active: string; select: (id: string) => void }) {
  return <ul className="docs-toc">{article.headings.map(h => <li key={h.id} className={`toc-level-${h.level} ${active === h.id ? 'is-active' : ''}`}><a href={`#${h.id}`} onClick={() => select(h.id)}>{h.title}</a></li>)}</ul>;
}

function ArticleNavigation({ article }: { article: Article }) {
  const index = articles.findIndex(a => a.path === article.path);
  const prev = index > 0 ? articles[index - 1] : null;
  const next = index < articles.length - 1 ? articles[index + 1] : null;
  return <div className="docs-prev-next">
    {prev ? <DocsLink href={prev.path} className="docs-previous"><small>PREVIOUS</small><strong>← {prev.title}</strong></DocsLink> : <span />}
    {next ? <DocsLink href={next.path} className="docs-next"><small>NEXT</small><strong>{next.title} →</strong></DocsLink> : <span />}
  </div>;
}

function DocsSearch({ open, close }: { open: boolean; close: () => void }) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open, close]);
  if (!open) return null;
  const results = query ? articles.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.summary.toLowerCase().includes(query.toLowerCase())) : [];
  return <div className="docs-search-backdrop" onClick={e => { if (e.target === e.currentTarget) close(); }}><div className="docs-search-dialog" role="dialog" aria-modal="true" aria-label="Search documentation"><div className="docs-search-input"><Search size={18} /><input autoFocus type="search" placeholder="Search documentation..." value={query} onChange={e => setQuery(e.target.value)} /><button onClick={close} aria-label="Close search"><X size={18} /></button></div><div className="docs-search-results">{results.map(r => <button key={r.path} onClick={() => { navigateDocs(r.path); close(); }}><strong>{r.title}</strong><small>{r.summary}</small></button>)}</div></div></div>;
}

function DocsLink({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={href} onClick={e => {
    if (href.startsWith('http') || href.startsWith('#')) return;
    e.preventDefault();
    navigateDocs(href);
    props.onClick?.(e);
  }} {...props}>{children}</a>;
}
