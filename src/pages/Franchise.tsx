import { motion } from 'framer-motion';
import { Building2, CheckCircle2, FileText, Send, Upload, MapPin, Home, User } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Franchise = () => {
  const advantages = [
    "Low Start-up Cost",
    "Flexible Course",
    "Placement Cell & Job Fairs",
    "Examination & Certification",
  ];

  return (
    <div className="pb-16 bg-[#fbfcfd]">
      <PageHeader 
        title="Institutional Growth"
        subtitle="Franchise Opportunity"
        breadcrumb="Franchise"
        backgroundImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2070&auto=format&fit=crop"
        bottomPills={["Low Investment", "High Returns", "Complete Support"]}
      />

      <div className="container-max px-4 pt-12">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Leftside Advantages */}
          <div className="lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-primary/5 rounded-2xl p-8 border border-primary/10 relative overflow-hidden"
            >
              <h2 className="text-xl font-black mb-6 text-slate-900 tracking-tight">Advantages of OICA Franchise</h2>
              
              <ul className="space-y-4 relative z-10">
                {advantages.map((adv, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all text-xs">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-slate-700 font-bold text-sm tracking-tight">{adv}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Building2 size={20} />
                  </div>
                  <h4 className="font-black text-base text-slate-900 tracking-tight">Expert Support</h4>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed text-[11px]">
                  We provide end-to-end guidance from infrastructure setup to successful institute management.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right form enquiry form enquiry */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-xl shadow-slate-200/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-md">
                   <FileText size={18} />
                </div>
                <div>
                   <h3 className="text-lg font-black text-slate-900 tracking-tight">Franchisee Enquiry</h3>
                   <p className="text-slate-400 font-bold text-[8px] uppercase tracking-[0.2em]">Contact & Unit Info</p>
                </div>
              </div>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Personal Section */}
                <div className="space-y-4">
                   <div className="flex items-center gap-2 text-primary">
                      <User size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Personal</span>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs" />
                    <div className="flex gap-2">
                        {['Male', 'Female'].map(g => (
                          <label key={g} className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all font-bold text-[10px] has-[:checked]:bg-primary/5 has-[:checked]:border-primary has-[:checked]:text-primary uppercase tracking-widest">
                            <input type="radio" name="gender" className="w-3 h-3 accent-primary" /> {g}
                          </label>
                        ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="tel" placeholder="Phone No" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs" />
                    <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs" />
                  </div>

                  <input type="text" placeholder="Address / Village" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs" />
                </div>

                {/* Location Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-primary">
                      <MapPin size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Location</span>
                   </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs appearance-none">
                        <option>Rural</option>
                        <option>Urban</option>
                    </select>
                    <input type="text" placeholder="District" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs" />
                    <input type="text" placeholder="City" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs" />
                  </div>
                </div>

                {/* Premises Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-primary">
                      <Home size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Premises</span>
                   </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-500 uppercase">Premises Available?</p>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map(v => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="premises" className="w-3 h-3 accent-primary" /> 
                          <span className="text-xs font-bold text-slate-600">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                     <input type="text" placeholder="Location Details" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs" />
                     <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs appearance-none">
                        <option>Owned</option>
                        <option>Leased</option>
                     </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    <label className="w-full flex items-center gap-2 bg-slate-50 border border-slate-200 border-dashed rounded-xl py-2 px-4 cursor-pointer hover:bg-slate-100 transition-all">
                      <Upload size={14} className="text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-400">Photo</span>
                      <input type="file" className="hidden" />
                    </label>
                    <label className="w-full flex items-center gap-2 bg-slate-50 border border-slate-200 border-dashed rounded-xl py-2 px-4 cursor-pointer hover:bg-slate-100 transition-all">
                      <Upload size={14} className="text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-400">ID Proof</span>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-xs tracking-widest uppercase mt-4">
                  Send Enquiry
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Franchise;

