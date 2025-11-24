import React from 'react';
import Carousel from './Carousel';
import { Package, Truck, Box, Users, ShoppingCart, Lock, ChevronRight } from 'lucide-react';

// Data Dummy Layanan
const servicesData = [
    { 
        title: "Layanan FTL (Full Truck Load)", 
        description: "Penyewaan truk eksklusif untuk satu pelanggan, memastikan keamanan dan jadwal yang terjamin.", 
        icon: Truck, 
        color: "bg-blue-600/10 text-blue-600"
    },
    { 
        title: "Layanan LTL (Less Than Truckload)", 
        description: "Opsi pengiriman barang dalam volume kecil yang digabung dengan muatan lain untuk efisiensi biaya.", 
        icon: Package, 
        color: "bg-green-600/10 text-green-600"
    },
    { 
        title: "Cargo Udara", 
        description: "Solusi tercepat untuk pengiriman antar pulau dan internasional dengan prioritas kecepatan.", 
        icon: Box, 
        color: "bg-red-600/10 text-red-600"
    },
    { 
        title: "Custom Clearance & Dokumen", 
        description: "Pengurusan izin impor/ekspor dan dokumen bea cukai yang rumit secara profesional.", 
        icon: Lock, 
        color: "bg-yellow-600/10 text-yellow-600"
    },
    { 
        title: "Jasa Pindahan Rumah/Kantor", 
        description: "Layanan pindahan terintegrasi, mulai dari *packing*, transportasi, hingga penataan di lokasi baru.", 
        icon: Users, 
        color: "bg-indigo-600/10 text-indigo-600"
    },
    { 
        title: "E-Commerce Fulfillment", 
        description: "Manajemen gudang, *picking*, *packing*, hingga *last-mile delivery* untuk bisnis online Anda.", 
        icon: ShoppingCart, 
        color: "bg-pink-600/10 text-pink-600"
    },
];

// Sub-komponen Kartu Layanan
const ServiceCard = ({ item }) => {
    const Icon = item.icon;
    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-xl border border-gray-100 dark:border-zinc-700 h-full flex flex-col justify-between reveal-item">
            
            <div className={`p-4 rounded-xl ${item.color} w-fit mb-4`}>
                <Icon className="w-8 h-8"/>
            </div>

            <h3 className="text-xl font-bold mb-2 text-[var(--color-dark)]">
                {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                {item.description}
            </p>

            <a 
                href="maintenance.html" 
                className="inline-flex items-center text-sm font-semibold text-[var(--color-primary)] hover:underline transition-colors mt-auto"
            >
                Pelajari Lebih Lanjut
                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"/>
            </a>
        </div>
    );
};

const ServicesSection = () => {
    return (
        <section id="layanan-unggulan" className="py-20 bg-white dark:bg-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Section */}
                <div className="text-center mb-12 reveal-item">
                    <span className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                        Solusi Total Logistik
                    </span>
                    <h2 className="text-4xl font-extrabold text-[var(--color-dark)] mt-2">
                        Layanan yang Kami Tawarkan
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Mulai dari pengiriman darat, laut, udara, hingga solusi manajemen rantai pasok lengkap.
                    </p>
                </div>

                {/* Implementasi Carousel - Menggunakan 4 slide per tampilan untuk layanan */}
                <div className="mt-10">
                    <Carousel slidesPerView={4} gap="gap-6">
                        {servicesData.map((service, index) => (
                            <ServiceCard key={index} item={service} />
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
