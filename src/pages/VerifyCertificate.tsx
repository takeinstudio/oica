import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Search, AlertCircle, CheckCircle2, 
  Lock, Globe, Printer,
  RefreshCw, FileText, 
  CheckCircle, Award, Calendar, UserCheck, Star, School
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const VerifyCertificate = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [certNumber, setCertNumber] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    setCaptchaCode(code);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput !== captchaCode) {
      alert("Verification code mismatch. Please refresh and try again.");
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

  const resetVerification = () => {
    setVerified(null);
    setCertNumber("");
    setCaptchaInput("");
    generateCaptcha();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center pt-[100px] md:pt-[140px] pb-20 font-inter">
      <div className="container-max w-full px-6 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        
        {/* Left Hero Section - SaaS Institutional Aesthetic SaaS Aesthetic */}
        <div className="lg:w-[45%] w-full space-y-10 text-center lg:text-left">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-5"
           >
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full inline-block">
                 Public Verification Infrastructure
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-black text-slate-900 leading-[1.1] tracking-tight">
                 Authenticity <br />
                 <span className="text-primary italic">Starts Here.</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed italic">
                 "Protecting the integrity of our graduates' achievements through secure, real-time institutional verification."
              </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="grid sm:grid-cols-2 lg:grid-cols-1 gap-5"
           >
              {[
                { icon: ShieldCheck, title: "State-Verified Hub", desc: "Recognized by Govt. of Odisha" },
                { icon: Lock, title: "Fraud Prevention", desc: "Advanced algorithmic security checks" },
                { icon: Globe, title: "Global Access", desc: "Instant retrieval from any location" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm group hover:border-primary/20 transition-all hover:shadow-md">
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <item.icon size={22} />
                   </div>
                   <div>
                      <p className="font-heading font-black text-slate-900 text-sm tracking-tight">{item.title}</p>
                      <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                   </div>
                </div>
              ))}
           </motion.div>

           {/* Institutional Footprint Institutional Footprint */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="pt-6 flex flex-wrap justify-center lg:justify-start gap-12"
           >
              {[
                { label: "Verified Certificates", val: "50K+" },
                { label: "Partner Centers", val: "31+" },
                { label: "Trust Score", val: "100%" }
              ].map(stat => (
                <div key={stat.label} className="space-y-1">
                   <p className="text-3xl font-heading font-black text-slate-900 leading-none">{stat.val}</p>
                   <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                </div>
              ))}
           </motion.div>
        </div>

        {/* Right Section - Form Card Form Card */}
        <div className="lg:w-[55%] w-full flex justify-center lg:justify-end">
           <AnimatePresence mode="wait">
             {!verified ? (
               <motion.div
                 key="verify-card"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                 className="w-full max-w-xl"
               >
                 <div className="glass-card rounded-[3.5rem] p-10 md:p-14 lg:p-16 space-y-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[10rem] pointer-events-none" />
                    
                    <div className="text-center space-y-3 relative z-10">
                       <div className="w-24 h-24 bg-slate-50 text-primary border border-slate-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
                          <CheckCircle2 size={40} />
                       </div>
                       <h2 className="text-4xl font-heading font-black text-slate-900 tracking-tight">Verify Certificate</h2>
                       <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Institutional Identity Portal</p>
                    </div>

                    <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-[2rem] flex gap-5 items-start">
                       <AlertCircle size={24} className="text-blue-500 shrink-0 mt-0.5" />
                       <p className="text-[13px] text-blue-700 font-bold leading-relaxed">
                          Your individual serial number is listed at the top corner of your certificate (e.g., OICA/2026/001).
                       </p>
                    </div>

                    <form className="space-y-10 relative z-10" onSubmit={handleVerify}>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 ml-1">
                             <FileText size={14} /> Certificate Serial Number
                          </label>
                          <div className="relative group">
                             <input 
                               required
                               type="text" 
                               value={certNumber}
                               onChange={(e) => setCertNumber(e.target.value)}
                               placeholder="OICA/CERT/..." 
                               className="premium-input w-full pl-14 text-lg font-black tracking-tight" 
                             />
                             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={22} />
                          </div>
                       </div>

                       {/* Polished Security Captcha Security Captcha */}
                       <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-8">
                          <div className="flex items-center justify-between">
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Security Access Protocol</span>
                             <button type="button" onClick={generateCaptcha} className="text-slate-300 hover:text-primary transition-colors">
                                <RefreshCw size={14} />
                             </button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-8 items-end">
                             <div className="space-y-3">
                                <label className="text-[8px] font-black uppercase text-slate-300 ml-1">Enter Key</label>
                                <input 
                                   required
                                   type="text"
                                   value={captchaInput}
                                   onChange={(e) => setCaptchaInput(e.target.value)}
                                   placeholder="00000"
                                   className="premium-input w-full text-center tracking-[0.4em] font-black py-4 transition-all"
                                />
                             </div>
                             <div className="space-y-3">
                                <label className="text-[8px] font-black uppercase text-slate-300 ml-1">Verification Code</label>
                                <div className="w-full bg-white border-2 border-dashed border-primary/20 rounded-[1.25rem] py-4 flex items-center justify-center select-none shadow-inner">
                                   <span className="text-3xl font-black italic tracking-[0.4em] text-primary/70 lining-nums">{captchaCode}</span>
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
                            className="bg-primary text-white h-20 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all btn-glow"
                          >
                             {loading ? "VERIFYING..." : "AUTHENTICATE"}
                             {!loading && <ShieldCheck size={18} />}
                          </motion.button>
                          <Link to="/">
                             <Button variant="ghost" className="w-full h-20 border border-slate-200 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-slate-50 transition-all">
                                EXIT PORTAL
                             </Button>
                          </Link>
                       </div>
                    </form>
                 </div>
               </motion.div>
             ) : (
               /* SaaS Success Success Document Card Success Document View */
               <motion.div
                 key="success-card"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="w-full"
               >
                 <div className="glass-card rounded-[3.5rem] p-8 md:p-14 lg:p-16 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-12">
                       <div className="flex items-center gap-5">
                          <div className="w-20 h-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center shadow-lg shadow-emerald-500/20 rotate-3">
                             <Award size={40} />
                          </div>
                          <div>
                             <h3 className="text-3xl font-heading font-black text-slate-900 tracking-tight">Authentic Record</h3>
                             <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">Institutional Verification Successful</p>
                          </div>
                       </div>
                       <div className="px-6 py-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                          <CheckCircle size={20} /> Verified Record
                       </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                       {[
                         { label: "Full Candidate Name", value: "ASHUTOSH BRAHMA", icon: UserCheck },
                         { label: "Institutional Roll No.", value: certNumber, icon: FileText },
                         { label: "Academic Standing", value: "A+ (EXCELLENT)", icon: Star },
                         { label: "Global ID", value: "VID-" + Math.random().toString(36).substring(7).toUpperCase(), icon: Lock },
                         { label: "Assigned Campus", value: "MAIN CAMPUS, BBSR", icon: School },
                         { label: "Issue Date", value: "March 15, 2026", icon: Calendar },
                       ].map((item, i) => (
                         <div key={i} className="flex gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                               <item.icon size={18} />
                            </div>
                            <div className="space-y-1">
                               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                               <p className="text-slate-900 font-bold text-lg tracking-tight leading-tight">{item.value}</p>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-5">
                       <button onClick={() => window.print()} className="flex-1 bg-slate-900 text-white h-20 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/10">
                          <Printer size={18} /> PRINT DOCUMENT
                       </button>
                       <button onClick={resetVerification} className="flex-1 bg-white border border-slate-200 text-slate-600 h-20 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3">
                          <RefreshCw size={18} /> VERIFY ANOTHER
                       </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-slate-300">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                       <p className="text-[9px] font-black uppercase tracking-[0.4em]">End of Official Record</p>
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

export default VerifyCertificate;
