import React, { useState, useEffect } from 'react'; 
// PASTIKAN SEMUA PATH INI BENAR!
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
// Komentar semua komponen section DULU. Kita akan buka satu per satu.
import Hero from './components/Hero.jsx'; 
// import FleetSection from './components/FleetSection.jsx'; 
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

    // Preloader akan hilang setelah 1.5 detik
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1500); 
    
    return () => clearTimeout(timer);
  }, []); 

  // 1. Jika masih loading, tampilkan Preloader SAJA.
  if (isLoading) {
    return <Preloader />;
  }

  // 2. Jika loading selesai, tampilkan hanya Navbar dan Footer
  return (
    <>
      <Navbar />
      
      <main className="py-20 text-center bg-gray-100 dark:bg-gray-800 h-screen">
    <Hero /> {/* <-- Tambahkan ini */}
    <h1 className="text-3xl font-bold text-black dark:text-white mt-10">
        KONTEN UTAMA DIBUKA
    </h1>
    <p className="text-gray-700 dark:text-gray-300 mt-4">
        Jika ini muncul, masalah ada di komponen Section (Hero, Fleet, dll.)
    </p>
</main>

      
      <Footer />
    </>
  );
}

export default App;
