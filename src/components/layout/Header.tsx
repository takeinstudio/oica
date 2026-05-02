import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, Phone, GraduationCap, 
  ShieldCheck, Layout as LayoutIcon
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Courses", path: "/courses" },
  { label: "Gallery", path: "/gallery" },
  { label: "Branches", path: "/branches" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Verification", path: "/verify" },
  { label: "Career", path: "/career" },
  { label: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = path.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState({}, '', path);
    }
  };
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      {/* Simple Top Bar - Always visible or removed based on preference, keeping it stable */}
      <div 
        className={`hidden lg:flex items-center justify-between w-full bg-slate-900/95 border-b border-white/5 text-white text-[10px] font-black h-8 px-10 pointer-events-auto backdrop-blur-md`}
      >
        <div className="flex items-center gap-6 tracking-wider">
          <a href="tel:+919853227488" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
            <Phone className="w-3 h-3 text-sky-400" /> +91 98532 27488
          </a>
          <div className="w-px h-3 bg-white/10" />
          <span className="flex items-center gap-2 text-white/60 font-bold uppercase tracking-wider text-[9px]">
             EXCELLENCE IN COMPUTER EDUCATION
          </span>
        </div>
        
        <div className="flex items-center gap-2 h-full py-1 pr-2">
            {[
              { label: "Result", icon: LayoutIcon, path: "/results", color: "bg-blue-600/20 text-blue-400 border-blue-500/30" },
              { label: "Verify Certificate", icon: ShieldCheck, path: "/verify", color: "bg-sky-400/20 text-sky-400 border-sky-400/30" },
            ].map(item => (
              <Link key={item.label} to={item.path}>
                <div className={`h-full flex items-center gap-1.5 px-3 py-1 rounded-lg border ${item.color} backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer`}>
                   <item.icon size={11} />
                   <span className="uppercase tracking-[0.1em] font-black text-[8px]">{item.label}</span>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Main floating navbar — Slim, Glossy, Premium */}
      <div className="mx-auto mt-3 px-4 w-full flex justify-center pointer-events-auto">
        <motion.nav 
          initial={false}
          animate={{
            maxWidth: "1120px",
            height: "56px",
          }}
          className="relative flex items-center justify-between w-full px-5 lg:px-7 rounded-[20px] shadow-[0_8px_32px_-8px_rgba(59,130,246,0.35),0_2px_8px_rgba(0,0,0,0.25)] border border-white/20"
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.92) 0%, rgba(79,70,229,0.92) 50%, rgba(109,40,217,0.92) 100%)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
          }}
        >
          {/* Glossy inner sheen */}
          <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-[20px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
          {/* Logo Section */}
          <div className="flex-1 flex justify-start items-center h-full relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5 group whitespace-nowrap" aria-label="Home page">
              <div 
                className="flex items-center justify-center rounded-lg p-1.5 transition-all duration-300 bg-white text-blue-700 shadow-md group-hover:scale-110"
              >
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex flex-col justify-center">
                <span 
                  className="font-heading font-black leading-none tracking-tight text-[11px] md:text-[12px] uppercase text-white drop-shadow-sm"
                >
                  Odisha Institute of
                </span>
                <span 
                  className="font-bold uppercase tracking-[0.2em] mt-0.5 text-[7px] md:text-[8px] text-white/70"
                >
                  Computer Application
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex flex-none items-center justify-center gap-0.5 h-full relative z-10" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`relative px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                    isActive 
                      ? "text-white" 
                      : "text-white/75 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-white/15 shadow-inner"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              );
            })}
            <div className="w-px h-4 bg-white/20 mx-2" />
            <Link to="/login" className="relative px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider text-white/75 hover:text-white hover:bg-white/10 transition-all">
               Login
            </Link>
          </div>

          {/* Right spacer */}
          <div className="hidden lg:flex flex-1 items-center justify-end ml-auto h-full relative z-10" />

          {/* Mobile Hamburger */}
          <button 
            className="lg:hidden p-1.5 rounded-lg ml-auto transition-all active:scale-95 bg-white/15 text-white border border-white/20 hover:bg-white/25 relative z-10" 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10, scale: 0.95 }}
            animate={{ height: "auto", opacity: 1, y: 0, scale: 1 }}
            exit={{ height: 0, opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden absolute top-[62px] md:top-[76px] left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-[28px] border border-white/40 shadow-2xl overflow-hidden z-[60] pointer-events-auto"
          >
            <div className="p-6 pt-8 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20 translate-x-1"
                        : "text-slate-600 hover:bg-slate-50 hover:text-primary active:scale-95"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <div className="pt-6 mt-4 border-t border-slate-100 px-2 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-wider bg-slate-100 text-slate-900 border border-slate-200 shadow-sm"
                >
                  Login
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
