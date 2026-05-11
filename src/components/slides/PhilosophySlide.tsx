'use client';

import React from 'react';
import styles from './PhilosophySlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

const PHOTOS_1 = ['/lens-1.jpg', '/lens-2.jpg', '/lens-3.jpg', '/lens-4.jpg'];
const PHOTOS_2 = ['/lens-5.jpg', '/lens-6.jpg', '/lens-7.jpg', '/lens-8.jpg'];

export default function PhilosophySlide() {
  return (
    <section className={styles.slide} id="philosophy-slide" data-slide="5">
      <FloatingBlob size="large" variant="peach" bottom="10%" left="20%" delay={2} />

      <div className={styles.container}>
        <div className={styles.titleSection} data-stagger>
          <span className={styles.label}>05 — CAPTURE</span>
          <h2 className={styles.mainTitle}>
            THROUGH<br />THE LENS
          </h2>
          <p className={styles.manifesto}>
            Photography is about seeing what others walk past. Every frame is a decision — the light, the timing, the silence between moments. I chase the poetry in the everyday.
          </p>
        </div>

        <div className={styles.galleryStrip} data-speed="slow">
          {/* Column 1 - Scrolls Up */}
          <div className={`${styles.marqueeColumn} ${styles.marqueeUp}`}>
            {[...PHOTOS_1, ...PHOTOS_1].map((src, i) => (
              <div key={`c1-${i}`} className={styles.filmFrame}>
                <div className={styles.filmHoleTop} />
                <div className={styles.filmImage} style={{ backgroundImage: `url('${src}')` }} />
                <div className={styles.filmHoleBottom} />
              </div>
            ))}
          </div>

          {/* Column 2 - Scrolls Down */}
          <div className={`${styles.marqueeColumn} ${styles.marqueeDown}`}>
            {[...PHOTOS_2, ...PHOTOS_2].map((src, i) => (
              <div key={`c2-${i}`} className={styles.filmFrame}>
                <div className={styles.filmHoleTop} />
                <div className={styles.filmImage} style={{ backgroundImage: `url('${src}')` }} />
                <div className={styles.filmHoleBottom} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
