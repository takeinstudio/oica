import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Mail, Phone, MapPin, Briefcase, DollarSign, Globe, CheckCircle, ShieldAlert, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { STORAGE_KEYS, getStorageData, saveStorageData } from "@/lib/storage";
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
    
    // Save to local storage for admin approval
    const existingJobs = getStorageData(STORAGE_KEYS.JOBS) || [];
    const newJob = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending', // Requires Admin Approval
      isOrgVerified: false, // Admin must verify organization first
      postedDate: new Date().toLocaleDateString(),
    };
    
    saveStorageData(STORAGE_KEYS.JOBS, [newJob, ...existingJobs]);
    setIsSubmitted(true);
    toast.success("Job post submitted! Waiting for admin verification.");
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
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-heading font-black text-slate-900 mb-4">Verification Pending</h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-10">
              Thank you for posting! To maintain high standards, our admin team will first verify your organization. Once verified, the job will be visible to our verified student talent pool.
            </p>
            <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs" onClick={() => window.location.href = '/career'}>
              Return to Career Hub
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
              For Employers
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-4">Post a New Opening</h1>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">Hire verified top talent from OICA. Your organization and job post will undergo a brief verification process.</p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
                  {/* Company Info */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <Building2 size={16} /> Company & Verification Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input 
                        required
                        type="text"
                        placeholder="Company Name"
                        className="h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      />
                      <input 
                        required
                        type="url"
                        placeholder="Company Website (URL)"
                        className="h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input 
                        required
                        type="email"
                        placeholder="Official Email"
                        className="h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <input 
                        required
                        type="tel"
                        placeholder="Contact Phone"
                        className="h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Job Info */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 pt-4 border-t border-slate-50">
                      <Briefcase size={16} /> Job Specifications
                    </h3>
                    <input 
                      required
                      type="text"
                      placeholder="Job Title (e.g. Junior Accountant)"
                      className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <select 
                        className="h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Internship</option>
                        <option>Remote</option>
                      </select>
                      <input 
                        required
                        type="text"
                        placeholder="Expected Salary (e.g. 15k - 20k)"
                        className="h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        value={formData.salary}
                        onChange={(e) => setFormData({...formData, salary: e.target.value})}
                      />
                    </div>
                    <textarea 
                      required
                      placeholder="Job Description & Requirements..."
                      className="w-full min-h-[150px] p-6 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs gap-3 shadow-xl">
                    Submit Job for Verification <Send size={16} />
                  </Button>
                </form>
              </div>
            </div>

            {/* Side Column: Guidelines */}
            <div className="space-y-6">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
                <ShieldAlert className="text-amber-400 mb-6" size={32} />
                <h3 className="text-xl font-heading font-black mb-4">Verification Policy</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  To ensure student safety, all recruiters must provide legit organization details. 
                </p>
                <ul className="space-y-4">
                  {[
                    "Organization legitimacy check",
                    "Official email verification",
                    "Job role relevance",
                    "Fair salary standards"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-500/20">
                <h3 className="text-lg font-heading font-black mb-2">Talent Access</h3>
                <p className="text-blue-100 text-[11px] font-medium leading-relaxed">
                  Only verified organizations can download student resumes and view full contact details.
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
