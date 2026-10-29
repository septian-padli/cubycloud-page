import { ArrowLeft, ArrowUpRight, Check, Database, HardDrive, RotateCcw } from 'lucide-react';
import { useState } from 'react';

type Target = 'local' | 's3' | null;

export default function StorageSelectorDemo() {
  const [target, setTarget] = useState<Target>(null);
  return <div className={`storage-demo target-${target ?? 'idle'}`}>
    <div className="demo-head"><span>STORAGE TOPOLOGY / CONCEPTUAL</span><button onClick={() => setTarget(null)}><RotateCcw size={14} /> RESET DEMO</button></div>
    <div className="topology" aria-label="Conceptual storage options">
      <div className="topology-source"><span className="topology-cross">+</span><span className="topology-source-icon">C<span>·</span></span><small>CUBYCLOUD<br />FILE DRIVE</small><span className="topology-file" aria-hidden="true" /></div>
      <div className="topology-trace"><span /></div>
      <div className="topology-targets">
        <button className={target === 'local' ? 'active' : ''} onClick={() => setTarget('local')} aria-pressed={target === 'local'}><span className="topology-node-index">01 / STORAGE NODE</span><HardDrive size={34} strokeWidth={1.3} /><b>LOCAL DISK</b><small>Filesystem managed on your server</small><ArrowUpRight className="node-arrow" size={18} /></button>
        <button className={target === 's3' ? 'active' : ''} onClick={() => setTarget('s3')} aria-pressed={target === 's3'}><span className="topology-node-index">02 / OPTIONAL NODE</span><Database size={34} strokeWidth={1.3} /><b>S3-COMPATIBLE</b><small>Object storage configured by an admin</small><ArrowUpRight className="node-arrow" size={18} /></button>
      </div>
    </div>
    <div className="topology-detail" aria-live="polite">{!target ? <><span className="detail-index">SELECT A NODE / 00</span><p>One focused file-drive experience. Choose a storage option above to inspect its conceptual configuration.</p></> : <><span className="detail-index"><Check size={14} /> SELECTED / {target === 'local' ? 'LOCAL FILESYSTEM' : 'S3-COMPATIBLE'}</span><p>{target === 'local' ? 'Files live on a filesystem managed by your server operator. Storage capacity, backups, and access remain your responsibility.' : 'An administrator can configure optional S3-compatible object storage. This is a configuration illustration, not a connection test, migration, or replication.'}</p><button onClick={() => setTarget(null)}><ArrowLeft size={14} /> BACK TO OVERVIEW</button></>}</div>
    <p className="demo-disclaimer">INTERACTIVE ILLUSTRATION · NO LIVE STORAGE CONNECTION</p>
  </div>;
}
