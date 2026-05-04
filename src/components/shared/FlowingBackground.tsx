import { motion, useScroll, useTransform } from "framer-motion";

const FlowingBackground = () => {
  const { scrollY } = useScroll();
  
  // Parallax shifts for different blobs
  const y1 = useTransform(scrollY, [0, 5000], [0, -500]);
  const y2 = useTransform(scrollY, [0, 5000], [0, 300]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -200]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#fcfaff]">
      {/* Dynamic Flowy Blobs */}
      <motion.div 
        style={{ y: y1 }}
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-[120px]" 
      />
      
      <motion.div 
        style={{ y: y2 }}
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-400/10 rounded-full blur-[120px]" 
      />
      
      <motion.div 
        style={{ y: y3 }}
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -45, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] left-[20%] w-[45%] h-[45%] bg-cyan-400/10 rounded-full blur-[120px]" 
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      {/* Static Particle "Dust" */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? '#60a5fa' : '#c084fc',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowingBackground;
