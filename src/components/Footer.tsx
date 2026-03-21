import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Info */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative transition-transform group-hover:scale-105">
              <img
                src="/logo.jpg"
                alt="Odisha Institute of Computer Application Logo"
                className="h-24 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('bg-primary', 'w-10', 'h-10', 'rounded-lg', 'flex', 'items-center', 'justify-center', 'text-white');
                }}
              />
            </div>
          </Link>
          <p className="text-neutral-400 text-sm leading-relaxed text-left">
            Odisha Institute of Computer Application provides professional computer education, practical training, and career opportunities to students across Odisha. High-quality training with ISO 9001:2008 certification.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-sm text-neutral-400">
            {[
              { name: "About Us", path: "/about" },
              { name: "Our Courses", path: "/courses" },
              { name: "Photo Gallery", path: "/gallery" },
              { name: "Success Stories", path: "/testimonials" },
              { name: "Key Features", path: "/features" },
              { name: "Franchise Opportunities", path: "/franchise" },
              { name: "Verify Certificate", path: "/verify" },
              { name: "Our Branches", path: "/branches" },
              { name: "Contact Us", path: "/contact" }
            ].map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="flex items-center gap-0 hover:gap-2 hover:text-primary transition-all duration-300 group/link">
                  <ArrowRight size={14} className="w-0 opacity-0 group-hover/link:w-4 group-hover/link:opacity-100 transition-all duration-300 text-primary" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Courses */}
        <div>
          <h4 className="text-white font-bold mb-6">Popular Courses</h4>
          <ul className="flex flex-col gap-4 text-sm text-neutral-400">
            {[
              "PGDCA", "Tally ERP", "Web Design", "Digital Marketing", "Advanced Office", "Python Programming"
            ].map((course) => (
              <li key={course}>
                <Link to="/courses" className="flex items-center gap-0 hover:gap-2 hover:text-primary transition-all duration-300 group/link">
                  <ArrowRight size={14} className="w-0 opacity-0 group-hover/link:w-4 group-hover/link:opacity-100 transition-all duration-300 text-primary" />
                  {course}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-6">Contact Info</h4>
          <ul className="flex flex-col gap-4 text-sm text-neutral-400">
            <li className="flex gap-3 group/item cursor-pointer">
              <MapPin size={18} className="text-primary shrink-0 group-hover/item:scale-110 transition-transform" />
              <span className="group-hover/item:text-white transition-colors">Plot No-790/1339, Near SUM Hospital, Bhubaneswar, Odisha</span>
            </li>
            <li>
              <a href="tel:+91 9853227488" className="flex gap-3 group/item">
                <Phone size={18} className="text-primary shrink-0 group-hover/item:scale-110 transition-transform" />
                <span className="group-hover/item:text-white transition-colors">9853227488</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@oica.in" className="flex gap-3 group/item">
                <Mail size={18} className="text-primary shrink-0 group-hover/item:scale-110 transition-transform" />
                <span className="group-hover/item:text-white transition-colors">info@oica.in</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 font-medium">
        <p>© {currentYear} ODISHA INSTITUTE OF COMPUTER APPLICATION. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
