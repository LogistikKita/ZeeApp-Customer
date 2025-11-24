import React from 'react';
import { Truck, TrendingUp, Users, Clock } from 'lucide-react';

// Data Dummy Metrik (Poin 2)
const metricData = [
    { 
        icon: Truck, 
        value: "250+", 
        label: "Armada Siap Beroperasi",
        color: "text-blue-500"
    },
    { 
        icon: TrendingUp, 
        value: "5,000+", 
        label: "Pengiriman Sukses (Bulanan)",
        color: "text-green-500"
    },
    { 
        icon: Users, 
        value: "100+", 
        label: "Mitra Bisnis Loyal",
        color: "text-yellow-500"
    },
    { 
        icon: Clock, 
        value: "99.8%", 
        label: "Tingkat Ketepatan Waktu",
        color: "text-red-500"
    },
];

// Data Dummy Logo Klien (Poin 6)
const clientLogos = [
    "https://placehold.co/100x40/f3f4f6/333?text=UMKM+1",
    "https://placehold.co/100x40/f3f4f6/333?text=PT.+Besar",
    "https://placehold.co/100x40/f3f4f6/333?text=Toko+Online",
    "https://placehold.co/100x40/f3f4f6/333?text=Distributor",
    "https://placehold.co/100x40/f3f4f6/333?text=Pabrik+Lokal",
    "https://placehold.co/100x40/f3f4f6/333?text=Startup+Tech",
];

const MetricCard = ({ item }) => {
    const Icon = item.icon;
    return (
        <div className="text-center p-4 reveal-item">
            <Icon className={`w-10 h-10 mx-auto mb-3 ${item.color}`} />
            <h3 className="text-3xl font-extrabold text-[var(--color-dark)] dark:text-white">
                {item.value}
            </h3>
            <p className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400">
                {item.label}
            </p>
        </div>
    );
};

const TrustMetrics = () => {
    return (
        <section className="py-12 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Bagian Metrik Kepercayaan */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b pb-12 border-gray-100 dark:border-zinc-800">
                    {metricData.map((metric, index) => (
                        <MetricCard key={index} item={metric} />
                    ))}
                </div>

                {/* Bagian Logo Klien (Poin 6) */}
                <div className="text-center mb-6 reveal-item">
                    <p className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-6">
                        Dipercaya oleh UMKM dan Korporasi di Jawa Timur
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 opacity-70">
                        {clientLogos.map((logo, index) => (
                            <img 
                                key={index} 
                                src={logo} 
                                alt={`Klien ${index + 1}`} 
                                className="h-8 max-w-[120px] object-contain grayscale hover:grayscale-0 transition duration-300"
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x40/f3f4f6/333?text=Klien" }} // Fallback
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TrustMetrics;

