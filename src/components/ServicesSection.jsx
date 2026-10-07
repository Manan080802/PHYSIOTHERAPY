import React from 'react';
import { Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServicesSection({ services, onOpenAppointment }) {
  return (
    <section id="services" className="py-16 md:py-24 bg-white px-4 sm:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-[#008B9B] text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-cyan-100">
            <Activity className="w-3.5 h-3.5" />
            <span>Clinical Treatments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540]">
            Our Rehabilitation & <span className="text-[#008B9B]">Physiotherapy Services</span>
          </h2>
          <div className="w-16 h-1 bg-[#008B9B] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">
            Comprehensive evidence-based physiotherapy services tailored to your specific physical needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded shadow">
                    Non-Surgical Care
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-extrabold text-[#0A2540] group-hover:text-[#008B9B] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.shortDesc}
                  </p>

                  <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {srv.details}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Protocol
                </span>

                <button
                  onClick={() => onOpenAppointment(srv.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008B9B] hover:text-[#0A2540] transition-colors"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
