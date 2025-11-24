import React from 'react';
import Carousel from './Carousel';
import { Quote } from 'lucide-react';

// Data Dummy Testimoni
const testimonialsData = [
  { 
    name: "Budi Santoso", 
    company: "PT Maju Jaya Konstruksi", 
    review: "Pengiriman material konstruksi selalu tepat waktu, bahkan untuk lokasi proyek terpencil. Armada Logistik Kita selalu dalam kondisi prima.", 
    rating: 5 
  },
  { 
    name: "Siti Rahayu", 
    company: "Toko Elektronik Cepat", 
    review: "Layanan LTL-nya sangat membantu bisnis kecil seperti kami. Biaya efisien dan barang elektronik kami ditangani dengan sangat hati-hati.", 
    rating: 5 
  },
  { 
    name: "Wayan Kertiyasa", 
    company: "Ekspor Hasil Bumi Bali", 
    review: "Proses *customs clearance* sangat cepat dan tanpa masalah. Kami bisa fokus pada kualitas produk ekspor tanpa khawatir logistik.", 
    rating: 4 
  },
  { 
    name: "Ahmad Rizky", 
    company: "Distributor Farmasi", 
    review: "Sangat profesional dalam menangani barang sensitif suhu. Tim driver sangat komunikatif dan bertanggung jawab.", 
    rating: 5 
  },
  // Tambahkan data testimoni lainnya di sini
];

// Sub-komponen Bintang (Rating)
const StarRating = ({ count }) => {
  return (
    <div className="flex text-yellow-500 mb-3">
      {Array.from({ length: 5 }, (_, index) => (
        <svg 
          key={index}
          className={`w-5 h-5 fill-current ${index < count ? 'opacity-100' : 'opacity-30'}`}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.487 7.71l6.56-.955L10 1l2.953 5.755 6.56.955-4.758 4.635 1.123 6.545z"/>
        </svg>
      ))}
    </div>
  );
};

// Sub-komponen Kartu Testimoni
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-8 shadow-xl border-t-4 border-[var(--color-primary)] h-full flex flex-col justify-start reveal-item">
        
        {/* Icon Quote */}
        <Quote className="w-8 h-8 text-[var(--color-primary)] mb-4 opacity-50"/>

        {/* Review */}
        <p className="text-lg italic text-gray-700 dark:text-gray-200 mb-6 flex-grow">
            "{testimonial.review}"
        </p>

        {/* Rating */}
        <StarRating count={testimonial.rating} />
        
        {/* Author Info */}
        <div className="border-t border-gray-100 dark:border-zinc-700 pt-4">
            <p className="text-xl font-bold text-[var(--color-dark)]">{testimonial.name}</p>
            <p className="text-sm text-[var(--color-primary)] font-medium">{testimonial.company}</p>
        </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimoni" className="py-20 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 reveal-item">
          <span className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
            Kepercayaan Pelanggan
          </span>
          <h2 className="text-4xl font-extrabold text-[var(--color-dark)] mt-2">
            Apa Kata Klien Kami
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Kami bangga telah menjadi mitra logistik terpercaya bagi berbagai perusahaan di Indonesia.
          </p>
        </div>

        {/* Implementasi Carousel */}
        <div className="mt-10">
          {/* Kita gunakan 3 slide per tampilan untuk Testimoni */}
          <Carousel slidesPerView={3} gap="gap-8" autoPlay={true} interval={6000}>
            {testimonialsData.map((t, index) => (
              <TestimonialCard key={index} testimonial={t} />
            ))}
          </Carousel>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
