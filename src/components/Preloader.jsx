import React from 'react';
const Preloader = ({ loading }) => {
    if (!loading) return null;
    return <div className="fixed inset-0 z-[60] bg-slate-900 flex flex-col items-center justify-center transition-opacity"><div className="w-12 h-12 border-4 border-slate-800 border-t-green-500 rounded-full animate-spin"></div></div>;
};
export default Preloader;


