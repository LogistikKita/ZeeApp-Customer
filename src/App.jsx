// src/App.jsx

import React, { useState, useEffect } from 'react'; 
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// UNCOMMENT SEMUA SECTION
import Hero from './components/Hero.jsx'; 
import FleetSection from './components/FleetSection.jsx'; 
import ServicesSection from './components/ServicesSection.jsx'; // <-- UNCOMMENT BARIS INI
import TestimonialsSection from './components/TestimonialsSection.jsx'; // <-- UNCOMMENT BARIS INI

import Preloader from './components/Preloader.jsx'; 

document.documentElement.classList.add('no-transition');

function App() {
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
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
                <FleetSection /> 
                <ServicesSection />    {/* <-- TAMBAHKAN INI */}
                <TestimonialsSection /> {/* <-- TAMBAHKAN INI */}
            </main>
            <Footer />
        </>
    );
}

export default App;
