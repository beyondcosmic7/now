'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import IntroLoader from '@/components/IntroLoader/IntroLoader';
import RoseLoader from '@/components/RoseLoader/RoseLoader';

const SlideCarousel = dynamic(
  () => import('@/components/SlideCarousel/SlideCarousel'),
  {
    ssr: false,
    loading: () => <RoseLoader />,
  }
);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main>
      {!isLoaded && <IntroLoader onComplete={() => setIsLoaded(true)} />}
      <div style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
        <SlideCarousel />
      </div>
    </main>
  );
}
