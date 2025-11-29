import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const ScrollNav = ({ darkMode }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Tampilkan tombol jika scroll lebih dari 300px
            setShow(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    if (!show) return null;

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 animate-fade-in">
            {/* Tombol Naik */}
            <button 
                onClick={scrollToTop}
                className={`p-3 rounded-full shadow-lg transition transform hover:scale-110 ${darkMode ? 'bg-primary text-white hover:bg-red-600' : 'bg-primary text-white hover:bg-red-600'}`}
            >
                <ArrowUp className="w-5 h-5" />
            </button>
            
            {/* Tombol Turun */}
            <button 
                onClick={scrollToBottom}
                className={`p-3 rounded-full shadow-lg transition transform hover:scale-110 ${darkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-white text-slate-800 hover:bg-gray-100'}`}
            >
                <ArrowDown className="w-5 h-5" />
            </button>
        </div>
    );
};

export default ScrollNav;
