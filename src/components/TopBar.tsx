import { Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-[#1a1a1a] text-white/80 border-b border-white/5 hidden md:block fixed top-0 left-0 right-0 z-[60] h-[36px]">
      <div className="w-full px-4 md:px-10 flex justify-between items-center h-full text-[11px] font-bold tracking-widest uppercase">
        <div className="flex gap-6 items-center">
          <a href="tel:+919238945751" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={12} className="text-primary" />
            +91 9238945751
          </a>
          <a href="tel:+919040033305" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={12} className="text-primary" />
            +91 9040033305
          </a>
          <a href="mailto:oicainstitute@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors lowercase tracking-normal font-medium">
            <Mail size={12} className="text-primary" />
            oicainstitute@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-6">
          {/* Right-aligned Notice */}
          <div className="flex items-center gap-2 bg-primary/20 px-4 py-1.5 rounded-full border border-primary/20 animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[9px] font-extrabold text-white tracking-[0.2em] uppercase">New Batch April 2026</span>
          </div>
          
            <div className="flex gap-3 pr-4 border-r border-white/10">
            <a href="#" className="hover:text-primary transition-colors"><Facebook size={14} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter size={14} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Instagram size={14} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Youtube size={14} /></a>
          </div>
          <div className="pl-2">
            ISO 9001:2008 Certified
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
