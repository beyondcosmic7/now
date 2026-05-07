'use client';

import React from 'react';
import styles from './SlideCounter.module.css';

interface SlideCounterProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function SlideCounter({ current, total, onPrev, onNext }: SlideCounterProps) {
  const formattedNum = String(current).padStart(2, '0');
  const progress = ((current - 1) / (total - 1)) * 100;

  return (
    <>
      {/* Progress pill in center bottom */}
      <div className={styles.progressPill}>
        <div
          className={styles.progressPillFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Counter + arrows bottom right */}
      <div className={styles.counter} id="slide-counter">
        <div className={styles.arrows}>
          <button className={styles.arrowBtn} onClick={onPrev} aria-label="Previous slide">
            ‹
          </button>
          <button className={styles.arrowBtn} onClick={onNext} aria-label="Next slide">
            ›
          </button>
        </div>
        <div className={styles.slideNumber}>
          <span className={styles.asterisk}>*</span>
          <div className={styles.numWrapper}>
            <div
              className={styles.numInner}
              style={{ transform: `translateY(-${(current - 1) * 3}rem)` }}
            >
              {Array.from({ length: total }, (_, i) => (
                <span key={i} className={styles.numDigit}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className={styles.socials}>
        <a href="#" className={styles.socialLink}>GH</a>
        <a href="#" className={styles.socialLink}>IG</a>
        <a href="#" className={styles.socialLink}>YT</a>
      </div>
    </>
  );
}
