'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CodropsFlipGrid.module.css';

gsap.registerPlugin(ScrollTrigger);

const WORKS_DATA = [
  { id: 1, title: 'ZEN GARDEN', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'MINIMAL SPACES', img: 'https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'INK WASH', img: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'BONSAI FORM', img: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'WABI SABI', img: 'https://images.unsplash.com/photo-1612438214708-f428a707dd4e?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'SHADOW PLAY', img: 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?q=80&w=800&auto=format&fit=crop' },
  { id: 7, title: 'CHERRY BLOSSOM', img: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&auto=format&fit=crop' }
];

export default function CodropsFlipGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(containerRef);

  useLayoutEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    // Cinematic Entrance Animation on Scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate items up and in — soft, organic stagger
    tl.fromTo(q(`.${styles.gridItem}`), 
      { opacity: 0, y: 60, scaleY: 1.08 },
      { 
        opacity: 1, 
        y: 0, 
        scaleY: 1, 
        stagger: { each: 0.06, from: 'random' }, 
        duration: 1.6, 
        ease: 'power3.out' 
      }
    );

    // Animate the huge background titles — glacially smooth
    tl.fromTo(q(`.${styles.worksTitleWord}`),
      { opacity: 0, yPercent: 80 },
      { 
        opacity: 1, 
        yPercent: 0, 
        duration: 2, 
        stagger: 0.3, 
        ease: 'power4.out' 
      },
      '-=1.2'
    );
  }, [q]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const item = e.currentTarget;
    const img = item.querySelector(`.${styles.gridItemImg}`);
    gsap.killTweensOf([item, img]);
    gsap.timeline({ defaults: { duration: 0.8, ease: 'expo.out' } })
      .to(item, { scaleY: 1.05 }, 0)
      .to(img, { scale: 1.1 }, 0);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const item = e.currentTarget;
    const img = item.querySelector(`.${styles.gridItemImg}`);
    gsap.killTweensOf([item, img]);
    gsap.timeline({ defaults: { duration: 0.8, ease: 'expo.out' } })
      .to(item, { scaleY: 1 }, 0)
      .to(img, { scale: 1 }, 0);
  };

  return (
    <section ref={containerRef} className={`${styles.section} ${styles.expanded}`} data-vs-section>
      
      {/* Background Titles */}
      <h2 className={styles.worksTitle}>
        <span className={styles.worksTitleWordWrapper}><span className={styles.worksTitleWord}>SELECTED</span></span>
        <span className={styles.worksTitleWordWrapper}><span className={styles.worksTitleWord}>WORKS</span></span>
      </h2>

      {/* Permanently Expanded Grid */}
      <div className={`${styles.gridWrap} ${styles.gridExpanded}`}>
        {WORKS_DATA.map((work) => (
          <a 
            key={work.id} 
            className={styles.gridItem} 
            data-title={work.title}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className={styles.gridItemImg} 
              style={{ backgroundImage: `url(${work.img})` }} 
            />
          </a>
        ))}
      </div>

    </section>
  );
}
