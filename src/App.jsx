import React, { useState, useEffect } from 'react'; 
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// Import semua section (JANGAN DIHAPUS, BIARKAN SAJA DI SINI)
import Hero from './components/Hero.jsx'; 
import TrustMetrics from './components/TrustMetrics.jsx'; 
import TrackingSection from './components/TrackingSection.jsx'; 
import FleetSection from './components/FleetSection.jsx'; 
import ServicesSection from './components/ServicesSection.jsx'; 
import TestimonialsSection from './components/TestimonialsSection.jsx'; 

import Preloader from './components/Preloader.jsx'; 

function App() {
    const [isLoading, setIsLoading] = useState(true); 

    // Efek untuk mengelola Preloader dan transisi awal (SUDAH DIPERBAIKI)
    useEffect(() => {
        // PENTING: Manipulasi DOM harus dilakukan di dalam useEffect!
        document.documentElement.classList.add('no-transition');

        setTimeout(() => {
            document.documentElement.classList.remove('no-transition');
        }, 100); 

        const timer = setTimeout(() => {
            setIsLoading(false); 
        }, 1500); 
        
        return () => clearTimeout(timer);
    }, []); 

    if (isLoading) {
        // PERIKSA: Jika Preloader ini bermasalah, masih akan crash di sini.
        return <Preloader />; 
    }

    // ===============================================
    // HANYA RENDER HERO DAN LAYOUT DASAR
    // ===============================================
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                {/* // KOMPONEN LAIN DI-KOMENTARI DULU UNTUK DIAGNOSA
                <TrustMetrics />      
                <TrackingSection />    
                <ServicesSection />    
                <FleetSection /> 
                <TestimonialsSection /> 
                */}
            </main>
            <Footer />
        </>
    );
}

export default App;

