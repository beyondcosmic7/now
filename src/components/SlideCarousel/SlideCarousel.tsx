'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useLayout } from '@/context/LayoutContext';
import styles from './SlideCarousel.module.css';

import Navbar from '../Navbar/Navbar';
import SlideCounter from '../SlideCounter/SlideCounter';
import GradientBar from '../GradientBar/GradientBar';

import HeroSlide from '../slides/HeroSlide';
import AboutSlide from '../slides/AboutSlide';
import CraftSlide from '../slides/CraftSlide';
import WorksSlide from '../slides/WorksSlide';
import PhilosophySlide from '../slides/PhilosophySlide';
import ContactSlide from '../slides/ContactSlide';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const TOTAL_SLIDES = 6;

export default function SlideCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [mainTween, setMainTween] = useState<gsap.core.Tween | null>(null);
  const { layout } = useLayout();

  // ── Shared animation setup for content entrance ──
  const setupContentAnimations = (
    slides: NodeListOf<Element>,
    containerAnimation?: gsap.core.Tween
  ) => {
    const isH = !!containerAnimation;

    slides.forEach((slide) => {
      // Content entrance — gentle stagger with silky easing
      const staggerEls = slide.querySelectorAll('[data-stagger]');
      if (staggerEls.length > 0) {
        gsap.fromTo(
          staggerEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slide,
              ...(isH ? { containerAnimation } : {}),
              start: isH ? 'left 75%' : 'top 80%',
              end: isH ? 'left 30%' : 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    // Image scale reveal
    const track = slides[0]?.parentElement;
    if (!track) return;

    track.querySelectorAll('[data-image-reveal]').forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 1.05, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            ...(isH ? { containerAnimation } : {}),
            start: isH ? 'left 90%' : 'top 90%',
            end: isH ? 'left 45%' : 'top 50%',
            scrub: 1,
          },
        }
      );
    });

    // Title clip reveal
    track.querySelectorAll('[data-title-reveal]').forEach((title) => {
      gsap.fromTo(
        title,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.3 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: title,
            ...(isH ? { containerAnimation } : {}),
            start: isH ? 'left 80%' : 'top 85%',
            end: isH ? 'left 35%' : 'top 45%',
            scrub: 1,
          },
        }
      );
    });

    // Body text fade
    track.querySelectorAll('[data-text-fade]').forEach((text) => {
      gsap.fromTo(
        text,
        { opacity: 0, [isH ? 'x' : 'y']: 20 },
        {
          opacity: 1,
          [isH ? 'x' : 'y']: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: text,
            ...(isH ? { containerAnimation } : {}),
            start: isH ? 'left 75%' : 'top 85%',
            end: isH ? 'left 40%' : 'top 50%',
            scrub: 1,
          },
        }
      );
    });

    // CTA arrow — soft, dreamy bounce
    track.querySelectorAll('[data-cta-arrow]').forEach((arrow) => {
      gsap.to(arrow, {
        [isH ? 'x' : 'y']: 5,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: 'sine.inOut',
      });
    });
  };

  // ── Hero reveal (shared between both modes) ──
  const setupHeroReveal = (track: HTMLDivElement) => {
    const heroName = track.querySelector('[data-hero-name]');
    const heroSubtitle = track.querySelector('[data-hero-subtitle]');
    const heroFadeEls = track.querySelectorAll('[data-hero-fade]');
    const nameSection = heroName?.parentElement;

    const revealHero = () => {
      const tl = gsap.timeline();

      if (nameSection) {
        tl.to(nameSection, { opacity: 1, duration: 0.01 });
      }

      if (heroName) {
        tl.fromTo(heroName,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: 'power3.out' },
          0
        );
      }

      if (heroSubtitle) {
        tl.fromTo(heroSubtitle,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
          0.8
        );
      }

      if (heroFadeEls.length > 0) {
        tl.fromTo(heroFadeEls,
          { opacity: 0 },
          { opacity: 1, duration: 1.8, stagger: 0.3, ease: 'power2.inOut' },
          1.0
        );
        const bottomRow = heroFadeEls[0]?.parentElement;
        if (bottomRow) {
          tl.to(bottomRow, { opacity: 1, duration: 0.01 }, 1.2);
        }
      }

      tl.call(() => {
        if (heroName) {
          gsap.to(heroName, {
            y: -5, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut',
          });
        }
      });
    };

    const onIntroComplete = () => {
      revealHero();
      window.removeEventListener('introComplete', onIntroComplete);
    };
    window.addEventListener('introComplete', onIntroComplete);

    setTimeout(() => {
      if (nameSection && getComputedStyle(nameSection).opacity === '0') {
        revealHero();
      }
    }, 3000);
  };

  // ── HORIZONTAL MODE SETUP ──
  const setupHorizontal = useCallback(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const slides = track.querySelectorAll('[data-slide]');
    const totalWidth = track.scrollWidth - window.innerWidth;

    ScrollTrigger.refresh();

    const tween = gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const slide = Math.min(TOTAL_SLIDES, Math.floor(progress * TOTAL_SLIDES) + 1);
          setCurrentSlide(slide);
        },
      },
    });

    triggerRef.current = tween.scrollTrigger as ScrollTrigger;
    setMainTween(tween);

    // Parallax layers — gentle, organic shifts
    slides.forEach((slide) => {
      slide.querySelectorAll('[data-speed="fast"]').forEach((el) => {
        gsap.to(el, {
          x: -60, ease: 'none',
          scrollTrigger: {
            trigger: el, containerAnimation: tween,
            start: 'left right', end: 'right left', scrub: 1,
          },
        });
      });

      slide.querySelectorAll('[data-speed="slow"]').forEach((el) => {
        gsap.to(el, {
          x: 45, ease: 'none',
          scrollTrigger: {
            trigger: el, containerAnimation: tween,
            start: 'left right', end: 'right left', scrub: 1,
          },
        });
      });

      slide.querySelectorAll('[data-speed="blob"]').forEach((el) => {
        gsap.to(el, {
          x: -30, y: 10, ease: 'none',
          scrollTrigger: {
            trigger: el, containerAnimation: tween,
            start: 'left right', end: 'right left', scrub: 1.5,
          },
        });
      });
    });

    setupContentAnimations(slides, tween);
    setupHeroReveal(track);
  }, []);

  // ── VERTICAL MODE SETUP ──
  const setupVertical = useCallback(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const slides = track.querySelectorAll('[data-slide]');

    triggerRef.current = null;
    setMainTween(null);

    // Track which slide is active
    slides.forEach((slide, i) => {
      ScrollTrigger.create({
        trigger: slide,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setCurrentSlide(i + 1),
        onEnterBack: () => setCurrentSlide(i + 1),
      });

      // Vertical parallax — calm, drifting
      slide.querySelectorAll('[data-speed="fast"]').forEach((el) => {
        gsap.to(el, {
          y: -40, ease: 'none',
          scrollTrigger: {
            trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1,
          },
        });
      });

      slide.querySelectorAll('[data-speed="slow"]').forEach((el) => {
        gsap.to(el, {
          y: 30, ease: 'none',
          scrollTrigger: {
            trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1,
          },
        });
      });

      slide.querySelectorAll('[data-speed="blob"]').forEach((el) => {
        gsap.to(el, {
          y: -20, x: 8, ease: 'none',
          scrollTrigger: {
            trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5,
          },
        });
      });
    });

    setupContentAnimations(slides);
    setupHeroReveal(track);
  }, []);

  // ── Main effect: setup/teardown based on layout ──
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Kill previous GSAP context
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }

      // Reset scroll position
      window.scrollTo(0, 0);

      // Reset track transform
      if (trackRef.current) {
        gsap.set(trackRef.current, { x: 0, y: 0 });
      }

      // Kill all existing ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill());
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        if (layout === 'horizontal') {
          setupHorizontal();
        } else {
          setupVertical();
        }
      });

      ctxRef.current = ctx;
    }, 150);

    return () => {
      clearTimeout(timeout);
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [layout, setupHorizontal, setupVertical]);

  // ── Navigation ──
  const goToSlide = useCallback((slideIndex: number) => {
    const clamped = Math.max(0, Math.min(slideIndex, TOTAL_SLIDES - 1));

    if (layout === 'horizontal') {
      const progress = clamped / (TOTAL_SLIDES - 1);
      const trigger = triggerRef.current;
      if (trigger) {
        const targetScroll = trigger.start + (trigger.end - trigger.start) * progress;
        gsap.to(window, {
          scrollTo: { y: targetScroll },
          duration: 2,
          ease: 'power3.inOut',
        });
      }
    } else {
      // Vertical: scroll to the slide element
      const track = trackRef.current;
      if (track) {
        const slideEl = track.querySelectorAll('[data-slide]')[clamped];
        if (slideEl) {
          gsap.to(window, {
            scrollTo: { y: slideEl as HTMLElement, offsetY: 0 },
            duration: 2,
            ease: 'power3.inOut',
          });
        }
      }
    }
  }, [layout]);

  const handlePrev = useCallback(() => {
    goToSlide(currentSlide - 2);
  }, [currentSlide, goToSlide]);

  const handleNext = useCallback(() => {
    goToSlide(currentSlide);
  }, [currentSlide, goToSlide]);

  const handleRewind = useCallback(() => {
    goToSlide(0);
  }, [goToSlide]);

  const isVertical = layout === 'vertical';

  return (
    <>
      <Navbar onNavigate={goToSlide} />

      {/* Main content wrapper — sits above footer */}
      <div
        ref={wrapperRef}
        className={`${styles.wrapper}`}
      >
        <div
          ref={trackRef}
          className={`${styles.track}`}
        >
          <HeroSlide />
          <AboutSlide containerAnimation={mainTween} />
          <CraftSlide />
          <WorksSlide />
          <PhilosophySlide />
          <ContactSlide onRewind={handleRewind} />
        </div>
      </div>

      <SlideCounter
        current={currentSlide}
        total={TOTAL_SLIDES}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <GradientBar />
    </>
  );
}

