import React from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/Hero.jsx'; // <--- Impor komponen Hero

function App() {
  return (
    // Menggunakan Fragment <></> sebagai pembungkus
    <>
      <Navbar />
      
      {/* Main Content: Di sinilah semua komponen halaman utama dipanggil */}
      <main>
          <Hero /> {/* <--- Panggil Komponen Hero (Banner Utama) */}
          
          {/* Di sini nanti akan ada komponen seperti:
              <ServicesSection />
              <Testimonials />
              <FAQ />
          */}
          
      </main>
      
      <Footer />
    </>
  );
}

export default App;
