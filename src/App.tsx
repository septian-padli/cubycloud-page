import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroExperience from './components/HeroExperience';
import NarrativeThread from './components/NarrativeThread';
import { ChapterNavigation, SiteHeader } from './components/SiteNavigation';
import { FilesSection, GetStartedSection, OpenSourceSection, PracticalFAQ, SelfHostingSection, SharingSection, SiteFooter, StorageSection, SupportingHighlights } from './components/Sections';
import { trackEvent, getStoredConsent } from './analytics/dataLayer';
import { useMotionTier } from './hooks/useMotion';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const tier = useMotionTier();
  useEffect(() => {
    if (tier === 'reduced') return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.section-intro h2, .highlights-heading h2, .faq-left h2, .open-source h2').forEach((el) => {
        gsap.fromTo(el, { y: tier === 'light' ? 12 : 30, opacity: .65 }, { y: 0, opacity: 1, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      });
      gsap.fromTo('.handoff-token', { y: -55, rotate: -18, scale: .8 }, { y: 0, rotate: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: '.handoff', start: 'top bottom', end: 'bottom 48%', scrub: true } });
      gsap.fromTo('.files-demo-wrap', { y: tier === 'light' ? 18 : 65, rotateX: tier === 'light' ? 0 : 6 }, { y: 0, rotateX: 0, ease: 'none', scrollTrigger: { trigger: '.files-chapter', start: 'top 80%', end: 'center center', scrub: true } });
      gsap.fromTo('.share-demo', { x: tier === 'light' ? 15 : 85, rotateY: tier === 'light' ? 0 : -9 }, { x: 0, rotateY: 0, ease: 'none', scrollTrigger: { trigger: '.sharing-chapter', start: 'top 75%', end: 'center center', scrub: true } });
      gsap.fromTo('.topology-source', { x: -65, rotate: -20 }, { x: 0, rotate: -5, ease: 'none', scrollTrigger: { trigger: '.storage-chapter', start: 'top 80%', end: 'center center', scrub: true } });
      gsap.fromTo('.topology-targets', { x: tier === 'light' ? 15 : 65 }, { x: 0, ease: 'none', scrollTrigger: { trigger: '.storage-chapter', start: 'top 80%', end: 'center center', scrub: true } });
      gsap.fromTo('.architecture-visual .arch-layer', { x: (_, el) => (el as HTMLElement).classList.contains('layer-front') ? -110 : 110, y: (_, el) => (el as HTMLElement).classList.contains('layer-mid') ? 55 : -25, rotateY: 18 }, { x: 0, y: 0, rotateY: 0, stagger: .12, ease: 'none', scrollTrigger: { trigger: '.architecture', start: 'top 88%', end: 'center 48%', scrub: true } });
      gsap.fromTo('.architecture-notes > div', { y: 35, x: 20 }, { y: 0, x: 0, stagger: .12, ease: 'none', scrollTrigger: { trigger: '.architecture', start: 'top 78%', end: 'center 45%', scrub: true } });
      gsap.fromTo('.final-form', { scale: 1.5, rotate: -20, opacity: .25 }, { scale: 1, rotate: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.get-started', start: 'top bottom', end: 'center center', scrub: true } });
    });
    return () => ctx.revert();
  }, [tier]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const viewed = new Set<string>();
    const sections: Array<{ selector: string; name: string }> = [
      { selector: '#top', name: 'hero' },
      { selector: '#files', name: 'files' },
      { selector: '#sharing', name: 'sharing' },
      { selector: '#storage', name: 'storage' },
      { selector: '.highlights', name: 'highlights' },
      { selector: '#self-hosting', name: 'self_hosting' },
      { selector: '.open-source', name: 'open_source' },
      { selector: '#faq', name: 'faq' },
      { selector: '#get-started', name: 'get_started' },
    ];

    const checkVisible = () => {
      if (getStoredConsent() !== 'granted') return;
      sections.forEach(({ selector, name }) => {
        if (viewed.has(name)) return;
        const el = document.querySelector(selector) as HTMLElement | null;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top < vh * 0.75 && rect.bottom > vh * 0.25) {
          viewed.add(name);
          trackEvent({
            name: 'section_view',
            payload: { section_name: name },
          });
          observer.unobserve(el);
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = (entry.target as HTMLElement).dataset.analyticsSection;
          if (sectionName && !viewed.has(sectionName)) {
            if (getStoredConsent() === 'granted') {
              viewed.add(sectionName);
              trackEvent({
                name: 'section_view',
                payload: { section_name: sectionName },
              });
              observer.unobserve(entry.target);
            }
          }
        }
      });
    }, { threshold: 0.25 });

    sections.forEach(({ selector, name }) => {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (el) {
        el.dataset.analyticsSection = name;
        observer.observe(el);
      }
    });

    const handleConsentChange = () => {
      checkVisible();
      setTimeout(checkVisible, 150);
    };
    window.addEventListener('cubycrate:consent-changed', handleConsentChange);
    checkVisible();

    return () => {
      observer.disconnect();
      window.removeEventListener('cubycrate:consent-changed', handleConsentChange);
    };
  }, []);

  return <><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><ChapterNavigation /><main id="main" className={`motion-${tier}`}><HeroExperience tier={tier} /><NarrativeThread tier={tier} /><FilesSection /><SharingSection /><StorageSection /><SupportingHighlights /><SelfHostingSection /><OpenSourceSection /><PracticalFAQ /><GetStartedSection /></main><SiteFooter /></>;
}
