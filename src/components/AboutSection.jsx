import React from 'react';
import { CheckCircle2, ShieldCheck, HeartPulse, UserCheck, Activity } from 'lucide-react';

export default function AboutSection({ aboutSection, onOpenAppointment }) {
  return (
    <section id="about" className="py-16 md:py-24 bg-white px-4 sm:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-[#008B9B] text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-cyan-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Excellence in Physical Healing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540]">
            {aboutSection.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {aboutSection.subtitle}
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & Checkmarks */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {aboutSection.description}
            </p>

            {/* Bullet Checkmarks Grid */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {aboutSection.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenAppointment()}
                className="btn-primary-glow text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md flex items-center gap-2"
              >
                <HeartPulse className="w-4 h-4 text-emerald-300" />
                <span>Book Clinical Consultation</span>
              </button>
            </div>
          </div>

          {/* Right Image Feature Card featuring Real Entrance Photo with object-top */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group bg-slate-950">
              <img
                src="/assets/clinic_entrance.jpg"
                alt="CARE PHYSIOTHERAPY CLINIC Entrance"
                className="w-full h-96 sm:h-[460px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded uppercase">
                    Main Entrance & Reception
                  </span>
                  <h3 className="text-lg font-bold">CARE PHYSIOTHERAPY CLINIC</h3>
                  <p className="text-xs text-cyan-200">Nikol, Ahmedabad - Modern glass suite with sanitized treatment chambers.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pillar Cards at Bottom */}
        <div className="grid sm:grid-cols-3 gap-6 pt-6">
          <div className="bg-gradient-to-br from-[#F0F9FF] to-white p-6 rounded-2xl border border-cyan-100 shadow-sm text-center sm:text-left space-y-3">
            <div className="w-12 h-12 bg-[#008B9B]/10 rounded-xl flex items-center justify-center text-[#008B9B] mx-auto sm:mx-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0A2540]">Dr. Rajan V. Patel</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Highly qualified physiotherapist with over 14 years of clinical experience in non-surgical spine care.</p>
          </div>

          <div className="bg-gradient-to-br from-[#F0F9FF] to-white p-6 rounded-2xl border border-cyan-100 shadow-sm text-center sm:text-left space-y-3">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mx-auto sm:mx-0">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0A2540]">Patient-Centered Care</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Customized treatment plans designed specifically for your pain and mobility goals.</p>
          </div>

          <div className="bg-gradient-to-br from-[#F0F9FF] to-white p-6 rounded-2xl border border-cyan-100 shadow-sm text-center sm:text-left space-y-3">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600 mx-auto sm:mx-0">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0A2540]">Modern Equipment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Advanced combination laser, ultrasound, dry needling, and spinal decompression units.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
