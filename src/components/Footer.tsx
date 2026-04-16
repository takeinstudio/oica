import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Info */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 group">
             <img
               src="/logo.jpg"
               alt="OICA Logo"
               className="h-12 w-auto object-contain brightness-110"
             />
          </Link>
          <p className="text-slate-500 text-[11px] leading-relaxed font-medium">
            Odisha Institute of Computer Application provides ISO 9001:2008 certified professional education with a focus on practical excellence.
          </p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-all text-white/50 hover:text-white border border-white/5">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Explore</h4>
          <ul className="grid grid-cols-1 gap-2.5 text-[11px] font-bold">
            {[
              { name: "About Us", path: "/about" },
              { name: "Our Courses", path: "/courses" },
              { name: "Success Stories", path: "/testimonials" },
              { name: "Franchise", path: "/franchise" },
              { name: "Verify Certificate", path: "/verify" },
              { name: "Contact", path: "/contact" }
            ].map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-primary transition-colors flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-slate-700" />
                   {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Courses */}
        <div>
          <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Popular</h4>
          <ul className="grid grid-cols-1 gap-2.5 text-[11px] font-bold">
            {[
              "PGDCA", "Tally ERP", "Web Design", "Digital Marketing", "Advanced Office"
            ].map((course) => (
              <li key={course}>
                <Link to="/courses" className="hover:text-primary transition-colors flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-slate-700" />
                   {course}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Contact</h4>
          <ul className="flex flex-col gap-4 text-[11px] font-bold">
            <li className="flex gap-3 items-start">
              <MapPin size={14} className="text-primary mt-0.5" />
              <span className="text-slate-400">SUM Hospital Road, BBSR, Odisha</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={14} className="text-primary" />
              <a href="tel:+91 9853227488" className="text-slate-400 hover:text-white transition-colors">9853227488</a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={14} className="text-primary" />
              <a href="mailto:info@oica.in" className="text-slate-400 hover:text-white transition-colors">info@oica.in</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-wider">
        <p>© 2013-{currentYear} OICA INSTITUTE</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
