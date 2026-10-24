import React, { useState, useEffect } from 'react';
import {
  Star,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import GoogleIcon from './GoogleIcon';
import { getClinicMapsUrl, getClinicGoogleReviewsUrl, openGoogleReviewPage, getClinicName } from '../utils/contact';

// Google user avatar color palette
const AVATAR_COLORS = [
  'bg-[#0F9D58]', // Google Green
  'bg-[#4285F4]', // Google Blue
  'bg-[#EA4335]', // Google Red
  'bg-[#FBBC05]', // Google Yellow
  'bg-[#8E24AA]', // Purple
  'bg-[#00897B]', // Teal
  'bg-[#D81B60]', // Pink
  'bg-[#3949AB]'  // Indigo
];

function GoogleWordmark() {
  return (
    <span className="font-semibold text-sm sm:text-base tracking-tight inline-flex items-center">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

export default function ReviewsSection({ reviews = [] }) {
  const featurableId = import.meta.env.VITE_FEATURABLE_ID || "66a18c72-ec6a-4b97-a302-23df74d02c25";
  const [liveData, setLiveData] = useState(null);
  const [liveReviews, setLiveReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [visibleCount, setVisibleCount] = useState(16);

  const clinicName = getClinicName();
  const googleMapsUrl = getClinicMapsUrl();
  const writeReviewUrl = getClinicGoogleReviewsUrl();

  // Fetch direct live reviews from Featurable v2 API
  useEffect(() => {
    let isMounted = true;
    const fetchLiveFeaturable = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://featurable.com/api/v2/widgets/${featurableId}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json?.success && json?.widget) {
            setLiveData(json.widget);
            if (Array.isArray(json.widget.reviews) && json.widget.reviews.length > 0) {
              setLiveReviews(json.widget.reviews);
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch featurable live API directly', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchLiveFeaturable();
    return () => {
      isMounted = false;
    };
  }, [featurableId]);

  // Format reviewer name as "Firstname L." like Featurable
  const formatAuthorName = (fullName = '') => {
    if (!fullName) return 'Google User';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0];
    const firstName = parts[0];
    const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
    return `${firstName} ${lastInitial}.`;
  };

  // Avatar color generator based on name hash
  const getAvatarColor = (name = '') => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
  };

  // Accurate relative date formatter from publishedAt
  const formatReviewDate = (dateInput) => {
    if (!dateInput) return 'Recently';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Recently';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  };

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Determine active count and score
  const totalCount = liveData?.gbpLocationSummary?.reviewsCount || (liveReviews.length > 0 ? liveReviews.length : 70);
  const ratingScore = liveData?.gbpLocationSummary?.rating || 5.0;

  // Reviews to render
  const reviewsToDisplay = liveReviews.slice(0, visibleCount);

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white px-4 sm:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-amber-200 shadow-2xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Verified Patient Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2540] tracking-tight">
            Real Patient <span className="text-[#008B9B]">Recovery Stories</span>
          </h2>
          <div className="w-16 h-1 bg-[#008B9B] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Read authentic feedback from patients who recovered mobility and eliminated chronic pain.
          </p>
        </div>

        {/* Master Featurable Style Top Banner */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left Side: Excellent + Stars + Google Rating */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <div>
              <span className="text-lg sm:text-xl font-bold text-slate-900 block leading-tight">
                Excellent
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex items-center gap-0.5 text-[#FBBC04]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
                  ))}
                </div>
                <span className="text-sm font-extrabold text-slate-900">
                  {ratingScore.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="h-9 w-px bg-slate-200 hidden sm:block" />

            <div>
              <div className="flex items-center gap-1 text-slate-700">
                <GoogleWordmark />
                <span className="font-semibold text-xs sm:text-sm text-slate-800">Rating</span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-[#1a73e8] hover:underline block mt-0.5"
              >
                Based on <span className="font-bold text-slate-700">{totalCount} reviews</span>
              </a>
            </div>
          </div>

          {/* Right Side: Write a review Button */}
          <button
            onClick={openGoogleReviewPage}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <span>Write a review</span>
          </button>
        </div>

        {/* Manual Responsive Masonry Grid of Live Google Reviews */}
        {isLoading && liveReviews.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading Google reviews...
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {reviewsToDisplay.map((rev) => {
              const authorRawName = rev.author?.name || 'Google Patient';
              const displayName = formatAuthorName(authorRawName);
              const avatar = rev.author?.avatarUrl || rev.author?.photoUrl;
              const isExpanded = !!expandedReviews[rev.id];
              const text = rev.text || '';
              const shouldTruncate = text.length > 170;
              const displayText = shouldTruncate && !isExpanded ? text.slice(0, 170) + '...' : text;

              return (
                <div
                  key={rev.id}
                  className="break-inside-avoid bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3 relative group"
                >
                  {/* Top: Profile Avatar, Display Name, Relative Date */}
                  <div className="flex items-center gap-3">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={displayName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-100 flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full ${getAvatarColor(
                          authorRawName
                        )} text-white font-bold text-sm flex items-center justify-center flex-shrink-0`}
                      >
                        {authorRawName.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm leading-tight truncate">
                        {displayName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formatReviewDate(rev.publishedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Review Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {displayText}
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpand(rev.id)}
                        className="text-[#1a73e8] font-bold ml-1 hover:underline text-xs inline-block"
                      >
                        {isExpanded ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </p>

                  {/* Bottom: 5 Gold Stars & Official Google G icon */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-[#FBBC04]">
                      {[...Array(rev.rating?.value || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]" />
                      ))}
                    </div>

                    <div className="flex-shrink-0">
                      <GoogleIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button if more reviews exist */}
        {visibleCount < liveReviews.length && (
          <div className="text-center pt-2">
            <button
              onClick={() => setVisibleCount((prev) => prev + 16)}
              className="inline-flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              <span>Load More Reviews ({liveReviews.length - visibleCount} remaining)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom: Powered by Featurable Branding (As Requested) */}
        <div className="text-center pt-4 border-t border-slate-100">
          <a
            href="https://featurable.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors inline-flex items-center gap-1 font-medium"
          >
            <span>Powered by</span>
            <span className="font-bold text-slate-500">Featurable</span>
          </a>
        </div>

      </div>
    </section>
  );
}
