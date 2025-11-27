import React from 'react';

const FleetSection = ({ darkMode }) => {
    return (
        <div className="py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-10">
                {/* REVISI JUDUL: ARMADA KITA */}
                <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Armada Kita</h2>
                <p className="opacity-60">Unit terawat siap jalan ke seluruh pelosok.</p>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-10 px-4 md:px-0 snap-x no-scrollbar">
                {[1, 2, 3, 4, 5].map((i) => (
                    // REVISI: Aspect Ratio jadi 3/4 (Portrait)
                    <div key={i} className="flex-shrink-0 snap-center w-64 md:w-80 aspect-[3/4] rounded-3xl overflow-hidden relative group shadow-lg border border-gray-200 dark:border-white/5">
                        <img src={`https://source.unsplash.com/random/600x800?truck&sig=${i}`} alt={`Armada ${i}`} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6"><p className="text-white font-bold">Unit {i} - Ready</p></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default FleetSection;


