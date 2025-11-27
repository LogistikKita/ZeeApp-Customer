import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = ({ darkMode }) => {
    const reviews = [
        { name: "H. Samsul", role: "Juragan Beras", text: "Kiriman ke gudang Surabaya selalu aman dan tepat waktu. Sopirnya sopan-sopan." },
        { name: "Dewi Sartika", role: "Owner Online Shop", text: "Sistem trackingnya sangat membantu. Customer saya jadi tidak rewel tanya paket." },
        { name: "PT. Beton Jaya", role: "Corporate Partner", text: "Kerjasama B2B yang profesional. Invoice rapi dan termin pembayaran fleksibel." },
    ];
    return (
        <div className={`py-24 ${darkMode ? 'bg-slate-800/50' : 'bg-green-50/50'}`}>
            <div className="max-w-7xl mx-auto px-4 text-center mb-16"><h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Kata Mereka</h2></div>
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                {reviews.map((r, i) => (
                    <div key={i} className={`p-8 rounded-3xl relative ${darkMode ? 'bg-slate-800 border border-white/5' : 'bg-white shadow-xl shadow-gray-100'}`}>
                        <Quote className="absolute top-8 right-8 text-green-500/20 w-10 h-10" />
                        <div className="flex gap-1 mb-6">{[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}</div>
                        <p className={`text-lg italic mb-8 leading-relaxed opacity-80 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{r.text}"</p>
                        <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div><div><h4 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{r.name}</h4><p className="text-xs font-bold text-green-500 uppercase">{r.role}</p></div></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default TestimonialsSection;


