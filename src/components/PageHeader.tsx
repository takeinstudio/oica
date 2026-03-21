import { motion } from 'framer-motion';
import { Home, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  breadcrumb: string;
  bottomPills?: string[];
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  breadcrumb,
  bottomPills = ["Verified", "Government Recognized", "ISO Certified"],
  backgroundImage = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
}) => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background with subtle zoom effect */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Solid overlay for sharp look */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container-max px-4 relative z-10 text-center flex flex-col justify-center items-center min-h-[300px] py-8">
        {/* Top Badge - Floating Animation */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6 shadow-2xl shadow-black/20"
        >
            <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                <Sparkles size={14} className="text-red-500" />
            </motion.div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/90">{subtitle}</span>
        </motion.div>

        {/* Title with staggered characters or just fadeInUp */}
        <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl"
        >
            {title}
        </motion.h1>

        {/* Breadcrumb - Premium Design */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-8"
        >
            <Link to="/" className="group flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full hover:bg-white/20 transition-all text-white font-bold text-sm shadow-xl hover:shadow-white/5">
                <Home size={18} className="group-hover:scale-110 transition-transform text-white/70 group-hover:text-white" />
                <span>Home</span>
            </Link>
            
            <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 text-white/50 backdrop-blur-sm"
            >
                <ChevronRight size={24} />
            </motion.div>

            <div className="bg-[#c52d2f] px-10 py-3 rounded-full font-black text-sm text-white shadow-2xl shadow-[#c52d2f]/40 border border-[#c52d2f]/50">
                {breadcrumb}
            </div>
        </motion.div>

        {/* Description */}
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/80 text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-medium drop-shadow-lg"
        >
            {description}
        </motion.p>

        {/* Bottom Features Pill */}
        {bottomPills.length > 0 && (
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="inline-flex flex-wrap justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden divide-x divide-white/10 shadow-2xl"
            >
                {bottomPills.map((pill, index) => (
                    <div key={index} className="px-10 py-5 text-sm font-bold text-white/90 tracking-widest uppercase hover:bg-white/5 transition-colors cursor-default flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
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
