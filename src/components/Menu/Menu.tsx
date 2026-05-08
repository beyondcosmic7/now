'use client';

import React from 'react';
import styles from './Menu.module.css';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { label: 'Works', sub: 'portfolio' },
  { label: 'About', sub: 'background' },
  { label: 'Services', sub: 'offerings' },
  { label: 'Contact', sub: 'connect' },
];

export default function Menu({ isOpen, onClose }: MenuProps) {
  // Use a more complex path for the wipe transition
  // We'll use two sets of paths to create a more organic feel
  const openPath = 'M 0 0 V 100 Q 50 100 100 100 V 0 z';
  const closedPath = 'M 0 0 V 0 Q 50 0 100 0 V 0 z';

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
      {/* SVG path wipe transition */}
      <svg
        className={styles.svgOverlay}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          className={styles.overlayPath}
          d={isOpen ? openPath : closedPath}
        />
      </svg>

      {/* Menu content */}
      <div className={styles.content}>
        {/* Left: Navigation */}
        <nav className={styles.nav}>
          {MENU_ITEMS.map((item, i) => (
            <a
              key={item.label}
              href={`#${item.label.toLowerCase()}`}
              className={styles.navItem}
              style={{ transitionDelay: isOpen ? `${0.3 + i * 0.08}s` : '0s' }}
              onClick={onClose}
            >
              <span className={styles.navItemSub}>{item.sub}</span>
              <span className={styles.navItemText}>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right: Info */}
        <div className={styles.info}>
          <div
            className={styles.infoBlock}
            style={{ transitionDelay: isOpen ? '0.5s' : '0s' }}
          >
            <span className={styles.infoLabel}>Location</span>
            <p className={styles.infoText}>Kota, Rajasthan</p>
          </div>
          <div
            className={styles.infoBlock}
            style={{ transitionDelay: isOpen ? '0.6s' : '0s' }}
          >
            <span className={styles.infoLabel}>Contact</span>
            <p className={styles.infoText}>hello@akshankhan.com</p>
          </div>
          <div
            className={styles.infoBlock}
            style={{ transitionDelay: isOpen ? '0.7s' : '0s' }}
          >
            <span className={styles.infoLabel}>Social</span>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink}>GitHub</a>
              <a href="#" className={styles.socialLink}>Instagram</a>
              <a href="#" className={styles.socialLink}>YouTube</a>
            </div>
          </div>

          {/* Japanese accent */}
          <span
            className={styles.kanjiAccent}
            style={{ transitionDelay: isOpen ? '0.8s' : '0s' }}
          >
            目次
          </span>
        </div>
      </div>
    </div>
  );
}
