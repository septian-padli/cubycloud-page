import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import * as THREE from 'three';
import type { MotionTier } from '../hooks/useMotion';

const forest = '#27331f';
const shell = '#37432b';
const dark = '#171e16';
const edge = '#9aab60';
const sand = '#dda15e';

type Props = { progress: RefObject<number>; tier: MotionTier };

function FrameRails({ z, color = edge }: { z: number; color?: string }) {
  return <group position={[0, 0, z]}>
    {[-1, 1].map(x => <mesh key={`v${x}`} position={[x * 1.65, 0, 0]}><boxGeometry args={[0.045, 3.35, 0.08]} /><meshStandardMaterial color={color} metalness={0.7} roughness={0.35} /></mesh>)}
    {[-1, 1].map(y => <mesh key={`h${y}`} position={[0, y * 1.66, 0]}><boxGeometry args={[3.35, 0.045, 0.08]} /><meshStandardMaterial color={color} metalness={0.7} roughness={0.35} /></mesh>)}
  </group>;
}

function Core({ progress, tier }: Props) {
  const root = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const upper = useRef<THREE.Group>(null);
  const lower = useRef<THREE.Group>(null);
  const token = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (tier !== 'full') return;
    const move = (e: PointerEvent) => { pointer.current.x = (e.clientX / window.innerWidth - .5) * .28; pointer.current.y = (e.clientY / window.innerHeight - .5) * .18; };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [tier]);
  useFrame(({ clock }, delta) => {
    if (!root.current || !left.current || !right.current || !upper.current || !lower.current || !token.current) return;
    const p = tier === 'reduced' ? 0 : progress.current;
    const open = THREE.MathUtils.smoothstep(p, .12, .76);
    const extract = THREE.MathUtils.smoothstep(p, .42, .99);
    const ambient = tier === 'full' ? Math.sin(clock.elapsedTime * .35) * .035 : 0;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -.48 + p * .75 + pointer.current.x + ambient, 3, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -.18 + p * .22 + pointer.current.y, 3, delta);
    root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, -.08 - p * .12, 3, delta);
    root.current.scale.setScalar(1 + open * .08);
    left.current.position.x = -open * .78;
    right.current.position.x = open * .78;
    upper.current.position.y = open * .65;
    lower.current.position.y = -open * .65;
    token.current.position.set(extract * 1.5, extract * -.68, 1.12 + extract * 2.15);
    token.current.scale.setScalar((1 + extract * .55) * (1 - THREE.MathUtils.smoothstep(p, .65, .94)));
    token.current.rotation.z = extract * -.26;
  });
  return <group ref={root} rotation={[-.18, -.48, -.08]}>
    <mesh position={[0, 0, -.85]} castShadow receiveShadow><boxGeometry args={[3.35, 3.32, 1.85]} /><meshStandardMaterial color={dark} metalness={.48} roughness={.5} /></mesh>
    <FrameRails z={-1.83} color={forest} />
    <group ref={left}>
      <mesh position={[-.95, 0, .08]} castShadow><boxGeometry args={[1.45, 3.12, 1.95]} /><meshStandardMaterial color={shell} metalness={.57} roughness={.4} /></mesh>
      {[-1.02, -.48, .06, .6, 1.14].map((y, i) => <group key={y} position={[-.95, y, 1.08]}>
        <mesh><boxGeometry args={[1.26, .39, .08]} /><meshStandardMaterial color={i === 2 ? forest : dark} metalness={.5} roughness={.45} /></mesh>
        <mesh position={[-.39, 0, .049]}><boxGeometry args={[.27, .018, .012]} /><meshBasicMaterial color={i === 2 ? sand : edge} /></mesh>
        <mesh position={[.43, 0, .05]}><boxGeometry args={[.055, .055, .014]} /><meshBasicMaterial color={edge} /></mesh>
      </group>)}
    </group>
    <group ref={right}>
      <mesh position={[.95, 0, .08]} castShadow><boxGeometry args={[1.45, 3.12, 1.95]} /><meshStandardMaterial color={forest} metalness={.5} roughness={.42} /></mesh>
      {[-1.1, -.56, -.02, .52, 1.06].map((y, i) => <group key={y} position={[.95, y, 1.08]}>
        <mesh><boxGeometry args={[1.25, .43, .1]} /><meshStandardMaterial color={i === 2 ? shell : dark} metalness={.55} roughness={.4} /></mesh>
        <mesh position={[.37, 0, .06]}><boxGeometry args={[.22, .014, .01]} /><meshBasicMaterial color={i === 2 ? sand : edge} /></mesh>
      </group>)}
    </group>
    <FrameRails z={1.13} />
    <group ref={upper} position={[0, 0, 1.12]}>
      <mesh position={[0, 1.28, .08]}><boxGeometry args={[3.25, .25, .28]} /><meshStandardMaterial color={shell} metalness={.7} roughness={.3} /></mesh>
      <mesh position={[0, 1.29, .24]}><boxGeometry args={[2.75, .025, .02]} /><meshBasicMaterial color={edge} /></mesh>
    </group>
    <group ref={lower} position={[0, 0, 1.12]}>
      <mesh position={[0, -1.28, .08]}><boxGeometry args={[3.25, .25, .28]} /><meshStandardMaterial color={shell} metalness={.7} roughness={.3} /></mesh>
      <mesh position={[0, -1.29, .24]}><boxGeometry args={[2.75, .025, .02]} /><meshBasicMaterial color={edge} /></mesh>
    </group>
    <group ref={token} position={[0, 0, 1.12]}>
      <mesh castShadow><boxGeometry args={[.76, .97, .14]} /><meshStandardMaterial color={sand} metalness={.3} roughness={.55} /></mesh>
      <mesh position={[0, -.2, .078]}><boxGeometry args={[.46, .025, .008]} /><meshBasicMaterial color={forest} /></mesh>
      <mesh position={[-.09, -.31, .079]}><boxGeometry args={[.28, .025, .008]} /><meshBasicMaterial color={forest} /></mesh>
      <mesh position={[.24, .32, .078]}><boxGeometry args={[.13, .13, .008]} /><meshBasicMaterial color={forest} /></mesh>
    </group>
    {[-1.6, 1.6].map(x => [-1.6, 1.6].map(y => <mesh key={`${x}-${y}`} position={[x, y, 1.17]}><boxGeometry args={[.16, .16, .12]} /><meshStandardMaterial color={sand} metalness={.6} roughness={.3} /></mesh>))}
  </group>;
}

