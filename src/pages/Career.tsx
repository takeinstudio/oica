import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User,
  GraduationCap,
  Briefcase, 
  Users, 
  Search, 
  MapPin, 
  Building2, 
  ShieldCheck,
  Target,
  Sparkles,
  Filter,
  Zap,
  MessageSquare,
  FileText,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getStorageData, STORAGE_KEYS } from "@/lib/storage";
import { toast } from "sonner";

const Career = () => {
  const [searchParams] = useSearchParams();
  const viewType = searchParams.get("type");
  const mode = searchParams.get("mode"); // 'seeker' | 'employer' — intermediate landing
  const [activeTab, setActiveTab] = useState<"seekers" | "employers">(
    viewType === "employers" ? "employers" : "seekers"
  );
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const allJobs = getStorageData(STORAGE_KEYS.JOBS);
    setJobs(allJobs.filter((j: any) => j.status === 'approved' || !j.status));
  }, []);

  useEffect(() => {
    if (viewType === "employers") setActiveTab("employers");
    else if (viewType === "seekers") setActiveTab("seekers");
  }, [viewType]);

  // ── INTERMEDIATE LANDING: I Want a Job ───────────────────────────────────
  if (mode === "seeker") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-10 pt-10 pb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none"><Target size={160} /></div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
                className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-5"
              >
                <Briefcase size={30} className="text-primary" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.25em] block mb-2">Career Portal</span>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">I Want a Job</h1>
              </motion.div>
            </div>
            <div className="px-10 py-8 space-y-5">
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-slate-700 font-medium leading-relaxed text-sm"
              >
                Start your career with confidence through our industry-focused computer courses and placement support. We help students build practical skills, create strong resumes, prepare for interviews, and connect with top companies.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="text-slate-500 font-medium leading-relaxed text-xs"
              >
                Whether you are a fresher or looking to upgrade your skills, we guide you toward the right career opportunities in the IT and digital world.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2">
                {["Resume Building", "Interview Prep", "Job Listings", "Placement Support"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[9px] font-black uppercase tracking-widest">{tag}</span>
                ))}
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="flex gap-3 pt-2">
                <Link to="/career?type=seekers" className="flex-1">
                  <button className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-2 group">
                    Launch Portal <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/career">
                  <button className="py-3.5 px-6 rounded-xl border border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Back</button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── INTERMEDIATE LANDING: I Want to Hire ─────────────────────────────────
  if (mode === "employer") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-b border-white/10 px-10 pt-10 pb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-white"><Building2 size={160} /></div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
                className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center mb-5"
              >
                <Users size={30} className="text-amber-300" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <span className="text-[9px] font-black text-amber-400 uppercase tracking-[0.25em] block mb-2">Recruitment Portal</span>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">I Want to Hire</h1>
              </motion.div>
            </div>
            <div className="px-10 py-8 space-y-5">
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-slate-300 font-medium leading-relaxed text-sm"
              >
                Find skilled, trained, and job-ready candidates for your organization through our institute. Our students are equipped with <span className="text-white font-bold">practical knowledge, technical expertise,</span> and professional training to meet industry demands.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="text-slate-400 font-medium leading-relaxed text-xs"
              >
                Partner with us to hire talented professionals for IT, software, accounting, designing, and other computer-related roles.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2">
                {["IT Professionals", "Software Devs", "Accounting Experts", "Graphic Designers"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 text-slate-300 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">{tag}</span>
                ))}
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="flex gap-3 pt-2">
                <Link to="/career?type=employers" className="flex-1">
                  <button className="w-full py-3.5 rounded-xl bg-amber-400 text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-amber-300 transition-all shadow-xl flex items-center justify-center gap-2 group">
                    Explore Talent <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/career">
                  <button className="py-3.5 px-6 rounded-xl border border-white/20 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">Back</button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!viewType) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 pt-40">
        <div className="text-center mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/20"
          >
            <Sparkles size={12} /> OICA Career Ecosystem
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 uppercase"
          >
            Your Future <span className="text-primary">Starts Here</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium max-w-lg mx-auto text-xs leading-relaxed"
          >
            Whether you're looking for your next career milestone or seeking top-tier talent to drive your business forward, we have you covered.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
          <motion.button 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => window.open('/career?type=seekers', '_blank')}
            className="group relative bg-white/40 backdrop-blur-xl p-8 rounded-[1.5rem] border border-white/60 shadow-xl hover:shadow-primary/10 transition-all duration-500 text-left overflow-hidden hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Target size={120} />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-500">
              <Briefcase size={28} className="text-primary" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">I Want a Job</h2>
            <p className="text-slate-600 font-medium text-xs leading-relaxed mb-8">
              Access verified openings from our corporate partners, build a professional OICA-verified profile, and get fast-tracked.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/5 rounded-lg text-slate-900 font-black text-[9px] uppercase tracking-widest group-hover:bg-primary group-hover:text-white transition-all border border-slate-900/5">
              Launch Portal <ChevronRight size={14} />
            </div>
          </motion.button>

          <motion.button 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => window.open('/career?type=employers', '_blank')}
            className="group relative bg-white/40 backdrop-blur-xl p-8 rounded-[1.5rem] border border-white/60 shadow-xl hover:shadow-primary/10 transition-all duration-500 text-left overflow-hidden hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-slate-900 pointer-events-none">
              <Building2 size={120} />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-500">
              <Users size={28} />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">I Want to Hire</h2>
            <p className="text-slate-600 font-medium text-xs leading-relaxed mb-8">
              Direct access to our certified talent pool. Post requirements, view dossiers, and hire verified OICA graduates.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/5 rounded-lg text-slate-900 font-black text-[9px] uppercase tracking-widest group-hover:bg-slate-900 group-hover:text-white transition-all border border-slate-900/5">
              Partner with Us <ChevronRight size={14} />
            </div>
          </motion.button>
        </div>

        {/* Subtle Decorative Elements */}
        <div className="mt-20 flex items-center gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Placeholder for partner logos or trust badges */}
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Institutional Partners • Corporate Network • Global Placement</div>
        </div>
      </div>
    );
  }

  const filteredJobs = jobs.filter(job => 
    (job.jobTitle || job.title)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.companyName || job.company)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className={`flex-grow bg-slate-50/50 pb-12 font-poppins antialiased ${viewType ? 'pt-6' : 'pt-32'}`}>



        <div className="max-w-7xl mx-auto px-6 mt-8">
          <AnimatePresence mode="wait">
            {activeTab === "seekers" ? (
              <motion.div
                key="seekers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Beginner-Friendly Support Bar */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                   <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mr-2">Support:</div>
                   <a href="https://wa.me/919853227488" target="_blank" className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 text-[9px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">
                      <MessageCircle size={12} /> WhatsApp
                   </a>
                   <a href="tel:+919853227488" className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                      <Phone size={12} /> Call Us
                   </a>
                   <a href="mailto:info@oica.edu.in" className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg border border-slate-200 text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                      <Mail size={12} /> Email
                   </a>
                </div>

                <div className="text-center mb-6">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Application Process</span>
                   </div>
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Steps to Apply...</h2>
                </div>

                {/* Animated Horizontal Onboarding Timeline */}
                <div className="relative mb-12 mt-2">
                  {/* Desktop Path Line */}
                  <div className="absolute top-[3.5rem] left-0 w-full h-[1px] bg-slate-100 hidden lg:block overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 3, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-blue-500 via-primary to-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {[
                      { id: "01", title: "Identity", desc: "Personal & Contact Info", icon: User, color: "from-blue-600 to-cyan-500", shadow: "shadow-blue-500/20" },
                      { id: "02", title: "Academic", desc: "Degree & History", icon: GraduationCap, color: "from-emerald-600 to-teal-500", shadow: "shadow-emerald-500/20" },
                      { id: "03", title: "Experience", desc: "Employment History", icon: Briefcase, color: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/20" },
                      { id: "04", title: "Projects & CV", desc: "Portfolio & Upload", icon: FileText, color: "from-slate-700 to-slate-900", shadow: "shadow-slate-500/20" }
                    ].map((phase, idx) => (
                      <div key={phase.id} className="relative group">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: idx * 0.2 }}
                          className="relative z-20"
                        >
                          {/* Number Badge */}
                          <div className="w-14 h-14 mx-auto rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-500">
                            <span className={`text-lg font-black bg-gradient-to-br ${phase.color} bg-clip-text text-transparent`}>
                              {phase.id}
                            </span>
                          </div>

                          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-all duration-500 group-hover:-translate-y-1 relative">
                            <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${phase.color} text-white flex items-center justify-center mb-4 shadow-lg ${phase.shadow}`}>
                              <phase.icon size={16} />
                            </div>
                            <h3 className="text-sm font-black text-slate-900 mb-1 uppercase tracking-tight">{phase.title}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                              {phase.desc}
                            </p>
                          </div>
                        </motion.div>

                        {/* Arrow Connector */}
                        {idx < 3 && (
                          <div className="absolute top-[3.2rem] left-[calc(50%+30px)] w-[calc(100%-60px)] hidden lg:block z-30">
                            <motion.div
                              initial={{ scaleX: 0, opacity: 0 }}
                              whileInView={{ scaleX: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.2 + 0.3, duration: 0.4 }}
                              className="origin-left flex items-center"
                            >
                              <div className="h-[1px] flex-grow bg-slate-200" />
                              <ChevronRight className="text-slate-300 w-3 h-3 -ml-1" />
                            </motion.div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Centered Start Form Button */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="flex justify-center mt-10"
                  >
                    <Link to="/career/apply">
                      <Button className="h-12 px-16 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-2xl hover:scale-105 active:scale-95 group">
                        Start Application Form
                        <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                {/* Simplified Job Feed */}
                <div id="job-feed" className="space-y-4 pt-6 border-t border-slate-200">
                   <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                         <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase mb-1">Latest Openings</h3>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Verified Opportunities</p>
                      </div>
                      <div className="relative w-full md:w-64">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                         <input 
                           type="text" 
                           placeholder="Search positions..." 
                           className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/5 outline-none font-bold text-[10px] shadow-sm transition-all"
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                         />
                      </div>
                   </div>

                   <div className="grid gap-3">
                      {filteredJobs.length > 0 ? filteredJobs.map((job, i) => (
                        <motion.div 
                          key={job.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-primary/20 hover:shadow-md transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                           <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-primary transition-all shadow-sm">
                                 <Briefcase size={18} />
                              </div>
                              <div>
                                 <div className="flex items-center gap-2 mb-0.5">
                                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors uppercase tracking-tight">{job.jobTitle || job.title}</h4>
                                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[8px] font-black uppercase border border-emerald-100">
                                       Verified
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                      <MapPin size={10} className="text-slate-300" /> {job.location}
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                      <Zap size={10} className="text-amber-400" /> {job.category || job.type}
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <Button 
                             onClick={() => toast.success(`Application started!`)}
                             className="h-9 px-6 rounded-lg font-black text-[9px] uppercase tracking-widest bg-slate-900 text-white hover:bg-primary transition-all shadow-sm"
                           >
                              Apply Now
                           </Button>
                        </motion.div>
                      )) : (
                        <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                           <Filter className="mx-auto mb-3 text-slate-200" size={32} />
                           <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">No results</p>
                        </div>
                      )}
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="employers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* ── Premium Recruiter Hero ── */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />

                  <div className="relative z-10 p-10 md:p-14">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                      <div className="max-w-xl">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                          className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-5 border border-primary/20"
                        >
                          <ShieldCheck size={11} /> Recruitment Portal
                        </motion.div>
                        <motion.h2
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                          className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4"
                        >
                          Access <span className="text-primary">Verified</span> Talent
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                          className="text-slate-400 font-medium text-sm leading-relaxed mb-8"
                        >
                          Direct connection to certified OICA graduates. Post jobs and find job-ready candidates trained in IT, accounting, design, and more.
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                          className="flex flex-wrap gap-3"
                        >
                          <Link to="/career/post-job">
                            <button className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95">
                              Post a Job
                            </button>
                          </Link>
                          <button className="h-12 px-8 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-black uppercase tracking-widest text-[10px] transition-all backdrop-blur-md">
                            Find Talent
                          </button>
                        </motion.div>
                      </div>

                      {/* Stats strip */}
                      <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:min-w-[180px]">
                        {[
                          { value: "500+", label: "Verified Candidates", color: "text-primary" },
                          { value: "12+", label: "Job Sectors", color: "text-amber-400" },
                          { value: "95%", label: "Placement Rate", color: "text-emerald-400" },
                        ].map((s, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                            className="text-center lg:text-right p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
                          >
                            <div className={`text-2xl font-black ${s.color} mb-0.5`}>{s.value}</div>
                            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Available Candidates ── */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">Available Candidates</h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em] mt-0.5">Verified Profiles · Ready to Hire</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-[9px] font-black uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Pool
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      { name: "Rahul Mohanty", role: "DCA Graduate", course: "Diploma in Computer Application", skills: ["MS Office", "Tally", "Excel"], location: "Bhubaneswar", available: "Immediately", photo: "https://i.pravatar.cc/150?img=11", score: 92 },
                      { name: "Priya Das", role: "Web Developer", course: "Full Stack Development", skills: ["React", "Node.js", "MongoDB"], location: "Cuttack", available: "2 Weeks", photo: "https://i.pravatar.cc/150?img=47", score: 88 },
                      { name: "Suman Patra", role: "Graphic Designer", course: "Graphic & Video Editing", skills: ["Photoshop", "Illustrator", "Canva"], location: "Sambalpur", available: "Immediately", photo: "https://i.pravatar.cc/150?img=32", score: 85 },
                      { name: "Ananya Swain", role: "Accounts Executive", course: "Tally Prime with GST", skills: ["Tally Prime", "GST Filing", "Excel"], location: "Puri", available: "1 Month", photo: "https://i.pravatar.cc/150?img=44", score: 90 },
                      { name: "Deepak Nayak", role: "Python Developer", course: "AI & Machine Learning", skills: ["Python", "ML", "TensorFlow"], location: "Rourkela", available: "Immediately", photo: "https://i.pravatar.cc/150?img=15", score: 94 },
                      { name: "Lipika Sahu", role: "Digital Marketer", course: "Digital Marketing", skills: ["SEO", "Meta Ads", "Analytics"], location: "Berhampur", available: "2 Weeks", photo: "https://i.pravatar.cc/150?img=49", score: 87 },
                      { name: "Biswajit Jena", role: "PGDCA Graduate", course: "Post Graduate DCA", skills: ["C++", "Database", "Networking"], location: "Kendrapara", available: "Immediately", photo: "https://i.pravatar.cc/150?img=18", score: 91 },
                      { name: "Smaran Rout", role: "UI/UX Designer", course: "Graphic & Video Editing", skills: ["Figma", "Premiere Pro", "Canva"], location: "Angul", available: "3 Weeks", photo: "https://i.pravatar.cc/150?img=25", score: 89 },
                    ].map((candidate, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden group"
                      >
                        {/* Card top */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-5 flex flex-col items-center text-center relative">
                          {/* Score badge */}
                          <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white shadow-md border border-slate-100 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-black text-primary leading-none">{candidate.score}</span>
                            <span className="text-[6px] font-bold text-slate-400 uppercase tracking-wide">Score</span>
                          </div>

                          <div className="relative mb-3">
                            <img
                              src={candidate.photo}
                              alt={candidate.name}
                              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                              <ShieldCheck size={9} className="text-white" />
                            </div>
                          </div>
                          <h4 className="font-black text-slate-900 text-sm leading-tight">{candidate.name}</h4>
                          <span className="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">{candidate.role}</span>
                          <span className="text-[8px] text-slate-400 font-medium mt-0.5">{candidate.course}</span>
                        </div>

                        {/* Card body */}
                        <div className="p-4 space-y-3">
                          {/* Skills */}
                          <div className="flex flex-wrap gap-1.5">
                            {candidate.skills.map(skill => (
                              <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[8px] font-black uppercase tracking-wide">{skill}</span>
                            ))}
                          </div>

                          {/* Meta */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <MapPin size={9} /> {candidate.location}
                              </span>
                              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${candidate.available === "Immediately" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"}`}>
                                {candidate.available}
                              </span>
                            </div>
                          </div>

                          {/* CTA */}
                          <button
                            onClick={() => toast.success(`Request sent to ${candidate.name}!`)}
                            className="w-full h-9 rounded-xl bg-slate-900 text-white font-black text-[9px] uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-1.5 group/btn"
                          >
                            <MessageSquare size={11} className="group-hover/btn:scale-110 transition-transform" />
                            Contact Candidate
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Load more hint */}
                  <div className="text-center pt-2">
                    <button className="px-8 h-11 rounded-xl border border-slate-200 text-slate-500 font-black text-[9px] uppercase tracking-widest hover:border-primary hover:text-primary transition-all bg-white shadow-sm">
                      View All 500+ Candidates
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Career;
