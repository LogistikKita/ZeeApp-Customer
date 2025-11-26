import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';

// --- KONSTANTA & SETUP FIREBASE (JANGAN DIUBAH) ---
// Variabel global disediakan oleh lingkungan Canvas
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Data simulasi untuk seeding
const shipmentData = [
  {
    resi: 'MOJO-001',
    status: 'Telah Tiba di Tujuan',
    lokasi_terkini: 'Mojokerto',
    nama_penerima: 'Budi Santoso',
    telepon_penerima: '0812-xxxx-xxxx',
    timeline: [
      { waktu: '2025-11-20 09:00', deskripsi: 'Paket diterima di gudang pengirim (Jakarta).' },
      { waktu: '2025-11-20 14:30', deskripsi: 'Paket berangkat dari gudang Jakarta.' },
      { waktu: '2025-11-21 08:00', deskripsi: 'Transit di Surabaya.' },
      { waktu: '2025-11-21 16:00', deskripsi: 'Paket tiba di Mojokerto dan siap diantar.' },
      { waktu: '2025-11-22 10:00', deskripsi: 'Paket dalam proses pengiriman oleh kurir.' },
      { waktu: '2025-11-22 14:00', deskripsi: 'Telah Tiba di Tujuan. Diterima oleh Budi Santoso.' },
    ],
  },
  {
    resi: 'MOJO-002',
    status: 'Dalam Perjalanan',
    lokasi_terkini: 'Surabaya',
    nama_penerima: 'Citra Dewi',
    telepon_penerima: '0813-xxxx-xxxx',
    timeline: [
      { waktu: '2025-11-23 11:00', deskripsi: 'Paket diterima di gudang pengirim (Bandung).' },
      { waktu: '2025-11-23 17:00', deskripsi: 'Paket berangkat dari gudang Bandung.' },
      { waktu: '2025-11-24 07:00', deskripsi: 'Transit di Semarang.' },
      { waktu: '2025-11-25 12:00', deskripsi: 'Dalam perjalanan ke Surabaya.' },
    ],
  },
];

// --- KONTEKS FIREBASE ---
const FirebaseContext = createContext();

