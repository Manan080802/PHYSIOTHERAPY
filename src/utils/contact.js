import siteConfig from '../data/siteConfig.json';

export const getClinicName = () => {
  return import.meta.env.VITE_CLINIC_NAME || siteConfig.clinicInfo?.name || "CARE PHYSIOTHERAPY CLINIC";
};

export const getClinicTagline = () => {
  return import.meta.env.VITE_CLINIC_TAGLINE || siteConfig.clinicInfo?.tagline || "Advanced Spine Care & Physical Rehabilitation Center";
};

export const getClinicPhone = () => {
  return import.meta.env.VITE_CLINIC_PHONE1 || siteConfig.clinicInfo?.phone1 || "+91 94260 78923";
};

export const getClinicPhone2 = () => {
  return import.meta.env.VITE_CLINIC_PHONE2 || siteConfig.clinicInfo?.phone2 || "+91 63522 83860";
};

export const getClinicWhatsApp = () => {
  const raw = import.meta.env.VITE_CLINIC_WHATSAPP || siteConfig.clinicInfo?.whatsapp || "+916355228386";
  return raw.replace(/[^0-9]/g, '');
};

export const getClinicAddress = () => {
  return import.meta.env.VITE_CLINIC_ADDRESS || siteConfig.clinicInfo?.address || "Second floor, Nikol - Naroda Rd, New India Colony, Nikol, Ahmedabad, Gujarat 380049";
};

export const getClinicMapsUrl = () => {
  return import.meta.env.VITE_CLINIC_GOOGLE_MAPS_URL || siteConfig.clinicInfo?.googleMapsUrl || "https://maps.app.goo.gl/QBF2HgcdS5Saba9G6";
};

export const getClinicMapsEmbedUrl = () => {
  return import.meta.env.VITE_CLINIC_MAPS_EMBED_URL || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.1582736330633!2d72.66532269999999!3d23.0546583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8718e41e8741%3A0x6ff639c9d6eb0cdf!2sCare%20Multispecialist%20Physiotherapy%20Clinic%20-%20Physiotherapy%20Treatment%20-%20Physiotherapist%20in%20Nikol!5e0!3m2!1sen!2sin!4v1791386488368!5m2!1sen!2sin";
};

export const openWhatsAppChat = (customMessage = "") => {
  const cleanNumber = getClinicWhatsApp();
  const defaultMsg = `Hello ${getClinicName()}, I would like to inquire about a physiotherapy consultation.`;
  const msgText = encodeURIComponent(customMessage || defaultMsg);
  const waUrl = `https://wa.me/${cleanNumber}?text=${msgText}`;
  window.open(waUrl, '_blank');
};
