import React, { useState, useEffect } from 'react';
import { Clock, Truck, MapPin, CheckCircle, Package, Database, User, XCircle } from 'lucide-react';
// Firebase Imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';

// --- Variabel Global Firebase dari Lingkungan Canvas ---
// Pastikan variabel ini didefinisikan untuk inisialisasi
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- DATA MOCK/CONTOH ---
// Timestamp menggunakan format string ISO yang umum dari API
const MOCK_TRACKING_DATA = {
    id: 'LGTK987654321ID',
    status: 'IN_TRANSIT', 
    sender: 'PT Logistik Sejahtera',
    recipient: 'Budi Santoso',
    origin: 'Jakarta (JKT)',
    destination: 'Bandung (BDG)',
    trackingHistory: [
        {
            timestamp: "2025-11-26T15:40:00.000Z",
            location: 'Pusat Sortir Utama, Jakarta Timur',
            notes: 'Paket tiba dan sedang diproses.'
        },
        {
            timestamp: "2025-11-26T10:00:00.000Z",
            location: 'Gerai Drop-off Cilandak, Jakarta Selatan',
            notes: 'Paket diterima oleh kurir.'
        },
        {
            timestamp: "2025-11-25T14:30:00.000Z",
            location: 'Gudang Pengirim, Jakarta Barat',
            notes: 'Menunggu penjemputan.'
        }
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
};

// --- FUNGSI BANTUAN ---

// Fungsi bantuan untuk memformat timestamp
const formatTimestamp = (date) => {
    // PERBAIKAN UTAMA: Memastikan input adalah objek Date yang valid
    if (!(date instanceof Date) || isNaN(date.getTime())) return 'Tanggal Tidak Valid';
    
    // Menggunakan 'id-ID' untuk format Bahasa Indonesia (WIB)
    return date.toLocaleDateString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric', 
        hour: '2-digit', minute: '2-digit'
    }) + ' WIB';
};

// Fungsi bantuan untuk menentukan warna & ikon status
const getStatusInfo = (status) => {
    switch (status) {
        case 'DELIVERED':
            return { icon: CheckCircle, color: 'text-green-600', label: 'Telah Diterima' };
        case 'IN_TRANSIT':
            return { icon: Truck, color: 'text-yellow-500', label: 'Dalam Perjalanan' };
        case 'PENDING':
            return { icon: Package, color: 'text-blue-500', label: 'Menunggu Pengiriman' };
        default:
            return { icon: Package, color: 'text-gray-500', label: 'Status Tidak Diketahui' };
    }
};

// --- KOMPONEN FIREBASE STATUS (PENGGANTI FirebaseSection.jsx) ---
const getDatabaseStatus = (db) => {
    return db ? 'Terkoneksi' : 'Terputus';
};

