import React, { useState } from 'react';
import { Search, ArrowRight, XCircle, CheckCircle, Truck, Box, Package, MapPin, Clock, Database } from 'lucide-react';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp, collection } from 'firebase/firestore';

const formatTimestamp = (ts) => {
    if (!ts) return '-';
    const date = ts?.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB';
};

const getStatusInfo = (status) => {
    switch (status) {
        case 'DELIVERED': return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10', label: 'Telah Diterima' };
        case 'IN_TRANSIT': return { icon: Truck, color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Dalam Perjalanan' };
        default: return { icon: Box, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Menunggu Pengiriman' };
    }
};

// --- Sub-Komponen: Admin Panel ---
const AdminPanel = ({ db, appId, userId, onSuccess }) => {
    const [tab, setTab] = useState('create');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ id: '', sender: '', recipient: '', origin: '', destination: '', status: 'IN_TRANSIT', location: '', notes: '' });
    const [msg, setMsg] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!db) return;
        setLoading(true);
        try {
            const col = collection(db, 'artifacts', appId, 'public', 'data', 'packages');
            if (tab === 'create') {
                await setDoc(doc(col, form.id), {
                    ...form, status: 'PENDING', createdBy: userId, createdAt: serverTimestamp(),
                    trackingHistory: [{ location: `Dibuat oleh ${form.sender}`, notes: 'Menunggu pickup', timestamp: new Date().toISOString() }]
                });
                onSuccess(form.id);
            } else {
                const ref = doc(col, form.id);
                const snap = await getDoc(ref);
                if (!snap.exists()) throw new Error("Resi tidak ada");
                await updateDoc(ref, {
                    status: form.status,
                    trackingHistory: arrayUnion({ location: form.location, notes: form.notes, timestamp: new Date().toISOString() })
                });
                onSuccess(form.id);
            }
            setMsg({ type: 'success', text: 'Berhasil!' });
        } catch (err) { setMsg({ type: 'error', text: err.message }); }
        setLoading(false);
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl mb-8 animate-fade-in relative z-30">
            <div className="flex justify-between mb-4">
                <h3 className="text-white font-bold flex gap-2"><Database className="text-green-500"/> Admin Panel</h3>
                <div className="flex gap-2">
                    <button onClick={() => setTab('create')} className={`text-xs px-3 py-1 rounded ${tab==='create'?'bg-green-600':'bg-zinc-800'}`}>Create</button>
                    <button onClick={() => setTab('update')} className={`text-xs px-3 py-1 rounded ${tab==='update'?'bg-yellow-600':'bg-zinc-800'}`}>Update</button>
                </div>
            </div>
            {msg && <div className={`text-xs p-2 mb-2 rounded ${msg.type==='success'?'bg-green-900 text-green-200':'bg-red-900 text-red-200'}`}>{msg.text}</div>}
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
                <input className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white" placeholder="No Resi (Wajib)" value={form.id} onChange={e=>setForm({...form, id: e.target.value.toUpperCase()})} required />
                {tab === 'create' ? (
                    <>
                        <input className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white" placeholder="Pengirim" onChange={e=>setForm({...form, sender: e.target.value})} required />
                        <input className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white" placeholder="Penerima" onChange={e=>setForm({...form, recipient: e.target.value})} required />
                    </>
                ) : (
                    <>
                        <select className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white" onChange={e=>setForm({...form, status: e.target.value})}>
                            <option value="IN_TRANSIT">In Transit</option>
                            <option value="DELIVERED">Delivered</option>
                        </select>
                        <input className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white" placeholder="Lokasi" onChange={e=>setForm({...form, location: e.target.value})} />
                    </>
                )}
                <button disabled={loading} className="col-span-2 bg-green-600 py-2 rounded font-bold text-white hover:bg-green-500">{loading ? '...' : 'Proses'}</button>
            </form>
        </div>
    );
};

const TrackingSection = ({ db, appId, userId, isReady, loading, handleSearch, trackingId, setTrackingId, result, searchError, isAdminOpen, onAdminSuccess }) => {
    return (
        <div id="tracking" className="max-w-4xl mx-auto px-4 -mt-24 relative z-20">
            <div className="bg-zinc-950 rounded-3xl shadow-2xl p-8 border border-white/10">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Lacak Kiriman</h2>
                    <p className="text-gray-400">Pantau paket Anda secara real-time.</p>
                </div>
                
                <div className="flex gap-3 mb-6">
                    <input 
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Contoh: MOJO001"
                        className="flex-1 bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                    />
                    <button onClick={() => handleSearch()} disabled={loading} className="bg-green-600 px-6 py-3 rounded-xl font-bold text-white hover:bg-green-500">
                        {loading ? '...' : <Search />}
                    </button>
                </div>

                {isAdminOpen && isReady && <AdminPanel db={db} appId={appId} userId={userId} onSuccess={onAdminSuccess} />}

                {searchError && <div className="text-red-400 text-center bg-red-900/20 p-4 rounded-xl border border-red-500/20">{searchError}</div>}

                {result && (
                    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden animate-fade-in">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                            <div><p className="text-xs text-gray-500">RESI</p><h2 className="text-2xl font-mono text-white font-bold">{result.id}</h2></div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusInfo(result.status).bg} ${getStatusInfo(result.status).color}`}>{getStatusInfo(result.status).label}</div>
                        </div>
                        <div className="p-6">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-green-500"/> Riwayat</h4>
                            <div className="border-l-2 border-zinc-800 ml-2 space-y-6 pl-6 relative">
                                {[...(result.trackingHistory||[])].sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp)).map((h,i)=>(
                                    <div key={i} className="relative">
                                        <span className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 ${i===0?'bg-green-500 border-green-900':'bg-zinc-800 border-zinc-600'}`}></span>
                                        <div className="flex justify-between"><span className={`font-bold ${i===0?'text-green-400':'text-gray-300'}`}>{h.location}</span><span className="text-xs text-gray-600">{formatTimestamp(h.timestamp)}</span></div>
                                        <p className="text-sm text-gray-500">{h.notes}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default TrackingSection;


