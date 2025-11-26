import React from 'react';
import { Search, Truck, Loader, XCircle } from 'lucide-react';

const HeroSection = ({ 
    onTrack, 
    trackingError, 
    trackingResult, 
    isTrackingLoading, 
    setTrackingNumber, 
    trackingNumber 
}) => {
    // Fungsi untuk menangani input perubahan
    const handleInputChange = (e) => {
        setTrackingNumber(e.target.value.toUpperCase());
    };

    // Fungsi untuk menangani klik tombol tracking
    const handleTrackClick = (e) => {
        e.preventDefault();
        if (trackingNumber) {
            onTrack(trackingNumber);
        }
    };

    return (
        <section id="hero" className="relative pt-24 pb-20 overflow-hidden text-center">
            {/* Background Truck Image (Simulasi dari Mockup) */}
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ 
                backgroundImage: "url('https://placehold.co/1200x600/171717/E51D2A?text=Truck+in+Motion')", 
                filter: 'brightness(0.6)'
            }}></div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Tagline */}
                <span className="text-[var(--color-accent)] font-semibold tracking-widest text-sm">#LOGISTIKKITA</span>
                
                {/* Judul Utama */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-primary)] mt-3">
                    Logistik Mojokerto Baru
                </h1>
                
                {/* Subtitle */}
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    Solusi pengiriman terpercaya dan efisien untuk kebutuhan bisnis Anda di Jawa Timur dan seluruh Indonesia.
                </p>

                {/* Tracking Form */}
                <div className="mt-10 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-[var(--color-dark)] dark:text-white mb-4">
                        Lacak Pengiriman Anda
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                        Masukkan Nomor Resi (misalnya, MOJO-001) di bawah untuk melihat status dan lokasi terkini paket Anda.
                    </p>
                    
                    <form onSubmit={handleTrackClick} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Masukkan Nomor Resi, Contoh: MOJO-001"
                            value={trackingNumber}
                            onChange={handleInputChange}
                            className="flex-grow p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent dark:bg-zinc-900 dark:text-white text-[var(--color-dark)] transition duration-200"
                        />
                        <button
                            type="submit"
                            disabled={isTrackingLoading || !trackingNumber}
                            className="flex items-center justify-center p-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isTrackingLoading ? (
                                <Loader className="w-5 h-5 animate-spin mr-2" />
                            ) : (
                                <Search className="w-5 h-5 mr-2" />
                            )}
                            Lacak Sekarang
                        </button>
                    </form>

                    {/* Menampilkan Hasil atau Error */}
                    <div className="mt-4 text-left">
                        {/* Tampilan Error */}
                        {trackingError && (
                            <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-lg flex items-start space-x-2 border border-red-500">
                                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-red-700 dark:text-red-400">Pencarian Gagal:</p>
                                    <p className="text-red-600 dark:text-red-300 text-sm">{trackingError}</p>
                                </div>
                            </div>
                        )}

                        {/* Tampilan Hasil Tracking */}
                        {trackingResult && (
                            <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-lg border border-green-500">
                                <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-2">
                                    Resi Ditemukan: {trackingResult.id}
                                </h3>
                                <div className="space-y-3">
                                    <div className="text-sm">
                                        <p className="font-semibold text-gray-800 dark:text-gray-300">Status Terkini:</p>
                                        <p className="text-green-600 dark:text-green-400 font-bold">{trackingResult.status} ({trackingResult.date})</p>
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-gray-800 dark:text-gray-300">Lokasi Terkini:</p>
                                        <p className="text-gray-700 dark:text-gray-400">{trackingResult.location}</p>
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-gray-800 dark:text-gray-300 mt-2">Riwayat Perjalanan:</p>
                                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 ml-2 space-y-1">
                                            {trackingResult.details.map((detail, index) => (
                                                <li key={index} className="text-xs">{detail}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

