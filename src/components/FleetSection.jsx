import React from 'react';
// import Carousel from './Carousel'; // <-- ❌ DIHAPUS SEMENTARA (SUMBER CRASH KEDUA)
// Icon yang DIBUTUHKAN (termasuk ChevronRight)
import { Box, Truck, Package, Ship, Plane, ChevronRight } from 'lucide-react'; 

// Data Dummy Armada
const fleetData = [
  // ... (Data Armada tidak perlu diubah) ...
  { 
    title: "CDD Box (4 Roda)", 
    description: "Ideal untuk pengiriman barang sedang di perkotaan dan antarkota dekat.", 
    capacity: "2.5 Ton / 12 CBM", 
    image: "/fleet/cdd-box.jpg", 
    icon: Truck 
  },
  { 
    title: "Fuso Box (6 Roda)", 
    description: "Solusi untuk muatan berat dan volume besar ke berbagai pulau di Indonesia.", 
    capacity: "8 Ton / 30 CBM", 
    image: "/fleet/fuso-box.jpg", 
    icon: Box 
  },
  { 
    title: "Trailer 40 Feet", 
    description: "Digunakan untuk pengiriman kontainer berat dan besar (FCL) antar pelabuhan.", 
    capacity: "25 Ton / 70 CBM", 
    image: "/fleet/trailer.jpg", 
    icon: Ship 
  },
  { 
    title: "Blind Van / L300", 
    description: "Kendaraan cepat untuk pengiriman retail (last-mile) atau barang sensitif.", 
    capacity: "1 Ton / 5 CBM", 
    image: "/fleet/blind-van.jpg", 
    icon: Package 
  },
  { 
    title: "Wingbox Tronton", 
    description: "Memudahkan bongkar muat dari sisi samping, sangat efisien untuk industri.", 
    capacity: "18 Ton / 45 CBM", 
    image: "/fleet/wingbox.jpg", 
    icon: Truck 
  },
];

// Sub-komponen Kartu Armada
const FleetCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 reveal-item">
      
      {/* Gambar Armada */}
      <div className="h-40 bg-gray-200 dark:bg-zinc-700 relative overflow-hidden">
        <img 
            src={item.image || "/placeholder-truck.jpg"} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {item.capacity}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-[var(--color-primary)] flex items-center">
            <Icon className="w-5 h-5 mr-2" /> {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {item.description}
        </p>

        <a 
            href="#contact-cta" 
            className="inline-flex items-center text-sm font-semibold text-[var(--color-dark)] dark:text-white hover:text-[var(--color-primary)] transition-colors group" // Tambah group
        >
            Lihat Detail & Harga 
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"/> {/* <-- SUDAH DI-IMPORT */}
        </a>
      </div>
    </div>
  );
};

const FleetSection = () => {
  return (
    <section id="armada" className="py-20 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 reveal-item">
          <span className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
            Armada Logistik Kita
          </span>
          <h2 className="text-4xl font-extrabold text-[var(--color-dark)] mt-2">
            Pilihan Kendaraan untuk Setiap Kebutuhan
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Kami memiliki armada modern dan terawat, siap mengantarkan muatan Anda dengan aman dan tepat waktu, dari paket kecil hingga kargo berat.
          </p>
        </div>

        {/* Implementasi Grid Sederhana (MENGGANTIKAN CAROUSEL SEMENTARA) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleetData.map((fleet, index) => (
              <FleetCard key={index} item={fleet} />
            ))}
        </div>
        
        {/* Tombol CTA (Optional) */}
        <div className="text-center mt-16 reveal-item">
            <a 
                href="maintenance.html" 
                className="inline-block px-8 py-3 text-lg font-semibold text-white bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary-dark)] transition-all duration-300 shadow-xl shadow-[var(--color-primary)]/30"
            >
                Lihat Semua Kapasitas Armada
            </a>
        </div>

      </div>
    </section>
  );
};

export default FleetSection;
