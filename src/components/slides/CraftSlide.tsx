'use client';

import React from 'react';
import styles from './CraftSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

export default function CraftSlide() {
  return (
    <section className={styles.slide} id="craft-slide" data-slide="3">
      <FloatingBlob size="large" variant="pink" top="25%" left="25%" delay={0} />
      <FloatingBlob size="medium" variant="peach" bottom="10%" left="5%" delay={3} />

      {/* Rust accent square */}
      <div className={styles.pinkSquare} data-speed="blob" />

      {/* Outlined title top */}
      <h2 className={styles.titleTop} data-speed="fast" data-title-reveal>DESIGN</h2>

      {/* Accent label */}
      <span className={styles.yourLabel} data-stagger>C R A F T E D</span>

      {/* Center: Code block showcase instead of photo */}
      <div className={styles.codeShowcase} data-speed="slow" data-image-reveal>
        <div className={styles.codeHeader}>
          <span className={styles.codeDot} style={{ background: '#8B2500' }} />
          <span className={styles.codeDot} style={{ background: '#505050' }} />
          <span className={styles.codeDot} style={{ background: '#2C2C2C' }} />
          <span className={styles.codeFilename}>motion.tsx</span>
        </div>
        <pre className={styles.codeBlock}>
          <code>
{`const reveal = gsap.from(el, {
  y: 60,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out",
  scrollTrigger: {
    trigger: el,
    start: "top 80%",
  }
});`}
          </code>
        </pre>
      </div>

      {/* Bold title bottom */}
      <span className={styles.titleBottom} data-speed="fast" data-title-reveal>SYSTEMS</span>

      {/* Body text block */}
      <div className={styles.textBlock}>
        <h3 className={styles.textHeading} data-stagger>The art of interaction</h3>
        <p className={styles.textBody} data-text-fade>
          Every interface is a conversation. Through
          deliberate motion and thoughtful composition,
          I build experiences that feel alive.
        </p>
        <div className={styles.cta} data-stagger>
          <span>Explore Process</span>
          <span className={styles.ctaArrow} data-cta-arrow>————→</span>
        </div>
      </div>
    </section>
  );
}
