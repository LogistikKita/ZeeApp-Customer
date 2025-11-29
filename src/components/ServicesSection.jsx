import React, { useEffect, useState } from 'react';
import { Truck, Ship, Clock, Shield, User, Map, Box, ArrowRight } from 'lucide-react';
import { collection, getDocs, query, orderBy, getFirestore } from 'firebase/firestore';

const iconMap = { "Truck": Truck, "Ship": Ship, "Clock": Clock, "Shield": Shield, "User": User, "Map": Map, "Box": Box };

const ServicesSection = ({ darkMode, navigateTo }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const db = getFirestore();
            const q = query(collection(db, "public_services"), orderBy("order", "asc"));
            const snap = await getDocs(q);
            setServices(snap.docs.map(d => d.data()));
        };
        fetchServices();
    }, []);

    return (
        <div className="py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Layanan Unggulan</h2>
                    <p className="opacity-60 max-w-2xl mx-auto">Solusi logistik terintegrasi yang paling diminati.</p>
                </div>
                
                {/* HANYA TAMPILKAN 3 LAYANAN */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                    {services.slice(0, 3).map((s, i) => {
                        const IconComponent = iconMap[s.icon] || Box;
                        return (
                            <div key={i} onClick={() => navigateTo('maintenance')} className={`p-6 rounded-3xl border transition cursor-pointer group ${darkMode ? 'bg-slate-800/50 border-white/5 hover:border-primary' : 'bg-white border-gray-100 hover:border-primary hover:shadow-lg'}`}>
                                <IconComponent className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition" />
                                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{s.title}</h3>
                                <p className="text-sm opacity-60">{s.desc}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mb-16">
                    <button 
                        onClick={() => navigateTo('maintenance')}
                        className={`px-8 py-3 rounded-full font-bold text-sm transition border ${darkMode ? 'border-white/20 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-slate-900'}`}
                    >
                        Lihat Semua Layanan
                    </button>
                </div>

                <div className={`pt-10 border-t ${darkMode ? 'border-white/5' : 'border-gray-200'}`}>
                    <p className="text-center text-xs font-bold opacity-50 uppercase tracking-widest mb-10">Dipercaya Oleh</p>
                    <div className="flex overflow-x-auto gap-12 pb-4 opacity-50 grayscale hover:grayscale-0 transition duration-500 items-center justify-start md:justify-center no-scrollbar">
                        {["GOJEK", "TOKOPEDIA", "SHOPEE", "LAZADA", "BUKALAPAK", "BLIBLI"].map((client, i) => <span key={i} className={`text-2xl font-black flex-shrink-0 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{client}</span>)}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ServicesSection;
