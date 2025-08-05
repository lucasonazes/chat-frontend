'use client';

import { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const opera = (window as Window & { opera?: { toString: () => string } }).opera;
      const userAgent = navigator.userAgent || (opera ? opera.toString() : '');

      const isMobileDevice =
        /android|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i.test(userAgent) ||
        (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData?.mobile;

      setIsMobile(!!isMobileDevice);
    };

    checkMobile();
  }, []);

  return isMobile;
};

export default useIsMobile;
