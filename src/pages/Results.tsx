import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Layout as LayoutIcon, 
  Lock, Download, RefreshCw, 
  FileText, BookOpen, User, School, 
  CheckCircle2, TrendingUp, ShieldCheck,
  ArrowLeft, Award, GraduationCap, BarChart3, PieChart
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHeader from '../components/PageHeader';

const Results = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [rollNumber, setRollNumber] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    setCaptchaCode(code);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput !== captchaCode) {
      alert("Security code mismatch. Please refresh and try again.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
    }, 1800);
  };

  const resetSearch = () => {
    setVerified(null);
    setRollNumber("");
    setCaptchaInput("");
    generateCaptcha();
  };

  const resultData = [
    { sub: "Computer Fundamentals", secured: 95, total: 100, grade: "A+" },
    { sub: "Office Automation Suite", secured: 92, total: 100, grade: "A+" },
    { sub: "Application Engineering (C++)", secured: 88, total: 100, grade: "A" },
    { sub: "Management Information Systems", secured: 94, total: 100, grade: "A+" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader 
        title="Student Portal"
        subtitle="Academic Records & Results"
        breadcrumb="Portal / Results"
        backgroundImage="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=2072"
        bottomPills={["Real-time Access", "Digital Marksheet", "Performance Analytics"]}
      />

      <div className="container-max px-4 -mt-24 pb-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {!verified ? (
              <motion.div
                key="results-portal"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="relative max-w-4xl mx-auto"
              >
                {/* Decorative Glow Elements */}
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="glass-card rounded-[3rem] overflow-hidden border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                  <div className="grid lg:grid-cols-5 h-full">
                    {/* Sidebar Info */}
                    <div className="lg:col-span-2 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem]" />
                       
                       <div className="relative z-10">
                          <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-12"
                          >
                             <ArrowLeft size={14} /> Back to main
                          </button>
                          
                          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
                             <GraduationCap size={32} />
                          </div>
                          
                          <h2 className="text-3xl font-black leading-tight mb-6">
                             Academic <br />
                             <span className="text-blue-400 italic">Excellence.</span>
                          </h2>
                          <p className="text-white/40 text-sm font-medium leading-relaxed">
                             Access your comprehensive marksheets and performance evaluation reports securely.
                          </p>
                       </div>

                       <div className="space-y-6 pt-12 border-t border-white/5">
                          <div className="flex items-center gap-4 text-white/60">
                             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><ShieldCheck size={14} /></div>
                             <span className="text-[10px] font-bold uppercase tracking-widest">State Recognized Board</span>
                          </div>
                          <div className="flex items-center gap-4 text-white/60">
                             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><PieChart size={14} /></div>
                             <span className="text-[10px] font-bold uppercase tracking-widest">Skill Analytics Hub</span>
                          </div>
                       </div>
                    </div>

                    {/* Form Area */}
                    <div className="lg:col-span-3 p-12 bg-white/80 backdrop-blur-md">
                       <div className="max-w-md mx-auto space-y-10">
                          <div className="space-y-2">
                             <h3 className="text-2xl font-black text-slate-900">Results Gateway</h3>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Secure Student portal Access</p>
                          </div>

                          <form onSubmit={handleSearch} className="space-y-8">
                             <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Student Roll Number</label>
                                <div className="relative group">
                                   <input 
                                     required
                                     type="text" 
                                     value={rollNumber}
                                     onChange={(e) => setRollNumber(e.target.value)}
                                     placeholder="e.g. OICA/ROLL/2026/..." 
                                     className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black group-focus-within:border-blue-500 group-focus-within:bg-white transition-all shadow-inner"
                                   />
                                   <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500" size={20} />
                                </div>
                             </div>

                             <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                                <div className="flex justify-between items-center px-1">
                                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Identity Protocol</span>
                                   <button type="button" onClick={generateCaptcha} className="text-slate-300 hover:text-blue-600 transition-colors">
                                      <RefreshCw size={14} />
                                   </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 items-end">
                                   <div className="space-y-2">
                                      <input 
                                        required
                                        type="text"
                                        value={captchaInput}
                                        onChange={(e) => setCaptchaInput(e.target.value)}
                                        placeholder="Enter key"
                                        className="w-full h-14 text-center bg-white border border-slate-100 rounded-xl font-black tracking-[0.2em] shadow-sm"
                                      />
                                   </div>
                                   <div className="h-14 bg-white border-2 border-dashed border-blue-500/20 rounded-xl flex items-center justify-center shadow-inner">
                                      <span className="text-2xl font-black italic tracking-widest text-blue-600/70">{captchaCode}</span>
                                   </div>
                                </div>
                             </div>

                             <div className="flex flex-col gap-4">
                                <motion.button
                                  whileHover={{ y: -4, shadowShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                                  whileTap={{ scale: 0.98 }}
                                  className="w-full h-16 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-slate-900/10 flex items-center justify-center gap-3"
                                >
                                   {loading ? "SEARCHING..." : "ACCESS MARKSHEET"}
                                   {!loading && <FileText size={18} />}
                                </motion.button>
                                <div className="flex gap-4 items-center justify-center pt-4">
                                   <div className="h-px bg-slate-100 flex-1" />
                                   <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">or</span>
                                   <div className="h-px bg-slate-100 flex-1" />
                                </div>
                                <Link to="/contact" className="text-center text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">
                                   Lost Roll Number? Request Retrieval
                                </Link>
                             </div>
                          </form>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full"
              >
                <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100">
                  {/* Results Header */}
                  <div className="bg-slate-900 p-12 text-white relative">
                     <div className="absolute right-0 bottom-0 opacity-10 p-12"><GraduationCap size={200} /></div>
                     <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="flex items-center gap-6">
                           <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl rotate-3">
                              <TrendingUp size={40} />
                           </div>
                           <div>
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase mb-3">
                                 Confirmed Performance Record
                              </div>
                              <h2 className="text-4xl font-black tracking-tight">Academic Outcome</h2>
                           </div>
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] font-black uppercase text-white/40 mb-1">Overall Grade</span>
                           <span className="px-6 py-2 bg-emerald-500 text-white rounded-xl text-lg font-black tracking-widest">A+ DISTINCTION</span>
                        </div>
                     </div>
                  </div>

                  {/* Student Summary */}
                  <div className="p-12 md:p-16 space-y-16">
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                          { label: "Candidate", val: "ASHUTOSH BRAHMA", icon: User },
                          { label: "Institutional ID", val: rollNumber, icon: ShieldCheck },
                          { label: "Campus Unit", val: "MAIN CAMPUS, BBSR", icon: School },
                          { label: "Evaluation", val: "MARCH 2026", icon: Calendar }
                        ].map((s, i) => (
                           <div key={i} className="space-y-1.5 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                 <s.icon size={12} /> {s.label}
                              </span>
                              <p className="text-slate-900 font-bold tracking-tight">{s.val}</p>
                           </div>
                        ))}
                     </div>

                     {/* Marks Dashboard */}
                     <div className="space-y-8">
                        <div className="flex items-center justify-between">
                           <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                              <BarChart3 className="text-blue-500" /> Module Performance
                           </h3>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score Distribution</span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                           {resultData.map((row, i) => (
                              <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-blue-500/30 transition-all group">
                                 <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                       <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{row.sub}</h4>
                                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">OICA Certified Core Module</span>
                                    </div>
                                    <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                       {row.grade}
                                    </div>
                                 </div>
                                 <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                       <span className="text-slate-400">Score Achieved</span>
                                       <span className="text-slate-900">{row.secured} / {row.total}</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                       <motion.div 
                                         initial={{ width: 0 }}
                                         animate={{ width: `${(row.secured/row.total)*100}%` }}
                                         transition={{ duration: 1, delay: i * 0.2 }}
                                         className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                                       />
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Final Actions */}
                     <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-100 shadow-sm">
                              <Award size={28} />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-lg font-black text-slate-900">Merit Certificate Generated</h4>
                              <p className="text-xs text-slate-400 font-medium">Valid digital credential issued by OICA Administration.</p>
                           </div>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto ml-auto">
                           <Button onClick={() => window.print()} className="flex-1 md:flex-none h-16 md:px-12 rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest shadow-2xl">
                              <Download className="mr-3" size={18} /> Download Transcript
                           </Button>
                           <Button onClick={resetSearch} variant="outline" className="flex-1 md:flex-none h-16 md:px-12 rounded-2xl border-2 font-black text-[11px] uppercase tracking-widest">
                              <RefreshCw className="mr-3" size={18} /> New Search
                           </Button>
                        </div>
                     </div>
                  </div>

                  <div className="bg-slate-50 border-t border-slate-100 p-8 flex flex-col md:flex-row justify-between items-center opacity-50">
                     <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 md:mb-0">Secure Institutional Document Identity • Verified via OICA Central Ledger</p>
                     <div className="flex items-center gap-2"><Lock size={12} /> <span className="text-[9px] font-black uppercase tracking-widest">Secure Access Port</span></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Results;
