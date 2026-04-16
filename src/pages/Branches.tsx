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
  "Angul", "Bargarh", "Bhadrak", "Balasore", "Balangir", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khurda", "Koraput", "Malkangiri", "Mayurbhanj", "Nuapada", "Nabarangpur", "Nayagarh", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh", "Bhubaneswar"
];

const Branches = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = districtList.filter(d => 
    d.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort();

  return (
    <div className="pb-24 min-h-screen bg-[#FDFBF7]">
      <PageHeader 
        title="Institutional Network"
        subtitle="Our Presence"
        breadcrumb="Branches"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
        bottomPills={["Statewide Network", "ISO Certified", "Local Mentorship", "Verified Hubs"]}
      />

      <div className="container-max px-6 md:px-10 pt-20">
        <AnimatedSection>
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-xl">
                 <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-4 block">Center Selector</span>
                 <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                    Find Your Nearest <br /><span className="text-primary italic">OICA Center</span>
                 </h2>
              </div>
              
              <div className="w-full max-w-md relative group">
                 <input 
                    type="text" 
                    placeholder="Search by district name..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-5 px-10 pl-16 text-sm focus:outline-none focus:border-primary transition-all font-bold shadow-xl shadow-slate-200/50"
                 />
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={20} />
              </div>
           </div>
        </AnimatedSection>

        {/* District Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDistricts.map((district, i) => (
            <AnimatedSection key={district} delay={i * 0.01}>
               <Link to={`/branch/${district}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group h-full bg-white rounded-[2.5rem] border border-orange-100/50 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] transition-all cursor-pointer flex flex-col relative overflow-hidden"
                  >
                     {/* Branch Thumbnail Thumbnail Thumbnail */}
                     <div className="w-full aspect-video overflow-hidden relative">
                        <img 
                           src={BRANCH_IMGS[i % BRANCH_IMGS.length]} 
                           alt={district}
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                           <ShieldCheck size={12} className="text-primary" />
                           <span className="text-[9px] font-black tracking-widest text-slate-900 uppercase">Verified Center</span>
                        </div>
                     </div>

                     <div className="p-8 flex flex-col items-center text-center flex-1">
                        <div className="w-14 h-14 rounded-2xl bg-[#FFF9F0] flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm border border-orange-100/30">
                           <Building2 size={20} />
                        </div>
                        
                        <div className="space-y-1">
                           <h3 className="font-heading font-black text-xl text-slate-800 tracking-tight">{district}</h3>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Odisha Center</p>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-slate-50 w-full flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className="flex">
                                 {[1,2,3,4,5].map(star => (
                                    <Star key={star} size={10} className="text-amber-400 fill-amber-400" />
                                 ))}
                              </div>
                              <span className="text-[9px] font-black text-slate-400 tracking-wider">OFFICIAL</span>
                           </div>
                           <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                              <ChevronRight size={18} />
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </Link>
            </AnimatedSection>
          ))}
          
          {filteredDistricts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                 <Search size={40} />
              </div>
              <p className="text-xl text-slate-400 font-black uppercase tracking-widest">No matching branches found</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-primary font-black uppercase tracking-widest text-xs hover:underline"
              >
                 Clear Search
              </button>
            </div>
          )}
        </div>
        
        {/* Expanded Bottom Bottom CTA Section */}
        <AnimatedSection className="mt-32">
           <div className="p-16 md:p-24 bg-slate-900 rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-primary blur-[120px]" />
                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 blur-[120px]" />
              </div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                 <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-4 block">Opportunity</span>
                 <h2 className="text-3xl md:text-5xl font-heading font-black mb-8 leading-tight text-white">
                    Can't Find a Branch? <br /><span className="text-emerald-400 italic">Start Your Own</span>
                 </h2>
                 <p className="text-slate-400 text-lg mb-12 font-medium leading-relaxed italic">
                    "We are rapidly expanding our digital footprint. You can join the OICA family by applying for a franchise and opening a modern branch in your locality."
                 </p>
                 <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/franchise">
                       <motion.button 
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         className="bg-primary text-white px-12 h-16 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20"
                       >
                          Apply for Franchise
                       </motion.button>
                    </Link>
                    <Link to="/contact">
                       <motion.button 
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         className="bg-white/5 border border-white/10 text-white px-12 h-16 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-white/10"
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
