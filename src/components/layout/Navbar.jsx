import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Search, ChevronDown, Truck } from 'lucide-react'; 
// Catatan: Pastikan kamu sudah menjalankan 'npm install lucide-react' di terminal StackBlitz

const Navbar = () => {
    // 1. STATE UNTUK MOBILE MENU
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // 2. STATE UNTUK DARK MODE (kita ambil dari localStorage saat load)
    const [isDark, setIsDark] = useState(
        // Cek Local Storage atau Preferensi Sistem saat inisialisasi
        localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
    
    // 3. STATE UNTUK EFEK SCROLL NAVBAR
    const [scrolled, setScrolled] = useState(false);

    // LOGIKA EFEK: MENGATUR TEMA DAN SCROLL
    useEffect(() => {
        // Efek 1: Tema (Saat isDark berubah)
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }

        // Efek 2: Scroll (Saat component dimuat)
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        // Membersihkan event listener saat component tidak dipakai
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDark, scrolled]); 

    // LOGIKA TOMBOL: MENGATUR THEME DAN MENU
    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        // Mengunci scroll body saat menu terbuka
        document.body.style.overflow = isMenuOpen ? '' : 'hidden';
    };

    // Data menu kamu (Ini yang akan kita loop/render)
    const navItems = [
        { label: 'BERANDA', href: '#hero', type: 'link' },
        { 
            label: 'LAYANAN & ARMADA', 
            type: 'dropdown', 
            items: [
                { label: 'Kapasitas Armada', href: 'maintenance.html' },
                { label: 'Jangkauan Pengiriman', href: 'maintenance.html' },
                // ... dan seterusnya, tambahkan sisanya
            ] 
        },
        // ... Tambahkan menu GALERI & PORTOFOLIO, BLOG, MITRA ARMADA, TENTANG KITA
    ];

    // Kode yang kamu salin, tapi sudah dimodifikasi ke JSX dan React logic:
    return (
        <>
            <header className={`sticky top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 ${scrolled ? 'shadow-lg scrolled' : ''}`} id="navbar">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    
                    <a href="#hero" className="flex items-center gap-2 group">
                        {/* Ganti dengan komponen Image React di sini */}
                        <img src="/assets/images/logo/Logistik-Kita.png" alt="Logistik Kita Logo" className="w-8 h-8 lg:w-14 lg:h-14 transition-all" />
                        <span className="text-lg lg:text-3xl font-bold tracking-tight text-[var(--color-dark)] transition-colors">LOGISTIK KITA</span>
                    </a>

                    {/* DESKTOP NAV */}
                    <nav className="hidden lg:flex items-center gap-6 font-medium text-sm h-full">
                        <a href="#hero" className="text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">BERANDA</a>
                        
                        {/* LAYANAN & ARMADA */}
                        <div className="dropdown-parent relative h-full flex items-center">
                            <button className="flex items-center gap-1 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                                LAYANAN & ARMADA <ChevronDown className="w-3 h-3 transition-transform" />
                            </button>
                            <div className="dropdown-menu glass text-[var(--color-dark)]" role="menu">
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]" role="menuitem">Kapasitas Armada</a>
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]" role="menuitem">Jangkauan Pengiriman</a>
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]" role="menuitem">Prosedur Keamanan</a>
                                <a href="/pricing" className="hover:text-[var(--color-primary)]" role="menuitem">Simulasi Harga Estimasi</a> 
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]" role="menuitem">Jenis Layanan</a>
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]" role="menuitem">Sewa Mobil</a>
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]" role="menuitem">Travel and Tour</a>
                            </div>
                        </div>

                        {/* GALERI & PORTOFOLIO */}
                        <div className="dropdown-parent relative h-full flex items-center">
                            <button className="flex items-center gap-1 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                                GALERI & PORTOFOLIO <ChevronDown className="w-3 h-3 transition-transform" />
                            </button>
                            <div className="dropdown-menu glass text-[var(--color-dark)]">
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]">Dokumentasi Pengiriman</a>
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]">Kisah Sukses Lokal</a>
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]">Testimoni Klien</a>
                            </div>
                        </div>

                        {/* BLOG / BERITA */}
                        <div className="dropdown-parent relative h-full flex items-center">
                            <button className="flex items-center gap-1 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                                BLOG / BERITA <ChevronDown className="w-3 h-3 transition-transform" />
                            </button>
                            <div className="dropdown-menu glass text-[var(--color-dark)]">
                                <a href="/blog" className="hover:text-[var(--color-primary)]">Berita Terbaru</a>
                                <a href="/blog" className="hover:text-[var(--color-primary)]">Tips Logistik</a>
                            </div>
                        </div>

                        {/* MITRA ARMADA */}
                        <div className="dropdown-parent relative h-full flex items-center">
                            <button className="flex items-center gap-1 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                                MITRA ARMADA <ChevronDown className="w-3 h-3 transition-transform" />
                            </button>
                            <div className="dropdown-menu glass text-[var(--color-dark)]">
                                <a href="/register-mitra" className="hover:text-[var(--color-primary)]">Pendaftaran Mitra</a>
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]">Info Muatan Balik</a>
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]">Driver Terbaik Bulan Ini</a>
                                <a href="/maintenance" className="hover:text-[var(--color-primary)]">SOP Mitra</a>
                            </div>
                        </div>
                        
                        <a href="/marketplace" className="text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">LAPAK KITA</a>
                        
                        {/* TENTANG KITA */}
                        <div className="dropdown-parent relative h-full flex items-center">
                            <button className="flex items-center gap-1 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                                TENTANG KITA <ChevronDown className="w-3 h-3 transition-transform" />
                            </button>
                            <div className="dropdown-menu glass text-[var(--color-dark)]">
                                <a href="/about" className="hover:text-[var(--color-primary)]">Visi, Misi & Nilai</a>
                                <a href="/about" className="hover:text-[var(--color-primary)]">Profil dan Legalitas</a>
                                <a href="/about" className="hover:text-[var(--color-primary)]">Penanganan Resiko</a>
                            </div>
                        </div>

                        <a href="#contact-cta" className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded hover:bg-[var(--color-primary-dark)] transition-all duration-300 shadow-md">
                            HUBUNGI KITA
                        </a>
                        
                    </nav>

                    <div className="flex items-center gap-4">
                        
                        <button className="p-2 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        
                        {/* THEME TOGGLE (Diaktifkan oleh state isDark) */}
                        <button 
                            id="theme-toggle" 
                            onClick={toggleTheme} 
                            className="p-2 rounded-full text-[var(--color-dark)] hover:bg-[var(--color-bg-light)] transition"
                        >
                            {isDark ? (
                                <Sun id="sun-icon" className="w-5 h-5" />
                            ) : (
                                <Moon id="moon-icon" className="w-5 h-5" />
                            )}
                        </button>

                        <a href="/login" className="hidden sm:block px-4 py-2 text-sm font-medium text-[var(--color-dark)] bg-[var(--color-accent)] rounded hover:bg-[var(--color-accent-dark)] transition-all duration-300 shadow-md">
                            DAFTAR / MASUK
                        </a>

                        {/* MOBILE MENU TOGGLE (Diaktifkan oleh state isMenuOpen) */}
                        <button 
                            id="menu-btn" 
                            onClick={toggleMenu} 
                            className="lg:hidden text-[var(--color-dark)] p-2" 
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
            
            {/* MOBILE MENU (Kode yang kamu salin, tapi sudah dimodifikasi ke JSX dan React logic:) */}
            <div id="mobile-menu" className={`fixed inset-0 z-40 bg-[var(--image-overlay)] flex flex-col items-start pt-24 pb-8 overflow-y-auto lg:hidden ${isMenuOpen ? 'active' : ''}`}>
                <nav className="w-full text-[var(--color-dark)] font-medium">
                    {/* Menggunakan Router Link / NavLink di sini jika sudah diinstal */}
                    <a onClick={toggleMenu} href="#hero" className="mobile-link block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors">BERANDA</a>
                    
                    {/* ACCORDION MENU (Perlu diperbaiki lagi nanti menggunakan state, tapi biarkan dulu) */}
                    <details className="mobile-accordion w-full">
                        <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">LAYANAN & ARMADA</summary>
                        <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Kapasitas Armada</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Jangkauan Pengiriman</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Prosedur Keamanan</a>
                            <a onClick={toggleMenu} href="/pricing" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Simulasi Harga Estimasi</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Jenis Layanan</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Sewa Mobil</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 hover:text-[var(--color-primary)]">Travel and Tour</a>
                        </div>
                    </details>
                    
                    {/* GALERI & PORTOFOLIO */}
                    <details className="mobile-accordion w-full">
                        <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">GALERI & PORTOFOLIO</summary>
                        <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Dokumentasi Pengiriman</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Kisah Sukses Lokal</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 hover:text-[var(--color-primary)]">Testimoni Klien</a>
                        </div>
                    </details>
                    
                    {/* BLOG / BERITA */}
                    <details className="mobile-accordion w-full">
                        <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">BLOG / BERITA</summary>
                        <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                            <a onClick={toggleMenu} href="/blog" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Berita Terbaru</a>
                            <a onClick={toggleMenu} href="/blog" className="block px-4 py-2 hover:text-[var(--color-primary)]">Tips Logistik</a>
                        </div>
                    </details>

                    {/* MITRA ARMADA */}
                    <details className="mobile-accordion w-full">
                        <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">MITRA ARMADA</summary>
                        <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                            <a onClick={toggleMenu} href="/register-mitra" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Pendaftaran Mitra</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Info Muatan Balik</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Driver Terbaik Bulan Ini</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 hover:text-[var(--color-primary)]">SOP Mitra</a>
                        </div>
                    </details>
                    
                    <a onClick={toggleMenu} href="/marketplace" className="mobile-link block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors">LAPAK KITA</a>

                    {/* TENTANG KITA */}
                    <details className="mobile-accordion w-full">
                        <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">TENTANG KITA</summary>
                        <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                            <a onClick={toggleMenu} href="/about" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Visi, Misi & Nilai</a>
                            <a onClick={toggleMenu} href="/about" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Profil dan Legalitas</a>
                            <a onClick={toggleMenu} href="/about" className="block px-4 py-2 hover:text-[var(--color-primary)]">Penanganan Resiko</a>
                        </div>
                    </details>

                    {/* HUBUNGI KITA (Punya 3 sub-link juga di menu mobile) */}
                    <details className="mobile-accordion w-full">
                        <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">HUBUNGI KITA</summary>
                        <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Formulir RFQ</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Informasi Kontak</a>
                            <a onClick={toggleMenu} href="/maintenance" className="block px-4 py-2 hover:text-[var(--color-primary)]">Lokasi Kantor</a>
                        </div>
                    </details>

                    <a onClick={toggleMenu} href="/login" className="mobile-link block px-6 py-3 bg-[var(--color-accent)] text-[var(--color-dark)] font-bold hover:bg-[var(--color-accent-dark)] transition-colors mt-4">DAFTAR / MASUK</a>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
