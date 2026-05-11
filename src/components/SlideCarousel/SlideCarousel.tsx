'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
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
  const [currentSlide, setCurrentSlide] = useState(1);
  const [mainTween, setMainTween] = useState<gsap.core.Tween | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    // Let fonts/images load before calculating widths
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        const slides = track.querySelectorAll('[data-slide]');
        const totalWidth = track.scrollWidth - window.innerWidth;

        // Force a layout recalculation to ensure pinning works
        ScrollTrigger.refresh();

        const mainTween = gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            scrub: 1.5,
            end: () => `+=${totalWidth}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const slide = Math.min(
                TOTAL_SLIDES,
                Math.floor(progress * TOTAL_SLIDES) + 1
              );
              setCurrentSlide(slide);
            },
          },
        });

        triggerRef.current = mainTween.scrollTrigger as ScrollTrigger;
        setMainTween(mainTween);

        // ===== PARALLAX LAYERS =====
        slides.forEach((slide) => {
          // FAST elements (large titles) — drift left slightly faster
          slide.querySelectorAll('[data-speed="fast"]').forEach((el) => {
            gsap.to(el, {
              x: -80,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                containerAnimation: mainTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            });
          });

          // SLOW elements (images) — lag behind gently
          slide.querySelectorAll('[data-speed="slow"]').forEach((el) => {
            gsap.to(el, {
              x: 60,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                containerAnimation: mainTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            });
          });

          // BLOB elements — very slow, dreamy drift
          slide.querySelectorAll('[data-speed="blob"]').forEach((el) => {
            gsap.to(el, {
              x: -40,
              y: 15,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                containerAnimation: mainTween,
                start: 'left right',
                end: 'right left',
                scrub: 2, // Extra lag for dreamy feel
              },
            });
          });

          // ===== CONTENT ENTRANCE — gentle stagger =====
          const staggerEls = slide.querySelectorAll('[data-stagger]');
          if (staggerEls.length > 0) {
            gsap.fromTo(
              staggerEls,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.12,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: mainTween,
                  start: 'left 75%',
                  end: 'left 30%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        });

        // ===== IMAGE SCALE REVEAL — gentle zoom in =====
        track.querySelectorAll('[data-image-reveal]').forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.08, opacity: 0.8 },
            {
              scale: 1,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: img,
                containerAnimation: mainTween,
                start: 'left 90%',
                end: 'left 45%',
                scrub: 1.5,
              },
            }
          );
        });

        // ===== TITLE CLIP REVEAL — smooth unveil =====
        track.querySelectorAll('[data-title-reveal]').forEach((title) => {
          gsap.fromTo(
            title,
            { clipPath: 'inset(0 100% 0 0)', opacity: 0.3 },
            {
              clipPath: 'inset(0 0% 0 0)',
              opacity: 1,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: title,
                containerAnimation: mainTween,
                start: 'left 80%',
                end: 'left 35%',
                scrub: 1.2,
              },
            }
          );
        });

        // ===== BODY TEXT FADE — gentle horizontal slide =====
        track.querySelectorAll('[data-text-fade]').forEach((text) => {
          gsap.fromTo(
            text,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: text,
                containerAnimation: mainTween,
                start: 'left 75%',
                end: 'left 40%',
                scrub: 1.2,
              },
            }
          );
        });

        // ===== CTA ARROW — subtle continuous bounce =====
        track.querySelectorAll('[data-cta-arrow]').forEach((arrow) => {
          gsap.to(arrow, {
            x: 6,
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: 'sine.inOut',
          });
        });

        // ===== HERO NAME REVEAL — triggered after Skyfall intro completes =====
        const heroName = track.querySelector('[data-hero-name]');
        const heroSubtitle = track.querySelector('[data-hero-subtitle]');
        const heroFadeEls = track.querySelectorAll('[data-hero-fade]');
        const nameSection = heroName?.parentElement;

        const revealHero = () => {
          const tl = gsap.timeline();

          // 1. Fade in name section container
          if (nameSection) {
            tl.to(nameSection, {
              opacity: 1,
              duration: 0.01,
            });
          }

          // 2. Name elegantly scales up from slightly small + fades in
          if (heroName) {
            tl.fromTo(heroName,
              { opacity: 0, scale: 0.9, y: 30 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 2,
                ease: 'power3.out',
              },
              0
            );
          }

          // 3. Subtitle slides in after name
          if (heroSubtitle) {
            tl.fromTo(heroSubtitle,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power2.out',
              },
              0.8
            );
          }

          // 4. Bottom whispers fade in last
          if (heroFadeEls.length > 0) {
            tl.fromTo(heroFadeEls,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 2,
                stagger: 0.3,
                ease: 'power2.inOut',
              },
              1.2
            );

            // Also reveal the bottom row container
            const bottomRow = heroFadeEls[0]?.parentElement;
            if (bottomRow) {
              tl.to(bottomRow, { opacity: 1, duration: 0.01 }, 1.2);
            }
          }

          // 5. After reveal, add calm continuous floating
          tl.call(() => {
            if (heroName) {
              gsap.to(heroName, {
                y: -8,
                duration: 4,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
              });
            }
          });
        };

        // Listen for intro completion
        const onIntroComplete = () => {
          revealHero();
          window.removeEventListener('introComplete', onIntroComplete);
        };
        window.addEventListener('introComplete', onIntroComplete);

        // Fallback: if intro already completed (hot reload), reveal immediately
        setTimeout(() => {
          if (nameSection && getComputedStyle(nameSection).opacity === '0') {
            revealHero();
          }
        }, 3000);

      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const goToSlide = useCallback((slideIndex: number) => {
    const clamped = Math.max(0, Math.min(slideIndex, TOTAL_SLIDES - 1));
    const progress = clamped / (TOTAL_SLIDES - 1);
    const trigger = triggerRef.current;
    if (trigger) {
      const targetScroll = trigger.start + (trigger.end - trigger.start) * progress;
      gsap.to(window, {
        scrollTo: { y: targetScroll },
        duration: 1.6,
        ease: 'power2.inOut',
      });
    }
  }, []);

  const handlePrev = useCallback(() => {
    goToSlide(currentSlide - 2);
  }, [currentSlide, goToSlide]);

  const handleNext = useCallback(() => {
    goToSlide(currentSlide);
  }, [currentSlide, goToSlide]);

  const handleRewind = useCallback(() => {
    goToSlide(0);
  }, [goToSlide]);

  return (
    <>
      <Navbar onNavigate={goToSlide} />

      <div ref={wrapperRef} className={styles.wrapper}>
        <div ref={trackRef} className={styles.track}>
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
