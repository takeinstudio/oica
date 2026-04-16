import { Send, GraduationCap, CheckCircle2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ApplyNow = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="container-max px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header Info Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-3 text-slate-900 tracking-tight">Apply for Admission</h1>
            <p className="text-slate-500 text-sm font-medium italic">
              "Join 10,000+ students building their future with OICA."
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 md:p-10 rounded-2xl shadow-xl shadow-slate-200/20 border border-slate-200 mb-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <form className="relative z-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
              {/* Personal Details Personal Sections */}
              <div className="space-y-5">
                <h3 className="text-base font-black flex items-center gap-3 text-primary uppercase tracking-wider">
                  <div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center text-[10px]">1</div>
                  Student Info
                </h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black ml-1 uppercase tracking-widest text-slate-400">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black ml-1 uppercase tracking-widest text-slate-400">Phone Number</label>
                    <input type="tel" placeholder="+91 00000 00000" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black ml-1 uppercase tracking-widest text-slate-400">Email Address</label>
                    <input type="email" placeholder="example@mail.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black ml-1 uppercase tracking-widest text-slate-400">Gender</label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer font-bold text-xs">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Course & Location Location Sections */}
              <div className="space-y-5 pt-6 border-t border-slate-100">
                <h3 className="text-base font-black flex items-center gap-3 text-primary uppercase tracking-wider">
                  <div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center text-[10px]">2</div>
                  Course & Location
                </h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black ml-1 uppercase tracking-widest text-slate-400">Select Course</label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer font-bold text-xs">
                        <option>PGDCA</option>
                        <option>Tally ERP</option>
                        <option>Web Design</option>
                        <option>Digital Marketing</option>
                        <option>Advanced Office</option>
                        <option>DCA</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black ml-1 uppercase tracking-widest text-slate-400">Preferred District</label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer font-bold text-xs">
                        <option>Bhubaneswar</option>
                        <option>Cuttack</option>
                        <option>Puri</option>
                        <option>Sambalpur</option>
                        <option>Ganjam</option>
                        <option>Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="space-y-5 pt-6 border-t border-slate-100">
                <h3 className="text-base font-black flex items-center gap-3 text-primary uppercase tracking-wider">
                  <div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center text-[10px]">3</div>
                  Additional
                </h3>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black ml-1 uppercase tracking-widest text-slate-400">Message (Optional)</label>
                  <textarea rows={3} placeholder="Any specific requirements?" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-xs resize-none"></textarea>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-xs tracking-widest uppercase mb-4">
                  Send Application
                  <Send size={14} />
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  Secure & Privacy Guaranteed
                </div>
              </div>
            </form>
          </motion.div>

          {/* Student Help Help Sections */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm"
          >
            <h4 className="font-black text-sm mb-2 text-primary uppercase tracking-widest">Already a student?</h4>
            <p className="text-slate-400 mb-6 font-bold text-xs uppercase tracking-tight">
              Verify your certificate through our portal.
            </p>
            <Link to="/verify" className="inline-flex items-center gap-2 text-primary font-black hover:underline group text-xs uppercase tracking-widest">
              Verify Certificate 
              <ChevronDown className="-rotate-90 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ApplyNow;
