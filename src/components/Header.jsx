import React, { useState } from 'react';
import { Phone, Clock, ShieldAlert, Calendar, Menu, X } from 'lucide-react';
import { getClinicPhone, getClinicWhatsApp, getClinicName, openWhatsAppChat } from '../utils/contact';
import WhatsAppIcon from './WhatsAppIcon';

export default function Header({ clinicInfo, onOpenAppointment, activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phone1 = getClinicPhone();
  const clinicName = getClinicName();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Testimonials' },
    { id: 'blogs', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      
      {/* Top Notification Bar */}
      <div className="bg-[#0A2540] text-white text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <ShieldAlert className="w-3.5 h-3.5" />
              {clinicInfo?.timings?.emergencyStatus || "Available for Home Visit & Urgencies"}
            </span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-300" />
              <span>{clinicInfo?.timings?.weekdays || "Mon-Sat: 8:00 AM - 8:00 PM"}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href={`tel:${phone1.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 font-bold text-white hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Us: {phone1}</span>
            </a>

            <button
              onClick={() => openWhatsAppChat()}
              className="hidden xs:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-0.5 rounded transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Navigation Header */}
      <nav className="glass-nav border-b border-slate-100 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & CARE PHYSIOTHERAPY CLINIC Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <img
              src="/assets/logo.png"
              alt="Care Physiotherapy Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-[#0A2540] tracking-tight">
                  CARE <span className="text-[#008B9B]">PHYSIOTHERAPY</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                  CLINIC
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden xs:block font-medium">
                Advanced Spine & Movement Rehabilitation
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === item.id
                    ? 'bg-cyan-50 text-[#008B9B] shadow-sm'
                    : 'text-slate-600 hover:text-[#008B9B] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onOpenAppointment()}
              className="btn-primary-glow text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 flex flex-col gap-1 pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-bold ${
                  activeTab === item.id ? 'bg-[#008B9B] text-white' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
