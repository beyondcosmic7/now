'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLayout } from '@/context/LayoutContext';
import IntroLoader from '@/components/IntroLoader/IntroLoader';
import RoseLoader from '@/components/RoseLoader/RoseLoader';

const SlideCarousel = dynamic(
  () => import('@/components/SlideCarousel/SlideCarousel'),
  { ssr: false, loading: () => <RoseLoader /> }
);

const VerticalStory = dynamic(
  () => import('@/components/VerticalStory/VerticalStory'),
  { ssr: false, loading: () => <RoseLoader /> }
);

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const { layout } = useLayout();

  return (
    <main>
      {!introComplete && <IntroLoader onComplete={() => setIntroComplete(true)} />}
      {layout === 'horizontal' ? (
        <SlideCarousel key="horizontal-layout" />
      ) : (
        <VerticalStory key="vertical-layout" />
      )}
    </main>
  );
}
