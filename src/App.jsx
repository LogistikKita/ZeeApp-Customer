// src/App.jsx (KODE BERSIH & BENAR)

import React, { useState, useEffect } from 'react'; 
// PASTIKAN SEMUA PATH INI BENAR!
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// Komentar semua komponen section yang belum teruji
import Hero from './components/Hero.jsx'; 
import FleetSection from './components/FleetSection.jsx'; // <-- KITA UJI INI
// import ServicesSection from './components/ServicesSection.jsx'; 
// import TestimonialsSection from './components/TestimonialsSection.jsx'; 

import Preloader from './components/Preloader.jsx'; 

document.documentElement.classList.add('no-transition');

function App() {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
        document.documentElement.classList.remove('no-transition');
    }, 100); 

    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1500); 
    
    return () => clearTimeout(timer);
  }, []); 

  // 1. Jika masih loading, tampilkan Preloader SAJA.
  if (isLoading) {
    return <Preloader />;
  }

  // 2. Jika loading selesai, tampilkan konten utama (Navbar, Hero, Fleet, Footer)
  return (
    <>
      <Navbar />
      
      <main>
          <Hero />
          
          {/* KITA UJI FLEET SECTION DI SINI */}
          <FleetSection /> 
          
          {/* JIKA PUTIH, MAKA FLEETSECTION.JSX YANG BERMASALAH */}
          
      </main>
      
      <Footer />
    </>
  );
}

export default App;
