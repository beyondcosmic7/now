'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AnimatedMap.module.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Japanese Ink Painting Layer Sequence — IDs matched to actual SVG
 */
const LAYER_SEQUENCE = [
  { id: 'map-layer-background', start: 0, end: 0.12 },
  { id: 'map-layer-water', start: 0.05, end: 0.25 },
  { id: 'map-layer-waterway', start: 0.1, end: 0.30 },
  { id: 'map-layer-landcover', start: 0.15, end: 0.35 },
  { id: 'map-layer-park', start: 0.2, end: 0.40 },
  { id: 'map-layer-aeroway', start: 0.25, end: 0.45 },
  { id: 'map-layer-rail', start: 0.30, end: 0.50 },
  { id: 'map-layer-road-path-overview', start: 0.35, end: 0.55 },
  { id: 'map-layer-road-path-casing', start: 0.37, end: 0.55 },
  { id: 'map-layer-road-path', start: 0.38, end: 0.58 },
  { id: 'map-layer-road-minor-overview-low', start: 0.40, end: 0.60 },
  { id: 'map-layer-road-minor-overview-mid', start: 0.42, end: 0.62 },
  { id: 'map-layer-road-minor-overview-high', start: 0.44, end: 0.64 },
  { id: 'map-layer-road-minor-low', start: 0.46, end: 0.66 },
  { id: 'map-layer-road-minor-mid', start: 0.48, end: 0.68 },
  { id: 'map-layer-road-minor-mid-casing', start: 0.48, end: 0.68 },
  { id: 'map-layer-road-minor-high', start: 0.50, end: 0.70 },
  { id: 'map-layer-road-minor-high-casing', start: 0.50, end: 0.70 },
  { id: 'map-layer-road-major-casing', start: 0.55, end: 0.75 },
  { id: 'map-layer-road-major', start: 0.58, end: 0.80 },
  { id: 'map-layer-building', start: 0.70, end: 0.90 },
  { id: 'overlay-layer-text', start: 0.85, end: 1.0 },
];

interface AnimatedMapProps {
  containerAnimation?: gsap.core.Tween | null;
}

export default function AnimatedMap({ containerAnimation }: AnimatedMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Load SVG
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    fetch('/kota_japanese_ink_20260507_110004.svg')
      .then((res) => res.text())
      .then((svgText) => {
        container.innerHTML = svgText;
        const svgEl = container.querySelector('svg');
        if (!svgEl) return;

        svgEl.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        svgEl.style.width = '100%';
        svgEl.style.height = '100%';
        svgEl.style.position = 'absolute';
        svgEl.style.inset = '0';
        svgEl.style.inset = '0';

        // Set all layers to invisible initially
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
      })
      .catch((err) => console.error('Map failed:', err));
  }, []);

  // Create scroll-driven animation when SVG + containerAnimation are ready
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !loaded || !containerAnimation) return;

    if (tlRef.current) {
      tlRef.current.kill();
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        containerAnimation: containerAnimation,
        start: 'left 130%',
        end: 'left 50%',
        scrub: true,
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

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [loaded, containerAnimation]);

  return (
    <div
      ref={containerRef}
      className={`${styles.mapContainer} ${loaded ? styles.loaded : ''}`}
    />
  );
}
