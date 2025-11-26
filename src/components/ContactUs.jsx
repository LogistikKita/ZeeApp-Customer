import React from 'react';
import { Phone, Mail } from 'lucide-react';

const ContactUs = () => (
    <div className="py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Hubungi Kami</h2>
            <div className="flex justify-center gap-8 text-white">
                <div className="flex items-center gap-2"><Phone className="text-green-500"/> +62 812-3456-7890</div>
                <div className="flex items-center gap-2"><Mail className="text-green-500"/> cs@logistikkita.id</div>
            </div>
        </div>
    </div>
);
export default ContactUs;


