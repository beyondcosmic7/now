'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type LayoutMode = 'horizontal' | 'vertical';

interface LayoutContextValue {
  layout: LayoutMode;
  setLayout: (mode: LayoutMode) => void;
  isMobile: boolean;
}

const LayoutContext = createContext<LayoutContextValue>({
  layout: 'horizontal',
  setLayout: () => {},
  isMobile: false,
});

const MOBILE_BREAKPOINT = 1024;
const STORAGE_KEY = 'portfolio-layout';

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutMode>('horizontal');
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setLayout = useCallback((mode: LayoutMode) => {
    setLayoutState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, mode);
      document.documentElement.setAttribute('data-layout', mode);
    }
  }, []);

  // Initial mount: detect mobile + restore preference
  useEffect(() => {
    const width = window.innerWidth;
    const mobile = width < MOBILE_BREAKPOINT;
    setIsMobile(mobile);

    if (mobile) {
      // Force vertical on mobile
      setLayoutState('vertical');
      document.documentElement.setAttribute('data-layout', 'vertical');
    } else {
      // Restore saved preference or default to horizontal
      const saved = localStorage.getItem(STORAGE_KEY) as LayoutMode | null;
      const mode = saved || 'horizontal';
      setLayoutState(mode);
      document.documentElement.setAttribute('data-layout', mode);
    }

    setMounted(true);
  }, []);

  // Resize listener
  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      if (mobile) {
        setLayoutState('vertical');
        document.documentElement.setAttribute('data-layout', 'vertical');
      } else {
        // Restore saved preference when going back to desktop
        const saved = localStorage.getItem(STORAGE_KEY) as LayoutMode | null;
        const mode = saved || 'horizontal';
        setLayoutState(mode);
        document.documentElement.setAttribute('data-layout', mode);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted]);

  return (
    <LayoutContext.Provider value={{ layout, setLayout, isMobile }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
