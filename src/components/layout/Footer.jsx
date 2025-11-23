import React from 'react';

const Footer = () => {
    return (
        <footer>
            {/* TUGASMU:
                SALIN SEMUA KODE DARI TAG <footer> LAMA KAMU KE SINI. 
                Pastikan semua "class" sudah diganti menjadi "className"
            */}
            
            {/* Contoh placeholder/kerangka Footer: */}
            <div className="bg-gray-100 dark:bg-gray-900 pt-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-t border-gray-200 dark:border-gray-700">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">LOGISTIK KITA</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Penyedia solusi logistik terpercaya dan efisien untuk kebutuhan bisnis Anda.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Layanan</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><a href="#" className="hover:text-primary transition">Kapasitas Armada</a></li>
                            <li><a href="#" className="hover:text-primary transition">Jangkauan</a></li>
                            <li><a href="#" className="hover:text-primary transition">Simulasi Harga</a></li>
                        </ul>
                    </div>
                    {/* Tambahkan kolom menu lainnya di sini */}
                </div>
            </div>
            
            <div className="bg-gray-200 dark:bg-gray-800 py-4">
                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Logistik Kita. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
