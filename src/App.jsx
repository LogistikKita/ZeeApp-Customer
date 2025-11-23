import React from 'react';
import Navbar from './components/layout/Navbar.jsx';

function App() {
  return (
    <>
      <Navbar />
      
      {/* Ini adalah konten halaman utama kamu. */}
      <div className="p-10 text-center min-h-screen">
          <h1 className="text-4xl font-black mt-20 text-[var(--color-primary)]">
              Navbar Berhasil Dimuat!
          </h1>
          <p className="text-xl text-[var(--color-dark)] mt-4">
              Cek Dark Mode & Mobile Menu.
          </p>
      </div>
      
      {/* Nanti di sini kita panggil komponen Footer */}
    </>
  );
}

export default App;
