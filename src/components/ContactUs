import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactUs = () => {
    return (
        <section id="contact-us" className="py-16 sm:py-24 bg-white dark:bg-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Side: Form */}
                    <div className="reveal-item">
                        <h2 className="text-3xl font-extrabold text-[var(--color-dark)] dark:text-white mb-3">
                            Hubungi Kami
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            Kami siap membantu! Isi formulir di bawah ini untuk konsultasi pengiriman atau pertanyaan lainnya.
                        </p>
                        
                        <form className="space-y-4 bg-gray-50 dark:bg-zinc-950 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name"
                                    placeholder="Masukkan nama Anda" 
                                    className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] dark:bg-zinc-800 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    placeholder="Masukkan email aktif Anda" 
                                    className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] dark:bg-zinc-800 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pesan</label>
                                <textarea 
                                    id="message" 
                                    name="message"
                                    rows="4" 
                                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                                    className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] dark:bg-zinc-800 dark:text-white"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-3 text-base bg-[var(--color-primary)] text-gray-900 font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-all duration-300 shadow-md"
                            >
                                <Send className="w-5 h-5 mr-2" />
                                Kirim Pesan
                            </button>
                        </form>
                    </div>

                    {/* Right Side: Contact Details */}
                    <div className="lg:pl-12 reveal-item" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-2xl font-bold text-[var(--color-dark)] dark:text-white mb-6">
                            Kantor Pusat Kami
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <MapPin className="w-6 h-6 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                                <div className="ml-4">
                                    <h4 className="font-semibold text-[var(--color-dark)] dark:text-white">Alamat</h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Jl. Raya Bypass Mojokerto No. 45, Mojokerto, Jawa Timur 61361.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Phone className="w-6 h-6 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                                <div className="ml-4">
                                    <h4 className="font-semibold text-[var(--color-dark)] dark:text-white">Telepon/WhatsApp</h4>
                                    <p className="text-gray-600 dark:text-gray-400">(0321) 1234 5678</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Mail className="w-6 h-6 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                                <div className="ml-4">
                                    <h4 className="font-semibold text-[var(--color-dark)] dark:text-white">Email</h4>
                                    <p className="text-gray-600 dark:text-gray-400">cs@logistik-kita.id</p>
                                </div>
                            </div>
                        </div>

                        {/* Peta Placeholder */}
                        <div className="mt-8 overflow-hidden rounded-xl shadow-xl border border-gray-100 dark:border-zinc-800">
                            <img 
                                src="https://placehold.co/600x300/e0e0e0/34D399?text=Peta+Lokasi+Kantor+Pusat" 
                                alt="Peta lokasi kantor pusat Logistik Kita"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;

