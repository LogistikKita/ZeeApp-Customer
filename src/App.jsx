import React, { useState, useEffect } from 'react';
import { Clock, Truck, MapPin, CheckCircle, Package, Database, User, XCircle, Plus, Save, Copy } from 'lucide-react';

// --- IMPORTS FIREBASE (NPM STYLE) ---
// Menggunakan impor NPM karena ini adalah lingkungan React/Codespaces
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    serverTimestamp,
    collection
} from 'firebase/firestore';

// ==========================================
// ✅ KONFIGURASI FIREBASE SUDAH DITEMPEL DI SINI ✅
// ==========================================
const MANUAL_CONFIG = {
    // Data ini diambil dari input Anda dan sudah benar.
    apiKey: "AIzaSyDHB-ZIg4UoFL_tuFDQuCZQdhM8pd7Xwbg",
    authDomain: "gen-lang-client-0318354714.firebaseapp.com",
    projectId: "gen-lang-client-0318354714",
    storageBucket: "gen-lang-client-0318354714.firebasestorage.app",
    messagingSenderId: "967542358897",
    appId: "1:967542358897:web:c126afb27aa2391d3eacd0",
    // measurementId: "G-JNZBDPZB0P" // Dihapus karena tidak dipakai
};

// PENTING: Di Codespaces, kita harus menggunakan MANUAL_CONFIG ini
const firebaseConfig = MANUAL_CONFIG;
const appId = MANUAL_CONFIG.projectId; 

// --- FUNGSI BANTUAN FORMATTING ---
const formatTimestamp = (timestamp) => {
    if (!timestamp) return '-';
    let date;
    if (timestamp?.toDate) {
        date = timestamp.toDate();
    } else if (typeof timestamp === 'string') {
        date = new Date(timestamp);
    } else {
        date = timestamp;
    }

    if (!date || isNaN(date.getTime())) return 'Format tanggal salah';
    
    return date.toLocaleDateString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric', 
        hour: '2-digit', minute: '2-digit'
    }) + ' WIB';
};

const getStatusInfo = (status) => {
    switch (status) {
        case 'DELIVERED': return { icon: CheckCircle, color: 'text-green-600', label: 'Telah Diterima' };
        case 'IN_TRANSIT': return { icon: Truck, color: 'text-yellow-500', label: 'Dalam Perjalanan' };
        case 'PENDING': return { icon: Package, color: 'text-blue-500', label: 'Menunggu Pengiriman' };
        default: return { icon: Package, color: 'text-gray-500', label: 'Status Tidak Diketahui' };
    }
};

