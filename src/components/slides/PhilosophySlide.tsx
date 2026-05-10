'use client';

import React from 'react';
import styles from './PhilosophySlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

const PHOTO_CATEGORIES = [
  { label: 'Street', count: '48' },
  { label: 'Portrait', count: '32' },
  { label: 'Architecture', count: '24' },
  { label: 'Cinematic', count: '16' },
];

export default function PhilosophySlide() {
  return (
    <section className={styles.slide} id="philosophy-slide" data-slide="5">
      <FloatingBlob size="large" variant="pink" bottom="10%" right="0%" delay={2} />
      <FloatingBlob size="small" variant="peach" top="20%" left="35%" delay={0} />

      {/* Left: Photography showcase */}
      <div className={styles.typeSection}>
        <div className={styles.typeSpecimen}>
          {/* Camera icon / viewfinder element */}
          <span className={styles.typeDisplay} data-speed="slow">📷</span>
          {/* Category name */}
          <span className={styles.typeName} data-stagger>Through the Lens</span>
          {/* Categories */}
          <div className={styles.typeWeights} data-stagger>
            {PHOTO_CATEGORIES.map((cat) => (
              <span key={cat.label}>
                {cat.label} <small>({cat.count})</small>
              </span>
            ))}
          </div>
          {/* Color grading palette */}
          <div className={styles.paletteDots} data-stagger>
            <span className={styles.dot} style={{ background: '#1a1a2e' }} />
            <span className={styles.dot} style={{ background: '#e8d5b7' }} />
            <span className={styles.dot} style={{ background: '#8B2500' }} />
            <span className={styles.dot} style={{ background: '#2d4a3e' }} />
            <span className={styles.dot} style={{ background: '#d4a574' }} />
          </div>
        </div>
        <span className={styles.verticalTitle} data-speed="fast">
          PHOTOGRAPHY
        </span>
      </div>

      {/* Right: Philosophy content */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionHeading} data-stagger>Visual Storytelling</h2>

        <p className={styles.bodyText} data-text-fade>
          Photography is about seeing what others walk past.
          Every frame is a decision — the light, the timing,
          the silence between moments. I chase the poetry
          in the everyday.
        </p>

        <p className={styles.bodyText} data-text-fade>
          From the geometry of architecture to the rawness
          of street life. My lens gravitates toward contrast,
          warmth, and the human element hidden in every scene.
        </p>

        <div className={styles.cta} data-stagger>
          <span>View Gallery</span>
          <span className={styles.ctaArrow} data-cta-arrow>————→</span>
        </div>
      </div>
    </section>
  );
}
