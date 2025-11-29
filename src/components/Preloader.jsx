import React from 'react';

const Preloader = ({ loading }) => {
    // State agar saat loading jadi false, ada jeda untuk animasi keluar
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
        if (!loading) {
            // Beri waktu 600ms untuk animasi fade-out sebelum komponen di-unmount
            const timer = setTimeout(() => setIsVisible(false), 600); 
            return () => clearTimeout(timer);
        }
    }, [loading]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center transition-all duration-500 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none scale-110'}`}>
            <div className="relative flex items-center justify-center">
                {/* Cincin Luar Merah (Lambat) */}
                <div className="absolute w-44 h-44 border-4 border-transparent border-t-primary/60 border-b-primary/20 rounded-full animate-spin-slow"></div>
                
                {/* Cincin Dalam Putih (Cepat Berlawanan Arah) */}
                <div className="absolute w-36 h-36 border-2 border-transparent border-l-white/40 border-r-white/10 rounded-full animate-spin-reverse-fast"></div>
                
                {/* GAMBAR TENGAH (REVISI: background-lk.jpg BULAT PENUH) */}
                {/* Hapus 'p-4' agar gambar full mentok ke pinggir */}
                <div className="relative z-10 w-32 h-32 bg-slate-900 rounded-full border-2 border-primary/50 shadow-2xl animate-pulse-glow-red flex items-center justify-center overflow-hidden">
                    <img 
                        src="/background-lk.jpg" // GANTI JADI INI
                        alt="Loading..." 
                        // GANTI JADI object-cover DAN TAMBAH rounded-full
                        className="w-full h-full object-cover rounded-full" 
                        onError={(e) => e.target.style.display = 'none'} 
                    />
                </div>
            </div>
            
            {/* Teks Loading */}
            <div className="mt-12 text-center">
                <h2 className="text-2xl font-black tracking-tighter text-white mb-3 animate-pulse">
                    <span className="text-primary">LOGISTIK</span> KITA
                </h2>
                <div className="flex items-center justify-center gap-2 opacity-80">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase animate-pulse">Memuat Sistem...</p>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
