import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = ({ navigateTo, darkMode }) => {
    return (
        // REVISI: Border-t-4 border-primary (Tebal Merah)
        <footer className={`pt-20 pb-10 border-t-4 border-primary ${darkMode ? 'bg-slate-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1">
                    {/* REVISI LOGO FOOTER */}
                    <h3 className={`text-2xl font-black mb-6 tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        <span className="text-primary">LOGISTIK</span> KITA
                    </h3>
                    <p className="mb-6 text-sm">Platform logistik digital yang menghubungkan pengirim, pemilik armada, dan driver dalam satu ekosistem.</p>
                    <div className="flex gap-3">{[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => <a key={i} href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition ${darkMode ? 'bg-white/5 hover:bg-primary hover:text-white' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}><Icon className="w-5 h-5" /></a>)}</div>
                </div>
                <div><h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Layanan</h4><ul className="space-y-3 text-sm">{['Cek Tarif', 'Lacak Resi', 'Sewa Armada', 'Pindahan'].map((item, i) => <li key={i}><button onClick={()=>navigateTo('maintenance')} className="hover:text-primary">{item}</button></li>)}</ul></div>
                <div><h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Perusahaan</h4><ul className="space-y-3 text-sm">{['Tentang Kami', 'Karir', 'Blog', 'Hubungi Kami'].map((item, i) => <li key={i}><button onClick={()=>navigateTo('maintenance')} className="hover:text-primary">{item}</button></li>)}</ul></div>
                <div><h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Kontak</h4><p className="text-sm mb-4">Jl. Mojopahit No. 45, Mojokerto</p><p className="text-sm">+62 812-3456-7890</p></div>
            </div>
            <div className={`pt-8 border-t text-center text-xs flex flex-col md:flex-row justify-between items-center ${darkMode ? 'border-white/5' : 'border-gray-100'}`}><p>&copy; 2025 Logistik Kita. All rights reserved.</p><p className="flex items-center gap-1 mt-2 md:mt-0">Made with <Heart className="w-3 h-3 text-primary fill-primary" /> in Mojokerto</p></div>
        </footer>
    );
};
export default Footer;


