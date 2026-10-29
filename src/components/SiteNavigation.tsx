import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { chapters, links } from '../config';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return; const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, [open]);
  return <header className="site-header">
    <a href="#top" className="wordmark" aria-label="CubyCloud, back to top"><span className="brand-mark"><i /><i /><i /></span>CUBY<span>CLOUD</span><sup>®</sup></a>
    <span className="header-center">SELF-HOSTED FILE DRIVE <span className="header-separator">/</span> EST. IN YOUR SPACE</span>
    <div className="header-actions"><a className="header-github" href={links.github} target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={15} /></a><a className="header-cta" href="#get-started">GET STARTED <ArrowUpRight size={16} /></a><button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    <nav id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-label="Mobile navigation" inert={!open}>{chapters.map(c => <a key={c.id} href={`#${c.id}`} onClick={() => setOpen(false)}><small>{c.number}</small>{c.label}<ArrowDownRight size={18} /></a>)}<a href="#get-started" onClick={() => setOpen(false)}><small>→</small>Get started<ArrowUpRight size={18} /></a><a href={links.github} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}><small>↗</small>GitHub<ArrowUpRight size={18} /></a></nav>
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
  return <><nav className="chapter-nav" aria-label="Chapters"><div className="chapter-rail-label">SYSTEM INDEX <span> / 04</span></div><div className="chapter-rail"><span className="chapter-rail-progress" style={{ height: `${progress * 100}%` }} />{chapters.map(c => <a key={c.id} href={`#${c.id}`} className={active === c.id ? 'is-active' : ''} aria-current={active === c.id ? 'location' : undefined}><b>{c.number}</b><span>{c.label}</span></a>)}</div><a className="chapter-bottom" href="#get-started">START HERE ↗</a></nav><div className="mobile-progress" aria-label={`Current chapter: ${chapters.find(c => c.id === active)?.label ?? 'Files'}`}><span>{chapters.find(c => c.id === active)?.number ?? '01'} / 04</span><b>{chapters.find(c => c.id === active)?.label}</b><i><span style={{ width: `${progress * 100}%` }} /></i></div></>;
}
