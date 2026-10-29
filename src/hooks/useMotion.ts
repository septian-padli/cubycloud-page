import { useEffect, useState } from 'react';

export type MotionTier = 'full' | 'light' | 'reduced';

export function useMotionTier(): MotionTier {
  const [tier, setTier] = useState<MotionTier>('reduced');
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const update = () => setTier(reduced.matches ? 'reduced' : coarse.matches ? 'light' : 'full');
    update();
    reduced.addEventListener('change', update);
    coarse.addEventListener('change', update);
    return () => { reduced.removeEventListener('change', update); coarse.removeEventListener('change', update); };
  }, []);
  return tier;
}
