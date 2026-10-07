import React, { useState } from 'react';
import { Image as ImageIcon, Eye, X } from 'lucide-react';

export default function GallerySection({ gallery }) {
  const [lightboxItem, setLightboxItem] = useState(null);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-50 px-4 sm:px-8 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-[#008B9B] text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-cyan-100">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Clinic Infrastructure & Treatments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540]">
            Clinic Photo Gallery
          </h2>
          <div className="w-16 h-1 bg-[#008B9B] mx-auto rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => setLightboxItem(item)}
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-slate-900/70 hover:bg-[#008B9B] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    title="View Image"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-[#0A2540] line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative">
              <div className="p-4 bg-[#0A2540] text-white flex items-center justify-between">
                <h3 className="text-base font-bold truncate">{lightboxItem.title}</h3>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div className="rounded-xl overflow-hidden bg-slate-900 flex justify-center">
                  <img
                    src={lightboxItem.mediaUrl}
                    alt={lightboxItem.title}
                    className="max-h-[65vh] object-contain"
                  />
                </div>
                <p className="text-xs text-slate-600 text-center">{lightboxItem.description}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
