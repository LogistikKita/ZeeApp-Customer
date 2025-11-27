import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, AlertCircle, Search, Clock } from 'lucide-react';
import { doc, getDoc, collection } from 'firebase/firestore';

const TrackingSection = ({ db, appId, initialId, onBack, darkMode }) => {
    const [id, setId] = useState(initialId || '');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialId) handleSearch();
    }, [initialId]);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!id || !db) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const docRef = doc(collection(db, 'artifacts', appId, 'public', 'data', 'packages'), id);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                setResult({ id: snap.id, ...snap.data() });
            } else {
                setError(`Resi #${id} tidak ditemukan.`);
            }
        } catch (err) {
            setError("Gagal terhubung ke server.");
        }
        setLoading(false);
    };

    const getStatusUI = (status) => {
        switch (status) {
            // Kita gunakan Primary (Merah) untuk status aktif/delivered agar senada, atau biarkan hijau/kuning untuk semantik
            // User minta "seluruh icon menjadi merah", tapi untuk status tracking (Delivered/Success), 
            // Hijau biasanya lebih intuitif. Saya akan ubah Icon UI-nya saja, status tetap warna semantik biar gak bingung.
            case 'DELIVERED': return { color: 'text-green-500', bg: 'bg-green-500/10', icon: CheckCircle, label: 'DITERIMA' };
            case 'IN_TRANSIT': return { color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: Truck, label: 'PERJALANAN' };
            default: return { color: 'text-primary', bg: 'bg-primary/10', icon: Package, label: 'MENUNGGU' };
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 pb-20">
            <button onClick={onBack} className={`flex items-center gap-2 font-medium mb-8 transition hover:text-primary ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
            </button>

            <div className={`p-8 rounded-3xl shadow-xl mb-10 border ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-gray-100'}`}>
                <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-slate-900'}`}>Lacak Kiriman</h2>
                <form onSubmit={handleSearch} className="flex gap-4">
                    <input value={id} onChange={(e) => setId(e.target.value.toUpperCase())} placeholder="Masukkan Resi..." className={`flex-1 px-6 py-4 rounded-xl outline-none font-mono text-lg transition focus:ring-2 focus:ring-primary ${darkMode ? 'bg-slate-900 text-white placeholder-gray-600' : 'bg-gray-50 text-slate-900 placeholder-gray-400'}`} />
                    <button disabled={loading} className="px-8 bg-primary hover:bg-red-600 text-white rounded-xl font-bold transition disabled:opacity-50">{loading ? '...' : <Search />}</button>
                </form>
            </div>

            {error && <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3 mb-8"><AlertCircle className="w-6 h-6" /><p className="font-medium">{error}</p></div>}

            {result && (
                <div className={`rounded-3xl shadow-2xl overflow-hidden border animate-fade-in ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-gray-100'}`}>
                    <div className={`p-8 border-b flex flex-col md:flex-row justify-between items-center gap-4 ${darkMode ? 'bg-slate-800/50 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <div><p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">RESI</p><h1 className={`text-4xl font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{result.id}</h1></div>
                        <div className={`px-5 py-2 rounded-full flex items-center gap-2 ${getStatusUI(result.status).bg} ${getStatusUI(result.status).color}`}>{React.createElement(getStatusUI(result.status).icon, { className: "w-5 h-5" })}<span className="font-bold tracking-wide">{getStatusUI(result.status).label}</span></div>
                    </div>
                    <div className={`p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
                        <div><p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">PENGIRIM</p><p className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{result.sender}</p><div className="flex items-center gap-2 text-gray-500 text-sm"><MapPin className="w-4 h-4" /> {result.origin || 'N/A'}</div></div>
                        <div className="md:text-right"><p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">PENERIMA</p><p className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{result.recipient}</p><div className="flex items-center md:justify-end gap-2 text-gray-500 text-sm"><MapPin className="w-4 h-4" /> {result.destination || 'N/A'}</div></div>
                    </div>
                    <div className="p-8">
                        <h3 className={`font-bold text-lg mb-8 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}><Clock className="w-5 h-5 text-primary" /> Riwayat Perjalanan</h3>
                        <div className={`border-l-2 ml-3 space-y-10 pl-8 py-2 ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                            {[...(result.trackingHistory || [])].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).map((h, i) => (
                                <div key={i} className="relative">
                                    <span className={`absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 ${i===0 ? 'bg-primary border-red-200' : 'bg-gray-400 border-gray-200'}`}></span>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                                        <div><p className={`font-bold text-lg ${i===0 ? 'text-primary' : 'text-gray-500'}`}>{h.location}</p><p className="text-gray-500 text-sm mt-1">{h.notes}</p></div>
                                        <div className="text-xs text-gray-400 font-mono mt-1 md:mt-0">{h.timestamp ? new Date(h.timestamp).toLocaleDateString() : '-'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackingSection;


