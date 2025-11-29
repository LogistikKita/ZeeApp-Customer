import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Search, Truck } from 'lucide-react';

const Navbar = ({ navigateTo, darkMode, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { label: 'Beranda', action: () => navigateTo('home') },
        { label: 'Layanan', action: () => navigateTo('maintenance') },
        { label: 'Galeri', action: () => navigateTo('maintenance') },
        { label: 'Blog', action: () => navigateTo('maintenance') },
        { label: 'Mitra', action: () => navigateTo('mitra') }, // LINK BARU
        { label: 'Lapak Kita', action: () => navigateTo('maintenance') },
        { label: 'Kontak', action: () => navigateTo('contact') },
    ];

    const isGlassmorphism = scrolled || isOpen;

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isGlassmorphism ? 'glass shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* LOGO */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
                        <img src="/Logistik-Kita.png" alt="Logo" className="h-10 w-auto object-contain" onError={(e) => e.target.style.display='none'} />
                        <div>
                            <span className={`font-extrabold text-xl tracking-tighter leading-none block ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                <span className="text-primary">LOGISTIK</span> KITA
                            </span>
                            <span className="text-[10px] text-gray-500 font-bold tracking-widest block">MOJOKERTO</span>
                        </div>
                    </div>

                    {/* DESKTOP MENU */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {menuItems.map((item, idx) => (
                            <button 
                                key={idx} 
                                onClick={item.action}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-primary hover:bg-white/10' : 'text-gray-600 hover:text-primary hover:bg-gray-100'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* ACTIONS */}
                    <div className="hidden lg:flex items-center gap-3">
                        <div className={`p-2 rounded-full cursor-pointer transition ${darkMode ? 'hover:bg-white/10 text-gray-300 hover:text-primary' : 'hover:bg-gray-100 text-gray-600 hover:text-primary'}`}>
                            <Search className="w-5 h-5" />
                        </div>
                        
                        <button onClick={toggleTheme} className={`p-2 rounded-full transition ${darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-200 text-gray-600'}`}>
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        
                        <button onClick={() => navigateTo('maintenance')} className="px-5 py-2.5 bg-primary hover:bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/30 transition transform hover:scale-105">
                            DAFTAR / LOGIN
                        </button>
                    </div>

                    {/* MOBILE TOGGLE */}
                    <div className="lg:hidden flex items-center gap-4">
                        <div className={`${darkMode ? 'text-white' : 'text-slate-900'}`}><Search className="w-5 h-5"/></div>
                        <button onClick={toggleTheme} className={`${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}>{darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                        <button onClick={() => setIsOpen(!isOpen)} className={`${darkMode ? 'text-white' : 'text-slate-900'}`}>{isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}</button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isOpen && (
                <div className={`lg:hidden absolute top-20 left-0 w-full p-4 flex flex-col gap-2 shadow-2xl animate-fade-in ${darkMode ? 'bg-slate-900/95 border-b border-white/10 backdrop-blur-xl' : 'bg-white/95 border-b border-gray-200 backdrop-blur-xl'}`}>
                    {menuItems.map((item, idx) => (
                        <button key={idx} onClick={() => { item.action(); setIsOpen(false); }} className={`text-left p-3 rounded-xl font-medium ${darkMode ? 'text-gray-200 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>{item.label}</button>
                    ))}
                    <button onClick={() => navigateTo('maintenance')} className="w-full py-3 bg-primary text-white font-bold rounded-xl mt-2">LOGIN / DAFTAR</button>
                </div>
            )}
        </nav>
    );
};
export default Navbar;
