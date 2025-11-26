import React from 'react';
import { Zap, Clock } from 'lucide-react';

const HeroSection = () => (
    <div id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
             <img src="/background-lk.jpg" alt="Background" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <Zap className="w-3 h-3 mr-2" /> Solusi Logistik #1
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                    Kirim Paket <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Tanpa Batas</span>
                </h1>
                <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto md:mx-0">
                    Layanan pengiriman kargo modern dengan jangkauan seluruh Indonesia.
                </p>
                <a href="#tracking" className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold shadow-lg transition transform hover:scale-105 inline-block">
                    Mulai Lacak
                </a>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0 relative hidden md:block">
                 {/* Gambar Truk Placeholder */}
                <div className="relative z-10 bg-zinc-900 rounded-3xl p-4 border border-zinc-800 shadow-2xl">
                     <div className="h-64 bg-zinc-800 rounded-2xl flex items-center justify-center text-gray-600">
                        [Gambar Truk / Ilustrasi]
                     </div>
                </div>
            </div>
        </div>
    </div>
);
export default HeroSection;


