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
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main>
      {!introComplete && <IntroLoader onComplete={() => setIntroComplete(true)} />}
      {/* Carousel always renders at full size so GSAP can measure — intro covers it */}
      <SlideCarousel />
    </main>
  );
}
