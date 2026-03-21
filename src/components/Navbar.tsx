import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    // Scroll handling removed as Navbar is now solid white
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Features', path: '/features' },
    { name: 'Franchise', path: '/franchise' },
    { name: 'Verify', path: '/verify' },
    { name: 'Branches', path: '/branches' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500 px-4 md:top-[36px] top-0",
        "bg-white/90 backdrop-blur-md border-b border-border py-1.5 shadow-sm"
      )}
    >
      <div className="w-full px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative transition-transform group-hover:scale-105">
            <img 
              src="/logo.jpg" 
              alt="Odisha Institute of Computer Application Logo" 
              className="h-10 md:h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('bg-primary', 'w-10', 'h-10', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'text-white');
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[13px] md:text-[15px] leading-tight tracking-tight text-foreground whitespace-nowrap uppercase">
              Odisha Institute of <br />
              Computer Application
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-300 nav-link-hover",
                location.pathname === link.path ? "text-primary" : "text-foreground/70"
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary mx-3"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
         {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
          <Link to="/apply" className="px-6 py-2.5 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-lg font-bold text-sm transition-all border border-primary/20 whitespace-nowrap">
            Apply Now
          </Link>
          <Link to="/login" className="px-6 py-2.5 bg-primary text-white hover:bg-primary/90 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/25 whitespace-nowrap">
            Log In
          </Link>
        </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-foreground/70 hover:text-primary transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border lg:hidden px-4 py-8 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-lg font-semibold px-4 py-2 hover:text-primary"
                >
                  {link.name}
                  <ChevronRight size={18} />
                </Link>
              ))}
              <Link
                to="/apply"
                onClick={() => setIsOpen(false)}
                className="mt-4 bg-primary text-white text-center py-4 rounded-2xl font-bold shadow-xl shadow-primary/20"
              >
                Apply for Admission
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
