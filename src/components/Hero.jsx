import React from 'react';

const Hero = () => {
    return (
        <section 
            id="hero" 
            className="relative h-screen bg-cover bg-center flex items-center justify-center text-center overflow-hidden" 
            style={{ 
                // !!! PENTING: PASTIKAN PATH INI BENAR MENGGUNAKAN ROOT PATH /
                // DAN PASTIKAN FILE background-lk.jpg ADA DI FOLDER PUBLIC/
                backgroundImage: 'url(/background-lk.jpg)', 
                minHeight: '85vh', 
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            {/* Overlay Gelap */}
            <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-10"></div>

            {/* Konten Hero */}
            <div className="relative z-20 text-white p-6 max-w-4xl">
                
                {/* Logo Transparan di Tengah */}
                <div className="mb-8 opacity-50 max-w-xs mx-auto">
                    {/* Menggunakan root path /Logistik-Kita.png dari folder /public/ */}
                    <img 
                        src="/Logistik-Kita.png" 
                        alt="Logistik Kita Logo" 
                        className="w-full h-auto drop-shadow-lg"
                    />
                </div>
                
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight reveal-item">
                    SOLUSI LOGISTIK TERPADU DAN TERPERCAYA
                </h1>
                <p className="text-lg sm:text-xl mb-8 drop-shadow-md reveal-item delay-100">
                    Kami menyediakan layanan pengiriman barang yang cepat, aman, dan efisien ke seluruh Indonesia.
                </p>
                <a 
                    href="#contact-cta" 
                    className="inline-block px-10 py-4 text-lg font-bold bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-dark)] transition-all duration-300 shadow-2xl reveal-item delay-200"
                >
                    SIMULASI HARGA & JADWAL
                </a>
            </div>
        </section>
    );
};

export default Hero;
