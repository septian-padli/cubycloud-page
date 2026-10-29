import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionTier } from '../hooks/useMotion';

gsap.registerPlugin(ScrollTrigger);

export default function NarrativeThread({ tier }: { tier: MotionTier }) {
  const token = useRef<HTMLDivElement>(null);
  const sharingToken = useRef<HTMLDivElement>(null);
  const storageToken = useRef<HTMLDivElement>(null);
  const architectureToken = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token.current || !sharingToken.current || !storageToken.current || !architectureToken.current || tier === 'reduced') return;
    const hero = document.querySelector<HTMLElement>('.hero')!;
    const handoff = document.querySelector<HTMLElement>('.handoff-token')!;
    const file = document.querySelector<HTMLElement>('.explorer .file-icon.text')!;
    const share = document.querySelector<HTMLElement>('.share-file')!;
    const storage = document.querySelector<HTMLElement>('.topology-file')!;
    const architecture = document.querySelector<HTMLElement>('.arch-storage-file')!;
    const main = document.querySelector<HTMLElement>('main')!;
    const point = (element: HTMLElement) => {
      const anchor = element.isConnected ? element : document.querySelector<HTMLElement>('.explorer')!;
      const rect = anchor.getBoundingClientRect();
      const origin = main.getBoundingClientRect();
      return { x: rect.left - origin.left + rect.width / 2, y: rect.top - origin.top + rect.height / 2 };
    };
    const start = () => {
      const rect = hero.getBoundingClientRect();
      const origin = main.getBoundingClientRect();
      return { x: rect.left - origin.left + rect.width * (innerWidth < 600 ? .68 : .77), y: rect.top - origin.top + rect.height * (innerWidth < 600 ? .56 : .65) };
    };
    const timeline = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', endTrigger: '.files-demo-wrap', end: 'top 60%', scrub: tier === 'light' ? .15 : .35, invalidateOnRefresh: true } });
    timeline.set(token.current, { x: () => start().x, y: () => start().y, xPercent: -50, yPercent: -50, scale: .55, rotation: -18, autoAlpha: 0 }, 0)
      .to(token.current, { x: () => start().x, y: () => start().y, scale: .9, rotation: -12, autoAlpha: 0, duration: .64, ease: 'none' }, 0)
      .to(token.current, { autoAlpha: 1, scale: 1, duration: .06, ease: 'none' }, .64)
      .to(token.current, { x: () => point(handoff).x, y: () => point(handoff).y, scale: .78, rotation: -10, duration: .15, ease: 'none' }, .7)
      .to(token.current, { x: () => point(file).x, y: () => point(file).y, scale: .4, rotation: 0, duration: .15, ease: 'none' }, .85)
      .to(token.current, { autoAlpha: 0, duration: .06, ease: 'none' }, .94);
    const second = gsap.timeline({ scrollTrigger: { trigger: '.files-chapter', start: 'bottom 80%', endTrigger: '.sharing-chapter', end: 'top 35%', scrub: tier === 'light' ? .15 : .35, invalidateOnRefresh: true } });
    second.set(sharingToken.current, { x: () => point(file).x, y: () => point(file).y, xPercent: -50, yPercent: -50, scale: .42, rotation: 0, autoAlpha: 0 }, 0)
      .to(sharingToken.current, { autoAlpha: 1, scale: .7, duration: .2 }, .05)
      .to(sharingToken.current, { x: () => point(share).x, y: () => point(share).y, scale: 1.35, rotation: -7, duration: .7, ease: 'none' }, .2)
      .to(sharingToken.current, { autoAlpha: 0, duration: .1 }, .9);
    const third = gsap.timeline({ scrollTrigger: { trigger: '.sharing-chapter', start: 'bottom 80%', endTrigger: '.storage-chapter', end: 'top 35%', scrub: tier === 'light' ? .15 : .35, invalidateOnRefresh: true } });
    third.set(storageToken.current, { x: () => point(share).x, y: () => point(share).y, xPercent: -50, yPercent: -50, scale: 1.35, rotation: -7, autoAlpha: 0 }, 0)
      .to(storageToken.current, { autoAlpha: 1, scale: 1, duration: .2 }, .05)
      .to(storageToken.current, { x: () => point(storage).x, y: () => point(storage).y, scale: .3, rotation: 8, duration: .7, ease: 'none' }, .2)
      .to(storageToken.current, { autoAlpha: 0, duration: .1 }, .9);
    const fourth = gsap.timeline({ scrollTrigger: { trigger: '.highlights', start: 'bottom 80%', endTrigger: '.hosting-chapter', end: 'top 35%', scrub: tier === 'light' ? .15 : .35, invalidateOnRefresh: true } });
    fourth.set(architectureToken.current, { x: () => point(storage).x, y: () => point(storage).y, xPercent: -50, yPercent: -50, scale: .3, rotation: 8, autoAlpha: 0 }, 0)
      .to(architectureToken.current, { autoAlpha: 1, scale: .8, duration: .2 }, .05)
      .to(architectureToken.current, { x: () => point(architecture).x, y: () => point(architecture).y, scale: .25, rotation: -4, duration: .7, ease: 'none' }, .2)
      .to(architectureToken.current, { autoAlpha: 0, duration: .1 }, .9);
    return () => { [timeline, second, third, fourth].forEach(animation => { animation.scrollTrigger?.kill(); animation.kill(); }); gsap.set([token.current, sharingToken.current, storageToken.current, architectureToken.current], { clearProps: 'all' }); };
  }, [tier]);

  if (tier === 'reduced') return null;
  return <><div ref={token} className="narrative-token" aria-hidden="true"><i /><span>FILE / 001</span></div><div ref={sharingToken} className="narrative-token" aria-hidden="true"><i /><span>FILE / 001</span></div><div ref={storageToken} className="narrative-token" aria-hidden="true"><i /><span>FILE / 001</span></div><div ref={architectureToken} className="narrative-token" aria-hidden="true"><i /><span>FILE / 001</span></div></>;
}
