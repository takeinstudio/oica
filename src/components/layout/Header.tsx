import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, Phone, GraduationCap, 
  ShieldCheck, MessageCircle, Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Courses", path: "/courses" },
  { label: "Gallery", path: "/gallery" },
  { label: "Branches", path: "/branches" },
  { label: "Testimonials", path: "/testimonials" },
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
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* 1. Compact Top Bar (Height: 40px / h-10) */}
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

      {/* 2. Thin & Rounded Navbar (Height: 48px / h-12) with Midnight Sapphire Theme */}
      <div className="max-w-7xl mx-auto px-4 mt-2 pointer-events-auto">
        <nav 
          className="h-12 border border-white/10 rounded-full px-6 flex items-center justify-between shadow-[0_8px_40px_-12px_rgba(30,58,138,0.5)] relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Glossy Mesh Gradient Overlay */}
          <div className="absolute inset-0 opacity-40 pointer-events-none" 
               style={{ background: "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.4), transparent), radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3), transparent)" }} />
          
          {/* Glossy Sheen Overlay */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
          
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
              const isActive = location.pathname === link.path;
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
            <div className="w-px h-3 bg-white/10 mx-3" />
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
              <div className="pt-4 border-t border-white/10">
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
