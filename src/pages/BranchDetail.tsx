import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Image as ImageIcon,
  ArrowLeft,
  CheckCircle2,
  Building2,
  ExternalLink,
  BookOpen,
  Bell,
  Crown,
  Globe,
  Award,
  Facebook,
  Instagram,
  MessageSquare,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStorageData, STORAGE_KEYS } from "@/lib/storage";
import { useState, useEffect, useMemo } from "react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Footer from "@/components/Footer";

const welcomeMessages: { [key: string]: string } = {
	"Talcher": "Welcome to Odisha Institute of Computer Application (OICA), Talcher. We are delighted to have you join our learning community. Get ready to explore new technologies, develop practical skills, and build a successful career in the digital world.",
	"Sonepur": "Welcome to Odisha Institute of Computer Application (OICA), Sonepur. Thank you for choosing us for your computer education journey. Our expert trainers and modern learning environment will help you achieve your goals with confidence.",
	"Ganjam": "Welcome to Odisha Institute of Computer Application (OICA), Ganjam. We warmly welcome all students to a place of knowledge, creativity, and innovation. Together, we will make learning computers simple, exciting, and career-oriented.",
	"Kendrapara": "Welcome to Odisha Institute of Computer Application (OICA), Kendrapara. Your future in technology starts here. We are committed to providing quality education, hands-on training, and continuous support for your success.",
	"Keonjhar": "Welcome to Odisha Institute of Computer Application (OICA), Keonjhar. It is a pleasure to have you with us. Learn, grow, and prepare yourself for endless opportunities in the IT and computer field.",
	"GothaPatna (Khordha)": "Welcome to Odisha Institute of Computer Application (OICA), GothaPatna (Khordha). We believe every student has the potential to succeed. Our institute is dedicated to guiding you with professional training and practical experience.",
	"Sundargarh": "Welcome to Odisha Institute of Computer Application (OICA), Sundargarh. Thank you for being part of our institute family. Let's work together to turn your dreams into achievements through knowledge and technology."
};

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
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  // Memoize random images so they stay consistent on re-renders within the same session
  const dynamicGallery = useMemo(() => {
    return [...ACADEMY_IMAGES].sort(() => Math.random() - 0.5);
  }, [id]);

  const randomHeroBg = useMemo(() => {
    return `https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop`; // Modern Office/Center
  }, [id]);

  useEffect(() => {
    const branches = getStorageData(STORAGE_KEYS.BRANCHES);
    const normalizedId = (id || '').toLowerCase().replace(/\s/g, '');
    
    // Handle aliases: khurda -> gothapatna(khordha) (correct district name is Khordha)
    const aliases: Record<string, string> = {
      'khurda': 'gothapatna(khordha)',
      'khordha': 'gothapatna(khordha)',
      'gothapatna': 'gothapatna(khordha)'
    };
    
    const searchId = aliases[normalizedId] || normalizedId;

    // Match by location or id — handles "Bhubaneswar HQ" URL param
    const found = branches.find((b: any) => {
      const normalizedLocation = b.location.toLowerCase().replace(/\s/g, '');
      const normalizedBranchId = b.id.toLowerCase().replace(/\s/g, '');
      
      return normalizedLocation === searchId || normalizedBranchId === searchId || 
             b.location === id || b.id === id;
    });
    
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
    <div className="min-h-screen bg-[#FDFBF7] font-poppins">
      {/* Hero Hero Hero Section */}
      <section className="relative h-[35vh] md:h-[40vh] flex items-end overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img src={randomHeroBg} className="w-full h-full object-cover" alt="Branch Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        </motion.div>
        
        <div className="container-max px-6 md:px-10 pb-12 relative z-10 text-white w-full">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <Link to="/branches" className="inline-flex items-center gap-2 text-white/50 hover:text-white group transition-all text-[10px] font-bold uppercase tracking-widest">
                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK TO NETWORK
              </Link>
              
              <div className="flex items-center gap-4">
                 <Link to="/contact">
                    <button className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white text-[11px] font-black uppercase tracking-[0.15em] border border-white/20 transition-all shadow-xl group">
                       <MessageSquare size={18} className="text-primary group-hover:scale-110 transition-transform" /> Contact Office
                    </button>
                 </Link>
                 <div className="flex gap-2">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <button className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#1877F2] backdrop-blur-md rounded-xl text-white border border-white/20 transition-all group">
                           <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <button className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] backdrop-blur-md rounded-xl text-white border border-white/20 transition-all group">
                           <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </a>
                 </div>
              </div>
           </div>

           <div className="max-w-5xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                 <span className="px-4 py-1.5 bg-primary/30 backdrop-blur-md text-white text-[9px] font-black rounded-lg uppercase tracking-widest border border-white/10 shadow-lg">
                    {branchData.location}
                 </span>
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/30 backdrop-blur-md rounded-lg text-emerald-400 font-black text-[9px] uppercase tracking-widest border border-emerald-500/20 shadow-lg">
                    <ShieldCheck size={12} /> Verified Center
                 </div>
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95] text-white uppercase drop-shadow-2xl"
              >
                {branchData.name}
              </motion.h1>
              <div className="flex flex-wrap gap-x-10 gap-y-4 text-xs font-bold text-white/70">
                 <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                    <MapPin size={16} className="text-primary" />
                    {branchData.address}
                 </div>
                 <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                    <Phone size={16} className="text-primary" />
                    {branchData.phone}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ===== HQ-ONLY PREMIUM BANNER ===== */}
      {branchData.location === "Bhubaneswar HQ" && (
        <section className="relative py-12 bg-slate-950 overflow-hidden border-y border-amber-500/20">
          <div className="container-max px-6 md:px-10 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/40 shrink-0">
                  <Crown size={28} className="text-slate-900" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block mb-1">Central Headquarters</span>
                  <h2 className="text-xl font-bold text-white">The Flagship Campus of OICA</h2>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Globe, label: "Pan-Odisha" },
                  { icon: Award, label: "ISO Certified" },
                  { icon: ShieldCheck, label: "Govt. Regd" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                    <item.icon size={14} className="text-amber-400" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Main Content Section Section */}
      <section className="pt-12 md:pt-16 pb-0">
        <div className="container-max px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12 md:space-y-16">
              {/* About Branch */}
              <AnimatedSection>
                 <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                          <Building2 size={20} />
                       </div>
                       <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Center Overview</h2>
                    </div>
                    <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-3xl">
                       {branchData.about || welcomeMessages[branchData.location] || `The OICA ${branchData.name} center is a leading technology hub in the ${branchData.location} district, providing comprehensive IT training and career development programs.`}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3 pt-4">
                       {[
                         "High-Speed Computing Labs",
                         "Expert 1:1 Lab Guidance",
                         "Project Certifications",
                         "Placement Network",
                         "Industry Workshops",
                         "Student Portal"
                       ].map(f => (
                         <div key={f} className="p-3.5 bg-white border border-slate-200/60 rounded-xl flex items-center gap-2.5 shadow-sm group hover:border-primary/20 transition-all">
                            <CheckCircle2 size={14} className="text-emerald-500" />
                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">{f}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </AnimatedSection>

              {/* Branch Courses */}
              <AnimatedSection>
                 <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                          <BookOpen size={20} />
                       </div>
                       <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Courses</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                       {['Advanced Excel & Tally ERP', 'Diploma in Computer Application', 'Full Stack Development', 'Graphic & Video Editing'].map((course, i) => (
                          <div key={i} className="p-4 bg-white border border-slate-200/60 rounded-xl shadow-sm">
                             <h4 className="font-bold text-slate-900 text-sm mb-1">{course}</h4>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">6 Months • Cert</p>
                          </div>
                       ))}
                    </div>
                 </div>
              </AnimatedSection>


              {/* Google Maps Location & Video */}
              <AnimatedSection>
                 <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
                          <MapPin size={20} />
                       </div>
                       <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Location & Directions</h2>
                    </div>
                     <div className="w-full h-[350px] rounded-xl overflow-hidden shadow-lg border border-slate-200/60 relative group">
                        <iframe 
                           src={`https://maps.google.com/maps?q=${encodeURIComponent(branchData.name + " " + branchData.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                           width="100%" 
                           height="100%" 
                           style={{ border: 0 }} 
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm border border-slate-200">
                           Center Map
                        </div>
                     </div>
                 </div>
              </AnimatedSection>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-4 space-y-6 md:space-y-8">
               {/* Notice Board */}
                <AnimatedSection direction="right">
                   <div className="bg-white p-8 rounded-xl border border-slate-200/60 shadow-sm space-y-6 relative overflow-hidden">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                         <Bell size={20} className="text-primary" /> Notice Board
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                         Live updates from {branchData.name} campus.
                      </p>
                      <div className="space-y-3">
                        {(branchData.notices || []).map((notice: any, i: number) => (
                           <div key={i} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 group hover:bg-white hover:border-primary/20 transition-all cursor-pointer">
                              <span className="text-[9px] font-black text-primary uppercase tracking-wider block mb-1">{notice.date}</span>
                              <p className="text-xs font-bold text-slate-700 leading-tight group-hover:text-primary transition-colors">{notice.title}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </AnimatedSection>

               {/* Quick Action Branding Branding */}
               <AnimatedSection direction="right" delay={0.2}>
                  <div className="p-8 bg-slate-900 text-white rounded-xl shadow-2xl relative overflow-hidden group">
                     <h3 className="text-xl font-bold mb-4 leading-tight">Start Your <span className="text-primary">Journey</span> Today</h3>
                     <p className="text-[10px] text-white/40 mb-8 font-bold uppercase tracking-widest leading-relaxed">
                        Join 100+ students at this center. Get professional guidance and global certifications.
                     </p>
                     <div className="space-y-3">
                        <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold tracking-widest text-[10px] uppercase rounded-lg shadow-xl shadow-primary/20">
                           Reserve A Seat
                        </Button>
                        <Button variant="outline" className="w-full h-12 bg-white/5 border-white/10 text-white hover:bg-white hover:text-slate-900 font-bold tracking-widest text-[10px] uppercase rounded-lg">
                           Contact Office
                        </Button>
                     </div>
                  </div>
               </AnimatedSection>

               {/* Virtual Tour Tour Tour Sidebar Sidebar */}
               <AnimatedSection direction="right" delay={0.3}>
                  <div 
                    onClick={() => branchData.locationVideo && setIsVideoModalOpen(true)}
                    className={`w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-200/60 relative group bg-slate-100 ${branchData.locationVideo ? 'cursor-zoom-in' : ''}`}
                  >
                     {branchData.locationVideo ? (
                        <>
                           <video 
                              src={branchData.locationVideo} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              autoPlay 
                              loop 
                              muted 
                              playsInline
                           />
                           <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                                 <ExternalLink size={24} />
                              </div>
                           </div>
                        </>
                     ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
                           <motion.div
                              animate={{ x: [0, 20, 0] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="mb-4"
                           >
                              <Building2 size={40} className="text-primary/40" />
                           </motion.div>
                           <h4 className="text-xs font-bold mb-2 uppercase tracking-widest">Virtual Location Tour</h4>
                           <p className="text-[9px] text-white/50 font-medium leading-relaxed max-w-[160px]">
                              See the campus surroundings and landmarks.
                           </p>
                           <div className="absolute bottom-4 right-4 bg-primary/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-[8px] font-bold uppercase tracking-widest border border-primary/20">
                              LIVE FEED
                           </div>
                        </div>
                     )}
                     <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-white shadow-sm">
                        Campus Surroundings
                     </div>
                  </div>
               </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Campus Gallery - Expanded Full Width */}
      <section className="pt-2 pb-6 md:pb-8 bg-slate-50/30">
        <div className="container-max px-6 md:px-10">
          <AnimatedSection>
            <div className="space-y-8 md:space-y-10">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-sm">
                  <ImageIcon size={28} />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight uppercase">Campus Gallery</h2>
                <div className="w-20 h-1.5 bg-primary rounded-full" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {dynamicGallery.slice(0, 10).map((src, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl aspect-[4/5] relative group"
                  >
                    <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <ExternalLink size={18} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />

      {/* Video Modal - Cinematic Full Screen */}
      <AnimatePresence>
        {isVideoModalOpen && branchData.locationVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>

              <video 
                src={branchData.locationVideo}
                className="w-full h-full object-contain bg-black"
                autoPlay
                controls
                playsInline
              />

              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between pointer-events-none">
                 <div className="bg-slate-950/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Now Playing</p>
                    <h4 className="text-white text-sm font-bold">{branchData.name} Tour</h4>
                 </div>
                 <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-primary/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">4K CINEMATIC FEED</span>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BranchDetail;
