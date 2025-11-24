import React from 'react';
import { Truck, Search, ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      className="relative h-[80vh] min-h-[600px] flex items-center bg-gray-900 dark:bg-zinc-950 overflow-hidden" 
      style={{ 
        backgroundImage: `url('https://placehold.co/1920x1080/0d0c22/38A169?text=Logistik+Mojokerto+Banner')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
        
        {/* Slogan Khas Mojokerto (Poin 1) */}
        <p className="text-xl font-bold mb-3 tracking-widest uppercase text-yellow-300 reveal-item">
          #LogistikKita
        </p>

        {/* Judul Utama */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight reveal-item">
          LOGISTIK'E AREK MOJOKERTO
        </h1>

        {/* Sub-judul yang Fokus pada Keuntungan Klien */}
        <p className="text-lg sm:text-xl font-light mb-10 max-w-4xl mx-auto reveal-item">
          Solusi pengiriman terpercaya, cepat, dan aman untuk Jawa Timur dan seluruh Indonesia. Kami hadir untuk mengembangkan bisnis UMKM Anda.
        </p>

        {/* Blok Tombol Utama (Wajib Menonjol) */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 reveal-item">
          
          {/* Tombol Lacak Pengiriman */}
          <a href="#tracking" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary-dark)] transition-all duration-300 shadow-2xl shadow-[var(--color-primary)]/40 transform hover:scale-105"
          >
            <Search className="w-6 h-6 mr-2" /> 
            Lacak Pengiriman Anda
          </a>

          {/* Tombol Cek Armada / Simulasi Harga */}
          <a href="#armada" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/50 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <Truck className="w-6 h-6 mr-2" /> 
            Cek Armada & Harga
            <ChevronRight className="w-5 h-5 ml-2" />
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;

