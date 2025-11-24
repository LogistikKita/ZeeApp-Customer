import React from 'react';
import { Truck, Search, ChevronDown } from 'lucide-react';

const Hero = () => {
    return (
        // Mengurangi tinggi Hero agar konten selanjutnya lebih mudah terlihat
        <section 
            // Ubah min-h dari 600px menjadi 450px dan hapus h-[80vh] agar lebih mobile-friendly
            className="relative h-auto min-h-[450px] flex items-center bg-gray-900 dark:bg-zinc-950 overflow-hidden py-12 sm:py-24"
            style={{
                // Gambar Banner Promosi Statis
                backgroundImage: 'url(https://placehold.co/1920x1080/0d0c22/38A169?text=Logistik+Mojokerto+Banner)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay Gelap */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white w-full">
                {/* Slogan Khas Mojokerto (Poin 1) */}
                <p className="text-xl font-bold mb-3 tracking-wider uppercase text-yellow-300 reveal-item">
                    #LogistikKita
                </p>

                {/* Judul Utama */}
                <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 reveal-item text-green-400">
                    Logistik Mojokerto Baru
                </h1>

                {/* Sub-judul/Moto */}
                <p className="text-lg sm:text-2xl mb-12 max-w-3xl mx-auto reveal-item font-light">
                    Solusi pengiriman terpercaya dan efisien untuk kebutuhan bisnis Anda di Jawa Timur dan seluruh Indonesia.
                </p>

                <div className="flex justify-center space-x-4 reveal-item">
                    <a 
                        href="#tracking" 
                        className="flex items-center px-6 py-3 bg-[var(--color-primary)] text-gray-900 font-bold rounded-full hover:bg-[var(--color-primary-dark)] transition-all duration-300 shadow-xl"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        Lacak Resi Cepat
                    </a>
                    <a 
                        href="#services" 
                        className="hidden sm:flex items-center px-6 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                        <Truck className="w-5 h-5 mr-2" />
                        Lihat Layanan Kami
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
                <ChevronDown className="w-8 h-8 text-white/80" />
            </div>
        </section>
    );
};

export default Hero;

