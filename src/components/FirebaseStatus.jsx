import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, Info, Database } from 'lucide-react';
// Import CDN diperlukan karena komponen ini mandiri
import { getFirestore, collection, getDocs, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

// Komponen ini digunakan untuk Debugging/Validasi koneksi Firebase & data
// Sekarang menerima firebaseConfig sebagai prop dari App.jsx
const FirebaseStatus = ({ firebaseConfig }) => {
    const [appId, setAppId] = useState('N/A');
    const [status, setStatus] = useState('Memuat...');
    const [dataCount, setDataCount] = useState(0);
    const [dataSample, setDataSample] = useState(null);
    const [error, setError] = useState(null);

    const checkStatus = async () => {
        setStatus('Memeriksa koneksi...');
        setError(null);
        setDataCount(0);
        setDataSample(null);

        // 1. Cek Config yang Diterima
        if (!firebaseConfig || Object.keys(firebaseConfig).length === 0) {
            setStatus('Gagal Koneksi');
            setError("Konfigurasi Firebase (prop) tidak ditemukan.");
            return;
        }

        try {
            // Ambil variabel global
            const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            setAppId(currentAppId);

            // Inisialisasi app menggunakan config dari prop
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);

            // Tentukan path koleksi publik tempat kita menyimpan data tracking
            const trackingCollectionPath = `artifacts/${currentAppId}/public/data/tracking_updates`;
            const trackingCollectionRef = collection(db, trackingCollectionPath);

            // Mengambil data (simulasi melihat isi "konsol")
            const snapshot = await getDocs(trackingCollectionRef);
            
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            setDataCount(docs.length);
            if (docs.length > 0) {
                // Tampilkan sampel data pertama
                setDataSample(docs[0]);
            }
            
            setStatus('Tersambung & Data Ditemukan');

        } catch (err) {
            console.error("DEBUG FIREBASE ERROR:", err);
            setStatus('Gagal Koneksi');
            // Cek apakah ini error permissions atau yang lain
            const errorMessage = err.message.includes('permission') 
                ? "Gagal (Izin Ditolak): Cek security rules." 
                : "Gagal membaca data dari Firestore. Cek Console Browser.";
            setError(errorMessage);
        }
    };

    // Jalankan cekStatus setiap kali firebaseConfig (prop) berubah atau dimuat
    useEffect(() => {
        checkStatus();
    }, [firebaseConfig]);

    const statusStyle = status.includes('Gagal') ? 'bg-red-600' : status.includes('Tersambung') ? 'bg-green-600' : 'bg-yellow-600';

    return (
        <div className="fixed bottom-0 right-0 m-4 p-4 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 text-xs font-mono">
            <h4 className="flex items-center space-x-2 font-bold mb-2 border-b border-gray-700 pb-1 text-[var(--color-primary)]">
                <Database className="w-4 h-4" />
                <span>DEBUG FIREBASE</span>
            </h4>
            
            {/* Status Koneksi */}
            <div className={`flex items-center p-1 rounded-md text-white ${statusStyle} mb-2`}>
                {status.includes('Tersambung') ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                <span className="font-semibold">{status}</span>
            </div>

            <div className="space-y-1 text-gray-400">
                <p>App ID: <span className="text-white break-all">{appId}</span></p>
                <p>Koleksi: <span className="text-white">tracking_updates</span></p>
                <p>Total Data: <span className="text-white">{dataCount}</span></p>
            </div>

            {/* Detail Error/Data Sample */}
            {error && <p className="mt-2 text-red-400"><Info className="w-3 h-3 inline mr-1" /> Error: {error}</p>}
            
            {dataSample && (
                <div className="mt-2 p-2 bg-gray-800 rounded">
                    <p className="font-semibold text-[var(--color-accent)]">Sampel Data:</p>
                    <p className="text-gray-300">ID: {dataSample.id}</p>
                    <p className="text-gray-300">Status: {dataSample.status}</p>
                </div>
            )}
            
            <button 
                onClick={checkStatus} 
                className="mt-3 w-full flex items-center justify-center space-x-1 p-1 bg-[var(--color-primary)] hover:bg-red-700 rounded transition duration-300 text-white"
            >
                <RefreshCw className="w-3 h-3" />
                <span>Cek Ulang</span>
            </button>
        </div>
    );
};

export default FirebaseStatus;

