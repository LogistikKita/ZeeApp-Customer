import React, { useState, useEffect } from 'react';

// --- 1. IMPORTS KOMPONEN (Sesuai Struktur Folder Kamu) ---
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

// --- 2. IMPORTS FIREBASE ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { 
    getFirestore, doc, getDoc, collection, setDoc, updateDoc, arrayUnion, serverTimestamp 
} from 'firebase/firestore';

// --- 3. KONFIGURASI FIREBASE ---
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
    // --- STATE MANAGEMENT ---
    const [loading, setLoading] = useState(true); // Untuk Preloader
    const [trackingLoading, setTrackingLoading] = useState(false); // Untuk proses lacak
    
    // Data
    const [trackingId, setTrackingId] = useState('');
    const [result, setResult] = useState(null);
    const [searchError, setSearchError] = useState(null);
    
    // UI State
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    
    // Firebase State
    const [db, setDb] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    const [firebaseError, setFirebaseError] = useState(null);

    // --- EFFECT: INIT FIREBASE ---
    useEffect(() => {
        const initFirebase = async () => {
            try {
                const app = initializeApp(firebaseConfig);
                const firestore = getFirestore(app);
                const auth = getAuth(app);
                
                setDb(firestore);

                // Auth Listener
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        setCurrentUser(user.uid);
                    } else {
                        // Auto login anonim jika belum login
                        const cred = await signInAnonymously(auth);
                        setCurrentUser(cred.user.uid);
                    }
                    setIsFirebaseReady(true);
                    
                    // Matikan preloader setelah firebase siap (simulasi delay dikit biar smooth)
                    setTimeout(() => setLoading(false), 1500);
                });
                
                return unsubscribe;
            } catch (error) {
                console.error("Firebase Init Error:", error);
                setFirebaseError(error.message);
                setLoading(false);
            }
        };

        initFirebase();
    }, []);

    // --- FUNGSI: LACAK RESI ---
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
            console.error(e);
            setSearchError("Terjadi kesalahan koneksi saat mengambil data.");
        }
        setTrackingLoading(false);
    };

    // --- FUNGSI: ADMIN ACTIONS (Create/Update) ---
    // Fungsi ini dilempar ke TrackingSection atau AdminPanel jika ada
    const handleAdminAction = async (type, payload) => {
        if (!db) return;
        setTrackingLoading(true);

        try {
            const packagesCol = collection(db, 'artifacts', appId, 'public', 'data', 'packages');

            if (type === 'CREATE') {
                await setDoc(doc(packagesCol, payload.id), {
                    ...payload,
                    createdBy: currentUser,
                    createdAt: serverTimestamp(),
                    trackingHistory: [{
                        location: `Permintaan dibuat oleh ${payload.sender}`,
                        notes: 'Menunggu penjemputan oleh kurir.',
                        timestamp: new Date().toISOString()
                    }]
                });
            } else if (type === 'UPDATE') {
                const docRef = doc(packagesCol, payload.id);
                await updateDoc(docRef, {
                    status: payload.status,
                    trackingHistory: arrayUnion({
                        location: payload.location,
                        notes: payload.notes,
                        timestamp: new Date().toISOString()
                    })
                });
            }

            // Refresh data setelah update
            setTrackingId(payload.id);
            handleSearch(payload.id);
            
        } catch (error) {
            console.error("Admin Action Error:", error);
            alert("Gagal memproses data: " + error.message);
        }
        setTrackingLoading(false);
    };

    // --- RENDER UTAMA ---
    return (
        <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans overflow-x-hidden selection:bg-green-500 selection:text-white">
            
            {/* 1. Preloader */}
            <Preloader loading={loading} />

            {/* 2. Navbar */}
            <Navbar 
                currentUser={currentUser} 
                toggleAdmin={() => setIsAdminOpen(!isAdminOpen)} 
                isAdminOpen={isAdminOpen}
            />

            <main>
                {/* 3. Hero Section */}
                <HeroSection />

                {/* 4. Tracking Section (Paling Penting) */}
                {/* Kita passing semua props yang dibutuhkan untuk lacak & admin */}
                <TrackingSection 
                    db={db}
                    isReady={isFirebaseReady}
                    loading={trackingLoading}
                    trackingId={trackingId}
                    setTrackingId={setTrackingId}
                    handleSearch={handleSearch}
                    result={result}
                    searchError={searchError}
                    isAdminOpen={isAdminOpen}     // Untuk menampilkan form admin
                    onAdminAction={handleAdminAction} // Fungsi create/update
                />

                {/* 5. Trust Metrics */}
                <TrustMetrics />

                {/* 6. Carousel / Promo (Opsional) */}
                <Carousel />

                {/* 7. Services */}
                <ServicesSection />

                {/* 8. Fleet (Armada) */}
                <FleetSection />

                {/* 9. Testimonials */}
                <TestimonialsSection />

                {/* 10. Contact Us */}
                <ContactUs />
            </main>

            {/* 11. Footer */}
            <Footer currentUser={currentUser} />

            {/* 12. Floating Status (Opsional, untuk debug koneksi) */}
            <FirebaseStatus 
                isReady={isFirebaseReady} 
                error={firebaseError} 
            />

        </div>
    );
};

export default App;

