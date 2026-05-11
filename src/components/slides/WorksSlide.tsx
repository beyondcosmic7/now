'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './WorksSlide.module.css';
import FloatingBlob from '../FloatingBlob/FloatingBlob';

const PROJECTS = [
  {
    num: '01',
    title: 'Happy Hamper',
    type: 'E-Commerce / Web App',
    url: 'https://happyhamper.vercel.app/',
    image: '/happyhamper.png',
    year: '2024',
  },
  {
    num: '02',
    title: 'ElectiQ',
    type: 'Corporate / Branding',
    url: 'https://electiq-in.vercel.app/',
    image: '/electiq.png',
    year: '2024',
  },
  {
    num: '03',
    title: 'TVA',
    type: 'Creative Agency / Portfolio',
    url: 'https://tva-v1.vercel.app/',
    image: '/tva.png',
    year: '2024',
  },
];

export default function WorksSlide() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.slide} id="works-slide" data-slide="4">
      <FloatingBlob size="large" variant="pink" top="10%" right="10%" delay={1} />
      
      <div className={styles.layoutGrid}>
        
        {/* Left: Interactive Project List */}
        <div className={styles.listColumn}>
          <div className={styles.headerRow} data-stagger>
            <span className={styles.sectionLabel}>SELECTED WORKS</span>
            <span className={styles.counter}>( {PROJECTS.length} )</span>
          </div>

          <div className={styles.projectList}>
            {PROJECTS.map((project, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={project.title}
                  className={`${styles.projectItem} ${isActive ? styles.active : ''}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  data-stagger
                >
                  <div className={styles.itemHeader}>
                    <span className={styles.itemNum}>{project.num}</span>
                    <span className={styles.itemYear}>{project.year}</span>
                  </div>
                  <h3 className={styles.itemTitle}>{project.title}</h3>
                  <span className={styles.itemType}>{project.type}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Massive Media Preview */}
        <div className={styles.mediaColumn} data-speed="slow">
          <div className={styles.mediaContainer}>
            {PROJECTS.map((project, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={project.title} 
                  className={`${styles.mediaLayer} ${isActive ? styles.activeLayer : ''}`}
                >
                  {/* Luxury Browser Frame */}
                  <div className={styles.browserFrame}>
                    <div className={styles.browserHeader}>
                      <div className={styles.dots}>
                        <span /> <span /> <span />
                      </div>
                      <div className={styles.urlBar}>{new URL(project.url).hostname}</div>
                    </div>
                    
                    <div className={styles.iframeWrap}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={styles.projectImage}
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* View Live Button Overlay */}
            <a 
              href={PROJECTS[activeIndex].url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.viewLiveBtn}
            >
              <span>EXPLORE</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
