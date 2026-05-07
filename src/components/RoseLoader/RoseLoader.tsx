'use client';

import React, { useEffect, useRef } from 'react';
import styles from './RoseLoader.module.css';

const SVG_NS = 'http://www.w3.org/2000/svg';

const CONFIG = {
  particleCount: 76,
  trailSpan: 0.31,
  durationMs: 5300,
  rotationDurationMs: 28000,
  pulseDurationMs: 4400,
  strokeWidth: 4.6,
  roseA: 9.2,
  roseABoost: 0.6,
  roseBreathBase: 0.72,
  roseBreathBoost: 0.28,
  roseScale: 3.25,
};

function normalizeProgress(p: number) {
  return ((p % 1) + 1) % 1;
}

function getDetailScale(time: number) {
  const pulse = (time % CONFIG.pulseDurationMs) / CONFIG.pulseDurationMs;
  return 0.52 + ((Math.sin(pulse * Math.PI * 2 + 0.55) + 1) / 2) * 0.48;
}

function getRotation(time: number) {
  return -((time % CONFIG.rotationDurationMs) / CONFIG.rotationDurationMs) * 360;
}

function getPoint(progress: number, detail: number) {
  const t = progress * Math.PI * 2;
  const a = CONFIG.roseA + detail * CONFIG.roseABoost;
  const r = a * (CONFIG.roseBreathBase + detail * CONFIG.roseBreathBoost) * Math.cos(3 * t);
  return {
    x: 50 + Math.cos(t) * r * CONFIG.roseScale,
    y: 50 + Math.sin(t) * r * CONFIG.roseScale,
  };
}

function buildPath(detail: number, steps = 480) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const p = getPoint(i / steps, detail);
    return `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  }).join(' ');
}

export default function RoseLoader() {
  const groupRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const particlesRef = useRef<SVGCircleElement[]>([]);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const group = groupRef.current;
    const path = pathRef.current;
    if (!group || !path) return;

    // Create particles
    const particles: SVGCircleElement[] = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      const circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('fill', 'currentColor');
      group.appendChild(circle);
      particles.push(circle);
    }
    particlesRef.current = particles;
    startRef.current = performance.now();

    function render(now: number) {
      const time = now - startRef.current;
      const progress = (time % CONFIG.durationMs) / CONFIG.durationMs;
      const detail = getDetailScale(time);

      group!.setAttribute('transform', `rotate(${getRotation(time)} 50 50)`);
      path!.setAttribute('d', buildPath(detail));

      particles.forEach((node, index) => {
        const tailOffset = index / (CONFIG.particleCount - 1);
        const pt = getPoint(normalizeProgress(progress - tailOffset * CONFIG.trailSpan), detail);
        const fade = Math.pow(1 - tailOffset, 0.56);
        node.setAttribute('cx', pt.x.toFixed(2));
        node.setAttribute('cy', pt.y.toFixed(2));
        node.setAttribute('r', (0.9 + fade * 2.7).toFixed(2));
        node.setAttribute('opacity', (0.04 + fade * 0.96).toFixed(3));
      });

      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div className={styles.loader}>
      <div className={styles.frame}>
        <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <g ref={groupRef}>
            <path
              ref={pathRef}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={CONFIG.strokeWidth}
              opacity="0.1"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
