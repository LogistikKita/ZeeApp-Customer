import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustMetrics from './components/TrustMetrics';
import Services from './components/Services';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import FirebaseStatus from './components/FirebaseStatus'; // <-- DEBUGGER BARU

// GANTI: Import Firebase menggunakan URL CDN untuk menghindari masalah resolusi modul
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Konstanta Warna
const customColors = {
    '--color-primary': '#E51D2A', // Merah Menyala
    '--color-accent': '#FDAD61', // Oranye/Krem
    '--color-dark': '#0d0d0d',    // Background Gelap
    '--color-light': '#ffffff',   // Teks Terang
};

// Data Simulasi Tracking (Data ini akan disimpan di Firestore)
const trackingData = [
    { 
        id: "MOJO-001", 
        status: "Tiba di Hub Mojokerto", 
        location: "Mojokerto, Jawa Timur", 
        date: "2025-11-25",
        details: [
            "2025-11-24: Paket dijemput oleh kurir.",
            "2025-11-24: Paket tiba di sortir pusat Surabaya.",
            "2025-11-25: Paket dalam perjalanan menuju Hub Mojokerto.",
            "2025-11-26: Paket tiba di Hub Mojokerto, siap untuk pengiriman."
        ] 
    },
    { 
        id: "MOJO-002", 
        status: "Dalam Proses Pengiriman", 
        location: "Kecamatan Dlanggu, Mojokerto", 
        date: "2025-11-26",
        details: [
            "2025-11-25: Paket tiba di Hub Mojokerto.",
            "2025-11-26: Paket dibawa oleh kurir untuk pengiriman ke alamat tujuan."
        ] 
    },
    { 
        id: "MOJO-003", 
        status: "Selesai", 
        location: "Diterima oleh Bapak Budi", 
        date: "2025-11-26",
        details: [
            "2025-11-24: Paket dijemput.",
            "2025-11-25: Paket tiba di Hub Mojokerto.",
            "2025-11-26: Paket berhasil dikirim dan diterima."
        ] 
    }
];

const App = () => {
    // State untuk Pelacakan
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [trackingError, setTrackingError] = useState(null);
    const [isTrackingLoading, setIsTrackingLoading] = useState(false);
    
    // State untuk Firebase
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [userId, setUserId] = useState(null);

    // 1. Inisialisasi Firebase & Otentikasi
    useEffect(() => {
        try {
            // Ambil variabel global yang disediakan oleh lingkungan
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
            
            if (Object.keys(firebaseConfig).length === 0) {
                console.error("Firebase config tidak ditemukan.");
                setTrackingError("Koneksi ke sistem logistik gagal. Konfigurasi Firebase tidak lengkap.");
                setIsAuthReady(true); 
                return;
            }

            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);
            const authInstance = getAuth(app);
            
            setDb(firestore);
            setAuth(authInstance);

            // Set up Auth Listener
            const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    // Sign in anonymously
                    await signInAnonymously(authInstance);
                    // Listener akan dipanggil lagi setelah sign-in anonim berhasil
                }
                // Pastikan status autentikasi siap setelah pengecekan awal/sign-in
                setIsAuthReady(true);
            });

            // Lakukan sign-in dengan custom token (jika ada)
            if (initialAuthToken) {
                signInWithCustomToken(authInstance, initialAuthToken)
                    .catch(e => {
                        console.error("Custom token sign-in gagal, mencoba anonim.", e);
                        // Jika custom token gagal, listener di atas akan menangani sign-in anonim
                    });
            } else {
                 // Jika tidak ada token, panggil sign-in anonim
                 signInAnonymously(authInstance);
            }

            return () => unsubscribe();

        } catch (error) {
            console.error("Kesalahan inisialisasi Firebase:", error);
            setTrackingError("Koneksi ke sistem logistik gagal. Inisialisasi Firebase error.");
            setIsAuthReady(true); 
        }
    }, []);

    // 2. Simulasi Data Tracking ke Firestore (Hanya berjalan sekali saat auth siap)
    useEffect(() => {
        if (!isAuthReady || !userId || !db) return;

        const uploadTrackingData = async () => {
            console.log("Memastikan data tracking simulasi ada di Firestore...");
            try {
                // Lokasi data publik: /artifacts/{appId}/public/data/tracking_updates
                const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                const trackingCollectionRef = collection(db, 'artifacts', appId, 'public', 'data', 'tracking_updates');

                // Cek apakah data MOJO-001 sudah ada
                const docRef1 = doc(trackingCollectionRef, "MOJO-001");
                const docSnap1 = await getDoc(docRef1);

                if (!docSnap1.exists()) {
                    console.log("Data tracking belum ada. Mengunggah data simulasi...");
                    // Upload semua data simulasi
                    for (const data of trackingData) {
                        await setDoc(doc(trackingCollectionRef, data.id), data);
                    }
                    console.log("Pengunggahan data simulasi selesai.");
                } else {
                    console.log("Data tracking MOJO-001 sudah ada.");
                }

                // Setelah data dipastikan ada, hapus error status jika error sebelumnya adalah 'Firebase belum siap'
                if (trackingError === "Koneksi ke sistem logistik gagal. Firebase belum siap." || trackingError === "Sistem logistik belum siap. Mohon coba beberapa saat lagi.") {
                    setTrackingError(null);
                }


            } catch (e) {
                console.error("Gagal mengunggah/memeriksa data tracking:", e);
                setTrackingError("Koneksi ke sistem logistik gagal. Gagal memuat data pelacakan.");
            }
        };

        uploadTrackingData();
    }, [isAuthReady, userId, db]); // Jalankan setelah otentikasi siap

    // 3. Fungsi Logika Tracking
    const handleTrack = async (trackNum) => {
        setTrackingError(null);
        setTrackingResult(null);
        setIsTrackingLoading(true);

        // Validasi Firebase
        if (!db || !isAuthReady) {
            setTrackingError("Sistem logistik belum siap. Mohon coba beberapa saat lagi.");
            setIsTrackingLoading(false);
            return;
        }

        try {
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            // Mencari di koleksi data publik
            const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'tracking_updates', trackNum);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Data ditemukan di Firestore
                setTrackingResult(docSnap.data());
            } else {
                // Data tidak ditemukan
                setTrackingError(`Nomor resi ${trackNum} tidak ditemukan dalam sistem kami.`);
            }

        } catch (error) {
            console.error("Error saat mencari tracking number:", error);
            setTrackingError("Terjadi kesalahan teknis saat mencari data pelacakan.");
        } finally {
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
                    isTrackingLoading={isTrackingLoading}
                    setTrackingNumber={setTrackingNumber}
                    trackingNumber={trackingNumber}
                />
                <TrustMetrics />
                <Services />
                <ContactUs />
            </main>
            <Footer />
            {/* DEBUGGER TAMPIL DI POJOK KANAN BAWAH */}
            <FirebaseStatus /> 
        </div>
    );
};

export default App;

