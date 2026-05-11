'use client';

import React from 'react';
import styles from './ContactSlide.module.css';

interface ContactSlideProps {
  onRewind: () => void;
}

export default function ContactSlide({ onRewind }: ContactSlideProps) {
  return (
    <section className={styles.slide} id="contact-slide" data-slide="6">
      {/* Floating Social Icons Background Ecosystem */}
      <div className={styles.floatingEcosystem}>
        <a href="https://www.instagram.com/__akshann/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.social1}`}>
          <img src="https://cdn.simpleicons.org/instagram/white" alt="Instagram" />
        </a>
        <a href="https://www.linkedin.com/in/akshan-khan-42a49929a/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.social2}`}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" />
        </a>
        <a href="https://x.com/acrosscosmic" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.social3}`}>
          <img src="https://cdn.simpleicons.org/x/white" alt="X (Twitter)" />
        </a>
        <a href="https://github.com/beyondcosmic7" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.social4}`}>
          <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" />
        </a>
        <a href="mailto:beyond.cosmic7@gmail.com" className={`${styles.socialIcon} ${styles.social5}`}>
          <img src="https://cdn.simpleicons.org/gmail/white" alt="Email" />
        </a>
      </div>

      <div className={styles.container}>
        
        <div className={styles.mainContent}>
          <h2 className={styles.massiveTitle} data-stagger data-speed="fast">
            LET&apos;S<br />TALK.
          </h2>

          <div className={styles.linksRow} data-stagger>
            <a href="mailto:beyond.cosmic7@gmail.com" className={styles.magneticLink}>
              beyond.cosmic7@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/akshan-khan-42a49929a/" target="_blank" rel="noreferrer" className={styles.magneticLink}>
              LinkedIn
            </a>
            <a href="https://www.instagram.com/__akshann/" target="_blank" rel="noreferrer" className={styles.magneticLink}>
              Instagram
            </a>
          </div>
        </div>

        <div className={styles.footerRow}>
          <span className={styles.copyright}>© 2026 Akshan Khan. All rights reserved.</span>
          
          <button className={styles.rewindBtn} onClick={onRewind}>
            <span className={styles.rewindArrow}>←</span>
            <span>BACK TO START</span>
          </button>
        </div>

      </div>
    </section>
  );
}
