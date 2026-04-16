import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Users, 
  Search, 
  MapPin, 
  Clock, 
  Building2, 
  FileText, 
  Download, 
  Upload, 
  ArrowRight,
  Plus,
  CheckCircle2,
  X,
  Target,
  Sparkles,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStorageData, setStorageData, STORAGE_KEYS } from "@/lib/storage";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";

const Career = () => {
  const [activeTab, setActiveTab] = useState<"seeker" | "giver">("seeker");
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showGeneralUploadModal, setShowGeneralUploadModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    setJobs(getStorageData(STORAGE_KEYS.JOBS));
    setApplications(getStorageData(STORAGE_KEYS.CAREER_APPS));
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully! Our team will review your resume.");
    setShowApplyModal(false);
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Job requirement posted! We will notify eligible candidates.");
    setShowPostModal(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pb-20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-400/5 rounded-full blur-3xl -ml-64 -mb-64 pointer-events-none" />

      <PageHeader 
        title="Career Portal" 
        subtitle="Opportunities"
        breadcrumb="Career"
      />

      <div className="section-container section-padding relative z-10">
        {/* Toggle Switch */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-1.5 rounded-2xl shadow-xl flex border border-slate-200">
            <button
              onClick={() => setActiveTab("seeker")}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-xl transition-all font-black text-[11px] uppercase tracking-widest ${
                activeTab === "seeker" 
                ? "bg-primary text-white shadow-lg shadow-primary/30" 
                : "text-slate-500 hover:text-primary"
              }`}
            >
              <Briefcase size={16} /> I want a Job
            </button>
            <button
              onClick={() => setActiveTab("giver")}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-xl transition-all font-black text-[11px] uppercase tracking-widest ${
                activeTab === "giver" 
                ? "bg-primary text-white shadow-lg shadow-primary/30" 
                : "text-slate-500 hover:text-primary"
              }`}
            >
              <Users size={16} /> I want to Hire
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "seeker" ? (
            <motion.div
              key="seeker"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-12"
            >
              {/* Talent Pool / Resume Upload Section */}
              <motion.div 
                variants={itemVariants}
                className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-xl text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
                      <Sparkles size={14} className="text-secondary" />
                      <span className="text-[10px] font-black uppercase tracking-widest">OICA Talent Pool</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-4">Upload Your Resume & Get Discovered</h2>
                    <p className="text-slate-400 font-medium">Don't see a matching job? Join our talent pool and let top recruiters find you based on your OICA certifications.</p>
                  </div>
                  <Button 
                    onClick={() => setShowGeneralUploadModal(true)}
                    className="h-16 px-10 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-xs uppercase tracking-widest shadow-2xl flex-shrink-0"
                  >
                    <Upload size={20} className="mr-3" /> Submit Resume Now
                  </Button>
                </div>
              </motion.div>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or location..."
                  className="w-full bg-white h-16 pl-16 pr-8 rounded-3xl border border-slate-200 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Jobs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                      
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-primary border border-slate-200 group-hover:bg-primary group-hover:text-white transition-colors">
                          <Building2 size={24} />
                        </div>
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                          {job.type}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 mb-2 truncate group-hover:text-primary transition-colors">{job.title}</h3>
                      <p className="text-sm font-bold text-slate-500 mb-6">{job.company}</p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-slate-400">
                          <MapPin size={16} />
                          <span className="text-xs font-bold uppercase tracking-wider">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400">
                          <Clock size={16} />
                          <span className="text-xs font-bold uppercase tracking-wider">{job.experience} Exp</span>
                        </div>
                        <div className="flex items-center gap-3 text-emerald-600">
                          <CheckCircle2 size={16} />
                          <span className="text-xs font-black uppercase tracking-wider">{job.salary}</span>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                         <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Posted {job.postedAt}</span>
                         <Button 
                           onClick={() => { setSelectedJob(job); setShowApplyModal(true); }}
                           className="rounded-xl h-10 px-6 font-black text-[10px] tracking-widest uppercase hover:scale-105 active:scale-95 transition-all"
                          >
                           Apply <ArrowRight size={14} className="ml-2" />
                         </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                      <Search size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-400">No jobs found matching your search.</h3>
                    <p className="text-slate-400 mt-2 font-medium">Try different keywords or check back later.</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="giver"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-16"
            >
              {/* Hire Hero Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "Verified Candidates", value: "1,250+", icon: Award, color: "blue" },
                  { label: "Avg. Placement Rate", value: "92%", icon: Target, color: "emerald" },
                  { label: "Partner Institutions", value: "450+", icon: Sparkles, color: "amber" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-[1.5rem] bg-${stat.color === 'blue' ? 'blue' : stat.color === 'emerald' ? 'emerald' : stat.color === 'indigo' ? 'indigo' : 'amber'}-50 text-${stat.color}-600 flex items-center justify-center`}>
                      <stat.icon size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Candidates Section */}
              <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Talent Pool</h3>
                    <p className="text-slate-500 font-medium">Browse our top performing students ready for deployment.</p>
                  </div>
                  <Button 
                    onClick={() => setShowPostModal(true)}
                    className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] tracking-widest uppercase shadow-xl"
                  >
                    <Plus size={18} className="mr-2" /> Post New Requirement
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {applications.slice(0, 9).map((candidate) => (
                    <div key={candidate.id} className="p-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all group overflow-hidden relative">
                      <div className="flex items-center gap-5 mb-6">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                          <img src={candidate.studentPhoto} alt={candidate.studentName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 leading-none mb-1">{candidate.studentName}</h4>
                          <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-1 rounded-md uppercase tracking-wider">{candidate.jobTitle} Aspirant</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">OICA Student ID: {candidate.studentId}</span>
                        <Button variant="outline" className="h-9 px-4 rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all">
                          <Download size={14} className="mr-2" /> Resume
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowApplyModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 block">Application Form</span>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight">Apply for {selectedJob?.title}</h3>
                  </div>
                  <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-rose-500 transition-colors"><X size={24} /></button>
                </div>

                <form onSubmit={handleApply} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <Input required placeholder="Enter your full name" className="h-14 rounded-2xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <Input required type="email" placeholder="you@example.com" className="h-14 rounded-2xl" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Resume (PDF)</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-primary transition-colors">
                        <Upload size={20} />
                      </div>
                      <p className="text-sm font-bold text-slate-500">Click to upload or drag & drop</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-black">Supported: PDF, DOCX (Max 5MB)</p>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20">
                    Submit Application
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Post Job Modal */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowPostModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 block">HR Portal</span>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight">Post Job Requirement</h3>
                  </div>
                  <button onClick={() => setShowPostModal(false)} className="text-slate-400 hover:text-rose-500 transition-colors"><X size={24} /></button>
                </div>

                <form onSubmit={handlePostJob} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Title</label>
                    <Input required placeholder="e.g. Senior Frontend Developer" className="h-14 rounded-2xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company / Organization</label>
                    <Input required placeholder="Enter company name" className="h-14 rounded-2xl" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Requirement PDF</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-primary transition-colors">
                        <FileText size={20} />
                      </div>
                      <p className="text-sm font-bold text-slate-500">Upload job description PDF</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-black">Mandatory for verification</p>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest shadow-xl">
                    Publish Requirement
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* General Resume Upload Modal */}
      <AnimatePresence>
        {showGeneralUploadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowGeneralUploadModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 block">Career Growth</span>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight">Join Talent Pool</h3>
                  </div>
                  <button onClick={() => setShowGeneralUploadModal(false)} className="text-slate-400 hover:text-rose-500 transition-colors"><X size={24} /></button>
                </div>

                <form onSubmit={handleApply} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <Input required placeholder="Enter your full name" className="h-14 rounded-2xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course at OICA</label>
                    <Input required placeholder="e.g. PGDCA / Web Dev" className="h-14 rounded-2xl" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Upload Resume (PDF)</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-primary transition-colors">
                        <Upload size={24} />
                      </div>
                      <p className="text-sm font-bold text-slate-600">Click to upload your professional CV</p>
                      <p className="text-[10px] text-slate-400 mt-2 uppercase font-black">PDF ONLY • MAX 10MB</p>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-14 rounded-2xl bg-primary text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/20">
                    Register in Database
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Career;
