import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import * as THREE from 'three';
import type { MotionTier } from '../hooks/useMotion';

const forest = '#34452d';
const shell = '#45583a';
const dark = '#1b281f';
const edge = '#9aab60';
const sand = '#dda15e';

type Props = { progress: RefObject<number>; tier: MotionTier; visible: boolean };

function FrameRails({ z, color = edge }: { z: number; color?: string }) {
  return <group position={[0, 0, z]}>
    {[-1, 1].map(x => <mesh key={`v${x}`} position={[x * 1.65, 0, 0]}><boxGeometry args={[0.045, 3.35, 0.08]} /><meshStandardMaterial color={color} metalness={0.52} roughness={0.53} /></mesh>)}
    {[-1, 1].map(y => <mesh key={`h${y}`} position={[0, y * 1.66, 0]}><boxGeometry args={[3.35, 0.045, 0.08]} /><meshStandardMaterial color={color} metalness={0.52} roughness={0.53} /></mesh>)}
  </group>;
}

function Core({ progress, tier, visible }: Props) {
  const root = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const upper = useRef<THREE.Group>(null);
  const lower = useRef<THREE.Group>(null);
  const token = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (tier !== 'full' || !visible) { pointer.current = { x: 0, y: 0 }; return; }
    const move = (e: PointerEvent) => { pointer.current.x = (e.clientX / window.innerWidth - .5) * .17; pointer.current.y = (e.clientY / window.innerHeight - .5) * .1; };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [tier, visible]);
  useFrame(({ clock, camera }, delta) => {
    if (!root.current || !left.current || !right.current || !upper.current || !lower.current || !token.current) return;
    const p = tier === 'reduced' ? 0 : progress.current;
    const open = THREE.MathUtils.smoothstep(p, .12, .68);
    const extract = THREE.MathUtils.smoothstep(p, .42, .88);
    const ambient = tier === 'full' && visible ? Math.sin(clock.elapsedTime * .3) * .012 : 0;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -.36 + p * .55 + pointer.current.x + ambient, 3.2, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -.16 + p * .17 + pointer.current.y, 3.2, delta);
    root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, -.06 - p * .1, 3.2, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, p * -.28, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, p * .16, 2, delta);
    left.current.position.set(-open * .85, open * .08, open * .2);
    right.current.position.set(open * .85, -open * .08, open * .2);
    upper.current.position.y = open * .52;
    lower.current.position.y = -open * .52;
    token.current.position.set(extract * 1.25, extract * -.46, 1.12 + extract * 2.3);
    token.current.scale.setScalar((1 + extract * .48) * (1 - THREE.MathUtils.smoothstep(p, .71, .91)));
    token.current.rotation.z = extract * -.18;
  });
  return <group ref={root} rotation={[-.16, -.36, -.06]}>
    <mesh position={[0, 0, -.85]} castShadow receiveShadow><boxGeometry args={[3.35, 3.32, 1.85]} /><meshStandardMaterial color={dark} metalness={.32} roughness={.7} /></mesh>
    <FrameRails z={-1.83} color={forest} />
    {[-.65, -.25, .15, .55].map((z, i) => <group key={z} position={[0, 0, z]}>
      <mesh castShadow receiveShadow><boxGeometry args={[2.75, 2.65, .14]} /><meshStandardMaterial color={i % 2 ? forest : shell} metalness={.28} roughness={.72} /></mesh>
      <mesh position={[0, 0, .08]}><boxGeometry args={[2.42, 2.33, .015]} /><meshStandardMaterial color={dark} metalness={.3} roughness={.65} /></mesh>
      <mesh position={[0, -1.08, .095]}><boxGeometry args={[1.5, .025, .015]} /><meshStandardMaterial color={edge} metalness={.35} roughness={.58} /></mesh>
    </group>)}
    <group ref={left}>
      <mesh position={[-.95, 0, .08]} castShadow receiveShadow><boxGeometry args={[1.45, 3.12, 1.95]} /><meshStandardMaterial color={shell} metalness={.38} roughness={.62} /></mesh>
      {[-1.02, -.48, .06, .6, 1.14].map((y, i) => <group key={y} position={[-.95, y, 1.08]}>
        <mesh castShadow><boxGeometry args={[1.26, .39, .08]} /><meshStandardMaterial color={i === 2 ? forest : dark} metalness={.34} roughness={.67} /></mesh>
        <mesh position={[-.39, 0, .049]}><boxGeometry args={[.27, .018, .012]} /><meshStandardMaterial color={i === 2 ? sand : edge} metalness={.35} roughness={.52} /></mesh>
        <mesh position={[.43, 0, .05]}><boxGeometry args={[.055, .055, .014]} /><meshStandardMaterial color={edge} roughness={.65} /></mesh>
      </group>)}
    </group>
    <group ref={right}>
      <mesh position={[.95, 0, .08]} castShadow receiveShadow><boxGeometry args={[1.45, 3.12, 1.95]} /><meshStandardMaterial color={forest} metalness={.35} roughness={.64} /></mesh>
      {[-1.1, -.56, -.02, .52, 1.06].map((y, i) => <group key={y} position={[.95, y, 1.08]}>
        <mesh castShadow><boxGeometry args={[1.25, .43, .1]} /><meshStandardMaterial color={i === 2 ? shell : dark} metalness={.36} roughness={.66} /></mesh>
        <mesh position={[.37, 0, .06]}><boxGeometry args={[.22, .014, .01]} /><meshStandardMaterial color={i === 2 ? sand : edge} roughness={.55} /></mesh>
      </group>)}
    </group>
    <FrameRails z={1.13} />
    <group ref={upper} position={[0, 0, 1.12]}>
      <mesh position={[0, 1.28, .08]} castShadow><boxGeometry args={[3.25, .25, .28]} /><meshStandardMaterial color={shell} metalness={.45} roughness={.55} /></mesh>
      <mesh position={[0, 1.29, .24]}><boxGeometry args={[2.75, .025, .02]} /><meshStandardMaterial color={edge} roughness={.55} /></mesh>
    </group>
    <group ref={lower} position={[0, 0, 1.12]}>
      <mesh position={[0, -1.28, .08]} castShadow><boxGeometry args={[3.25, .25, .28]} /><meshStandardMaterial color={shell} metalness={.45} roughness={.55} /></mesh>
      <mesh position={[0, -1.29, .24]}><boxGeometry args={[2.75, .025, .02]} /><meshStandardMaterial color={edge} roughness={.55} /></mesh>
    </group>
    <group ref={token} position={[0, 0, 1.12]}>
      <mesh castShadow><boxGeometry args={[.76, .97, .14]} /><meshStandardMaterial color={sand} metalness={.12} roughness={.66} /></mesh>
      <mesh position={[0, -.2, .078]}><boxGeometry args={[.46, .025, .008]} /><meshBasicMaterial color={forest} /></mesh>
      <mesh position={[-.09, -.31, .079]}><boxGeometry args={[.28, .025, .008]} /><meshBasicMaterial color={forest} /></mesh>
      <mesh position={[.24, .32, .078]}><boxGeometry args={[.13, .13, .008]} /><meshBasicMaterial color={forest} /></mesh>
    </group>
    {[-1.6, 1.6].map(x => [-1.6, 1.6].map(y => <mesh key={`${x}-${y}`} position={[x, y, 1.17]}><boxGeometry args={[.16, .16, .12]} /><meshStandardMaterial color={sand} metalness={.42} roughness={.48} /></mesh>))}
  </group>;
}

