import React, { useState, useEffect } from 'react';

// COMPONENTS
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustMetrics from './components/TrustMetrics';
import ServicesSection from './components/ServicesSection';
import FleetSection from './components/FleetSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import TrackingSection from './components/TrackingSection';
import Carousel from './components/Carousel';
import Preloader from './components/Preloader';
import FirebaseStatus from './components/FirebaseStatus';
import ScrollNav from './components/ScrollNav';

// FIREBASE
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDHB-ZIg4UoFL_tuFDQuCZQdhM8pd7Xwbg",
    authDomain: "gen-lang-client-0318354714.firebaseapp.com",
    projectId: "gen-lang-client-0318354714",
    storageBucket: "gen-lang-client-0318354714.firebasestorage.app",
    messagingSenderId: "967542358897",
    appId: "1:967542358897:web:c126afb27aa2391d3eacd0",
};

const App = () => {
    // STATE
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [activePage, setActivePage] = useState('home');
    const [trackingId, setTrackingId] = useState('');
    
    // FIREBASE STATE
    const [db, setDb] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    const [firebaseError, setFirebaseError] = useState(null);

    // INIT
    useEffect(() => {
        const init = async () => {
            try {
                const app = initializeApp(FIREBASE_CONFIG);
                const firestore = getFirestore(app);
                const auth = getAuth(app);
                setDb(firestore);

                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        setCurrentUser(user.uid);
                    } else {
                        const cred = await signInAnonymously(auth);
                        setCurrentUser(cred.user.uid);
                    }
                    setIsFirebaseReady(true);
                    
                    // Delay loading
                    setTimeout(() => setLoading(false), 2500);
                });
                return unsubscribe;
            } catch (e) {
                console.error("Firebase Init Error:", e);
                setFirebaseError(e.message);
                setLoading(false);
            }
        };
        init();

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        }
    }, []);

    // ACTIONS
    const toggleTheme = () => setDarkMode(!darkMode);

    const navigateTo = (page) => {
        window.scrollTo(0, 0);
        setActivePage(page);
    };

    const handleSearch = (id) => {
        if (!id) return;
        setTrackingId(id);
        navigateTo('tracking');
    };

    // RENDER CONTENT SWITCHER
    const renderContent = () => {
        if (activePage === 'maintenance') {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 animate-fade-in">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/website-maintenance-7565383-6190870.png" alt="Maintenance" className="w-64 mb-6 opacity-80" />
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Segera Hadir</h2>
                    <p className="text-gray-500 max-w-md mb-8">Fitur ini sedang kami kembangkan untuk memberikan layanan terbaik (Lapak Kita, Info Muatan, dll).</p>
                    <button onClick={() => navigateTo('home')} className="px-8 py-3 bg-green-600 rounded-full text-white font-bold hover:bg-green-500 transition shadow-lg shadow-green-500/30">
                        Kembali ke Beranda
                    </button>
                </div>
            );
        }

        if (activePage === 'tracking') {
            return (
                <div className="pt-24 min-h-screen animate-slide-right">
                    <TrackingSection 
                        db={db} 
                        appId={FIREBASE_CONFIG.projectId} 
                        initialId={trackingId} 
                        onBack={() => navigateTo('home')}
                        darkMode={darkMode}
                    />
                </div>
            );
        }

        // DEFAULT: HOME PAGE
        return (
            <div className="animate-fade-in">
                <HeroSection onSearch={handleSearch} darkMode={darkMode} />
                <TrustMetrics darkMode={darkMode} />
                <Carousel darkMode={darkMode} />
                <ServicesSection darkMode={darkMode} navigateTo={navigateTo} />
                <FleetSection darkMode={darkMode} navigateTo={navigateTo} />
                <TestimonialsSection darkMode={darkMode} />
                <ContactUs db={db} appId={FIREBASE_CONFIG.projectId} darkMode={darkMode} />
            </div>
        );
    };

    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 ${darkMode ? 'dark bg-slate-900' : 'bg-gray-50'}`}>
            <Preloader loading={loading} />

            {/* FIXED BACKGROUND */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img src="/background-lk.jpg" alt="" className="w-full h-full object-cover opacity-10 blur-[2px]" onError={(e) => e.target.style.display='none'} />
                <div className={`absolute inset-0 ${darkMode ? 'bg-slate-900/90' : 'bg-white/80'}`}></div>
            </div>

            <div className="relative z-10">
                <Navbar 
                    navigateTo={navigateTo} 
                    activePage={activePage} 
                    darkMode={darkMode} 
                    toggleTheme={toggleTheme} 
                />
                
                <main>
                    {renderContent()}
                </main>

                <Footer navigateTo={navigateTo} darkMode={darkMode} />
            </div>

            <FirebaseStatus isReady={isFirebaseReady} error={firebaseError} />
            
            <ScrollNav darkMode={darkMode} />

        </div>
    );
};

export default App;
