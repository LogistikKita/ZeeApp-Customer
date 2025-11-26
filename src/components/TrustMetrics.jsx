import React from 'react';
import { Package, UserCheck, DollarSign, Clock } from 'lucide-react';

const stats = [
    { icon: Package, value: '10 Juta+', label: 'Total Pengiriman Sukses', color: 'text-green-500' },
    { icon: UserCheck, value: '500+', label: 'Klien Bisnis Aktif', color: 'text-blue-500' },
    { icon: DollarSign, value: '99.9%', label: 'Jaminan Keamanan Barang', color: 'text-yellow-500' },
    { icon: Clock, value: '24 Jam', label: 'Layanan Bantuan & Dukungan', color: 'text-red-500' },
];

const clientLogos = [
    'https://placehold.co/80x40/0d0c22/34D399?text=PT.A',
    'https://placehold.co/80x40/0d0c22/34D399?text=UD.B',
    'https://placehold.co/80x40/0d0c22/34D399?text=CV.C',
    'https://placehold.co/80x40/0d0c22/34D399?text=Toko+D',
    'https://placehold.co/80x40/0d0c22/34D399?text=PT.E',
    'https://placehold.co/80x40/0d0c22/34D399?text=Mitra+F',
];

const TrustMetrics = () => {
    return (
        <section id="trust-metrics" className="py-16 sm:py-24 bg-white dark:bg-zinc-900 border-t border-b border-gray-100 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-[var(--color-dark)] dark:text-white reveal-item">
                    Mengapa Memilih Kami?
                </h2>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-16">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div 
                                key={index} 
                                className="text-center p-4 bg-gray-50 dark:bg-zinc-950 rounded-xl shadow-lg transition-all hover:shadow-xl reveal-item"
                                style={{ animationDelay: `${0.5 + index * 0.15}s` }}
                            >
                                <Icon className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 ${stat.color}`} />
                                <p className="text-2xl sm:text-3xl font-bold text-[var(--color-dark)] dark:text-white">{stat.value}</p>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Client Logos */}
                <div className="text-center mt-16">
                    <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-6 reveal-item">
                        Dipercaya oleh ratusan UMKM dan perusahaan besar:
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 reveal-item">
                        {clientLogos.map((logo, index) => (
                            <img 
                                key={index} 
                                src={logo} 
                                alt={`Klien ${index + 1}`} 
                                className="h-8 sm:h-10 object-contain grayscale opacity-60 hover:opacity-100 transition-opacity duration-300" 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustMetrics;

