import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Search, AlertCircle, CheckCircle2, 
  Lock, RefreshCw, FileText, 
  Award, Calendar, UserCheck, Star, School,
  ArrowLeft, Download, ExternalLink, QrCode
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageHeader from '../components/PageHeader';

const VerifyCertificate = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [certNumber, setCertNumber] = useState("");
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
    }, 1800);
  };

  const resetVerification = () => {
    setVerified(null);
    setCertNumber("");
    setCaptchaInput("");
    generateCaptcha();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader 
        title="Verification Portal"
        subtitle="Identity & Authenticity"
        breadcrumb="Portal / Verify"
        backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029"
        bottomPills={["Secure Access", "Govt. Recognized", "Instant Retrieval"]}
      />

      <div className="container-max px-4 -mt-24 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!verified ? (
              <motion.div
                key="verify-portal"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="relative"
              >
                {/* Decorative Glow Elements */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                          
                          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                             <ShieldCheck size={32} />
                          </div>
                          
                          <h2 className="text-3xl font-black leading-tight mb-6">
                             Validate Your <br />
                             <span className="text-primary italic">Credentials.</span>
                          </h2>
                          <p className="text-white/40 text-sm font-medium leading-relaxed">
                             OICA Secure Verification System ensures the integrity of student records across all platforms.
                          </p>
                       </div>

                       <div className="space-y-6 pt-12 border-t border-white/5">
                          <div className="flex items-center gap-4 text-white/60">
                             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Lock size={14} /></div>
                             <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted</span>
                          </div>
                          <div className="flex items-center gap-4 text-white/60">
                             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><ExternalLink size={14} /></div>
                             <span className="text-[10px] font-bold uppercase tracking-widest">Global Identity Link</span>
                          </div>
                       </div>
                    </div>

                    {/* Form Area */}
                    <div className="lg:col-span-3 p-12 bg-white/80 backdrop-blur-md">
                       <div className="max-w-md mx-auto space-y-10">
                          <div className="space-y-2">
                             <h3 className="text-2xl font-black text-slate-900">Certificate Verification</h3>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Institutional Portal Hub</p>
                          </div>

                          <form onSubmit={handleVerify} className="space-y-8">
                             <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Certificate Number</label>
                                <div className="relative group">
                                   <input 
                                     required
                                     type="text" 
                                     value={certNumber}
                                     onChange={(e) => setCertNumber(e.target.value)}
                                     placeholder="e.g. OICA/2026/001" 
                                     className="w-full h-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black group-focus-within:border-primary group-focus-within:bg-white transition-all shadow-inner"
                                   />
                                   <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary" size={20} />
                                </div>
                             </div>

                             <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                                <div className="flex justify-between items-center px-1">
                                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Security Check</span>
                                   <button type="button" onClick={generateCaptcha} className="text-slate-300 hover:text-primary transition-colors">
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
                                   <div className="h-14 bg-white border-2 border-dashed border-primary/20 rounded-xl flex items-center justify-center shadow-inner">
                                      <span className="text-2xl font-black italic tracking-widest text-primary/70">{captchaCode}</span>
                                   </div>
                                </div>
                             </div>

                             <div className="flex flex-col gap-4">
                                <motion.button
                                  whileHover={{ y: -4, shadowShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                                  whileTap={{ scale: 0.98 }}
                                  className="w-full h-18 bg-primary text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 h-16"
                                >
                                   {loading ? "AUTHENTICATING..." : "START VERIFICATION"}
                                   {!loading && <Award size={18} />}
                                </motion.button>
                                <div className="flex gap-4 items-center justify-center pt-4">
                                   <div className="h-px bg-slate-100 flex-1" />
                                   <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">or</span>
                                   <div className="h-px bg-slate-100 flex-1" />
                                </div>
                                <Link to="/contact" className="text-center text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">
                                   Issue with certificate? Contact Admin
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
                key="verification-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100">
                  {/* Performance Header */}
                  <div className="bg-emerald-500 p-12 text-white relative overflow-hidden">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                     <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="flex items-center gap-6">
                           <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-xl">
                              <CheckCircle2 size={40} className="text-white" />
                           </div>
                           <div>
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase mb-3">
                                 <Lock size={10} /> Official OICA Record
                              </div>
                              <h2 className="text-4xl font-black tracking-tight">Verified Athlete</h2>
                           </div>
                        </div>
                        <div className="hidden md:flex flex-col items-end">
                           <span className="text-[10px] font-black uppercase opacity-60 mb-1">ID Status</span>
                           <span className="px-4 py-2 bg-white text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl">
                              Active & Genuine
                           </span>
                        </div>
                     </div>
                  </div>

                  {/* Document Content */}
                  <div className="p-12 md:p-16">
                     <div className="grid md:grid-cols-2 gap-12 mb-16">
                        {[
                          { label: "Candidate Name", value: "ASHUTOSH BRAHMA", icon: UserCheck },
                          { label: "Identity Number", value: certNumber, icon: FileText },
                          { label: "Institutional Grade", value: "A+ DISTINCTION", icon: Star },
                          { label: "Campus Verified", value: "MAIN CAMPUS, BBSR", icon: School },
                          { label: "Issuance Date", value: "March 15, 2026", icon: Calendar },
                          { label: "Digital Signature", value: "SIGNED_KEY_" + Math.random().toString(36).substring(7).toUpperCase(), icon: QrCode },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-5 group">
                             <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <item.icon size={22} />
                             </div>
                             <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                                <p className="text-slate-900 font-bold text-xl tracking-tight leading-tight">{item.value}</p>
                             </div>
                          </div>
                        ))}
                     </div>

                     <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="text-center md:text-left space-y-2">
                           <h4 className="text-xl font-black text-slate-900">Certificate Portability</h4>
                           <p className="text-sm text-slate-400 font-medium">Download or share this official verification for your records.</p>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto ml-auto">
                           <Button onClick={() => window.print()} className="flex-1 md:flex-none h-14 md:px-10 rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest shadow-2xl">
                              <Download className="mr-3" size={18} /> Print PDF
                           </Button>
                           <Button onClick={resetVerification} variant="outline" className="flex-1 md:flex-none h-14 md:px-10 rounded-2xl border-2 font-black text-[11px] uppercase tracking-widest">
                              <RefreshCw className="mr-3" size={18} /> New Check
                           </Button>
                        </div>
                     </div>
                  </div>

                  <div className="bg-slate-50 border-t border-slate-100 p-6 text-center">
                     <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">Odisha Institute of Computer Application - Secure Ledger</p>
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
