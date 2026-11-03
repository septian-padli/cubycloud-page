import { ArrowRight, FileText, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { articles, navigateDocs } from './content';

type Result = { path: string; title: string; category: string; heading?: string; detail: string };
const index: Result[] = articles.flatMap(article => [
  { path: article.path, title: article.title, category: article.category, detail: `${article.summary} ${article.keywords}` },
  ...article.headings.map(heading => ({ path: `${article.path}#${heading.id}`, title: article.title, category: article.category, heading: heading.title, detail: heading.title })),
]);
export default function DocsSearch({ open, close }: { open: boolean; close: () => void }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return index.filter(result => !result.heading);
    return index.filter(result => terms.every(term => `${result.title} ${result.category} ${result.detail}`.toLowerCase().includes(term))).slice(0, 12);
  }, [query]);
  useEffect(() => { setQuery(''); setSelected(0); if (open) requestAnimationFrame(() => input.current?.focus()); }, [open]);
  useEffect(() => { setSelected(0); }, [query]);
  useEffect(() => {
    if (open) dialog.current?.querySelectorAll<HTMLElement>('[role="option"]')[selected]?.scrollIntoView({ block: 'nearest' });
  }, [open, selected]);
  useEffect(() => {
    if (!open) return;
    const key = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key !== 'Tab') return;
      const focusable = dialog.current?.querySelectorAll<HTMLElement>('button, input');
      if (!focusable?.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [open, close]);
  if (!open) return null;
  const choose = (result: Result) => { close(); navigateDocs(result.path); };
  const onKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setSelected((selected + 1) % Math.max(results.length, 1)); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setSelected((selected - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1)); }
    if (event.key === 'Enter' && results[selected]) { event.preventDefault(); choose(results[selected]); }
  };
  return <div className="docs-search-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) close(); }}><div ref={dialog} className="docs-search-dialog" role="dialog" aria-modal="true" aria-label="Search documentation"><div className="docs-search-input"><Search size={21} /><input ref={input} role="combobox" aria-autocomplete="list" aria-expanded="true" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={onKey} placeholder="Search documentation…" aria-label="Search documentation" aria-controls="docs-search-results" aria-activedescendant={results[selected] ? `docs-search-result-${selected}` : undefined} /><button type="button" onClick={close} aria-label="Close search"><X size={20} /></button></div><div id="docs-search-results" className="docs-search-results" role="listbox" aria-label="Search results">{results.length ? results.map((result, index) => <button type="button" role="option" aria-selected={index === selected} id={`docs-search-result-${index}`} className={selected === index ? 'selected' : ''} key={result.path} onMouseEnter={() => setSelected(index)} onClick={() => choose(result)}><FileText size={18} /><span><small>{result.category} / {result.title}</small><strong>{result.heading ?? result.title}</strong>{!result.heading && <em>{articles.find(article => article.path === result.path)?.summary}</em>}</span><ArrowRight size={16} /></button>) : <div className="docs-search-empty"><strong>No matching pages or headings</strong><span>Try “storage”, “installation”, or “preview”.</span></div>}</div><div className="docs-search-footer"><span>↑ ↓ SELECT</span><span>↵ OPEN</span><span>ESC CLOSE</span></div></div></div>;
}
