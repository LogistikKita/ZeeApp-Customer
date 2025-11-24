import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2, CheckCircle, Clock, Package } from 'lucide-react';

// ===============================================
// ** FIREBASE INITIALIZATION & IMPORTS (DIJAMIN BERHASIL) **
// ===============================================

// Menggunakan variabel global window.firebase untuk menghindari error 'Failed to resolve import'
const getFirestore = window.firebase.firestore.getFirestore;
const doc = window.firebase.firestore.doc;
const getDoc = window.firebase.firestore.getDoc;
const setDoc = window.firebase.firestore.setDoc;
const initializeApp = window.firebase.app.initializeApp;
const getAuth = window.firebase.auth.getAuth;
const signInWithCustomToken = window.firebase.auth.signInWithCustomToken;
const signInAnonymously = window.firebase.auth.signInAnonymously;


// Global variables provided by the Canvas environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Firebase references
let db, auth;

// Data Dummy Tracking yang akan di-seed ke Firestore
const DUMMY_SHIPMENTS = [
    {
        id: 'MOJO-001',
        status: 'DELIVERED',
        recipient: 'Bapak Hartono',
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
        recipient: 'Ibu Rina',
        sender: 'Toko Online Jaya',
        origin: 'Gresik (Kantor Cabang)',
        destination: 'Sidoarjo (Perumahan Indah)',
        trackingHistory: [
            { timestamp: new Date(Date.now() - 86400000), location: 'Gresik: Paket diterima di kantor cabang.', notes: 'Menunggu jadwal keberangkatan.' },
            { timestamp: new Date(Date.now() - 3600000 * 2), location: 'Gresik: Paket sedang dalam proses pengiriman.', notes: 'Menuju ke Sidoarjo.' }
        ]
    },
    {
        id: 'MOJO-003',
        status: 'PENDING',
        recipient: 'CV. Makmur Sentosa',
        sender: 'Gudang Utama',
        origin: 'Jombang',
        destination: 'Malang',
        trackingHistory: [
            { timestamp: new Date(Date.now() - 3600000), location: 'Jombang: Booking diterima, menunggu barang masuk.', notes: 'Resi sudah dibuat, menunggu paket tiba.' }
        ]
    }
];

// Helper function to format timestamp
const formatTimestamp = (date) => {
    return date.toLocaleDateString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric', 
        hour: '2-digit', minute: '2-digit'
    });
};

