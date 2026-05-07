'use client';

import React from 'react';
import styles from './RotatingBadge.module.css';

interface RotatingBadgeProps {
  text?: string;
  centerSymbol?: string;
  size?: number;
  className?: string;
}

export default function RotatingBadge({
  text = '★ FOLLOW ME ON SOCIAL ★ FOLLOW ME ON SOCIAL ',
  centerSymbol = '✚',
  size = 160,
  className = '',
}: RotatingBadgeProps) {
  const id = `badge-path-${Math.random().toString(36).slice(2, 8)}`;
  const radius = size * 0.38;

  return (
    <div
      className={`${styles.badgeContainer} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className={styles.rotatingText}
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <path
            id={id}
            d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text>
          <textPath href={`#${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <span className={styles.centerIcon}>{centerSymbol}</span>
    </div>
  );
}
