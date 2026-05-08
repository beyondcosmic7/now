'use client';

import React from 'react';
import styles from './HeroSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

export default function HeroSlide() {
  return (
    <section className={styles.slide} id="hero-slide" data-slide="1">
      {/* Left: Typography showcase instead of photo */}
      <div className={styles.designHalf}>
        {/* Animated grid lines */}
        <div className={styles.gridLines}>
          <div className={styles.gridH} />
          <div className={styles.gridH} />
          <div className={styles.gridH} />
          <div className={styles.gridV} />
          <div className={styles.gridV} />
        </div>

        {/* Large decorative kanji watermark */}
        <span className={styles.kanjiWatermark} data-speed="slow">墨</span>

        {/* Animated circle element */}
        <div className={styles.designCircle} />

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

        {/* Vertical accent */}
        <span className={styles.kanjiAccent} data-stagger>開発者</span>

        <div className={styles.titleBlock} data-speed="fast">
          <p className={styles.subtitle} data-stagger>A K S H A N</p>
          <h1 className={styles.title} data-title-reveal>KHAN</h1>
        </div>

        {/* Skills row */}
        <div className={styles.skillsRow} data-stagger>
          <span className={styles.skillTag}>Web Development</span>
          <span className={styles.skillDot}>·</span>
          <span className={styles.skillTag}>UI/UX Design</span>
          <span className={styles.skillDot}>·</span>
          <span className={styles.skillTag}>Motion</span>
        </div>

        <div className={styles.cta} data-stagger>
          <span>View Works</span>
          <span className={styles.ctaArrow} data-cta-arrow>————→</span>
        </div>
      </div>
    </section>
  );
}
