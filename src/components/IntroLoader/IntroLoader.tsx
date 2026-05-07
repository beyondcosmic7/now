'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './IntroLoader.module.css';

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading with accelerating progress
    let current = 0;
    const interval = setInterval(() => {
      // Accelerate towards the end
      const increment = current < 60 ? 1.2 : current < 85 ? 2.5 : 4;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Hold at 100% for a beat, then exit
        setTimeout(() => {
          setIsExiting(true);
          // Wait for exit animation to finish
          setTimeout(() => {
            onComplete();
          }, 1200);
        }, 400);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className={`${styles.intro} ${isExiting ? styles.exiting : ''}`}
    >
      {/* Subtle background texture grain */}
      <div className={styles.grain} />

      {/* Japanese accent — top right */}
      <span className={styles.kanjiTop}>空落</span>

      {/* Main SKYFALL text with ink fill */}
      <div className={styles.wordContainer}>
        <svg
          className={styles.skyfallSvg}
          viewBox="0 0 900 140"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Clip path for the ink fill — rises from bottom */}
            <clipPath id="ink-fill-clip">
              <rect
                x="0"
                y={140 - (progress / 100) * 140}
                width="900"
                height={140}
              />
            </clipPath>

            {/* Slight turbulence for organic ink edge */}
            <filter id="ink-edge">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04"
                numOctaves="4"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>

          {/* Outlined (hollow) text — always visible */}
          <text
            x="450"
            y="110"
            textAnchor="middle"
            className={styles.outlineText}
          >
            SKYFALL
          </text>

          {/* Filled text — clipped by rising ink */}
          <text
            x="450"
            y="110"
            textAnchor="middle"
            className={styles.filledText}
            clipPath="url(#ink-fill-clip)"
            filter="url(#ink-edge)"
          >
            SKYFALL
          </text>
        </svg>

        {/* Brush stroke underline */}
        <div
          className={styles.brushLine}
          style={{ width: `${Math.min(progress * 1.1, 100)}%` }}
        />
      </div>

      {/* Loading percentage */}
      <div className={styles.progressInfo}>
        <span className={styles.progressNum}>
          {String(Math.floor(progress)).padStart(3, '0')}
        </span>
        <span className={styles.progressLabel}>%</span>
      </div>

      {/* Bottom tagline */}
      <p className={styles.tagline}>
        Akshan Khan — Developer &amp; Visual Artist
      </p>
    </div>
  );
}
