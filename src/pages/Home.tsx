import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Users,
  ArrowRight, Star, Shield, Camera, Maximize2,
  GraduationCap, Mail, Quote,
  Calendar, Paperclip, BookOpen, Zap, MessageSquare, Award
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { getStorageData, STORAGE_KEYS } from "@/lib/storage";

const stats = [
  { value: "13+", label: "YEARS EXP." },
  { value: "25000+", label: "STUDENTS" },
  { value: "29+", label: "BRANCHES" },
];



const achievers = [
  {
    name: "Government Job Achiever",
    role: "Student Review",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374",
    review: "After successfully completing my computer course at OICA I got a government job. The practical training, guidance, and support helped me achieve my goal."
  },
  {
    name: "Private Sector Professional",
    role: "Student Review",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374",
    review: "OICA provided excellent computer education and career support, which helped me secure a private sector job after completing my course."
  },
  {
    name: "Career Success Story",
    role: "Student Review",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470",
    review: "I am grateful to OICA for helping me achieve success in my career. After completing the course, I received opportunities in both government and private sectors."
  },
  {
    name: "Skill & Confidence",
    role: "Student Review",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374",
    review: "OICA helped me improve my technical skills and confidence. The training methods are easy to understand and very effective."
  },
  {
    name: "Modern Computing Lab",
    role: "Student Review",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374",
    review: "I gained excellent computer knowledge and practical experience from OICA. The teachers are very supportive and friendly."
  }
];

const homeGallery = [
  "https://images.unsplash.com/photo-1523050337456-5d55f21af557?q=80&w=1471",
  "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1470",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470",
];

const methodology = [
  {
    id: "01",
    title: "Theory",
    desc: "Foundational knowledge sessions",
    icon: BookOpen,
    color: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-500/20"
  },
  {
    id: "02",
    title: "Practical",
    desc: "Hands-on lab exercises",
    icon: Zap,
    color: "from-emerald-600 to-teal-500",
    shadow: "shadow-emerald-500/20"
  },
  {
    id: "03",
    title: "Doubt",
    desc: "1-to-1 query resolution",
    icon: MessageSquare,
    color: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20"
  },
  {
    id: "04",
    title: "Assign",
    desc: "Real-world project tasks",
    icon: Paperclip,
    color: "from-rose-600 to-pink-500",
    shadow: "shadow-rose-500/20"
  },
  {
    id: "05",
    title: "Mock test",
    desc: "Preparation for finals",
    icon: Award,
    color: "from-violet-600 to-purple-500",
    shadow: "shadow-violet-500/20"
  },
  {
    id: "06",
    title: "Final test",
    desc: "Certification exam",
    icon: Shield,
    color: "from-slate-700 to-slate-900",
    shadow: "shadow-slate-500/20"
  },
];