const TrackingSection = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // 1. Inisialisasi Firebase dan Autentikasi
    useEffect(() => {
        const initializeFirebase = async () => {
            try {
                if (Object.keys(firebaseConfig).length === 0) {
                    console.error("Firebase config is empty. Cannot initialize.");
                    return;
                }
                
                const app = initializeApp(firebaseConfig);
                db = getFirestore(app);
                auth = getAuth(app);
                
                // Set the correct Firestore security path for public data
                const collectionPath = `artifacts/${appId}/public/data/shipments`;
                
                // Attempt custom token sign-in or anonymous sign-in
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }
                
                console.log("Firebase initialized and signed in.");
                setIsAuthReady(true);

                // ** Seed initial data if collection is empty **
                await seedDummyData(db, collectionPath);
                
            } catch (e) {
                console.error("Firebase initialization failed:", e);
                // Menetapkan error hanya jika koneksi ke Firebase benar-benar gagal
                setError("Koneksi ke sistem logistik gagal. Coba lagi.");
            }
        };

        if (!db) {
            initializeFirebase();
        } else {
            // Already initialized
            setIsAuthReady(true);
        }
    }, []);

    // Function to seed initial dummy data
    const seedDummyData = async (firestore, path) => {
        console.log("Checking if data needs to be seeded...");
        for (const shipment of DUMMY_SHIPMENTS) {
            const docRef = doc(firestore, path, shipment.id);
            try {
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    // Convert Date objects to ISO string for safe storage in Firestore
                    const dataToSet = {
                        ...shipment,
                        trackingHistory: shipment.trackingHistory.map(history => ({
                            ...history,
                            timestamp: history.timestamp.toISOString() 
                        }))
                    };
                    await setDoc(docRef, dataToSet);
                    console.log(`Seeded shipment: ${shipment.id}`);
                }
            } catch (e) {
                console.error(`Failed to seed ${shipment.id}:`, e);
            }
        }
    };
    
    // 2. Fungsi Pencarian Resi
    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!isAuthReady || !db) {
            setError("Sistem belum siap. Mohon tunggu sebentar.");
            return;
        }

        const resi = trackingNumber.trim().toUpperCase();
        if (resi === '') {
            setError('Masukkan Nomor Resi yang valid.');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Path: /artifacts/{appId}/public/data/shipments/{resi}
            const collectionPath = `artifacts/${appId}/public/data/shipments`;
            const docRef = doc(db, collectionPath, resi);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                // Convert ISO strings back to Date objects for display
                const processedData = {
                    ...data,
                    trackingHistory: data.trackingHistory.map(history => ({
                        ...history,
                        timestamp: new Date(history.timestamp)
                    })).sort((a, b) => b.timestamp - a.timestamp) // Sort newest first
                };
                setResult(processedData);
            } else {
                setError(`Nomor Resi "${resi}" tidak ditemukan. Cek kembali nomor resi Anda.`);
            }
        } catch (e) {
            console.error("Error fetching document:", e);
            setError("Terjadi kesalahan saat mencari data. Coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    // Helper untuk menentukan warna & ikon status
    const getStatusInfo = (status) => {
        switch (status) {
            case 'DELIVERED':
                return { icon: CheckCircle, color: 'text-green-500', label: 'Telah Diterima' };
            case 'IN_TRANSIT':
                return { icon: Clock, color: 'text-yellow-500', label: 'Dalam Perjalanan' };
            case 'PENDING':
                return { icon: Package, color: 'text-blue-500', label: 'Menunggu Pengiriman' };
            default:
                return { icon: Package, color: 'text-gray-500', label: 'Status Tidak Diketahui' };
        }
    };

    const StatusIcon = result ? getStatusInfo(result.status).icon : null;
    const statusColor = result ? getStatusInfo(result.status).color : '';
    const statusLabel = result ? getStatusInfo(result.status).label : '';

    return (
        <section id="tracking" className="py-20 bg-gray-50 dark:bg-zinc-950">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl font-extrabold text-center mb-4 text-[var(--color-dark)] dark:text-white reveal-item">
                    Lacak Pengiriman Anda
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto reveal-item">
                    Masukkan Nomor Resi (misalnya: MOJO-001) di bawah untuk melihat status dan lokasi terkini paket Anda.
                </p>

                {/* Form Pencarian */}
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8 reveal-item">
                    <input
                        type="text"
                        placeholder="Masukkan Nomor Resi, Contoh: MOJO-001"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="flex-grow p-4 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] dark:bg-zinc-800 dark:text-white transition-all"
                        disabled={!isAuthReady || loading}
                    />
                    <button
                        type="submit"
                        className="flex items-center justify-center px-6 py-4 bg-[var(--color-primary)] text-gray-900 font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-all duration-300 shadow-lg disabled:opacity-50"
                        disabled={!isAuthReady || loading}
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                            <Search className="w-5 h-5 mr-2" />
                        )}
                        {loading ? 'Mencari...' : 'Lacak Sekarang'}
                    </button>
                </form>

                {/* Display Error */}
                {error && (
                    <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6 reveal-item" role="alert">
                        <p className="font-semibold">Pencarian Gagal:</p>
                        <p>{error}</p>
                    </div>
                )}
                
                {/* Display Not Ready/User ID */}
                {!isAuthReady && !loading && (
                    <div className="bg-blue-100 dark:bg-blue-900/50 border border-blue-400 text-blue-700 dark:text-blue-300 p-4 rounded-lg mb-6 reveal-item" role="status">
                        <p className="font-semibold">Sistem sedang dipersiapkan...</p>
                        <p>Koneksi ke database sedang diinisialisasi. Mohon tunggu sebentar.</p>
                    </div>
                )}


                {/* Display Result */}
                {result && (
                    <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-2xl reveal-item">
                        
                        {/* Summary Header */}
                        <div className="flex items-center justify-between border-b dark:border-zinc-800 pb-4 mb-4">
                            <h3 className="text-2xl font-bold text-[var(--color-dark)] dark:text-white">
                                Status Resi: <span className="font-mono">{result.id}</span>
                            </h3>
                            <div className={`flex items-center text-lg font-semibold ${statusColor}`}>
                                <StatusIcon className="w-6 h-6 mr-2" />
                                {statusLabel}
                            </div>
                        </div>

                        {/* Detail Pengiriman */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                            <p className="text-gray-500 dark:text-gray-400"><span className="font-semibold text-[var(--color-dark)] dark:text-white">Pengirim:</span> {result.sender}</p>
                            <p className="text-gray-500 dark:text-gray-400"><span className="font-semibold text-[var(--color-dark)] dark:text-white">Penerima:</span> {result.recipient}</p>
                            <p className="text-gray-500 dark:text-gray-400"><span className="font-semibold text-[var(--color-dark)] dark:text-white">Asal:</span> {result.origin}</p>
                            <p className="text-gray-500 dark:text-gray-400"><span className="font-semibold text-[var(--color-dark)] dark:text-white">Tujuan:</span> {result.destination}</p>
                        </div>

                        {/* Tracking History Timeline */}
                        <div className="mt-6">
                            <h4 className="text-xl font-bold mb-4 text-[var(--color-dark)] dark:text-white">
                                Riwayat Perjalanan
                            </h4>
                            <ol className="relative border-s border-gray-200 dark:border-zinc-700">                  
                                {result.trackingHistory.map((history, index) => (
                                    <li key={index} className="mb-6 ms-6">            
                                        <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-4 ring-white dark:ring-zinc-900 ${index === 0 ? 'bg-[var(--color-primary)]' : 'bg-gray-200 dark:bg-zinc-700'}`}>
                                            {index === 0 ? (
                                                <MapPin className="w-3 h-3 text-gray-900" />
                                            ) : (
                                                <Clock className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                                            )}
                                        </span>
                                        <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-sm">
                                            <time className="block mb-2 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
                                                {formatTimestamp(history.timestamp)}
                                            </time>
                                            <h5 className="text-md font-semibold text-[var(--color-dark)] dark:text-white">
                                                {history.location}
                                            </h5>
                                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                {history.notes}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TrackingSection;

