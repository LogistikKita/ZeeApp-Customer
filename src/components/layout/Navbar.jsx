import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Search, ChevronDown, MessageSquare } from 'lucide-react';

// Fungsi untuk mendapatkan/menetapkan tema awal
const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
  return 'light';
};

const Navbar = () => {
  // 1. State untuk Tema
  const [theme, setTheme] = useState(getInitialTheme);
  
  // 2. State untuk Scroll Effect
  const [isScrolled, setIsScrolled] = useState(false);

  // 3. State untuk Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State untuk mengontrol Accordion Mobile Menu
  const [openAccordion, setOpenAccordion] = useState(null);
  
  // =======================================================
  // A. SCROLL EFFECT LOGIC
  // =======================================================
  useEffect(() => {
    const handleScroll = () => {
      // Menambahkan 'shadow-lg' dan 'scrolled' jika di-scroll lebih dari 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  // =======================================================
  // B. THEME TOGGLE LOGIC
  // =======================================================
  useEffect(() => {
    const html = document.documentElement;
    // Set class 'dark' di elemen <html>
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  
  const toggleTheme = () => {
    // Matikan sementara transisi saat beralih tema
    document.documentElement.classList.add('no-transition');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Aktifkan kembali transisi setelah jeda
    setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
    }, 500);
  };
  
  // =======================================================
  // C. MOBILE MENU LOGIC
  // =======================================================
  const toggleMobileMenu = (e) => {
      const isLink = e && e.target.classList.contains('mobile-link');
      if (isMobileMenuOpen && isLink) {
        // Berikan jeda untuk animasi smooth scroll (300ms)
        setTimeout(() => {
            setIsMobileMenuOpen(false);
            document.body.style.overflow = '';
        }, 300);
      } else {
          // Buka/tutup menu
          const newState = !isMobileMenuOpen;
          setIsMobileMenuOpen(newState);
          document.body.style.overflow = newState ? 'hidden' : '';
      }
  };

  const handleAccordionToggle = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };
  
  const navClass = `sticky top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 ${isScrolled ? 'shadow-lg scrolled' : ''}`;

  return (
    <>
      {/* Tombol WhatsApp Mengambang (Floating WhatsApp Button) */}
      <a 
          href="https://wa.me/6285813487753" 
          target="_blank" 
          id="whatsapp-cta" 
          className="fixed bottom-4 right-4 z-[1000] bg-[#25D366] text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
      >
          <MessageSquare className="w-6 h-6 fill-white stroke-white"/>
      </a>
      
      {/* HEADER UTAMA */}
      <header className={navClass}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <a href="#hero" className="flex items-center gap-2 group">
            {/* Menggunakan root path /Logistik-Kita.png karena file ada di /public/ */}
            <img 
                src="/Logistik-Kita.png" 
                alt="Logistik Kita Logo" 
                className="w-8 h-8 lg:w-14 lg:h-14 transition-all"
            />
            <span className="text-lg lg:text-3xl font-bold tracking-tight text-[var(--color-dark)] transition-colors">LOGISTIK KITA</span>
          </a>

          {/* NAVIGASI DESKTOP */}
          <nav className="hidden lg:flex items-center gap-6 font-medium text-sm h-full">
            <a href="#hero" className="text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">BERANDA</a>
            
            {/* Dropdown 1: LAYANAN & ARMADA */}
            <div className="dropdown-parent relative h-full flex items-center">
                <button className="flex items-center gap-1 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                    LAYANAN & ARMADA <ChevronDown className="w-3 h-3 transition-transform" />
                </button>
                <div className="dropdown-menu glass text-[var(--color-dark)]" role="menu">
                    <a href="#layanan-unggulan" className="hover:text-[var(--color-primary)]" role="menuitem">Jenis Layanan</a>
                    <a href="#armada" className="hover:text-[var(--color-primary)]" role="menuitem">Kapasitas Armada</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]" role="menuitem">Jangkauan Pengiriman</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]" role="menuitem">Simulasi Harga Estimasi</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]" role="menuitem">Sewa Mobil</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]" role="menuitem">Prosedur Keamanan</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]" role="menuitem">Travel and Tour</a>
                </div>
            </div>

            {/* Dropdown 2: GALERI & PORTOFOLIO */}
            <div className="dropdown-parent relative h-full flex items-center">
                <button className="flex items-center gap-1 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                    GALERI & PORTOFOLIO <ChevronDown className="w-3 h-3 transition-transform" />
                </button>
                <div className="dropdown-menu glass text-[var(--color-dark)]">
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]">Dokumentasi Pengiriman</a>
                    <a href="#testimoni" className="hover:text-[var(--color-primary)]">Testimoni Klien</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]">Kisah Sukses Lokal</a>
                </div>
            </div>

            {/* Dropdown 3: BLOG / BERITA */}
            <div className="dropdown-parent relative h-full flex items-center">
                <button className="flex items-center gap-1 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                    BLOG / BERITA <ChevronDown className="w-3 h-3 transition-transform" />
                </button>
                <div className="dropdown-menu glass text-[var(--color-dark)]">
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]">Berita Terbaru</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]">Tips Logistik</a>
                </div>
            </div>

            {/* Dropdown 4: MITRA ARMADA */}
            <div className="dropdown-parent relative h-full flex items-center">
                <button className="flex items-center gap-1 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                    MITRA ARMADA <ChevronDown className="w-3 h-3 transition-transform" />
                </button>
                <div className="dropdown-menu glass text-[var(--color-dark)]">
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]">Pendaftaran Mitra</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]">Info Muatan Balik</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]">Driver Terbaik Bulan Ini</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]">SOP Mitra</a>
                </div>
            </div>
            
            <a href="maintenance.html" className="text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">LAPAK KITA</a>
            
            {/* Dropdown 5: TENTANG KITA */}
            <div className="dropdown-parent relative h-full flex items-center">
                <button className="flex items-center gap-1 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                    TENTANG KITA <ChevronDown className="w-3 h-3 transition-transform" />
                </button>
                <div className="dropdown-menu glass text-[var(--color-dark)]">
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]">Visi, Misi & Nilai</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]">Profil dan Legalitas</a>
                    <a href="maintenance.html" className="hover:text-[var(--color-primary)]">Penanganan Resiko</a>
                </div>
            </div>

            <a href="#contact-cta" className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded hover:bg-[var(--color-primary-dark)] transition-all duration-300 shadow-md">
                HUBUNGI KITA
            </a>
            
          </nav>

          {/* ICON SECTION (Search, Theme, Login/Register) */}
          <div className="flex items-center gap-4">
            
            <button className="p-2 text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">
                <Search className="w-5 h-5" />
            </button>
            
            {/* Tombol Tema */}
            <button 
                id="theme-toggle" 
                onClick={toggleTheme} 
                className="p-2 rounded-full text-[var(--color-dark)] hover:bg-[var(--color-bg-light)] transition"
            >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <a href="maintenance.html" className="hidden sm:block px-4 py-2 text-sm font-medium text-[var(--color-dark)] bg-[var(--color-accent)] rounded hover:bg-[var(--color-accent-dark)] transition-all duration-300 shadow-md">
                DAFTAR / MASUK
            </a>

            {/* Hamburger Button */}
            <button 
                id="menu-btn" 
                onClick={toggleMobileMenu} 
                className="lg:hidden text-[var(--color-dark)] p-2" 
                aria-controls="mobile-menu" 
                aria-expanded={isMobileMenuOpen}
            >
                {isMobileMenuOpen ? (
                    <X id="close-icon" className="w-6 h-6" />
                ) : (
                    <Menu id="menu-icon" className="w-6 h-6" />
                )}
            </button>
          </div>
        </div>
      </header>
      
      {/* MOBILE MENU */}
      <div 
        id="mobile-menu" 
        className={`fixed inset-0 z-40 bg-[var(--image-overlay)] flex flex-col items-start pt-24 pb-8 overflow-y-auto lg:hidden ${isMobileMenuOpen ? 'active' : ''}`}
      >
        <nav className="w-full text-[var(--color-dark)] font-medium">
            <a href="#hero" onClick={toggleMobileMenu} className="mobile-link block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors">BERANDA</a>
            
            {/* Accordion 1: LAYANAN & ARMADA */}
            <details 
                className="mobile-accordion w-full" 
                open={openAccordion === 'layanan'} 
                onClick={(e) => {
                    if(e.target.tagName.toLowerCase() === 'summary') e.preventDefault(); // Mencegah default toggle
                    handleAccordionToggle('layanan');
                }}
            >
                <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">LAYANAN & ARMADA</summary>
                <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                    <a href="#layanan-unggulan" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Jenis Layanan</a>
                    <a href="#armada" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Kapasitas Armada</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Jangkauan Pengiriman</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Simulasi Harga Estimasi</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Sewa Mobil</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Prosedur Keamanan</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 hover:text-[var(--color-primary)]">Travel and Tour</a>
                </div>
            </details>

            {/* Accordion 2: GALERI & PORTOFOLIO */}
            <details 
                className="mobile-accordion w-full"
                open={openAccordion === 'galeri'} 
                onClick={(e) => {
                    if(e.target.tagName.toLowerCase() === 'summary') e.preventDefault();
                    handleAccordionToggle('galeri');
                }}
            >
                <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">GALERI & PORTOFOLIO</summary>
                <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Dokumentasi Pengiriman</a>
                    <a href="#testimoni" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Testimoni Klien</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 hover:text-[var(--color-primary)]">Kisah Sukses Lokal</a>
                </div>
            </details>
            
            {/* Accordion 3: BLOG / BERITA */}
            <details 
                className="mobile-accordion w-full"
                open={openAccordion === 'blog'} 
                onClick={(e) => {
                    if(e.target.tagName.toLowerCase() === 'summary') e.preventDefault();
                    handleAccordionToggle('blog');
                }}
            >
                <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">BLOG / BERITA</summary>
                <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Berita Terbaru</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 hover:text-[var(--color-primary)]">Tips Logistik</a>
                </div>
            </details>

            {/* Accordion 4: MITRA ARMADA */}
            <details 
                className="mobile-accordion w-full"
                open={openAccordion === 'mitra'} 
                onClick={(e) => {
                    if(e.target.tagName.toLowerCase() === 'summary') e.preventDefault();
                    handleAccordionToggle('mitra');
                }}
            >
                <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">MITRA ARMADA</summary>
                <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Pendaftaran Mitra</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Info Muatan Balik</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Driver Terbaik Bulan Ini</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 hover:text-[var(--color-primary)]">SOP Mitra</a>
                </div>
            </details>
            
            <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors">LAPAK KITA</a>

            {/* Accordion 5: TENTANG KITA */}
            <details 
                className="mobile-accordion w-full"
                open={openAccordion === 'tentang'} 
                onClick={(e) => {
                    if(e.target.tagName.toLowerCase() === 'summary') e.preventDefault();
                    handleAccordionToggle('tentang');
                }}
            >
                <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">TENTANG KITA</summary>
                <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Visi, Misi & Nilai</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Profil dan Legalitas</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 hover:text-[var(--color-primary)]">Penanganan Resiko</a>
                </div>
            </details>

            {/* Accordion 6: HUBUNGI KITA */}
            <details 
                className="mobile-accordion w-full"
                open={openAccordion === 'hubungi'} 
                onClick={(e) => {
                    if(e.target.tagName.toLowerCase() === 'summary') e.preventDefault();
                    handleAccordionToggle('hubungi');
                }}
            >
                <summary className="block px-6 py-3 border-b border-[var(--color-bg-light)] hover:bg-[var(--color-bg-light)] transition-colors cursor-pointer">HUBUNGI KITA</summary>
                <div className="pl-8 bg-[var(--color-bg-light)] dark:bg-gray-700/50">
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Formulir RFQ</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 border-b border-white/10 hover:text-[var(--color-primary)]">Informasi Kontak</a>
                    <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-4 py-2 hover:text-[var(--color-primary)]">Lokasi Kantor</a>
                </div>
            </details>

            <a href="maintenance.html" onClick={toggleMobileMenu} className="mobile-link block px-6 py-3 bg-[var(--color-accent)] text-[var(--color-dark)] font-bold hover:bg-[var(--color-accent-dark)] transition-colors mt-4">DAFTAR / MASUK</a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

