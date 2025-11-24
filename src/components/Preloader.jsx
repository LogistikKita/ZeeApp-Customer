// =======================================================
// KODE TERBAIK DAN PALING AMAN UNTUK Preloader.jsx
// =======================================================

import React from 'react';
import { Loader2 } from 'lucide-react'; // Pastikan sudah install lucide-react

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-zinc-900 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700" id="preloader-container">
      <div className="flex flex-col items-center">
        {/* Menggunakan root path /Logistik-Kita.png dari folder /public/ */}
        <img 
            src="/Logistik-Kita.png" 
            alt="Logistik Kita Loading" 
            className="w-20 h-20 md:w-28 md:h-28 animate-pulse mb-4"
        />
        <h1 className="text-xl md:text-3xl font-bold tracking-widest text-[var(--color-dark)] dark:text-white transition-colors">LOGISTIK KITA</h1>
        <div className="mt-8">
            <Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
