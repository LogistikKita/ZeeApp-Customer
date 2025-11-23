import React from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

function App() {
  return (
    // Menggunakan Fragment <></> sebagai pembungkus
    <>
      <Navbar />
      
      {/* Main (Konten Utama) - Nanti semua halaman akan ada di sini
          Kita beri min-h-screen agar Footer selalu di bawah
      */}
      <main className="p-10 text-center min-h-screen">
          <h1 className="text-4xl font-black mt-20 text-primary">
              Navbar & Footer Siap!
          </h1>
          <p className="text-xl text-gray-800 mt-4">
              Cek Dark Mode & Mobile Menu.
          </p>
      </main>
      
      <Footer />
    </>
  );
}

export default App;
