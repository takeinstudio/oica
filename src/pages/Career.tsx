import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Users, 
  Search, 
  MapPin, 
  Clock, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Target,
  Sparkles,
  Award,
  Filter,
  Zap,
  TrendingUp,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getStorageData, STORAGE_KEYS } from "@/lib/storage";
import { toast } from "sonner";

const Career = () => {
  const [activeTab, setActiveTab] = useState<"seekers" | "employers">("seekers");
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecruiterVerified, setIsRecruiterVerified] = useState(false);

  useEffect(() => {
    const allJobs = getStorageData(STORAGE_KEYS.JOBS);
    setJobs(allJobs.filter((j: any) => j.status === 'approved' || !j.status));
    
    const allApps = getStorageData(STORAGE_KEYS.CAREER_APPS);
    setApplications(allApps.filter((a: any) => a.status === 'approved' || !a.status));
  }, []);

  const filteredJobs = jobs.filter(job => 
    (job.jobTitle || job.title)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.companyName || job.company)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex-grow bg-slate-50/50 pb-20 font-poppins antialiased pt-32">
        {/* Compact Dashboard Header */}
        <div className="bg-white border-b border-slate-200 sticky top-[104px] z-40 px-6 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
            {/* Left: Branding/Title */}
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-md">
                  <Briefcase size={18} className="text-primary" />
               </div>
               <div className="hidden sm:block">
                  <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none">Career Hub</h1>
                  <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-1">Jobs & Placements</p>
               </div>
            </div>

            {/* Centre: Main Tabs - Premium Large Design */}
            <div className="flex justify-center">
              <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl shadow-inner border border-slate-200">
                <button
                  onClick={() => setActiveTab("seekers")}
                  className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 ${
                    activeTab === "seekers" 
                      ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-900/20" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Target size={14} /> I Want a Job
                </button>
                <button
                  onClick={() => setActiveTab("employers")}
                  className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 ${
                    activeTab === "employers" 
                      ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-900/20" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Building2 size={14} /> I Want to Hire
                </button>
              </div>
            </div>

            {/* Right: Empty for balance or could add a Search toggle */}
            <div className="flex justify-end">
               {/* Optional Search or Filter button here */}
            </div>
          </div>
        </div>

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
                {/* Compact Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-black/5">
                         <TrendingUp size={16} />
                      </div>
                      <div>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Openings</p>
                         <p className="text-base font-bold text-slate-900">{jobs.length + 12}</p>
                      </div>
                   </div>
                   <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-black/5">
                         <ShieldCheck size={16} />
                      </div>
                      <div>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Recruiters</p>
                         <p className="text-base font-bold text-slate-900">48+</p>
                      </div>
                   </div>
                   <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center border border-black/5">
                         <Zap size={16} />
                      </div>
                      <div>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">New Leads</p>
                         <p className="text-base font-bold text-slate-900">124</p>
                      </div>
                   </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                   {/* Compact Action Sidebar */}
                   <div className="lg:col-span-1 space-y-4">
                      <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
                         <h2 className="text-lg font-bold mb-2 tracking-tight">Talent Pool</h2>
                         <p className="text-slate-400 text-[11px] font-medium leading-relaxed mb-6">
                           Upload your resume to get discovered by verified recruiters.
                         </p>
                         <Link to="/career/apply">
                           <Button className="w-full h-11 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold uppercase tracking-wider text-[10px] shadow-lg shadow-violet-900/20 border-t border-white/20">
                             Submit Resume
                           </Button>
                         </Link>
                      </div>

                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                         <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                            <Sparkles size={16} />
                         </div>
                         <h3 className="text-sm font-bold text-slate-900 mb-1">Mentorship</h3>
                         <p className="text-slate-500 text-[10px] font-medium mb-6 leading-relaxed">Prepare for technical rounds and HR interviews.</p>
                         <Link to="/contact">
                            <Button variant="outline" className="w-full h-11 rounded-lg border-slate-200 font-bold uppercase tracking-wider text-[10px] hover:bg-slate-50">
                               Talk to Counselor
                            </Button>
                         </Link>
                      </div>
                   </div>

                   {/* Compact Job Feed */}
                   <div className="lg:col-span-3 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Latest Openings</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Opportunities</p>
                         </div>
                         <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input 
                              type="text" 
                              placeholder="Search positions..." 
                              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/5 outline-none font-bold text-xs transition-all"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                         </div>
                      </div>

                      <div className="grid gap-3">
                         {filteredJobs.length > 0 ? filteredJobs.map((job, i) => (
                           <motion.div 
                             key={job.id}
                             initial={{ opacity: 0, x: 10 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: i * 0.05 }}
                             className="bg-white rounded-xl p-4 border border-slate-200 hover:border-primary/20 hover:shadow-md transition-all group"
                           >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-primary transition-all">
                                       <Building2 size={20} />
                                    </div>
                                    <div>
                                       <div className="flex items-center gap-2 mb-0.5">
                                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{job.jobTitle || job.title}</h4>
                                          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[8px] font-bold uppercase border border-emerald-100 flex items-center gap-1">
                                             <ShieldCheck size={8} /> Verified
                                          </span>
                                       </div>
                                       <div className="flex items-center gap-3 mt-3">
                                          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                            <MapPin size={10} /> {job.location}
                                          </div>
                                          <div className="w-1 h-1 rounded-full bg-slate-200" />
                                          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                            <Briefcase size={10} /> {job.category || job.type}
                                          </div>
                                        </div>
                                    </div>
                                 </div>

                                 <Button 
                                   onClick={() => toast.success(`Application for ${job.jobTitle || job.title} submitted!`)}
                                   className="h-9 px-6 rounded-lg font-bold text-[10px] uppercase tracking-wider"
                                 >
                                    Apply Now
                                 </Button>
                              </div>
                           </motion.div>
                         )) : (
                           <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                             <Filter className="mx-auto mb-3 text-slate-300" size={32} />
                             <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">No results match your criteria</p>
                           </div>
                         )}
                      </div>
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
