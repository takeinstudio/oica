import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  ShieldCheck, 
  FileText, 
  Image as ImageIcon,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Star,
  Download,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStorageData, STORAGE_KEYS } from "@/lib/storage";
import { useState, useEffect, useMemo } from "react";
import AnimatedSection from "@/components/shared/AnimatedSection";

// Curated high-quality academy/tech images images for randomization
const ACADEMY_IMAGES = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", // Lab
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop", // Student grp
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop", // Code
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop", // Team
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop", // Tech desk
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop", // Meeting
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1470&auto=format&fit=crop", // Classroom
  "https://images.unsplash.com/photo-1513258496099-48168024adb0?q=80&w=1470&auto=format&fit=crop", // Study
  "https://images.unsplash.com/photo-1454165833767-131f72740927?q=80&w=1470&auto=format&fit=crop", // Professional
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1470&auto=format&fit=crop", // Laptop
];

const BranchDetail = () => {
  const { id } = useParams();
  const [branchData, setBranchData] = useState<any>(null);
  
  // Memoize random images so they stay consistent on re-renders within the same session
  const dynamicGallery = useMemo(() => {
    return [...ACADEMY_IMAGES].sort(() => Math.random() - 0.5);
  }, [id]);

  const randomHeroBg = useMemo(() => {
    return `https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop`; // Modern Office/Center
  }, [id]);

  useEffect(() => {
    const branches = getStorageData(STORAGE_KEYS.BRANCHES);
    const found = branches.find((b: any) => b.location === id || b.id === id);
    if (found) {
      setBranchData(found);
    }
  }, [id]);

  if (!branchData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
         <div className="text-center">
            <h2 className="text-2xl font-heading font-black text-slate-900 mb-2">Branch Not Found</h2>
            <Link to="/branches" className="text-primary font-bold hover:underline">Back to All Branches</Link>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Hero Hero Section */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img src={randomHeroBg} className="w-full h-full object-cover" alt="Branch Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </motion.div>
        
        <div className="container-max p-10 relative z-10 text-white w-full">
           <Link to="/branches" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 group transition-all text-[10px] font-black uppercase tracking-widest">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to All Branches
           </Link>
           <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                 <span className="px-5 py-2 bg-primary/20 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-white/10 shadow-xl">
                    {branchData.location} REGION
                 </span>
                 <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-md rounded-full text-emerald-400 font-black text-[10px] uppercase tracking-widest border border-emerald-500/20">
                    <ShieldCheck size={14} /> State Verified Center
                 </div>
                 <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/20 backdrop-blur-md rounded-full text-amber-400 font-black text-[10px] uppercase tracking-widest border border-amber-500/20">
                    <Star size={14} fill="currentColor" /> ISO 9001:2008
                 </div>
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-heading font-black mb-8 tracking-tight leading-[0.9] text-white"
              >
                {branchData.name}
              </motion.h1>
              <div className="flex flex-wrap gap-10 text-sm font-medium text-white/70">
                 <div className="flex items-center gap-3 max-w-sm leading-relaxed">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                       <MapPin size={18} className="text-primary" />
                    </div>
                    {branchData.address}
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                       <Phone size={18} className="text-primary" />
                    </div>
                    {branchData.phone}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Main Main Content Section Section */}
      <section className="py-24">
        <div className="container-max px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-24">
              {/* About Branch */}
              <AnimatedSection>
                 <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                          <Building2 size={24} />
                       </div>
                       <h2 className="text-3xl font-heading font-black text-slate-900 tracking-tight">Center Overview</h2>
                    </div>
                    <p className="text-slate-600 font-medium text-xl leading-relaxed max-w-3xl">
                       {branchData.about || `The OICA ${branchData.name} center is a leading technology hub in the ${branchData.location} district, providing comprehensive IT training and career development programs for students and professionals alike.`}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 pt-6">
                       {[
                         "High-Speed Computing Labs",
                         "Expert 1:1 Lab Guidance",
                         "Project-Based Certifications",
                         "Statewide Placement Network",
                         "Live Industry Workshop",
                         "Student Growth Portal"
                       ].map(f => (
                         <div key={f} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-3 shadow-sm group hover:border-primary/20 transition-all">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                               <CheckCircle2 size={16} />
                            </div>
                            <span className="text-xs font-black text-slate-700 uppercase tracking-wider">{f}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </AnimatedSection>

              {/* Dynamic Campus Gallery */}
              <AnimatedSection>
                 <div className="space-y-10">
                    <div className="flex items-end justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                             <ImageIcon size={24} />
                          </div>
                          <h2 className="text-3xl font-heading font-black text-slate-900 tracking-tight">Campus Gallery</h2>
                       </div>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">Total 10 Media Assets</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                       {dynamicGallery.map((src, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1 }}
                            className={`rounded-[2rem] overflow-hidden border border-white shadow-xl aspect-square relative group ${
                               (i === 0 || i === 3) ? 'md:col-span-2 md:aspect-video' : ''
                            }`}
                          >
                             <img src={src} className="w-full h-full object-cover" alt={`Campus Media ${i+1}`} />
                             <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ExternalLink size={24} className="text-white" />
                             </div>
                          </motion.div>
                       ))}
                    </div>
                 </div>
              </AnimatedSection>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-4 space-y-10">
               {/* Corporate Trust Banner */}
               <AnimatedSection direction="right">
                  <div className="bg-white p-10 rounded-[3rem] border border-orange-100 shadow-xl shadow-orange-900/5 space-y-8 relative overflow-hidden">
                     <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-50" />
                     <h3 className="text-2xl font-heading font-black text-slate-900 flex items-center gap-3">
                        <FileText size={24} className="text-primary" /> Verified Documents
                     </h3>
                     <div className="space-y-4">
                        {[
                          { name: "Center Registration 2026", type: "PDF" },
                          { name: "Trade License Certificate", type: "PDF" },
                          { name: "ISO 9001 Compliance", type: "PDF" },
                          { name: "Affiliation Document", type: "PDF" },
                        ].map(doc => (
                           <div key={doc.name} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-primary/20 transition-all cursor-pointer">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-white shadow-sm text-slate-400 flex items-center justify-center group-hover:text-primary transition-colors">
                                    <FileText size={18} />
                                 </div>
                                 <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider leading-tight">{doc.name}</span>
                              </div>
                              <Download size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                           </div>
                        ))}
                     </div>
                     <div className="pt-4 text-center">
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] inline-block py-2 px-4 bg-slate-50 rounded-full">
                           OICA State-Level Compliant
                        </p>
                     </div>
                  </div>
               </AnimatedSection>

               {/* Quick Action Branding Branding */}
               <AnimatedSection direction="right" delay={0.2}>
                  <div className="p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
                     {/* Dynamic Background Blur */}
                     <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20 group-hover:scale-125 transition-transform" />
                     
                     <h3 className="text-3xl font-heading font-black mb-6 leading-tight">Start Your <span className="text-primary">Journey</span> Today</h3>
                     <p className="text-sm text-white/40 mb-10 font-bold uppercase tracking-widest leading-relaxed">
                        Join 100+ students currently training at this center. Get professional guidance and global certifications.
                     </p>
                     <div className="space-y-4">
                        <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black tracking-widest text-[11px] uppercase rounded-2xl shadow-xl shadow-primary/20">
                           Reserve a Counseling Seat
                        </Button>
                        <Button variant="outline" className="w-full h-16 bg-white/5 border-white/10 text-white hover:bg-white hover:text-slate-900 font-black tracking-widest text-[11px] uppercase rounded-2xl">
                           Call Branch In-Charge
                        </Button>
                     </div>
                  </div>
               </AnimatedSection>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default BranchDetail;
