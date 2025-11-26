import React, { useState, useEffect } from 'react';
import { 
    Clock, Truck, MapPin, CheckCircle, Package, Database, User, XCircle, Plus, 
    Save, Copy, RotateCcw, Shield, Box, Globe, Users, Search, Menu, X, 
    ArrowRight, Star, Phone, Mail, ChevronRight, Zap
} from 'lucide-react';

// --- IMPORTS FIREBASE ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { 
    getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, 
    serverTimestamp, collection
} from 'firebase/firestore';

// ==========================================
// 1. KONFIGURASI FIREBASE
// ==========================================
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

// ==========================================
// 2. UTILITIES & HELPERS
// ==========================================

const formatTimestamp = (timestamp) => {
    if (!timestamp) return '-';
    let date;
    if (timestamp?.toDate) date = timestamp.toDate();
    else if (typeof timestamp === 'string') date = new Date(timestamp);
    else date = timestamp;

    if (!date || isNaN(date.getTime())) return 'Format salah';
    return date.toLocaleDateString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric', 
        hour: '2-digit', minute: '2-digit'
    }) + ' WIB';
};

const getStatusInfo = (status) => {
    switch (status) {
        case 'DELIVERED': return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', label: 'Telah Diterima' };
        case 'IN_TRANSIT': return { icon: Truck, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', label: 'Dalam Perjalanan' };
        case 'PENDING': return { icon: Box, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', label: 'Menunggu Pengiriman' };
        default: return { icon: Package, color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20', label: 'Status Tidak Diketahui' };
    }
};

const copyToClipboard = (text, setCopyStatus) => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setCopyStatus('Disalin!');
    setTimeout(() => setCopyStatus(''), 2000);
};

// ==========================================
// 3. COMPONENTS (Sesuai Struktur User)
// ==========================================

// --- KOMPONEN: Preloader (Simulasi) ---
const Preloader = ({ loading }) => {
    if (!loading) return null;
    return (
        <div className="fixed inset-0 z-[60] bg-zinc-950 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-zinc-800 border-t-green-500 rounded-full animate-spin mb-4"></div>
            <p className="text-green-500 font-bold tracking-widest animate-pulse">LOGISTIK KITA...</p>
        </div>
    );
};

// --- KOMPONEN: Navbar ---
const Navbar = ({ currentUser, toggleAdmin, isAdminOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <Truck className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Logistik<span className="text-green-500">Kita</span></span>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#hero" className="text-sm font-medium text-gray-400 hover:text-green-400 transition">Beranda</a>
                        <a href="#tracking" className="text-sm font-medium text-gray-400 hover:text-green-400 transition">Lacak</a>
                        <a href="#services" className="text-sm font-medium text-gray-400 hover:text-green-400 transition">Layanan</a>
                        <a href="#fleet" className="text-sm font-medium text-gray-400 hover:text-green-400 transition">Armada</a>
                        <button 
                            onClick={toggleAdmin}
                            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${isAdminOpen ? 'bg-red-500/10 text-red-500 border border-red-500/50' : 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'}`}
                        >
                            {isAdminOpen ? 'Tutup Admin' : 'Admin Panel'}
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu omitted for brevity but logic is same */}
        </nav>
    );
};

// --- KOMPONEN: HeroSection ---
const HeroSection = () => (
    <div id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-zinc-950">
        {/* Abstract Shapes/Background */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-green-900/10 to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <Zap className="w-3 h-3 mr-2" /> Solusi Logistik #1
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
                    Logistik <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Mojokerto Baru</span>
                </h1>
                <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed mx-auto md:mx-0">
                    Kirim paket ke seluruh Indonesia dengan kecepatan tinggi, keamanan maksimal, dan pelacakan real-time tercanggih.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a href="#tracking" className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-900/40 transition transform hover:scale-105">
                        Mulai Lacak Paket
                    </a>
                    <a href="#services" className="px-8 py-4 bg-zinc-900 border border-zinc-700 text-white hover:border-green-500 hover:text-green-500 rounded-xl font-bold transition">
                        Layanan Kami
                    </a>
                </div>
            </div>
            
            {/* Hero Image (Truck) */}
            <div className="md:w-1/2 mt-12 md:mt-0 relative">
                <div className="relative z-10 transform md:translate-x-12 hover:scale-105 transition duration-500">
                    <img 
                        src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                        alt="Logistics Truck" 
                        className="rounded-3xl shadow-2xl border border-white/10"
                    />
                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 -left-6 bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-xl flex items-center gap-3">
                        <div className="bg-green-500/20 p-2 rounded-lg">
                            <Clock className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Estimasi</p>
                            <p className="text-white font-bold">Tepat Waktu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- KOMPONEN: TrustMetrics ---
const TrustMetrics = () => {
    const metrics = [
        { icon: Truck, label: "Armada", value: "100+" },
        { icon: MapPin, label: "Kota Tujuan", value: "34" },
        { icon: Users, label: "Klien Puas", value: "5k+" },
        { icon: Shield, label: "Aman", value: "100%" },
    ];

    return (
        <div className="py-12 bg-zinc-950 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {metrics.map((m, i) => (
                        <div key={i} className="text-center group">
                            <div className="w-12 h-12 mx-auto bg-zinc-900 rounded-xl flex items-center justify-center mb-3 group-hover:bg-green-500 transition duration-300">
                                <m.icon className="w-6 h-6 text-gray-400 group-hover:text-white" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{m.value}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">{m.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- KOMPONEN: AdminPanel (Create & Update) ---
const AdminPanel = ({ db, userId, onAction }) => {
    const [tab, setTab] = useState('create');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    const [createForm, setCreateForm] = useState({ id: '', sender: '', recipient: '', origin: 'Jakarta', destination: 'Mojokerto' });
    const [updateForm, setUpdateForm] = useState({ id: '', status: 'IN_TRANSIT', location: '', notes: '' });

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const ref = doc(collection(db, 'artifacts', appId, 'public', 'data', 'packages'), createForm.id);
            await setDoc(ref, {
                ...createForm,
                status: 'PENDING',
                createdBy: userId,
                createdAt: serverTimestamp(),
                trackingHistory: [{
                    location: `Permintaan dibuat oleh ${createForm.sender}`,
                    notes: 'Menunggu penjemputan oleh kurir.',
                    timestamp: new Date().toISOString()
                }]
            });
            setMsg({ type: 'success', text: `Resi ${createForm.id} dibuat!` });
            onAction(createForm.id);
            setCreateForm({...createForm, id: ''});
        } catch (err) {
            setMsg({ type: 'error', text: err.message });
        }
        setLoading(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const ref = doc(collection(db, 'artifacts', appId, 'public', 'data', 'packages'), updateForm.id);
            const snap = await getDoc(ref);
            if (!snap.exists()) throw new Error("Resi tidak ditemukan");
            await updateDoc(ref, {
                status: updateForm.status,
                trackingHistory: arrayUnion({
                    location: updateForm.location,
                    notes: updateForm.notes,
                    timestamp: new Date().toISOString()
                })
            });
            setMsg({ type: 'success', text: `Status ${updateForm.id} diperbarui!` });
            onAction(updateForm.id);
            setUpdateForm({...updateForm, id: '', location: '', notes: ''});
        } catch (err) {
            setMsg({ type: 'error', text: err.message });
        }
        setLoading(false);
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Database className="text-green-500" /> Admin Panel
                    </h3>
                    <div className="flex bg-zinc-950 p-1 rounded-lg border border-white/5">
                        <button onClick={() => setTab('create')} className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition ${tab === 'create' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}>Input Baru</button>
                        <button onClick={() => setTab('update')} className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition ${tab === 'update' ? 'bg-yellow-600 text-white' : 'text-gray-400 hover:text-white'}`}>Update Status</button>
                    </div>
                </div>

                {msg && (
                    <div className={`mb-4 p-3 rounded-lg text-sm border ${msg.type === 'success' ? 'bg-green-900/20 border-green-500/20 text-green-400' : 'bg-red-900/20 border-red-500/20 text-red-400'}`}>
                        {msg.text}
                    </div>
                )}

                {tab === 'create' ? (
                    <form onSubmit={handleCreate} className="grid md:grid-cols-2 gap-4">
                        <input className="col-span-2 bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-green-500 outline-none" placeholder="No. Resi Baru (Cth: MOJO001)" value={createForm.id} onChange={e => setCreateForm({...createForm, id: e.target.value.toUpperCase()})} required />
                        <input className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-green-500 outline-none" placeholder="Pengirim" value={createForm.sender} onChange={e => setCreateForm({...createForm, sender: e.target.value})} required />
                        <input className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-green-500 outline-none" placeholder="Penerima" value={createForm.recipient} onChange={e => setCreateForm({...createForm, recipient: e.target.value})} required />
                        <button disabled={loading} className="col-span-2 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold transition disabled:opacity-50">
                            {loading ? 'Memproses...' : 'Buat Resi Baru'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-4">
                        <input className="col-span-2 bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-yellow-500 outline-none" placeholder="No. Resi (Cth: MOJO001)" value={updateForm.id} onChange={e => setUpdateForm({...updateForm, id: e.target.value.toUpperCase()})} required />
                        <select className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-yellow-500 outline-none" value={updateForm.status} onChange={e => setUpdateForm({...updateForm, status: e.target.value})}>
                            <option value="IN_TRANSIT">Sedang Dikirim (IN_TRANSIT)</option>
                            <option value="DELIVERED">Diterima (DELIVERED)</option>
                            <option value="PENDING">Pending</option>
                        </select>
                        <input className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-yellow-500 outline-none" placeholder="Lokasi Terkini" value={updateForm.location} onChange={e => setUpdateForm({...updateForm, location: e.target.value})} required />
                        <input className="col-span-2 bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-yellow-500 outline-none" placeholder="Catatan Update" value={updateForm.notes} onChange={e => setUpdateForm({...updateForm, notes: e.target.value})} required />
                        <button disabled={loading} className="col-span-2 bg-yellow-600 hover:bg-yellow-500 text-white py-3 rounded-xl font-bold transition disabled:opacity-50">
                            {loading ? 'Memproses...' : 'Update Status'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

// --- KOMPONEN: TrackingSection & Result ---
const TrackingResult = ({ result, loading, searchError }) => {
    if (loading) return (
        <div className="mt-8 p-8 bg-zinc-900 rounded-2xl text-center border border-zinc-800">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Sedang melacak paket...</p>
        </div>
    );

    if (searchError) return (
        <div className="mt-8 p-6 bg-red-900/10 border border-red-500/20 rounded-2xl text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-red-500 font-bold mb-1">Tidak Ditemukan</h3>
            <p className="text-sm text-red-400/60">{searchError}</p>
        </div>
    );

    if (!result) return null;

    const status = getStatusInfo(result.status);
    const sortedHistory = [...(result.trackingHistory || [])].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <div className="mt-8 bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl relative">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Truck className="w-32 h-32 text-white" />
            </div>

            <div className="p-6 md:p-8 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-gray-500 mb-1 font-medium uppercase tracking-wider">Nomor Resi</p>
                        <h2 className="text-4xl font-mono font-bold text-white tracking-widest">{result.id}</h2>
                    </div>
                    <div className={`px-6 py-3 rounded-xl ${status.bg} border ${status.border} flex items-center gap-3`}>
                        <status.icon className={`w-6 h-6 ${status.color}`} />
                        <span className={`text-lg font-bold ${status.color}`}>{status.label}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-zinc-800 border-b border-zinc-800">
                <div className="p-6">
                    <p className="text-xs text-green-500 uppercase tracking-wider font-bold mb-2">Pengirim</p>
                    <p className="text-lg font-semibold text-white">{result.sender}</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4" /> {result.origin || 'Jakarta'}
                    </div>
                </div>
                <div className="p-6">
                    <p className="text-xs text-green-500 uppercase tracking-wider font-bold mb-2">Penerima</p>
                    <p className="text-lg font-semibold text-white">{result.recipient}</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4" /> {result.destination || 'Mojokerto'}
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8 bg-zinc-900/80">
                <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-500" /> Riwayat Perjalanan
                </h3>
                <div className="space-y-0 relative border-l-2 border-zinc-800 ml-3">
                    {sortedHistory.map((history, idx) => (
                        <div key={idx} className="relative pl-8 pb-8 last:pb-0">
                            <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${idx === 0 ? 'bg-green-500 border-green-900 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]' : 'bg-zinc-800 border-zinc-600'}`}></span>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                <h4 className={`text-lg font-bold ${idx === 0 ? 'text-green-400' : 'text-gray-300'}`}>
                                    {history.location}
                                </h4>
                                <span className="text-xs text-gray-600 font-mono bg-zinc-950 px-2 py-1 rounded">
                                    {formatTimestamp(history.timestamp)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
                                {history.notes}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TrackingSection = ({ db, isReady, loading, handleSearch, trackingId, setTrackingId, result, searchError, isAdminOpen, currentUser, handleAdminAction }) => (
    <div id="tracking" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20"> 
        <div className="bg-zinc-950 rounded-3xl shadow-2xl p-6 md:p-10 border border-white/10">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">Lacak Status Kiriman</h2>
                <p className="text-gray-400">Masukkan nomor resi Anda untuk mengetahui posisi terkini.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-500 transition" />
                    <input 
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                        placeholder="Contoh: MOJO001"
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition placeholder:text-gray-600 font-mono text-lg"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        disabled={!isReady || loading}
                    />
                </div>
                <button 
                    onClick={() => handleSearch()}
                    disabled={loading || !isReady || !trackingId}
                    className="bg-green-600 hover:bg-green-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-green-900/30 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? '...' : <>Lacak <ArrowRight className="w-5 h-5" /></>}
                </button>
            </div>

            {/* Admin Panel Injection */}
            {isAdminOpen && isReady && (
                <div className="mt-8 pt-8 border-t border-zinc-800 animate-fade-in">
                    <AdminPanel db={db} userId={currentUser} onAction={handleAdminAction} />
                </div>
            )}

            <TrackingResult result={result} loading={loading} searchError={searchError} />
        </div>
    </div>
);

// --- KOMPONEN: ServicesSection ---
const ServicesSection = () => {
    const services = [
        { title: "Kargo Darat", icon: Truck, desc: "Armada truk lengkap untuk seluruh pulau Jawa & Bali." },
        { title: "Pengiriman Kilat", icon: Zap, desc: "Layanan prioritas sampai di hari yang sama." },
        { title: "Kargo Laut", icon: Globe, desc: "Pengiriman antar pulau dengan kontainer aman." },
        { title: "Pergudangan", icon: Box, desc: "Fasilitas gudang transit yang aman dan luas." },
        { title: "Asuransi", icon: Shield, desc: "Jaminan keamanan penuh untuk setiap barang." },
        { title: "Door to Door", icon: User, desc: "Jemput dan antar langsung ke depan pintu." },
    ];

    return (
        <div id="services" className="py-24 bg-zinc-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-green-500 font-bold uppercase tracking-widest text-xs">Layanan Kami</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Solusi Logistik Terintegrasi</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <div key={i} className="group p-8 bg-zinc-950 rounded-3xl border border-zinc-800 hover:border-green-500/50 hover:bg-zinc-900 transition duration-300">
                            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition duration-300 shadow-inner">
                                <s.icon className="w-7 h-7 text-gray-400 group-hover:text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- KOMPONEN: FleetSection (Baru) ---
const FleetSection = () => (
    <div id="fleet" className="py-20 bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <span className="text-green-500 font-bold uppercase tracking-widest text-xs">Armada Kami</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">Kendaraan Modern & Terawat</h2>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        Kami memiliki berbagai jenis armada mulai dari Blind Van, CDE, CDD, hingga Wingbox Tronton yang siap melayani kebutuhan pengiriman skala kecil hingga besar. Seluruh armada dilengkapi GPS Tracker.
                    </p>
                    <ul className="space-y-4">
                        {['Blind Van (Kapasitas 700kg)', 'Engkel Box (Kapasitas 2 Ton)', 'CDD Long (Kapasitas 5 Ton)', 'Wingbox (Kapasitas 20 Ton)'].map((item, i) =>(
                            <li key={i} className="flex items-center text-gray-300">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="md:w-1/2 relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
                    <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Fleet" className="relative z-10 rounded-3xl shadow-2xl border border-white/10 rotate-2 hover:rotate-0 transition duration-500" />
                </div>
            </div>
        </div>
    </div>
);

// --- KOMPONEN: TestimonialsSection (Baru) ---
const TestimonialsSection = () => (
    <div className="py-20 bg-zinc-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Apa Kata Mereka?</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {name: "Budi Santoso", role: "CEO TechStore", text: "Pengiriman sangat cepat, dashboard trackingnya sangat membantu kami memantau stok."},
                    {name: "Siti Aminah", role: "UMKM Kuliner", text: "Logistik Kita membantu bisnis frozen food saya berkembang ke luar kota. Sangat recommended!"},
                    {name: "Ahmad Rizky", role: "Distributor Elektronik", text: "Harga kompetitif dan barang selalu aman sampai tujuan. Tim supportnya juga ramah."}
                ].map((t, i) => (
                    <div key={i} className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 relative">
                        <div className="flex justify-center mb-4">
                            {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                        </div>
                        <p className="text-gray-400 italic mb-6">"{t.text}"</p>
                        <h4 className="text-white font-bold">{t.name}</h4>
                        <span className="text-xs text-green-500 uppercase font-bold">{t.role}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// --- KOMPONEN: ContactUs (Baru) ---
const ContactUs = () => (
    <div className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Butuh Bantuan?</h2>
            <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 p-8 rounded-3xl border border-green-500/20 flex flex-col md:flex-row justify-around items-center gap-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <Phone className="text-white" />
                    </div>
                    <div className="text-left">
                        <p className="text-gray-400 text-xs uppercase">WhatsApp</p>
                        <p className="text-white font-bold text-lg">+62 812-3456-7890</p>
                    </div>
                </div>
                <div className="w-px h-12 bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                        <Mail className="text-white" />
                    </div>
                    <div className="text-left">
                        <p className="text-gray-400 text-xs uppercase">Email</p>
                        <p className="text-white font-bold text-lg">cs@logistikkita.id</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- KOMPONEN: Footer ---
const Footer = ({ currentUser }) => (
    <footer className="bg-black py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                    <Truck className="w-6 h-6 text-green-500" />
                    <span className="text-xl font-bold text-white">Logistik<span className="text-green-500">Kita</span></span>
                </div>
                <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                    Mitra logistik terpercaya untuk bisnis Anda. Melayani pengiriman darat, laut, dan udara dengan teknologi terkini.
                </p>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Tautan</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                    <li><a href="#" className="hover:text-green-500">Beranda</a></li>
                    <li><a href="#tracking" className="hover:text-green-500">Lacak Paket</a></li>
                    <li><a href="#services" className="hover:text-green-500">Layanan</a></li>
                    <li><a href="#fleet" className="hover:text-green-500">Armada</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Kantor Pusat</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                    Jl. Mojopahit No. 45<br/>
                    Mojokerto, Jawa Timur<br/>
                    Indonesia 61321
                </p>
            </div>
        </div>
        <div className="text-center pt-8 border-t border-white/5">
            <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Logistik Kita. All rights reserved.</p>
            {currentUser && <p className="mt-2 text-[10px] text-gray-800 font-mono">UID: {currentUser}</p>}
        </div>
    </footer>
);

// ==========================================
// 4. MAIN APP COMPONENT
// ==========================================

const App = () => {
    // UI State
    const [trackingId, setTrackingId] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    
    // Firebase State
    const [db, setDb] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFirebaseReady, setIsFirebaseReady] = useState(false);

    // --- INIT FIREBASE ---
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
                    setTimeout(() => setInitialLoad(false), 1500); // Fake loading for aesthetics
                });
                return unsubscribe;
            } catch (e) {
                console.error("Firebase Error:", e);
                setInitialLoad(false);
            }
        };
        init();
    }, []);

    // --- HANDLERS ---
    const handleSearch = async (overrideId) => {
        const target = overrideId || trackingId;
        if (!target || !db) return;

        setLoading(true);
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
        setLoading(false);
    };

    const handleAdminAction = (id) => {
        setTrackingId(id);
        handleSearch(id);
        document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
    };

    // --- RENDER ---
    return (
        <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans selection:bg-green-500 selection:text-white">
            <Preloader loading={initialLoad} />
            
            <Navbar 
                currentUser={currentUser} 
                toggleAdmin={() => setIsAdminOpen(!isAdminOpen)} 
                isAdminOpen={isAdminOpen}
            />

            <main>
                <HeroSection />

                {/* Tracking Section floats between Hero and Metrics */}
                <TrackingSection
                    db={db}
                    isReady={isFirebaseReady}
                    loading={loading}
                    handleSearch={handleSearch}
                    trackingId={trackingId}
                    setTrackingId={setTrackingId}
                    result={result}
                    searchError={searchError}
                    isAdminOpen={isAdminOpen}
                    currentUser={currentUser}
                    handleAdminAction={handleAdminAction}
                />

                <div className="mt-20">
                    <TrustMetrics />
                </div>

                <ServicesSection />
                <FleetSection />
                <TestimonialsSection />
                <ContactUs />
            </main>

            <Footer currentUser={currentUser} />

            {/* Global Styles for Animations */}
            <style jsx>{`
                html { scroll-behavior: smooth; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default App;


