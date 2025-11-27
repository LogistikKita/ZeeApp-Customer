import React from 'react';
import { Users, Truck, UserCheck, CheckSquare } from 'lucide-react';

const TrustMetrics = ({ darkMode }) => {
    const metrics = [
        { icon: Users, label: "Pengunjung Website", value: "15.4K" },
        { icon: Truck, label: "Jumlah Armada", value: "120+" },
        { icon: UserCheck, label: "Mitra Armada", value: "850+" },
        { icon: CheckSquare, label: "Pengiriman Selesai", value: "54K+" },
    ];
    return (
        <div className="relative z-10 -mt-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <div key={i} className={`p-6 rounded-3xl text-center transform transition duration-300 hover:-translate-y-2 ${darkMode ? 'bg-slate-800 border border-white/5 shadow-lg shadow-black/30' : 'bg-white border border-gray-100 shadow-xl shadow-gray-200'}`}>
                        {/* ICON MERAH */}
                        <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary"><m.icon className="w-6 h-6" /></div>
                        <h3 className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{m.value}</h3>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{m.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default TrustMetrics;


