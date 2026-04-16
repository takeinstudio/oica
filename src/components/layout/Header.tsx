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
  { label: "Verification", path: "/verify" },
  { label: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();



  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      {/* Simple Top Bar - Always visible or removed based on preference, keeping it stable */}
      <div 
        className={`hidden lg:flex items-center justify-between w-full bg-slate-900 border-b border-white/5 text-white text-[10px] font-black h-10 px-10 pointer-events-auto`}
      >
        <div className="flex items-center gap-6 tracking-wider">
          <a href="tel:+919853227488" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
            <Phone className="w-3 h-3 text-sky-400" /> +91 98532 27488
          </a>
          <div className="w-px h-3 bg-white/10" />
          <span className="flex items-center gap-2 text-white font-bold uppercase">
             EXCELLENCE IN COMPUTER EDUCATION
          </span>
        </div>
        
        <div className="flex items-center gap-3 h-full py-1.5 pr-2">
            {[
              { label: "Result", icon: LayoutIcon, path: "/results", color: "bg-blue-600/20 text-blue-400 border-blue-500/30" },
              { label: "Verify Certificate", icon: ShieldCheck, path: "/verify", color: "bg-sky-400/20 text-sky-400 border-sky-400/30" },
            ].map(item => (
              <Link key={item.label} to={item.path}>
                <div className={`h-full flex items-center gap-2 px-4 py-1.5 rounded-xl border ${item.color} backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer`}>
                   <item.icon size={13} />
                   <span className="uppercase tracking-[0.1em] font-black text-[9px]">{item.label}</span>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Main floating navbar (Thin & Perfectly Fixed) */}
      <div className="mx-auto mt-4 px-4 w-full flex justify-center pointer-events-auto">
        <motion.nav 
          initial={false}
          animate={{
            maxWidth: "1100px",
            height: "64px",
            backgroundColor: "rgba(76, 29, 149, 0.95)", // Glassy Deep Purple
            borderColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "24px",
          }}
          className="relative flex items-center justify-between w-full border shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] backdrop-blur-2xl px-12"
        >
          {/* Logo Section */}
          <div className="flex-1 flex justify-start items-center h-full">
            <Link to="/" className="inline-flex items-center gap-2.5 group whitespace-nowrap" aria-label="Home page">
              <div 
                className="flex items-center justify-center rounded-lg p-1.5 transition-all duration-300 bg-white text-purple-700 shadow-sm"
              >
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex flex-col justify-center">
                <span 
                  className="font-heading font-black leading-none tracking-tight text-[11px] md:text-[12px] uppercase text-white"
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

          {/* Desktop Navigation Navigation */}
          <div className="hidden xl:flex flex-none items-center justify-center gap-1.5 h-full" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link-hover relative transition-all duration-300 ${
                    isActive 
                      ? "text-white font-bold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    />
                  )}
                </Link>
              );
            })}
            <div className="w-px h-4 bg-white/10 mx-6" />
            <Link to="/login" className="nav-link-hover text-white/90 hover:text-white">
               Login
            </Link>
          </div>

          {/* Right Actions - Empty but kept for flex spacing */}
          <div className="hidden lg:flex flex-1 items-center justify-end ml-auto h-full">
             {/* Apply Now button removed previously */}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="lg:hidden p-1.5 rounded-lg ml-auto transition-all active:scale-95 bg-white/10 text-white border border-white/20 hover:bg-white/20" 
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
            className="lg:hidden absolute top-[70px] md:top-[85px] left-4 right-4 bg-white/90 backdrop-blur-2xl rounded-[32px] border border-white/40 shadow-2xl overflow-hidden z-[60] pointer-events-auto"
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
                {/* 'Apply Now' button removed from mobile menu as requested */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
