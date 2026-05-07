'use client';

import React from 'react';
import styles from './PhilosophySlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

export default function PhilosophySlide() {
  return (
    <section className={styles.slide} id="philosophy-slide" data-slide="5">
      <FloatingBlob size="large" variant="pink" bottom="10%" right="0%" delay={2} />
      <FloatingBlob size="small" variant="peach" top="20%" left="35%" delay={0} />

      {/* Left: Moody portrait with vertical title */}
      <div className={styles.imageSection}>
        <div className={styles.pinkRect} data-speed="blob" />
        <img
          src="https://images.unsplash.com/photo-1504593811423-6dd665756598?w=500&h=800&fit=crop&crop=face"
          alt="Creative vision"
          className={styles.mainImage}
          data-speed="slow"
          data-image-reveal
        />
        <span className={styles.verticalTitle} data-speed="fast">
          CRAFT YOUR VISION
        </span>
      </div>

      {/* Right: Philosophy content */}
      <div className={styles.contentSection}>
        <h2 className={styles.sectionHeading} data-stagger>Design Philosophy</h2>

        <p className={styles.bodyText} data-text-fade>
          Great work lives at the intersection of form and
          function. Every interface, every frame, every cut
          should feel intentional — like <a href="#">ink on paper</a>.
        </p>

        <p className={styles.bodyText} data-text-fade>
          Minimalism isn&apos;t about doing less. It&apos;s about
          making every element count. The negative space
          speaks as loudly as the subject itself.
        </p>

        <div className={styles.cta} data-stagger>
          <span>Learn More</span>
          <span className={styles.ctaArrow} data-cta-arrow>————→</span>
        </div>
      </div>
    </section>
  );
}
