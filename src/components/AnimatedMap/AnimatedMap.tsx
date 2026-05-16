'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayout } from '@/context/LayoutContext';
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
  onLoaded?: () => void;
}

export default function AnimatedMap({ containerAnimation, onLoaded }: AnimatedMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { layout } = useLayout();

  // Store the latest onLoaded callback in a ref to avoid dependency array issues
  const onLoadedRef = useRef(onLoaded);
  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

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
        if (onLoadedRef.current) onLoadedRef.current();
      })
      .catch((err) => console.error('Map failed:', err));
  }, []);

  // Create scroll-driven animation — works in both horizontal and vertical modes
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !loaded) return;

    // In horizontal mode, we need the containerAnimation
    // In vertical mode, we animate directly off scroll
    const isHorizontal = layout === 'horizontal';
    if (isHorizontal && !containerAnimation) return;

    if (tlRef.current) {
      tlRef.current.kill();
    }

    const triggerConfig: ScrollTrigger.Vars = {
      trigger: container,
      scrub: true,
    };

    if (isHorizontal && containerAnimation) {
      triggerConfig.containerAnimation = containerAnimation;
      triggerConfig.start = 'left 130%';
      triggerConfig.end = 'left 50%';
    } else {
      // Vertical mode — animate as the map scrolls into view
      triggerConfig.start = 'top 100%';
      triggerConfig.end = 'top 20%';
    }

    const tl = gsap.timeline({ scrollTrigger: triggerConfig });

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
  }, [loaded, containerAnimation, layout]);

  return (
    <div
      ref={containerRef}
      className={`${styles.mapContainer} ${loaded ? styles.loaded : ''}`}
    />
  );
}
