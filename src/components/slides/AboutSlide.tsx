'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './AboutSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';
import AnimatedMap from '../AnimatedMap/AnimatedMap';

interface AboutSlideProps {
  containerAnimation?: gsap.core.Tween | null;
}

export default function AboutSlide({ containerAnimation }: AboutSlideProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className={styles.slide} id="about-slide" data-slide="2">

      {/* Left: Animated Kota city map */}
      <div className={styles.mapHalf}>
        <AnimatedMap containerAnimation={containerAnimation} />
        <div className={styles.mapOverlay}>
          <span className={styles.mapLabel} data-stagger>Currently based in</span>
          <h4 className={styles.mapCity} data-stagger>KOTA</h4>
          <span className={styles.mapCoords} data-stagger>25.2138° N, 75.8648° E</span>
        </div>
        <span className={styles.mapKanji} data-stagger>古田</span>
        <div className={styles.mapPin} />
        <span className={styles.mapCornerLabel}>Rajasthan, India</span>
      </div>

      {/* Middle: Text Content (40%) */}
      <div className={styles.textHalf}>
        <div className={styles.sectionLabel} data-stagger>
          <span className={styles.labelLine} />
          <span>About</span>
        </div>

        <h3 className={styles.heading} data-stagger>
          Web Developer &amp;<br />Photographer
        </h3>

        <p className={styles.bodyText} data-text-fade>
          I build websites that feel alive and capture 
          moments that tell stories. From pixel-perfect 
          interfaces to cinematic compositions — obsessed 
          with every detail.
        </p>

        <div className={styles.techGrid} data-stagger>
          <span className={styles.techItem}>React</span>
          <span className={styles.techItem}>Next.js</span>
          <span className={styles.techItem}>Three.js</span>
          <span className={styles.techItem}>TypeScript</span>
          <span className={styles.techItem}>Lightroom</span>
          <span className={styles.techItem}>Photography</span>
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

      {/* Right: Full Bleed Image (25%) */}
      <div 
        className={styles.imageHalf} 
        onClick={() => setModalOpen(true)}
        data-stagger
        aria-label="View full profile"
      >
        <img
          src="/images/about-photo.jpg"
          alt="Akshan Khan"
          className={styles.fullPortrait}
          loading="lazy"
        />
        <div className={styles.profileBtnOverlay}>
          <span className={styles.overlayText}>View Profile</span>
        </div>
      </div>

      {/* ── Profile Modal ── */}
      {modalOpen && createPortal(
        <div className={styles.modalBackdrop} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              className={styles.modalClose}
              onClick={() => setModalOpen(false)}
              aria-label="Close profile"
            >
              ✕
            </button>

            <div className={styles.modalGrid}>
              {/* Left — Large photo */}
              <div className={styles.modalPhoto}>
                <img src="/images/about-photo.jpg" alt="Akshan Khan" />
              </div>

              {/* Right — Bio info */}
              <div className={styles.modalContent}>
                <span className={styles.modalLabel}>Profile</span>
                <h2 className={styles.modalName}>Akshan Khan</h2>
                <p className={styles.modalRole}>Web Developer & Photographer</p>

                <div className={styles.modalDivider} />

                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Background</h4>
                  <p className={styles.modalText}>
                    Based in Kota, India. I build high-fidelity web experiences
                    and capture cinematic photography. Passionate about the 
                    intersection of code and visual storytelling — where 
                    pixels meet light.
                  </p>
                </div>

                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Education</h4>
                  <p className={styles.modalText}>
                    B.Tech in Computer Science — Currently pursuing
                  </p>
                </div>

                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Interests</h4>
                  <div className={styles.modalTags}>
                    <span>Creative Coding</span>
                    <span>Motion Design</span>
                    <span>Street Photography</span>
                    <span>Japanese Aesthetics</span>
                    <span>Cinematic Color</span>
                    <span>Web Performance</span>
                  </div>
                </div>

                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Contact</h4>
                  <p className={styles.modalText}>
                    beyond.cosmic7@gmail.com<br />
                    github.com/beyondcosmic7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <FloatingBlob size="small" variant="pink" top="70%" right="5%" delay={2} />
    </section>
  );
}
