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
          window.dispatchEvent(new CustomEvent('introComplete'));
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

      <div className={styles.terminalContainer}>
        <div className={styles.terminalHeader}>
          <span className={styles.dot} style={{ background: '#FF5F56' }} />
          <span className={styles.dot} style={{ background: '#FFBD2E' }} />
          <span className={styles.dot} style={{ background: '#27C93F' }} />
          <span className={styles.terminalTitle}>boot_sequence.exe</span>
        </div>

        <div className={styles.terminalBody}>
          <p className={styles.typeWriter}>&gt; SYSTEM BOOT INITIATED...</p>
          <p className={styles.typeWriter} style={{ animationDelay: '0.5s' }}>&gt; MOUNTING ASSETS...</p>
          <p className={styles.typeWriter} style={{ animationDelay: '1s' }}>&gt; INITIALIZING PROTOCOL: <span className={styles.accent}>skyfall</span></p>

          <div className={styles.wordContainer}>
            <svg
              className={styles.skyfallSvg}
              viewBox="0 0 260 50"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <clipPath id="ink-fill-clip">
                  <rect
                    x="0"
                    y={50 - (progress / 100) * 50}
                    width="260"
                    height={50}
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

              <text x="130" y="40" textAnchor="middle" className={styles.outlineText}>
                skyfall
              </text>
              <text
                x="130" y="40" textAnchor="middle"
                className={styles.filledText}
                clipPath="url(#ink-fill-clip)"
                filter="url(#ink-edge)"
              >
                skyfall
              </text>
            </svg>
          </div>

          <div className={styles.progressWrapper}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.progressText}>
              [ {String(Math.floor(progress)).padStart(3, '0')}% ]
            </span>
          </div>
        </div>
      </div>

      <p className={styles.tagline}>
        Akshan Khan — Developer &amp; Visual Artist
      </p>
    </div>
  );
}
