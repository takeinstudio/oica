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
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Target,
  Sparkles,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getStorageData, STORAGE_KEYS } from "@/lib/storage";
import PageHeader from "@/components/PageHeader";
import Layout from "@/components/Layout";

const Career = () => {
  const [activeTab, setActiveTab] = useState<"seeker" | "giver">("seeker");
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecruiterVerified, setIsRecruiterVerified] = useState(false); // Simulated

  useEffect(() => {
    // Only show jobs that are approved by admin
    const allJobs = getStorageData(STORAGE_KEYS.JOBS);
    setJobs(allJobs.filter((j: any) => j.status === 'approved'));
    
    // In Find Talent tab, show approved students
    const allApps = getStorageData(STORAGE_KEYS.CAREER_APPS);
    setApplications(allApps.filter((a: any) => a.status === 'approved'));
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-poppins">
      <PageHeader 
        title="OICA Career Hub"
        subtitle="Bridging the gap between certified talent and industry leaders"
        gradient="from-blue-600 to-indigo-700"
      />

      <div className="section-container -mt-12 relative z-20">
        {/* Main Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-2xl shadow-xl border border-slate-100 flex gap-1">
            <button
              onClick={() => setActiveTab("seeker")}
              className={`px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                activeTab === "seeker" ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Briefcase size={16} /> I Want a Job
            </button>
            <button
              onClick={() => setActiveTab("giver")}
              className={`px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                activeTab === "giver" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Users size={16} /> I Want to Hire
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "seeker" ? (
            <motion.div
              key="seeker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Job Seeker Hero Call to Action */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                  <div className="relative z-10">
                    <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-4 block">New Talent Pool</span>
                    <h2 className="text-3xl font-heading font-black text-slate-900 mb-4 leading-tight">Upload Your Resume & Get Discovered</h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                      Don't see a matching job? Join our talent pool to be seen by verified recruiters based on your OICA certifications.
                    </p>
                    <Link to="/career/apply">
                      <Button className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
                        Submit Resume Now <ArrowRight className="ml-3" size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Target size={80} />
                  </div>
                  <h2 className="text-3xl font-heading font-black mb-4 leading-tight">Personalized Career Mentorship</h2>
                  <p className="text-slate-400 font-medium leading-relaxed mb-8">
                    Our certified instructors guide you through the recruitment process, helping you prepare for technical rounds and HR interviews.
                  </p>
                  <Button variant="outline" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] border-slate-700 hover:bg-slate-800 text-white">
                    Talk to Career Counselor
                  </Button>
                </div>
              </div>

              {/* Job Search & Listings */}
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <h3 className="text-2xl font-heading font-black text-slate-900">Latest Verified Openings</h3>
                  <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="text"
                      placeholder="Search jobs, companies..."
                      className="w-full h-12 pl-12 pr-6 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-all">
                            <Building2 size={24} />
                          </div>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                            {job.category || job.type}
                          </span>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">{job.jobTitle || job.title}</h4>
                        <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] uppercase tracking-wide mb-6">
                          <span>{job.companyName || job.company}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          <MapPin size={12} />
                          <span>{job.location}</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Expected Salary</span>
                            <span className="text-sm font-black text-slate-900">{job.salary}</span>
                          </div>
                          <Button className="h-10 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest">Apply Now</Button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                      <Briefcase className="mx-auto mb-4 text-slate-300" size={40} />
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No verified jobs found matching your search.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="giver"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Recruiter Hero Call to Action */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 p-12 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                  <Award size={120} />
                </div>
                <div className="max-w-2xl relative z-10">
                  <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-4 block">Employer Hub</span>
                  <h2 className="text-4xl font-heading font-black mb-6 leading-tight">Hire The Best Certified Professionals</h2>
                  <p className="text-slate-400 font-medium leading-relaxed mb-10 text-lg">
                    Join our network of verified organizations. All job postings and organizations undergo strict verification by our admin team before accessing student data.
                  </p>
                  <Link to="/career/post-job">
                    <Button className="h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90">
                      Post a Requirement <ArrowRight className="ml-3" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Find Talent Section */}
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-heading font-black text-slate-900">Find Top Talent</h3>
                    <p className="text-slate-500 text-sm font-medium">Browse verified student profiles and certifications</p>
                  </div>
                  {!isRecruiterVerified && (
                    <div className="flex items-center gap-3 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 text-[10px] font-black uppercase tracking-widest">
                      <ShieldCheck size={16} /> Restricted Access: Verification Required
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {applications.map((app) => (
                    <div 
                      key={app.id}
                      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group"
                    >
                      {/* Identity Mask if not verified */}
                      {!isRecruiterVerified && (
                        <div className="absolute inset-0 z-10 backdrop-blur-md bg-white/20 flex items-center justify-center p-6 text-center">
                          <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
                            <X className="mx-auto mb-2 text-rose-500" size={24} />
                            <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-relaxed">
                              Verify Organization <br /> to Unlock Profile
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <Users size={20} />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-sm">{app.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{app.qualification}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                          <Sparkles size={12} className="text-amber-400" />
                          <span>{app.isOicaStudent ? "Verified OICA Student" : "External Candidate"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                          <Clock size={12} />
                          <span>{app.experience} EXP</span>
                        </div>
                      </div>

                      <Button 
                        disabled={!isRecruiterVerified}
                        className="w-full h-10 rounded-xl font-black text-[9px] uppercase tracking-widest gap-2"
                      >
                        <Download size={14} /> Download Resume
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Career;
