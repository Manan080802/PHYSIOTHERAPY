import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import DoctorsStaff from './components/DoctorsStaff';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import BlogSection from './components/BlogSection';
import AppointmentModal from './components/AppointmentModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

// Managed in siteConfig.json & .env
import siteConfig from './data/siteConfig.json';
import { getClinicName } from './utils/contact';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  // Dynamic SEO Title
  useEffect(() => {
    document.title = `${getClinicName()} - Spine & Physical Rehabilitation Center`;
  }, []);

  const handleOpenAppointment = () => {
    setAppointmentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 antialiased selection:bg-[#008B9B] selection:text-white">
      
      {/* Top Navigation Header */}
      <Header
        clinicInfo={siteConfig.clinicInfo}
        onOpenAppointment={() => handleOpenAppointment()}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Website Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          clinicInfo={siteConfig.clinicInfo}
          doctors={siteConfig.doctors}
          onOpenAppointment={() => handleOpenAppointment()}
        />

        {/* About Section */}
        <AboutSection
          aboutSection={siteConfig.aboutSection}
          onOpenAppointment={() => handleOpenAppointment()}
        />

        {/* Services & Specializations */}
        <ServicesSection
          services={siteConfig.services}
          onOpenAppointment={() => handleOpenAppointment()}
        />

        {/* Chief Physiotherapist - Dr. Rajan V. Patel */}
        <DoctorsStaff
          doctors={siteConfig.doctors}
          clinicInfo={siteConfig.clinicInfo}
          onOpenAppointment={() => handleOpenAppointment()}
        />

        {/* Clinic Photo Gallery */}
        <GallerySection
          gallery={siteConfig.gallery}
        />

        {/* 15 Verified Patient Reviews */}
        <ReviewsSection
          reviews={siteConfig.reviews}
        />

        {/* Health & Wellness Blog */}
        <BlogSection
          blogs={siteConfig.blogs}
        />

      </main>

      {/* Clinic Footer */}
      <Footer
        clinicInfo={siteConfig.clinicInfo}
        setActiveTab={setActiveTab}
      />

      {/* Sticky Call & WhatsApp Action Buttons */}
      <FloatingWhatsApp />

      {/* Consultation Booking Modal */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        onBookAppointment={(booking) => {
          console.log('Appointment Request:', booking);
        }}
      />

    </div>
  );
}
