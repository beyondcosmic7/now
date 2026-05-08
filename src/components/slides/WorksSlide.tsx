'use client';

import React from 'react';
import styles from './WorksSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';
import RotatingBadge from '../RotatingBadge/RotatingBadge';

export default function WorksSlide() {
  return (
    <section className={styles.slide} id="works-slide" data-slide="4">
      <FloatingBlob size="large" variant="pink" top="15%" left="25%" delay={1} />

      {/* Geometric design element instead of photo */}
      <div className={styles.designElement} data-speed="slow" data-image-reveal>
        <div className={styles.geoOuter} />
        <div className={styles.geoInner} />
        <div className={styles.geoCross}>
          <div className={styles.geoCrossH} />
          <div className={styles.geoCrossV} />
        </div>
        <span className={styles.geoLabel}>AK.24</span>
      </div>

      {/* Big centered title */}
      <h2 className={styles.title} data-speed="fast" data-title-reveal>
        PIXEL<br />
        BY<br />
        PIXEL
      </h2>

      {/* Text columns below */}
      <div className={styles.textColumns}>
        <div className={styles.textCol} data-text-fade>
          <p>
            Every interface is a deliberate composition. From
            layout grids to motion curves, the rhythm
            of visual hierarchy drives every decision
            in the design process.
          </p>
        </div>
        <div className={styles.textCol} data-text-fade>
          <p>
            Blending technical precision with artistic intuition.
            Code that performs, designs that resonate,
            animations that breathe — a unified creative vision,{' '}
            <strong>view portfolio</strong>.
          </p>
        </div>
      </div>

      {/* Rotating badge on far right */}
      <div className={styles.badgeContainer} data-stagger>
        <RotatingBadge
          text="★ WEB DEV ★ UI/UX ★ MOTION "
          centerSymbol="AK"
          size={160}
        />
      </div>
    </section>
  );
}
