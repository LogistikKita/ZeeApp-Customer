import React, { useState } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        quote: "Logistik Kita mengubah cara kami mengirimkan barang. Pengiriman selalu tepat waktu, dan pelacakan real-time sangat membantu. Layanan pelanggan 5 bintang!",
        name: "Bambang Wijaya",
        company: "CEO, PT Makmur Sejahtera",
        rating: 5,
        avatar: "https://placehold.co/100x100/3c4d5c/ffffff?text=BW"
    },
    {
        id: 2,
        quote: "Sejak beralih ke Logistik Kita, masalah keterlambatan logistik kami berkurang drastis. Armada mereka modern dan timnya sangat profesional. Sangat direkomendasikan!",
        name: "Rina Sutiono",
        company: "Supply Chain Manager, CV Indo Jaya",
        rating: 5,
        avatar: "https://placehold.co/100x100/5c3c4d/ffffff?text=RS"
    },
    {
        id: 3,
        quote: "Butuh pengiriman mendadak dan Logistik Kita mampu menangani dengan sangat baik, bahkan di luar jam kerja. Mereka adalah mitra logistik yang andal.",
        name: "Ahmad Rizki",
        company: "Manajer Operasional, Global Furnitur",
        rating: 4,
        avatar: "https://placehold.co/100x100/4d5c3c/ffffff?text=AR"
    },
    {
        id: 4,
        quote: "Biaya yang transparan dan proses yang cepat. Tidak perlu lagi pusing memikirkan pengurusan dokumen dan rute pengiriman. Solusi logistik terbaik di Jawa Timur.",
        name: "Dewi Lestari",
        company: "Pemilik Bisnis E-Commerce",
        rating: 5,
        avatar: "https://placehold.co/100x100/3c5c5c/ffffff?text=DL"
    },
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex + 1) % testimonials.length
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex - 1 + testimonials.length) % testimonials.length
        );
    };

    const currentTestimonial = testimonials[currentIndex];

    // Helper untuk menampilkan bintang rating
    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, i) => (
            <Star 
                key={i} 
                className={`w-5 h-5 fill-yellow-400 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
            />
        ));
    };

    return (
        <section id="testimoni" className="py-20 bg-white dark:bg-zinc-900">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-extrabold mb-4 text-[var(--color-dark)] dark:text-white reveal-item">
                    Apa Kata Klien Kami?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto reveal-item">
                    Kepercayaan Anda adalah prioritas kami. Simak pengalaman mereka yang telah memilih Logistik Kita.
                </p>

                {/* Testimonial Slider Container */}
                <div className="relative max-w-3xl mx-auto reveal-item">
                    <div className="bg-gray-50 dark:bg-zinc-950 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 transition-all duration-500 transform hover:shadow-2xl">
                        
                        {/* Quote Icon */}
                        <Quote className="w-12 h-12 mx-auto text-[var(--color-primary)] opacity-70 mb-4" />
                        
                        {/* Rating */}
                        <div className="flex justify-center mb-4">
                            {renderStars(currentTestimonial.rating)}
                        </div>

                        {/* Quote Text */}
                        <p className="text-xl italic text-[var(--color-dark)] dark:text-gray-300 mb-8">
                            "{currentTestimonial.quote}"
                        </p>
                        
                        {/* Client Info */}
                        <div className="flex items-center justify-center gap-4">
                            <img 
                                src={currentTestimonial.avatar} 
                                alt={currentTestimonial.name} 
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/6b7280/ffffff?text=User" }}
                                className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-primary)]"
                            />
                            <div>
                                <p className="font-bold text-lg text-[var(--color-dark)] dark:text-white">{currentTestimonial.name}</p>
                                <p className="text-sm text-[var(--color-primary)] font-medium">{currentTestimonial.company}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button 
                        onClick={prevTestimonial}
                        className="absolute top-1/2 -left-4 transform -translate-y-1/2 p-3 bg-white dark:bg-zinc-800 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors z-10 hidden sm:block"
                        aria-label="Previous testimonial"
                    >
                        <ArrowLeft className="w-5 h-5 text-[var(--color-dark)] dark:text-white" />
                    </button>
                    
                    <button 
                        onClick={nextTestimonial}
                        className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-3 bg-white dark:bg-zinc-800 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors z-10 hidden sm:block"
                        aria-label="Next testimonial"
                    >
                        <ArrowRight className="w-5 h-5 text-[var(--color-dark)] dark:text-white" />
                    </button>

                    {/* Mobile Navigation Dots */}
                    <div className="flex justify-center space-x-2 mt-8 sm:hidden">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentIndex ? 'bg-[var(--color-primary)] w-8' : 'bg-gray-300 dark:bg-zinc-700'
                                }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;

