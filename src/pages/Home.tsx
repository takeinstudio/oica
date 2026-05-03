import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Users, 
  ArrowRight, Star, Shield, Camera, Maximize2,
  GraduationCap, Mail, Quote, Bell, MapPin,
  Calendar, Paperclip
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { getStorageData, STORAGE_KEYS } from "@/lib/storage";

const stats = [
  { value: "12+", label: "YEARS EXP." },
  { value: "5000+", label: "STUDENTS" },
  { value: "20+", label: "BRANCHES" },
  { value: "ISO", label: "CERTIFIED" },
];

const features = [
  {
    icon: Users,
    title: "High Trade Interface",
    desc: "Maintaining high trade and industry interface to keep students updated with market trends."
  },
  {
    icon: Shield,
    title: "Self-Confidence",
    desc: "Strong focus on developing self-confidence, self-reliance, and reasoning abilities."
  },
  {
    icon: Camera,
    title: "AV Presentations",
    desc: "Modern teaching methodology using Audio, Video, and Slide presentations for better learning."
  },
  {
    icon: GraduationCap,
    title: "1-to-1 Sessions",
    desc: "Dedicated practical sessions with one-to-one computer access for every student."
  },
  {
    icon: Star,
    title: "Workshops",
    desc: "Regular workshops and seminars to bridge the gap between academia and industry."
  },
];

const popularCourses = [
  { title: "Advanced Office", icon: "AO", color: "from-blue-600 to-cyan-500", desc: "Master MS Office suite with advanced features including Excel, Word and Powerpoint." },
  { title: "Tally ERP.9", icon: "T9", color: "from-emerald-600 to-teal-500", desc: "Complete accounting with Tally ERP software including GST and inventory management." },
  { title: "PGDCA", icon: "P", color: "from-violet-600 to-purple-500", desc: "Post Graduate Diploma in Computer Application - Advanced level software development." },
  { title: "DFA", icon: "DFA", color: "from-rose-600 to-pink-500", desc: "Diploma in Financial Accounting - Foundation of modern accounting systems." },
  { title: "Photoshop", icon: "Ps", color: "from-orange-600 to-amber-500", desc: "Professional graphic design and image editing with Adobe Photoshop." },
];

const achievers = [
  { 
    name: "Rahul Mohanty", 
    role: "Software Engineer", 
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374",
    review: "The practical training at OICA helped me secure my dream job. The curriculum is perfectly aligned with industry needs."
  },
  { 
    name: "Priya Das", 
    role: "Data Analyst", 
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374",
    review: "OICA's advanced courses provided me with the analytical skills I needed to transition into data science smoothly."
  },
  { 
    name: "Sanjay Kumar", 
    role: "UI Designer", 
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470",
    review: "The design tools and workshops offered here gave me the creative foundation and technical edge to excel."
  },
];

const homeGallery = [
  "https://images.unsplash.com/photo-1523050337456-5d55f21af557?q=80&w=1471",
  "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1470",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470",
];


