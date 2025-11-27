import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck } from 'lucide-react';

const HeroSection = ({ onSearch, darkMode }) => {
    const [id, setId] = useState('');

    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 text-center md:text-left animate-fade-in">
                    
                    {/* Badge Merah */}
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
                        <ShieldCheck className="w-3 h-3 mr-2" /> Partner Logistik Terpercaya
                    </div>
                    
                    {/* Judul dengan Gradient Merah */}
                    <h1 className={`text-5xl md:text-7xl font-extrabold leading-tight mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Kirim Paket <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">Tanpa Batas</span>
                    </h1>
                    
                    <p className={`text-lg mb-8 max-w-lg mx-auto md:mx-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Solusi ekspedisi modern untuk pebisnis & personal. Cek tarif, lacak resi, dan sewa armada dalam satu aplikasi.
                    </p>
                    
                    {/* Form Lacak dengan Tombol Merah */}
                    <form onSubmit={(e) => { e.preventDefault(); onSearch(id.toUpperCase()); }} className={`p-2 rounded-2xl shadow-2xl flex items-center gap-2 max-w-md mx-auto md:mx-0 ${darkMode ? 'bg-white/5 border border-white/10 backdrop-blur-md' : 'bg-white border border-gray-100'}`}>
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Masukkan Nomor Resi..." className={`w-full h-14 pl-12 pr-4 bg-transparent border-none focus:ring-0 font-mono text-lg outline-none ${darkMode ? 'text-white placeholder-gray-500' : 'text-slate-900 placeholder-gray-400'}`} />
                        </div>
                        <button type="submit" className="h-12 px-6 bg-primary hover:bg-red-600 text-white rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-primary/20">
                            Lacak <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                <div className="md:w-1/2 mt-16 md:mt-0 relative hidden md:block">
                    {/* Blob Background Merah */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                    <img src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=1000&q=80" alt="Logistics" className="relative z-10 rounded-[40px] shadow-2xl border-4 border-white/20 transform rotate-2 hover:rotate-0 transition duration-700 object-cover w-full h-[500px]" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;


