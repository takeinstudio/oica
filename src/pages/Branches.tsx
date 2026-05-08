import { motion } from 'framer-motion';
import { Building2, Search, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/shared/AnimatedSection';

const BRANCH_IMGS = [
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
];

const districtList = [
  "Angul", "Bargarh", "Bhadrak", "Balasore", "Balangir", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khurda", "Koraput", "Malkangiri", "Mayurbhanj", "Nuapada", "Nabarangpur", "Nayagarh", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh", "Bhubaneswar HQ"
];

const Branches = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = districtList.filter(d => 
    d.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort();

  return (
    <div className="pb-24 min-h-screen bg-slate-50/50 font-poppins">
      <PageHeader 
        title="Institutional Network"
        subtitle="Our Presence"
        breadcrumb="Branches"
        backgroundImages={[
          "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
        ]}
        bottomPills={["Statewide Network", "ISO Certified", "Local Mentorship", "Verified Hubs"]}
      />

      <div className="container-max pt-16">
        <AnimatedSection>
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-xl space-y-1">
                 <span className="text-[9px] font-bold text-primary tracking-widest uppercase block">Center Selector</span>
                 <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                    Find Your Nearest <span className="text-primary">OICA Center</span>
                 </h2>
              </div>
              
              <div className="w-full max-w-sm relative group">
                 <input 
                    type="text" 
                    placeholder="Search district..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl py-4 px-6 pl-12 text-xs focus:outline-none focus:border-primary transition-all font-bold shadow-lg shadow-primary/5"
                 />
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
              </div>
           </div>
        </AnimatedSection>

        {/* District Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* HQ Card – always first if in results */}
          {filteredDistricts.includes("Bhubaneswar HQ") && (
            <AnimatedSection delay={0} className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <Link to="/branch/Bhubaneswar HQ" className="block">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative rounded-xl overflow-hidden border border-amber-400/30 shadow-xl bg-slate-950 cursor-pointer"
                >
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop" alt="HQ" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700" />
                  <div className="relative z-10 p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/30 shrink-0">
                      <Building2 size={28} className="text-slate-900" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-wrap items-center gap-2 mb-2 justify-center md:justify-start">
                        <span className="px-3 py-1 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[8px] font-bold rounded-lg uppercase tracking-widest">Main Headquarters</span>
                        <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[8px] font-bold rounded-lg uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck size={10} /> ISO Certified</span>
                      </div>
                      <h3 className="font-bold text-2xl text-white tracking-tight mb-1">OICA Main Branch &mdash; <span className="text-amber-400">Bhubaneswar HQ</span></h3>
                      <p className="text-slate-400 text-xs font-medium">The central flagship campus and policy center of OICA Network.</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center text-slate-900 shadow-xl shrink-0 group-hover:scale-110 transition-transform">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          )}

          {filteredDistricts.filter(d => d !== "Bhubaneswar HQ").map((district, i) => (
            <AnimatedSection key={district} delay={i * 0.02}>
               <Link to={`/branch/${district}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="group h-full bg-white rounded-xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden"
                  >
                     <div className="w-full aspect-video overflow-hidden relative">
                        <img 
                           src={BRANCH_IMGS[i % BRANCH_IMGS.length]} 
                           alt={district}
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                           <ShieldCheck size={12} className="text-primary" />
                           <span className="text-[8px] font-bold tracking-widest text-slate-900 uppercase">Verified</span>
                        </div>
                     </div>
                     <div className="p-5 flex flex-col items-center text-center flex-1">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-slate-100">
                           <Building2 size={20} />
                        </div>
                        <div className="space-y-0.5">
                           <h3 className="font-bold text-lg text-slate-800 tracking-tight group-hover:text-primary transition-colors">{district}</h3>
                           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Odisha Center</p>
                        </div>
                        <div className="mt-5 pt-4 border-t border-slate-100 w-full flex items-center justify-between">
                           <div className="flex items-center gap-1.5">
                              <div className="flex">{[1,2,3,4,5].map(star => <Star key={star} size={10} className="text-amber-400 fill-amber-400" />)}</div>
                           </div>
                           <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                              <ChevronRight size={16} />
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </Link>
            </AnimatedSection>
          ))}
          
          {filteredDistricts.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white rounded-xl border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                 <Search size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">No results found</h3>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-primary font-bold uppercase tracking-widest text-[9px] hover:underline"
              >
                 Clear Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Expanded Bottom CTA Section */}
        <AnimatedSection className="mt-24">
           <div className="p-12 bg-slate-900 rounded-xl text-center relative overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-2xl mx-auto">
                 <span className="text-[9px] font-bold text-primary tracking-widest uppercase mb-3 block">Opportunity</span>
                 <h2 className="text-3xl font-bold mb-5 leading-tight text-white">
                    Can't Find a Branch? <span className="text-emerald-400">Start Your Own</span>
                 </h2>
                 <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed">
                    Join the OICA family by applying for a franchise and opening a modern branch in your district.
                 </p>
                 <div className="flex flex-wrap justify-center gap-3">
                    <Link to="/franchise">
                       <motion.button 
                         whileHover={{ scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                         className="bg-primary text-slate-900 px-8 h-12 rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20"
                       >
                          Apply for Franchise
                       </motion.button>
                    </Link>
                    <Link to="/contact">
                       <motion.button 
                         whileHover={{ scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                         className="bg-white/5 border border-white/10 text-white px-8 h-12 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-white/10"
                       >
                          Contact Manager
                       </motion.button>
                    </Link>
                 </div>
              </div>
           </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Branches;