const FirebaseStatus = ({ firebaseConfig, isAuthReady, userId, db }) => {
    const [isVisible, setIsVisible] = useState(false);

    if (!firebaseConfig) return null;

    const StatusIcon = isAuthReady ? CheckCircle : Clock;
    const authStatus = isAuthReady ? 'Siap' : 'Memuat';

    const dbStatus = getDatabaseStatus(db);
    const dbIcon = db ? Database : XCircle;

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Tombol Toggle */}
            <button
                onClick={toggleVisibility}
                className="bg-[var(--color-primary)] text-white p-3 rounded-full shadow-lg hover:bg-[var(--color-dark)] transition duration-300 flex items-center justify-center"
                title="Toggle Firebase Debugger"
            >
                <Database className="w-6 h-6" />
            </button>

            {/* Panel Status */}
            {isVisible && (
                <div className="mt-2 absolute bottom-full right-0 bg-zinc-900 p-4 rounded-lg shadow-2xl border border-zinc-700 w-80 text-xs text-white">
                    <h3 className="font-bold text-sm border-b pb-2 mb-2 border-zinc-700 text-[var(--color-primary)]">
                        🛠️ Firebase/DB Status
                    </h3>
                    
                    <div className="space-y-2">
                        {/* Status Auth */}
                        <div className="flex items-center space-x-2">
                            <StatusIcon className={`w-4 h-4 ${isAuthReady ? 'text-green-500' : 'text-yellow-500'}`} />
                            <span className="font-semibold">Auth Status:</span>
                            <span className={`${isAuthReady ? 'text-green-300' : 'text-yellow-300'}`}>{authStatus}</span>
                        </div>
                        
                        {/* Status DB */}
                        <div className="flex items-center space-x-2">
                            <dbIcon className={`w-4 h-4 ${db ? 'text-green-500' : 'text-red-500'}`} />
                            <span className="font-semibold">Firestore:</span>
                            <span className={`${db ? 'text-green-300' : 'text-red-300'}`}>{dbStatus}</span>
                        </div>

                        {/* User ID */}
                        {userId && (
                            <div className="text-gray-400 break-words pt-1 border-t border-zinc-700">
                                <div className="flex items-center space-x-2 mt-2">
                                    <User className="w-4 h-4 flex-shrink-0" />
                                    <span className="font-semibold text-gray-300">User ID (Current):</span>
                                </div>
                                <p className="ml-6 mt-1 font-mono text-gray-300 select-all">{userId}</p>
                            </div>
                        )}
                        
                        {/* App ID (Untuk path Firestore) */}
                        <div className="text-gray-400 break-words">
                            <div className="flex items-center space-x-2 mt-2">
                                <Database className="w-4 h-4 flex-shrink-0" />
                                <span className="font-semibold text-gray-300">App ID:</span>
                            </div>
                            <p className="ml-6 mt-1 font-mono text-gray-300 select-all">{appId}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


// --- KOMPONEN TRACKING SECTION (PENGGANTI TrackingSection.jsx) ---
const TrackingSection = ({ result }) => {
    if (!result) {
        return (
            <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                Masukkan nomor resi untuk melihat status pelacakan.
            </div>
        );
    }

    const { icon: StatusIcon, color: statusColor, label: statusLabel } = getStatusInfo(result.status);
    
    return (
        <div className="mt-6 p-6 rounded-xl shadow-2xl shadow-[var(--color-primary-shadow)] border-t-4 border-[var(--color-primary)] dark:border-zinc-700 bg-white dark:bg-zinc-900 text-left transition-all duration-300">
            
            {/* Status Header */}
            <div className="flex items-start sm:items-center space-x-4 pb-4 mb-4 border-b dark:border-zinc-700">
                <StatusIcon className={`w-8 h-8 ${statusColor} flex-shrink-0`} />
                <div>
                    <p className="font-extrabold text-2xl text-[var(--color-dark)] dark:text-white leading-tight">
                        {statusLabel}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Nomor Resi: <span className="font-mono font-bold text-[var(--color-primary)]">{result.id}</span>
                    </p>
                </div>
            </div>

            {/* Detail Pengiriman Singkat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-700 dark:text-gray-400 mb-8 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-300">Pengirim</p>
                    <p>{result.sender}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-300">Penerima</p>
                    <p>{result.recipient}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-300">Asal Gudang</p>
                    <p><MapPin className="inline w-3 h-3 mr-1" /> {result.origin}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-300">Tujuan Akhir</p>
                    <p><MapPin className="inline w-3 h-3 mr-1" /> {result.destination}</p>
                </div>
            </div>

            {/* Riwayat Perjalanan (Timeline Sederhana) */}
            <div>
                <p className="font-bold text-xl text-gray-800 dark:text-gray-300 mb-4">
                    Riwayat Perjalanan ({result.trackingHistory.length} langkah)
                </p>
                <ul className="space-y-6">
                    {/* Urutan: Terbaru di atas */}
                    {result.trackingHistory.map((history, index) => {
                        const isLatest = index === 0;
                        const timelineStyle = isLatest 
                            ? 'border-[var(--color-primary)] text-white bg-[var(--color-primary)]' 
                            : 'border-gray-300 dark:border-zinc-600 text-gray-600 dark:text-gray-400 bg-white dark:bg-zinc-900';

                        return (
                            <li key={index} className="flex items-start relative">
                                {/* Timeline Dot */}
                                <div className={`w-4 h-4 rounded-full border-2 ${timelineStyle} z-10 flex-shrink-0 mt-1.5 p-1`}>
                                    {isLatest && <div className="w-1.5 h-1.5 rounded-full bg-white mx-auto"></div>}
                                </div>
                                
                                {/* Timeline Line (Kecuali untuk item terakhir) */}
                                {index < result.trackingHistory.length - 1 && (
                                    <div className="absolute left-2.5 top-6 bottom-[-20px] w-0.5 bg-gray-200 dark:bg-zinc-700 z-0"></div>
                                )}
                                
                                <div className="ml-4 pb-4">
                                    <p className={`font-semibold text-base ${isLatest ? 'text-[var(--color-primary)]' : 'text-gray-800 dark:text-gray-300'}`}>
                                        {history.location}
                                    </p>
                                    <span className="text-xs font-medium block text-gray-500 dark:text-gray-500 mt-0.5">
                                        {/* FIX APLIKASI UTAMA: Konversi string timestamp menjadi objek Date */}
                                        <Clock className="inline w-3 h-3 mr-1" /> {formatTimestamp(new Date(history.timestamp))}
                                    </span>
                                    <span className="block text-sm italic text-gray-600 dark:text-gray-400 mt-2">
                                        {history.notes}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};


// --- KOMPONEN INDUK APLIKASI (PENGGANTI Main.jsx) ---
const App = () => {
    const [trackingNumber, setTrackingNumber] = useState('LGTK987654321ID');
    const [trackingResult, setTrackingResult] = useState(MOCK_TRACKING_DATA);
    
    // State Firebase
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [userId, setUserId] = useState(null);

    // 1. Inisialisasi Firebase dan Otentikasi
    useEffect(() => {
        if (!firebaseConfig) return;

        try {
            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);
            const authInstance = getAuth(app);
            
            // Set logging level for debugging
            setLogLevel('debug');
            
            setDb(firestore);
            setAuth(authInstance);

            // Listener untuk perubahan status otentikasi
            const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
                if (user) {
                    setUserId(user.uid);
                    setIsAuthReady(true);
                } else if (initialAuthToken) {
                    // Coba login dengan custom token
                    try {
                        const credential = await signInWithCustomToken(authInstance, initialAuthToken);
                        setUserId(credential.user.uid);
                        setIsAuthReady(true);
                    } catch (error) {
                        console.error("Firebase Custom Auth Failed. Signing in anonymously...", error);
                        // Fallback ke login anonim jika token gagal
                        const credential = await signInAnonymously(authInstance);
                        setUserId(credential.user.uid);
                        setIsAuthReady(true);
                    }
                } else {
                    // Login anonim
                    const credential = await signInAnonymously(authInstance);
                    setUserId(credential.user.uid);
                    setIsAuthReady(true);
                }
            });

            return () => unsubscribe();
        } catch (e) {
            console.error("Error initializing Firebase:", e);
        }
    }, []);

    // Simulasi fungsi pencarian resi
    const handleSearch = () => {
        // TODO: Ganti dengan query Firestore yang sesungguhnya di masa depan
        if (trackingNumber === MOCK_TRACKING_DATA.id) {
            setTrackingResult(MOCK_TRACKING_DATA);
        } else {
            // Simulasi resi tidak ditemukan
            setTrackingResult(null); 
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 font-sans p-4 sm:p-8 transition-colors duration-300">
            {/* Definisi variabel CSS untuk tema Tailwind */}
            <style jsx="true">{`
                :root {
                    --color-primary: #007bff; /* Biru */
                    --color-dark: #1f2937; /* Abu-abu 800 */
                    --color-primary-shadow: rgba(0, 123, 255, 0.1);
                }
                .dark {
                    --color-primary: #3b82f6; /* Biru terang untuk dark mode */
                    --color-dark: #f3f4f6; /* Abu-abu terang */
                    --color-primary-shadow: rgba(59, 130, 246, 0.15);
                }
            `}</style>
            
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-[var(--color-dark)] dark:text-white text-center mb-6">
                    Logistik Kita Tracking
                </h1>

                {/* Input Form */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg flex flex-col sm:flex-row gap-3 mb-6">
                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Masukkan nomor resi..."
                        className="flex-grow p-3 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] dark:bg-zinc-800 dark:text-white"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-[var(--color-primary)] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-shadow)]"
                    >
                        Lacak Paket
                    </button>
                </div>
                
                {/* Bagian Hasil Pelacakan */}
                <TrackingSection result={trackingResult} />

                {/* Tombol Toggle Dark Mode */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => document.documentElement.classList.toggle('dark')}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)] transition-colors"
                    >
                        Toggle Dark/Light Mode
                    </button>
                </div>
            </div>
            
            {/* Komponen Debugger Firebase */}
            <FirebaseStatus 
                firebaseConfig={firebaseConfig} 
                isAuthReady={isAuthReady} 
                userId={userId} 
                db={db} 
            />
        </div>
    );
};

export default App;

