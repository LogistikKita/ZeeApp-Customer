import React from 'react';
import { Facebook, Instagram, Linkedin, Heart, MapPin, Phone } from 'lucide-react';

const Footer = ({ navigateTo, darkMode }) => {
    return (
        <footer className={`pt-20 pb-10 border-t-4 border-primary ${darkMode ? 'bg-slate-900 text-gray-400' : 'bg-white text-gray-600'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                
                {/* BRAND & SOCIALS */}
                <div className="col-span-1 md:col-span-1">
                    <h3 className={`text-2xl font-black mb-6 tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        <span className="text-primary">LOGISTIK</span> KITA
                    </h3>
                    <p className="mb-6 text-sm">Platform logistik digital yang menghubungkan pengirim, pemilik armada, dan driver dalam satu ekosistem.</p>
                    
                    <div className="flex gap-3">
                        {/* FACEBOOK */}
                        <a href="https://www.facebook.com/share/16TcAwbrCR/" target="_blank" rel="noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition ${darkMode ? 'bg-white/5 hover:bg-primary hover:text-white' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}>
                            <Facebook className="w-5 h-5" />
                        </a>
                        {/* INSTAGRAM */}
                        <a href="https://www.instagram.com/logistikkita.official?igsh=cm80Z25zaXp5dHg=" target="_blank" rel="noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition ${darkMode ? 'bg-white/5 hover:bg-primary hover:text-white' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}>
                            <Instagram className="w-5 h-5" />
                        </a>
                        {/* LINKEDIN */}
                        <a href="https://www.linkedin.com/in/puput-wicaksana" target="_blank" rel="noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition ${darkMode ? 'bg-white/5 hover:bg-primary hover:text-white' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}>
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* LAYANAN LINKS */}
                <div>
                    <h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Layanan</h4>
                    <ul className="space-y-3 text-sm">
                        {['Cek Tarif', 'Lacak Resi', 'Sewa Armada', 'Pindahan'].map((item, i) => (
                            <li key={i}><button onClick={()=>navigateTo('maintenance')} className="hover:text-primary">{item}</button></li>
                        ))}
                    </ul>
                </div>

                {/* PERUSAHAAN LINKS */}
                <div>
                    <h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Perusahaan</h4>
                    <ul className="space-y-3 text-sm">
                        {['Tentang Kami', 'Karir', 'Blog', 'Hubungi Kami'].map((item, i) => (
                            <li key={i}><button onClick={()=>navigateTo('maintenance')} className="hover:text-primary">{item}</button></li>
                        ))}
                    </ul>
                </div>

                {/* KONTAK DETAIL */}
                <div>
                    <h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Kontak</h4>
                    
                    {/* Alamat dengan Link Google Maps */}
                    <a href="https://maps.app.goo.gl/RCvVkGjLDZLwqLeK6" target="_blank" rel="noreferrer" className="flex items-start gap-3 mb-4 hover:text-primary transition group">
                         <MapPin className="w-5 h-5 mt-1 flex-shrink-0 group-hover:text-primary" />
                         <span className="text-sm leading-relaxed">
                            Jl. Terusan Irian Jaya No.8, Gedangklutuk RT 004 RW 009, Banjaragung, Puri, Kab Mojokerto, Jawa Timur, Indonesia
                         </span>
                    </a>

                    {/* WhatsApp */}
                    <a href="https://wa.me/6285813487753" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition group">
                        <Phone className="w-5 h-5 flex-shrink-0 group-hover:text-primary" />
                        <span className="text-sm font-bold">+62 858-1348-7753</span>
                    </a>
                </div>
            </div>
            
            {/* COPYRIGHT */}
            <div className={`pt-8 border-t text-center text-xs flex flex-col md:flex-row justify-between items-center ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
                <p>&copy; 2025 Logistik Kita. All rights reserved.</p>
                <p className="flex items-center gap-1 mt-2 md:mt-0">Made with <Heart className="w-3 h-3 text-primary fill-primary" /> in Mojokerto</p>
            </div>
        </footer>
    );
};
export default Footer;
