import { ArrowLeft, ArrowUpRight, Check, FileText, KeyRound, Link2, RotateCcw, ShieldCheck, Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Mode = 'internal' | 'public' | null;

export default function SharingDemo() {
  const [mode, setMode] = useState<Mode>(null);
  const [permission, setPermission] = useState<'Viewer' | 'Editor'>('Viewer');
  const [protectedLink, setProtectedLink] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(false);
  const first = useRef<HTMLButtonElement>(null);

  useEffect(() => { if (mode) first.current?.focus(); ScrollTrigger.refresh(); }, [mode, protectedLink]);
  useEffect(() => {
    if (!mode) return;
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setMode(null); };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [mode]);

  const reset = () => { setMode(null); setPermission('Viewer'); setProtectedLink(false); setPassword(''); setConfirmed(false); setError(false); };
  const confirm = () => {
    if (mode === 'public' && protectedLink && !password.trim()) { setError(true); return; }
    setError(false);
    setConfirmed(true);
  };

  return <div className={`share-demo mode-${mode ?? 'idle'}`}>
    <div className="demo-head"><span>SHARING CONTROL / SIMULATION</span><button onClick={reset}><RotateCcw size={14} /> RESET DEMO</button></div>
    <div className="share-canvas">
      <div className="share-path left-path"><span>INTERNAL<br />ACCESS</span><i /></div>
      <div className="share-file"><span className="share-file-mark" /><FileText size={32} strokeWidth={1.3} /><b>Field notes.txt</b><small>SELECTED FILE / SYNTHETIC</small></div>
      <div className="share-path right-path"><i /><span>PUBLIC<br />LINK</span></div>
    </div>
    <div className="share-options">
      <button className={mode === 'internal' ? 'active' : ''} aria-pressed={mode === 'internal'} onClick={() => { setMode('internal'); setConfirmed(false); setError(false); }}><Users size={22} /><span><b>Internal sharing</b><small>Registered users · Viewer / Editor</small></span><ArrowUpRight size={18} /></button>
      <button className={mode === 'public' ? 'active' : ''} aria-pressed={mode === 'public'} onClick={() => { setMode('public'); setConfirmed(false); setError(false); }}><Link2 size={22} /><span><b>Public link</b><small>Optional password protection</small></span><ArrowUpRight size={18} /></button>
    </div>
    {mode && <div className="share-panel" role="region" aria-label={`${mode} sharing settings`}>
      <div className="share-panel-top"><button ref={first} onClick={() => { setMode(null); setConfirmed(false); }}><ArrowLeft size={15} /> BACK</button><button onClick={() => setMode(null)} aria-label="Close sharing settings"><X size={18} /></button></div>
      <h3>{mode === 'internal' ? 'Choose access.' : 'Create a public link.'}</h3>
      {mode === 'internal' ? <>
        <p>Illustrate access for a registered user. Nothing is actually shared.</p>
        <div className="permission-picks" role="group" aria-label="Permission">{(['Viewer', 'Editor'] as const).map(p => <button key={p} className={permission === p ? 'active' : ''} aria-pressed={permission === p} onClick={() => { setPermission(p); setConfirmed(false); }}>{p}<small>{p === 'Viewer' ? 'Can view files' : 'Can edit files'}</small></button>)}</div>
      </> : <>
        <p>This demonstration does not create a working URL.</p>
        <label className="toggle-line"><span><KeyRound size={18} /> Password protection</span><input type="checkbox" checked={protectedLink} onChange={e => { setProtectedLink(e.target.checked); setError(false); setConfirmed(false); }} /></label>
        {protectedLink && <label className="password-field">EXAMPLE PASSWORD<input type="text" value={password} autoComplete="off" onChange={e => { setPassword(e.target.value); setError(false); }} placeholder="Enter a demo-only value" />{error && <span role="alert">Enter a demo value before continuing.</span>}</label>}
      </>}
      {confirmed ? <div className="share-success" role="status"><ShieldCheck size={20} /><span>{mode === 'internal' ? `${permission} access selected. No real invitation was sent.` : 'Public-link settings illustrated. No link was created.'}</span></div> : <button className="share-confirm" onClick={confirm}>SHOW SIMULATED RESULT <Check size={17} /></button>}
    </div>}
    <p className="demo-disclaimer">INTERACTIVE ILLUSTRATION · NO LIVE SHARING OR FILE OPERATIONS</p>
  </div>;
}
