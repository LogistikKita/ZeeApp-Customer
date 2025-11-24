import React, { useState, useEffect } from 'react'; 
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// Import semua section
import Hero from './components/Hero.jsx'; 
import TrustMetrics from './components/TrustMetrics.jsx'; 
import TrackingSection from './components/TrackingSection.jsx'; 
import FleetSection from './components/FleetSection.jsx'; 
import ServicesSection from './components/ServicesSection.jsx'; 
import TestimonialsSection from './components/TestimonialsSection.jsx'; 

import Preloader from './components/Preloader.jsx'; 

// Menonaktifkan transisi CSS saat loading untuk mencegah flicker
document.documentElement.classList.add('no-transition');

function App() {
    const [isLoading, setIsLoading] = useState(true); 

    // Efek untuk mengelola Preloader dan transisi awal
    useEffect(() => {
        // Hapus kelas no-transition setelah Preloader selesai/diabaikan
        setTimeout(() => {
            document.documentElement.classList.remove('no-transition');
        }, 100); 

        // Set timer untuk menonaktifkan preloader setelah 1.5 detik
        const timer = setTimeout(() => {
            setIsLoading(false); 
        }, 1500); 
        
        // Cleanup function
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
                <TrustMetrics />      
                <TrackingSection />    {/* Komponen Tracking menggunakan Firestore */}
                <FleetSection /> 
                <ServicesSection />    
                <TestimonialsSection /> 
            </main>
            <Footer />
        </>
    );
}

export default App;

