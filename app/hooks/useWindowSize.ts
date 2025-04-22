'use client';

import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Custom hook to track window size and provide responsive breakpoints
 * @returns Window dimensions and boolean flags for device types
 */
export const useWindowSize = (): WindowSize => {
  // Set initial state with undefined dimensions to avoid hydration mismatch
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    // Only execute this on the client
    if (typeof window === 'undefined') {
      return;
    }

    // Handler to call on window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Determine device type based on width breakpoints
      // These breakpoints should match your Tailwind CSS config
      const isMobile = width < 768; // < md
      const isTablet = width >= 768 && width < 1024; // >= md && < lg
      const isDesktop = width >= 1024; // >= lg
      
      setWindowSize({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};

export default useWindowSize;