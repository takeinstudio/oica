import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Preloader from './Preloader';
import TopBar from './TopBar';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Preloader />
      <TopBar />
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.2 }}
        className="flex-grow pt-[52px] md:pt-[96px]"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
