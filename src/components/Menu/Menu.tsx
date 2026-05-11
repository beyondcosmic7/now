'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from './Menu.module.css';

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.themeToggleFallback} />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      className={`${styles.themeToggle} ${!isDark ? styles.themeToggleLight : ''}`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle Theme"
    >
      <div className={styles.themeToggleIndicator}>
        <span className={styles.themeToggleIcon}>
          {isDark ? '朔' : '望'}
        </span>
      </div>
      <span className={styles.themeToggleText}>
        {isDark ? 'Sumi (Dark)' : 'Washi (Light)'}
      </span>
    </button>
  );
}

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

const MENU_ITEMS = [
  { label: 'Works', sub: 'portfolio' },
  { label: 'About', sub: 'background' },
  { label: 'Services', sub: 'offerings' },
  { label: 'Contact', sub: 'connect' },
];

const LINK_TO_SLIDE_INDEX: Record<string, number> = {
  'About': 1,
  'Services': 2,
  'Works': 3,
  'Contact': 5,
};

export default function Menu({ isOpen, onClose, onNavigate }: MenuProps) {
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
          {MENU_ITEMS.map((item, i) => {
            const slideIndex = LINK_TO_SLIDE_INDEX[item.label];
            return (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase()}`}
                className={styles.navItem}
                style={{ transitionDelay: isOpen ? `${0.3 + i * 0.08}s` : '0s' }}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  if (onNavigate && slideIndex !== undefined) {
                    onNavigate(slideIndex);
                  }
                }}
              >
                <span className={styles.navItemSub}>{item.sub}</span>
                <span className={styles.navItemText}>{item.label}</span>
              </a>
            );
          })}
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
            <p className={styles.infoText}>beyond.cosmic7@gmail.com</p>
          </div>
          <div
            className={styles.infoBlock}
            style={{ transitionDelay: isOpen ? '0.7s' : '0s' }}
          >
            <span className={styles.infoLabel}>Social</span>
            <div className={styles.socials}>
              <a href="https://github.com/beyondcosmic7" target="_blank" rel="noreferrer" className={styles.socialLink}>GitHub</a>
              <a href="https://x.com/acrosscosmic" target="_blank" rel="noreferrer" className={styles.socialLink}>X</a>
              <a href="https://www.instagram.com/__akshann/" target="_blank" rel="noreferrer" className={styles.socialLink}>Instagram</a>
              <a href="https://www.linkedin.com/in/akshan-khan-42a49929a/" target="_blank" rel="noreferrer" className={styles.socialLink}>LinkedIn</a>
            </div>
          </div>

          <div
            className={styles.themeToggleBlock}
            style={{ transitionDelay: isOpen ? '0.8s' : '0s' }}
          >
            <ThemeToggle />
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
