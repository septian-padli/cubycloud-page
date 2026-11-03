import { Check, ChevronRight, Clipboard, Info, Lightbulb, AlertTriangle, CircleAlert, Link as LinkIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import type { ReactNode, KeyboardEvent } from 'react';
import DocsLink from './DocsLink';
import { articles } from './content';
import type { Article, Heading } from './content';

export function SectionHeading({ heading }: { heading: Heading }) {
  const [copied, setCopied] = useState(false);
  const Tag = heading.level === 2 ? 'h2' : 'h3';
  const copy = async () => {
    try { await navigator.clipboard.writeText(`${location.origin}${location.pathname}#${heading.id}`); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { setCopied(false); }
  };
  return <Tag id={heading.id} className="docs-section-heading"><a href={`#${heading.id}`}>{heading.title}</a><button type="button" onClick={copy} aria-label={`Copy link to ${heading.title}`} title={copied ? 'Copied' : 'Copy heading link'}>{copied ? <Check size={15} /> : <LinkIcon size={15} />}</button></Tag>;
}
export function Callout({ kind, title, children }: { kind: 'note' | 'tip' | 'important' | 'warning'; title: string; children: ReactNode }) {
  const Icon = { note: Info, tip: Lightbulb, important: CircleAlert, warning: AlertTriangle }[kind];
  return <aside className={`docs-callout ${kind}`}><div><Icon size={17} /><strong>{title}</strong></div><p>{children}</p></aside>;
}
export function CodeBlock({ code, language = 'terminal', filename }: { code: string; language?: string; filename?: string }) {
  const [status, setStatus] = useState('Copy code');
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setStatus('Copied'); }
    catch { setStatus('Copy unavailable'); }
    setTimeout(() => setStatus('Copy code'), 2200);
  };
  return <div className="docs-code"><div className="docs-code-head"><span>{filename ?? language}</span><button type="button" onClick={copy} aria-label={status}><Clipboard size={14} />{status}</button></div><pre><code>{code.split('\n').map((line, index) => <span key={index} className={line.trim().startsWith('#') ? 'code-comment' : ''}>{index > 0 ? '\n' : ''}{line}</span>)}</code></pre></div>;
}
export function CodeTabs({ tabs }: { tabs: { label: string; code: string; language: string }[] }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next); buttons.current[next]?.focus();
  };
  return <div className="docs-tabs"><div role="tablist" aria-label="Example format" className="docs-tab-list">{tabs.map((tab, index) => <button key={tab.label} ref={node => { buttons.current[index] = node; }} id={`example-tab-${index}`} role="tab" aria-selected={active === index} aria-controls="example-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={e => onKey(e, index)}>{tab.label}</button>)}</div><div role="tabpanel" id="example-panel" aria-labelledby={`example-tab-${active}`}><CodeBlock code={tabs[active].code} language={tabs[active].language} /></div></div>;
}
export function Steps({ children }: { children: ReactNode }) { return <ol className="docs-steps">{children}</ol>; }
export function Step({ title, children }: { title: string; children: ReactNode }) { return <li><strong>{title}</strong><div>{children}</div></li>; }
export function ArticleNavigation({ article }: { article: Article }) {
  const index = articles.findIndex(item => item.path === article.path);
  return <nav className="docs-prev-next" aria-label="Article navigation">{index > 0 && <DocsLink className="docs-previous" href={articles[index - 1].path}><small>← PREVIOUS</small><strong>{articles[index - 1].title}</strong></DocsLink>}{index < articles.length - 1 && <DocsLink className="docs-next" href={articles[index + 1].path}><small>NEXT →</small><strong>{articles[index + 1].title} <ChevronRight size={17} /></strong></DocsLink>}</nav>;
}
