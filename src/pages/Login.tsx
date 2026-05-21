import { Input } from "@/components/ui/input";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  Lock, User, ArrowLeft, ShieldCheck, Star, GraduationCap, 
  Code2, Cpu, Database, LayoutDashboard, Users, Award, 
  BookOpen, Mail, Phone, UserPlus, Building2, CreditCard,
  CheckCircle2, Loader2, X, Briefcase
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getStorageData, setStorageData, STORAGE_KEYS, initStorage } from "@/lib/storage";
import { Button } from "@/components/ui/button";

const portalMeta: Record<string, { name: string; color: string; accent: string; icon: typeof ShieldCheck; tagline: string; fullName: string }> = {
  student: { name: "Student", color: "from-blue-600 to-indigo-500", accent: "#2563eb", icon: GraduationCap, tagline: "Continue your learning journey", fullName: "Odisha Institute of Computer Application" },
  branch:  { name: "Branch",  color: "from-emerald-600 to-green-500", accent: "#059669", icon: LayoutDashboard, tagline: "Manage your branch activities", fullName: "Odisha Institute of Computer Application" },
  employee:{ name: "Employee",color: "from-amber-600 to-orange-500", accent: "#f59e0b", icon: Briefcase,     tagline: "Manage your daily works",     fullName: "Odisha Institute of Computer Application" },
  admin:   { name: "Admin",   color: "from-violet-600 to-purple-500", accent: "#7c3aed", icon: ShieldCheck,   tagline: "Manage the institution", fullName: "Odisha Institute of Computer Application" },
};

const floatingIcons = [
  { Icon: Code2,      x: "10%",  y: "15%", delay: 0,    size: 28 },
  { Icon: Database,   x: "85%",  y: "10%", delay: 0.5,  size: 22 },
  { Icon: GraduationCap, x: "75%", y: "75%", delay: 1,  size: 30 },
  { Icon: Star,       x: "15%",  y: "80%", delay: 1.5,  size: 20 },
  { Icon: Users,      x: "90%",  y: "45%", delay: 0.8,  size: 24 },
  { Icon: Award,      x: "5%",   y: "50%", delay: 1.2,  size: 22 },
  { Icon: Cpu,        x: "50%",  y: "5%",  delay: 0.3,  size: 20 },
  { Icon: BookOpen,   x: "40%",  y: "90%", delay: 1.8,  size: 24 },
];

