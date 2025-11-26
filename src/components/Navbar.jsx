import React, { useState } from 'react';
import { Menu, X, Truck, Phone } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Layanan', href: '#services' },
        { name: 'Keunggulan', href: '#metrics' },
        { name: 'Pelacakan', href: '#hero' },
    ];

    return (
        <header className="fixed w-full z-50 bg-[var(--color-dark)]/90 backdrop-blur-sm shadow-lg border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo (Menggambarkan Kurir Bersayap / Logistik Kita) */}
                    <a href="#hero" className="flex items-center space-x-2 text-2xl font-bold text-[var(--color-primary)]">
                        <Truck className="h-6 w-6 transform -translate-y-px" strokeWidth={3} />
                        <span className="hidden sm:block">Logistik Kita</span>
                        <span className="sm:hidden">LogKita</span>
                    </a>

                    {/* Navigasi Desktop */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        {navItems.map((item) => (
                            <a 
                                key={item.name} 
                                href={item.href} 
                                className="text-gray-300 hover:text-[var(--color-accent)] font-medium transition duration-300"
                            >
                                {item.name}
                            </a>
                        ))}
                        {/* Tombol Hubungi Kami */}
                        <a 
                            href="#contact" 
                            className="flex items-center space-x-1 px-4 py-2 bg-[var(--color-primary)] text-white rounded-full font-semibold shadow-xl hover:bg-red-700 transition duration-300 ring-2 ring-[var(--color-primary)]/50"
                        >
                            <Phone className="w-4 h-4" />
                            <span>Hubungi Kami</span>
                        </a>
                    </nav>

                    {/* Tombol Mobile Menu */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="p-2 text-gray-400 hover:text-[var(--color-primary)] focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-800 pb-3">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-[var(--color-primary)] transition duration-300"
                            >
                                {item.name}
                            </a>
                        ))}
                        <a 
                            href="#contact" 
                            onClick={() => setIsOpen(false)}
                            className="block mt-2 px-3 py-2 text-center bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300"
                        >
                            Hubungi Kami
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

