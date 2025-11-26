import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustMetrics from './components/TrustMetrics';
import Services from './components/Services';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import FirebaseStatus from './components/FirebaseStatus'; 

// KONSOLIDASI IMPOR DARI CDN:
// Menggunakan sintaks impor penuh untuk memastikan resolusi modul yang benar.
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { 
    getFirestore, doc, getDoc, setDoc, collection, setLogLevel 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Mengatur level log untuk debugging Firestore
setLogLevel('debug'); 

// Konstanta Warna
const customColors = {
    '--color-primary': '#E51D2A', // Merah Menyala
    '--color-accent': '#FDAD61', // Oranye/Krem
    '--color-dark': '#0d0d0d',    // Background Gelap
    '--color-light': '#ffffff',   // Teks Terang
};

// Data Simulasi Pengiriman
const DUMMY_SHIPMENTS = [
    {
        id: 'MOJO-001',
        status: 'DELIVERED',
        recipient: 'Bapak Hartono (Jl. Rungkut No. 12)',
        sender: 'PT. Mojokerto Jaya',
        origin: 'Mojokerto (Gudang Pusat)',
        destination: 'Surabaya (Rungkut Industri)',
        trackingHistory: [
            { timestamp: new Date(Date.now() - 86400000 * 2), location: 'Mojokerto: Paket diterima di warehouse.', notes: 'Barang sudah dicek dan siap dikirim.' },
            { timestamp: new Date(Date.now() - 86400000), location: 'Mojokerto: Dalam perjalanan menuju Surabaya.', notes: 'Berangkat dengan Armada No. A-1234.' },
            { timestamp: new Date(Date.now() - 3600000), location: 'Surabaya: Tiba di gudang penyortiran lokal.', notes: 'Siap untuk pengiriman akhir.' },
            { timestamp: new Date(), location: 'Surabaya: Paket telah diterima oleh Bapak Hartono.', notes: 'Pengiriman sukses.' }
        ]
    },
    {
        id: 'MOJO-002',
        status: 'IN_TRANSIT',
        recipient: 'Ibu Rina (Perumahan Indah Blok D)',
        sender: 'Toko Online Jaya',
        origin: 'Gresik (Kantor Cabang)',
        destination: 'Sidoarjo (Perumahan Indah)',
        trackingHistory: [
            { timestamp: new Date(Date.now() - 86400000), location: 'Gresik: Paket diterima di kantor cabang.', notes: 'Menunggu jadwal keberangkatan.' },
            { timestamp: new Date(Date.now() - 3600000 * 2), location: 'Gresik: Paket sedang dalam proses pengiriman.', notes: 'Menuju ke Sidoarjo.' }
        ]
    },
];

const App = () => {
    // State untuk Firebase
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [userId, setUserId] = useState(null);
    const [firebaseConfig, setFirebaseConfig] = useState(null);

    // State untuk Tracking
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [trackingError, setTrackingError] = useState(null);
    // Mengubah default menjadi true dan hanya set false setelah AUTH/DB siap
    const [isTrackingLoading, setIsTrackingLoading] = useState(true); 

    // 1. Inisialisasi Firebase & Otentikasi
    useEffect(() => {
        let isCancelled = false;
        
        const configString = typeof __firebase_config !== 'undefined' ? __firebase_config : '{}';
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        
        console.log("Memulai inisialisasi Firebase...");

        try {
            const config = JSON.parse(configString);
            
            if (Object.keys(config).length === 0) {
                console.error("Firebase config tidak ditemukan (kosong). Menggunakan default-app-id.");
                setFirebaseConfig(null);
                setIsAuthReady(true);
                setIsTrackingLoading(false);
                return;
            }

            setFirebaseConfig(config);
            
            // Inisialisasi App
            const app = getApps().length > 0 ? getApp() : initializeApp(config);
            console.log("Firebase App diinisialisasi.");
            
            // Inisialisasi Firestore dan Auth
            const firestore = getFirestore(app);
            const authInstance = getAuth(app);
            
            // FIX: Set instance DB dan Auth segera
            if (!isCancelled) {
                setDb(firestore);
                setAuth(authInstance);
                console.log("Firestore dan Auth instances berhasil diset.");
            }

            // Inisiasi Autentikasi
            const initializeAuth = async () => {
                if (initialAuthToken) {
                    await signInWithCustomToken(authInstance, initialAuthToken);
                    console.log("Sign-in dengan token kustom berhasil.");
                } else {
                    await signInAnonymously(authInstance);
                    console.log("Sign-in anonim berhasil.");
                }
            };
            
            initializeAuth();

            // Listener Perubahan Status Otentikasi
            const unsubscribe = onAuthStateChanged(authInstance, (user) => {
                if (isCancelled) return;
                
                if (user) {
                    setUserId(user.uid);
                } else {
                    setUserId('anonymous'); 
                }
                
                // Set Auth siap. Ini menandakan Auth sudah selesai.
                setIsAuthReady(true);
                // Langsung set loading ke false karena DB instance sudah ada.
                setIsTrackingLoading(false); 
                console.log(`Auth Ready: True. User ID: ${user ? user.uid : 'anonymous'}`);
            });

            return () => {
                isCancelled = true;
                unsubscribe();
            };

        } catch (error) {
            console.error("Kesalahan FATAL saat inisialisasi Firebase:", error);
            // Fallback: set semua status siap dengan null database
            if (!isCancelled) {
                setFirebaseConfig(null);
                setDb(null);
                setIsAuthReady(true); 
                setIsTrackingLoading(false);
            }
        }
    }, []);

    // 2. Simulasi Data Tracking ke Firestore (Seeding Data)
    useEffect(() => {
        // HANYA jalankan jika Auth siap, userId ada, dan DB instance ada
        if (!isAuthReady || !userId || !db) {
             // console.log("Seeding data ditunda: Menunggu Auth/DB siap.");
             return;
        }

        const uploadTrackingData = async () => {
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const collectionPath = `artifacts/${appId}/public/data/shipments`;
            const trackingCollectionRef = collection(db, collectionPath);

            try {
                // Cek apakah MOJO-001 sudah ada
                const docRef1 = doc(trackingCollectionRef, "MOJO-001");
                const docSnap1 = await getDoc(docRef1);

                if (!docSnap1.exists()) {
                    console.log("Data tracking belum ada. Mengunggah data simulasi...");
                    
                    for (const shipment of DUMMY_SHIPMENTS) {
                        // Konversi Date ke ISO String sebelum disimpan
                        const dataToSet = {
                            ...shipment,
                            trackingHistory: shipment.trackingHistory.map(history => ({
                                ...history,
                                timestamp: history.timestamp instanceof Date && !isNaN(history.timestamp) 
                                    ? history.timestamp.toISOString() 
                                    : new Date().toISOString()
                            }))
                        };
                        await setDoc(doc(trackingCollectionRef, shipment.id), dataToSet);
                    }
                    console.log("Pengunggahan data simulasi selesai.");
                } else {
                    console.log("Data simulasi sudah ada. Melewati seeding.");
                }

            } catch (e) {
                console.error("Gagal mengunggah/memeriksa data tracking:", e);
                // Pesan ini mungkin muncul jika aturan keamanan Firestore menolak,
                // meskipun koneksi DB berhasil.
            }
        };

        uploadTrackingData();
    }, [isAuthReady, userId, db]);
    
    
    // 3. Fungsi Pencarian Resi (Handler yang akan dipanggil dari HeroSection)
    const handleTrack = async (resi) => {
        // Cek kembali: jika db null, tampilkan error
        if (!db) {
            setTrackingError("Koneksi ke sistem logistik gagal. Database (Firestore) belum siap.");
            return;
        }

        const trackingId = resi.trim().toUpperCase();
        if (trackingId === '') {
            setTrackingError('Masukkan Nomor Resi yang valid.');
            return;
        }

        setIsTrackingLoading(true);
        setTrackingError(null);
        setTrackingResult(null);

        try {
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const collectionPath = `artifacts/${appId}/public/data/shipments`;
            
            const docRef = doc(db, collectionPath, trackingId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                
                // Konversi ISO strings ke Date objects dan urutkan (terbaru di atas)
                const processedHistory = data.trackingHistory.map(history => ({
                        ...history,
                        timestamp: new Date(history.timestamp)
                })).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
                
                // Temukan status terkini untuk tampilan ringkas
                const latestUpdate = processedHistory.length > 0 ? processedHistory[0] : null;

                const processedData = {
                    ...data,
                    latestStatus: latestUpdate ? latestUpdate.location : 'Belum Ada Data',
                    latestDate: latestUpdate ? latestUpdate.timestamp : null,
                    trackingHistory: processedHistory
                };
                setTrackingResult(processedData);
            } else {
                setTrackingError(`Nomor Resi "${trackingId}" tidak ditemukan. Cek kembali nomor resi Anda.`);
            }
        } catch (e) {
            console.error("Error fetching document:", e);
            // Seringkali error di sini disebabkan oleh aturan keamanan Firestore (perlu 'allow read')
            setTrackingError("Terjadi kesalahan saat mencari data. Pastikan Aturan Keamanan Firestore mengizinkan 'read' pada path yang ditentukan.");
        } finally {
            // Set loading ke false setelah proses pencarian selesai
            setIsTrackingLoading(false); 
        }
    };


    // Terapkan custom CSS Variables
    useEffect(() => {
        Object.entries(customColors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }, []);

    // Struktur Halaman Utama
    return (
        <div className="min-h-screen bg-[var(--color-dark)] text-[var(--color-light)]">
            <Navbar />
            <main>
                <HeroSection 
                    onTrack={handleTrack}
                    trackingError={trackingError}
                    trackingResult={trackingResult}
                    // Gunakan isTrackingLoading untuk disable input saat loading (inisial atau pencarian)
                    isTrackingLoading={isTrackingLoading} 
                    setTrackingNumber={setTrackingNumber}
                    trackingNumber={trackingNumber}
                />
                <TrustMetrics />
                <Services />
                <ContactUs />
            </main>
            <Footer />
            {/* DEBUGGER TAMPIL DI POJOK KANAN BAWAH. */}
            {firebaseConfig && <FirebaseStatus 
                firebaseConfig={firebaseConfig} 
                isAuthReady={isAuthReady} 
                userId={userId}
                db={db}
            />}
        </div>
    );
};

export default App;