const Login = () => {
  const { role = "student" } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  
  // Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branches, setBranches] = useState<any[]>([]);

  // Payment State
  const [showPayment, setShowPayment] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pendingUser, setPendingUser] = useState<any>(null);

  const meta = portalMeta[role] || portalMeta.student;
  const { name, color, accent, tagline, fullName: institutionName } = meta;
  const PortalIcon = meta.icon;

  useEffect(() => {
    initStorage();
    setBranches(getStorageData(STORAGE_KEYS.BRANCHES));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "login") {
      const users = getStorageData(STORAGE_KEYS.USERS);
      const user = users.find((u: any) => 
        (u.username.toLowerCase() === username.toLowerCase() || u.rollNo?.toLowerCase() === username.toLowerCase()) && 
        u.password === password
      );

      if (user) {
        // Role Enforcement
        if (user.role !== role) {
          toast.error(`Access Denied: This account is not authorized for the ${role} portal.`);
          return;
        }

        toast.success(`Welcome back, ${user.name}!`);
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
        navigate(`/dashboard/${user.role}`);
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } else {
      // Signup Logic - Initial stage: Prepare user and show payment
      const users = getStorageData(STORAGE_KEYS.USERS);
      if (users.find((u: any) => u.username === username)) {
        toast.error("Username already exists.");
        return;
      }

      const preparedUser = {
        id: Date.now(),
        name: fullName,
        username,
        password,
        email,
        phone,
        role: role === "employee" ? "employee" : "student",
        branchId: "BBSR-01", // Default branch
        rollNo: role === "employee" ? undefined : `OICA/2026/${Math.floor(Math.random() * 900) + 100}`,
        photo: `https://i.pravatar.cc/150?u=${username}`,
        age: "",
        course: role === "employee" ? undefined : "OICA PGDCA 2026",
        registeredAt: new Date().toISOString()
      };

      if (role === "employee") {
        setStorageData(STORAGE_KEYS.USERS, [...users, preparedUser]);
        toast.success("Employee Registration Successful! You can now login.");
        setMode("login");
      } else {
        setPendingUser(preparedUser);
        setShowPayment(true);
      }
    }
  };

  const handleFinalizeSignup = () => {
    setIsPaying(true);
    // Simulate Gateway Delay
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      
      // Commit to Database
      const users = getStorageData(STORAGE_KEYS.USERS);
      setStorageData(STORAGE_KEYS.USERS, [...users, pendingUser]);
      
      toast.success("Payment Successful! Welcome to OICA.");
      
      // Delay before switching to login
      setTimeout(() => {
        setShowPayment(false);
        setPaymentSuccess(false);
        setMode("login");
        setPendingUser(null);
      }, 2500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-white flex items-center justify-center">
      
      {/* Background elements (kept from original) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ backgroundColor: accent }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full blur-[120px]"
        style={{ backgroundColor: accent }}
      />

      {floatingIcons.map(({ Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: x, top: y }}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5 + i * 0.5, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={size} color={accent} />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiAwaDZ2LTZoLTZ2NnptLTYtNmg2di02aC02djZ6bTYgMGg2di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

      <Link
        to="/"
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-bold transition-all bg-white/50 hover:bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[1100px] h-[650px] mx-4 flex flex-col md:flex-row rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-200 bg-white"
      >
        {/* Left panel */}
        <div className={`relative hidden md:flex flex-col items-center justify-center w-[40%] bg-gradient-to-br ${color} p-12 text-white text-center overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[450px] h-[450px] border border-white/20 rounded-full"
          />

          <div className="relative z-10 w-full">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }}
              className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/30 shadow-2xl"
            >
              <PortalIcon className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h2 className="text-2xl font-heading font-black tracking-tight mb-3">
              {institutionName}
            </motion.h2>

            <motion.p className="text-white/80 text-sm max-w-[240px] mx-auto font-medium mb-8">
              {mode === "login" ? tagline : "Start your digital excellence journey today at no cost."}
            </motion.p>

            <motion.div className="mt-10 space-y-3 text-left bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              {["Secure Access", "Digital Credentials", "Expert Support"].map(text => (
                <div key={text} className="flex items-center gap-3 text-white/90 text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                    <Star className="w-2.5 h-2.5 fill-white" />
                  </div>
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-white p-8 md:p-14 flex flex-col justify-center relative overflow-y-auto">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-sm mx-auto"
          >
            <div className="mb-8 text-center md:text-left">
              <span
                className="inline-block px-4 py-1.5 text-[10px] font-black rounded-full mb-4 border tracking-[0.15em] uppercase"
                style={{ color: accent, borderColor: accent + "30", backgroundColor: accent + "08" }}
              >
                {name} {mode}
              </span>
              <h1 className="text-3xl font-heading font-black text-slate-900 mb-2">
                {mode === "login" ? "Welcome Back!" : "Enroll Now"}
              </h1>
              <p className="text-slate-400 text-sm font-semibold">
                {mode === "login" ? "Enter your credentials to stay connected." : "Fill the details to get your OICA student ID."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <>
                  <div className="group relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center transition-all group-focus-within:border-primary/30 group-focus-within:bg-white group-focus-within:shadow-sm">
                      <User className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <Input
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                      className="pl-16 h-12 bg-slate-50/50 border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:border-primary/50 transition-all font-medium"
                    />
                  </div>
                  <div className="group relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center transition-all">
                      <Mail className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <Input
                      required type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="pl-16 h-12 bg-slate-50/50 border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:border-primary/50 transition-all font-medium"
                    />
                  </div>
                </>
              )}

              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center transition-all">
                  {role === "branch" ? <Building2 className="w-4 h-4 text-slate-400" /> : <UserPlus className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />}
                </div>
                {role === "branch" && mode === "login" ? (
                  <select
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-16 pr-4 h-12 bg-slate-50/50 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="" disabled>Select Your Branch</option>
                    {branches.map(b => (
                      <option key={b.id} value={b.username || `branch_${b.location.toLowerCase().replace(/\s/g, '_')}`}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={
                      mode === "signup" 
                        ? "Create Username" 
                        : role === "branch" 
                          ? "Branch ID (e.g. branch_puri)" 
                          : "Username / Roll No"
                    }
                    className="pl-16 h-12 bg-slate-50/50 border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:border-primary/50 transition-all font-medium"
                  />
                )}
              </div>

              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center transition-all">
                  <Lock className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "signup" ? "Create Password" : "Secret Password"}
                  className="pl-16 h-12 bg-slate-50/50 border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:border-primary/50 transition-all font-medium"
                />
              </div>

              {mode === "signup" && (
                <div className="group relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center transition-all">
                    <Phone className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="pl-16 h-12 bg-slate-50/50 border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:border-primary/50 transition-all font-medium"
                  />
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className={`w-full h-12 mt-4 rounded-xl font-black text-xs tracking-widest text-white bg-gradient-to-r ${color} shadow-lg transition-all uppercase`}
              >
                {mode === "login" ? "Sign In" : "Register and Continue"}
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <button 
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors"
                style={role !== 'student' && mode === 'login' ? {display: 'none'} : {}}
              >
                {mode === "login" ? "Don't have an account? Join Free" : "Already registered? Login instead"}
              </button>
              
              {mode === "login" && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-2 bg-slate-100/50 rounded-2xl border border-slate-200/50 w-full">
                  {Object.entries(portalMeta).map(([k, v]) => (
                    <Link
                      key={k}
                      to={`/login/${k}`}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl transition-all duration-300 ${
                        role === k 
                          ? `bg-gradient-to-r ${v.color} text-white shadow-md shadow-slate-200` 
                          : "text-slate-400 hover:text-slate-600 hover:bg-white"
                      }`}
                    >
                      <v.icon size={14} className={role === k ? "animate-pulse" : ""} />
                      <span className="text-[9px] font-black uppercase tracking-wider">{v.name}</span>
                    </Link>
                  ))}
                  <Link
                    to="/attendance"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <CheckCircle2 size={14} />
                    <span className="text-[9px] font-black uppercase tracking-wider">Attendance</span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Simulated Razorpay Payment Gateway Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative"
            >
              {!paymentSuccess ? (
                <>
                  <div className="bg-primary p-8 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/30 backdrop-blur-md">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <h3 className="font-heading font-black text-sm uppercase tracking-widest">Razorpay Gateway</h3>
                        <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Secure Payment • OICA</p>
                      </div>
                    </div>
                    <button onClick={() => setShowPayment(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="p-10 space-y-8">
                    <div className="text-center space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Registration Fee</p>
                      <h2 className="text-5xl font-black text-slate-950 tracking-tighter">₹500.00</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-400 uppercase">Student</span>
                          <span className="text-slate-900">{pendingUser?.name}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-400 uppercase">Course</span>
                          <span className="text-slate-900">{pendingUser?.course}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-400 uppercase">Gateway ID</span>
                          <span className="text-slate-900 font-mono">pay_demo_78291</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 border-2 border-primary/20 rounded-2xl bg-primary/5">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <ShieldCheck size={18} />
                        </div>
                        <p className="text-[10px] font-black text-primary leading-tight uppercase tracking-wider">
                          Instant ID & Roll No Generation <br /> after successful payment
                        </p>
                      </div>
                    </div>

                    <Button 
                      onClick={handleFinalizeSignup}
                      disabled={isPaying}
                      className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-[10px] tracking-[0.2em] uppercase shadow-xl shadow-primary/20"
                    >
                      {isPaying ? (
                        <>
                          <Loader2 size={16} className="mr-3 animate-spin" />
                          Processing Transaction...
                        </>
                      ) : (
                        "PAY SECURELY NOW"
                      )}
                    </Button>

                    <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                      By paying, you agree to OICA's Admission Terms. <br /> Your data is encrypted and 100% secure.
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-16 text-center space-y-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  
                  <div className="space-y-3">
                    <h2 className="text-3xl font-black text-slate-950 tracking-tight">Admission Confirmed!</h2>
                    <p className="text-slate-500 font-medium text-sm">Your payment was successful and your OICA Student ID has been generated.</p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Your Allocated Roll No</p>
                    <h3 className="text-3xl font-black text-primary tracking-tighter">{pendingUser?.rollNo}</h3>
                  </div>

                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">
                    Redirecting to portal...
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
