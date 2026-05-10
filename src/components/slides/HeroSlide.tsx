'use client';

import React from 'react';
import styles from './HeroSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';
import DepthPoints from '../DepthPoints/DepthPoints';

export default function HeroSlide() {
  return (
    <section className={styles.slide} id="hero-slide" data-slide="1">
      <FloatingBlob size="medium" variant="pink" top="35%" left="20%" delay={2} />
      <FloatingBlob size="small" variant="peach" bottom="25%" right="25%" delay={5} />

      {/* Left: Depth Points Portrait + atmospheric elements */}
      <div className={styles.atmosphereHalf}>
        {/* 3D Particle Portrait */}
        <DepthPoints />

        {/* Single thin vertical line */}
        <div className={styles.vertLine} />

        {/* Quiet kanji — large but ghostly */}
        <span className={styles.kanjiGhost} data-speed="slow">墨</span>

        {/* Small index number */}
        <span className={styles.indexNum} data-stagger>01</span>
      </div>

      {/* Right: The introduction — calm, confident */}
      <div className={styles.introHalf}>
        {/* Role — tiny, understated */}
        <div className={styles.roleRow} data-stagger>
          <span className={styles.roleLine} />
          <span className={styles.roleText}>Web Developer & Photographer</span>
        </div>

        {/* The name — refined, not loud */}
        <div className={styles.nameBlock}>
          <h1 className={styles.firstName} data-title-reveal>Akshan</h1>
          <p className={styles.lastName} data-stagger>Khan</p>
        </div>

        {/* Brief descriptor */}
        <p className={styles.descriptor} data-text-fade>
          Building digital experiences &<br />
          capturing moments through the lens.
        </p>

        {/* Minimal CTA */}
        <a className={styles.cta} data-stagger href="#works">
          <span className={styles.ctaText}>Selected Works</span>
          <span className={styles.ctaArrow} data-cta-arrow>→</span>
        </a>
      </div>

      {/* Bottom edge — location & year, very quiet */}
      <div className={styles.bottomEdge}>
        <span className={styles.edgeText} data-stagger>Kota, India</span>
        <span className={styles.edgeText} data-stagger>Portfolio 2024</span>
      </div>
    </section>
  );
}
