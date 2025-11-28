import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, MapPin, Truck } from 'lucide-react';

const HeroSection = ({ onSearch, darkMode }) => {
    // Mode: 'tracking' atau 'checking'
    const [mode, setMode] = useState('checking'); 
    
    // State untuk Form Cek Ongkir
    const [checkForm, setCheckForm] = useState({
        from: 'Mojokerto (Base)', // Default Base
        to: '',
        fleet: 'pickup'
    });

    // State untuk Tracking
    const [trackId, setTrackId] = useState('');

    const handleCheckOngkir = (e) => {
        e.preventDefault();
        
        // LOGIKA HYBRID:
        // 1. Buat pesan WhatsApp otomatis
        const text = `Halo Logistik Kita, saya mau cek estimasi harga pengiriman:\n\n` +
                     `📍 Dari: ${checkForm.from}\n` +
                     `🏁 Ke: ${checkForm.to}\n` +
                     `🚚 Armada: ${checkForm.fleet.toUpperCase()}\n\n` +
                     `Mohon info ketersediaan dan harga terbaik. Terima kasih.`;
        
        const encodedText = encodeURIComponent(text);
        const waNumber = "6281234567890"; // GANTI DENGAN NOMOR WA ANDA
        
        // 2. Buka WhatsApp di tab baru
        window.open(`https://wa.me/${waNumber}?text=${encodedText}`, '_blank');
    };

    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
                
                {/* TEXT CONTENT */}
                <div className="md:w-1/2 text-center md:text-left animate-fade-in">
                    
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
                        <ShieldCheck className="w-3 h-3 mr-2" /> Partner Logistik Terpercaya
                    </div>
                    
                    <h1 className={`text-5xl md:text-7xl font-extrabold leading-tight mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Kirim Paket <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">Tanpa Batas</span>
                    </h1>
                    
                    <p className={`text-lg mb-8 max-w-lg mx-auto md:mx-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Solusi ekspedisi modern. Cek tarif sewa armada (Charter) atau lacak posisi barang Anda secara real-time.
                    </p>

                    {/* SWITCHER BUTTONS */}
                    <div className="flex justify-center md:justify-start gap-4 mb-6">
                        <button 
                            onClick={() => setMode('checking')}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition ${mode === 'checking' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-200 text-gray-600 dark:bg-slate-800 dark:text-gray-400'}`}
                        >
                            Cek Ongkir / Sewa
                        </button>
                        <button 
                            onClick={() => setMode('tracking')}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition ${mode === 'tracking' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-200 text-gray-600 dark:bg-slate-800 dark:text-gray-400'}`}
                        >
                            Lacak Resi
                        </button>
                    </div>
                    
                    {/* FORM CONTAINER */}
                    <div className={`p-4 rounded-3xl shadow-2xl max-w-md mx-auto md:mx-0 transition-all duration-300 ${darkMode ? 'bg-slate-800/50 border border-white/10 backdrop-blur-md' : 'bg-white border border-gray-100'}`}>
                        
                        {mode === 'checking' ? (
                            <form onSubmit={handleCheckOngkir} className="space-y-3">
                                <div className={`flex items-center px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
                                    <MapPin className="text-primary w-5 h-5 mr-3" />
                                    <input disabled value="Mojokerto (Garasi)" className="bg-transparent w-full outline-none text-sm font-bold opacity-70 cursor-not-allowed dark:text-white" />
                                </div>
                                <div className={`flex items-center px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
                                    <MapPin className="text-gray-400 w-5 h-5 mr-3" />
                                    <input 
                                        placeholder="Ketik Kota Tujuan..." 
                                        className="bg-transparent w-full outline-none text-sm font-semibold dark:text-white"
                                        value={checkForm.to}
                                        onChange={(e) => setCheckForm({...checkForm, to: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className={`flex items-center px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
                                    <Truck className="text-gray-400 w-5 h-5 mr-3" />
                                    <select 
                                        className="bg-transparent w-full outline-none text-sm font-semibold dark:text-white dark:bg-slate-900"
                                        value={checkForm.fleet}
                                        onChange={(e) => setCheckForm({...checkForm, fleet: e.target.value})}
                                    >
                                        <option value="pickup">Pickup (1.5 Ton)</option>
                                        <option value="cde">Engkel Box (2.2 Ton)</option>
                                        <option value="cdd">CDD Bak (5 Ton)</option>
                                        <option value="fuso">Fuso Berat (8 Ton)</option>
                                        <option value="wingbox">Wingbox (20 Ton)</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full h-12 bg-primary hover:bg-red-600 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                                    Cek Estimasi via WA <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={(e) => { e.preventDefault(); onSearch(trackId.toUpperCase()); }} className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input 
                                        value={trackId} 
                                        onChange={(e) => setTrackId(e.target.value)} 
                                        placeholder="No. Resi (Contoh: LKG-001)" 
                                        className={`w-full h-14 pl-12 pr-4 bg-transparent border-none focus:ring-0 font-mono text-lg outline-none ${darkMode ? 'text-white placeholder-gray-500' : 'text-slate-900 placeholder-gray-400'}`} 
                                    />
                                </div>
                                <button type="submit" className="h-12 w-12 bg-primary hover:bg-red-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </form>
                        )}

                    </div>
                    {/* INFO TEXT */}
                    <p className="mt-4 text-xs text-gray-500 text-center md:text-left">
                        *Harga di WhatsApp adalah harga final & bisa nego.
                    </p>
                </div>

                {/* IMAGE */}
                <div className="md:w-1/2 mt-16 md:mt-0 relative hidden md:block">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                    <img src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=1000&q=80" alt="Logistics" className="relative z-10 rounded-[40px] shadow-2xl border-4 border-white/20 transform rotate-2 hover:rotate-0 transition duration-700 object-cover w-full h-[500px]" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
