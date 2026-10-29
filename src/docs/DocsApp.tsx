import { ArrowLeft, ArrowUpRight, Check, ChevronDown, Menu, Monitor, Moon, Search, Sun, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { links } from '../config';
import DocsLink from './DocsLink';
import DocsSearch from './DocsSearch';
import { ArticleNavigation } from './ArticleUI';
import { FileManagement, Installation, Introduction } from './Articles';
import { articles, groups } from './content';
import type { Article } from './content';
import './docs.css';

type Preference = 'light' | 'dark' | 'system';
const storedPreference = (): Preference => {
  try {
    const value = localStorage.getItem('cubycloud-docs-theme');
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch { return 'system'; }
};

function useDocsLocation() {
  const [url, setUrl] = useState(() => location.pathname + location.hash);
  useEffect(() => {
    const update = () => setUrl(location.pathname + location.hash);
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    window.addEventListener('docs:navigate', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
      window.removeEventListener('docs:navigate', update);
    };
  }, []);
  return url;
}

function DocsSidebar({ article, close, expanded, setExpanded, prefix }: { article: Article; close: () => void; expanded: string[]; setExpanded: Dispatch<SetStateAction<string[]>>; prefix: string }) {
  return <nav className="docs-sidebar-nav" aria-label="Documentation pages">
    <span className="docs-nav-eyebrow">DOCUMENTATION / INDEX</span>
    {groups.map((group, index) => <div className="docs-nav-group" key={group.title}>
      <button type="button" className="docs-group-trigger" aria-controls={`${prefix}-group-${index}`} aria-expanded={expanded.includes(group.title)} onClick={() => setExpanded(current => current.includes(group.title) ? current.filter(item => item !== group.title) : [...current, group.title])}>{group.title}<ChevronDown size={15} /></button>
      <div id={`${prefix}-group-${index}`} className="docs-group-items" hidden={!expanded.includes(group.title)}>{group.entries.map(entry => entry.path
        ? <DocsLink key={entry.title} href={entry.path} aria-current={entry.path === article.path ? 'page' : undefined} className={entry.path === article.path ? 'active' : ''} onClick={close}>{entry.title}</DocsLink>
        : <span key={entry.title} className="docs-coming">{entry.title}<small>SOON</small></span>)}</div>
    </div>)}
    <div className="docs-sidebar-foot">BUILT IN THE OPEN.<br />RUN ON YOUR TERMS.</div>
  </nav>;
}

function DocsToc({ article, active, select }: { article: Article; active: string; select: () => void }) {
  return <nav aria-label="On this page" className="docs-toc-nav">{article.headings.map(heading => <a href={`#${heading.id}`} key={heading.id} className={`${heading.level === 3 ? 'nested' : ''} ${active === heading.id ? 'active' : ''}`} aria-current={active === heading.id ? 'location' : undefined} onClick={select}>{heading.title}</a>)}</nav>;
}

export default function DocsApp() {
  const url = useDocsLocation();
  const pathname = url.split('#')[0].replace(/\/$/, '') || '/docs';
  const article = articles.find(item => item.path === pathname) ?? articles[0];
  const [preference, setPreference] = useState<Preference>(storedPreference);
  const [systemDark, setSystemDark] = useState(() => matchMedia('(prefers-color-scheme: dark)').matches);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(() => [article.category]);
  const [active, setActive] = useState(article.headings[0].id);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const searchReturn = useRef<HTMLElement | null>(null);
  const previousUrl = useRef(url);
  const theme = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;
  useEffect(() => {
    setExpanded(current => current.includes(article.category) ? current : [...current, article.category]);
  }, [article.path, article.category]);
  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    requestAnimationFrame(() => searchReturn.current?.focus({ preventScroll: true }));
  }, []);
  const closeDrawerAfterNavigation = () => {
    setDrawerOpen(false);
    requestAnimationFrame(() => document.querySelector<HTMLElement>('.docs-article-intro h1')?.focus({ preventScroll: true }));
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    requestAnimationFrame(() => menuTrigger.current?.focus({ preventScroll: true }));
  };
  const openSearch = useCallback(() => {
    if (!searchOpen) searchReturn.current = document.activeElement as HTMLElement;
    setDrawerOpen(false);
    setSearchOpen(true);
  }, [searchOpen]);

  useEffect(() => {
    const background = document.querySelectorAll<HTMLElement>('.docs-header, .docs-layout');
    background.forEach(node => { node.inert = drawerOpen || searchOpen; });
    const previousOverflow = document.body.style.overflow;
    if (drawerOpen || searchOpen) document.body.style.overflow = 'hidden';
    return () => {
      background.forEach(node => { node.inert = false; });
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen, searchOpen]);
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemDark(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const media = matchMedia('(max-width: 880px)');
    const update = () => { if (!media.matches) setDrawerOpen(false); };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    try { localStorage.setItem('cubycloud-docs-theme', preference); } catch { /* storage unavailable */ }
  }, [preference]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [openSearch]);
  useEffect(() => {
    if (!drawerOpen) return;
    drawer.current?.querySelector<HTMLElement>('button')?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDrawer();
      if (event.key !== 'Tab' || !drawer.current) return;
      const nodes = drawer.current.querySelectorAll<HTMLElement>('button, a[href]');
      if (!nodes.length) return;
      if (event.shiftKey && document.activeElement === nodes[0]) { event.preventDefault(); nodes[nodes.length - 1].focus(); }
      else if (!event.shiftKey && document.activeElement === nodes[nodes.length - 1]) { event.preventDefault(); nodes[0].focus(); }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [drawerOpen]);
  useEffect(() => {
    if (pathname !== article.path) {
      history.replaceState(null, '', article.path);
      return;
    }
    const frame = requestAnimationFrame(() => {
      const hash = decodeURIComponent(location.hash.slice(1));
      if (hash && document.getElementById(hash)) document.getElementById(hash)?.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    setActive(article.headings[0].id);
    setMobileTocOpen(false);
    return () => cancelAnimationFrame(frame);
  }, [article, pathname]);
  useEffect(() => {
    if (previousUrl.current === url) return;
    const previousPath = previousUrl.current.split('#')[0];
    previousUrl.current = url;
    if (previousPath !== url.split('#')[0]) return;
    const hash = decodeURIComponent(url.split('#')[1] ?? '');
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash)?.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [url]);
  useEffect(() => {
    const headings = article.headings.map(heading => document.getElementById(heading.id)).filter((node): node is HTMLElement => !!node);
    if (!headings.length) return;
    const update = () => {
      const current = [...headings].reverse().find(node => node.getBoundingClientRect().top <= 175) ?? headings[0];
      setActive(previous => previous === current.id ? previous : current.id);
    };
    const observer = new IntersectionObserver(update, { rootMargin: '-90px 0px -65% 0px' });
    headings.forEach(node => observer.observe(node));
    update();
    return () => observer.disconnect();
  }, [article]);

  useEffect(() => {
    document.title = `${article.title} — CubyCloud Documentation`;
  }, [article]);

  const articleBody = article.path === '/docs' ? <Introduction /> : article.path === '/docs/getting-started/installation' ? <Installation /> : <FileManagement />;
  return <div className="docs-root" data-theme={theme}>
    <a className="docs-skip" href="#docs-article">Skip to article</a>
    <header className="docs-header"><div className="docs-header-inner">
      <button ref={menuTrigger} className="docs-menu-trigger docs-icon-button" type="button" onClick={() => setDrawerOpen(true)} aria-label="Open documentation menu" aria-expanded={drawerOpen}><Menu size={21} /></button>
      <DocsLink href="/docs" className="docs-logo" aria-label="CubyCloud documentation home"><span className="brand-mark docs-brand-mark" aria-hidden="true"><i /><i /><i /></span>CUBY<span>CLOUD</span></DocsLink>
      <span className="docs-header-label">/ DOCS <small>PROTOTYPE</small></span>
      <div className="docs-header-tools">
        <DocsLink href="/" className="docs-back-link">WEBSITE <ArrowUpRight size={14} /></DocsLink>
        <button type="button" className="docs-search-trigger" onClick={openSearch} aria-label="Search documentation"><Search size={17} /><span>Search documentation</span><kbd>⌘ K</kbd></button>
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
        <div className="docs-article-intro"><span className="docs-article-label">CUBYCLOUD / {article.category.toUpperCase()}</span><h1 tabIndex={-1}>{article.title}</h1><p>{article.summary}</p></div>
        <div className="docs-mobile-toc"><button type="button" aria-expanded={mobileTocOpen} onClick={() => setMobileTocOpen(!mobileTocOpen)}>ON THIS PAGE <span>{article.headings.find(heading => heading.id === active)?.title}</span><ChevronDown size={16} /></button>{mobileTocOpen && <DocsToc article={article} active={active} select={() => setMobileTocOpen(false)} />}</div>
        <article key={article.path} className="docs-article">{articleBody}</article>
        <ArticleNavigation article={article} />
        <footer className="docs-footer">CUBYCLOUD / DOCUMENTATION DESIGN PROTOTYPE <span>NOT THE VERIFIED DEPLOYMENT GUIDE</span></footer>
      </main>
      <aside className="docs-right"><div className="docs-right-sticky"><span>ON THIS PAGE</span><DocsToc article={article} active={active} select={() => {}} /><div className="docs-right-foot"><Check size={13} /> ARTICLE {articles.indexOf(article) + 1} / {articles.length}</div></div></aside>
    </div>
    {drawerOpen && <div className="docs-drawer-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) closeDrawer(); }}><div ref={drawer} className="docs-drawer" role="dialog" aria-modal="true" aria-label="Documentation navigation"><div className="docs-drawer-head"><strong>DOCUMENTATION</strong><button type="button" aria-label="Close documentation menu" onClick={closeDrawer}><X size={20} /></button></div><DocsSidebar article={article} close={closeDrawerAfterNavigation} expanded={expanded} setExpanded={setExpanded} prefix="mobile" /><a href={links.github} target="_blank" rel="noopener noreferrer" className="docs-drawer-home">GitHub <ArrowUpRight size={16} /></a><DocsLink href="/" className="docs-drawer-home" onClick={() => setDrawerOpen(false)}><ArrowLeft size={16} /> Back to website</DocsLink></div></div>}
    <DocsSearch open={searchOpen} close={closeSearch} />
  </div>;
}
