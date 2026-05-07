'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import IntroLoader from '@/components/IntroLoader/IntroLoader';

const SlideCarousel = dynamic(
  () => import('@/components/SlideCarousel/SlideCarousel'),
  { ssr: false }
);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main>
      {!isLoaded && <IntroLoader onComplete={() => setIsLoaded(true)} />}
      {/* Render carousel behind the intro so it's ready when intro exits */}
      <div style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
        <SlideCarousel />
      </div>
    </main>
  );
}
