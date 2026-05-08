'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import styles from './AnimatedMap.module.css';

/**
 * Layer draw order — like a Japanese ink painting:
 * Ground → Water → Terrain → Paths → Roads → Rail → Buildings → Labels
 */
const LAYER_SEQUENCE = [
  { id: 'map-layer-background', delay: 0 },
  { id: 'map-layer-water', delay: 0.3 },
  { id: 'map-layer-waterway', delay: 0.5 },
  { id: 'map-layer-landcover', delay: 0.8 },
  { id: 'map-layer-park', delay: 1.0 },
  { id: 'map-layer-road-path-overview', delay: 1.2 },
  { id: 'map-layer-road-path-casing', delay: 1.25 },
  { id: 'map-layer-road-path', delay: 1.3 },
  { id: 'map-layer-road-minor-low', delay: 1.4 },
  { id: 'map-layer-road-minor-overview-low', delay: 1.42 },
  { id: 'map-layer-road-minor-mid-casing', delay: 1.5 },
  { id: 'map-layer-road-minor-mid', delay: 1.55 },
  { id: 'map-layer-road-minor-overview-mid', delay: 1.6 },
  { id: 'map-layer-road-minor-high-casing', delay: 1.7 },
  { id: 'map-layer-road-minor-high', delay: 1.75 },
  { id: 'map-layer-road-minor-overview-high', delay: 1.8 },
  { id: 'map-layer-road-major-casing', delay: 1.9 },
  { id: 'map-layer-road-major', delay: 2.0 },
  { id: 'map-layer-rail', delay: 2.2 },
  { id: 'map-layer-aeroway', delay: 2.3 },
  { id: 'map-layer-building', delay: 2.5 },
  { id: 'overlay-layer-text', delay: 2.8 },
];

export default function AnimatedMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fetch the SVG as raw text and inject it into the DOM
    fetch('/kota_japanese_ink_20260507_110004.svg')
      .then((res) => res.text())
      .then((svgText) => {
        // Inject raw SVG into container
        container.innerHTML = svgText;

        const svgEl = container.querySelector('svg');
        if (!svgEl) return;

        // Style the SVG
        svgEl.style.width = '100%';
        svgEl.style.height = '100%';
        svgEl.style.position = 'absolute';
        svgEl.style.inset = '0';
        svgEl.style.filter = 'invert(1) contrast(0.7) brightness(0.3) sepia(0.15) hue-rotate(5deg)';

        // Hide all layers first
        LAYER_SEQUENCE.forEach(({ id }) => {
          const layer = container.querySelector(`#${id}`);
          if (layer) {
            gsap.set(layer, { opacity: 0 });
          }
        });

        setLoaded(true);

        // Animate each layer in with staggered delays
        LAYER_SEQUENCE.forEach(({ id, delay }) => {
          const layer = container.querySelector(`#${id}`);
          if (layer) {
            gsap.to(layer, {
              opacity: 0.9,
              duration: 0.8,
              delay: delay + 0.3, // small extra delay to let the DOM settle
              ease: 'power2.out',
            });
          }
        });
      })
      .catch((err) => {
        console.error('Failed to load SVG map:', err);
      });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.mapContainer} ${loaded ? styles.loaded : ''}`}
    />
  );
}