// Komponen Pembungkus untuk Inisialisasi Firebase
const FirebaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [authStatus, setAuthStatus] = useState('Memuat...');
  const [firestoreStatus, setFirestoreStatus] = useState('Terputus');
  const [userId, setUserId] = useState(null);
  const [totalData, setTotalData] = useState(0);

  // Path ke koleksi
  const getCollectionPath = (collectionName) => `/artifacts/${appId}/public/data/${collectionName}`;

  // Seeding Data Awal
  const seedShipmentData = useCallback(async (firebaseModules, firestoreInstance, userId) => {
    if (!firestoreInstance) return;

    const { doc, getDoc, setDoc, collection, onSnapshot } = firebaseModules;

    try {
      const collectionRef = collection(firestoreInstance, getCollectionPath('shipments'));
      let count = 0;

      for (const shipment of shipmentData) {
        const docRef = doc(collectionRef, shipment.resi);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          await setDoc(docRef, shipment);
          count++;
        }
      }

      if (count > 0) {
        console.log(`[Seeding] Berhasil menambahkan ${count} dokumen resi simulasi. User: ${userId}`);
      }

      // Setup listener untuk menghitung total data
      const q = collection(firestoreInstance, getCollectionPath('shipments'));
      onSnapshot(q, (snapshot) => {
        setTotalData(snapshot.size);
      });

      setFirestoreStatus('Terhubung');
    } catch (error) {
      console.error('[Seeding Error] Gagal seeding data atau membuat listener:', error);
      setFirestoreStatus('Gagal (Seeding/Listener)');
    }
  }, []); // Dependensi kosong, hanya dijalankan sekali

  // Fungsi Inisialisasi Utama
  useEffect(() => {
    const loadFirebaseScripts = () => {
        // Cek apakah library Firebase sudah dimuat melalui CDN global
        if (typeof window.firebase === 'undefined' || typeof window.firebase.firestore === 'undefined') {
            
            // Definisikan CDN scripts
            const firebaseScripts = [
                "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js",
                "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js",
                "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js"
            ];

            let loadedCount = 0;
            const scriptsToLoad = firebaseScripts.length;

            const handleScriptLoad = () => {
                loadedCount++;
                if (loadedCount === scriptsToLoad) {
                    // Semua script sudah dimuat, panggil fungsi init
                    initFirebase();
                }
            };

            // Tambahkan script ke DOM
            firebaseScripts.forEach(url => {
                const script = document.createElement('script');
                script.src = url;
                script.onload = handleScriptLoad;
                script.onerror = () => {
                    console.error(`Gagal memuat script Firebase dari: ${url}`);
                    setAuthStatus('Error (Gagal memuat script)');
                };
                document.head.appendChild(script);
            });
            return; // Tunggu script dimuat
        }
        
        // Jika sudah dimuat (sudah ada di window), langsung init
        initFirebase();
    };

    const initFirebase = () => {
        // Akses modul dari global window
        const firebaseModules = {
            initializeApp: window.firebase.initializeApp,
            getAuth: window.firebase.auth.getAuth,
            signInAnonymously: window.firebase.auth.signInAnonymously,
            signInWithCustomToken: window.firebase.auth.signInWithCustomToken,
            onAuthStateChanged: window.firebase.auth.onAuthStateChanged,
            getFirestore: window.firebase.firestore.getFirestore,
            setLogLevel: window.firebase.firestore.setLogLevel,
            doc: window.firebase.firestore.doc,
            getDoc: window.firebase.firestore.getDoc,
            addDoc: window.firebase.firestore.addDoc,
            setDoc: window.firebase.firestore.setDoc,
            updateDoc: window.firebase.firestore.updateDoc,
            onSnapshot: window.firebase.firestore.onSnapshot,
            collection: window.firebase.firestore.collection,
            query: window.firebase.firestore.query,
            where: window.firebase.firestore.where,
            getDocs: window.firebase.firestore.getDocs,
        };

        if (Object.keys(firebaseConfig).length === 0) {
          setAuthStatus('Error (Config tidak ditemukan)');
          return;
        }

        try {
          // Hanya setLogLevel jika getFirestore tersedia
          if (firebaseModules.getFirestore) {
             firebaseModules.setLogLevel('debug');
          }
         
          const app = firebaseModules.initializeApp(firebaseConfig);
          const authInstance = firebaseModules.getAuth(app);
          const dbInstance = firebaseModules.getFirestore(app);

          setAuth(authInstance);
          setDb(dbInstance);

          // 1. Otentikasi
          const unsubscribe = firebaseModules.onAuthStateChanged(authInstance, async (user) => {
            if (user) {
              setAuthStatus('Siap');
              setUserId(user.uid);
              // 2. Jika auth siap, jalankan seeding dan listener
              seedShipmentData(firebaseModules, dbInstance, user.uid);
            } else {
              try {
                if (initialAuthToken) {
                  await firebaseModules.signInWithCustomToken(authInstance, initialAuthToken);
                } else {
                  await firebaseModules.signInAnonymously(authInstance);
                }
              } catch (error) {
                console.error('[Auth Error] Gagal sign in:', error);
                setAuthStatus('Gagal');
              }
            }
          });

          return () => unsubscribe();
        } catch (error) {
          console.error('[Init Error] Gagal menginisialisasi Firebase:', error);
          setAuthStatus('Gagal (Init)');
          setFirestoreStatus('Gagal (Init)');
        }
    };

    loadFirebaseScripts();
    
    // Cleanup tidak diperlukan untuk script CDN yang dimuat secara global
  }, [seedShipmentData]);


  // Public utility function to fetch shipment
  const getShipment = useCallback(async (resi) => {
    if (!db) {
      console.error('Firestore belum siap.');
      return null;
    }
    // Akses modul Firestore dari global window
    const { doc, getDoc } = window.firebase.firestore;
    try {
      const docRef = doc(db, getCollectionPath('shipments'), resi);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error('[Fetch Error] Gagal mengambil data resi:', error);
      return null;
    }
  }, [db]);
  
  // Public utility function to submit contact form
  const submitContactForm = useCallback(async (formData) => {
    if (!db) {
      throw new Error("Firestore belum terhubung.");
    }
    // Akses modul Firestore dari global window
    const { collection, addDoc } = window.firebase.firestore;
    try {
      const collectionRef = collection(db, getCollectionPath('contact_messages'));
      const timestamp = new Date().toISOString();
      await addDoc(collectionRef, {
        ...formData,
        timestamp: timestamp,
        userId: userId || 'anonymous',
      });
      return { success: true, message: "Pesan berhasil terkirim!" };
    } catch (error) {
      console.error('[Submit Error] Gagal menyimpan pesan kontak:', error);
      throw new Error(`Gagal menyimpan pesan: ${error.message}`);
    }
  }, [db, userId]);

  return (
    <FirebaseContext.Provider value={{
      db,
      auth,
      authStatus,
      firestoreStatus,
      userId,
      appId,
      totalData,
      getShipment,
      submitContactForm,
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Hook untuk menggunakan konteks
const useFirebase = () => useContext(FirebaseContext);

// --- KOMPONEN DEBUG (Panel di kanan bawah) ---
const FirebaseStatus = () => {
  const { authStatus, firestoreStatus, appId, totalData, userId, db } = useFirebase();

  // Fungsi untuk muat ulang komponen saat tombol Cek Ulang ditekan
  const handleReload = () => {
    // Refresh penuh halaman adalah cara terbaik untuk memicu ulang inisialisasi CDN
    window.location.reload();
  };

  // Warna status
  const statusColor = firestoreStatus === 'Terhubung' ? '#4CAF50' : '#F44336'; // Hijau atau Merah

  return (
    <div
      className="fixed bottom-4 right-4 z-50 p-4 w-64 text-xs font-mono rounded-xl shadow-2xl transition-all"
      style={{
        backgroundColor: '#1E1E1E',
        color: '#FFFFFF',
        border: `1px solid ${statusColor}`,
        transform: firestoreStatus === 'Terhubung' ? 'scale(0.95)' : 'scale(1)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-sm text-red-500">
          <span className="inline-block h-3 w-3 rounded-full mr-2" style={{ backgroundColor: statusColor }}></span>
          DEBUG FIREBASE
        </div>
      </div>
      <div className="space-y-1">
        <p>App ID: <span className="text-yellow-400">{appId}</span></p>
        <p>User ID: <span className="text-yellow-400 truncate">{userId || 'N/A'}</span></p>
        <p>Auth Status: <span className={`font-bold ${authStatus === 'Siap' ? 'text-green-400' : 'text-red-400'}`}>{authStatus}</span></p>
        <p>Firestore: <span className={`font-bold ${firestoreStatus === 'Terhubung' ? 'text-green-400' : 'text-red-400'}`}>{firestoreStatus}</span></p>
        {firestoreStatus === 'Terhubung' && (
          <p>Total Resi (Seeding): <span className="font-bold text-green-400">{totalData}</span></p>
        )}
        {firestoreStatus !== 'Terhubung' && (
          <button
            onClick={handleReload}
            className="w-full mt-2 p-1 bg-red-600 hover:bg-red-700 rounded text-white transition duration-200"
          >
            &#x21BB; Cek Ulang Koneksi
          </button>
        )}
      </div>
    </div>
  );
};


// --- KOMPONEN UI ---

const Navbar = () => (
  <nav className="bg-black py-4 sticky top-0 z-40 shadow-lg">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {/* Placeholder Logo (Gunakan Emoji atau SVG sederhana) */}
        <span className="text-red-500 text-2xl font-black">LOGISTIK KITA</span>
      </div>
      <div className="hidden md:flex space-x-6 text-white text-sm font-semibold">
        {['Layanan', 'Keunggulan', 'Pelacakan'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-red-500 transition duration-300">{item}</a>
        ))}
        <a href="#hubungi-kami" className="px-4 py-2 bg-red-600 rounded-full hover:bg-red-700 transition duration-300">Hubungi Kami</a>
      </div>
      <button className="md:hidden text-white text-2xl">&#9776;</button>
    </div>
  </nav>
);

const HeroSection = () => (
  <header id="beranda" className="bg-black text-white pt-20 pb-24 relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-black leading-tight mb-4 text-red-500">
          Logistik Mojokerto Baru
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Solusi pengiriman terpercaya dan efisien untuk kebutuhan bisnis Anda di Jawa Timur dan seluruh Indonesia.
        </p>
        <div className="flex space-x-4">
          <a href="#pelacakan" className="px-8 py-3 bg-red-600 text-white font-bold rounded-full text-lg hover:bg-red-700 transition duration-300 shadow-xl">
            Lacak Resi Cepat
          </a>
          <a href="#layanan" className="px-8 py-3 bg-gray-800 text-white font-bold rounded-full text-lg hover:bg-gray-700 transition duration-300">
            Lihat Layanan Kami
          </a>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url(https://placehold.co/1200x800/222/FFF?text=TRUCK+IMAGE)' }}></div>
  </header>
);

const TrackingSection = () => {
  const { firestoreStatus, getShipment } = useFirebase();
  const [resiInput, setResiInput] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTracking = async (e) => {
    e.preventDefault();
    setError(null);
    setTrackingResult(null);

    if (firestoreStatus !== 'Terhubung') {
      setError('Koneksi ke sistem logistik gagal. Database (Firestore) belum siap.');
      return;
    }
    
    if (!resiInput.trim()) {
      setError('Mohon masukkan Nomor Resi.');
      return;
    }

    setLoading(true);
    const result = await getShipment(resiInput.trim().toUpperCase());
    setLoading(false);

    if (result) {
      setTrackingResult(result);
    } else {
      setError(`Nomor Resi "${resiInput.trim().toUpperCase()}" tidak ditemukan.`);
    }
  };

  return (
    <section id="pelacakan" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Lacak Pengiriman Anda</h2>
          <p className="text-center text-gray-600 mb-8">
            Masukkan Nomor Resi (misalnya, MOJO-001 atau MOJO-002) di bawah untuk melihat status dan lokasi terkini paket Anda.
          </p>

          <form onSubmit={handleTracking} className="space-y-6">
            <input
              type="text"
              placeholder="Masukkan Resi, Contoh: MOJO-001"
              value={resiInput}
              onChange={(e) => setResiInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              disabled={loading || firestoreStatus !== 'Terhubung'}
            />
            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white font-bold rounded-lg text-lg hover:bg-red-700 transition duration-300 flex items-center justify-center space-x-2 shadow-md disabled:bg-red-400"
              disabled={loading || firestoreStatus !== 'Terhubung'}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Mencari...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Lacak Sekarang</span>
                </>
              )}
            </button>
          </form>

          {/* Display Error/Status */}
          {firestoreStatus !== 'Terhubung' && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center space-x-3 border border-red-300">
              <span className="text-xl">
                &#9888;
              </span>
              <span>
                **Pencarian Gagal:** Koneksi ke sistem logistik gagal. Database (Firestore) belum siap.
              </span>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center space-x-3 border border-red-300">
              <span className="text-xl">
                &#10060;
              </span>
              <span>
                **Pencarian Gagal:** {error}
              </span>
            </div>
          )}
          
          {/* Display Tracking Result */}
          {trackingResult && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Detail Pengiriman {trackingResult.resi}</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">Status Terkini:</p>
                <p className={`text-xl font-bold ${trackingResult.status === 'Telah Tiba di Tujuan' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {trackingResult.status}
                </p>
                <p className="text-sm text-gray-600 mt-2">Lokasi:</p>
                <p className="text-lg font-semibold text-gray-800">{trackingResult.lokasi_terkini}</p>
                <p className="text-sm text-gray-600 mt-2">Penerima:</p>
                <p className="text-lg font-semibold text-gray-800">{trackingResult.nama_penerima}</p>
              </div>

              <h4 className="text-xl font-bold text-gray-800 mb-3">Riwayat Perjalanan:</h4>
              <ol className="relative border-l border-gray-300 ml-4">
                {trackingResult.timeline.slice().reverse().map((item, index) => (
                  <li key={index} className="mb-4 ml-6">
                    <span className="absolute flex items-center justify-center w-3 h-3 bg-red-600 rounded-full -left-1.5 ring-4 ring-white"></span>
                    <p className="text-sm font-medium text-gray-500">{item.waktu.split(' ')[0]}</p>
                    <p className="text-base font-semibold text-gray-800">{item.deskripsi}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
    const { submitContactForm, firestoreStatus } = useFirebase();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success'|'error', message: '...' }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        if (firestoreStatus !== 'Terhubung') {
            setStatus({ type: 'error', message: 'Koneksi database gagal. Mohon periksa status koneksi Firebase Anda.' });
            return;
        }

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', message: 'Semua kolom wajib diisi.' });
            return;
        }
        
        setLoading(true);
        try {
            await submitContactForm(formData);
            setStatus({ type: 'success', message: 'Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: error.message || 'Terjadi kesalahan saat mengirim pesan.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="hubungi-kami" className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-red-500">Hubungi Kami</h2>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Form Bagian Kiri */}
                    <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                        <p className="text-gray-300 mb-6">Kami siap membantu! Isi formulir di bawah ini untuk konsultasi pengiriman atau pertanyaan lainnya.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nama Lengkap"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-red-500 focus:border-red-500"
                                disabled={loading}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Aktif Anda"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-red-500 focus:border-red-500"
                                disabled={loading}
                            />
                            <textarea
                                name="message"
                                placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-red-500 focus:border-red-500"
                                disabled={loading}
                            ></textarea>
                            
                            {status && (
                                <div className={`p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center space-x-2 shadow-md disabled:bg-red-400"
                                disabled={loading || firestoreStatus !== 'Terhubung'}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Mengirim...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Kirim Pesan</span>
                                    </>
                                )}
                            </button>
                            {firestoreStatus !== 'Terhubung' && (
                                <p className='text-xs text-red-400 pt-2 text-center'>
                                    (Fungsi kirim pesan tidak aktif karena Firestore terputus)
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Info Kontak Bagian Kanan */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-red-500">Kantor Pusat Kami</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <span className="text-red-500 text-xl">&#x1F3E0;</span>
                                <div>
                                    <p className="font-semibold">Alamat</p>
                                    <p className="text-gray-400">Jl. Raya Bypass Mojokerto No. 45, Mojokerto, Jawa Timur 61361.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-red-500 text-xl">&#x1F4DE;</span>
                                <div>
                                    <p className="font-semibold">Telepon/WhatsApp</p>
                                    <p className="text-gray-400">(0321) 1234 5678</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-red-500 text-xl">&#x2709;&#xFE0F;</span>
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <p className="text-gray-400">info@logistik-kita.id</p>
                                </div>
                            </div>
                        </div>

                        {/* Placeholder Peta */}
                        <div className="bg-gray-800 h-64 rounded-xl flex items-center justify-center text-gray-500">
                            Peta Lokasi Kantor Pusat
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


const Footer = () => (
  <footer className="bg-gray-800 text-white py-12">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8">
      <div>
        <h3 className="text-xl font-black text-red-500 mb-4">LOGISTIK KITA</h3>
        <p className="text-sm text-gray-400">Solusi pengiriman terpercaya, cepat, dan efisien untuk kebutuhan perusahaan dan individu.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Tentang Kami</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>Karir</li>
          <li>Media</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Layanan</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>Pengiriman Domestik</li>
          <li>Asuransi</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Info</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>FAQ</li>
          <li>Syarat & Ketentuan</li>
          <li>Kebijakan Privasi</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Ikuti Kami</h4>
        <div className="flex space-x-3 text-2xl">
          {/* Ikon Sosial Media Placeholder */}
          <a href="#" className="hover:text-red-500 transition duration-300">&#x24B8;</a>
          <a href="#" className="hover:text-red-500 transition duration-300">&#x24B9;</a>
          <a href="#" className="hover:text-red-500 transition duration-300">&#x24BD;</a>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
      &copy; 2025 Logistik Kita. All rights reserved.
    </div>
  </footer>
);

const ServicesSection = () => (
    <section id="layanan" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center mb-12">Layanan Logistik Unggulan</h2>
            <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">
                Kami menawarkan berbagai solusi pengiriman yang dapat disesuaikan dengan kebutuhan spesifik bisnis Anda.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Kartu Layanan */}
                {[
                    {
                        title: "Pengiriman Darat (Road Freight)",
                        icon: "🚚",
                        desc: "Layanan kargo umum untuk angkutan darat besar maupun kecil di seluruh pulau Jawa, Bali, dan Sumatera. Cepat, aman, dan terjangkau."
                    },
                    {
                        title: "Pengiriman Udara (Air Cargo)",
                        icon: "✈️",
                        desc: "Solusi untuk barang yang memerlukan kecepatan tinggi, melayani rute domestik dan internasional. Prioritas untuk kargo sensitif waktu."
                    },
                    {
                        title: "Pengiriman Laut (Sea Freight)",
                        icon: "🚢",
                        desc: "Layanan FCL (Full Container Load) dan LCL (Less than Container Load) untuk efisiensi biaya pengiriman antar pulau dan internasional."
                    },
                    {
                        title: "Gudang & Distribusi",
                        icon: "📦",
                        desc: "Fasilitas gudang modern di Mojokerto dengan sistem manajemen inventaris terintegrasi, siap mendukung rantai pasok Anda."
                    },
                    {
                        title: "Last-Mile Express",
                        icon: "🏍️",
                        desc: "Pengiriman cepat (satu hari sampai) untuk area Mojokerto, Surabaya, dan Malang. Cocok untuk kebutuhan e-commerce dan mendesak."
                    },
                    {
                        title: "Tracking Real-Time",
                        icon: "📍",
                        desc: "Sistem pelacakan GPS terintegrasi yang memungkinkan Anda memantau lokasi kiriman secara akurat, 24 jam sehari."
                    },
                ].map((service, index) => (
                    <div key={index} className="bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-red-500 transition duration-300">
                        <div className="text-4xl mb-4">{service.icon}</div>
                        <h3 className="text-2xl font-bold mb-3 text-red-500">{service.title}</h3>
                        <p className="text-gray-400">{service.desc}</p>
                    </div>
                ))}
            </div>

            <div className="text-center mt-16">
                <a href="#hubungi-kami" className="px-8 py-3 bg-red-600 text-white font-bold rounded-full text-lg hover:bg-red-700 transition duration-300 shadow-xl">
                    Konsultasikan Kebutuhan Anda
                </a>
            </div>
        </div>
    </section>
);


const App = () => {
  return (
    <FirebaseProvider>
      <div className="min-h-screen font-sans antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <TrackingSection />
          <ContactForm />
        </main>
        <Footer />
        <FirebaseStatus /> {/* Panel Debug Kembali! */}
      </div>
    </FirebaseProvider>
  );
};

export default App;

