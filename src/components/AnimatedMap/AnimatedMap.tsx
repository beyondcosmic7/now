'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AnimatedMap.module.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Japanese Ink Painting Layer Sequence
 */
const LAYER_SEQUENCE = [
  { id: 'map-layer-background', start: 0, end: 0.15 },
  { id: 'map-layer-water', start: 0.1, end: 0.35 },
  { id: 'map-layer-waterway', start: 0.2, end: 0.45 },
  { id: 'map-layer-landcover', start: 0.3, end: 0.55 },
  { id: 'map-layer-park', start: 0.4, end: 0.65 },
  { id: 'map-layer-road-path-overview', start: 0.5, end: 0.75 },
  { id: 'map-layer-road-path', start: 0.52, end: 0.77 },
  { id: 'map-layer-road-minor-low', start: 0.55, end: 0.8 },
  { id: 'map-layer-road-minor-high', start: 0.6, end: 0.85 },
  { id: 'map-layer-road-major', start: 0.7, end: 0.95 },
  { id: 'map-layer-building', start: 0.8, end: 0.98 },
  { id: 'overlay-layer-text', start: 0.9, end: 1.0 },
];

export default function AnimatedMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    fetch('/kota_japanese_ink_20260507_110004.svg')
      .then((res) => res.text())
      .then((svgText) => {
        container.innerHTML = svgText;
        const svgEl = container.querySelector('svg');
        if (!svgEl) return;

        // Cover the space
        svgEl.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        svgEl.style.width = '100%';
        svgEl.style.height = '100%';
        svgEl.style.position = 'absolute';
        svgEl.style.inset = '0';
        svgEl.style.filter = 'invert(1) contrast(0.8) brightness(0.4) sepia(0.2) hue-rotate(5deg)';

        // Setup ink-bleed initial state
        LAYER_SEQUENCE.forEach(({ id }) => {
          const layer = container.querySelector(`#${id}`);
          if (layer) {
            gsap.set(layer, { 
              opacity: 0, 
              filter: 'blur(10px)',
              scale: 1.05,
              transformOrigin: 'center center'
            });
          }
        });

        setLoaded(true);

        // Link to main carousel
        const mainAnimation = ScrollTrigger.getAll().find(st => 
          st.vars.trigger && (st.vars.trigger as HTMLElement).className?.includes('wrapper')
        )?.animation;

        if (mainAnimation) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              containerAnimation: mainAnimation,
              start: 'left 100%', // Starts when slide 2 enters
              end: 'left 0%',    // Completes when slide 2 is fully centered
              scrub: 1,           // Smooth scrubbing
            }
          });

          LAYER_SEQUENCE.forEach(({ id, start, end }) => {
            const layer = container.querySelector(`#${id}`);
            if (layer) {
              tl.fromTo(layer, 
                { opacity: 0, filter: 'blur(15px)', scale: 1.05 },
                { 
                  opacity: 0.9, 
                  filter: 'blur(0px)', 
                  scale: 1,
                  duration: end - start, 
                  ease: 'power2.inOut'
                }, 
                start
              );
            }
          });
        }
      })
      .catch((err) => console.error('Map failed:', err));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.mapContainer} ${loaded ? styles.loaded : ''}`}
    />
  );
}
