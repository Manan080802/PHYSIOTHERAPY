import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, User, ArrowRight, X, Search } from 'lucide-react';

export default function BlogSection({ blogs }) {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Prevent main page background scroll when blog modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBlog]);

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="blogs" className="py-16 md:py-24 bg-slate-50 px-4 sm:px-8 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-[#008B9B] text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-cyan-100">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Health & Spine Care Articles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540]">
            Physiotherapy Insights
          </h2>
          <div className="w-16 h-1 bg-[#008B9B] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">
            Expert guidance on home ergonomics, posture correction exercises, and pain prevention by Dr. Rajan V. Patel.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search 10 health blogs by topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008B9B] shadow-sm"
          />
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedBlog(blog)}
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#0A2540] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                    {blog.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-[#008B9B]">
                      <User className="w-3.5 h-3.5" />
                      {blog.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0A2540] group-hover:text-[#008B9B] transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">{blog.date}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBlog(blog);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#008B9B] hover:text-[#0A2540] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </article>
          ))}
        </div>

        {/* Article Full View Modal */}
        {selectedBlog && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
            onClick={() => setSelectedBlog(null)}
          >
            <div
              className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl relative border border-slate-200 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Top Bar */}
              <div className="shrink-0 p-4 sm:p-5 bg-[#0A2540] text-white flex items-center justify-between border-b border-slate-700 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {selectedBlog.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Close Article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Article Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 overscroll-contain">
                
                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] leading-tight">
                    {selectedBlog.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 border-b border-slate-200 pb-4">
                    <span className="flex items-center gap-1 font-bold text-[#008B9B]">
                      <User className="w-4 h-4" /> {selectedBlog.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-slate-400" /> {selectedBlog.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-slate-400" /> {selectedBlog.readTime}
                    </span>
                  </div>
                </div>

                {/* Banner Thumbnail */}
                <div className="rounded-2xl overflow-hidden max-h-72 bg-slate-100 shadow-inner">
                  <img
                    src={selectedBlog.thumbnail}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Content Text */}
                <div className="text-slate-700 text-sm leading-relaxed space-y-4 font-normal">
                  {selectedBlog.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-lg font-extrabold text-[#0A2540] mt-6 mb-2 pt-2 border-t border-slate-100">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('#### ')) {
                      return (
                        <h4 key={index} className="text-base font-bold text-[#008B9B] mt-4 mb-1">
                          {paragraph.replace('#### ', '')}
                        </h4>
                      );
                    }
                    return (
                      <p key={index} className="whitespace-pre-line text-slate-600 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Closing Consultation Note */}
                <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100 text-xs text-slate-700 space-y-1">
                  <strong className="text-[#008B9B] block font-bold">Have Questions About This Condition?</strong>
                  <p>Consult directly with Dr. Rajan V. Patel at CARE PHYSIOTHERAPY CLINIC for personalized physical rehabilitation assessment.</p>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
