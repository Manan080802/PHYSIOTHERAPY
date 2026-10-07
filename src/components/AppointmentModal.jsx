import React, { useState } from 'react';
import { Calendar, Phone, User, CheckCircle2, X } from 'lucide-react';
import { getClinicWhatsApp } from '../utils/contact';
import WhatsAppIcon from './WhatsAppIcon';

export default function AppointmentModal({ isOpen, onClose, onBookAppointment }) {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const cleanWhatsApp = getClinicWhatsApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) return;

    const bookingData = {
      id: `apt-${Date.now()}`,
      patientName: patientName.trim(),
      phone: phone.trim(),
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredTime,
      notes: notes.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    onBookAppointment(bookingData);
    setSubmitted(true);

    // Format WhatsApp message with appointment details
    const waText = `Hello CARE PHYSIOTHERAPY CLINIC,%0A%0A*NEW APPOINTMENT REQUEST*%0A👤 *Patient Name:* ${encodeURIComponent(patientName.trim())}%0A📞 *Phone:* ${encodeURIComponent(phone.trim())}%0A📅 *Preferred Date:* ${encodeURIComponent(bookingData.preferredDate)}%0A⏰ *Time Slot:* ${encodeURIComponent(preferredTime)}%0A🩺 *Symptoms/Notes:* ${encodeURIComponent(notes.trim() || 'N/A')}`;

    const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${waText}`;

    // Automatically open WhatsApp with pre-filled appointment details
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="p-4 bg-[#0A2540] text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-extrabold">Book Physiotherapy Consultation</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-300 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-[#0A2540]">Appointment Request Sent!</h4>
            <p className="text-sm text-slate-600">
              WhatsApp opened with your appointment details for <span className="font-bold text-slate-900">{patientName}</span>.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#008B9B] text-white font-bold py-2.5 rounded-xl hover:bg-[#006B7D]"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Patient Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Anish Gupta"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008B9B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008B9B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008B9B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008B9B]"
                >
                  <option value="09:00 AM">09:00 AM - Morning</option>
                  <option value="11:00 AM">11:00 AM - Morning</option>
                  <option value="03:00 PM">03:00 PM - Afternoon</option>
                  <option value="05:30 PM">05:30 PM - Evening</option>
                  <option value="07:00 PM">07:00 PM - Evening</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Describe Pain / Symptoms *</label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Lower back stiffness, leg radiation, knee swelling..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#008B9B]"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-green-glow text-white font-extrabold text-sm py-3 rounded-xl shadow-md flex items-center justify-center gap-2 hover:opacity-95 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Confirm & Send on WhatsApp</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