const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress: _scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Dynamic notices from all branches
  const [allNotices, setAllNotices] = useState<{title: string; date: string; branch: string; location: string}[]>([]);
  // Dynamic testimonials
  const [dynamicTestimonials, setDynamicTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const branches = getStorageData(STORAGE_KEYS.BRANCHES);
    const collected: {title: string; date: string; branch: string; location: string}[] = [];
    branches.forEach((b: any) => {
      if (b.notices && b.notices.length > 0) {
        b.notices.forEach((n: any) => {
          collected.push({ title: n.title, date: n.date, branch: b.name, location: b.location });
        });
      }
    });
    setAllNotices(collected);

    // Fetch approved feedback
    const allFeedback = getStorageData(STORAGE_KEYS.FEEDBACK);
    const approved = allFeedback.filter((f: any) => f.status === 'approved');
    setDynamicTestimonials(approved.length > 0 ? approved : achievers);
  }, []);
  // Dual video crossfade logic
  const [activeVideo, setActiveVideo] = useState<0 | 1>(() => (Math.random() > 0.5 ? 1 : 0));
  const video0Ref = useRef<HTMLVideoElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Start playing both videos immediately; control visibility via opacity
    video0Ref.current?.play().catch(() => {});
    video1Ref.current?.play().catch(() => {});

    const interval = setInterval(() => {
      setActiveVideo(prev => {
        const next = prev === 0 ? 1 : 0;
        // Reset and replay the video that's about to become active
        const nextRef = next === 0 ? video0Ref.current : video1Ref.current;
        if (nextRef) {
          nextRef.currentTime = 0;
          nextRef.play().catch(() => {});
        }
        return next;
      });
    }, 9000); // switch every 9 seconds

    return () => clearInterval(interval);
  }, []);


  const galleryRef = useRef(null);
  const { scrollYProgress: galleryScroll } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });
  const yGallery1 = useTransform(galleryScroll, [0, 1], ["10%", "-10%"]);
  const yGallery2 = useTransform(galleryScroll, [0, 1], ["-10%", "10%"]);

  return (
    <div className="min-h-screen font-poppins antialiased" ref={containerRef}>
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center pt-[130px] lg:pt-[110px] overflow-hidden">
        {/* Dual Video Background with Crossfade */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          {/* Video 0 — hero1.mp4 */}
          <motion.video
            ref={video0Ref}
            muted
            playsInline
            loop
            animate={{ opacity: activeVideo === 0 ? 0.82 : 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072"
          >
            <source src="/hero1.mp4" type="video/mp4" />
          </motion.video>

          {/* Video 1 — hero2.mp4 */}
          <motion.video
            ref={video1Ref}
            muted
            playsInline
            loop
            animate={{ opacity: activeVideo === 1 ? 0.82 : 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
          >
            <source src="/hero2.mp4" type="video/mp4" />
          </motion.video>

          {/* Multi-Stage Cinematic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-20 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 border border-secondary/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-secondary/10"
              >
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[11px] font-black text-secondary uppercase tracking-[0.2em]">Excellence in Computer Education</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-black text-white leading-[0.95] tracking-tighter mb-4 filter drop-shadow-2xl">
                <span className="text-white">Odisha Institute </span> <br />
                <span className="text-secondary text-5xl md:text-6xl">of Computer Application</span>
              </h1>

              <p className="text-base md:text-lg text-white/90 font-medium max-w-xl leading-relaxed mb-8 tracking-tight">
                Excellence in education for comprehensive skill development. Join our premier institution with proven results and dedicated mentorship across Odisha.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/courses">
                  <Button size="lg" className="rounded-xl px-8 py-6 font-black text-xs tracking-widest uppercase h-auto shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 transition-all hover:scale-105 active:scale-95 bg-secondary text-slate-900 border-none">
                    Explore Programs
                    <ArrowRight className="ml-3 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" className="rounded-xl px-8 py-6 font-black text-xs tracking-widest uppercase h-auto backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
                    Contact Us
                    <Mail className="ml-3 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column (Floating Cards Layout) */}
            <div className="relative hidden lg:block h-[500px]">
              {/* Expert Faculty Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute top-0 right-10 w-60 p-5 bg-secondary rounded-3xl shadow-2xl shadow-secondary/20 z-20 group"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-slate-900 mb-3 group-hover:scale-110 transition-transform">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-base font-heading font-black text-slate-900 mb-1">Expert Faculty</h3>
                <p className="text-slate-800 text-[11px] font-bold leading-relaxed opacity-80">
                  Master computer science with industry-experienced professionals.
                </p>
              </motion.div>

              {/* Trusted Community Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50, y: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute top-40 right-0 w-60 p-5 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl z-30 group"
              >
                <div className="w-12 h-12 bg-secondary/80 rounded-xl flex items-center justify-center text-slate-900 mb-4 group-hover:scale-110 transition-transform">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-heading font-black text-white mb-1">Trusted Community</h3>
                <p className="text-white/70 text-[11px] font-bold leading-relaxed">
                  Trusted by 5000+ students across Odisha since 2014.
                </p>
              </motion.div>

              {/* Results Excellence Card */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-0 right-0 left-20 p-6 bg-rose-600 rounded-3xl shadow-2xl shadow-rose-900/40 z-10 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform">
                  <Star size={80} />
                </div>
                <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em] mb-2 block">Results Excellence</span>
                <h3 className="text-2xl font-heading font-black text-white mb-1 leading-tight">100+ Success Stories</h3>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                  In Top Educational Institutions <ArrowRight size={12} />
                </p>
              </motion.div>
            </div>
          </div>
        </div>

      </section>

      {/* ABOUT & NOTICE COMBINED SECTION — High Density SaaS Layout */}
      <section className="section-padding relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: About Us Content */}
            <div className="lg:col-span-7 space-y-8">
              <AnimatedSection>
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest">What's New</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 leading-tight tracking-tight">
                  ABOUT <span className="text-primary italic">OICA</span>
                </h2>
                <div className="space-y-6 text-slate-600 font-medium leading-relaxed max-w-2xl">
                  <p className="text-lg text-slate-700 font-bold">
                    Odisha Institute of Computer Application is a premier educational institution registered under Govt. of Odisha and ISO 9001:2008 certified.
                  </p>
                  <p>
                    Our journey is defined by a unique training methodology that balances rigorous theoretical knowledge with extensive 1-to-1 practical sessions. We believe that discipline and quality education are the backbones of any successful career.
                  </p>
                  <p>
                    With over 31+ branches across Odisha, we are committed to making technology easy to learn and accessible to every student, ensuring they are industry-ready from day one.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/about">
                    <Button size="lg" className="rounded-2xl px-10 h-14 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20">
                      Read More
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button variant="outline" size="lg" className="rounded-2xl px-10 h-14 font-black uppercase text-[10px] tracking-widest bg-white">
                      Our Courses
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column: Compact Notice Board */}
            <div className="lg:col-span-5">
              <AnimatedSection direction="right">
                <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-700 to-cyan-500 shadow-2xl p-6 md:p-8">
                  {/* Header Section */}
                  <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-heading font-black text-white tracking-tight">
                        Latest Announcements
                      </h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-[8px] font-black uppercase tracking-widest backdrop-blur-md">
                        Updates
                      </div>
                    </div>
                    <Link to="/branches">
                      <Button className="bg-white text-blue-600 font-black text-[9px] uppercase tracking-widest px-4 py-4 h-auto rounded-xl shadow-lg transition-all hover:scale-105">
                        All Notifications
                      </Button>
                    </Link>
                  </div>

                  {/* Scrolling Notice Container */}
                  <div className="relative z-10 h-[380px] overflow-hidden group">
                    <div className="flex flex-col gap-3 animate-vertical-marquee group-hover:pause">
                      {[...allNotices, ...allNotices].map((notice, i) => (
                        <Link 
                          to={`/branch/${notice.location}`}
                          key={i} 
                          className="bg-white rounded-2xl p-5 flex gap-4 shadow-md shadow-blue-900/10 hover:shadow-xl transition-all duration-300 group/card cursor-pointer shrink-0 border border-white/50"
                        >
                          {/* Calendar Icon Square */}
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shrink-0 group-hover/card:scale-110 transition-transform">
                            <Calendar size={18} />
                          </div>

                          {/* Content Section */}
                          <div className="flex-1 space-y-1.5 min-w-0">
                            <p className="text-[13px] font-heading font-black text-slate-900 leading-none">
                              {notice.date}
                            </p>
                            <p className="text-slate-500 text-[11px] font-medium leading-relaxed line-clamp-2 mb-2">
                              {notice.title} from <span className="text-blue-600 font-bold">{notice.branch}</span> center.
                            </p>
                            
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-widest">
                              <Paperclip size={10} />
                              View Notice
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Scrollbar Decoration */}
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/10 rounded-full" />
                    
                    {/* Gradient Fades */}
                    <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-blue-700/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-cyan-500/20 to-transparent pointer-events-none" />
                  </div>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar — Moved below About Us */}
      <section className="relative z-40 -mt-10 mb-12">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 overflow-hidden"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center py-6 px-4 hover:bg-slate-50 transition-colors group">
                <div className="text-2xl md:text-3xl font-heading font-black text-slate-900 mb-0.5 tracking-tight group-hover:text-primary transition-colors">{stat.value}</div>
                <div className="text-[9px] font-black text-slate-400 tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes vertical-marquee {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-vertical-marquee {
          animation: vertical-marquee ${Math.max(allNotices.length * 3, 20)}s linear infinite;
        }
        .pause {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Director's Message Section */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection className="text-center mb-10">
              <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 block">Leadership</span>
              <h2 className="text-3xl font-heading font-black mb-4">Director's Message</h2>
              <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100 relative">
              <div className="absolute top-6 left-6 text-primary shadow-sm h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center -rotate-12">
                <GraduationCap size={20} />
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed italic font-medium text-sm">
                <p>
                  "It is my pleasure and pride to welcome you to the Odisha Institute of Computers Application (OICA). Our prime aim is to make technology easy to learn."
                </p>
                <p>
                  "The major objective of establishing OICA is to completely develop professionals with a positive attitude. We guide students at every step."
                </p>
                <div className="pt-4 mt-4 border-t border-slate-50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100" />
                  <div>
                    <p className="not-italic font-black text-slate-900 text-xs uppercase tracking-widest">Director OICA</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Success Awaits</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Training Methodology Section — Process Path Design */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="section-container">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 block">Our Success Mantra</span>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 tracking-tight">Training Methodology</h2>
          </AnimatedSection>

          <div className="relative">
             {/* Desktop Connecting Line */}
             <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-100 -translate-y-1/2 hidden md:block" />
             
             <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                {[
                  { id: "01", title: "Theory", color: "from-blue-500 to-blue-600", desc: "Foundational knowledge sessions" },
                  { id: "02", title: "Practical", color: "from-emerald-500 to-teal-600", desc: "Hands-on lab exercises" },
                  { id: "03", title: "Doubt", color: "from-violet-500 to-purple-600", desc: "1-to-1 query resolution" },
                  { id: "04", title: "Assign", color: "from-orange-500 to-amber-600", desc: "Real-world project tasks" },
                  { id: "05", title: "Exam", color: "from-rose-500 to-pink-600", desc: "Performance assessment" },
                ].map((m, i) => (
                  <AnimatedSection key={m.title} delay={i * 0.15}>
                    <div className="group relative text-center">
                       {/* Floating Number Card */}
                       <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${m.color} text-white flex items-center justify-center font-black text-2xl mb-6 shadow-2xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500 relative z-20`}>
                          {m.id}
                       </div>
                       <h3 className="font-heading font-black text-lg text-slate-900 mb-2">{m.title}</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.desc}</p>
                       
                       {/* Mobile Connector */}
                       {i < 4 && <div className="h-8 w-0.5 border-l-2 border-dashed border-slate-100 mx-auto mt-4 md:hidden" />}
                    </div>
                  </AnimatedSection>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Why Choose OICA — Bento Grid Layout */}
      <section className="section-padding relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-12 gap-6">
             {/* Left Text Box */}
             <div className="lg:col-span-4 self-center space-y-6">
                <AnimatedSection>
                  <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 block">Premium Features</span>
                  <h2 className="text-4xl font-heading font-black text-slate-900 leading-tight">
                    Why Choose <br /> <span className="text-primary italic text-5xl">OICA?</span>
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    We don't just teach software; we build professional careers with a focus on industry standards and individual growth.
                  </p>
                </AnimatedSection>
             </div>

             {/* Bento Grid Features */}
             <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
                {[
                  { 
                    icon: Shield, 
                    title: "High Trade Interface", 
                    desc: "Maintaining high trade and industry interface to keep students updated with market trends.",
                    size: "md:col-span-1"
                  },
                  { 
                    icon: Star, 
                    title: "Self-Confidence", 
                    desc: "Strong focus on developing self-confidence, self-reliance, and reasoning abilities.",
                    size: "md:col-span-1"
                  },
                  { 
                    icon: Camera, 
                    title: "AV Presentations", 
                    desc: "Modern teaching methodology using Audio, Video, and Slide presentations for better learning.",
                    size: "md:col-span-1"
                  },
                  { 
                    icon: Users, 
                    title: "1-to-1 Sessions", 
                    desc: "Dedicated practical sessions with one-to-one computer access for every student.",
                    size: "md:col-span-1"
                  }
                ].map((f, i) => (
                  <AnimatedSection key={f.title} delay={i * 0.1} className={f.size}>
                    <div className="h-full bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform">
                          <f.icon size={80} />
                       </div>
                       <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                          <f.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                       </div>
                       <h3 className="font-heading font-black text-xl mb-4 text-slate-900 leading-tight">{f.title}</h3>
                       <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Our Programs — Premium Interactive Cards */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <AnimatedSection>
              <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 block">Our Programs</span>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 tracking-tight">
                Master the <span className="text-primary italic">Digital World</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Link to="/courses">
                <Button variant="outline" size="lg" className="rounded-2xl px-8 h-14 font-black text-[10px] uppercase tracking-widest border-slate-200 hover:border-primary hover:text-primary transition-all">
                  Explore All Programs <ArrowRight className="w-4 h-4 ml-3" />
                </Button>
              </Link>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "ADCA", 
                code: "AO", 
                full: "Advanced Office",
                desc: "Master MS Office suite with advanced features including Excel, Word and Powerpoint.",
                color: "from-blue-600 to-indigo-700",
                meta: ["12 Months", "10th Pass"]
              },
              { 
                title: "Tally Prime", 
                code: "T9", 
                full: "Tally ERP.9",
                desc: "Complete accounting with Tally ERP software including GST and inventory management.",
                color: "from-emerald-500 to-teal-700",
                meta: ["03 Months", "10th Pass"]
              },
              { 
                title: "PGDCA", 
                code: "P", 
                full: "PGDCA",
                desc: "Post Graduate Diploma in Computer Application - Advanced level software development.",
                color: "from-violet-600 to-purple-800",
                meta: ["12 Months", "Graduation"]
              },
              { 
                title: "DFA", 
                code: "DFA", 
                full: "DFA",
                desc: "Diploma in Financial Accounting - Foundation of modern accounting systems.",
                color: "from-rose-500 to-orange-600",
                meta: ["06 Months", "10th Pass"]
              }
            ].map((course, i) => (
              <AnimatedSection key={course.title} delay={i * 0.1}>
                <div className="group h-full bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:bg-white transition-all duration-500 flex flex-col relative overflow-hidden">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} text-white flex items-center justify-center font-black text-xl mb-8 shadow-xl shadow-blue-500/10 group-hover:scale-110 transition-transform duration-500`}>
                    {course.code}
                  </div>
                  <div className="space-y-3 mb-8">
                    <h3 className="font-heading font-black text-2xl text-slate-900 leading-tight group-hover:text-primary transition-colors">{course.full}</h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-3">{course.desc}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {course.meta.map(m => (
                      <span key={m} className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400">
                        {m}
                      </span>
                    ))}
                  </div>

                  <Link to="/apply" className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between group/link">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover/link:text-primary transition-colors">Enroll Now</span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center transition-all group-hover/link:bg-primary group-hover/link:text-white shadow-sm">
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life — Premium Bento Gallery */}
      <section ref={galleryRef} className="section-padding relative overflow-hidden">
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 flex items-center justify-center gap-2">
              <Camera className="w-4 h-4" /> Visual Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 tracking-tight">
              Explore Our <span className="text-primary italic">Campus Life</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 h-auto md:h-[600px]">
             {/* Large Main Feature */}
             <div className="md:col-span-2 md:row-span-2 rounded-[3rem] overflow-hidden group relative shadow-2xl">
                <img src={homeGallery[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Gallery" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                   <div className="text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-primary">Lab Sessions</p>
                      <h3 className="text-2xl font-black">Modern Computing Lab</h3>
                   </div>
                </div>
             </div>
             
             {/* Top Right Box */}
             <div className="md:col-span-2 rounded-[2.5rem] overflow-hidden group relative shadow-xl h-[250px]">
                <img src={homeGallery[1]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Gallery" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 size={20} />
                   </div>
                </div>
             </div>

             {/* Bottom Two Boxes */}
             <div className="rounded-[2.5rem] overflow-hidden group relative shadow-xl h-[326px]">
                <img src={homeGallery[2]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Gallery" />
             </div>
             <div className="rounded-[2.5rem] overflow-hidden group relative shadow-xl h-[326px]">
                <img src={homeGallery[3]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Gallery" />
             </div>
          </div>

          <AnimatedSection className="text-center">
            <Link to="/gallery">
              <Button size="lg" className="rounded-2xl px-12 h-16 text-[12px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                View Full Experience <ArrowRight className="w-4 h-4 ml-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>



      {/* Success Stories — Refined Design from Reference */}
      <section id="testimonials" className="py-32 relative overflow-hidden">
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-purple-100/80 backdrop-blur-md border border-purple-200 text-purple-700 text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
              Voices of Excellence
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900 leading-tight tracking-tight">
              Success Stories <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">That Inspire</span>
            </h2>
            <p className="text-slate-500 mt-6 text-lg font-medium max-w-2xl mx-auto">
              Real transformations from our community of learners
            </p>
            {/* Visual Divider */}
            <div className="flex justify-center gap-1 mt-6">
              <div className="w-8 h-1 rounded-full bg-purple-500" />
              <div className="w-3 h-1 rounded-full bg-pink-400" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...dynamicTestimonials, ...achievers].slice(0, 4).map((a, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group relative bg-white/70 backdrop-blur-xl border border-white/80 p-6 rounded-[2rem] flex flex-col h-full transition-all shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(109,40,217,0.06)] overflow-hidden"
                >
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-400">
                      <Quote size={16} fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-slate-700 font-medium leading-relaxed text-[13px] mb-8 flex-1 line-clamp-4">
                    "{a.review || a.comment || a.desc || 'The computer center provides an excellent learning environment that truly support students in building strong technical skills.'}"
                  </p>

                  {/* Profile Section */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={a.img || a.studentPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} 
                        alt={a.name || a.studentName} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" 
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-slate-900 text-[10px] uppercase tracking-wider mb-0.5">
                        {a.name || a.studentName}
                      </h3>
                      <span className="text-blue-600 text-[8px] font-black uppercase tracking-widest">Verified</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-16 text-center">
            <Link to="/testimonials">
              <Button variant="outline" size="lg" className="rounded-2xl px-12 h-14 text-[11px] font-black uppercase tracking-widest border-purple-200 text-purple-700 hover:bg-purple-50 transition-all bg-white/50 backdrop-blur-md">
                View All Success Stories <ArrowRight className="w-4 h-4 ml-3" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
