import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, FileText, CheckCircle, ArrowLeft, Upload, ShieldCheck, Zap, Sparkles, ChevronRight, Plus, X, Link as LinkIcon, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { STORAGE_KEYS, getStorageData, setStorageData } from "@/lib/storage";
import { toast } from "sonner";

const JobSeekerForm = () => {
  const [step, setStep] = useState(1);
  const [isOicaStudent, setIsOicaStudent] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    qualifications: [{ degree: "", institute: "", year: "" }],
    experiences: [{ role: "", company: "", duration: "" }],
    projects: [{ title: "", link: "", description: "" }],
    activities: "",
    rollNo: "",
    documents: null as any,
    resume: null as any,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const addItem = (field: 'qualifications' | 'experiences' | 'projects') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], field === 'qualifications' ? { degree: "", institute: "", year: "" } : field === 'experiences' ? { role: "", company: "", duration: "" } : { title: "", link: "", description: "" }]
    }));
  };

  const removeItem = (field: 'qualifications' | 'experiences' | 'projects', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateItem = (field: 'qualifications' | 'experiences' | 'projects', index: number, key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? { ...item, [key]: value } : item)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = getStorageData(STORAGE_KEYS.CAREER_APPS) || [];
    const newApp = {
      id: Date.now().toString(),
      ...formData,
      isOicaStudent,
      status: 'pending',
      date: new Date().toLocaleDateString(),
    };
    
    setStorageData(STORAGE_KEYS.CAREER_APPS, [newApp, ...existing]);
    setIsSubmitted(true);
    toast.success("Application successfully submitted for vetting.");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50/50">
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full bg-white rounded-2xl p-10 text-center shadow-xl border border-slate-200"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6 border border-emerald-100">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Profile Synced</h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-8 text-xs">
              Your professional profile has been added to the OICA Talent Pool. It will be visible to our recruiter network following administrative verification.
            </p>
            <Button className="w-full h-12 rounded-lg bg-slate-900 text-white font-bold uppercase tracking-wider text-[10px]" onClick={() => window.location.href = '/career'}>
              Return to Hub
            </Button>
          </motion.div>
        </div>
    );
  }

  return (
    <>
      <div className="flex-grow bg-slate-50/50 pt-32 pb-20 px-6 font-poppins antialiased">
        <div className="max-w-5xl mx-auto">
          {/* Professional Compact Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[9px] font-bold uppercase tracking-wider mb-3 border border-emerald-100">
                Talent Pipeline
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight uppercase">Professional Onboarding</h1>
              <p className="text-slate-500 font-medium mt-1 text-sm">Register your profile for corporate discovery.</p>
            </div>
            <div className="flex flex-col items-end gap-2">
               <div className="flex items-center gap-1.5 mb-1.5">
                  {[1,2,3,4].map(s => (
                    <div key={s} className={`h-1 rounded-full transition-all duration-500 ${step >= s ? 'w-6 bg-primary' : 'w-3 bg-slate-200'}`} />
                  ))}
               </div>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Phase {step} of 4</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ x: 15, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -15, opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3 mb-2">
                           <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center"><User size={16} /></div>
                           <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Personal Identity</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                            <Input 
                              required
                              placeholder="Full Name"
                              className="h-11 px-4 bg-slate-50 border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                            <Input 
                              required
                              type="email"
                              placeholder="Email"
                              className="h-11 px-4 bg-slate-50 border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Contact Number</label>
                            <Input 
                              required
                              type="tel"
                              placeholder="+91"
                              className="h-11 px-4 bg-slate-50 border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Location</label>
                            <Input 
                              required
                              placeholder="City, State"
                              className="h-11 px-4 bg-slate-50 border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs"
                              value={formData.address}
                              onChange={(e) => setFormData({...formData, address: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end pt-6">
                          <Button type="button" className="h-12 px-8 rounded-lg font-bold uppercase tracking-wider text-[10px] gap-2 shadow-lg" onClick={nextStep}>
                            Next Step <ChevronRight size={14} />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ x: 15, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -15, opacity: 0 }}
                        className="space-y-10"
                      >
                        {/* Qualifications Section */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center"><GraduationCap size={16} /></div>
                              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Academic History</h3>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={() => addItem('qualifications')} className="h-8 px-3 rounded-md text-[9px] font-bold gap-1.5">
                              <Plus size={12} /> Add More
                            </Button>
                          </div>
                          {formData.qualifications.map((q, i) => (
                            <div key={i} className="grid md:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl relative group">
                              {i > 0 && (
                                <button onClick={() => removeItem('qualifications', i)} className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                                  <X size={12} />
                                </button>
                              )}
                              <div className="space-y-1.5">
                                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Degree/Course</label>
                                <Input value={q.degree} onChange={(e) => updateItem('qualifications', i, 'degree', e.target.value)} placeholder="e.g. B.Tech" className="h-9 px-3 bg-white text-[11px] font-bold" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Institute</label>
                                <Input value={q.institute} onChange={(e) => updateItem('qualifications', i, 'institute', e.target.value)} placeholder="e.g. OICA" className="h-9 px-3 bg-white text-[11px] font-bold" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Year</label>
                                <Input value={q.year} onChange={(e) => updateItem('qualifications', i, 'year', e.target.value)} placeholder="e.g. 2024" className="h-9 px-3 bg-white text-[11px] font-bold" />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Experience Section */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center"><Briefcase size={16} /></div>
                              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Employment History</h3>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={() => addItem('experiences')} className="h-8 px-3 rounded-md text-[9px] font-bold gap-1.5">
                              <Plus size={12} /> Add More
                            </Button>
                          </div>
                          {formData.experiences.map((exp, i) => (
                            <div key={i} className="grid md:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl relative group">
                              {i > 0 && (
                                <button onClick={() => removeItem('experiences', i)} className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                                  <X size={12} />
                                </button>
                              )}
                              <div className="space-y-1.5">
                                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Job Role</label>
                                <Input value={exp.role} onChange={(e) => updateItem('experiences', i, 'role', e.target.value)} placeholder="e.g. Developer" className="h-9 px-3 bg-white text-[11px] font-bold" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Company</label>
                                <Input value={exp.company} onChange={(e) => updateItem('experiences', i, 'company', e.target.value)} placeholder="Company Name" className="h-9 px-3 bg-white text-[11px] font-bold" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Duration</label>
                                <Input value={exp.duration} onChange={(e) => updateItem('experiences', i, 'duration', e.target.value)} placeholder="e.g. 1 Year" className="h-9 px-3 bg-white text-[11px] font-bold" />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Projects Section */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center"><FileText size={16} /></div>
                              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Key Projects</h3>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={() => addItem('projects')} className="h-8 px-3 rounded-md text-[9px] font-bold gap-1.5">
                              <Plus size={12} /> Add More
                            </Button>
                          </div>
                          {formData.projects.map((proj, i) => (
                            <div key={i} className="space-y-3 p-4 bg-slate-50 rounded-xl relative group">
                              {i > 0 && (
                                <button onClick={() => removeItem('projects', i)} className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                                  <X size={12} />
                                </button>
                              )}
                              <div className="grid md:grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Project Title</label>
                                  <Input value={proj.title} onChange={(e) => updateItem('projects', i, 'title', e.target.value)} placeholder="Project Name" className="h-9 px-3 bg-white text-[11px] font-bold" />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><LinkIcon size={8} /> Project Link</label>
                                  <Input value={proj.link} onChange={(e) => updateItem('projects', i, 'link', e.target.value)} placeholder="GitHub / Portfolio Link" className="h-9 px-3 bg-white text-[11px] font-bold" />
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Brief Description</label>
                                <textarea 
                                  value={proj.description} 
                                  onChange={(e) => updateItem('projects', i, 'description', e.target.value)} 
                                  placeholder="Describe your role and impact..." 
                                  className="w-full h-16 p-3 bg-white border border-slate-200 rounded-lg text-[11px] font-bold resize-none outline-none" 
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Extra Curricular Section */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center"><Trophy size={16} /></div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Extra Curricular & Certifications</h3>
                          </div>
                          <textarea 
                            value={formData.activities} 
                            onChange={(e) => setFormData({...formData, activities: e.target.value})} 
                            placeholder="Detail your achievements, sports, or additional certifications..." 
                            className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold resize-none outline-none focus:bg-white transition-all" 
                          />
                        </div>

                        <div className="flex justify-between pt-6">
                          <Button type="button" variant="outline" className="h-12 px-6 rounded-lg font-bold uppercase tracking-wider text-[10px] gap-2" onClick={prevStep}>
                            <ArrowLeft size={14} /> Back
                          </Button>
                          <Button type="button" className="h-12 px-8 rounded-lg font-bold uppercase tracking-wider text-[10px] gap-2 shadow-lg" onClick={nextStep}>
                            Verification <ChevronRight size={14} />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ x: 15, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -15, opacity: 0 }}
                        className="space-y-8"
                      >
                        <div className="p-8 bg-slate-900 rounded-2xl text-white relative overflow-hidden shadow-xl">
                          <h4 className="text-base font-bold mb-3 uppercase tracking-tight">Student Status</h4>
                          <p className="text-slate-400 text-[10px] font-medium leading-relaxed mb-6 max-w-sm">
                            Are you a current student or graduate of an OICA certified program?
                          </p>
                          <div className="flex gap-3">
                            <button 
                              type="button"
                              onClick={() => setIsOicaStudent(true)}
                              className={`flex-1 h-12 rounded-lg font-bold uppercase tracking-wider text-[9px] transition-all border-2 ${
                                isOicaStudent ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                              }`}
                            >
                              Yes, I am
                            </button>
                            <button 
                              type="button"
                              onClick={() => setIsOicaStudent(false)}
                              className={`flex-1 h-12 rounded-lg font-bold uppercase tracking-wider text-[9px] transition-all border-2 ${
                                !isOicaStudent ? 'bg-white border-white text-slate-900' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
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
                            className="space-y-4 pt-2"
                          >
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">OICA Enrollment ID</label>
                              <Input 
                                required
                                placeholder="OICA/2026/XXXX"
                                className="h-11 px-4 bg-slate-50 border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs"
                                value={formData.rollNo}
                                onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                              />
                            </div>
                            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-primary/30 transition-all bg-slate-50 cursor-pointer group">
                              <Upload size={24} className="text-slate-300 group-hover:text-primary mx-auto mb-2" />
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Upload Verification Document</p>
                              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                          </motion.div>
                        )}

                        <div className="flex justify-between pt-6">
                          <Button type="button" variant="outline" className="h-12 px-6 rounded-lg font-bold uppercase tracking-wider text-[10px] gap-2" onClick={prevStep}>
                            <ArrowLeft size={14} /> Back
                          </Button>
                          <Button type="button" className="h-12 px-8 rounded-lg font-bold uppercase tracking-wider text-[10px] gap-2 shadow-lg" onClick={nextStep}>
                            Final Phase <ChevronRight size={14} />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ x: 15, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -15, opacity: 0 }}
                        className="space-y-8"
                      >
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 bg-primary/5 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                            <FileText size={28} />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Professional CV</h3>
                          <p className="text-slate-500 text-[10px] font-medium max-w-xs mx-auto leading-relaxed">
                            Upload your latest resume in PDF format for recruitment vetting.
                          </p>
                        </div>

                        <div className="relative border-4 border-dashed border-slate-100 rounded-2xl p-12 text-center hover:bg-slate-50 hover:border-primary/20 transition-all bg-white cursor-pointer group">
                          <Upload size={32} className="text-slate-200 group-hover:text-primary mx-auto mb-3 transition-transform" />
                          <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-1">Drag Resume Here</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase">PDF ONLY • MAX 10MB</p>
                          <input type="file" required className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>

                        <div className="flex justify-between pt-6">
                          <Button type="button" variant="outline" className="h-12 px-6 rounded-lg font-bold uppercase tracking-wider text-[10px] gap-2" onClick={prevStep}>
                            <ArrowLeft size={14} /> Back
                          </Button>
                          <Button type="submit" className="h-12 px-10 rounded-lg font-bold uppercase tracking-wider text-[10px] gap-3 bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/10 text-white">
                            Deploy Profile <Zap size={14} />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>

            {/* Side Column: Guidelines */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                 <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center mb-6">
                    <ShieldCheck size={20} />
                 </div>
                 <h3 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-tight">Talent Protocol</h3>
                 <p className="text-slate-500 text-[10px] font-bold leading-relaxed mb-8">
                   Data encryption and access controls enforced for all candidate records.
                 </p>
                 <div className="space-y-3">
                    {[
                      "Vetted Recruiter Access",
                      "Privacy Controls",
                      "Automated Matching"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                         <CheckCircle size={10} className="text-emerald-500" />
                         <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700">{item}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl">
                 <h3 className="text-base font-bold mb-1 uppercase tracking-tight">Support Desk</h3>
                 <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-6">Counseling Unit</p>
                 <a href="tel:+919853227488" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center">
                       <Phone size={16} />
                    </div>
                    <div>
                       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Emergency Desk</p>
                       <p className="text-sm font-bold text-white tracking-tight">+91 98532 27488</p>
                    </div>
                 </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSeekerForm;
