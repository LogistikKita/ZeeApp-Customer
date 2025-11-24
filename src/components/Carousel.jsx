import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ children, slidesPerView = 3, gap = 'gap-8', autoPlay = false, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const carouselRef = useRef(null);

  // Mengatur lebar slide berdasarkan slidesPerView
  useEffect(() => {
    const calculateWidth = () => {
      if (carouselRef.current) {
        const width = carouselRef.current.offsetWidth;
        
        let viewCount = slidesPerView;
        if (width < 640) { // Mobile (< sm)
          viewCount = 1;
        } else if (width < 1024) { // Tablet (sm - lg)
          viewCount = Math.min(slidesPerView, 2);
        }
        
        // Asumsi gap-6 = 24px, gap-8 = 32px (default)
        const gapSize = gap === 'gap-6' ? 24 : 32; 
        const gapInPx = gapSize * (viewCount - 1);
        const singleSlideWidth = (width - gapInPx) / viewCount;
        setSlideWidth(singleSlideWidth);
      }
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    return () => window.removeEventListener('resize', calculateWidth);
  }, [slidesPerView, gap]);

  // Logic Autoplay
  useEffect(() => {
    if (!autoPlay || !children || children.length === 0) return;

    const maxTranslate = children.length - (slideWidth > 0 ? Math.floor(carouselRef.current.offsetWidth / slideWidth) : 1);

    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => Math.min(maxTranslate, (prevIndex + 1) % (maxTranslate + 1)));
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, children, interval, slideWidth]);


  const visibleItems = slideWidth > 0 && carouselRef.current ? Math.floor(carouselRef.current.offsetWidth / slideWidth) : slidesPerView;
  const slideCount = children ? children.length : 0;
  const maxTranslate = slideCount > 0 ? slideCount - visibleItems : 0;
  const gapSize = gap === 'gap-6' ? 24 : 32;

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(maxTranslate, prevIndex + 1));
  };
  
  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const translateX = -(currentIndex * (slideWidth + gapSize));

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={carouselRef} className="w-full">
        <div 
          className={`flex ${gap} transition-transform duration-500`}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {children.map((child, index) => (
            <div 
              key={index} 
              className="flex-shrink-0"
              style={{ width: `${slideWidth}px` }} 
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Kontrol Navigasi */}
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-2 sm:px-4 pointer-events-none">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="p-3 bg-white/80 dark:bg-zinc-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-zinc-700 transition duration-300 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-dark)]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentIndex >= maxTranslate}
          className="p-3 bg-white/80 dark:bg-zinc-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-zinc-700 transition duration-300 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-dark)]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Indikator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxTranslate + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === currentIndex
                ? 'bg-[var(--color-primary)]'
                : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
