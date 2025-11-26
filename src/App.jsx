import React, { useState, useEffect } from 'react';

// --- IMPORTS KOMPONEN ---
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustMetrics from './components/TrustMetrics';
import ServicesSection from './components/ServicesSection';
import FleetSection from './components/FleetSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import TrackingSection from './components/TrackingSection';
import FirebaseStatus from './components/FirebaseStatus';
import Carousel from './components/Carousel';
import Preloader from './components/Preloader';

// --- IMPORTS FIREBASE ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';

// --- KONFIGURASI FIREBASE ---
// Menggunakan Env Var jika ada, Fallback ke Manual jika Env bermasalah di CodeSpaces
const FIREBASE_CONFIG = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDHB-ZIg4UoFL_tuFDQuCZQdhM8pd7Xwbg",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gen-lang-client-0318354714.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gen-lang-client-0318354714",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gen-lang-client-0318354714.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "967542358897",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:967542358897:web:c126afb27aa2391d3eacd0",
};

const App = () => {
    // State UI & Data
    const [loading, setLoading] = useState(true);
    const [trackingLoading, setTrackingLoading] = useState(false);
    const [trackingId, setTrackingId] = useState('');
    const [result, setResult] = useState(null);
    const [searchError, setSearchError] = useState(null);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    
    // Firebase State
    const [db, setDb] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    const [firebaseError, setFirebaseError] = useState(null);

    // Init Firebase
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
                    setTimeout(() => setLoading(false), 1500); // Simulasi preloader
                });
                return unsubscribe;
            } catch (e) {
                console.error("Firebase Error:", e);
                setFirebaseError(e.message);
                setLoading(false);
            }
        };
        init();
    }, []);

    // Logic Pencarian (Dipanggil oleh TrackingSection)
    const handleSearch = async (overrideId) => {
        const target = overrideId || trackingId;
        if (!target || !db) return;

        setTrackingLoading(true);
        setSearchError(null);
        setResult(null);

        try {
            const docRef = doc(collection(db, 'artifacts', FIREBASE_CONFIG.projectId, 'public', 'data', 'packages'), target);
            const snap = await getDoc(docRef);
            
            if (snap.exists()) {
                setResult({ id: snap.id, ...snap.data() });
            } else {
                setSearchError(`Resi #${target} tidak ditemukan.`);
            }
        } catch (e) {
            setSearchError("Gagal mengambil data. Cek koneksi.");
        }
        setTrackingLoading(false);
    };

    // Callback saat Admin Create/Update sukses
    const handleAdminSuccess = (id) => {
        setTrackingId(id);
        handleSearch(id);
        // Scroll otomatis ke bagian tracking
        document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans selection:bg-green-500 selection:text-white overflow-x-hidden">
            <Preloader loading={loading} />
            
            <Navbar 
                toggleAdmin={() => setIsAdminOpen(!isAdminOpen)} 
                isAdminOpen={isAdminOpen}
            />

            <main>
                <HeroSection />
                
                {/* TrackingSection menyatukan Form Lacak + Admin Panel + Hasil */}
                <TrackingSection 
                    db={db}
                    appId={FIREBASE_CONFIG.projectId}
                    userId={currentUser}
                    isReady={isFirebaseReady}
                    loading={trackingLoading}
                    trackingId={trackingId}
                    setTrackingId={setTrackingId}
                    handleSearch={handleSearch}
                    result={result}
                    searchError={searchError}
                    isAdminOpen={isAdminOpen}
                    onAdminSuccess={handleAdminSuccess}
                />

                <div className="mt-20">
                    <TrustMetrics />
                </div>
                
                <Carousel />
                <ServicesSection />
                <FleetSection />
                <TestimonialsSection />
                <ContactUs />
            </main>

            <Footer currentUser={currentUser} />
            <FirebaseStatus isReady={isFirebaseReady} error={firebaseError} />
        </div>
    );
};

export default App;


