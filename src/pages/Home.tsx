import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Users,
  ArrowRight, Star, Shield, Camera,
  GraduationCap, Mail
} from "lucide-react";
import { useRef } from "react";

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
  { name: "Rahul Mohanty", role: "Software Engineer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374" },
  { name: "Priya Das", role: "Data Analyst", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374" },
  { name: "Sanjay Kumar", role: "UI Designer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470" },
];

const homeGallery = [
  "https://images.unsplash.com/photo-1523050337456-5d55f21af557?q=80&w=1471",
  "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1470",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470",
];

const notices = [
  "New Admissions Started for 2026 Batch",
  "Free Computer Courses Started on April 2025",
  "Summer Courses Started - Register Now",
  "Central and State Government Free Courses Available",
];

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress: _scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });


  const galleryRef = useRef(null);
  const { scrollYProgress: galleryScroll } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });
  const yGallery1 = useTransform(galleryScroll, [0, 1], ["10%", "-10%"]);
  const yGallery2 = useTransform(galleryScroll, [0, 1], ["-10%", "10%"]);

  return (
    <div className="min-h-screen" ref={containerRef}>
      {/* Cinematic Hero Section */}
      <section className="relative h-screen flex items-center pt-[130px] lg:pt-[110px] overflow-hidden">
        {/* Full-Screen Video Background */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60"
              poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Multi-Stage Cinematic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-20">
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 border border-secondary/30 rounded-full mb-8 backdrop-blur-md shadow-lg shadow-secondary/10"
              >
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[11px] font-black text-secondary uppercase tracking-[0.2em]">Excellence in Computer Education</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter mb-6 filter drop-shadow-2xl">
                <br />
                <span className="text-white">Odisha Institute </span> <br />
                <span className="text-secondary text-5xl md:text-7xl">of Computer Application</span>
              </h1>

              <p className="text-base md:text-lg text-white/80 font-medium max-w-xl leading-relaxed mb-10 tracking-tight">
                Excellence in education for comprehensive skill development. Join our premier institution with proven results and dedicated mentorship across Odisha.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link to="/courses">
                  <Button size="lg" className="rounded-2xl px-10 py-7 font-black text-xs tracking-widest uppercase h-auto shadow-2xl shadow-secondary/20 hover:shadow-secondary/40 transition-all hover:scale-105 active:scale-95 bg-secondary text-slate-900 border-none">
                    Explore Programs
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" className="rounded-2xl px-10 py-7 font-black text-xs tracking-widest uppercase h-auto backdrop-blur-md bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
                    Contact Us
                    <Mail className="ml-3 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column (Floating Cards Layout) */}
            <div className="relative hidden lg:block h-[600px]">
              {/* Expert Faculty Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute top-20 right-20 w-64 p-6 bg-secondary rounded-[2.5rem] shadow-2xl shadow-secondary/20 z-20 group"
              >
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-slate-900 mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-lg font-heading font-black text-slate-900 mb-2">Expert Faculty</h3>
                <p className="text-slate-800 text-xs font-bold leading-relaxed opacity-80">
                  Master computer science with industry-experienced professionals guiding your career journey.
                </p>
              </motion.div>

              {/* Trusted Community Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute top-52 left-0 w-64 p-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl z-30 group"
              >
                <div className="w-14 h-14 bg-secondary/80 rounded-2xl flex items-center justify-center text-slate-900 mb-6 group-hover:scale-110 transition-transform">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-heading font-black text-white mb-2">Trusted Community</h3>
                <p className="text-white/60 text-xs font-bold leading-relaxed">
                  Trusted by 5000+ students across Odisha since 2014. A legacy of excellence in training.
                </p>
              </motion.div>

              {/* Results Excellence Card */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-0 right-0 left-20 p-10 bg-rose-600 rounded-[3rem] shadow-2xl shadow-rose-900/40 z-10 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform">
                  <Star size={100} />
                </div>
                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4 block">Results Excellence</span>
                <h3 className="text-4xl font-heading font-black text-white mb-2 leading-tight">100+ Success <br /> Stories</h3>
                <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest mt-4 flex items-center gap-2">
                  In Top Educational Institutions <ArrowRight size={14} />
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] font-sans">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
          />
        </div>

        {/* Integrated Notice Board at bottom of Hero */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary py-3 z-30 overflow-hidden border-t border-white/10">
          <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
            {notices.concat(notices).map((notice, i) => (
              <div key={i} className="flex items-center gap-3 text-white font-bold text-[10px] uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                {notice}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Stats Bar */}
      <section className="relative z-40">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 overflow-hidden -translate-y-1/2"
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

      {/* Welcome Section */}
      <section className="section-padding relative">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-2xl" />
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1470" alt="About OICA" className="relative rounded-2xl shadow-xl border border-slate-100 object-cover aspect-video w-full" />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-slate-100 max-w-[200px]">
                  <p className="font-heading font-black text-sm mb-0.5">Empowering Odisha</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Digital Future</p>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 block">Welcome to OICA</span>
              <h2 className="text-2xl md:text-4xl font-heading font-black mb-4 leading-tight">
                Pioneering <span className="text-primary">Computer Education</span>
              </h2>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                <p>
                  Odisha institution of Computer Application is an educational institution which is registered under Govt. of Odisha and it is also certified with an ISO 9001:2008 certified institute.
                </p>
                <p>
                  It has its own and unique training program methodology, which imparts highest theory & practical timings in computer education. Discipline and quality of education is the backbone of the organization.
                </p>
              </div>
              <Link to="/about">
                <Button size="default" className="rounded-xl px-6 h-11 text-xs font-black uppercase tracking-widest shadow-md">
                  Learn More
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

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

      {/* Training Methodology Section */}
      <section className="section-padding">
        <div className="section-container">
          <AnimatedSection className="text-center mb-12">
            <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 block">Our Success Mantra</span>
            <h2 className="text-3xl font-heading font-black">Training Methodology</h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { id: "01", title: "Theory", color: "bg-blue-500" },
              { id: "02", title: "Practical", color: "bg-emerald-500" },
              { id: "03", title: "Doubt", color: "bg-violet-500" },
              { id: "04", title: "Assign", color: "bg-orange-500" },
              { id: "05", title: "Exam", color: "bg-rose-500" },
            ].map((m, i) => (
              <AnimatedSection key={m.title} delay={i * 0.1}>
                <div className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-all">
                  <div className={`w-10 h-10 mx-auto rounded-xl ${m.color} text-white flex items-center justify-center font-black mb-3 shadow-md text-xs`}>
                    {m.id}
                  </div>
                  <h3 className="font-heading font-black text-[9px] uppercase tracking-widest">{m.title}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-slate-50/50 relative">
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-12">
            <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 block">Why Choose OICA</span>
            <h2 className="text-3xl font-heading font-black mb-4">
              Building a Professional Career
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.slice(0, 4).map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col h-full hover:border-primary/30 transition-all shadow-sm group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                    <f.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-black text-base mb-3 text-slate-900 leading-tight">{f.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium mb-4">{f.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="section-padding">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <AnimatedSection>
              <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 block">Our Programs</span>
              <h2 className="text-3xl font-heading font-black">
                Master the <span className="text-primary">Digital World</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Link to="/courses">
                <Button variant="outline" size="sm" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest">
                  View All <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </Link>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCourses.slice(0, 4).map((course, i) => (
              <AnimatedSection key={course.title} delay={i * 0.1}>
                <div className="group h-full bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} text-white flex items-center justify-center font-black text-lg mb-6 shadow-md transition-transform duration-500 group-hover:scale-105`}>
                    {course.icon}
                  </div>
                  <h3 className="font-heading font-black text-lg text-slate-800 mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-slate-500 text-[11px] font-medium leading-relaxed mb-6">{course.desc}</p>
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Details</span>
                    <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery (Simplified Compact) */}
      <section ref={galleryRef} className="section-padding bg-slate-950 text-center relative overflow-hidden">
        <div className="section-container relative z-10 w-full max-w-5xl">
          <AnimatedSection className="mb-10">
            <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 flex items-center justify-center gap-2">
              <Camera className="w-4 h-4" /> Campus Life
            </span>
            <h2 className="text-2xl font-heading font-black text-white">
              Explore Our <span className="text-primary">Gallery</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-10 h-[300px] md:h-[400px] overflow-hidden rounded-2xl">
            <motion.div style={{ y: yGallery1 }} className="flex flex-col gap-3">
              {homeGallery.slice(0, 2).map((src, i) => (
                <div key={i} className="h-full rounded-xl overflow-hidden shadow-xl border border-white/5">
                  <img src={src} className="w-full h-full object-cover" alt="Gallery" />
                </div>
              ))}
            </motion.div>
            <motion.div style={{ y: yGallery2 }} className="flex flex-col gap-3 mt-10 md:mt-16">
              {homeGallery.slice(2, 4).map((src, i) => (
                <div key={i} className="h-full rounded-xl overflow-hidden shadow-xl border border-white/5">
                  <img src={src} className="w-full h-full object-cover" alt="Gallery" />
                </div>
              ))}
            </motion.div>
            <motion.div style={{ y: yGallery1 }} className="hidden lg:flex flex-col gap-3">
              {homeGallery.slice(4, 6).map((src, i) => (
                <div key={i} className="h-full rounded-xl overflow-hidden shadow-xl border border-white/5">
                  <img src={src} className="w-full h-full object-cover" alt="Gallery" />
                </div>
              ))}
            </motion.div>
          </div>

          <AnimatedSection>
            <Link to="/gallery">
              <Button size="sm" className="rounded-xl px-8 h-10 text-[10px] font-black uppercase tracking-widest shadow-md">
                View Gallery <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Achievers Grid Compact */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="section-container relative z-10 text-slate-900">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black mb-2 tracking-widest uppercase border border-slate-200">
              Top Achievers
            </span>
            <h2 className="text-2xl font-heading font-black text-slate-900">
              Student Success Stories
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievers.map((a, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex items-center gap-4 transition-all hover:bg-white/10"
              >
                <img src={a.img} alt={a.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20 group-hover:scale-105 transition-transform" />
                <div>
                  <h3 className="font-heading font-bold text-white text-lg">{a.name}</h3>
                  <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">{a.role}</p>
                </div>
                <Star className="absolute top-6 right-6 w-4 h-4 text-emerald-400/20 group-hover:text-emerald-400 transition-colors" />
              </motion.div>
            ))}
          </div>
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
