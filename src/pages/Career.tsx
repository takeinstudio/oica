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
  TrendingUp,
  ExternalLink,
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
  const [activeTab, setActiveTab] = useState<"seekers" | "employers">(
    viewType === "employers" ? "employers" : "seekers"
  );
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecruiterVerified] = useState(false);

  useEffect(() => {
    const allJobs = getStorageData(STORAGE_KEYS.JOBS);
    setJobs(allJobs.filter((j: any) => j.status === 'approved' || !j.status));
    
    const allApps = getStorageData(STORAGE_KEYS.CAREER_APPS);
    setApplications(allApps.filter((a: any) => a.status === 'approved' || !a.status));
  }, []);

  // Update active tab if URL parameter changes
  useEffect(() => {
    if (viewType === "employers") setActiveTab("employers");
    else if (viewType === "seekers") setActiveTab("seekers");
  }, [viewType]);

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
                {/* Professional Recruiter Hero */}
                <div className="bg-slate-900 rounded-2xl p-10 text-white shadow-xl relative overflow-hidden group">
                  <div className="max-w-2xl relative z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary rounded-lg text-[9px] font-bold uppercase tracking-wider mb-6 border border-primary/10">
                      Recruitment Portal
                    </span>
                    <h2 className="text-3xl font-bold mb-4 tracking-tight leading-tight">Access Verified Talent</h2>
                    <p className="text-slate-400 font-medium leading-relaxed mb-8 text-sm max-w-lg">
                      Direct connection to certified OICA students. Post jobs and find the right candidates for your team.
                    </p>
                    <div className="flex gap-3">
                      <Link to="/career/post-job">
                        <Button className="h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider text-[10px] shadow-lg shadow-primary/40">
                          Post a Job
                        </Button>
                      </Link>
                      <Button variant="outline" className="h-12 px-8 rounded-lg border-white/20 text-white hover:bg-white hover:text-slate-900 font-bold uppercase tracking-wider text-[10px] transition-all">
                        Find Talent
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Compact Talent Feed */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">Available Candidates</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Profiles</p>
                    </div>
                    {!isRecruiterVerified && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-lg border border-amber-100 text-[9px] font-bold uppercase tracking-wider shadow-sm">
                        <ShieldCheck size={14} /> Verification Required
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {applications.map((app, i) => (
                      <motion.div 
                        key={app.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group"
                      >
                        {!isRecruiterVerified && (
                          <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/40 flex items-center justify-center p-6 text-center">
                            <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100">
                               <ShieldCheck className="mx-auto mb-2 text-primary" size={24} />
                               <p className="text-[8px] font-bold text-slate-900 uppercase tracking-wider leading-tight">
                                 Verify Account <br /> to View
                               </p>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col items-center text-center mb-6">
                           <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mb-3 group-hover:bg-slate-900 group-hover:text-primary transition-all">
                              <Users size={24} />
                           </div>
                           <h4 className="text-sm font-bold text-slate-900">{app.studentName || app.name}</h4>
                           <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-1">{app.jobTitle || app.qualification}</span>
                        </div>

                        <div className="space-y-2 mb-6">
                           <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                              <span className="text-[8px] font-bold text-emerald-600 uppercase">Verified</span>
                           </div>
                           <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">ID</span>
                              <span className="text-[9px] font-bold text-slate-900">OICA/26</span>
                           </div>
                        </div>

                        <Button 
                          disabled={!isRecruiterVerified}
                          className="w-full h-9 rounded-lg font-bold text-[9px] uppercase tracking-wider gap-2 bg-slate-900 text-white"
                        >
                          <FileText size={12} /> Dossier
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Compact Integration Panel */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-10">
                   <div className="flex-1 space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                         <TrendingUp size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">Enterprise Scale</h3>
                      <p className="text-slate-500 font-medium leading-relaxed text-xs">
                        Bulk hiring solutions for institutional partners. Access a nationwide database of 50,000+ certified graduates.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                         {["Parsing", "Video IVR", "AI Match", "Assess"].map((tag, i) => (
                           <span key={i} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-md text-[8px] font-bold uppercase tracking-wider">{tag}</span>
                         ))}
                      </div>
                   </div>
                   <div className="flex-1 w-full max-w-sm space-y-3">
                      {[
                        { icon: Zap, label: "Fast-track Protocol" },
                        { icon: MessageSquare, label: "HR Concierge" },
                        { icon: ExternalLink, label: "ATS Integration" },
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm"><item.icon size={14} /></div>
                           <p className="text-[11px] font-bold text-slate-900">{item.label}</p>
                        </div>
                      ))}
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
