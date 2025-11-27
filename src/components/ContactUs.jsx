import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactUs = ({ db, appId, darkMode }) => {
    const [form, setForm] = useState({ name: '', phone: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!db) return;
        setStatus('sending');
        try {
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), { ...form, createdAt: serverTimestamp() });
            setStatus('success'); setForm({ name: '', phone: '', message: '' });
        } catch (error) { setStatus('error'); }
    };

    return (
        <div className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row ${darkMode ? 'bg-slate-800 border border-white/5' : 'bg-white'}`}>
                    <div className="p-12 md:w-2/5 bg-green-600 text-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Hubungi Kami</h2>
                            <p className="opacity-90 mb-12 text-lg">Siap membantu kebutuhan logistik Anda 24/7.</p>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4"><MapPin className="w-5 h-5"/><p>Jl. Mojopahit No. 45, Mojokerto</p></div>
                                <div className="flex items-center gap-4"><Phone className="w-5 h-5"/><p>+62 812-3456-7890</p></div>
                                <div className="flex items-center gap-4"><Mail className="w-5 h-5"/><p>cs@logistikkita.id</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="p-12 md:w-3/5">
                        <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Kirim Pesan / RFQ</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input className={`w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-green-500 transition ${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'}`} placeholder="Nama Lengkap" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                            <input className={`w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-green-500 transition ${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'}`} placeholder="No. WhatsApp" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                            <textarea className={`w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-green-500 transition h-32 ${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'}`} placeholder="Pesan / Permintaan" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required></textarea>
                            <button disabled={status === 'sending'} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2">{status === 'sending' ? 'Mengirim...' : (status === 'success' ? 'Terkirim!' : <>Kirim Pesan <Send className="w-4 h-4" /></>)}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ContactUs;


