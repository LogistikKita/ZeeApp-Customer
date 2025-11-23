import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Search, ChevronDown, Truck } from 'lucide-react'; 

const Navbar = () => {
    // STATE UNTUK MOBILE MENU
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // STATE UNTUK DARK MODE (Kita ambil dari localStorage saat load)
    const [isDark, setIsDark] = useState(
        localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
    
    // STATE UNTUK EFEK SCROLL NAVBAR
    const [scrolled, setScrolled] = useState(false);

    // LOGIKA EFEK: MENGATUR TEMA DAN SCROLL
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }

        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDark, scrolled]); 

    // LOGIKA TOMBOL: MENGATUR THEME DAN MENU
    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        document.body.style.overflow = isMenuOpen ? '' : 'hidden';
    };

    return (
        <>
            <header className={`sticky top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 bg-white dark:bg-gray-900 ${scrolled ? 'shadow-lg scrolled' : ''}`} id="navbar">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    
                    <a href="#hero" className="flex items-center gap-2 group">
                       <img src="/Logistik-Kita.png" alt="Logistik Kita Logo" className="w-8 h-8 lg:w-14 lg:h-14 transition-all" />
 

                        <span className="text-lg lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">LOGISTIK KITA</span>
                    </a>

                    {/* DESKTOP NAV */}
                    <nav className="hidden lg:flex items-center gap-6 font-medium text-sm h-full">
                        <a href="#hero" className="text-gray-800 dark:text-gray-300 hover:text-primary transition-colors">BERANDA</a>
                        
                        {/* LAYANAN & ARMADA */}
                        <div className="dropdown-parent relative h-full flex items-center">
                            <button className="flex items-center gap-1 text-gray-800 dark:text-gray-300 hover:text-primary transition-colors">
                                LAYANAN & ARMADA <ChevronDown className="w-3 h-3 transition-transform" />
                            </button>
                            <div className="dropdown-menu bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 shadow-xl" role="menu">
                                {/* Isi dropdown... */}
                                <a href="/maintenance" className="hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">Kapasitas Armada</a>
                                <a href="/maintenance" className="hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">Jangkauan Pengiriman</a>
                                {/* ...dan seterusnya untuk item dropdown lainnya */}
                            </div>
                        </div>

                        {/* ... Masukkan kembali semua menu DESKTOP NAV yang lain di sini, ganti var(--color-...) ke kelas Tailwind biasa. */}

                        <a href="#contact-cta" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-blue-700 transition-all duration-300 shadow-md">
                            HUBUNGI KITA
                        </a>
                        
                    </nav>

                    <div className="flex items-center gap-4">
                        
                        <button className="p-2 text-gray-800 dark:text-gray-300 hover:text-primary transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        
                        {/* THEME TOGGLE */}
                        <button 
                            id="theme-toggle" 
                            onClick={toggleTheme} 
                            className="p-2 rounded-full text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            {isDark ? (
                                <Sun id="sun-icon" className="w-5 h-5" />
                            ) : (
                                <Moon id="moon-icon" className="w-5 h-5" />
                            )}
                        </button>

                        <a href="/login" className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-900 bg-accent rounded hover:bg-yellow-600 transition-all duration-300 shadow-md">
                            DAFTAR / MASUK
                        </a>

                        {/* MOBILE MENU TOGGLE */}
                        <button 
                            id="menu-btn" 
                            onClick={toggleMenu} 
                            className="lg:hidden text-gray-800 dark:text-gray-300 p-2" 
                            aria-controls="mobile-menu" 
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? (
                                <X id="close-icon" className="w-6 h-6" />
                            ) : (
                                <Menu id="menu-icon" className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </header>
            
            {/* MOBILE MENU */}
            <div id="mobile-menu" className={`fixed inset-0 z-40 bg-white dark:bg-gray-900/90 flex flex-col items-start pt-24 pb-8 overflow-y-auto lg:hidden ${isMenuOpen ? 'active' : 'hidden'}`}>
                {/* ... Salin kembali semua kode MOBILE MENU di sini, ganti var(--color-...) ke kelas Tailwind biasa. */}
                <p className="text-gray-500 p-6">... Konten Mobile Menu ...</p>
            </div>
        </>
    );
}

export default Navbar;
