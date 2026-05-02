import React from 'react';
import Header from './layout/Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import FlowingBackground from './shared/FlowingBackground';
import FloatingActions from './shared/FloatingActions';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden relative">
      <FlowingBackground />
      <FloatingActions />
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow relative z-10"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
