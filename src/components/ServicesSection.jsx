import React from 'react';
import { Truck, Zap, Globe, Box, Shield, User } from 'lucide-react';

const ServicesSection = () => {
    const services = [
        { title: "Kargo Darat", icon: Truck }, { title: "Express", icon: Zap },
        { title: "Kargo Laut", icon: Globe }, { title: "Gudang", icon: Box },
        { title: "Asuransi", icon: Shield }, { title: "Door-to-Door", icon: User },
    ];
    return (
        <div id="services" className="py-20 bg-zinc-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-10">Layanan Kami</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <div key={i} className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-green-500/50 transition flex items-center gap-4">
                            <s.icon className="w-8 h-8 text-green-600" />
                            <h3 className="text-xl font-bold text-white">{s.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ServicesSection;


