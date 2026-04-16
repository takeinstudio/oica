import { motion } from 'framer-motion';
import { Home, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumb: string;
  bottomPills?: string[];
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumb,
  bottomPills = ["Verified", "Government Recognized", "ISO Certified"],
  backgroundImage = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
}) => {
  return (
    <div className="relative w-full h-[360px] md:h-[420px] pt-[80px] lg:pt-[120px] flex items-center justify-center overflow-hidden">
      {/* Background with subtle zoom effect */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Solid overlay for sharp look */}
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[1px]" />
      </div>

      <div className="container-max px-4 relative z-10 text-center flex flex-col justify-center items-center h-full pt-12 pb-8">
        {/* Top Badge - Floating Animation */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full mb-4"
        >
            <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                <Sparkles size={12} className="text-secondary" />
            </motion.div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-black text-white/90">{subtitle}</span>
        </motion.div>

        {/* Title with staggered characters or just fadeInUp */}
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight"
        >
            {title}
        </motion.h1>

        {/* Breadcrumb - Premium Compact Design */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-6"
        >
            <Link to="/" className="group flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition-all text-white font-bold text-xs">
                <Home size={14} className="group-hover:scale-110 transition-transform text-white/70 group-hover:text-white" />
                <span>Home</span>
            </Link>
            
            <ChevronRight size={14} className="text-white/30" />

            <div className="bg-primary/20 backdrop-blur-md px-5 py-2 rounded-xl font-black text-xs text-primary border border-primary/30">
                {breadcrumb}
            </div>
        </motion.div>

        {/* Bottom Features Pill */}
        {bottomPills.length > 0 && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex flex-wrap justify-center bg-black/20 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden divide-x divide-white/5"
            >
                {bottomPills.map((pill, index) => (
                    <div key={index} className="px-5 py-2.5 text-[10px] font-black text-white/80 tracking-widest uppercase hover:bg-white/5 transition-colors cursor-default flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-secondary" />
                        {pill}
                    </div>
                ))}
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
