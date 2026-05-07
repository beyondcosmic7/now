'use client';

import React from 'react';
import styles from './AboutSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

export default function AboutSlide() {
  return (
    <section className={styles.slide} id="about-slide" data-slide="2">
      {/* Background elements */}
      <div className={styles.rustBlock} data-speed="blob" />
      <h2 className={styles.editorialBg} data-speed="fast">
        AKS<br />HAN
      </h2>

      {/* Left: Portrait photo */}
      <div className={styles.leftContent}>
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face"
          alt="Akshan working"
          className={styles.centerPhoto}
          data-speed="slow"
          data-image-reveal
        />
      </div>

      {/* Right: About content + Map */}
      <div className={styles.rightContent}>
        <div className={styles.sectionLabel} data-stagger>
          <span className={styles.labelLine} />
          <span>About Me</span>
        </div>

        <h3 className={styles.heading} data-stagger>Developer &amp; Visual Artist</h3>

        <p className={styles.bodyText} data-text-fade>
          Crafting digital experiences at the intersection of code
          and visual storytelling. From responsive web applications
          to cinematic frames — every project is an exercise
          in precision and creative vision.
        </p>

        {/* City Map with overlaid text */}
        <div className={styles.mapContainer} data-image-reveal>
          <img
            src="/kota_japanese_ink_20260507_105921.png"
            alt="Kota city map"
            className={styles.mapImage}
          />
          {/* Animated text overlays */}
          <div className={styles.mapOverlay}>
            <span className={styles.mapLabel} data-stagger>Currently based in</span>
            <h4 className={styles.mapCity} data-stagger>KOTA</h4>
            <span className={styles.mapKanji} data-stagger>古田</span>
            <span className={styles.mapCoords} data-stagger>25.2138° N, 75.8648° E</span>
          </div>
          {/* Location pin dot */}
          <div className={styles.mapPin} />
        </div>
      </div>

      <FloatingBlob size="small" variant="pink" top="70%" right="5%" delay={2} />
    </section>
  );
}
