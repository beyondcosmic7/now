'use client';

import React from 'react';
import styles from './CraftSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

export default function CraftSlide() {
  return (
    <section className={styles.slide} id="craft-slide" data-slide="3">
      <FloatingBlob size="large" variant="pink" top="25%" left="25%" delay={0} />
      <FloatingBlob size="medium" variant="peach" bottom="10%" left="5%" delay={3} />
      <FloatingBlob size="medium" variant="pink" top="15%" right="5%" delay={6} />

      {/* Rust accent square */}
      <div className={styles.pinkSquare} data-speed="blob" />

      {/* Outlined title top */}
      <h2 className={styles.titleTop} data-speed="fast" data-title-reveal>CAPTURE</h2>

      {/* Accent label */}
      <span className={styles.yourLabel} data-stagger>E V E R Y</span>

      {/* Center image — cinematography shot */}
      <img
        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=700&h=900&fit=crop"
        alt="Cinematography"
        className={styles.centerImage}
        data-speed="slow"
        data-image-reveal
      />

      {/* Bold title bottom */}
      <span className={styles.titleBottom} data-speed="fast" data-title-reveal>MOMENT</span>

      {/* Body text block */}
      <div className={styles.textBlock}>
        <h3 className={styles.textHeading} data-stagger>The art of seeing</h3>
        <p className={styles.textBody} data-text-fade>
          Whether through a lens or lines of code,
          the goal remains the same — to distill
          complexity into something beautiful.
        </p>
        <div className={styles.cta} data-stagger>
          <span>Explore Process</span>
          <span className={styles.ctaArrow} data-cta-arrow>————→</span>
        </div>
      </div>
    </section>
  );
}
