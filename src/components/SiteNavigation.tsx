import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { chapters, links } from '../config';
import { trackEvent } from '../analytics/dataLayer';
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const outside = (e: PointerEvent) => { if (!header.current?.contains(e.target as Node)) setOpen(false); };
    window.addEventListener('keydown', escape);
    window.addEventListener('pointerdown', outside);
    return () => { window.removeEventListener('keydown', escape); window.removeEventListener('pointerdown', outside); };
  }, [open]);
  return <header ref={header} className="site-header editorial-header">
    <a href="#top" className="wordmark" aria-label="CubyCrate, back to top" onClick={() => { setOpen(false); trackEvent({ name: 'navigation_click', payload: { navigation_location: 'header', target_section: 'top' } }); }}>
      <img src="/logos/horizontal/default/cubycrate-horizontal-white.webp" alt="CubyCrate" width="105" height="32" style={{ height: '32px', width: 'auto', display: 'block' }} />
    </a>
    <nav className="editorial-links" aria-label="Main navigation">
      <a href="#files" onClick={() => trackEvent({ name: 'navigation_click', payload: { navigation_location: 'header', target_section: 'files' } })}>EXPLORE <ArrowDownRight size={14} /></a>
      <a href="/docs/" onClick={() => trackEvent({ name: 'navigation_click', payload: { navigation_location: 'header', target_section: 'docs' } })}>DOCUMENTATION</a>
      <a href={links.github} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent({ name: 'cta_click', payload: { cta_name: 'github_source', cta_location: 'header', destination: links.github } })}>GITHUB <ArrowUpRight size={14} /></a>
    </nav>
    <div className="header-actions">
      <a className="header-cta" href="#get-started" onClick={() => { setOpen(false); trackEvent({ name: 'cta_click', payload: { cta_name: 'get_started', cta_location: 'header', destination: '#get-started' } }); }}>GET STARTED <ArrowUpRight size={16} /></a>
      <button ref={toggle} className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <nav id="mobile-menu" className={`mobile-menu editorial-mobile ${open ? 'is-open' : ''}`} aria-label="Mobile navigation" inert={!open}>
      <a href="#files" onClick={() => { setOpen(false); trackEvent({ name: 'navigation_click', payload: { navigation_location: 'mobile_menu', target_section: 'files' } }); }}><small>01</small>Explore<ArrowDownRight size={18} /></a>
      <a href="/docs/" onClick={() => { setOpen(false); trackEvent({ name: 'navigation_click', payload: { navigation_location: 'mobile_menu', target_section: 'docs' } }); }}><small>02</small>Documentation<ArrowUpRight size={18} /></a>
      <a href={links.github} target="_blank" rel="noopener noreferrer" onClick={() => { setOpen(false); trackEvent({ name: 'cta_click', payload: { cta_name: 'github_source', cta_location: 'mobile_menu', destination: links.github } }); }}><small>03</small>GitHub<ArrowUpRight size={18} /></a>
      <a href="#get-started" onClick={() => { setOpen(false); trackEvent({ name: 'cta_click', payload: { cta_name: 'get_started', cta_location: 'mobile_menu', destination: '#get-started' } }); }}><small>→</small>Get started<ArrowUpRight size={18} /></a>
    </nav>
  </header>;
}

export function ChapterNavigation() {
  const [active, setActive] = useState('files');
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const end = document.documentElement.scrollHeight - innerHeight;
      setProgress(end > 0 ? scrollY / end : 0);
      const visible = [...chapters].reverse().find(c => document.getElementById(c.id)!.getBoundingClientRect().top <= innerHeight * .48);
      setActive(visible?.id ?? 'files');
    };
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <><nav className="chapter-nav" aria-label="Chapters"><div className="chapter-rail-label">SYSTEM INDEX <span> / 04</span></div><div className="chapter-rail"><span className="chapter-rail-progress" style={{ height: `${progress * 100}%` }} />{chapters.map(c => <a key={c.id} href={`#${c.id}`} className={active === c.id ? 'is-active' : ''} aria-current={active === c.id ? 'location' : undefined} onClick={() => trackEvent({ name: 'navigation_click', payload: { navigation_location: 'chapter_nav', target_section: c.id } })}><b>{c.number}</b><span>{c.label}</span></a>)}</div><a className="chapter-bottom" href="#get-started" onClick={() => trackEvent({ name: 'cta_click', payload: { cta_name: 'start_here', cta_location: 'chapter_nav', destination: '#get-started' } })}>START HERE ↗</a></nav><div className="mobile-progress" aria-label={`Current chapter: ${chapters.find(c => c.id === active)?.label ?? 'Files'}`}><span>{chapters.find(c => c.id === active)?.number ?? '01'} / 04</span><b>{chapters.find(c => c.id === active)?.label}</b></div></>;
}
