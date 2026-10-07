import React, { useState } from 'react';
import { Star, CheckCircle, ShieldCheck, Filter } from 'lucide-react';

export default function ReviewsSection({ reviews }) {
  const [ratingFilter, setRatingFilter] = useState(0);

  const filteredReviews = ratingFilter === 0
    ? reviews
    : reviews.filter(r => r.rating === ratingFilter);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white px-4 sm:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-amber-200">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Verified Patient Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540]">
            Real Patient <span className="text-[#008B9B]">Recovery Stories</span>
          </h2>
          <div className="w-16 h-1 bg-[#008B9B] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">
            Read authentic feedback from patients who recovered mobility and eliminated chronic pain.
          </p>
        </div>

        {/* Rating Overview Banner Card */}
        <div className="bg-[#F0F9FF] rounded-2xl p-6 sm:p-8 border border-cyan-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#0A2540]">{avgRating}</span>
              <div className="flex items-center justify-center gap-1 text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-1">Out of 5 Stars</p>
            </div>

            <div className="h-12 w-px bg-cyan-200 hidden sm:block" />

            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base font-extrabold text-[#0A2540]">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>{reviews.length} Verified Patient Reviews</span>
              </div>
              <p className="text-xs text-slate-600">Authentic patient feedback monitored and verified by clinical administration.</p>
            </div>
          </div>

          {/* Rating Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-500 font-bold flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#008B9B]" /> Rating:
            </span>
            {[0, 5, 4].map((r) => (
              <button
                key={r}
                onClick={() => setRatingFilter(r)}
                className={`px-3 py-1.5 rounded-full font-bold transition-all ${
                  ratingFilter === r
                    ? 'bg-[#0A2540] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {r === 0 ? 'All Reviews' : `${r} Star ⭐`}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-[#008B9B] transition-all duration-300 hover:shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-[#0A2540] text-base">{rev.patientName}</h3>
                    <span className="text-xs text-[#008B9B] font-bold block mt-0.5">{rev.treatment}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex-shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-amber-900">{rev.rating}.0</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified Patient
                </span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
