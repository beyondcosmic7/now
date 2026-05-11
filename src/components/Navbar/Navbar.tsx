'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';
import Menu from '../Menu/Menu';

const NAV_LINKS = ['Works', 'About', 'Services', 'Contact'];

const LINK_TO_SLIDE_INDEX: Record<string, number> = {
  'About': 1,
  'Services': 2,
  'Works': 3,
  'Contact': 5,
};

interface NavbarProps {
  onNavigate?: (index: number) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar} id="navbar">
        <div 
          className={styles.logo}
          onClick={() => {
            if (onNavigate) {
              onNavigate(0); // Go to landing page (Hero slide)
            }
          }}
        >
          <Image 
            src="/miguel_logo_new.png" 
            alt="Logo" 
            width={42} 
            height={42} 
            style={{ width: 'auto', height: 'auto', display: 'block' }}
          />
        </div>

        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link) => {
            const slideIndex = LINK_TO_SLIDE_INDEX[link];
            return (
              <li key={link}>
                <a 
                  href={`#${link.toLowerCase()}`} 
                  className={styles.navLink}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate && slideIndex !== undefined) {
                      onNavigate(slideIndex);
                    }
                  }}
                >
                  {link}
                </a>
              </li>
            );
          })}
        </ul>

        <div className={styles.navActions}>
          {/* Arrow button removed as requested */}
          
          {/* Original 3-line menu button */}
          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnActive : ''}`}
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </button>
        </div>
      </nav>

      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={onNavigate} />
    </>
  );
}
