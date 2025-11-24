import React, { useState, useEffect } from 'react';

// Import all components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import TrackingSection from './components/TrackingSection';
import Services from './components/Services';
import TrustMetrics from './components/TrustMetrics';
import ContactUs from './components/ContactUs';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load dark mode preference from local storage on mount
    useEffect(() => {
        const storedMode = localStorage.getItem('theme') === 'dark';
        setIsDarkMode(storedMode);
        if (storedMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} font-sans`}>
            {/* Tailwind CSS base styling for smoother scrolling and text rendering */}
            <style jsx global>{`
                :root {
                    --color-primary: #34D399; /* Emerald 400 - Green Light */
                    --color-primary-dark: #10B981; /* Emerald 500 - Green Darker */
                    --color-dark: #18181b; /* Zinc 900 - Dark Text */
                }
                html {
                    scroll-behavior: smooth;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                .dark {
                    background-color: #09090b; /* Zinc 950 */
                }
                /* Optional: Animation for revealing elements */
                .reveal-item {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: reveal 0.8s ease-out forwards;
                }
                @keyframes reveal {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .reveal-item:nth-child(1) { animation-delay: 0.1s; }
                .reveal-item:nth-child(2) { animation-delay: 0.2s; }
                .reveal-item:nth-child(3) { animation-delay: 0.3s; }
                .reveal-item:nth-child(4) { animation-delay: 0.4s; }
            `}</style>
            
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            
            <main>
                <Hero />
                {/* 1. Komponen KRITIS yang tadinya hilang - Tracking Section */}
                <TrackingSection /> 
                {/* 2. Komponen baru - Metrik Kepercayaan */}
                <TrustMetrics /> 
                {/* 3. Komponen selanjutnya */}
                <Services />
                <ContactUs />
            </main>
            
            <Footer />
        </div>
    );
};

export default App;

