'use client';

import React from 'react';
import styles from './CraftSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

export default function CraftSlide() {
  return (
    <section className={styles.slide} id="craft-slide" data-slide="3">
      <FloatingBlob size="large" variant="pink" top="15%" left="40%" delay={0} />
      <FloatingBlob size="medium" variant="peach" bottom="10%" right="10%" delay={3} />

      <div className={styles.layoutGrid}>
        {/* Left Side: Massive Typography */}
        <div className={styles.leftColumn}>
          <div className={styles.labelWrapper} data-stagger>
            <span className={styles.dot} />
            <span className={styles.sectionLabel}>SERVICES</span>
          </div>
          
          <h2 className={styles.massiveTitle} data-speed="fast" data-title-reveal>
            WEB<br />& LENS
          </h2>
          
          <div className={styles.textBlock} data-stagger>
            <h3 className={styles.textHeading}>Two crafts, one vision</h3>
            <p className={styles.textBody}>
              Building performant websites with modern frameworks. Capturing stories through cinematic photography. Both demand precision, patience, and an eye for detail.
            </p>
          </div>
        </div>

        {/* Right Side: Showcase & Floating Logos */}
        <div className={styles.rightColumn} data-speed="slow">
          
          {/* Restored Editor Tab */}
          <div className={styles.glassCard} data-image-reveal>
            <div className={styles.cardHeader}>
              <div className={styles.macButtons}>
                <span className={styles.macBtn} style={{ background: '#FF5F56' }} />
                <span className={styles.macBtn} style={{ background: '#FFBD2E' }} />
                <span className={styles.macBtn} style={{ background: '#27C93F' }} />
              </div>
              <span className={styles.cardTitle}>digital_experience.ts</span>
            </div>
            
            <div className={styles.cardContent}>
              <pre className={styles.codeBlock}>
                <code>
{`class DigitalExperience {
  constructor(vision) {
    this.aesthetic = "Luxurious";
    this.performance = "Uncompromised";
    this.vision = vision;
  }

  render() {
    return (
      <Interface 
        smoothness={100} 
        impact="Maximum" 
      />
    );
  }

  capture(moment) {
    return new CinematicFrame(moment);
  }
}`}
                </code>
              </pre>
            </div>
            
            <div className={styles.cardFooter}>
              <div className={styles.footerTags}>
                <span>React</span>
                <span>WebGL</span>
                <span>Photography</span>
              </div>
            </div>
          </div>

          {/* Floating Logos Ecosystem */}
          <div className={styles.floatingEcosystem}>
             <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className={`${styles.techLogo} ${styles.node1}`} />
             <img src="https://cdn.simpleicons.org/nextdotjs/white" alt="Next.js" className={`${styles.techLogo} ${styles.node2}`} />
             <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" className={`${styles.techLogo} ${styles.node3}`} />
             <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" className={`${styles.techLogo} ${styles.node4}`} />
             <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg" alt="Photoshop" className={`${styles.techLogo} ${styles.node5}`} />
             <img src="https://cdn.simpleicons.org/threedotjs/white" alt="Three.js" className={`${styles.techLogo} ${styles.node6}`} />
             <img src="https://cdn.simpleicons.org/figma/F24E1E" alt="Figma" className={`${styles.techLogo} ${styles.node7}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
