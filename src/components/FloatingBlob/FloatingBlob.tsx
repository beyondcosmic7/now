'use client';

import React from 'react';
import styles from './FloatingBlob.module.css';

interface FloatingBlobProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  variant?: 'pink' | 'peach';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  className?: string;
}

export default function FloatingBlob({
  size = 'medium',
  variant = 'pink',
  top,
  left,
  right,
  bottom,
  delay = 0,
  className = '',
}: FloatingBlobProps) {
  return (
    <div
      className={`${styles.blob} ${styles[size]} ${styles[variant]} ${className}`}
      data-speed="blob"
      style={{
        top,
        left,
        right,
        bottom,
        animationDelay: `${delay}s`,
      }}
    />
  );
}
