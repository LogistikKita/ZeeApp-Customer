import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ children, slidesPerView = 3, gap = 'gap-8', autoPlay = false, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const carouselRef = useRef(null);

  // Fungsi untuk mendapatkan ukuran gap dalam pixel
  const getGapSize = (gapClass) => {
    return gapClass === 'gap-6' ? 24 : 32; 
  };
  
  // Mengatur lebar slide berdasarkan slidesPerView dan lebar container
  useEffect(() => {
    const calculateWidth = () => {
      if (!carouselRef.current) return; // <-- TAMBAHAN: Pastikan ref sudah ada

      const width = carouselRef.current.offsetWidth;
      const windowWidth = window.innerWidth;
      
      let viewCount = slidesPerView;
      
      // Logika Responsive
      if (windowWidth < 640) { // Mobile (< sm)
        viewCount = 1;
      } else if (windowWidth < 1024) { // Tablet (sm - lg)
        viewCount = Math.min(slidesPerView, 2);
      }
      
      const gapSize = getGapSize(gap);
      const gapInPx = gapSize * (viewCount > 0 ? (viewCount - 1) : 0); // <-- TAMBAHAN: Cek viewCount
      
      // TAMBAHAN: Pengecekan pembagian dengan nol
      if (viewCount > 0) {
          const singleSlideWidth = (width - gapInPx) / viewCount;
          setSlideWidth(singleSlideWidth);
      }
    };

    calculateWidth();
    // Gunakan window.addEventListener karena ini berhubungan dengan responsive
    window.addEventListener('resize', calculateWidth);
    
    // Cleanup listener
    return () => window.removeEventListener('resize', calculateWidth);
  }, [slidesPerView, gap]);


  // Logic Autoplay
  useEffect(() => {
    if (!autoPlay || !children || children.length === 0 || slideWidth === 0) return; // <-- TAMBAHAN: Cek slideWidth

    const maxTranslate = children.length - (slideWidth > 0 ? Math.floor(carouselRef.current.offsetWidth / slideWidth) : 1);

    const timer = setInterval(() => {
      // Pastikan prevIndex tidak melebihi batas
      setCurrentIndex(prevIndex => (prevIndex >= maxTranslate) ? 0 : prevIndex + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, children, interval, slideWidth]);


  // Perhitungan Utama (Lebih Defensif)
  const availableWidth = carouselRef.current ? carouselRef.current.offsetWidth : 0;
  const gapSize = getGapSize(gap);
  
  // Hitung jumlah item yang terlihat berdasarkan lebar yang tersedia
  const visibleItems = slideWidth > 0 && availableWidth > 0 ? Math.floor(availableWidth / slideWidth) : 1; 
  
  const slideCount = children ? children.length : 0;
  
  // Jumlah slide yang bisa digeser
  const maxTranslate = slideCount > 0 ? Math.max(0, slideCount - visibleItems) : 0;
  
  // Pastikan currentIndex tidak melebihi maxTranslate
  useEffect(() => {
    setCurrentIndex(prevIndex => Math.min(prevIndex, maxTranslate));
  }, [maxTranslate]);


  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(maxTranslate, prevIndex + 1));
  };
  
  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const translateX = -(currentIndex * (slideWidth + gapSize));
  const isReady = slideWidth > 0 && slideCount > 0;


  return (
    <div className="relative w-full overflow-hidden">
      <div ref={carouselRef} className="w-full">
        {isReady ? (
          <div 
            className={`flex ${gap} transition-transform duration-500`}
            style={{ 
                transform: `translateX(${translateX}px)`,
                width: `${slideCount * slideWidth + (slideCount - 1) * gapSize}px` // Set width container
            }}
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
        ) : (
          <div className="text-center py-10 text-gray-500">Loading Carousel...</div>
        )}
      </div>

      {/* Kontrol Navigasi hanya muncul jika sudah siap dan bisa digeser */}
      {isReady && maxTranslate > 0 && (
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
      )}

      {/* Dots Indikator hanya muncul jika sudah siap dan bisa digeser */}
      {isReady && maxTranslate > 0 && (
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
      )}
    </div>
  );
};

export default Carousel;
