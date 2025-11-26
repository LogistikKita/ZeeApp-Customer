import React, { useState, useEffect } from 'react';

// Perbaikan Import Navbar: Menggunakan path yang kamu sebutkan
import Navbar from './components/layout/Navbar'; 
// Import komponen lainnya (diasumsikan berada di /src/components/)
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
                    /* Warna Primer: Merah Menyala */
                    --color-primary: #E51D2A; 
                    /* Warna Primer Darker (untuk hover/active) */
                    --color-primary-dark: #C21A24; 
                    /* Warna Primer Lighter (untuk background/border ringan) */
                    --color-primary-light: #FF4A5C;
                    
                    /* Warna Accent: Oranye Krem */
                    --color-accent: #FDAD61;
                    
                    /* Warna Teks/Elemen Gelap */
                    --color-dark: #1A1A1A; /* Hampir hitam */
                }
                html {
                    scroll-behavior: smooth;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                .dark {
                    background-color: #0d0d0d; /* Darker background for dark mode */
                    color: #e0e0e0; /* Lighter text for dark mode */
                }
                /* Mengubah warna dark mode yang kamu sebutkan #f87171 untuk teks */
                .dark .text-dark-override { 
                    color: #f87171; 
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
                <TrackingSection /> 
                <TrustMetrics /> 
                <Services />
                <ContactUs />
            </main>
            
            <Footer />
        </div>
    );
};

export default App;

