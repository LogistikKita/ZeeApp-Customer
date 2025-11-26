import React, { useState } from 'react';
import { Truck, Menu, X } from 'lucide-react';

const Navbar = ({ toggleAdmin, isAdminOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        {/* Coba load logo image, fallback ke icon jika gagal */}
                        <div className="bg-green-600 p-2 rounded-lg">
                             <Truck className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Logistik<span className="text-green-500">Kita</span></span>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#hero" className="text-sm font-medium text-gray-300 hover:text-green-500 transition">Beranda</a>
                        <a href="#tracking" className="text-sm font-medium text-gray-300 hover:text-green-500 transition">Lacak</a>
                        <a href="#services" className="text-sm font-medium text-gray-300 hover:text-green-500 transition">Layanan</a>
                        <button onClick={toggleAdmin} className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition ${isAdminOpen ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-green-600 hover:bg-green-500 text-white shadow-lg'}`}>
                            {isAdminOpen ? 'Tutup Admin' : 'Admin Panel'}
                        </button>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
            
            {isOpen && (
                <div className="md:hidden bg-zinc-950 border-t border-white/10 p-4 space-y-4">
                    <a href="#hero" className="block text-gray-300 hover:text-green-500">Beranda</a>
                    <a href="#tracking" className="block text-gray-300 hover:text-green-500">Lacak</a>
                    <button onClick={() => {toggleAdmin(); setIsOpen(false)}} className="w-full text-left text-green-500 font-bold">
                        {isAdminOpen ? 'Tutup Admin' : 'Admin Panel'}
                    </button>
                </div>
            )}
        </nav>
    );
};
export default Navbar;


