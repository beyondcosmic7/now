'use client';

import React from 'react';
import styles from './HeroSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

export default function HeroSlide() {
  return (
    <section className={styles.slide} id="hero-slide" data-slide="1">
      <FloatingBlob size="large" variant="pink" top="20%" left="60%" delay={1} />
      <FloatingBlob size="small" variant="peach" bottom="30%" left="15%" delay={4} />

      {/* Grid overlay — subtle design DNA */}
      <div className={styles.gridOverlay}>
        <div className={styles.gridLine} />
        <div className={styles.gridLine} />
        <div className={styles.gridLine} />
      </div>

      {/* Top bar: Role + Year */}
      <div className={styles.topBar}>
        <span className={styles.roleTag} data-stagger>Web Developer &amp; Design Engineer</span>
        <span className={styles.yearTag} data-stagger>© 2024</span>
      </div>

      {/* ===== THE NAME — Full-bleed typographic centerpiece ===== */}
      <div className={styles.nameComposition} data-speed="fast">
        {/* First name — massive, filled, dominant */}
        <h1 className={styles.firstName} data-title-reveal>AKSHAN</h1>

        {/* Divider line with role */}
        <div className={styles.nameDivider} data-stagger>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>開発者 — Developer</span>
          <span className={styles.dividerLine} />
        </div>

        {/* Last name — outlined, elegant contrast */}
        <span className={styles.lastName} data-title-reveal>KHAN</span>
      </div>

      {/* Bottom info row */}
      <div className={styles.bottomRow}>
        <div className={styles.locationBlock} data-stagger>
          <span className={styles.locationDot} />
          <span className={styles.locationText}>Kota, India</span>
        </div>

        <div className={styles.skillPills} data-stagger>
          <span className={styles.pill}>React</span>
          <span className={styles.pill}>Next.js</span>
          <span className={styles.pill}>GSAP</span>
          <span className={styles.pill}>UI/UX</span>
        </div>

        <div className={styles.scrollHint} data-stagger>
          <span className={styles.scrollText}>Scroll</span>
          <span className={styles.scrollArrow}>→</span>
        </div>
      </div>

      {/* Vertical kanji accent — right edge */}
      <span className={styles.kanjiAccent} data-stagger>墨</span>
    </section>
  );
}
