import React from 'react';
import { Phone, MessageSquare, GraduationCap, UserCheck, CheckCircle2, Award } from 'lucide-react';
import { getClinicPhone, openWhatsAppChat } from '../utils/contact';

export default function DoctorsStaff({ doctors, clinicInfo, onOpenAppointment }) {
  const fallbackPhone = getClinicPhone();
  const doctorList = doctors && doctors.length > 0 ? doctors : [
    {
      name: "Dr. Rajan V. Patel",
      designation: "Chief Physiotherapist & Spine Specialist",
      qualification: "MPT (Orthopedics), BPT, Certified Manual Therapist",
      experience: "14+ Years Experience",
      photo: "/assets/lead_doctor.jpg",
      bio: "Specializes in complex spinal disc rehab, posture correction, sciatica relief, and dry needling pain therapy.",
      expertise: ["Spine Decompression", "Dry Needling", "Sciatica Care", "Postural Alignment"]
    }
  ];

  const isSingleDoctor = doctorList.length === 1;
  const leadDoctor = doctorList[0];

  return (
    <section id="doctors" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-cyan-50/30 px-4 sm:px-8 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-emerald-200 shadow-xs">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Chief Clinical Specialist</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540]">
            Meet Our <span className="text-[#008B9B]">Chief Physiotherapist</span>
          </h2>
          <div className="w-16 h-1 bg-[#008B9B] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Highly qualified physiotherapist dedicated to non-surgical spine care, posture restoration, and physical rehabilitation.
          </p>
        </div>

        {/* SINGLE DOCTOR HORIZONTAL SPLIT CARD (Left Side Image + Right Side Info) */}
        {isSingleDoctor ? (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden grid md:grid-cols-12 items-stretch transition-all duration-300 hover:shadow-xl">
            
            {/* LEFT SIDE: Doctor Image */}
            <div className="md:col-span-5 relative bg-slate-100 min-h-[220px] md:min-h-[260px] max-h-[300px] overflow-hidden group">
              <img
                src={leadDoctor.photo}
                alt={leadDoctor.name}
                className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent md:hidden" />
              
              <span className="absolute top-3 left-3 bg-[#0A2540] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <Award className="w-3 h-3 text-emerald-400" />
                Chief Specialist
              </span>
              <span className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md border border-white/20">
                {leadDoctor.experience}
              </span>
            </div>

            {/* RIGHT SIDE: Doctor Details */}
            <div className="md:col-span-7 p-4 sm:p-5 md:p-6 flex flex-col justify-center space-y-3">
              
              <div className="space-y-2.5">
                
                {/* Doctor Name & Designation */}
                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A2540] tracking-tight">{leadDoctor.name}</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">
                      Verified Specialist
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#008B9B]">{leadDoctor.designation}</p>
                </div>

                {/* Qualification Badge */}
                <div className="inline-flex items-center gap-2 bg-cyan-50/80 px-2.5 py-1.5 rounded-lg border border-cyan-100 text-xs text-slate-800 font-semibold">
                  <GraduationCap className="w-4 h-4 text-[#008B9B] flex-shrink-0" />
                  <span>{leadDoctor.qualification}</span>
                </div>

                {/* Bio Summary */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {leadDoctor.bio}
                </p>

                {/* Clinical Focus List */}
                {leadDoctor.expertise && leadDoctor.expertise.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Clinical Specializations:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {leadDoctor.expertise.map((exp, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium bg-slate-50 p-1.5 px-2 rounded-lg border border-slate-200/70 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{exp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        ) : (
          /* MULTI DOCTOR GRID (triggers automatically when future doctors are added in siteConfig.json) */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctorList.map((doc) => (
              <div
                key={doc.id || doc.name}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-72 overflow-hidden bg-slate-100">
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className="w-full h-full object-cover object-[center_28%] transition-transform duration-500 group-hover:scale-105"
                    />
                    {doc.isLead && (
                      <span className="absolute top-3 left-3 bg-[#0A2540] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        Chief Specialist
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                      {doc.experience}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#0A2540] tracking-tight">{doc.name}</h3>
                      <p className="text-xs font-bold text-[#008B9B] mt-0.5">{doc.designation}</p>
                    </div>

                    <div className="flex items-start gap-2 bg-cyan-50/60 p-2.5 rounded-lg border border-cyan-100 text-xs text-slate-700">
                      <GraduationCap className="w-4 h-4 text-[#008B9B] flex-shrink-0 mt-0.5" />
                      <span className="font-semibold">{doc.qualification}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {doc.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2">
                  <a
                    href={`tel:${(doc.phone || fallbackPhone).replace(/\s+/g, '')}`}
                    className="flex-1 bg-[#0A2540] hover:bg-[#008B9B] text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Call Doctor</span>
                  </a>

                  <button
                    onClick={() => openWhatsAppChat(`Hello ${doc.name}, I want to consult.`)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
