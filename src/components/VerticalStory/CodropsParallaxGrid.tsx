'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CodropsParallaxGrid.module.css';

gsap.registerPlugin(ScrollTrigger);

const WABI_SABI_IMAGES = [
  "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1612438214708-f428a707dd4e?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1545042679-41d22b2ca130?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&auto=format&fit=crop", 
];

// Generate an array of 24 images by repeating the Wabi Sabi array
const IMAGES = Array.from({ length: 24 }).map((_, i) => WABI_SABI_IMAGES[i % WABI_SABI_IMAGES.length]);

export default function CodropsParallaxGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const columns = gsap.utils.toArray<HTMLElement>(`.${styles.column}`);
      
      // Setup column parallax shifts — gentle, organic drifting
      columns.forEach((column, pos) => {
        const shift = pos === 1 ? -10 : 10; // Subtler shift for smoother feel

        gsap.to(column, {
          ease: 'none',
          yPercent: shift,
          scrollTrigger: {
            trigger: grid,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
          }
        });
      });

      // Setup inner item image parallax — very subtle breathing
      const images = gsap.utils.toArray<HTMLElement>(`.${styles.columnItemImg}`);
      images.forEach(img => {
        const parent = img.closest(`.${styles.columnItem}`);
        if (!parent) return;

        gsap.fromTo(img, 
          { y: 20 }, 
          {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: parent,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2
            }
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  // Split images into 3 columns
  const col1 = IMAGES.slice(0, 8);
  const col2 = IMAGES.slice(8, 16);
  const col3 = IMAGES.slice(16, 24);

  return (
    <section className={styles.section} data-vs-section>
      <div className={styles.sectionHeader}>
        <span className={styles.kanjiAccent} data-vs-kanji>調</span>
        <h2 className={styles.sectionTitle} data-vs-title>HARMONY</h2>
        <p className={styles.sectionBody} data-vs-fade>
          The balance of light and shadow, stillness and motion. A continuous flow through space.
        </p>
      </div>

      <div className={styles.columns} ref={gridRef}>
        {[col1, col2, col3].map((colImgs, colIdx) => (
          <div key={`col-${colIdx}`} className={styles.column}>
            {colImgs.map((src, i) => (
              <figure key={`item-${colIdx}-${i}`} className={styles.columnItem}>
                <div className={styles.columnItemImgWrap}>
                  <div 
                    className={styles.columnItemImg} 
                    style={{ backgroundImage: `url(${src})` }} 
                  />
                </div>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
