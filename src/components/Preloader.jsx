import React from 'react';

const Preloader = ({ loading }) => {
    // Tambahkan state agar saat loading jadi false, ada jeda untuk animasi keluar
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => setIsVisible(false), 600); // Waktu transisi fade-out
            return () => clearTimeout(timer);
        }
    }, [loading]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center transition-all duration-500 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none scale-110'}`}>
            <div className="relative flex items-center justify-center">
                {/* Cincin Luar Merah (Lambat) */}
                <div className="absolute w-40 h-40 border-4 border-transparent border-t-primary/60 border-b-primary/20 rounded-full animate-spin-slow"></div>
                
                {/* Cincin Dalam Putih (Cepat Berlawanan Arah) */}
                <div className="absolute w-32 h-32 border-2 border-transparent border-l-white/40 border-r-white/10 rounded-full animate-spin-reverse-fast"></div>
                
                {/* Logo di Tengah (Berdenyut Merah) */}
                <div className="relative z-10 w-28 h-28 bg-slate-900 p-4 rounded-full border border-primary/20 shadow-2xl animate-pulse-glow-red flex items-center justify-center">
                    <img 
                        src="/Logistik-Kita.png" 
                        alt="Loading..." 
                        className="w-full h-full object-contain" 
                        onError={(e) => e.target.style.display = 'none'} // Sembunyikan jika gambar gagal load
                    />
                </div>
            </div>
            
            {/* Teks Loading */}
            <div className="mt-10 text-center">
                <h2 className="text-xl font-black tracking-tighter text-white mb-2 animate-pulse">
                    <span className="text-primary">LOGISTIK</span> KITA
                </h2>
                <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase animate-pulse opacity-80">Memuat Sistem...</p>
            </div>
        </div>
    );
};

export default Preloader;
