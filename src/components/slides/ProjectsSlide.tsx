'use client';

import React from 'react';
import styles from './ProjectsSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

const PROJECTS = [
  { num: '01', title: 'Portfolio Website', tech: 'Next.js · GSAP · Three.js', year: '2024' },
  { num: '02', title: 'Photography Gallery', tech: 'React · Lightroom · WebGL', year: '2024' },
  { num: '03', title: 'E-Commerce Store', tech: 'Next.js · Stripe · Node', year: '2023' },
];

export default function ProjectsSlide() {
  return (
    <section className={styles.slide} id="projects-slide" data-slide="6">
      <FloatingBlob size="large" variant="pink" top="30%" left="10%" delay={0} />
      <FloatingBlob size="small" variant="peach" bottom="20%" right="30%" delay={4} />

      {/* Title */}
      <div className={styles.titleBlock} data-speed="fast">
        <h2 className={styles.title} data-title-reveal>
          SELECTED WORKS
          <br />
          <span style={{ marginLeft: '15%' }}>REEL 2024</span>
          <div className={styles.strikethrough} />
        </h2>
      </div>

      {/* Project list — no photos, pure design */}
      <div className={styles.projectList}>
        {PROJECTS.map((project) => (
          <div key={project.num} className={styles.projectRow} data-stagger>
            <span className={styles.projectNum}>{project.num}</span>
            <div className={styles.projectInfo}>
              <span className={styles.projectTitle}>{project.title}</span>
              <span className={styles.projectTech}>{project.tech}</span>
            </div>
            <span className={styles.projectYear}>{project.year}</span>
            <span className={styles.projectArrow}>→</span>
          </div>
        ))}
      </div>

      {/* Bottom text */}
      <div className={styles.textBlock}>
        <p className={styles.textBody} data-text-fade>
          A curated selection of recent work spanning
          full-stack development, design systems,
          and interactive experiences.
        </p>
        <div className={styles.cta} data-stagger>
          <span>View All</span>
          <span className={styles.ctaArrow} data-cta-arrow>————→</span>
        </div>
      </div>
    </section>
  );
}
