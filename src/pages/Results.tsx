import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Layout as LayoutIcon, 
  Lock, Download, RefreshCw, 
  FileText, BookOpen, User, School, 
  CheckCircle2, TrendingUp, ShieldCheck
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Results = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [rollNumber, setRollNumber] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");

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
    }, 1500);
  };

  const resetSearch = () => {
    setVerified(null);
    setRollNumber("");
    setCaptchaInput("");
    generateCaptcha();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center pt-[100px] md:pt-[140px] pb-20 font-inter">
      <div className="container-max w-full px-6 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        
        {/* Left Hero Section - Dashboard Aesthetic Hero Aesthetic */}
        <div className="lg:w-[45%] w-full space-y-8 text-center lg:text-left">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-4"
           >
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full inline-block">
                 Official Records Portal
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-black text-slate-900 leading-[1.1] tracking-tight">
                 Access Your <br />
                 <span className="text-primary">Academic Future.</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                 OICA's secure digital infrastructure provides instant access to your examination results and academic history.
              </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
           >
              {[
                { icon: ShieldCheck, text: "Government Verified Records" },
                { icon: FileText, text: "Instant Marksheet Portability" },
                { icon: Lock, text: "End-to-End Encrypted Secure Access" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-primary/20 transition-all hover:shadow-md">
                   <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <item.icon size={20} />
                   </div>
                   <span className="text-sm font-bold text-slate-700">{item.text}</span>
                </div>
              ))}
           </motion.div>

           {/* Dashboard Stats Dashboard Stats */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="pt-8 flex flex-wrap justify-center lg:justify-start gap-10"
           >
              {[
                { label: "Active Students", val: "12K+" },
                { label: "Success Rate", val: "94%" },
                { label: "Verified Claims", val: "50K+" }
              ].map(stat => (
                <div key={stat.label} className="space-y-1">
                   <p className="text-2xl font-heading font-black text-slate-900">{stat.val}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                </div>
              ))}
           </motion.div>
        </div>

        {/* Right Section - Form Form Card Section */}
        <div className="lg:w-[55%] w-full flex justify-center lg:justify-end">
           <AnimatePresence mode="wait">
             {!verified ? (
               <motion.div
                 key="login-card"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                 className="w-full max-w-xl"
               >
                 <div className="glass-card rounded-[2.5rem] p-10 md:p-14 md:px-16 space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[10rem] pointer-events-none" />
                    
                    <div className="text-center space-y-2 relative z-10">
                       <div className="w-20 h-20 bg-slate-50 text-primary border border-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                          <LayoutIcon size={36} />
                       </div>
                       <h2 className="text-3xl font-heading font-black text-slate-900">Portal Security</h2>
                       <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Identity Verification Required</p>
                    </div>

                    <form className="space-y-8 relative z-10" onSubmit={handleSearch}>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 ml-1">
                             <FileText size={14} /> Student Roll Number
                          </label>
                          <div className="relative group">
                             <input 
                               required
                               type="text" 
                               value={rollNumber}
                               onChange={(e) => setRollNumber(e.target.value)}
                               placeholder="OICA/R2026/..." 
                               className="premium-input w-full pl-14 text-lg tracking-tight font-black" 
                             />
                             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                          </div>
                       </div>

                       {/* Polished Polished Captcha Captcha */}
                       <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                          <div className="flex items-center justify-between">
                             <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Security Access Code</span>
                             <button type="button" onClick={generateCaptcha} className="text-slate-300 hover:text-primary transition-colors">
                                <RefreshCw size={14} />
                             </button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-6 items-end">
                             <div className="space-y-2">
                                <label className="text-[8px] font-black uppercase text-slate-300 ml-1">Type Verification</label>
                                <input 
                                   required
                                   type="text"
                                   value={captchaInput}
                                   onChange={(e) => setCaptchaInput(e.target.value)}
                                   placeholder="00000"
                                   className="premium-input w-full text-center tracking-[0.3em] font-black py-4 transition-all"
                                />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[8px] font-black uppercase text-slate-300 ml-1">Generated Key</label>
                                <div className="w-full bg-white border-2 border-dashed border-primary/20 rounded-2xl py-4 flex items-center justify-center select-none shadow-inner">
                                   <span className="text-3xl font-black italic tracking-[0.4em] text-primary/70">{captchaCode}</span>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <motion.button 
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            disabled={loading}
                            className="bg-primary text-white h-16 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all btn-glow"
                          >
                             {loading ? "AUTHENTICATING..." : "SEARCH RECORD"}
                             {!loading && <TrendingUp size={16} />}
                          </motion.button>
                          <Link to="/">
                             <Button variant="ghost" className="w-full h-16 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-slate-50 transition-all">
                                EXIT PORTAL
                             </Button>
                          </Link>
                       </div>
                    </form>
                 </div>
               </motion.div>
             ) : (
               /* SaaS SaaS Result Dashboard Result Dashboard View */
               <motion.div
                 key="result-card"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="w-full"
               >
                 <div className="glass-card rounded-[3rem] p-8 md:p-14 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-10">
                       <div className="flex items-center gap-5">
                          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                             <TrendingUp size={32} />
                          </div>
                          <div>
                             <h3 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Academic Outcome</h3>
                             <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Verified Institutional Score</p>
                          </div>
                       </div>
                       <div className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 size={16} /> Verified Security
                       </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 text-sm">
                       {[
                         { label: "Full Candidate Name", value: "ASHUTOSH BRAHMA", icon: User },
                         { label: "Assigned Roll Number", value: rollNumber, icon: BookOpen },
                         { label: "Campus Specification", value: "BBSR MAIN UNIT", icon: School },
                         { label: "Global Identity ID", value: "V-ID: " + Math.random().toString(36).substring(7).toUpperCase(), icon: Lock },
                       ].map((item, i) => (
                         <div key={i} className="space-y-1 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                               <item.icon size={12} /> {item.label}
                            </span>
                            <p className="text-slate-900 font-bold text-lg tracking-tight">{item.value}</p>
                         </div>
                       ))}
                    </div>

                    {/* Dashboard Dashboard Data Grid Data Grid */}
                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-100">
                       <table className="w-full text-left text-sm">
                          <thead>
                             <tr className="bg-slate-50">
                                <th className="px-8 py-5 font-black uppercase text-[10px] text-slate-400 tracking-widest">Descriptor</th>
                                <th className="px-8 py-5 font-black uppercase text-[10px] text-slate-400 tracking-widest">Score</th>
                                <th className="px-8 py-5 font-black uppercase text-[10px] text-slate-400 tracking-widest">Letter Grade</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                             {[
                               { sub: "Computer Fundamentals", secured: 95, grade: "A+" },
                               { sub: "Office Automation Suite", secured: 92, grade: "A+" },
                               { sub: "Application Engineering (C++)", secured: 88, grade: "A" },
                               { sub: "Management Information Systems", secured: 94, grade: "A+" }
                             ].map((row, i) => (
                               <tr key={i} className="hover:bg-slate-50 transition-all duration-300">
                                  <td className="px-8 py-5 font-bold text-slate-700 italic">{row.sub}</td>
                                  <td className="px-8 py-5 font-black text-slate-400">{row.secured}</td>
                                  <td className="px-8 py-5">
                                     <span className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-[10px] font-black">{row.grade}</span>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                       <button onClick={() => window.print()} className="flex-1 bg-slate-900 text-white h-16 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                          <Download size={16} /> DOWNLOAD REPORT
                       </button>
                       <button onClick={resetSearch} className="flex-1 bg-white border border-slate-200 text-slate-600 h-16 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                          <RefreshCw size={16} /> NEW SEARCH
                       </button>
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
