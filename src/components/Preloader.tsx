import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';


const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 200); // Wait a bit after reaching 100%
          return 100;
        }
        return prev + 5;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 pointer-events-none overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-28 h-28 bg-white border border-slate-200 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-50" />
              <img src="/logo.jpg" alt="OICA Logo" className="w-16 h-16 object-contain relative z-10" />
            </motion.div>

            {/* Typography */}
            <div className="text-center overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="text-4xl md:text-5xl font-heading font-black text-slate-900 tracking-tight mb-2"
              >
                OICA
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="text-slate-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs"
              >
                Excellence in Computer Education
              </motion.p>
            </div>

            {/* Loading Bar Container */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-48 mt-12 flex flex-col items-center gap-3"
            >
              <div className="flex justify-between w-full px-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Loading Environment</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">{progress}%</span>
              </div>
              <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
