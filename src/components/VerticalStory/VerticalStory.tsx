'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styles from './VerticalStory.module.css';

import Navbar from '../Navbar/Navbar';
import GradientBar from '../GradientBar/GradientBar';
import DepthPoints from '../DepthPoints/DepthPoints';
import FloatingBlob from '../FloatingBlob/FloatingBlob';
import AnimatedMap from '../AnimatedMap/AnimatedMap';
import CodropsFlipGrid from './CodropsFlipGrid';
import CodropsParallaxGrid from './CodropsParallaxGrid';
import Image from 'next/image';
import { createPortal } from 'react-dom';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ═══════════ DATA ═══════════ */
const PROJECTS = [
  { num: '01', title: 'Happy Hamper', type: 'E-Commerce / Web App', url: 'https://happyhamper.vercel.app/', image: '/happyhamper.png', year: '2024' },
  { num: '02', title: 'ElectiQ', type: 'Corporate / Branding', url: 'https://electiq-in.vercel.app/', image: '/electiq.png', year: '2024' },
  { num: '03', title: 'TVA', type: 'Creative Agency / Portfolio', url: 'https://tva-v1.vercel.app/', image: '/tva.png', year: '2024' },
];
const PHOTOS_1 = ['/lens-1.jpg', '/lens-2.jpg', '/lens-3.jpg', '/lens-4.jpg'];
const PHOTOS_2 = ['/lens-5.jpg', '/lens-6.jpg', '/lens-7.jpg', '/lens-8.jpg'];

const LINK_TO_SECTION: Record<string, string> = {
  0: '#vs-hero',
  1: '#vs-about',
  2: '#vs-craft',
  3: '#vs-works',
  4: '#vs-lens',
  5: '#vs-contact',
};