export default function StorageCoreScene({ progress, tier }: Omit<Props, 'visible'>) {
  const [supported, setSupported] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try { const canvas = document.createElement('canvas'); setSupported(!!(canvas.getContext('webgl2') || canvas.getContext('webgl'))); } catch { setSupported(false); }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && !document.hidden), { rootMargin: '100px' });
    if (wrapper.current) observer.observe(wrapper.current);
    const visibility = () => setVisible(!document.hidden && !!wrapper.current && wrapper.current.getBoundingClientRect().bottom > 0 && wrapper.current.getBoundingClientRect().top < innerHeight);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  return <div ref={wrapper} className="core-render">{!supported ? <div className="core-fallback" aria-hidden="true"><span className="fallback-grid" /><span className="fallback-left" /><span className="fallback-right" /><span className="fallback-token" /></div> : <Canvas aria-hidden="true" camera={{ position: [0, 0, 8.8], fov: 34 }} dpr={tier === 'full' ? [1, 1.5] : 1} shadows={tier === 'full'} frameloop={visible && tier !== 'reduced' ? 'always' : 'demand'} gl={{ antialias: tier === 'full', alpha: true, powerPreference: 'high-performance' }}>
    <ambientLight intensity={1.35} />
    <directionalLight position={[-3, 5, 7]} intensity={3.6} color="#f0eee3" castShadow shadow-mapSize={[512, 512]} shadow-bias={-.0002} />
    <directionalLight position={[4, -2, 4]} intensity={1.4} color="#c4cda8" />
    <directionalLight position={[2, 3, -4]} intensity={2.2} color={edge} />
    <pointLight position={[1, -2, 3]} intensity={1.6} distance={7} color={sand} />
    <Core progress={progress} tier={tier} visible={visible} />
  </Canvas>}</div>;
}
