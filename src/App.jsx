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

// --- KONFIGURASI ---
const MANUAL_CONFIG = {
    apiKey: "AIzaSyDHB-ZIg4UoFL_tuFDQuCZQdhM8pd7Xwbg",
    authDomain: "gen-lang-client-0318354714.firebaseapp.com",
    projectId: "gen-lang-client-0318354714",
    storageBucket: "gen-lang-client-0318354714.firebasestorage.app",
    messagingSenderId: "967542358897",
    appId: "1:967542358897:web:c126afb27aa2391d3eacd0",
};

const firebaseConfig = MANUAL_CONFIG;
const appId = MANUAL_CONFIG.projectId; 

const App = () => {
    // State
    const [loading, setLoading] = useState(true);
    const [trackingId, setTrackingId] = useState('');
    const [result, setResult] = useState(null);
    const [searchError, setSearchError] = useState(null);
    const [trackingLoading, setTrackingLoading] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    
    // Firebase
    const [db, setDb] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    const [firebaseError, setFirebaseError] = useState(null);

    // Init Firebase
    useEffect(() => {
        const init = async () => {
            try {
                const app = initializeApp(firebaseConfig);
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
                    setTimeout(() => setLoading(false), 1500);
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

    // Logic Pencarian
    const handleSearch = async (overrideId) => {
        const target = overrideId || trackingId;
        if (!target || !db) return;

        setTrackingLoading(true);
        setSearchError(null);
        setResult(null);

        try {
            const docRef = doc(collection(db, 'artifacts', appId, 'public', 'data', 'packages'), target);
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

    // Callback setelah Admin Create/Update
    const handleAdminSuccess = (id) => {
        setTrackingId(id);
        handleSearch(id);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans selection:bg-green-500 selection:text-white overflow-x-hidden">
            <Preloader loading={loading} />
            
            <Navbar 
                currentUser={currentUser} 
                toggleAdmin={() => setIsAdminOpen(!isAdminOpen)} 
                isAdminOpen={isAdminOpen}
            />

            <main>
                <HeroSection />
                
                {/* Tracking Section menerima banyak props karena dia menghandle UI Admin & Search */}
                <TrackingSection 
                    db={db}
                    appId={appId}
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


