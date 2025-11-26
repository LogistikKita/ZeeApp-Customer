import React from 'react';

const Footer = ({ currentUser }) => (
    <footer className="bg-black py-8 text-center text-gray-600 text-sm border-t border-white/10">
        <p>&copy; 2025 Logistik Kita. Mojokerto.</p>
        {currentUser && <p className="mt-2 text-[10px]">Admin ID: {currentUser}</p>}
    </footer>
);
export default Footer;


