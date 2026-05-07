'use client';

import React from 'react';
import styles from './ProjectsSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

export default function ProjectsSlide() {
  return (
    <section className={styles.slide} id="projects-slide" data-slide="6">
      <FloatingBlob size="large" variant="pink" top="30%" left="10%" delay={0} />
      <FloatingBlob size="small" variant="peach" bottom="20%" right="30%" delay={4} />

      {/* Title with strikethrough */}
      <div className={styles.titleBlock} data-speed="fast">
        <h2 className={styles.title} data-title-reveal>
          SELECTED WORKS
          <br />
          <span style={{ marginLeft: '15%' }}>REEL 2024</span>
          <div className={styles.strikethrough} />
        </h2>
      </div>

      {/* Content row: photos + text */}
      <div className={styles.contentRow}>
        <div className={styles.photosBlock}>
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop"
            alt="Web project"
            className={styles.photo1}
            data-speed="slow"
            data-image-reveal
          />
          <img
            src="https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?w=600&h=400&fit=crop"
            alt="Film project"
            className={styles.photo2}
            data-speed="slow"
            data-image-reveal
          />
        </div>

        <div className={styles.textBlock}>
          <h3 className={styles.textHeading} data-stagger>
            Web apps, photo stories<br />
            and short films
          </h3>
          <p className={styles.textBody} data-text-fade>
            A curated selection of recent work spanning
            full-stack development, editorial photography,
            and cinematic short films.
          </p>
          <div className={styles.cta} data-stagger>
            <span>View All</span>
            <span className={styles.ctaArrow} data-cta-arrow>————→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
