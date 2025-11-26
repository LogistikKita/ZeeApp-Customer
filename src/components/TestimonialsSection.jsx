import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => (
    <div className="py-20 bg-zinc-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-10">Klien Kami</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[1,2,3].map((i) => (
                    <div key={i} className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
                        <div className="flex justify-center mb-2"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/></div>
                        <p className="text-gray-400 italic">"Layanan sangat cepat dan memuaskan."</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
export default TestimonialsSection;


