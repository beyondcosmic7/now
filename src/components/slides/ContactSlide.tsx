'use client';

import React from 'react';
import styles from './ContactSlide.module.css';

interface ContactSlideProps {
  onRewind: () => void;
}

export default function ContactSlide({ onRewind }: ContactSlideProps) {
  return (
    <section className={styles.slide} id="contact-slide" data-slide="7">
      <div className={styles.footerPanel}>
        {/* Rewind */}
        <button className={styles.rewindBtn} onClick={onRewind} data-stagger>
          <span className={styles.rewindArrow}>←</span>
          <span>Rewind</span>
        </button>

        <div className={styles.divider} data-stagger />
        <h2 className={styles.contactTitle} data-stagger data-speed="fast">
          Let&apos;s Work<br />Together
        </h2>

        <label className={styles.inputLabel} data-text-fade>Drop your email</label>
        <div className={styles.inputRow} data-stagger>
          <input
            type="email"
            className={styles.emailInput}
            placeholder="hello@example.com"
            id="contact-email"
          />
          <button className={styles.sendBtn} id="contact-send">
            Send
          </button>
        </div>

        <span className={styles.copyright}>
          © 2024 Akshan Khan. All rights reserved.
        </span>
      </div>
    </section>
  );
}
