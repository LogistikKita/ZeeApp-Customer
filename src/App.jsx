import React, { useState, useEffect } from 'react'; // <-- Import useState dan useEffect
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/Hero.jsx'; 
import Preloader from './components/Preloader.jsx'; // <-- Import Preloader

// Logika awal untuk mencegah transisi kilat (anti-flash)
document.documentElement.classList.add('no-transition');

function App() {
  const [isLoading, setIsLoading] = useState(true); // State untuk mengontrol Preloader

  useEffect(() => {
    // Menghapus kelas anti-flash setelah 100ms
    setTimeout(() => {
        document.documentElement.classList.remove('no-transition');
    }, 100); 

    // Mengatur waktu Preloader (muncul selama 1500ms atau 1.5 detik)
    const timer = setTimeout(() => {
      setIsLoading(false); // Matikan Preloader
    }, 1500); 
    
    // Cleanup function: penting jika komponen di-unmount
    return () => clearTimeout(timer);
  }, []); // Hanya berjalan sekali saat load

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
              {/* Di sini nanti komponen Services, Testimonials, dll. akan ditambahkan */}
          </main>
          
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