export default function VerticalStory() {
  const storyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  /* ── Scroll-to navigation ── */
  const goToSlide = useCallback((idx: number) => {
    const target = LINK_TO_SECTION[idx];
    if (target) {
      const el = document.querySelector(target);
      if (el) {
        gsap.to(window, { scrollTo: { y: el as HTMLElement, offsetY: 0 }, duration: 2, ease: 'power3.inOut' });
      }
    }
  }, []);

  /* ── GSAP Story Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* --- Section Entrance Animations --- */
      gsap.utils.toArray<HTMLElement>('[data-vs-section]').forEach((section) => {
        // Section Active State
        ScrollTrigger.create({
          trigger: section,
          start: 'top 40%',
          end: 'bottom 60%',
          onToggle: (self) => {
            if (self.isActive) section.classList.add(styles.sectionActive);
          }
        });

        // Kanji accent paint reveal (very slow, dreamy)
        const kanji = section.querySelector('[data-vs-kanji]');
        if (kanji) {
          gsap.fromTo(kanji,
            { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
            { opacity: 0.05, clipPath: 'inset(0% 0 0 0)', ease: 'none',
              scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 15%', scrub: 3 }
            }
          );
        }

        // Title ink-spread reveal with blur
        const title = section.querySelector('[data-vs-title]');
        if (title) {
          gsap.fromTo(title,
            { filter: 'blur(16px)', opacity: 0, y: 15 },
            { filter: 'blur(0px)', opacity: 1, y: 0, ease: 'none',
              scrollTrigger: { trigger: title, start: 'top 92%', end: 'top 50%', scrub: 2.5 }
            }
          );
        }

        // Paragraph line reveal (glacially slow fade in)
        const lines = section.querySelectorAll('[data-vs-fade]');
        if (lines.length) {
          gsap.fromTo(lines,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 2.5, stagger: 0.5, ease: 'power2.out',
              scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
            }
          );
        }
      });

      /* --- Hero Reveal — cinematic, dreamy --- */
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#vs-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 2.5
        }
      });
      heroTl.to('[data-vs-hero-name]', { y: -60, opacity: 0, scale: 0.97, filter: 'blur(6px)', ease: 'none' });
      heroTl.to('#vs-hero .heroBg', { opacity: 0, ease: 'none' }, 0);

      /* --- Footer shifting reveal --- */
      const footer = footerRef.current;
      if (footer) {
        ScrollTrigger.create({
          trigger: footer,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          onUpdate: (self) => {
            footer.style.setProperty('--footer-progress', String(self.progress));
          },
        });
      }
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar onNavigate={goToSlide} />

      {/* Global Story Texture Overlay */}
      <div className={styles.paperTexture} />

      <div ref={storyRef} className={styles.story}>
        {/* ╔══════════ HERO ══════════╗ */}
        <section className={styles.hero} id="vs-hero">
          <div className={`${styles.heroBg} heroBg`}><DepthPoints /></div>
          <div className={styles.heroContent}>
            <div className={styles.heroNameSection} data-vs-hero-name>
              <h1 className={styles.heroName}>
                <span className={styles.heroFirst}>Akshan</span>
                <span className={styles.heroLast}>Khan</span>
              </h1>
              <div className={styles.heroSubRow}>
                <span className={styles.heroDash} />
                <span className={styles.heroSub}>Web Developer & Photographer</span>
                <span className={styles.heroDash} />
              </div>
            </div>
            <div className={styles.heroBottom}>
              <span className={styles.heroWhisper}>PORTFOLIO 2025</span>
              <span className={styles.heroWhisper}>KOTA, INDIA</span>
            </div>
          </div>
        </section>

        {/* ╔══════════ ABOUT ══════════╗ */}
        <section className={styles.section} id="vs-about" data-vs-section>
          <span className={styles.sectionKanji} data-vs-kanji>紹介</span>
          <div className={styles.verticalTitle} data-vs-fade>ABOUT ME</div>

          <div className={styles.aboutPortrait} onClick={() => setModalOpen(true)}>
            <img src="/ME.jpeg" alt="Akshan Khan" className={styles.aboutPortraitImg} />
            <div className={styles.aboutPortraitOverlay}>
              <span className={styles.aboutPortraitText}>View Profile</span>
            </div>
          </div>

          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle} data-vs-title>Web Developer &<br/>Photographer</h2>
            <p className={styles.sectionBody} data-vs-fade>
              I build websites that feel alive and capture moments that tell stories. From pixel-perfect interfaces to cinematic compositions — obsessed with every detail.
            </p>
            <div className={styles.stats} data-vs-fade>
              <div className={styles.stat}><span className={styles.statNum}>03+</span><span className={styles.statLabel}>Years</span></div>
              <div className={styles.stat}><span className={styles.statNum}>20+</span><span className={styles.statLabel}>Projects</span></div>
            </div>
          </div>

          {/* Map Section */}
          <div className={styles.aboutMap}>
            {!mapLoaded && <div className={styles.mapLoader}>Rendering Ink Map...</div>}
            <AnimatedMap onLoaded={() => setMapLoaded(true)} />
            <div className={styles.mapOverlay}>
              <span className={styles.mapLabel} data-vs-fade>Currently based in</span>
              <h4 className={styles.mapCity} data-vs-fade>KOTA</h4>
            </div>
            <span className={styles.mapKanji}>古田</span>
          </div>
        </section>

        {/* ╔══════════ CRAFT ══════════╗ */}
        <section className={styles.section} id="vs-craft" data-vs-section>
          <span className={styles.sectionKanji} data-vs-kanji>技</span>
          <div className={styles.verticalTitle} data-vs-fade>MY CRAFT</div>

          <div className={styles.sectionContent}>
            <h2 className={styles.craftTitle} data-vs-title>WEB<br/>& LENS</h2>
            <p className={styles.sectionBody} data-vs-fade>
              Building performant websites with modern frameworks. Capturing stories through cinematic photography. Precision, patience, and detail.
            </p>
          </div>

          <div className={styles.craftCard} data-vs-fade>
            <div className={styles.cardHeader}>
              <div className={styles.macDots}>
                <span style={{ background: '#FF5F56' }} /><span style={{ background: '#FFBD2E' }} /><span style={{ background: '#27C93F' }} />
              </div>
              <span className={styles.cardFile}>digital_experience.ts</span>
            </div>
            <pre className={styles.codeBlock}><code>{`class DigitalExperience {
  constructor(vision) {
    this.aesthetic = "Luxurious";
    this.performance = "High";
  }

  render() {
    return <Interface smooth={100} />;
  }
}`}</code></pre>
          </div>

          <div className={styles.techLogos} data-vs-fade>
            {['react', 'nextdotjs', 'typescript', 'threedotjs', 'figma'].map(slug => (
              <img key={slug} src={`https://cdn.simpleicons.org/${slug}/white`} alt={slug} />
            ))}
          </div>
        </section>

        {/* ╔══════════ WORKS (Flip Grid) ══════════╗ */}
        <div id="vs-works">
          <CodropsFlipGrid />
        </div>

        {/* ╔══════════ LENS (Parallax Grid) ══════════╗ */}
        <div id="vs-lens">
          <CodropsParallaxGrid />
        </div>
      </div>

      {/* ╔══════════ FOOTER — Reveal ══════════╗ */}
      <footer ref={footerRef} className={styles.footer} id="vs-contact">
        <div className={styles.footerDarkOverlay} />
        
        {/* Floating Social Ecosystem */}
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

        <div className={styles.footerInner}>
          <span className={styles.kanjiAccent}>結</span>
          
          <div className={styles.mainContent}>
            <h2 className={styles.massiveTitle}>LET&apos;S<br/>TALK.</h2>
            <div className={styles.linksRow}>
              <a href="mailto:beyond.cosmic7@gmail.com" className={styles.magneticLink}>beyond.cosmic7@gmail.com</a>
              <a href="https://www.linkedin.com/in/akshan-khan-42a49929a/" target="_blank" rel="noreferrer" className={styles.magneticLink}>LinkedIn</a>
              <a href="https://www.instagram.com/__akshann/" target="_blank" rel="noreferrer" className={styles.magneticLink}>Instagram</a>
              <a href="https://x.com/acrosscosmic" target="_blank" rel="noreferrer" className={styles.magneticLink}>X</a>
            </div>
          </div>
          
          <div className={styles.footerRow}>
            <span className={styles.copyright}>© 2026 Akshan Khan. All rights reserved.</span>
            <button className={styles.rewindBtn} onClick={() => goToSlide(0)}>
              <span className={styles.rewindArrow}>←</span>
              <span>BACK TO START</span>
            </button>
          </div>
        </div>
      </footer>

      <GradientBar />

      {/* Profile Modal */}
      {modalOpen && createPortal(
        <div className={styles.modalBackdrop} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setModalOpen(false)}>✕</button>
            <div className={styles.modalGrid}>
              <div className={styles.modalPhoto}><img src="/ME.jpeg" alt="Akshan Khan" /></div>
              <div className={styles.modalContent}>
                <h2 className={styles.modalName}>Akshan Khan</h2>
                <p className={styles.modalText}>Based in Kota, India. I build high-fidelity web experiences and capture cinematic photography.</p>
                <div className={styles.modalSection}>
                  <div className={styles.modalTags}>
                    {['Creative Coding', 'Motion Design', 'Street Photography', 'Japanese Aesthetics'].map(t => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
