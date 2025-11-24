import React from 'react';

const Preloader = () => {
  return (
    <div 
      className="fixed inset-0 bg-white dark:bg-zinc-900 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700"
      id="preloader-container"
    >
      <div className="flex flex-col items-center">
        {/* Logo (Pastikan path-nya sudah benar /Logistik-Kita.png di folder public) */}
        <img 
          src="/Logistik-Kita.png" 
          alt="Logistik Kita Loading" 
          className="w-20 h-20 md:w-28 md:h-28 animate-pulse mb-4" 
        />
        
        <h1 className="text-xl md:text-3xl font-bold tracking-widest text-[var(--color-dark)] dark:text-white transition-colors">
          LOGISTIK KITA
        </h1>

        {/* Loading Spinner - Taildwind default spinner */}
        <div className="mt-8">
            <svg 
                className="animate-spin h-8 w-8 text-[var(--color-primary)]" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
            >
                <circle 
                    className="opacity-25" 
                    cx="12" cy="12" r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                ></circle>
                <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