// --- KOMPONEN: INPUT PAKET BARU (ADMIN) ---
const AdminInput = ({ db, userId, onPackageAdded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: '', sender: 'PT Logistik Sejahtera', recipient: 'Budi Santoso', origin: 'Jakarta', destination: 'Bandung'
    });

    const handleCreate = async (e) => {
        e.preventDefault();
        // Mengganti alert() dengan console.error atau penanganan UI yang lebih baik
        if (!db) {
            console.error("Database belum terkoneksi! Pastikan Config sudah benar.");
            return;
        }

        setLoading(true);
        try {
            // Path penyimpanan: artifacts/{appId}/public/data/packages/{nomorResi}
            const packagesCol = collection(db, 'artifacts', appId, 'public', 'data', 'packages');
            const docRef = doc(packagesCol, formData.id);
            
            const newPackage = {
                id: formData.id,
                status: 'PENDING', // Status awal
                sender: formData.sender,
                recipient: formData.recipient,
                origin: formData.origin,
                destination: formData.destination,
                createdBy: userId || 'anonymous',
                createdAt: serverTimestamp(),
                trackingHistory: [
                    {
                        location: `Permintaan dibuat oleh ${formData.sender}`,
                        notes: 'Menunggu penjemputan oleh kurir.',
                        timestamp: new Date().toISOString()
                    }
                ]
            };

            await setDoc(docRef, newPackage);
            
            console.log(`✅ Paket ${formData.id} berhasil dibuat! Silakan lacak.`);
            // alert() diganti dengan log/state
            onPackageAdded(formData.id);
            setIsOpen(false);
            setFormData({ ...formData, id: '' });
        } catch (error) {
            console.error("Error creating package:", error);
            // alert() diganti dengan log
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-8">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg flex items-center transition"
            >
                <Plus className="w-4 h-4 mr-1" />
                {isOpen ? 'Tutup Panel Admin' : 'Input Data Paket Baru (Admin Simulation)'}
            </button>

            {isOpen && (
                <div className="mt-4 p-5 border-2 border-dashed border-blue-200 rounded-xl bg-white dark:bg-zinc-800">
                    <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 flex items-center">
                        <Database className="w-4 h-4 mr-2" /> Input Data ke Firestore
                    </h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input 
                            className="p-2 border rounded dark:bg-zinc-700 dark:text-white md:col-span-2" 
                            placeholder="Nomor Resi (WAJIB UNIK, Cth: JKT001)" 
                            value={formData.id}
                            onChange={e => setFormData({...formData, id: e.target.value.toUpperCase()})}
                            required
                        />
                        <input className="p-2 border rounded dark:bg-zinc-700 dark:text-white" placeholder="Pengirim" value={formData.sender} onChange={e => setFormData({...formData, sender: e.target.value})} required/>
                        <input className="p-2 border rounded dark:bg-zinc-700 dark:text-white" placeholder="Penerima" value={formData.recipient} onChange={e => setFormData({...formData, recipient: e.target.value})} required/>
                        <input className="p-2 border rounded dark:bg-zinc-700 dark:text-white" placeholder="Asal" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
                        <input className="p-2 border rounded dark:bg-zinc-700 dark:text-white" placeholder="Tujuan" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
                        
                        <button type="submit" disabled={loading} className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold shadow-md">
                            {loading ? 'Menyimpan...' : 'Simpan ke Database'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

// --- KOMPONEN: HASIL LACAK ---
// Sekarang hanya menerima searchError (kesalahan data), bukan error koneksi
const TrackingResult = ({ result, loading, searchError }) => {
    if (loading) return <div className="text-center p-8 animate-pulse text-blue-500 dark:text-blue-400">Mencari data di server...</div>;
    
    if (searchError) {
        return (
            <div className="mt-6 p-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-center">
                <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 dark:text-red-400 font-bold">{searchError}</p>
                <p className="text-sm text-gray-500 mt-1">Coba buat data baru menggunakan panel Admin di atas.</p>
            </div>
        );
    }

    if (!result) return <div className="text-center p-8 text-gray-400">Masukkan resi di atas untuk mulai melacak.</div>;

    const { icon: StatusIcon, color: statusColor, label: statusLabel } = getStatusInfo(result.status);
    
    return (
        <div className="mt-6 bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden border-t-4 border-blue-500">
            <div className="p-6 border-b dark:border-zinc-800">
                <div className="flex items-center gap-4">
                    <StatusIcon className={`w-10 h-10 ${statusColor}`} />
                    <div>
                        <h2 className="text-2xl font-bold dark:text-white">{statusLabel}</h2>
                        <p className="text-gray-500">Resi: <span className="font-mono font-bold text-blue-600">{result.id}</span></p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-zinc-800/50 grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-400 block text-xs">PENGIRIM</span> <span className="font-semibold dark:text-gray-200">{result.sender}</span></div>
                <div><span className="text-gray-400 block text-xs">PENERIMA</span> <span className="font-semibold dark:text-gray-200">{result.recipient}</span></div>
                <div><span className="text-gray-400 block text-xs">ASAL</span> <span className="font-semibold dark:text-gray-200">{result.origin}</span></div>
                <div><span className="text-gray-400 block text-xs">TUJUAN</span> <span className="font-semibold dark:text-gray-200">{result.destination}</span></div>
            </div>

            <div className="p-6">
                <h3 className="font-bold mb-4 dark:text-white">Riwayat Perjalanan</h3>
                <div className="space-y-6 border-l-2 border-gray-200 dark:border-zinc-700 ml-3 pl-6 relative">
                    {/* Sort history by timestamp descending for correct display order */}
                    {result.trackingHistory && [...result.trackingHistory].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).map((history, idx) => (
                        <div key={idx} className="relative">
                            <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 ${idx === 0 ? 'bg-blue-500 border-blue-500' : 'bg-gray-100 border-gray-300 dark:bg-zinc-800 dark:border-zinc-600'}`}></span>
                            <p className={`font-bold ${idx === 0 ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'}`}>{history.location}</p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                <Clock className="w-3 h-3 mr-1" /> {formatTimestamp(history.timestamp)}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">"{history.notes}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- KOMPONEN UTAMA (APP) ---
const App = () => {
    const [trackingId, setTrackingId] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // Dipisahkan: error untuk data/pencarian
    const [searchError, setSearchError] = useState(null); 
    
    // Dipisahkan: error untuk koneksi/inisialisasi Firebase
    const [firebaseError, setFirebaseError] = useState(null);
    
    const [copyStatus, setCopyStatus] = useState('');
    
    // Firebase State
    const [db, setDb] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // 1. Inisialisasi Firebase
    useEffect(() => {
        // Pengecekan Kualitas Konfigurasi Manual
        if (!firebaseConfig.apiKey) {
            setFirebaseError("❌ Config belum diisi/tidak lengkap. Periksa MANUAL_CONFIG.");
            return;
        }

        try {
            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);
            const auth = getAuth(app);
            
            setDb(firestore);

            // Listener Otentikasi
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (!user) {
                    try {
                        // Login Anonim sebagai default
                        const cred = await signInAnonymously(auth);
                        setCurrentUser(cred.user.uid);
                        console.log("✅ Terhubung ke Firebase sebagai Anonim:", cred.user.uid);
                    } catch (e) {
                        console.error("Auth Error:", e);
                        setFirebaseError("Gagal login anonim ke Firebase. Pastikan rules Firestore sudah benar.");
                    }
                } else {
                    setCurrentUser(user.uid);
                }
                setIsReady(true);
            });
            return () => unsubscribe();
        } catch (e) {
            console.error("Firebase Init Error:", e);
            setFirebaseError("Error Inisialisasi Firebase. Cek koneksi dan konfigurasi.");
        }
    }, []);

    // 2. Fungsi Cari
    const handleSearch = async (idCari) => {
        const targetId = idCari || trackingId;
        if (!targetId || !db || !isReady) return;

        setLoading(true);
        setSearchError(null); // Reset error pencarian
        setResult(null);

        try {
            // Path: artifacts/{appId}/public/data/packages/{nomorResi}
            const packagesCol = collection(db, 'artifacts', appId, 'public', 'data', 'packages');
            const docRef = doc(packagesCol, targetId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setResult({ id: docSnap.id, ...docSnap.data() });
            } else {
                setSearchError(`Resi ${targetId} tidak ditemukan.`);
            }
        } catch (err) {
            console.error("Firebase Search Error:", err);
            setSearchError("Gagal mengambil data dari Firestore.");
        } finally {
            setLoading(false);
        }
    };
    
    // Fungsi untuk menyalin User ID (tanpa navigator.clipboard)
    const copyUserIdToClipboard = (text) => {
        // Karena navigator.clipboard mungkin tidak tersedia di Codespaces/iFrame
        // kita menggunakan metode fallback (execCommand)
        const dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        
        setCopyStatus('Disalin!');
        setTimeout(() => setCopyStatus(''), 2000);
    };

    // Tentukan status koneksi utama
    const connectionStatus = isReady && !firebaseError 
        ? { label: 'Online & Siap', color: 'bg-green-500', text: 'text-green-600' } 
        : { label: 'Connecting...', color: 'bg-red-500 animate-pulse', text: 'text-red-500' };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-800 dark:text-gray-200 p-4 font-sans transition-colors">
            {/* Indikator Status Koneksi */}
            <div className={`fixed top-0 left-0 w-full h-1 ${connectionStatus.color}`}></div>

            <div className="max-w-2xl mx-auto mt-10">
                <h1 className="text-3xl font-extrabold text-center mb-2 dark:text-white">📦 Logistik Tracker</h1>
                
                {/* Status dan User ID */}
                <div className="text-center text-sm text-gray-500 mb-8 flex flex-col items-center">
                    <p>Status: <span className={`${connectionStatus.text} font-bold`}>{connectionStatus.label}</span></p>
                    
                    {/* Menampilkan error koneksi jika ada */}
                    {firebaseError && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-400 font-bold p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            {firebaseError}
                        </p>
                    )}

                    {currentUser && (
                        <div className="mt-2 text-xs flex items-center bg-gray-200 dark:bg-zinc-800 p-2 rounded-lg max-w-full overflow-auto">
                            <User className="w-3 h-3 mr-1 text-blue-500 flex-shrink-0" /> 
                            <span className="font-mono text-gray-700 dark:text-gray-300 truncate">
                                ID Pengguna: {currentUser}
                            </span>
                            <button 
                                onClick={() => copyUserIdToClipboard(currentUser)} 
                                className="ml-2 p-1 bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded transition relative"
                            >
                                <Copy className="w-3 h-3 text-blue-600" />
                                {copyStatus && <span className="absolute top-0 right-0 -mt-7 px-2 py-1 bg-black text-white text-xs rounded shadow-lg animate-fade-in-out">{copyStatus}</span>}
                            </button>
                        </div>
                    )}
                    
                </div>

                {/* Bagian Admin (Untuk Input Data) */}
                <AdminInput 
                    db={db} 
                    userId={currentUser} 
                    onPackageAdded={(id) => {
                        setTrackingId(id);
                        handleSearch(id);
                    }} 
                />

                {/* Form Pencarian */}
                <div className="flex gap-2 mb-6">
                    <input 
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                        placeholder="Masukkan Nomor Resi..."
                        className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        disabled={!isReady || loading}
                    />
                    <button 
                        onClick={() => handleSearch()}
                        disabled={loading || !isReady || !trackingId}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-bold disabled:opacity-50"
                    >
                        {loading ? 'Mencari...' : 'Lacak'}
                    </button>
                </div>

                {/* Hasil */}
                <TrackingResult result={result} loading={loading} searchError={searchError} />
            </div>
        </div>
    );
};

export default App;

