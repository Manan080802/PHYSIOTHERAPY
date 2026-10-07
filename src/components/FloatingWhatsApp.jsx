import React from 'react';
import { PhoneCall } from 'lucide-react';
import { getClinicPhone, openWhatsAppChat } from '../utils/contact';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  const cleanPhone = getClinicPhone().replace(/\s+/g, '');

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      {/* Call Floating Action */}
      <a
        href={`tel:${cleanPhone}`}
        className="bg-[#0A2540] hover:bg-[#008B9B] text-white p-3.5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white/20"
        title="Call Us Instantly"
      >
        <PhoneCall className="w-5 h-5 text-emerald-400" />
      </a>

      {/* WhatsApp Floating Action */}
      <button
        onClick={() => openWhatsAppChat("Hello, I would like to inquire about physiotherapy consultation.")}
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 fill-white" />
      </button>
    </div>
  );
}
