import React, { useEffect, useState } from 'react';
import { Truck, Ship, Clock, Shield, User, Map, Box, ArrowRight } from 'lucide-react';
import { collection, getDocs, query, orderBy, getFirestore } from 'firebase/firestore';

const iconMap = { "Truck": Truck, "Ship": Ship, "Clock": Clock, "Shield": Shield, "User": User, "Map": Map, "Box": Box };

const ServicesSection = ({ darkMode, navigateTo }) => {
    const [services, setServices] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        // 1. Fetch Data
        const fetchServices = async () => {
            const db = getFirestore();
            // Ambil semua layanan, nanti kita slice di render
            const q = query(collection(db, "public_services"), orderBy("order", "asc"));
            const snap = await getDocs(q);
            setServices(snap.docs.map(d => d.data()));
        };
        fetchServices();

        // 2. Cek Ukuran Layar untuk Responsif
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fungsi untuk merender Kartu Layanan
    const renderServiceCard = (s, i) => {
        const IconComponent = iconMap[s.icon] || Box;
        return (
            <div key={i} onClick={() => navigateTo('maintenance')} className={`flex-shrink-0 snap-center w-64 p-6 rounded-3xl border transition cursor-pointer group ${darkMode ? 'bg-slate-800 border-white/10 hover:border-primary hover:bg-slate-800/80' : 'bg-white border-gray-100 hover:border-primary hover:shadow-lg'}`}>
                {/* Icon: Merah menyala */}
                <IconComponent className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition drop-shadow-[0_0_8px_rgba(253,0,31,0.3)]" />
                
                {/* Judul: Putih terang di dark mode */}
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white group-hover:text-primary' : 'text-slate-900'}`}>
                    {s.title}
                </h3>
                
                {/* Deskripsi: Abu terang agar terbaca */}
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300 opacity-90' : 'text-gray-600 opacity-80'}`}>
                    {s.desc}
                </p>
            </div>
        );
    };

    return (
        <div className="py-16 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Layanan Unggulan</h2>
                    <p className="opacity-60 max-w-2xl mx-auto text-sm md:text-base">Solusi logistik terintegrasi yang paling diminati.</p>
                </div>
                
                {/* --- LOGIKA TAMPILAN (MOBILE vs DESKTOP) --- */}
                {isMobile ? (
                    // TAMPILAN MOBILE: CAROUSEL GESER SAMPING (Hemat Tempat)
                    <div className="flex overflow-x-auto gap-4 pb-8 snap-x no-scrollbar px-2">
                        {services.map((s, i) => renderServiceCard(s, i))}
                         {/* Tombol Lihat Semua di ujung carousel */}
                         <div className="flex-shrink-0 snap-center w-32 flex flex-col items-center justify-center">
                            <button onClick={() => navigateTo('maintenance')} className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg mb-2 hover:bg-red-600 transition">
                                <ArrowRight />
                            </button>
                            <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Lihat Semua</span>
                        </div>
                    </div>
                ) : (
                    // TAMPILAN DESKTOP: GRID KE BAWAH (Hanya 3 teratas)
                    <div className="grid grid-cols-3 gap-6 mb-12">
                         {services.slice(0, 3).map((s, i) => renderServiceCard(s, i))}
                    </div>
                )}


                {/* Tombol Lihat Semua (Hanya di Desktop, di mobile sudah ada di ujung carousel) */}
                {!isMobile && (
                    <div className="text-center mb-16">
                        <button 
                            onClick={() => navigateTo('maintenance')}
                            className={`px-8 py-3 rounded-full font-bold text-sm transition border flex items-center mx-auto gap-2 ${darkMode ? 'border-white/20 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-slate-900'}`}
                        >
                            Lihat Semua Layanan <ArrowRight className="w-4 h-4"/>
                        </button>
                    </div>
                )}

                {/* Bagian Dipercaya Oleh (Kontras Diperbaiki) */}
                <div className={`pt-10 border-t ${darkMode ? 'border-white/5' : 'border-gray-200'}`}>
                    <p className="text-center text-xs font-bold opacity-50 uppercase tracking-widest mb-8">Dipercaya Oleh</p>
                    {/* Ubah opacity dan warna text agar lebih terang di dark mode */}
                    <div className={`flex overflow-x-auto gap-12 pb-4 transition duration-500 items-center justify-start md:justify-center no-scrollbar ${darkMode ? 'opacity-80 grayscale hover:grayscale-0 text-white' : 'opacity-50 grayscale hover:grayscale-0 text-slate-800'}`}>
                        {["GOJEK", "TOKOPEDIA", "SHOPEE", "LAZADA", "BUKALAPAK", "BLIBLI"].map((client, i) => <span key={i} className="text-2xl font-black flex-shrink-0">{client}</span>)}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ServicesSection;
