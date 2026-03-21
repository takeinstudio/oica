import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-10 flex flex-col items-center gap-8"
            >
              <div className="relative">
                <img 
                  src="/logo.jpg" 
                  alt="Logo" 
                  className="h-24 w-auto object-contain"
                />
              </div>
              <h1 className="text-3xl font-black text-foreground tracking-tight uppercase text-center leading-tight">
                Odisha Institute of <br />
                Computer Application
              </h1>
            </motion.div>
            
            <div className="w-64 h-[2px] bg-muted/30 overflow-hidden rounded-full relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"
              />
               <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-40"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
