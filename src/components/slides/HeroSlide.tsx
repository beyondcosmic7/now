'use client';

import React from 'react';
import styles from './HeroSlide.module.css';
import DepthPoints from '../DepthPoints/DepthPoints';

export default function HeroSlide() {
  return (
    <section className={styles.slide} id="hero-slide" data-slide="1">
      {/* 3D Cinematic Backdrop */}
      <div className={styles.background3D}>
        <DepthPoints />
      </div>

      {/* Content — clean and minimal */}
      <div className={styles.contentOverlay}>

        {/* Name — centered, hero font, clean layout */}
        <div className={styles.nameSection}>
          <h1 className={styles.nameText} data-hero-name>
            <span className={styles.firstName}>Akshan</span>
            <span className={styles.lastName}>Khan</span>
          </h1>
          
          <div className={styles.subtitleRow} data-hero-subtitle>
            <span className={styles.dash} />
            <span className={styles.subtitle}>Web Developer & Photographer</span>
            <span className={styles.dash} />
          </div>
        </div>

        {/* Bottom corner whispers */}
        <div className={styles.bottomRow}>
          <span className={styles.whisper} data-hero-fade>PORTFOLIO 2025</span>
          <span className={styles.whisper} data-hero-fade>KOTA, INDIA</span>
        </div>
      </div>
    </section>
  );
}
