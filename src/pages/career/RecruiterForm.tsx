import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Mail, Phone, Briefcase, ChevronRight, Zap, ShieldAlert, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { STORAGE_KEYS, getStorageData, setStorageData } from "@/lib/storage";
import { toast } from "sonner";

const RecruiterForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    contactPerson: "",
    email: "",
    phone: "",
    jobTitle: "",
    category: "Full Time",
    salary: "",
    location: "",
    description: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingJobs = getStorageData(STORAGE_KEYS.JOBS) || [];
    const newJob = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      isOrgVerified: false,
      postedDate: new Date().toLocaleDateString(),
    };
    
    setStorageData(STORAGE_KEYS.JOBS, [newJob, ...existingJobs]);
    setIsSubmitted(true);
    toast.success("Submission successful. Admin verification in progress.");
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50/50">
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full bg-white rounded-2xl p-10 text-center shadow-xl border border-slate-200"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6 border border-emerald-100">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Record Logged</h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-8 text-xs">
              Your organization credentials have been queued for administrative vetting. Access to the talent pool will be granted upon verification.
            </p>
            <Button className="w-full h-12 rounded-lg bg-slate-900 text-white font-bold uppercase tracking-wider text-[10px]" onClick={() => window.location.href = '/career'}>
              Return to Hub
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex-grow bg-slate-50/50 pt-32 pb-20 px-6 font-poppins antialiased">
        <div className="max-w-5xl mx-auto">
          {/* Professional Compact Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-[9px] font-bold uppercase tracking-wider mb-3 border border-blue-100">
                Corporate Access
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Post New Opening</h1>
              <p className="text-slate-500 font-medium mt-1 text-sm">Provide organization and job specifications for verification.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Assistance</p>
                  <p className="text-xs font-bold text-slate-900">+91 98532 27488</p>
               </div>
               <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                  <Phone size={16} />
               </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
                  {/* Company Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center"><Building2 size={16} /></div>
                       <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Entity Details</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Company Name</label>
                        <Input 
                          required
                          placeholder="Legal Entity Name"
                          className="h-11 px-4 bg-slate-50 border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Website URL</label>
                        <Input 
                          required
                          type="url"
                          placeholder="https://company.com"
                          className="h-11 px-4 bg-slate-50 border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs"
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Official Email</label>
                        <Input 
                          required
                          type="email"
                          placeholder="hr@company.com"
                          className="h-11 px-4 bg-slate-50 border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Contact Phone</label>
                        <Input 
                          required
                          type="tel"
                          placeholder="+91"
                          className="h-11 px-4 bg-slate-50 border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Job Info */}
                  <div className="space-y-6 pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center"><Briefcase size={16} /></div>
                       <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Position Architecture</h3>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Job Title</label>
                      <Input 
                        required
                        placeholder="e.g. Accounts Manager"
                        className="w-full h-11 px-4 bg-slate-50 border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                      />
                    </div>
                   <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Category</label>
                        <select 
                          className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs outline-none"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                          <option>Full Time</option>
                          <option>Part Time</option>
                          <option>Internship</option>
                          <option>Remote</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Location</label>
                        <Input 
                          required
                          placeholder="e.g. Bhubaneswar, Odisha"
                          className="h-11 px-4 bg-slate-50 border-slate-200 rounded-lg focus:bg-white transition-all font-bold text-xs"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-1">Description & Requirements</label>
                      <textarea 
                        required
                        placeholder="Detail the role specifications..."
                        className="w-full min-h-[140px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-all font-bold text-xs resize-none outline-none"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-14 rounded-lg font-bold uppercase tracking-wider text-[10px] gap-3 shadow-xl">
                    Deploy Requirement <Zap size={14} />
                  </Button>
                </form>
              </div>
            </div>

            {/* Side Column: Guidelines */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <ShieldAlert className="text-primary mb-6" size={32} />
                <h3 className="text-lg font-bold mb-3 tracking-tight">OICA Protocol</h3>
                <p className="text-slate-400 text-[11px] font-medium leading-relaxed mb-6">
                  Vetting standards enforced for all corporate listings to ensure career safety.
                </p>
                <div className="space-y-4">
                  {[
                    "Entity Legitimacy",
                    "Official Domain Verification",
                    "Role Integrity"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <CheckCircle size={12} className="text-primary" />
                       <span className="text-[9px] font-bold uppercase tracking-wider text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
                 <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 mx-auto border border-blue-100">
                    <Target size={20} />
                 </div>
                 <h3 className="text-sm font-bold text-slate-900 mb-1">Talent Reach</h3>
                 <p className="text-slate-500 text-[10px] font-bold leading-relaxed">
                   Access elite certified professionals across our nationwide network.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecruiterForm;
