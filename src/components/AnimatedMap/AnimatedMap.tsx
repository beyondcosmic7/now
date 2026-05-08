'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  const objectRef = useRef<HTMLObjectElement>(null);
  const [loaded, setLoaded] = useState(false);
  const animatedRef = useRef(false);

  const animateLayers = useCallback(() => {
    if (animatedRef.current) return;
    const obj = objectRef.current;
    if (!obj) return;

    const svgDoc = obj.contentDocument;
    if (!svgDoc) return;

    const svgEl = svgDoc.querySelector('svg');
    if (!svgEl) return;

    animatedRef.current = true;

    // Apply dark ink theme
    svgEl.style.filter = 'invert(1) contrast(0.7) brightness(0.3) sepia(0.15) hue-rotate(5deg)';
    svgEl.style.width = '100%';
    svgEl.style.height = '100%';

    // Hide all layers first
    LAYER_SEQUENCE.forEach(({ id }) => {
      const layer = svgDoc.getElementById(id);
      if (layer) {
        gsap.set(layer, { opacity: 0 });
      }
    });

    setLoaded(true);

    // Animate each layer in sequence
    LAYER_SEQUENCE.forEach(({ id, delay }) => {
      const layer = svgDoc.getElementById(id);
      if (layer) {
        gsap.to(layer, {
          opacity: 0.9,
          duration: 0.8,
          delay,
          ease: 'power2.out',
        });
      }
    });
  }, []);

  useEffect(() => {
    const obj = objectRef.current;
    if (!obj) return;

    obj.addEventListener('load', animateLayers);

    // If already loaded (cached)
    if (obj.contentDocument?.querySelector('svg')) {
      animateLayers();
    }

    return () => obj.removeEventListener('load', animateLayers);
  }, [animateLayers]);

  return (
    <div className={styles.mapContainer}>
      <object
        ref={objectRef}
        data="/kota_japanese_ink_20260507_110004.svg"
        type="image/svg+xml"
        className={`${styles.svgObject} ${loaded ? styles.svgLoaded : ''}`}
        aria-label="Kota city map — animated ink drawing"
      />
    </div>
  );
}
