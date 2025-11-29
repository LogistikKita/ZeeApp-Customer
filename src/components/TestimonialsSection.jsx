import React, { useEffect, useState } from 'react';
import { Star, Quote, ChevronRight } from 'lucide-react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const TestimonialsSection = ({ darkMode }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const db = getFirestore();
            const snap = await getDocs(collection(db, "public_testimonials"));
            setReviews(snap.docs.map(d => d.data()));
        };
        fetchReviews();
    }, []);

    if (reviews.length === 0) return null;

    return (
        <div className={`py-16 md:py-24 ${darkMode ? 'bg-slate-800/50' : 'bg-green-50/50'}`}>
            <div className="max-w-7xl mx-auto px-4 text-center mb-10">
                <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Kata Mereka</h2>
                <p className="opacity-60 text-sm">Geser untuk melihat pengalaman mitra kami.</p>
            </div>
            
            {/* CAROUSEL MODE: Flex & Overflow Auto */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex overflow-x-auto gap-6 pb-8 snap-x no-scrollbar">
                    {reviews.map((r, i) => (
                        <div key={i} className={`flex-shrink-0 snap-center w-80 md:w-96 p-8 rounded-3xl relative transition hover:-translate-y-1 ${darkMode ? 'bg-slate-800 border border-white/5' : 'bg-white shadow-xl shadow-gray-100'}`}>
                            <Quote className="absolute top-8 right-8 text-green-500/20 w-10 h-10" />
                            <div className="flex gap-1 mb-6">
                                {[...Array(r.rating || 5)].map((_, s) => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                            </div>
                            <p className={`text-base italic mb-8 leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>"{r.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg text-white bg-gradient-to-br from-green-400 to-blue-500`}>
                                    {r.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{r.name}</h4>
                                    <p className="text-[10px] font-bold text-green-500 uppercase">{r.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Dummy Card "Lihat Semua" */}
                    <div className="flex-shrink-0 snap-center w-32 flex flex-col items-center justify-center">
                        <button className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg mb-2">
                            <ChevronRight />
                        </button>
                        <span className="text-xs font-bold opacity-60">Lihat Semua</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TestimonialsSection;
