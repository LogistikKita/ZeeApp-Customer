import React, { useEffect, useState } from 'react';
// IMPORT ICON (Dipisah)
import { Users, Truck, UserCheck, CheckSquare } from 'lucide-react';
// IMPORT FIREBASE (Dipisah)
import { getFirestore, getDocs, collection } from 'firebase/firestore';

const iconMap = { "Users": Users, "Truck": Truck, "UserCheck": UserCheck, "CheckSquare": CheckSquare };

const TrustMetrics = ({ darkMode }) => {
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        const fetchMetrics = async () => {
            const db = getFirestore();
            // Data statis sebagai fallback
            const staticMetrics = [
                { icon: 'Users', label: "Pengunjung Website", value: "15.4K" },
                { icon: 'Truck', label: "Jumlah Armada", value: "120+" },
                { icon: 'UserCheck', label: "Mitra Armada", value: "850+" },
                { icon: 'CheckSquare', label: "Pengiriman Selesai", value: "54K+" },
            ];
            setMetrics(staticMetrics);
        };
        fetchMetrics();
    }, []);

    return (
        <div className="relative z-10 -mt-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => {
                    const IconComponent = iconMap[m.icon] || CheckSquare;
                    return (
                        <div key={i} className={`p-6 rounded-3xl text-center transform transition duration-300 hover:-translate-y-2 ${darkMode ? 'bg-slate-800 border border-white/5 shadow-lg shadow-black/30' : 'bg-white border border-gray-100 shadow-xl shadow-gray-200'}`}>
                            
                            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
                                <IconComponent className="w-6 h-6" />
                            </div>
                            
                            {/* FIX KONTRAST: Angka selalu putih/dark */}
                            <h3 className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{m.value}</h3>
                            
                            {/* FIX KONTRAST: Label selalu terang di dark mode */}
                            <p className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{m.label}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default TrustMetrics;

