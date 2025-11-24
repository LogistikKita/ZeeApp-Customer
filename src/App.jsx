import React, { useState, useEffect } from 'react'; 
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/Hero.jsx'; 
import Preloader from './components/Preloader.jsx'; 
import FleetSection from './components/FleetSection.jsx'; 
import ServicesSection from './components/ServicesSection.jsx'; // <-- Layanan
import TestimonialsSection from './components/TestimonialsSection.jsx'; // <-- Testimoni

// =======================================================
// Anti-Flash of Unstyled Content (FOUC) Fix
// =======================================================
document.documentElement.classList.add('no-transition');

function App() {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    // Menghapus kelas anti-flash setelah 100ms
    setTimeout(() => {
        document.documentElement.classList.remove('no-transition');
    }, 100); 

    // Mengatur waktu Preloader (muncul selama 1500ms atau 1.5 detik)
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1500); 
    
    // Cleanup function
    return () => clearTimeout(timer);
  }, []); 

  return (
    <>
      {/* Tampilkan Preloader jika isLoading = true */}
      {isLoading && <Preloader />} 

      {/* Tampilkan konten utama HANYA jika isLoading = false */}
      {!isLoading && (
        <>
          <Navbar />
          
          <main>
              <Hero />
              
              {/* Seksi Konten Utama */}
              <FleetSection /> 
              <ServicesSection />
              <TestimonialsSection /> 
              
              {/* Di sini nanti bagian CTA, Partners, Contact Form akan ditambahkan */}
          </main>
          
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
