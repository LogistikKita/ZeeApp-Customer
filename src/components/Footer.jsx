import React from 'react';
import { Instagram, Facebook, Linkedin, MapPin, Truck } from 'lucide-react';

// Data link sosial media
const socialLinks = [
    { 
        name: 'Instagram', 
        icon: Instagram, 
        href: 'https://www.instagram.com/logistikkita.official?igsh=cm80Z25zaXp5dHg=', 
        color: 'text-pink-500' // Instagram uses pink/purple gradient, but we'll use accent for consistency or the default.
    },
    { 
        name: 'Facebook', 
        icon: Facebook, 
        href: 'https://www.facebook.com/share/17YMsPCqd5/', 
        color: 'text-blue-600'
    },
    { 
        name: 'LinkedIn', 
        icon: Linkedin, 
        href: 'https://www.linkedin.com/in/puput-wicaksana', 
        color: 'text-blue-500' 
    },
    { 
        name: 'GMaps', 
        icon: MapPin, 
        href: 'https://maps.app.goo.gl/nVoe4MeB2nCJvNrH6', 
        color: 'text-green-500' 
    },
];

// Data link navigasi (contoh)
const footerNav = [
    { title: 'Perusahaan', links: ['Tentang Kami', 'Karir', 'Media'] },
    { title: 'Layanan', links: ['Pelacakan', 'Layanan Domestik', 'Asuransi'] },
    { title: 'Bantuan', links: ['FAQ', 'Syarat & Ketentuan', 'Kebijakan Privasi'] },
];

const Footer = () => {
    return (
        <footer className="bg-[var(--color-dark)] text-gray-300 border-t border-gray-800 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Bagian Utama Footer: Logo, Deskripsi, dan Navigasi */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10 mb-6">
                    
                    {/* Kolom 1: Logo dan Deskripsi */}
                    <div className="md:col-span-1">
                        {/* Logo Logistik Kita (menggunakan ikon dan teks sebagai representasi) */}
                        <a href="#hero" className="flex items-center space-x-2 text-2xl font-bold text-[var(--color-primary)] mb-4">
                            <Truck className="h-8 w-8 text-[var(--color-primary)]" strokeWidth={3} />
                            <span>Logistik Kita</span>
                        </a>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Solusi pengiriman terpercaya, cepat, dan efisien untuk kebutuhan bisnis dan pribadi Anda.
                        </p>
                    </div>

                    {/* Kolom 2-4: Link Navigasi */}
                    {footerNav.map((section, index) => (
                        <div key={index} className="md:col-span-1">
                            <h4 className="text-lg font-semibold text-white mb-4 border-b border-[var(--color-primary)] pb-1 inline-block">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a 
                                            href={`#${link.toLowerCase().replace(/\s/g, '-')}`} 
                                            className="text-gray-400 hover:text-[var(--color-accent)] transition duration-300 text-sm"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bagian Bawah Footer: Sosial Media & Hak Cipta */}
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    
                    {/* Hak Cipta */}
                    <p className="text-sm text-gray-500 order-2 sm:order-1 mt-6 sm:mt-0">
                        &copy; {new Date().getFullYear()} Logistik Kita. All rights reserved.
                    </p>

                    {/* Link Sosial Media */}
                    <div className="flex space-x-4 order-1 sm:order-2">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-gray-700 hover:bg-[var(--color-primary)] transition duration-300 shadow-md"
                                aria-label={link.name}
                            >
                                <link.icon className={`h-5 w-5 ${link.name === 'GMaps' ? 'text-[var(--color-accent)]' : 'text-white'} hover:text-white`} />
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;

