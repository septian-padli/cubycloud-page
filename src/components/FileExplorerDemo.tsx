import { ArrowLeft, ChevronRight, FileImage, FileText, Folder, HardDrive, MoreHorizontal, RotateCcw, Search, Star, Trash2, Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Item = { name: string; type: 'folder' | 'text' | 'image' | 'unsupported'; detail: string; content?: string };
const data: Record<string, Item[]> = {
  root: [
    { name: 'Projects', type: 'folder', detail: '3 items' },
    { name: 'Team resources', type: 'folder', detail: 'Empty folder' },
    { name: 'Field notes.txt', type: 'text', detail: 'TEXT · 2 KB', content: 'FIELD NOTES / 01\n\nA better place for the files that matter.\n\nKeep your work organized on infrastructure you control.' },
    { name: 'Landscape.png', type: 'image', detail: 'IMAGE · 1.4 MB' },
    { name: 'Archive.zip', type: 'unsupported', detail: 'ARCHIVE · 3 MB' },
  ],
  Projects: [
    { name: 'Brand system', type: 'folder', detail: '1 item' },
    { name: 'Project brief.txt', type: 'text', detail: 'TEXT · 4 KB', content: 'PROJECT BRIEF\n\nBuild a clear place for the team to work.\n\nKeep files accessible, share what matters, and stay in control.' },
    { name: 'Reference.png', type: 'image', detail: 'IMAGE · 840 KB' },
  ],
  'Brand system': [{ name: 'Design notes.txt', type: 'text', detail: 'TEXT · 1 KB', content: 'DESIGN NOTES\n\nStructure first. Clarity always.\nA calm, recognizable system for your files.' }],
  'Team resources': [],
};
export default function FileExplorerDemo() {
  const [path, setPath] = useState<string[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [preview, setPreview] = useState<Item | null>(null);
  const [error, setError] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (preview) closeRef.current?.focus();
    else if (wasOpen.current) opener.current?.focus();
    wasOpen.current = !!preview;
  }, [preview]);
  useEffect(() => {
    if (!preview) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreview(null);
      if (e.key === 'Tab') { e.preventDefault(); closeRef.current?.focus(); }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [preview]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [path, selected, error]);
  const current = path.at(-1) ?? 'root';
  const reset = () => { setPath([]); setSelected(null); setPreview(null); setError(false); };
  const openPreview = (item: Item) => { if (item.type === 'unsupported') { setError(true); return; } setPreview(item); setError(false); };
  const enter = (item: Item, button: HTMLButtonElement) => {
    if (item.type === 'folder') { setPath([...path, item.name]); setSelected(null); setError(false); }
    else { opener.current = button; setSelected(item); setError(false); }
  };
  return <div className="explorer" aria-label="Interactive file explorer illustration">
    <div className="explorer-toolbar"><div className="explorer-logo"><span className="brand-mark mini"><i /><i /><i /></span>CubyCloud</div><span className="explorer-toolbar-right"><Search size={15} /><span className="explorer-avatar">CC</span></span></div>
    <div className="explorer-layout"><aside className="explorer-sidebar"><small>WORKSPACE</small><div className="sidebar-item active"><HardDrive size={16} />My Storage</div><div className="sidebar-item"><Users size={16} />Organization</div><small>LIBRARY</small><div className="sidebar-item"><Star size={16} />Starred</div><div className="sidebar-item"><Trash2 size={16} />Trash</div><div className="sidebar-foot">DEMO WORKSPACE<br />NO LIVE FILES</div></aside>
      <div className="explorer-main">
        <div className="explorer-breadcrumb"><button onClick={() => { setPath([]); setSelected(null); setError(false); }} aria-label="Go to My Storage">My Storage</button>{path.map((segment, index) => <span key={segment} className="crumb"><ChevronRight size={13} /><button onClick={() => { setPath(path.slice(0, index + 1)); setSelected(null); setError(false); }}>{segment}</button></span>)}</div>
        <div className="explorer-title"><div><small>YOUR FILES / ORGANIZED</small><h3>{current === 'root' ? 'My Storage' : current}</h3></div><MoreHorizontal size={22} /></div>
        <div className="explorer-list-head"><span>NAME</span><span>DETAILS</span></div>
        <span className="explorer-token-anchor" aria-hidden="true" />
        <div className="explorer-list">{data[current].length ? data[current].map(item => <button type="button" className={`file-row ${selected?.name === item.name ? 'selected' : ''}`} key={item.name} aria-pressed={item.type !== 'folder' ? selected?.name === item.name : undefined} onClick={e => enter(item, e.currentTarget)} onDoubleClick={e => { if (item.type !== 'folder') { opener.current = e.currentTarget; openPreview(item); } }}><span className="file-name"><span className={`file-icon ${item.type}`}>{item.type === 'folder' ? <Folder size={20} fill="currentColor" /> : item.type === 'image' ? <FileImage size={20} /> : <FileText size={20} />}</span>{item.name}</span><span className="file-detail">{item.detail}{item.type === 'folder' && <ChevronRight size={15} />}</span></button>) : <div className="empty-folder"><Folder size={32} strokeWidth={1.2} /><b>Nothing here yet.</b><span>This demo folder is empty. Go back to keep exploring.</span><button onClick={() => { setPath(path.slice(0, -1)); setSelected(null); }}><ArrowLeft size={14} /> GO BACK</button></div>}</div>
        {selected && <div className="file-action"><span>SELECTED / {selected.name}</span><button onClick={() => { opener.current = document.activeElement as HTMLButtonElement; openPreview(selected); }}>OPEN PREVIEW <ArrowLeft size={15} className="rotate-arrow" /></button></div>}
        {error && <div className="inline-error" role="alert">Preview unavailable for this archive. Choose a text or image file instead. <button onClick={() => setError(false)} aria-label="Dismiss error"><X size={15} /></button></div>}
        <div className="explorer-status"><span>{data[current].length} ITEMS · ILLUSTRATIVE DATA</span><button onClick={reset}><RotateCcw size={14} /> RESET DEMO</button></div>
      </div>
    </div>
    {preview && <div className="preview-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setPreview(null); }}><div className="preview-panel" role="dialog" aria-modal="true" aria-label={`Preview ${preview.name}`}><div className="preview-header"><span>FILE PREVIEW / {preview.name}</span><button ref={closeRef} onClick={() => setPreview(null)} aria-label="Close preview"><X size={20} /></button></div>{preview.type === 'text' ? <pre>{preview.content}</pre> : <div className="synthetic-image" role="img" aria-label="Abstract illustration of hills and sun"><span className="sun" /><span className="hill one" /><span className="hill two" /></div>}<span className="preview-caption">SYNTHETIC DEMO CONTENT · NO LIVE FILE OPERATIONS</span></div></div>}
  </div>;
}
