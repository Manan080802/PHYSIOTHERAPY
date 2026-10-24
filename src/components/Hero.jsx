import React from 'react';
import { Phone, Calendar, Award, Star, ShieldCheck } from 'lucide-react';
import { getClinicPhone, openWhatsAppChat } from '../utils/contact';
import WhatsAppIcon from './WhatsAppIcon';

export default function Hero({ clinicInfo, doctors, onOpenAppointment }) {
  const leadDoctor = doctors[0] || {
    name: "Dr. Rajan V. Patel",
    designation: "Chief Physiotherapist & Spine Specialist",
    qualification: "MPT (Orthopedics), BPT, Certified Manual Therapist",
    experience: "14+ Years Experience",
    photo: "/assets/lead_doctor.jpg",
    bio: "Specializes in complex spinal disc rehab, posture correction, sciatica relief, and dry needling pain therapy."
  };
  
  const phone1 = getClinicPhone();

  return (
    <section id="home" className="relative hero-gradient pt-10 pb-16 lg:pt-16 lg:pb-24 px-4 sm:px-8 border-b border-cyan-100/60 overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-cyan-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Text Column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-emerald-800 text-xs sm:text-sm font-bold shadow-xs">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Top-Rated Spine & Physiotherapy Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] tracking-tight leading-tight">
            Your Journey to <span className="text-[#008B9B]">Pain-Free Mobility</span> Starts Here
          </h1>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
            Experience expert care by <strong className="text-slate-800">Dr. Rajan V. Patel</strong> with personalized treatment plans designed to restore your movement, strengthen core muscles, and eliminate chronic pain.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => onOpenAppointment()}
              className="w-full sm:w-auto btn-primary-glow text-white font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5 text-emerald-300" />
              <span>Book Appointment</span>
            </button>

            <button
              onClick={() => openWhatsAppChat("Hello Dr. Rajan Patel, I would like to book a physiotherapy consultation.")}
              className="w-full sm:w-auto btn-green-glow text-white font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white" />
              <span>WhatsApp Us</span>
            </button>

            <a
              href={`tel:${phone1.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0A2540] font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#008B9B]" />
              <span>Call: {phone1}</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-2xl mx-auto lg:mx-0">
            {clinicInfo.stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-cyan-100 shadow-xs text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-[#008B9B] block">{stat.value}</span>
                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Doctor Feature Card - Dr. Rajan V. Patel */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#008B9B]/20 to-emerald-400/20 blur-xl pointer-events-none" />

            <div className="relative bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xl space-y-4">
              
              {/* Doctor Image Container with Framed Position */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-100 shadow-inner group bg-slate-100">
                <img
                  src={leadDoctor.photo}
                  alt={leadDoctor.name}
                  className="w-full h-80 sm:h-[420px] object-cover object-[center_28%] transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>5.0 (70+ Google Reviews)</span>
                </div>

                <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide shadow-md">
                  Chief Physiotherapist
                </div>

                {/* Overlay details */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/80 to-transparent p-4 text-white">
                  <h3 className="text-xl font-bold">{leadDoctor.name}</h3>
                  <p className="text-xs text-cyan-300 font-semibold">{leadDoctor.designation}</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">{leadDoctor.qualification}</p>
                </div>
              </div>

              {/* Doctor Bio Highlight Box */}
              <div className="bg-cyan-50/70 p-3.5 rounded-xl border border-cyan-100 text-xs text-slate-700 space-y-2">
                <p className="italic leading-relaxed">
                  "{leadDoctor.bio}"
                </p>
                <div className="flex items-center justify-between font-bold pt-1">
                  <span className="text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {leadDoctor.experience}
                  </span>
                  <button
                    onClick={() => onOpenAppointment()}
                    className="text-[#008B9B] hover:text-[#0A2540] underline font-extrabold"
                  >
                    Consult Doctor →
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
