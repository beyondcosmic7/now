'use client';

import React from 'react';
import styles from './WorksSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

const PROJECTS = [
  {
    title: 'Skyfall Portfolio',
    tech: 'Next.js · GSAP · Three.js',
    url: 'https://brittanychiang.com',
    year: '2024',
  },
  {
    title: 'E-Commerce Platform',
    tech: 'React · Node · Stripe',
    url: 'https://www.apple.com/store',
    year: '2024',
  },
  {
    title: 'Photography Studio',
    tech: 'Next.js · Framer Motion',
    url: 'https://unsplash.com',
    year: '2023',
  },
];

export default function WorksSlide() {
  return (
    <section className={styles.slide} id="works-slide" data-slide="4">
      <FloatingBlob size="large" variant="pink" top="15%" left="5%" delay={1} />

      {/* Left: Title + text */}
      <div className={styles.leftContent}>
        <div className={styles.sectionLabel} data-stagger>
          <span className={styles.labelLine} />
          <span>Selected Works</span>
        </div>

        <h2 className={styles.title} data-speed="fast" data-title-reveal>
          LIVE<br />WORKS
        </h2>

        <p className={styles.bodyText} data-text-fade>
          Websites built with performance and aesthetics
          in mind. Hover to preview, click to visit.
        </p>
      </div>

      {/* Right: Live preview cards */}
      <div className={styles.previewGrid}>
        {PROJECTS.map((project, i) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.previewCard}
            data-stagger
          >
            {/* Browser frame */}
            <div className={styles.browserFrame}>
              <div className={styles.browserBar}>
                <span className={styles.browserDot} />
                <span className={styles.browserDot} />
                <span className={styles.browserDot} />
                <span className={styles.browserUrl}>{new URL(project.url).hostname}</span>
              </div>
              <div className={styles.iframeWrap}>
                <iframe
                  src={project.url}
                  title={project.title}
                  className={styles.iframe}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  tabIndex={-1}
                />
              </div>
            </div>

            {/* Hover overlay */}
            <div className={styles.cardOverlay}>
              <span className={styles.visitLabel}>Visit Site →</span>
            </div>

            {/* Info below card */}
            <div className={styles.cardInfo}>
              <span className={styles.cardNum}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.cardMeta}>
                <span className={styles.cardTitle}>{project.title}</span>
                <span className={styles.cardTech}>{project.tech}</span>
              </div>
              <span className={styles.cardYear}>{project.year}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
