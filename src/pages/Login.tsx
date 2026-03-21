import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-[#f8fafc] overflow-hidden">
      {/* Left Side: Brand & Visuals */}
      <div className="hidden md:flex md:w-[60%] relative overflow-hidden bg-primary items-center justify-center p-12">
        {/* Home Link */}
        <Link to="/" className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold text-sm">
          <ArrowRight size={18} className="rotate-180" />
          Back to Website
        </Link>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop" 
            alt="Students" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-accent/50" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-lg text-white"
        >
          <div className="relative mb-8">
            <img 
              src="/logo.jpg" 
              alt="Odisha Institute of Computer Application Logo" 
              className="h-32 w-auto object-contain"
            />
          </div>
          <p className="text-xl text-white/80 leading-relaxed font-medium">
            Welcome back to OICA. Access your branch dashboard to manage students, certificates, and academic records with ease.
          </p>
          
          <div className="mt-12 flex gap-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">500+</span>
              <span className="text-xs uppercase tracking-widest text-white/60 mt-1">Active Branches</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">100%</span>
              <span className="text-xs uppercase tracking-widest text-white/60 mt-1">Secure Access</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white relative">
        <div className="absolute top-8 right-8 text-primary font-bold text-xs uppercase tracking-widest animate-pulse">
          Secure System v2.4
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Branch Log In</h2>
            <p className="text-gray-500 font-medium">Please enter your credentials to proceed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Username / ID</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                    placeholder="Enter Branch ID"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-900 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded-lg border-gray-300 text-primary focus:ring-primary/20 transition-all" />
                Keep me signed in
              </label>
              <a href="#" className="text-primary font-bold hover:underline">Forgot?</a>
            </div>

            <button
              type="submit"
              className="btn-premium w-full justify-center group py-5 rounded-2xl shadow-xl shadow-primary/20"
            >
              <span className="text-base">Authorize Access</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400 font-medium">
            Not a branch? <Link to="/contact" className="text-primary font-bold hover:underline">Contact Support</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
