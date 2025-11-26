import React from 'react';
import { Truck, MapPin, Users, Shield } from 'lucide-react';

const TrustMetrics = () => {
    const metrics = [
        { icon: Truck, label: "Armada", value: "100+" },
        { icon: MapPin, label: "Kota", value: "34" },
        { icon: Users, label: "Klien", value: "5k+" },
        { icon: Shield, label: "Aman", value: "100%" },
    ];
    return (
        <div className="py-12 bg-zinc-950 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                {metrics.map((m, i) => (
                    <div key={i} className="text-center group">
                        <m.icon className="w-8 h-8 mx-auto text-gray-600 group-hover:text-green-500 transition mb-2" />
                        <div className="text-3xl font-bold text-white">{m.value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest">{m.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default TrustMetrics;


