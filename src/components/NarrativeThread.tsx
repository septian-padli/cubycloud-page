import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionTier } from '../hooks/useMotion';

gsap.registerPlugin(ScrollTrigger);

export default function NarrativeThread({ tier }: { tier: MotionTier }) {
  const tokens = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (tier === 'reduced') return;
    const [first, second, third] = tokens.current;
    if (!first || !second || !third) return;
    const hero = document.querySelector<HTMLElement>('.hero')!;
    const handoff = document.querySelector<HTMLElement>('.handoff-token')!;
    const file = document.querySelector<HTMLElement>('.explorer-token-anchor')!;
    const share = document.querySelector<HTMLElement>('.share-file-mark')!;
    const storage = document.querySelector<HTMLElement>('.topology-file')!;
    const main = document.querySelector<HTMLElement>('main')!;
    const point = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const origin = main.getBoundingClientRect();
      return { x: rect.left - origin.left + rect.width / 2, y: rect.top - origin.top + rect.height / 2 };
    };
    const start = () => {
      const rect = hero.getBoundingClientRect();
      const origin = main.getBoundingClientRect();
      return { x: rect.left - origin.left + rect.width * (innerWidth < 600 ? .68 : .77), y: rect.top - origin.top + rect.height * (innerWidth < 600 ? .56 : .65) };
    };
    const scrub = tier === 'light' ? .15 : .3;
    const firstTravel = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', endTrigger: '.files-demo-wrap', end: 'top 60%', scrub, invalidateOnRefresh: true } });
    firstTravel.set(first, { x: () => start().x, y: () => start().y, xPercent: -50, yPercent: -50, scale: .55, rotation: -18, autoAlpha: 0 }, 0)
      .to(first, { scale: .9, rotation: -12, duration: .64, ease: 'none' }, 0)
      .to(first, { autoAlpha: 1, scale: 1, duration: .06, ease: 'none' }, .64)
      .to(first, { x: () => point(handoff).x, y: () => point(handoff).y, scale: .78, rotation: -10, duration: .15, ease: 'none' }, .7)
      .to(first, { x: () => point(file).x, y: () => point(file).y, scale: .3, rotation: 0, duration: .15, ease: 'none' }, .85)
      .to(first, { autoAlpha: 0, duration: .06, ease: 'none' }, .94);
    const shareTravel = gsap.timeline({ scrollTrigger: { trigger: '.files-chapter', start: 'bottom 80%', endTrigger: '.sharing-chapter', end: 'top 35%', scrub, invalidateOnRefresh: true } });
    shareTravel.set(second, { x: () => point(file).x, y: () => point(file).y, xPercent: -50, yPercent: -50, scale: .3, rotation: 0, autoAlpha: 0 }, 0)
      .to(second, { autoAlpha: 1, scale: .7, duration: .2 }, .05)
      .to(second, { x: () => point(share).x, y: () => point(share).y, scale: .32, rotation: -7, duration: .7, ease: 'none' }, .2)
      .to(second, { autoAlpha: 0, duration: .1 }, .9);
    const storageTravel = gsap.timeline({ scrollTrigger: { trigger: '.sharing-chapter', start: 'bottom 80%', endTrigger: '.storage-chapter', end: 'top 35%', scrub, invalidateOnRefresh: true } });
    storageTravel.set(third, { x: () => point(share).x, y: () => point(share).y, xPercent: -50, yPercent: -50, scale: .32, rotation: -7, autoAlpha: 0 }, 0)
      .to(third, { autoAlpha: 1, scale: .65, duration: .2 }, .05)
      .to(third, { x: () => point(storage).x, y: () => point(storage).y, scale: .25, rotation: 8, duration: .7, ease: 'none' }, .2)
      .to(third, { autoAlpha: 0, duration: .1 }, .9);
    ScrollTrigger.refresh();
    return () => {
      [firstTravel, shareTravel, storageTravel].forEach(animation => { animation.scrollTrigger?.kill(); animation.kill(); });
      gsap.set([first, second, third], { clearProps: 'all' });
    };
  }, [tier]);

  if (tier === 'reduced') return null;
  return <>{[0, 1, 2].map(index => <div key={index} ref={node => { tokens.current[index] = node; }} className="narrative-token" aria-hidden="true"><i /><span>FILE / 001</span></div>)}</>;
}
