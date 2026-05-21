import { MessageCircle, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

// Facebook SVG icon (lucide doesn't have FB)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const FloatingActions = () => {
  const actions = [
    {
      icon: FacebookIcon,
      color: "bg-[#1877F2]",
      link: "https://www.facebook.com/oicainstitute",
      label: "Community",
    },
    { 
      icon: MessageCircle, 
      color: "bg-[#25D366]", 
      link: "https://wa.me/919853227488",
      label: "WhatsApp"
    },
    { 
      icon: Phone, 
      color: "bg-[#7C3AED]", 
      link: "tel:+919853227488",
      label: "Call Us"
    },
    { 
      icon: Mail, 
      color: "bg-[#EF4444]", 
      link: "mailto:support@oica.in",
      label: "Email"
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-2 p-2">
      {actions.map((action, i) => (
        <motion.a
          key={i}
          href={action.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          whileHover={{ x: -5, scale: 1.1 }}
          className={`${action.color} text-white w-12 h-12 flex items-center justify-center rounded-l-2xl shadow-2xl transition-all group relative`}
        >
          <action.icon size={20} />
          
          {/* Tooltip */}
          <span className="absolute right-14 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
            {action.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

export default FloatingActions;
