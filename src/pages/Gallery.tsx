import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { ImageIcon, Maximize2, Sparkles, Filter } from 'lucide-react';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All', 
    'Others', 
    'Birthday', 
    'Certificate Distribution', 
    "Teacher's & Children's Day", 
    'Career Counselling', 
    'Picnic', 
    'Foundation Day'
  ];

  const allImages = [
    { url: "https://images.unsplash.com/photo-1523050337456-5d55f21af557?q=80&w=1470", category: "Foundation Day", title: "Foundation Day 2024" },
    { url: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1470", category: "Others", title: "Main Lab Session" },
    { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470", category: "Career Counselling", title: "Career Seminar" },
    { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470", category: "Certificate Distribution", title: "Merit Awards" },
    { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470", category: "Teacher's & Children's Day", title: "Teacher's Day Celebration" },
    { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1470", category: "Birthday", title: "Campus Birthday" },
    { url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1470", category: "Picnic", title: "Annual Picnic" },
    { url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1470", category: "Others", title: "IT Workshop" },
    { url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470", category: "Certificate Distribution", title: "Placement Ceremony" },
    { url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1470", category: "Career Counselling", title: "Industrial Talk" },
    { url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1470", category: "Foundation Day", title: "Cultural Event" },
    { url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1470", category: "Others", title: "Practical Lab" },
  ];

  const filteredImages = activeCategory === 'All' 
    ? allImages 
    : allImages.filter(img => img.category === activeCategory);

  return (
    <div className="pb-32 min-h-screen bg-slate-50/50">
      <PageHeader 
        title="Institutional Gallery"
        subtitle="Memories at OICA"
        breadcrumb="Gallery"
        backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070"
        bottomPills={["Campus Life", "Events", "Success Moments"]}
      />

      <div className="container-max px-4 pt-24">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat 
                  ? 'bg-primary text-white border-primary shadow-xl shadow-primary/30 scale-105' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-primary hover:text-primary shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div
                layout
                key={img.url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative h-[280px] rounded-[2rem] overflow-hidden cursor-pointer bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay - Premium Design */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                   <motion.div 
                     initial={{ y: 20, opacity: 0 }}
                     whileInView={{ y: 0, opacity: 1 }}
                     className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                   >
                      <div className="flex items-center gap-2 mb-3">
                         <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest text-white border border-white/20">
                            {img.category}
                         </span>
                      </div>
                      <h3 className="text-xl font-black text-white leading-tight">{img.title}</h3>
                      <div className="mt-6 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                            <ImageIcon size={14} className="text-primary" /> Gallery Asset
                         </div>
                         <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20 hover:bg-primary hover:border-primary transition-all">
                            <Maximize2 size={18} />
                         </div>
                      </div>
                   </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
             <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                <ImageIcon size={32} />
             </div>
             <h3 className="text-2xl font-black text-slate-400">No images found in this category</h3>
             <p className="text-slate-400 mt-2 font-medium">Please check back later for updates from this segment.</p>
          </div>
        )}

        {/* Suggestive Section */}
        <div className="mt-32 text-center">
           <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-3xl shadow-sm mb-8">
              <Sparkles size={20} className="text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Capture the moments</span>
           </div>
           <h2 className="text-4xl font-black text-slate-900 mb-6">Our Campus Life in Frames</h2>
           <p className="max-w-xl mx-auto text-slate-500 font-medium mb-12">Witness the vibrant ecosystem of learning, celebration, and professional growth that defines OICA culture every single day.</p>
           <div className="flex flex-wrap justify-center gap-4">
              <button className="h-14 px-10 rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest shadow-2xl hover:bg-slate-800 transition-all active:scale-95">
                 Follow on Instagram
              </button>
              <button className="h-14 px-10 rounded-2xl bg-white text-slate-900 border border-slate-200 font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all active:scale-95">
                 <Filter size={16} className="mr-2 inline-block" /> Load More
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
