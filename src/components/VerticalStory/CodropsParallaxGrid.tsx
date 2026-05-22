'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CodropsParallaxGrid.module.css';

gsap.registerPlugin(ScrollTrigger);

// User's real photography — local assets
const ALL_PHOTOS = [
  '/img/1.jpg', '/img/2.jpg', '/img/3.jpg', '/img/4.jpg',
  '/img/5.jpg', '/img/6.jpg', '/img/7.jpg', '/img/8.jpg', '/img/9.jpg',
  '/img/photo-01.jpg', '/img/photo-02.jpg', '/img/photo-03.jpg',
  '/img/photo-04.jpg', '/img/photo-05.jpg', '/img/photo-06.jpg',
  '/img/photo-07.jpg', '/img/photo-08.jpg', '/img/photo-09.jpg',
  '/img/photo-10.jpg', '/img/photo-11.jpg', '/img/photo-12.jpg',
  '/img/photo-13.jpg',
];

// Generate 24 images cycling through the pool
const IMAGES = Array.from({ length: 24 }).map((_, i) => ALL_PHOTOS[i % ALL_PHOTOS.length]);

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
            scrub: 1
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
              scrub: 1
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
