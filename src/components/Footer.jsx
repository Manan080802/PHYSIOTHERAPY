import React from 'react';
import { Phone, Clock, MapPin, ShieldAlert, ExternalLink, Map } from 'lucide-react';
import { getClinicPhone, getClinicPhone2, getClinicAddress, getClinicName, getClinicMapsEmbedUrl, getClinicMapsUrl, openWhatsAppChat } from '../utils/contact';
import WhatsAppIcon from './WhatsAppIcon';

export default function Footer({ clinicInfo, setActiveTab }) {
  const phone1 = getClinicPhone();
  const phone2 = getClinicPhone2();
  const address = getClinicAddress();
  const clinicName = getClinicName();
  const mapsUrl = getClinicMapsUrl();
  const mapsEmbedUrl = getClinicMapsEmbedUrl();

  const handleNavClick = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#0A2540] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Care Physiotherapy Logo"
                className="w-12 h-12 object-contain bg-white rounded-xl p-1 shadow-sm"
              />
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  CARE <span className="text-[#008B9B]">PHYSIOTHERAPY</span>
                </span>
                <p className="text-xs text-slate-400">CLINIC & SPINE CENTER</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated to non-surgical physical healing, spine decompression, joint mobilization, and sports injury recovery with compassionate care in Nikol, Ahmedabad.
            </p>
          </div>

          {/* Clinic Timings */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-400 pl-2">
              Clinic Operating Hours
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Monday - Saturday</span>
                  <span className="text-slate-400">{clinicInfo?.timings?.weekdays || "8:00 AM - 8:00 PM (Mon - Sat)"}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Sunday Clinic</span>
                  <span className="text-slate-400">{clinicInfo?.timings?.sunday || "9:00 AM - 1:00 PM (Prior Appointment)"}</span>
                </div>
              </li>
              <li className="flex items-start gap-2 text-emerald-300 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800/60">
                <ShieldAlert className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{clinicInfo?.timings?.emergencyStatus || "Available for Home Visit & Emergency Care"}</span>
              </li>
            </ul>
          </div>

          {/* Contact Numbers */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#008B9B] pl-2">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${phone1.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors bg-slate-800/80 p-3 rounded-xl border border-slate-700"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">Primary: {phone1}</span>
              </a>

              {phone2 && (
                <a
                  href={`tel:${phone2.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold">Secondary: {phone2}</span>
                </a>
              )}

              <button
                onClick={() => openWhatsAppChat()}
                className="w-full flex items-center gap-2 text-white hover:text-emerald-300 transition-colors bg-emerald-950/60 p-3 rounded-xl border border-emerald-800 text-left"
              >
                <WhatsAppIcon className="w-4 h-4 fill-emerald-400" />
                <span className="font-bold">WhatsApp Chat</span>
              </button>
            </div>
          </div>

          {/* Clinic Address & Live Interactive Google Map Iframe */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-cyan-400 pl-2">
              Clinic Location
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2 text-slate-300 leading-relaxed">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </p>

              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white font-bold bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 mt-1 transition-colors"
                >
                  <span>Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Live Google Maps Embedded Section */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Map className="w-4 h-4 text-[#008B9B]" />
            <span>Interactive Clinic Location Map</span>
          </div>

          <div className="w-full h-72 rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-slate-900">
            <iframe
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Care Multispecialist Physiotherapy Clinic Location Map"
            />
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400">
          <button onClick={() => handleNavClick('home')} className="hover:text-white">Home</button>
          <span>•</span>
          <button onClick={() => handleNavClick('about')} className="hover:text-white">About Us</button>
          <span>•</span>
          <button onClick={() => handleNavClick('services')} className="hover:text-white">Services</button>
          <span>•</span>
          <button onClick={() => handleNavClick('doctors')} className="hover:text-white">Doctors</button>
          <span>•</span>
          <button onClick={() => handleNavClick('gallery')} className="hover:text-white">Gallery</button>
          <span>•</span>
          <button onClick={() => handleNavClick('reviews')} className="hover:text-white">Testimonials</button>
          <span>•</span>
          <button onClick={() => handleNavClick('blogs')} className="hover:text-white">Blog</button>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {clinicName}. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
