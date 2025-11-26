import React from 'react';
import { CheckCircle } from 'lucide-react';

const FleetSection = () => (
    <div id="fleet" className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-4">Armada Modern</h2>
                <p className="text-gray-400 mb-6">Armada lengkap dengan GPS Tracker dan perawatan rutin.</p>
                <ul className="space-y-2">
                    {['Blind Van', 'CDD Long', 'Wingbox'].map((item, i) =>(
                        <li key={i} className="flex items-center text-gray-300"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> {item}</li>
                    ))}
                </ul>
            </div>
            <div className="md:w-1/2 bg-zinc-900 h-64 rounded-3xl border border-zinc-800 flex items-center justify-center text-gray-600">
                [Fleet Image]
            </div>
        </div>
    </div>
);
export default FleetSection;


