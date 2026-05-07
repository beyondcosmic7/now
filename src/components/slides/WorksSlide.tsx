'use client';

import React from 'react';
import styles from './WorksSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';
import RotatingBadge from '../RotatingBadge/RotatingBadge';

export default function WorksSlide() {
  return (
    <section className={styles.slide} id="works-slide" data-slide="4">
      <FloatingBlob size="large" variant="pink" top="15%" left="25%" delay={1} />

      {/* Photo overlapping the title */}
      <img
        src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=800&fit=crop"
        alt="Photography work"
        className={styles.photo}
        data-speed="slow"
        data-image-reveal
      />

      {/* Big centered title */}
      <h2 className={styles.title} data-speed="fast" data-title-reveal>
        FRAME<br />
        BY<br />
        FRAME
      </h2>

      {/* Text columns below */}
      <div className={styles.textColumns}>
        <div className={styles.textCol} data-text-fade>
          <p>
            Each frame is a deliberate composition. From
            web interfaces to film sequences, the rhythm
            of visual storytelling drives every decision
            in the creative process.
          </p>
        </div>
        <div className={styles.textCol} data-text-fade>
          <p>
            Blending technical precision with artistic intuition.
            Code that performs, photographs that speak,
            films that move — a unified creative vision,{' '}
            <strong>view portfolio</strong>.
          </p>
        </div>
      </div>

      {/* Rotating badge on far right */}
      <div className={styles.badgeContainer} data-stagger>
        <RotatingBadge
          text="★ WEB DEV ★ PHOTOGRAPHY ★ CINEMA "
          centerSymbol="AK"
          size={160}
        />
      </div>
    </section>
  );
}
