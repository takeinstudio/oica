import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, FileText, CheckCircle, ArrowRight, ArrowLeft, Upload, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { STORAGE_KEYS, getStorageData, saveStorageData } from "@/lib/storage";
import { toast } from "sonner";

const JobSeekerForm = () => {
  const [step, setStep] = useState(1);
  const [isOicaStudent, setIsOicaStudent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    experience: "",
    rollNo: "",
    documents: null as any,
    resume: null as any,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to local storage for admin approval
    const existing = getStorageData(STORAGE_KEYS.CAREER_APPS) || [];
    const newApp = {
      id: Date.now().toString(),
      ...formData,
      isOicaStudent,
      status: 'pending', // Requires Admin Approval
      date: new Date().toLocaleDateString(),
    };
    
    saveStorageData(STORAGE_KEYS.CAREER_APPS, [newApp, ...existing]);
    setIsSubmitted(true);
    toast.success("Application submitted successfully! Waiting for admin approval.");
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full bg-white rounded-[2.5rem] p-12 text-center shadow-2xl border border-slate-100"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-heading font-black text-slate-900 mb-4">Application Received</h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-10">
              Your profile has been sent to our hiring team. Once the admin verifies your details, your profile will be active in our talent pool.
            </p>
            <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs" onClick={() => window.location.href = '/'}>
              Return Home
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
              Join Our Talent Pool
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-4">Professional Application</h1>
            <p className="text-slate-500 font-medium">Build your career with OICA's verified industry network</p>
          </AnimatedSection>

          {/* Stepper */}
          <div className="flex justify-between items-center mb-12 max-w-md mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all shadow-lg ${
                  step >= s ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-white text-slate-400'
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                          <input 
                            required
                            type="text"
                            placeholder="John Doe"
                            className="w-full h-14 pl-12 pr-6 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                          <input 
                            required
                            type="email"
                            placeholder="john@example.com"
                            className="w-full h-14 pl-12 pr-6 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mobile Number</label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                          <input 
                            required
                            type="tel"
                            placeholder="+91 0000000000"
                            className="w-full h-14 pl-12 pr-6 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Residential Address</label>
                        <div className="relative group">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                          <input 
                            required
                            type="text"
                            placeholder="Bhubaneswar, Odisha"
                            className="w-full h-14 pl-12 pr-6 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end pt-6">
                      <Button type="button" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs gap-3" onClick={nextStep}>
                        Professional Details <ArrowRight size={16} />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Highest Qualification</label>
                      <div className="relative group">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                          required
                          type="text"
                          placeholder="e.g. B.Tech / MBA / PGDCA"
                          className="w-full h-14 pl-12 pr-6 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                          value={formData.qualification}
                          onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Total Experience</label>
                      <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                          required
                          type="text"
                          placeholder="e.g. Fresher / 2 Years"
                          className="w-full h-14 pl-12 pr-6 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                          value={formData.experience}
                          onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between pt-6">
                      <Button type="button" variant="outline" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs gap-3" onClick={prevStep}>
                        <ArrowLeft size={16} /> Back
                      </Button>
                      <Button type="button" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs gap-3" onClick={nextStep}>
                        OICA Verification <ArrowRight size={16} />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                        <ShieldCheck className="text-primary" size={20} />
                        Are you an OICA Student?
                      </h4>
                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={() => setIsOicaStudent(true)}
                          className={`flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border ${
                            isOicaStudent ? 'bg-primary text-white border-transparent' : 'bg-white text-slate-400 border-slate-200 hover:border-primary/20'
                          }`}
                        >
                          Yes, I am
                        </button>
                        <button 
                          type="button"
                          onClick={() => setIsOicaStudent(false)}
                          className={`flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border ${
                            !isOicaStudent ? 'bg-slate-900 text-white border-transparent' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-900/20'
                          }`}
                        >
                          No, I am not
                        </button>
                      </div>
                    </div>

                    {isOicaStudent && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">OICA Roll Number</label>
                          <input 
                            required
                            type="text"
                            placeholder="OICA-2024-XXXX"
                            className="w-full h-14 px-6 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                            value={formData.rollNo}
                            onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Supporting Document (ID Card/Marksheet)</label>
                          <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-primary/40 transition-all bg-white cursor-pointer group">
                            <Upload className="w-8 h-8 text-slate-300 group-hover:text-primary mx-auto mb-2" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to upload document</p>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex justify-between pt-6">
                      <Button type="button" variant="outline" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs gap-3" onClick={prevStep}>
                        <ArrowLeft size={16} /> Back
                      </Button>
                      <Button type="button" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs gap-3" onClick={nextStep}>
                        Final Step <ArrowRight size={16} />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FileText size={32} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">Upload Your Professional Resume</h3>
                      <p className="text-slate-500 text-sm font-medium">Please provide a PDF version of your latest CV</p>
                    </div>

                    <div className="relative border-4 border-dashed border-primary/10 rounded-[2rem] p-16 text-center hover:bg-primary/[0.02] hover:border-primary/30 transition-all bg-white cursor-pointer group">
                      <Upload className="w-12 h-12 text-primary/40 group-hover:text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <p className="text-[12px] font-black text-slate-900 uppercase tracking-[0.2em] mb-2">Drag & Drop Resume</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PDF format only • Max 10MB</p>
                      <input type="file" required className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>

                    <div className="flex justify-between pt-6">
                      <Button type="button" variant="outline" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs gap-3" onClick={prevStep}>
                        <ArrowLeft size={16} /> Back
                      </Button>
                      <Button type="submit" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs gap-3 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/10">
                        Complete Application <CheckCircle size={16} />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobSeekerForm;
