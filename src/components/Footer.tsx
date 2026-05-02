import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter, MessageCircle, Send, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white/40 backdrop-blur-3xl text-slate-800 pt-16 pb-8 overflow-hidden font-poppins border-t border-white/50 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
      {/* Background Glossy Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-400/10 rounded-full blur-[100px]" 
        />
        
        {/* Animated Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -60, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
              rotate: [0, 360]
            }}
            transition={{ duration: 8 + Math.random() * 8, repeat: Infinity }}
            className="absolute rounded-full border border-white/50 shadow-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.1)`,
              backdropFilter: 'blur(2px)'
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Newsletter Column */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-black leading-tight text-slate-900">
              Start your <span className="text-primary">learning journey</span>
            </h3>
            <p className="text-slate-500 text-[13px] font-medium leading-relaxed max-w-[250px]">
              Subscribe to get latest updates and news from OICA.
            </p>
            <div className="flex bg-white/80 rounded-2xl p-1 overflow-hidden shadow-lg border border-slate-100 group focus-within:border-primary/30 transition-all">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow px-4 py-2 bg-transparent text-slate-900 text-[13px] font-medium focus:outline-none"
              />
              <button className="bg-primary text-white p-2.5 rounded-xl hover:scale-105 transition-all shadow-md">
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:pl-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-400">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Branch", path: "/branches" },
                { name: "Franchise", path: "/franchise" },
                { name: "Career", path: "/career" },
                { name: "Testimonials", path: "/testimonials" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-slate-500 text-[12px] font-bold hover:text-primary transition-all group relative inline-block"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/40 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-400">Platform</h4>
            <ul className="space-y-3">
              {[
                { name: "All Courses", path: "/courses" },
                { name: "View Results", path: "/results" },
                { name: "Event Gallery", path: "/gallery" },
                { name: "Verification", path: "/verify" },
                { name: "Contact Us", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-slate-500 text-[12px] font-bold hover:text-primary transition-all group relative inline-block"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/40 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Reach Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={14} />
                </div>
                <p className="text-slate-500 text-[11px] font-bold leading-snug pt-1">
                  SUM Hospital Road, BBSR, Odisha
                </p>
              </li>
              <li className="flex gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={14} />
                </div>
                <a href="tel:+919853227488" className="text-slate-500 text-[11px] font-bold pt-2 hover:text-primary transition-colors">
                  +91 9853227488
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2 pt-2">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-8 h-8 rounded-lg border border-slate-100 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">
            © {currentYear} OICA INSTITUTE. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {[ "Terms & Condition", "Privacy Policy" ].map(t => (
              <a key={t} href="#" className="text-slate-400 text-[9px] font-black uppercase tracking-widest hover:text-primary transition-colors">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button 
        whileHover={{ y: -3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-8 right-8 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg hover:shadow-primary/30 transition-all z-20"
      >
        <ArrowUp size={16} />
      </motion.button>
    </footer>
  );
};

export default Footer;
