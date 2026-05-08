'use client';

import React from 'react';
import styles from './AboutSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';
import AnimatedMap from '../AnimatedMap/AnimatedMap';

export default function AboutSlide() {
  return (
    <section className={styles.slide} id="about-slide" data-slide="2">

      {/* Left: Animated Kota city map — draws itself like ink painting */}
      <div className={styles.mapHalf}>
        <AnimatedMap />
        {/* Map text overlays */}
        <div className={styles.mapOverlay}>
          <span className={styles.mapLabel} data-stagger>Currently based in</span>
          <h4 className={styles.mapCity} data-stagger>KOTA</h4>
          <span className={styles.mapCoords} data-stagger>25.2138° N, 75.8648° E</span>
        </div>
        {/* Kanji accent top-right */}
        <span className={styles.mapKanji} data-stagger>古田</span>
        {/* Pulsing location pin */}
        <div className={styles.mapPin} />
        {/* Corner label */}
        <span className={styles.mapCornerLabel}>Rajasthan, India</span>
      </div>

      {/* Right: About content */}
      <div className={styles.rightContent}>
        <div className={styles.sectionLabel} data-stagger>
          <span className={styles.labelLine} />
          <span>About</span>
        </div>

        <h3 className={styles.heading} data-stagger>
          Developer &amp;<br />Design Engineer
        </h3>

        <p className={styles.bodyText} data-text-fade>
          I build interfaces that feel alive. Obsessed with 
          the details — from micro-interactions to fluid 
          page transitions. Every pixel is intentional,
          every animation has purpose.
        </p>

        {/* Tech stack showcase */}
        <div className={styles.techGrid} data-stagger>
          <span className={styles.techItem}>React</span>
          <span className={styles.techItem}>Next.js</span>
          <span className={styles.techItem}>GSAP</span>
          <span className={styles.techItem}>Three.js</span>
          <span className={styles.techItem}>TypeScript</span>
          <span className={styles.techItem}>Figma</span>
        </div>

        <div className={styles.statRow} data-stagger>
          <div className={styles.stat}>
            <span className={styles.statNum}>03+</span>
            <span className={styles.statLabel}>Years</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>20+</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>∞</span>
            <span className={styles.statLabel}>Curiosity</span>
          </div>
        </div>
      </div>

      <FloatingBlob size="small" variant="pink" top="70%" right="5%" delay={2} />
    </section>
  );
}
