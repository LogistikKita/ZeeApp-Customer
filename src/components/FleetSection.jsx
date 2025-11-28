import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Scale, Box, Info } from 'lucide-react';

const FleetSection = ({ darkMode }) => {
    const [fleets, setFleets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFleets = async () => {
            try {
                const db = getFirestore();
                const q = query(collection(db, "public_fleets"), orderBy("order", "asc"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFleets(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching fleets:", error);
                setLoading(false);
            }
        };

        fetchFleets();
    }, []);

    if (loading) return null; // Atau tampilkan skeleton loading kecil

    return (
        <div className="py-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 mb-10 flex justify-between items-end">
                <div>
                    <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Pilihan Armada</h2>
                    <p className="opacity-60">Unit terawat dengan spesifikasi lengkap.</p>
                </div>
            </div>

            {/* SCROLL CONTAINER */}
            <div className="flex gap-6 overflow-x-auto pb-10 px-4 md:px-0 snap-x no-scrollbar md:pl-[calc((100vw-1280px)/2)] pl-4">
                {fleets.map((fleet) => (
                    <div key={fleet.id} className={`flex-shrink-0 snap-center w-80 rounded-3xl overflow-hidden relative group transition duration-300 border ${darkMode ? 'bg-slate-800 border-white/5' : 'bg-white border-gray-100 shadow-xl'}`}>
                        
                        {/* IMAGE HEADER */}
                        <div className="h-48 overflow-hidden relative">
                            <img src={fleet.imageUrl} alt={fleet.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                                {fleet.type}
                            </div>
                        </div>

                        {/* CONTENT BODY */}
                        <div className="p-6">
                            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{fleet.name}</h3>
                            
                            {/* SPECS GRID */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className={`p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                                    <div className="flex items-center gap-2 mb-1 opacity-60">
                                        <Scale className="w-3 h-3" /> <span className="text-[10px] font-bold uppercase">Kapasitas</span>
                                    </div>
                                    <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>{fleet.capacity}</p>
                                </div>
                                <div className={`p-3 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                                    <div className="flex items-center gap-2 mb-1 opacity-60">
                                        <Box className="w-3 h-3" /> <span className="text-[10px] font-bold uppercase">Volume</span>
                                    </div>
                                    <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>{fleet.volume}</p>
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <p className="text-xs opacity-60 line-clamp-2 mb-4 h-8">{fleet.description}</p>

                            <button className="w-full py-3 rounded-xl border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-primary/20">
                                Detail & Dimensi <Info className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FleetSection;
