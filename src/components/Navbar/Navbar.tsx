'use client';

import React from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = ['Works', 'About', 'Services', 'Contact'];

export default function Navbar() {
  return (
    <nav className={styles.navbar} id="navbar">
      <div className={styles.logo}>
        <span className={styles.logoKey}>墨</span>
        <span className={styles.logoName}>AK</span>
      </div>

      <ul className={styles.navLinks}>
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} className={styles.navLink}>
              {link}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.navActions}>
        <button className={styles.shareBtn} aria-label="Share">
          ↗
        </button>
        <button className={styles.menuBtn} aria-label="Menu">
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>
      </div>
    </nav>
  );
}