const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress: _scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Dynamic notices from all branches
  const [allNotices, setAllNotices] = useState<{ title: string; date: string; branch: string; location: string }[]>([]);
  // Dynamic testimonials
  const [dynamicTestimonials, setDynamicTestimonials] = useState<any[]>([]);
  const [isNoticeHovered, setIsNoticeHovered] = useState(false);

  useEffect(() => {
    const branches = getStorageData(STORAGE_KEYS.BRANCHES);
    const collected: { title: string; date: string; branch: string; location: string }[] = [];
    branches.forEach((b: any) => {
      if (b.notices && b.notices.length > 0) {
        b.notices.forEach((n: any) => {
          collected.push({ title: n.title, date: n.date, branch: b.name, location: b.location });
        });
      }
    });

    // Add fallback notices if none exist
    if (collected.length === 0) {
      collected.push(
        { title: "Welcome to OICA - New Batch Starting Soon", date: "May 10, 2026", branch: "Main Office", location: "bhubaneswar" },
        { title: "ISO Certification Renewed for 2026", date: "May 05, 2026", branch: "All Branches", location: "cutack" },
        { title: "Scholarship Test for ADCA Students", date: "May 15, 2026", branch: "Digital Lab", location: "rourkela" }
      );
    }
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
    video0Ref.current?.play().catch(() => { });
    video1Ref.current?.play().catch(() => { });

    const interval = setInterval(() => {
      setActiveVideo(prev => {
        const next = prev === 0 ? 1 : 0;
        // Reset and replay the video that's about to become active
        const nextRef = next === 0 ? video0Ref.current : video1Ref.current;
        if (nextRef) {
          nextRef.currentTime = 0;
          nextRef.play().catch(() => { });
        }
        return next;
      });
    }, 9000); // switch every 9 seconds

    return () => clearInterval(interval);
  }, []);

  const premiumRef = useRef(null);
  const { scrollYProgress: premiumScroll } = useScroll({
    target: premiumRef,
    offset: ["start end", "end start"]
  });

  const trainXLeft = useTransform(premiumScroll, [0, 1], [-150, 150]);
  const trainXRight = useTransform(premiumScroll, [0, 1], [150, -150]);

  const noticeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollContainer = noticeRef.current;
    if (!scrollContainer || allNotices.length === 0) return;

    let animationFrameId: number;
    let lastTime: number = 0;
    const speed = 35; // pixels per second

    const animate = (time: number) => {
      if (!lastTime) {
        lastTime = time;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (scrollContainer && !isNoticeHovered) {
        scrollContainer.scrollTop += speed * delta;

        // Loop back to start if reached half (assuming duplicated items)
        if (scrollContainer.scrollTop >= (scrollContainer.scrollHeight / 2)) {
          scrollContainer.scrollTop = 0;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [allNotices, isNoticeHovered]);


  const galleryRef = useRef(null);
  const { scrollYProgress: _galleryScroll } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });

  return (
    <div className="min-h-screen font-poppins antialiased" ref={containerRef}>
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center pt-[110px] lg:pt-[90px] overflow-hidden">
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

        <div className="relative z-10 w-full px-6 lg:px-20 pt-16 pb-12">
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
                className="absolute top-0 right-10 w-60 p-5 bg-secondary/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl shadow-secondary/10 z-20 group"
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
                className="absolute bottom-0 right-0 left-20 p-6 bg-rose-600/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-rose-900/40 z-10 overflow-hidden group"
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
      <section className="py-8 relative overflow-hidden bg-slate-50/50">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-400/10 blur-[120px] rounded-full -ml-48 -mb-48" />

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
                <div className="space-y-6 text-slate-700 font-medium leading-relaxed max-w-2xl bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 shadow-xl shadow-slate-200/20">
                  <p className="text-lg text-slate-800 font-extrabold">
                    We are a leading computer institute (Odisha Institute of Computer Application) dedicated to providing quality education and practical training in the field of information technology.
                  </p>
                  <p>
                    Our mission is to empower students with the latest computer skills and knowledge required for today’s competitive world. With experienced faculty, modern infrastructure, and industry-oriented courses, we ensure effective and hands-on learning.
                  </p>
                  <p>
                    We focus on building confidence, enhancing skills, and preparing students for successful careers in IT and related fields across our 29+ branches in Odisha.
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
                <div className="relative rounded-[2rem] overflow-hidden bg-blue-600/15 backdrop-blur-2xl border border-white/40 shadow-2xl p-6 md:p-8">
                  {/* Glass Background Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 pointer-events-none" />
                  {/* Header Section */}
                  <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-heading font-black text-slate-900 tracking-tight">
                        Latest Announcements
                      </h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-white/20 text-blue-700 text-[8px] font-black uppercase tracking-widest backdrop-blur-md">
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
                  <div
                    ref={noticeRef}
                    onMouseEnter={() => setIsNoticeHovered(true)}
                    onMouseLeave={() => setIsNoticeHovered(false)}
                    className="relative z-10 h-[380px] overflow-y-auto transition-all group/scroll"
                  >
                    <div className="flex flex-col gap-3 pb-20">
                      {[...allNotices, ...allNotices].map((notice, i) => (
                        <Link
                          to={`/branch/${notice.location}`}
                          key={i}
                          className="bg-white/60 backdrop-blur-md rounded-2xl p-5 flex gap-4 shadow-sm hover:shadow-xl hover:bg-white/80 transition-all duration-300 group/card cursor-pointer shrink-0 border border-white/40"
                        >
                          {/* Calendar Icon Square */}
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/80 to-violet-600/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg shrink-0 group-hover/card:scale-110 transition-transform">
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

                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 text-[8px] font-black uppercase tracking-widest backdrop-blur-sm">
                              <Paperclip size={10} />
                              View Notice
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Scrollbar Decoration */}
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/10 rounded-full" />

                    {/* Gradient Fades — Updated for transparency */}
                    <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-cyan-50/50 to-transparent pointer-events-none" />
                  </div>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar — Moved below About Us */}
      <section className="relative z-40 -mt-8 mb-8">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 grid grid-cols-2 md:grid-cols-3 divide-x divide-slate-100 overflow-hidden"
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

      {/* Premium Features Section — Parallax 'Train' Animations */}
      <section ref={premiumRef} className="py-12 bg-slate-50 relative overflow-hidden">
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-10">
            <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 block">Premium Features</span>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 leading-tight mb-4">
              Why Choose <span className="text-primary italic">OICA?</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              We don't just teach software; we build professional careers with a focus on industry standards and individual growth.
            </p>
          </AnimatedSection>

          <div className="space-y-12">
            {/* Row 1: Left to Right Train */}
            <motion.div
              style={{ x: trainXLeft }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { title: "Practical Learning", desc: "We focus on practical learning with real-world applications. Our experienced instructors provide step-by-step guidance.", icon: Zap },
                { title: "Updated Courses", desc: "We offer updated courses like Advanced Excel, Tally Prime with GST, and Spoken English to match current industry needs.", icon: BookOpen },
                { title: "Affordable Fees", desc: "Our flexible timings and affordable fees make learning accessible for everyone, ensuring quality education for all.", icon: Award },
              ].map((box, idx) => (
                <div
                  key={idx}
                  className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-xl shadow-slate-200/20 hover:shadow-2xl transition-all group min-h-[220px]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <box.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{box.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {box.desc}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Row 2: Right to Left Train */}
            <motion.div
              style={{ x: trainXRight }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { title: "Job-Ready Skills", desc: "With regular practice sessions and career-oriented training, we help you build confidence and job-ready skills.", icon: Star },
                { title: "Expert Guidance", desc: "Our experienced faculty ensures every student understands clearly through personalized attention and mentorship.", icon: Users },
                { title: "Modern Infrastructure", desc: "State-of-the-art computer labs with the latest technology to provide a superior learning environment.", icon: Shield },
              ].map((box, idx) => (
                <div
                  key={idx}
                  className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-xl shadow-slate-200/20 hover:shadow-2xl transition-all group min-h-[220px]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <box.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{box.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {box.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Training Methodology — Success Mantra Section */}
      <section className="relative py-8 bg-white overflow-hidden">
        <div className="section-container relative z-10">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 rounded-full mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Our Success Mantra</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4 uppercase">
              Training <span className="text-primary italic">Methodology</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              A systematic 5-stage transition from foundational theory to professional excellence.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Path Line */}
            <div className="absolute top-[4.5rem] left-0 w-full h-[2px] bg-slate-100 hidden lg:block overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 6, ease: "linear" }}
                className="h-full bg-gradient-to-r from-blue-500 via-primary to-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-y-20 lg:gap-8 relative z-10">
              {methodology.map((step, idx) => (
                <div key={step.id} className="relative group">
                  {/* Item Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-100px" }}
                    transition={{
                      duration: 0.8,
                      delay: idx * 1.2,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="relative z-20"
                  >
                    {/* Number Badge with Fade-in Effect */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ amount: 0.5 }}
                      transition={{ delay: idx * 1.2 + 0.3, duration: 0.5 }}
                      className="w-20 h-20 mx-auto rounded-[2rem] bg-white shadow-2xl border border-slate-100 flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform duration-500"
                    >
                      <span className={`text-2xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>
                        {step.id}
                      </span>
                    </motion.div>

                    <motion.div
                      whileInView={{
                        scale: [0.9, 1.05, 1],
                        opacity: [0, 1]
                      }}
                      viewport={{ amount: 0.5 }}
                      transition={{ delay: idx * 1.2, duration: 0.8 }}
                      className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 text-center hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2"
                    >
                      <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center mb-6 shadow-lg ${step.shadow}`}>
                        <step.icon size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">{step.title}</h3>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  </motion.div>

                  {idx < methodology.length - 1 && (
                    <div className="absolute top-[4.2rem] left-[calc(50%+40px)] w-[calc(100%-80px)] hidden xl:block z-30">
                      <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ amount: 0.5 }}
                        transition={{ delay: idx * 1.2 + 0.6, duration: 0.6, ease: "easeInOut" }}
                        className="origin-left flex items-center"
                      >
                        <div className="h-[2px] flex-grow bg-primary" />
                        <ArrowRight className="text-primary w-4 h-4 -ml-2" />
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Our Programs — Premium Interactive Cards */}
      <section className="py-8 bg-white">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
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
                title: "Kids Special",
                code: "K",
                full: "Smart Computer Course for Kids",
                desc: "Fundamental computer skills tailored for young minds (Class 5th - 10th).",
                color: "from-amber-400 to-orange-500",
                meta: ["03 Months", "5th-10th"]
              },
              {
                title: "AI & ML",
                code: "AI",
                full: "AI & Machine Learning",
                desc: "Building intelligent systems with predictive models and modern AI tools.",
                color: "from-blue-600 to-indigo-700",
                meta: ["06 Months", "Graduation"]
              },
              {
                title: "Full Stack",
                code: "MERN",
                full: "MERN STACK",
                desc: "Complete web development with MongoDB, Express, React, and Node.js.",
                color: "from-emerald-500 to-teal-700",
                meta: ["08 Months", "+2 Pass"]
              },
              {
                title: "Accounting",
                code: "T+",
                full: "Tally Prime with GST",
                desc: "Advanced computerized accounting with real-world business scenarios.",
                color: "from-rose-500 to-orange-600",
                meta: ["03 Months", "10th Pass"]
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
      <section ref={galleryRef} className="pt-12 pb-6 relative overflow-hidden">
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-10">
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
      <section id="testimonials" className="pt-6 pb-12 relative overflow-hidden">
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-12">
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
