import { useState, useEffect } from 'react';
import { ServicesGrid } from './ServicesGrid';
import { ServicesCarousel } from './ServicesCarousel';

export function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div id="services">
      {isMobile ? <ServicesCarousel /> : <ServicesGrid />}
    </div>
  );
}
