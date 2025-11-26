import React from 'react';
import { Search, Loader, Truck, XCircle } from 'lucide-react';
import TrackingSection from './TrackingSection'; // Menggunakan nama file TrackingSection.jsx

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
        // Hanya memproses jika tidak sedang loading
        if (!isTrackingLoading) {
            setTrackingNumber(e.target.value.toUpperCase());
        }
    };

    // Fungsi untuk menangani klik tombol tracking
    const handleTrackClick = (e) => {
        e.preventDefault();
        if (trackingNumber && !isTrackingLoading) {
            onTrack(trackingNumber);
        }
    };
    
    // Tentukan apakah input harus disabled (saat loading inisial/pencarian)
    const isDisabled = isTrackingLoading;

    return (
        <section id="hero" className="relative pt-24 pb-20 overflow-hidden text-center bg-[var(--color-dark)]">
            {/* Background Truck Image (Simulasi dari Mockup) */}
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ 
                backgroundImage: "url('https://placehold.co/1200x600/171717/999999?text=Logistics+Truck')", 
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

                {/* Tracking Form Container */}
                <div className="mt-10 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-[var(--color-dark)] dark:text-white mb-4">
                        Lacak Pengiriman Anda
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                        Masukkan Nomor Resi (misalnya, MOJO-001 atau MOJO-002) di bawah untuk melihat status dan lokasi terkini paket Anda.
                    </p>
                    
                    <form onSubmit={handleTrackClick} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder={isDisabled ? "Memuat Sistem Logistik..." : "Masukkan Nomor Resi, Contoh: MOJO-001"}
                            value={trackingNumber}
                            onChange={handleInputChange}
                            className={`flex-grow p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent dark:bg-zinc-900 dark:text-white text-[var(--color-dark)] transition duration-200 ${isDisabled ? 'bg-gray-100 dark:bg-zinc-700 cursor-not-allowed' : ''}`}
                            disabled={isDisabled} 
                        />
                        <button
                            type="submit"
                            disabled={isDisabled || !trackingNumber}
                            className="flex items-center justify-center p-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isTrackingLoading ? (
                                <Loader className="w-5 h-5 animate-spin mr-2" />
                            ) : (
                                <Search className="w-5 h-5 mr-2" />
                            )}
                            {isTrackingLoading ? 'Memeriksa...' : 'Lacak Sekarang'}
                        </button>
                    </form>

                    {/* Menampilkan Pesan Awal/Loading Inisial */}
                    {isTrackingLoading && !trackingResult && !trackingError && (
                        <div className="bg-blue-100 dark:bg-blue-900/50 border border-blue-400 text-blue-700 dark:text-blue-300 p-4 rounded-lg mt-4" role="status">
                            <div className="flex items-center space-x-2">
                                <Loader className="w-5 h-5 animate-spin"/>
                                <p className="font-semibold">Sistem Logistik sedang dipersiapkan...</p>
                            </div>
                            <p className="text-sm mt-1">Mohon tunggu, kami sedang menghubungkan ke Database Resi.</p>
                        </div>
                    )}
                    
                    {/* Tampilan Error */}
                    {trackingError && (
                        <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-lg flex items-start space-x-2 border border-red-500 mt-4">
                            <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-red-700 dark:text-red-400">Pencarian Gagal:</p>
                                <p className="text-red-600 dark:text-red-300 text-sm">{trackingError}</p>
                            </div>
                        </div>
                    )}

                    {/* Tampilan Hasil Tracking (Menggunakan komponen TrackingSection) */}
                    {trackingResult && <TrackingSection result={trackingResult} />}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;