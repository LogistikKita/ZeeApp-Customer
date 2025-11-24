// =======================================================
// KODE TERBAIK DAN PALING AMAN UNTUK App.jsx
// =======================================================

import React, { useState, useEffect } from 'react'; 
// Pastikan semua impor ini benar!
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/Hero.jsx'; 
import Preloader from './components/Preloader.jsx'; // PASTIKAN PATH BENAR
import FleetSection from './components/FleetSection.jsx'; 
import ServicesSection from './components/ServicesSection.jsx'; 
import TestimonialsSection from './components/TestimonialsSection.jsx'; 

document.documentElement.classList.add('no-transition');

function App() {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
        document.documentElement.classList.remove('no-transition');
    }, 100); 

    // Preloader akan hilang setelah 1.5 detik
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1500); 
    
    return () => clearTimeout(timer);
  }, []); 

  // Logika Rendering:
  // 1. Jika masih loading, tampilkan Preloader SAJA.
  if (isLoading) {
    return <Preloader />;
  }

  // 2. Jika loading selesai, tampilkan semua konten utama.
  return (
    <>
      <Navbar />
      
      <main>
          <Hero />
          
          {/* Seksi Konten Utama */}
          <FleetSection /> 
          <ServicesSection />
          <TestimonialsSection /> 
          
      </main>
      
      <Footer />
    </>
  );
}

export default App;
