'use client';

import React from 'react';
import styles from './PhilosophySlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

export default function PhilosophySlide() {
  return (
    <section className={styles.slide} id="philosophy-slide" data-slide="5">
      <FloatingBlob size="large" variant="pink" bottom="10%" right="0%" delay={2} />
      <FloatingBlob size="small" variant="peach" top="20%" left="35%" delay={0} />

      {/* Left: Typography specimen showcase */}
      <div className={styles.typeSection}>
        <div className={styles.typeSpecimen}>
          {/* Large display sample */}
          <span className={styles.typeDisplay} data-speed="slow">Aa</span>
          {/* Font name */}
          <span className={styles.typeName} data-stagger>Noto Serif JP</span>
          {/* Weight samples */}
          <div className={styles.typeWeights} data-stagger>
            <span style={{ fontWeight: 300 }}>Light</span>
            <span style={{ fontWeight: 400 }}>Regular</span>
            <span style={{ fontWeight: 700 }}>Bold</span>
            <span style={{ fontWeight: 900 }}>Black</span>
          </div>
          {/* Color palette dots */}
          <div className={styles.paletteDots} data-stagger>
            <span className={styles.dot} style={{ background: '#2C2C2C' }} />
            <span className={styles.dot} style={{ background: '#FAF8F5' }} />
            <span className={styles.dot} style={{ background: '#8B2500' }} />
            <span className={styles.dot} style={{ background: '#505050' }} />
            <span className={styles.dot} style={{ background: '#A8A8A8' }} />
          </div>
        </div>
        <span className={styles.verticalTitle} data-speed="fast">
          DESIGN LANGUAGE
        </span>
      </div>

      {/* Right: Philosophy content */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionHeading} data-stagger>Design Philosophy</h2>

        <p className={styles.bodyText} data-text-fade>
          Great interfaces live at the intersection of form and
          function. Every component, every transition, every
          whitespace decision should feel intentional — like
          <a href="#"> ink on paper</a>.
        </p>

        <p className={styles.bodyText} data-text-fade>
          Minimalism isn&apos;t about doing less. It&apos;s about
          making every element earn its place. The negative space
          speaks as loudly as the content itself.
        </p>

        <div className={styles.cta} data-stagger>
          <span>Learn More</span>
          <span className={styles.ctaArrow} data-cta-arrow>————→</span>
        </div>
      </div>
    </section>
  );
}
