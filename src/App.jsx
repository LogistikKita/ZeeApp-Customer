import React, { useState, useEffect } from 'react'; 
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/Hero.jsx'; 
import Preloader from './components/Preloader.jsx'; 
import FleetSection from './components/FleetSection.jsx'; 
import ServicesSection from './components/ServicesSection.jsx'; 
import TestimonialsSection from './components/TestimonialsSection.jsx'; 

// =======================================================
// Anti-Flash of Unstyled Content (FOUC) Fix
// =======================================================
document.documentElement.classList.add('no-transition');

function App() {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    // 1. Hapus kelas anti-flash setelah 100ms
    setTimeout(() => {
        document.documentElement.classList.remove('no-transition');
    }, 100); 

    // 2. Mengatur waktu Preloader (muncul selama 1500ms atau 1.5 detik)
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1500); 
    
    // Cleanup function
    return () => clearTimeout(timer);
  }, []); 

  return (
    <>
      {/* 1. KONTEN UTAMA (Muncul selalu, tetapi transparan jika isLoading=true) */}
      {/* Opacity diatur melalui CSS global atau class hidden/show jika perlu.
          Saat ini kita mengandalkan Preloader menutupi semua. */}
      
      {/* Kita menambahkan class 'content-loaded' agar kamu bisa mengontrol opacity
          konten utama di CSS (optional). */}
      <div className={`content-wrapper ${isLoading ? 'hidden' : 'block'}`}>
          <Navbar />
          
          <main>
              <Hero />
              <FleetSection /> 
              <ServicesSection />
              <TestimonialsSection /> 
              {/* Di sini nanti bagian CTA, Partners, Contact Form akan ditambahkan */}
          </main>
          
          <Footer />
      </div>

      {/* 2. PRELOADER (Akan hilang setelah 1.5 detik) */}
      {isLoading && <Preloader />} 

    </>
  );
}

export default App;
