import React, { useState, useEffect } from 'react'; 
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// Import semua section
import Hero from './components/Hero.jsx'; 
import TrustMetrics from './components/TrustMetrics.jsx'; 
import TrackingSection from './components/TrackingSection.jsx'; // JANGAN DIHAPUS IMPORTNYA
import FleetSection from './components/FleetSection.jsx'; 
import ServicesSection from './components/ServicesSection.jsx'; 
import TestimonialsSection from './components/TestimonialsSection.jsx'; 

import Preloader from './components/Preloader.jsx'; 

function App() {
    const [isLoading, setIsLoading] = useState(true); 

    // Efek untuk mengelola Preloader dan transisi awal (SUDAH DIPERBAIKI)
    useEffect(() => {
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
        return <Preloader />; 
    }

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                {/* AKTIFKAN TRUSTMETRICS */}
                <TrustMetrics />      
                
                {/* KOMPONEN BERISIKO TINGGI (FIREBASE) MASIH DIKOMENTARI */}
                {/* <TrackingSection /> */}
                
                {/* KOMPONEN LAIN MASIH DIKOMENTARI */}
                {/* <ServicesSection />    */}
                {/* <FleetSection /> */} 
                {/* <TestimonialsSection /> */}
            </main>
            <Footer />
        </>
    );
}

export default App;

