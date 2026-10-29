import { ArrowDown, ArrowUpRight, MoveDownRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { links } from '../config';
import type { MotionTier } from '../hooks/useMotion';
import StorageCoreScene from './StorageCoreScene';

gsap.registerPlugin(ScrollTrigger);

export default function HeroExperience({ tier }: { tier: MotionTier }) {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  useEffect(() => {
    if (!section.current || tier === 'reduced') { progress.current = 0; return; }
    const trigger = ScrollTrigger.create({ trigger: section.current, start: 'top top', end: 'bottom top', onUpdate: self => { progress.current = self.progress; } });
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-enter', { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 1.05, stagger: .095, ease: 'power3.out', clearProps: 'transform,opacity' });
      gsap.to('.hero-bigtype', { yPercent: -16, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-bottom', { yPercent: -38, opacity: 0, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: true } });
    }, section);
    return () => { ctx.revert(); trigger.kill(); };
  }, [tier]);
  return <section id="top" ref={section} className="hero" aria-labelledby="hero-heading">
    <div className="hero-noise" aria-hidden="true" />
    <div className="hero-topline hero-enter"><span>AN OPEN-SOURCE FILE DRIVE</span><span>01 — YOUR INFRASTRUCTURE, YOUR RULES</span></div>
    <div className="hero-headline hero-bigtype"><p className="hero-kicker hero-enter"><span className="kicker-dash" />WELCOME TO YOUR SPACE</p><h1 id="hero-heading" className="hero-enter">YOUR FILES.<br /><em>YOUR SPACE.</em></h1></div>
    <div className="core-aura" aria-hidden="true" />
    <div className="core-scene"><StorageCoreScene progress={progress} tier={tier} /></div>
    <div className="hero-object-note"><span className="crosshair">+</span><span>CUBYCLOUD / STORAGE CORE<br />MODULAR SYSTEM · 001</span></div>
    <div className="hero-copy hero-enter"><span className="overline">FILES BELONG WITH YOU.</span><p>Your files don’t need another bloated platform.</p><span>Meet CubyCloud, a focused, self-hosted file drive for organizing, accessing, and sharing files on infrastructure you control.</span><div className="hero-buttons"><a href="#get-started" className="button button-light">GET STARTED <ArrowUpRight size={20} /></a><a href={links.github} target="_blank" rel="noopener noreferrer" className="text-link">VIEW ON GITHUB <ArrowUpRight size={17} /></a></div></div>
    <div className="hero-bottom"><div className="hero-scroll"><ArrowDown size={22} strokeWidth={1.4} /><span>EXPLORE THE SYSTEM<br />SCROLL TO DISCOVER</span></div><p>YOUR FILES. YOUR SERVER. YOUR RULES.</p><span className="hero-coordinate">[ 00 / 04 ] <MoveDownRight size={16} /></span></div>
  </section>;
}
