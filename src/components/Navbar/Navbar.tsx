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
        {/* Theodore-style wavy menu button */}
        <button className={styles.menuBtn} aria-label="Menu">
          <svg className={styles.menuSvg} width="22" height="14" viewBox="0 0 19 12" fill="none">
            <path
              d="m.742 3.26.485.874c.043-.024.13-.07.26-.136.22-.11.476-.233.765-.361A22.92 22.92 0 0 1 4.997 2.62c4.476-1.34 8.75-1.219 12.241 1.1.18.12.357.245.531.376l.6-.8a12.46 12.46 0 0 0-.578-.408C14.008.375 9.443.246 4.71 1.663c-1.037.31-2 .675-2.865 1.06a18.83 18.83 0 0 0-1.103.536Z"
              fill="currentColor"
            />
            <path
              d="m.742 6.748.485.874c.043-.023.13-.07.26-.135.22-.111.476-.233.765-.362A22.92 22.92 0 0 1 4.997 6.11c4.476-1.34 8.75-1.22 12.241 1.1.18.12.357.245.531.375l.6-.8a12.46 12.46 0 0 0-.578-.408C14.008 3.864 9.443 3.735 4.71 5.152c-1.037.31-2 .675-2.865 1.06a18.83 18.83 0 0 0-1.103.536Z"
              fill="currentColor"
            />
            <path
              d="m.742 10.237.485.874c.043-.024.13-.07.26-.136.22-.11.476-.232.765-.36a22.92 22.92 0 0 1 2.745-1.016c4.476-1.34 8.75-1.22 12.241 1.1.18.12.357.244.531.375l.6-.8a12.46 12.46 0 0 0-.578-.408C14.008 7.353 9.443 7.224 4.71 8.64c-1.037.31-2 .674-2.865 1.06a18.83 18.83 0 0 0-1.103.536Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
