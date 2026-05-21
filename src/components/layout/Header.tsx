import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, Phone, GraduationCap, 
  ShieldCheck, MessageCircle, Mail,
  ChevronDown, MonitorPlay, University, BookOpen,
  Briefcase, Users, ChevronRight, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Nav links — Career now goes directly to job-seeker view
const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Courses", path: "/courses", hasDropdown: true },
  { label: "Gallery", path: "/gallery" },
  { label: "Branches", path: "/branches" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Career", path: "/career?mode=seeker" },
  { label: "Contact Us", path: "/contact" },
];

const coursesDropdown = [
  {
    icon: MonitorPlay,
    label: "Computer Courses",
    desc: "DCA, PGDCA, Tally, Full Stack & more",
    path: "/courses",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: University,
    label: "University Programs",
    desc: "Affiliated degree & diploma programs",
    path: "/courses?tab=university",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: BookOpen,
    label: "Free Courses",
    desc: "No-cost skill development for all",
    path: "/courses?tab=free",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [recruitOpen, setRecruitOpen] = useState(false);
  const location = useLocation();

  const coursesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recruitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCoursesEnter = () => {
    if (coursesTimeoutRef.current) clearTimeout(coursesTimeoutRef.current);
    setCoursesOpen(true);
  };
  const handleCoursesLeave = () => {
    coursesTimeoutRef.current = setTimeout(() => setCoursesOpen(false), 120);
  };

  const handleRecruitEnter = () => {
    if (recruitTimeoutRef.current) clearTimeout(recruitTimeoutRef.current);
    setRecruitOpen(true);
  };
  const handleRecruitLeave = () => {
    recruitTimeoutRef.current = setTimeout(() => setRecruitOpen(false), 120);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = path.replace('/#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', path);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* 1. Compact Top Bar */}
      <div className="bg-slate-900 text-white h-10 px-6 hidden lg:flex items-center justify-between border-b border-white/5 pointer-events-auto">
        <div className="flex items-center gap-5">
          <a href="tel:+919853227488" className="flex items-center gap-1.5 hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-wider">
            <Phone size={14} className="text-primary" /> Call: +91 98532 27488
          </a>
          <div className="w-px h-4 bg-white/10" />
          <a href="https://wa.me/919853227488" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors text-[10px] font-bold uppercase tracking-wider">
            <MessageCircle size={14} className="text-emerald-400" /> WhatsApp
          </a>
          <div className="w-px h-4 bg-white/10" />
          <a href="mailto:info@oica.edu.in" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-[10px] font-bold uppercase tracking-wider">
            <Mail size={14} className="text-amber-400" /> Email
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] hidden xl:block">Excellence in Computer Education</span>
          <div className="flex items-center gap-2 ml-2">
            <Link to="/results">
              <button className="h-7 px-4 rounded-md bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
                Result
              </button>
            </Link>
            <Link to="/verify">
              <button className="h-7 px-4 rounded-md bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-1.5">
                <ShieldCheck size={12} /> Verify Certificate
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 mt-2 pointer-events-auto">
        <nav 
          className="h-12 border border-white/10 rounded-full px-6 flex items-center justify-between shadow-[0_8px_40px_-12px_rgba(30,58,138,0.5)] relative overflow-visible group"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Glossy overlays */}
          <div className="absolute inset-0 rounded-full opacity-40 pointer-events-none" 
               style={{ background: "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.4), transparent), radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3), transparent)" }} />
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-full" />
          
          {/* Branding */}
          <Link to="/" className="flex items-center gap-2 group relative z-10">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-900 shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap size={16} />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-[11px] font-black text-white uppercase tracking-tight leading-none">Odisha Institute of</h2>
              <p className="text-[7px] font-bold text-white/60 uppercase tracking-[0.2em] mt-0.5">Computer Application</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-0.5 relative z-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || location.pathname + location.search === link.path;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={handleCoursesEnter}
                    onMouseLeave={handleCoursesLeave}
                  >
                    <button
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                        isActive
                          ? "bg-white/15 text-white shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] border border-white/5"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={11}
                        className={`transition-transform duration-200 ${coursesOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Courses Dropdown */}
                    <AnimatePresence>
                      {coursesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[200]"
                          onMouseEnter={handleCoursesEnter}
                          onMouseLeave={handleCoursesLeave}
                        >
                          {/* Dropdown header */}
                          <div className="px-5 pt-4 pb-3 bg-slate-50 border-b border-slate-100">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Browse Programs</span>
                          </div>
                          <div className="p-2">
                            {coursesDropdown.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setCoursesOpen(false)}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-all group/item"
                              >
                                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform`}>
                                  <item.icon size={16} className={item.color} />
                                </div>
                                <div>
                                  <p className="text-[11px] font-black text-slate-900 mb-0.5">{item.label}</p>
                                  <p className="text-[9px] font-medium text-slate-400 leading-tight">{item.desc}</p>
                                </div>
                                <ChevronRight size={12} className="ml-auto text-slate-300 group-hover/item:text-primary transition-colors" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-white/15 text-white shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] border border-white/5"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="w-px h-3 bg-white/10 mx-2" />

            {/* Recruitment Button with hover popup */}
            <div
              className="relative"
              onMouseEnter={handleRecruitEnter}
              onMouseLeave={handleRecruitLeave}
            >
              <Link to="/career?mode=employer">
                <button className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-wider hover:bg-amber-500/30 hover:text-amber-200 transition-all flex items-center gap-1.5 backdrop-blur-md">
                  <Briefcase size={11} />
                  Recruitment
                </button>
              </Link>

              {/* Recruitment Hover Tooltip Card */}
              <AnimatePresence>
                {recruitOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-[calc(100%+12px)] right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[200]"
                    onMouseEnter={handleRecruitEnter}
                    onMouseLeave={handleRecruitLeave}
                  >
                    {/* Card header */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
                          <Users size={16} className="text-amber-300" />
                        </div>
                        <div>
                          <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest block">Recruitment Portal</span>
                          <h4 className="text-white font-black text-sm">I Want to Hire</h4>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
                        Find skilled, trained, and job-ready candidates for your organization through our institute. Our students are equipped with <span className="text-slate-900 font-bold">practical knowledge, technical expertise,</span> and professional training to meet industry demands.
                      </p>
                      <p className="text-slate-500 text-[10px] font-medium leading-relaxed">
                        Partner with us to hire talented professionals for IT, software, accounting, designing, and other computer-related roles.
                      </p>

                      <Link to="/career?mode=employer" onClick={() => setRecruitOpen(false)}>
                        <button className="w-full h-10 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 mt-1 shadow-lg">
                          <Sparkles size={12} /> Explore Talent
                          <ChevronRight size={12} />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-3 bg-white/10 mx-2" />

            <Link to="/login">
              <button className="px-5 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 border border-white/20">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="xl:hidden p-1.5 rounded-full bg-white/5 text-white hover:bg-white/10 border border-white/10 relative z-10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.98 }}
            animate={{ height: "auto", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.98 }}
            className="max-w-[95%] mx-auto mt-2 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden pointer-events-auto shadow-2xl"
          >
            <div className="p-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-white transition-all"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Recruitment */}
              <Link
                to="/career?mode=employer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider text-amber-300 hover:bg-amber-500/10 transition-all"
              >
                <Briefcase size={14} /> Recruitment – I Want to Hire
              </Link>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-4 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    Login to Portal
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
