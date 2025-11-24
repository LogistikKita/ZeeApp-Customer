import React, { useState, useEffect } from 'react'; 
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// Import semua section
import Hero from './components/Hero.jsx'; 
import TrustMetrics from './components/TrustMetrics.jsx'; // <-- IMPORT BARU
import FleetSection from './components/FleetSection.jsx'; 
import ServicesSection from './components/ServicesSection.jsx'; 
import TestimonialsSection from './components/TestimonialsSection.jsx'; 

import Preloader from './components/Preloader.jsx'; 

document.documentElement.classList.add('no-transition');

function App() {
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        // Hapus kelas no-transition setelah Preloader selesai
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
                <TrustMetrics />      {/* <-- POSISI BARU: DI BAWAH HERO */}
                <FleetSection /> 
                <ServicesSection />    
                <TestimonialsSection /> 
            </main>
            <Footer />
        </>
    );
}

export default App;

