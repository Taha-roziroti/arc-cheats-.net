import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { scrollToElement } from './scroll-target';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let ctx: gsap.Context | null = null;
let started = false;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Lenis + heavy scroll FX are desktop-only; mobile keeps native scroll for less main-thread work. */
const prefersLightMotion = () =>
  window.matchMedia('(max-width: 1023px)').matches || window.matchMedia('(pointer: coarse)').matches;

/** Elements already on screen at load are left alone (protects LCP and avoids flicker). */
const isInitiallyVisible = (el: Element) => el.getBoundingClientRect().top < window.innerHeight * 0.9;

const tick = (time: number) => lenis?.raf(time * 1000);

const variants: Record<string, gsap.TweenVars> = {
  up: { y: 40 },
  left: { x: -40 },
  right: { x: 40 },
  scale: { scale: 0.95 },
  '3d': { y: 40, rotateX: 12, transformPerspective: 900, transformOrigin: '50% 100%' },
};

function setupReveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    if (isInitiallyVisible(el)) return;
    const key = el.dataset.reveal ?? 'up';
    const v = variants[key] ?? variants.up;
    gsap.from(el, {
      opacity: 0,
      ...v,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

function setupStagger() {
  gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    const items = Array.from(group.children);
    if (!items.length || isInitiallyVisible(group)) return;
    gsap.from(items, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });
}

/** H2/H3 and figures in markdown pages (attributes are not in the MD source). */
function setupMarkdownMotion() {
  const headingSel = '[data-content-body] h2, [data-content-body] h3';
  gsap.utils.toArray<HTMLElement>(headingSel).forEach((el) => {
    if (isInitiallyVisible(el)) return;
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-content-body] img').forEach((el) => {
    if (isInitiallyVisible(el)) return;
    gsap.from(el, {
      opacity: 0,
      scale: 0.96,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

function setupParallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '') || 8;
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

/** Hash links when Lenis is active (skip / data-scroll-target stay in site.ts). */
function setupAnchorNavigation() {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link || link.getAttribute('href') === '#') return;
    const hash = link.getAttribute('href')!.slice(1);
    const el = document.getElementById(hash);
    if (!el) return;
    event.preventDefault();
    scrollToElement(el);
  });
}

function startMotion() {
  if (started || prefersReducedMotion()) return;
  started = true;

  const useLenis = !prefersLightMotion();

  if (useLenis) {
    lenis = new Lenis();
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  }

  ctx = gsap.context(() => {
    setupReveals();
    setupStagger();
    setupMarkdownMotion();
    setupParallax();
  });

  if (useLenis) {
    setupAnchorNavigation();
  }

  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

export function initMotion() {
  if (prefersReducedMotion()) return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startMotion, { once: true });
  } else {
    startMotion();
  }
}

export function destroyMotion() {
  ctx?.revert();
  ctx = null;
  if (lenis) {
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
    window.__lenis = undefined;
  }
  started = false;
}
