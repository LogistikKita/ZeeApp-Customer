import React from 'react';
import { Clock, Truck, MapPin, CheckCircle, Package } from 'lucide-react';

// Fungsi bantuan untuk memformat timestamp
const formatTimestamp = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return 'Tanggal Tidak Valid';
    
    return date.toLocaleDateString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric', 
        hour: '2-digit', minute: '2-digit'
    }) + ' WIB';
};

// Fungsi bantuan untuk menentukan warna & ikon status
const getStatusInfo = (status) => {
    switch (status) {
        case 'DELIVERED':
            return { icon: CheckCircle, color: 'text-green-600', label: 'Telah Diterima' };
        case 'IN_TRANSIT':
            return { icon: Truck, color: 'text-yellow-500', label: 'Dalam Perjalanan' };
        case 'PENDING':
            return { icon: Package, color: 'text-blue-500', label: 'Menunggu Pengiriman' };
        default:
            return { icon: Package, color: 'text-gray-500', label: 'Status Tidak Diketahui' };
    }
};

const TrackingSection = ({ result }) => {
    if (!result) return null;

    const { icon: StatusIcon, color: statusColor, label: statusLabel } = getStatusInfo(result.status);
    
    return (
        <div className="mt-6 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-left">
            
            {/* Status Header */}
            <div className="flex items-center space-x-3 pb-3 mb-4 border-b dark:border-zinc-700">
                <StatusIcon className={`w-6 h-6 ${statusColor} flex-shrink-0`} />
                <div>
                    <p className="font-bold text-xl text-[var(--color-dark)] dark:text-white leading-tight">
                        Status: {statusLabel}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Resi: <span className="font-mono font-semibold text-[var(--color-primary)]">{result.id}</span>
                    </p>
                </div>
            </div>

            {/* Detail Pengiriman Singkat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-700 dark:text-gray-400 mb-6">
                <p><span className="font-semibold text-gray-800 dark:text-gray-300">Pengirim:</span> {result.sender}</p>
                <p><span className="font-semibold text-gray-800 dark:text-gray-300">Penerima:</span> {result.recipient}</p>
                <p><span className="font-semibold text-gray-800 dark:text-gray-300">Asal Gudang:</span> {result.origin}</p>
                <p><span className="font-semibold text-gray-800 dark:text-gray-300">Tujuan Akhir:</span> {result.destination}</p>
            </div>

            {/* Riwayat Perjalanan (Timeline Sederhana) */}
            <div>
                <p className="font-bold text-lg text-gray-800 dark:text-gray-300 mb-3">Riwayat Perjalanan ({result.trackingHistory.length} langkah):</p>
                <ul className="space-y-4">
                    {/* Urutan: Terbaru di atas (sudah di sorting di App.jsx) */}
                    {result.trackingHistory.map((history, index) => {
                        const isLatest = index === 0;
                        const timelineStyle = isLatest 
                            ? 'border-[var(--color-primary)] text-[var(--color-primary)]' 
                            : 'border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-400';

                        return (
                            <li key={index} className="flex items-start relative">
                                {/* Timeline Dot */}
                                <div className={`w-4 h-4 rounded-full border-2 ${timelineStyle} bg-white dark:bg-zinc-900 z-10 flex-shrink-0 mt-1.5`}></div>
                                {/* Timeline Line (Kecuali untuk item terakhir) */}
                                {index < result.trackingHistory.length - 1 && (
                                    <div className="absolute left-2 top-6 bottom-[-20px] w-0.5 bg-gray-300 dark:bg-zinc-700 z-0"></div>
                                )}
                                
                                <div className="ml-4 pb-4">
                                    <p className={`font-semibold text-sm ${isLatest ? 'text-[var(--color-primary)]' : 'text-gray-800 dark:text-gray-300'}`}>
                                        <MapPin className="inline w-4 h-4 mr-1" /> {history.location}
                                    </p>
                                    <span className="text-xs font-normal block text-gray-500 dark:text-gray-500">
                                        <Clock className="inline w-3 h-3 mr-1" /> {formatTimestamp(history.timestamp)}
                                    </span>
                                    <span className="block text-xs italic text-gray-600 dark:text-gray-500 mt-1">
                                        Catatan: {history.notes}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default TrackingSection;

