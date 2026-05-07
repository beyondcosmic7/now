'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './IntroLoader.module.css';

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'filled' | 'exiting' | 'done'>('loading');
  const containerRef = useRef<HTMLDivElement>(null);

  // Block scrolling while intro is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = current < 60 ? 1.2 : current < 85 ? 2.5 : 4;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setPhase('filled'), 200);
        setTimeout(() => setPhase('exiting'), 800);
        setTimeout(() => {
          setPhase('done');
          document.body.style.overflow = '';
          onComplete();
        }, 2000);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (phase === 'done') return null;

  const phaseClass =
    phase === 'filled' ? styles.filled :
    phase === 'exiting' ? styles.exiting : '';

  return (
    <div
      ref={containerRef}
      className={`${styles.intro} ${phaseClass}`}
    >
      <div className={styles.grain} />
      <span className={styles.kanjiTop}>空落</span>

      <div className={styles.wordContainer}>
        <svg
          className={styles.skyfallSvg}
          viewBox="0 0 900 140"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id="ink-fill-clip">
              <rect
                x="0"
                y={140 - (progress / 100) * 140}
                width="900"
                height={140}
              />
            </clipPath>
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

          <text x="450" y="110" textAnchor="middle" className={styles.outlineText}>
            SKYFALL
          </text>
          <text
            x="450" y="110" textAnchor="middle"
            className={styles.filledText}
            clipPath="url(#ink-fill-clip)"
            filter="url(#ink-edge)"
          >
            SKYFALL
          </text>
        </svg>

        <div
          className={styles.brushLine}
          style={{ width: `${Math.min(progress * 1.1, 100)}%` }}
        />
      </div>

      <div className={styles.progressInfo}>
        <span className={styles.progressNum}>
          {String(Math.floor(progress)).padStart(3, '0')}
        </span>
        <span className={styles.progressLabel}>%</span>
      </div>

      <p className={styles.tagline}>
        Akshan Khan — Developer &amp; Visual Artist
      </p>
    </div>
  );
}
