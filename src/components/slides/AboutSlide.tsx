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

      {/* Right: About content */}
      <div className={styles.rightContent}>
        {/* Portrait — clickable, larger */}
        <button
          className={styles.portraitBtn}
          onClick={() => setModalOpen(true)}
          data-stagger
          aria-label="View full profile"
        >
          <div className={styles.portraitWrap}>
            <img
              src="/ME.jpeg"
              alt="Akshan Khan"
              className={styles.portrait}
              loading="lazy"
            />
            <div className={styles.portraitShine} />
          </div>
          <span className={styles.portraitHint}>View Profile</span>
        </button>

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
                <img src="/ME.jpeg" alt="Akshan Khan" />
              </div>

              {/* Right — Bio info */}
              <div className={styles.modalContent}>
                <span className={styles.modalLabel}>Profile</span>
                <h2 className={styles.modalName}>Akshan Khan</h2>
                <p className={styles.modalRole}>Developer & Design Engineer</p>

                <div className={styles.modalDivider} />

                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Background</h4>
                  <p className={styles.modalText}>
                    Based in Kota, India. Specializing in crafting high-fidelity
                    web experiences with a focus on motion design, 3D visuals,
                    and pixel-perfect interfaces. Passionate about the intersection
                    of engineering and aesthetics.
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
                    <span>3D Visuals</span>
                    <span>Japanese Aesthetics</span>
                    <span>Typography</span>
                    <span>Open Source</span>
                  </div>
                </div>

                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionTitle}>Contact</h4>
                  <p className={styles.modalText}>
                    akshankhan@example.com<br />
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
