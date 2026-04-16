import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background pointer-events-none"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center mb-8"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-[2] animate-pulse-slow" />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 rounded-full border border-dashed border-primary/50 absolute"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 rounded-full border border-secondary/20 absolute"
              />

              <div className="w-24 h-24 bg-gradient-to-tr from-primary to-secondary rounded-3xl rotate-45 flex items-center justify-center shadow-2xl shadow-primary/40 relative z-10 overflow-hidden">
                <div className="w-[98%] h-[98%] bg-background rounded-3xl flex items-center justify-center">
                  <div className="w-[85%] h-[85%] bg-gradient-to-tr from-primary to-secondary rounded-3xl flex items-center justify-center shadow-inner">
                    <span className="text-3xl font-heading font-extrabold text-white tracking-tighter -rotate-45">OICA</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Animation */}
            <div className="overflow-hidden text-center">
              <motion.h1
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "circOut" }}
                className="text-4xl md:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent"
              >
                OICA
              </motion.h1>
            </div>

            <div className="overflow-hidden mt-3 text-center">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-muted-foreground font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs"
              >
                Odisha Institute of Computer Application
              </motion.p>
            </div>

            {/* Loading Bar */}
            <div className="w-48 h-1 bg-muted rounded-full mt-12 overflow-hidden relative shadow-inner">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
