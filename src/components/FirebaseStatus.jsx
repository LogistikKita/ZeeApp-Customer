import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Database, User } from 'lucide-react';

const getDatabaseStatus = (db) => {
    return db ? 'Terkoneksi' : 'Terputus';
};

const FirebaseStatus = ({ firebaseConfig, isAuthReady, userId, db }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Pastikan ini hanya muncul saat ada config
    if (!firebaseConfig) return null;

    const StatusIcon = isAuthReady ? CheckCircle : Clock;
    const authStatus = isAuthReady ? 'Siap' : 'Memuat';

    const dbStatus = getDatabaseStatus(db);
    const dbIcon = db ? Database : XCircle;

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Tombol Toggle */}
            <button
                onClick={toggleVisibility}
                className="bg-[var(--color-primary)] text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
                title="Toggle Firebase Debugger"
            >
                <Database className="w-6 h-6" />
            </button>

            {/* Panel Status */}
            {isVisible && (
                <div className="mt-2 bg-zinc-900 p-4 rounded-lg shadow-2xl border border-zinc-700 w-80 text-xs text-white">
                    <h3 className="font-bold text-sm border-b pb-2 mb-2 border-zinc-700 text-[var(--color-accent)]">
                        🛠️ Firebase/DB Status
                    </h3>
                    
                    <div className="space-y-2">
                        {/* Status Auth */}
                        <div className="flex items-center space-x-2">
                            <StatusIcon className={`w-4 h-4 ${isAuthReady ? 'text-green-500' : 'text-yellow-500'}`} />
                            <span className="font-semibold">Auth Status:</span>
                            <span className={`${isAuthReady ? 'text-green-300' : 'text-yellow-300'}`}>{authStatus}</span>
                        </div>
                        
                        {/* Status DB */}
                        <div className="flex items-center space-x-2">
                            <dbIcon className={`w-4 h-4 ${db ? 'text-green-500' : 'text-red-500'}`} />
                            <span className="font-semibold">Firestore:</span>
                            <span className={`${db ? 'text-green-300' : 'text-red-300'}`}>{dbStatus}</span>
                        </div>

                        {/* User ID */}
                        {userId && (
                            <div className="text-gray-400 break-words pt-1 border-t border-zinc-700">
                                <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4 flex-shrink-0" />
                                    <span className="font-semibold text-gray-300">User ID (Current):</span>
                                </div>
                                <p className="ml-6 mt-1 font-mono text-gray-300">{userId}</p>
                            </div>
                        )}
                        
                        {/* App ID (Untuk path Firestore) */}
                        <div className="text-gray-400 break-words">
                            <div className="flex items-center space-x-2">
                                <Database className="w-4 h-4 flex-shrink-0" />
                                <span className="font-semibold text-gray-300">App ID:</span>
                            </div>
                            <p className="ml-6 mt-1 font-mono text-gray-300">{typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FirebaseStatus;