export default function StorageCoreScene({ progress, tier }: Props) {
  const [supported, setSupported] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try { const canvas = document.createElement('canvas'); setSupported(!!(canvas.getContext('webgl2') || canvas.getContext('webgl'))); } catch { setSupported(false); }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && !document.hidden), { rootMargin: '100px' });
    if (wrapper.current) observer.observe(wrapper.current);
    const visibility = () => setVisible(!document.hidden && !!wrapper.current && wrapper.current.getBoundingClientRect().bottom > 0);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  return <div ref={wrapper} className="core-render">{!supported ? <div className="core-fallback" aria-hidden="true"><span className="fallback-grid" /><span className="fallback-left" /><span className="fallback-right" /><span className="fallback-token" /></div> : <Canvas aria-hidden="true" camera={{ position: [0, 0, 8.6], fov: 36 }} dpr={tier === 'full' ? [1, 1.5] : 1} shadows={tier === 'full'} frameloop={visible && tier !== 'reduced' ? 'always' : 'demand'} gl={{ antialias: tier === 'full', alpha: true, powerPreference: 'high-performance' }}>
    <ambientLight intensity={1.55} />
    <directionalLight position={[-3, 5, 7]} intensity={3.3} color="#f0eee3" castShadow shadow-mapSize={[512, 512]} />
    <pointLight position={[3, -3, 4]} intensity={7} distance={12} color={sand} />
    <pointLight position={[-4, 1, -2]} intensity={5} distance={10} color={edge} />
    <Core progress={progress} tier={tier} />
  </Canvas>}</div>;
}
