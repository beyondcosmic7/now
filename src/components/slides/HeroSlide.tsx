'use client';

import React from 'react';
import styles from './HeroSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

export default function HeroSlide() {
  return (
    <section className={styles.slide} id="hero-slide" data-slide="1">
      {/* Left: Full-bleed portrait */}
      <div className={styles.imageHalf}>
        <img
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1200&fit=crop&crop=face"
          alt="Akshan Khan portrait"
          className={styles.heroImage}
          data-speed="slow"
          data-image-reveal
        />
        <div className={styles.progressBar}>
          <div className={styles.progressIcon}>墨</div>
          <div className={styles.progressLine}>
            <div className={styles.progressFill} />
          </div>
        </div>
      </div>

      {/* Right: Name & Title */}
      <div className={styles.contentHalf}>
        <div className={styles.badge} data-stagger>
          <span>Dev &<br/>Artist</span>
        </div>

        <FloatingBlob size="medium" variant="pink" top="40%" right="20%" delay={2} />
        <FloatingBlob size="small" variant="peach" bottom="25%" right="10%" delay={5} />

        {/* Japanese vertical accent */}
        <span className={styles.kanjiAccent} data-stagger>写真家</span>

        <div className={styles.titleBlock} data-speed="fast">
          <p className={styles.subtitle} data-stagger>A K S H A N</p>
          <h1 className={styles.title} data-title-reveal>KHAN</h1>
        </div>

        <div className={styles.cta} data-stagger>
          <span>View Works</span>
          <span className={styles.ctaArrow} data-cta-arrow>————→</span>
        </div>
      </div>
    </section>
  );
}
