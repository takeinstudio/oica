import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import {
  Search, CheckCircle, XCircle, Users, TrendingUp,
  QrCode, UserCheck, X,
  AlertCircle, RefreshCw,
  ShieldCheck, ArrowLeft, Lock
} from "lucide-react";
import { STORAGE_KEYS, getStorageData, setStorageData } from "@/lib/storage";
import { toast } from "sonner";

const Attendance = () => {
  const [session, setSession] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterBranch, setFilterBranch] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [manualRoll, setManualRoll] = useState("");
  const [markMode, setMarkMode] = useState<"manual" | "qr">("qr");
  const [lastScanned, setLastScanned] = useState<any>(null);
  const [today] = useState(new Date().toISOString().split("T")[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [scanStatus, setScanStatus] = useState<"scanning" | "success" | "duplicate" | "error">("scanning");
  const [isPaused, setIsPaused] = useState(false);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const recordsRef = useRef<any[]>([]);
  const isPausedRef = useRef(false);

  // Keep refs in sync with state to avoid stale closures in scanner callbacks
  useEffect(() => {
    recordsRef.current = records;
  }, [records]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const s = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (s) {
      const parsed = JSON.parse(s);
      setSession(parsed);
      if (parsed.role === "admin" || parsed.role === "branch") {
        setIsAuthenticated(true);
      }
    }
    setRecords(getStorageData(STORAGE_KEYS.ATTENDANCE));
    const allUsers = getStorageData(STORAGE_KEYS.USERS);
    setUsers(allUsers.filter((u: any) => u.role === "student"));
  }, []);

  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const allUsers = getStorageData(STORAGE_KEYS.USERS);
    const user = allUsers.find((u: any) => 
      (u.email?.toLowerCase() === authForm.email.toLowerCase() || u.username?.toLowerCase() === authForm.email.toLowerCase()) && 
      u.password === authForm.password
    );
    
    if (user && (user.role === "admin" || user.role === "branch")) {
      setIsAuthenticated(true);
      setSession(user);
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}`);
    } else {
      toast.error("Invalid Staff Credentials");
    }
  };

  const [isScannerReady, setIsScannerReady] = useState(false);

  // Initialize Scanner
  useEffect(() => {
    let isMounted = true;
    let scannerInstance: Html5Qrcode | null = null;

    const startScanner = async () => {
      if (markMode !== "qr" || !isAuthenticated) return;
      
      const element = document.getElementById("reader");
      if (!element) return;

      try {
        // Stop any previous instance stored in the ref first
        if (scannerRef.current) {
          try {
            await scannerRef.current.stop();
          } catch (e) { /* ignore */ }
        }

        setIsScannerReady(false);
        const element = document.getElementById("reader");
        if (element) element.innerHTML = ""; // Clear any leftover video tags
        
        scannerInstance = new Html5Qrcode("reader", {
          verbose: false,
          formatsToSupport: [ 
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39
          ]
        });
        scannerRef.current = scannerInstance;

        // Try starting with facingMode (best for mobile and modern browsers)
        try {
          await scannerInstance.start(
            { facingMode: "environment" },
            { 
              fps: 60, // Keep high FPS for speed
              qrbox: (viewWidth, viewHeight) => {
                const size = Math.min(viewWidth, viewHeight) * 0.8;
                return { width: size, height: size }; // Square for QR
              },
              videoConstraints: {
                facingMode: "environment"
              }
            },
            (decodedText) => handleScannedData(decodedText),
            () => {} 
          );
          if (isMounted) setIsScannerReady(true);
        } catch (facingError) {
          console.warn("FacingMode failed, falling back to device selection", facingError);
          // Fallback: Get cameras and try the first one
          const devices = await Html5Qrcode.getCameras();
          if (devices && devices.length > 0 && isMounted) {
            await scannerInstance.start(
              devices[0].id,
              { 
                fps: 60, 
                qrbox: (viewWidth, viewHeight) => {
                  const size = Math.min(viewWidth, viewHeight) * 0.8;
                  return { width: size, height: size };
                }
              },
              (decodedText) => handleScannedData(decodedText),
              () => {} 
            );
            if (isMounted) setIsScannerReady(true);
          } else {
            throw new Error("No cameras detected");
          }
        }
      } catch (err) {
        console.error("Scanner fatal error:", err);
        if (isMounted) {
          setIsScannerReady(false);
          toast.error("Camera Access Failed", {
            description: "Browser denied access. Ensure no other apps (Zoom, Teams) or tabs are using the camera, then try reloading.",
            duration: 6000
          });
        }
      }
    };

    const stopScanner = async () => {
      setIsScannerReady(false);
      if (scannerInstance) {
        try {
          await scannerInstance.stop();
        } catch (e) { /* ignore */ }
        scannerInstance = null;
        scannerRef.current = null;
      }
    };

    if (markMode === "qr" && isAuthenticated) {
      setTimeout(startScanner, 500); 
    }

    return () => {
      isMounted = false;
      stopScanner();
    };
  }, [markMode, isAuthenticated]);

  const handleScannedData = (data: string) => {
    if (isPausedRef.current) return;
    try {
      if (data.startsWith("{")) {
        const parsed = JSON.parse(data);
        if (parsed.rollNo) {
          markAttendance(parsed.rollNo, "qr", parsed.branch);
        }
      } else {
        markAttendance(data, "qr");
      }
    } catch (e) {
      markAttendance(data, "qr");
    }
  };

  const courses = useMemo(() => ["All", ...Array.from(new Set(users.map((u: any) => u.course)))], [users]);
  const branches = useMemo(() => ["All", ...Array.from(new Set(users.map((u: any) => u.branchId)))], [users]);

  const isAdmin = session?.role === "admin" || session?.role === "branch";

  // Date ranges
  const getRange = () => {
    const now = new Date();
    if (view === "daily") return [today];
    if (view === "weekly") {
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now); d.setDate(now.getDate() - i);
        return d.toISOString().split("T")[0];
      });
    }
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date(now); d.setDate(now.getDate() - i);
      return d.toISOString().split("T")[0];
    });
  };
  const dateRange = getRange();

  const visibleStudents = useMemo(() => {
    let list = isAdmin ? users : users.filter((u: any) => u.id === session?.id);
    if (filterCourse !== "All") list = list.filter((u: any) => u.course === filterCourse);
    if (filterBranch !== "All") list = list.filter((u: any) => u.branchId === filterBranch);
    if (search) list = list.filter((u: any) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.rollNo?.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [users, search, filterCourse, filterBranch, isAdmin, session]);

  const getAttendance = (studentId: number) => {
    const studentRecords = records.filter(r => r.studentId === studentId && dateRange.includes(r.date));
    const workdays = dateRange.length;
    return { present: studentRecords.length, total: workdays, pct: workdays ? Math.round((studentRecords.length / workdays) * 100) : 0 };
  };

  const markAttendance = (rollNo: string, method: "manual" | "qr", branchFromQR?: string) => {
    if (!rollNo || isPausedRef.current) return;
    
    const student = users.find((u: any) => u.rollNo === rollNo);
    
    if (!student) { 
      if (method === "qr") {
        setScanStatus("error");
        setLastScanned(null);
        setIsPaused(true);
        setTimeout(() => {
          setScanStatus("scanning");
          setIsPaused(false);
        }, 2000);
      }
      if (method === "manual") toast.error("Student not found."); 
      return; 
    }

    const exists = recordsRef.current.find(r => r.studentId === student.id && r.date === today);
    
    if (exists) { 
      if (method === "qr") {
        setScanStatus("duplicate");
        setIsPaused(true);
        setLastScanned({ ...student, time: exists.time, alreadyMarked: true });
        
        // Warning Audio
        try {
          const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
          audio.volume = 0.4;
          audio.play();
        } catch (e) {}

        setTimeout(() => {
          setScanStatus("scanning");
          setIsPaused(false);
        }, 2000);
      }
      if (method === "manual") toast.warning(`${student.name} already marked present.`);
      return; 
    }

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newRec = {
      id: `att_${student.id}_${Date.now()}`,
      studentId: student.id, rollNo: student.rollNo,
      studentName: student.name, branchId: branchFromQR || student.branchId,
      course: student.course, date: today,
      time,
      markedBy: session?.name || "Global Access", method, status: "present"
    };
    const updated = [newRec, ...recordsRef.current];
    setRecords(updated);
    setStorageData(STORAGE_KEYS.ATTENDANCE, updated);
    
    if (method === "qr") {
      setScanStatus("success");
      setIsPaused(true);
      setShowSuccessOverlay(true);
      
      // Audio Feedback
      try {
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
        audio.volume = 0.5;
        audio.play();
      } catch (e) {}

      setTimeout(() => {
        setScanStatus("scanning");
        setIsPaused(false);
        setShowSuccessOverlay(false);
      }, 2000);
    } else {
      toast.success(`${student.name} marked present!`);
    }

    setLastScanned({ ...student, time });
    setManualRoll(""); 
  };

  const todayPresent = records.filter(r => r.date === today).length;
  const totalStudents = users.length;
  const overallPct = totalStudents ? Math.round((todayPresent / totalStudents) * 100) : 0;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-poppins relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -ml-48 -mb-48" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl relative z-10">
          <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            
            {/* Left Column: Branding & Security Info */}
            <div className="md:w-5/12 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <ShieldCheck size={24} className="text-primary" />
                  </div>
                  <span className="font-black text-xs uppercase tracking-[0.3em]">Secure Core</span>
                </div>
                
                <h2 className="text-4xl font-black leading-tight mb-6">
                  SECURE <br />
                  <span className="text-primary">ATTENDANCE</span> <br />
                  MANAGEMENT
                </h2>
                <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-xs">
                  Access to the OICA global attendance engine is restricted to authorized administrative personnel. 
                </p>
              </div>

              <div className="relative z-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Lock size={14} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Status</p>
                    <p className="text-[9px] font-bold text-white/60 uppercase">AES-256 Encrypted & Secure</p>
                  </div>
                </div>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">© 2026 Odisha Institute of Computer Application</p>
              </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="flex-1 p-12 flex flex-col justify-center bg-white">
              <div className="mb-10">
                <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Staff Authorization</h3>
                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em] mt-2">Enter credentials to unlock system access</p>
              </div>

              <form onSubmit={handlePortalLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Staff Identifier</label>
                  <input 
                    type="text" 
                    required
                    value={authForm.email}
                    onChange={e => setAuthForm({...authForm, email: e.target.value})}
                    className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-bold outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300"
                    placeholder="Username or Email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Security Passphrase</label>
                  <input 
                    type="password" 
                    required
                    value={authForm.password}
                    onChange={e => setAuthForm({...authForm, password: e.target.value})}
                    className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-bold outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300"
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" className="w-full h-14 bg-slate-900 hover:bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 mt-4 active:scale-[0.98] group flex items-center justify-center gap-3">
                  INITIALIZE SESSION <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                <button onClick={() => window.location.href = "/"} className="text-slate-400 hover:text-slate-900 transition-colors text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 group">
                  <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Exit to Homepage
                </button>
                <div className="flex items-center gap-1.5 grayscale opacity-30">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-bold uppercase text-slate-900 tracking-tighter">Identity Verified</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-poppins antialiased text-slate-800">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-0 shadow-sm">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <CheckCircle size={16} />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">Attendance System</h1>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">OICA — {today}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Users size={12} className="text-blue-500" /> {totalStudents} Students</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-500" /> {todayPresent} Present Today</span>
              <span className="flex items-center gap-1.5"><TrendingUp size={12} className="text-primary" /> {overallPct}%</span>
            </div>
            <button onClick={() => window.close()} className="h-8 px-4 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-200 transition-all flex items-center gap-1.5">
              <X size={12} /> Close
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6 py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Today Present", value: todayPresent, icon: CheckCircle, color: "emerald" },
            { label: "Total Students", value: totalStudents, icon: Users, color: "blue" },
            { label: "Today Absent", value: totalStudents - todayPresent, icon: XCircle, color: "rose" },
            { label: "Attendance Rate", value: `${overallPct}%`, icon: TrendingUp, color: "violet" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-lg bg-${s.color}-50 text-${s.color}-500 flex items-center justify-center`}>
                <s.icon size={18} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
                <p className="text-xl font-bold text-slate-900">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mark Attendance Panel — Admin/Branch only */}
          {isAdmin && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Mark Attendance</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{today}</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
                  <button onClick={() => setMarkMode("qr")}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${markMode === "qr" ? "bg-white text-primary shadow-sm" : "text-slate-400"}`}>
                    <QrCode size={12} className="inline mr-1.5" /> QR Scan
                  </button>
                  <button onClick={() => setMarkMode("manual")}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${markMode === "manual" ? "bg-white text-primary shadow-sm" : "text-slate-400"}`}>
                    <UserCheck size={12} className="inline mr-1.5" /> Roll
                  </button>
                </div>
              </div>

              {markMode === "manual" ? (
                <div className="space-y-4">
                  <input
                    value={manualRoll}
                    onChange={e => setManualRoll(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && markAttendance(manualRoll, "manual")}
                    placeholder="Enter Roll No. e.g. OICA/2026/100"
                    className="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <button onClick={() => markAttendance(manualRoll, "manual")}
                    className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shadow-lg shadow-slate-900/10">
                    MARK PRESENT NOW
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl relative group aspect-video flex items-center justify-center">
                    <div id="reader" className="w-full h-full object-cover"></div>
                    <div className="absolute inset-0 border-[4px] border-primary/20 pointer-events-none rounded-[2.5rem]"></div>
                    
                    {/* Status & Actions Overlay */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                      <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-black uppercase rounded-full flex items-center gap-2.5 shadow-xl border border-white/10">
                        <div className={`w-2 h-2 rounded-full ${isScannerReady ? "bg-emerald-500 animate-ping" : "bg-rose-500"}`} />
                        {isScannerReady ? "Live Feed Active" : "Hardware Offline"}
                      </div>
                      
                      <button onClick={() => window.location.reload()} className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white transition-all border border-white/10 active:scale-90">
                        <RefreshCw size={14} />
                      </button>
                    </div>
                    
                    {/* Scanning Overlay Effect */}
                    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                      <div className={`absolute inset-0 border-[8px] transition-all duration-300 ${
                        !isScannerReady ? "border-slate-900" :
                        scanStatus === "success" ? "border-emerald-500" :
                        scanStatus === "duplicate" ? "border-amber-500" :
                        scanStatus === "error" ? "border-rose-500" :
                        "border-primary/20"
                      }`} />
                      
                      {isScannerReady && scanStatus === "scanning" && (
                        <div className="w-full h-[2px] bg-primary/40 absolute top-0 animate-[scan_3s_linear_infinite]" />
                      )}

                      {/* Professional Status Flash */}
                      <AnimatePresence>
                        {isPaused && (
                          <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-[2px] ${
                              scanStatus === "success" ? "bg-emerald-500/10" :
                              scanStatus === "duplicate" ? "bg-amber-500/10" :
                              "bg-rose-500/10"
                            }`}
                          >
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20"
                            >
                              {scanStatus === "success" && <CheckCircle className="text-emerald-500" size={20} />}
                              {scanStatus === "duplicate" && <AlertCircle className="text-amber-500" size={20} />}
                              {scanStatus === "error" && <XCircle className="text-rose-500" size={20} />}
                              <span className={`text-[11px] font-black uppercase tracking-widest ${
                                scanStatus === "success" ? "text-emerald-600" :
                                scanStatus === "duplicate" ? "text-amber-600" :
                                "text-rose-600"
                              }`}>
                                {scanStatus === "success" ? "Authenticated" : 
                                 scanStatus === "duplicate" ? "Already Marked" : 
                                 "Invalid Identity"}
                              </span>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Initializing State */}
                    {!isScannerReady && (
                      <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center gap-4 z-20">
                         <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                         <div className="text-center">
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Initializing Secure Feed...</p>
                           <button 
                             onClick={() => window.location.reload()}
                             className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[8px] font-black text-primary uppercase tracking-widest border border-primary/20 transition-all"
                           >
                             Retry Connection
                           </button>
                         </div>
                      </div>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {lastScanned && (
                      <motion.div
                        key={lastScanned.id + (lastScanned.alreadyMarked ? "_old" : "_new")}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        className={`p-5 rounded-2xl border-2 ${lastScanned.alreadyMarked ? "bg-amber-50 border-amber-100" : "bg-emerald-50 border-emerald-100"} flex items-center gap-5 shadow-sm`}
                      >
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-md">
                          <img src={lastScanned.photo} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[12px] font-black text-slate-900 uppercase truncate">{lastScanned.name}</h4>
                            <span className="text-[10px] font-black text-slate-400 uppercase">{lastScanned.time}</span>
                          </div>
                          <p className="text-[10px] font-bold text-slate-500">{lastScanned.rollNo}</p>
                          <p className={`text-[9px] font-black uppercase mt-1.5 flex items-center gap-1.5 ${lastScanned.alreadyMarked ? "text-amber-600" : "text-emerald-600"}`}>
                            {lastScanned.alreadyMarked ? <AlertCircle size={12}/> : <CheckCircle size={12}/>}
                            {lastScanned.alreadyMarked ? "Already Present" : "Attendance Recorded"}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-center pb-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-50">Center QR in frame</p>
                  </div>
                </div>
              )}


              {/* Today's Marked List */}
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Marked Today ({records.filter(r => r.date === today).length})</p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {records.filter(r => r.date === today).slice(0, 10).map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div>
                        <p className="text-[10px] font-bold text-slate-800">{r.studentName}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase">{r.rollNo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-bold text-emerald-600 uppercase">{r.time}</p>
                        <p className="text-[7px] text-slate-400 uppercase tracking-wider">{r.method}</p>
                      </div>
                    </div>
                  ))}
                  {records.filter(r => r.date === today).length === 0 && (
                    <p className="text-center text-[9px] text-slate-400 py-4 font-bold uppercase">No records yet today</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Main Table */}
          <div className={`${isAdmin ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}>
            {/* Filters Row */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[180px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search name or roll no..."
                    className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:bg-white transition-all" />
                </div>
                {isAdmin && (
                  <>
                    <select value={filterCourse} onChange={e => setFilterCourse(e.target.value)}
                      className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 outline-none">
                      {courses.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)}
                      className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 outline-none">
                      {branches.slice(0, 10).map(b => <option key={b}>{b}</option>)}
                    </select>
                  </>
                )}
                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg ml-auto">
                  {(["daily", "weekly", "monthly"] as const).map(v => (
                    <button key={v} onClick={() => setView(v)}
                      className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${view === v ? "bg-white shadow text-slate-900" : "text-slate-400 hover:text-slate-700"}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="text-left px-5 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Student</th>
                      <th className="text-left px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Roll No</th>
                      <th className="text-left px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest hidden lg:table-cell">Course</th>
                      <th className="text-center px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Present</th>
                      <th className="text-center px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total</th>
                      <th className="text-center px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">%</th>
                      <th className="text-center px-4 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Today</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {visibleStudents.slice(0, 50).map((student: any) => {
                      const att = getAttendance(student.id);
                      const presentToday = records.some(r => r.studentId === student.id && r.date === today);
                      return (
                        <motion.tr key={student.id}
                          whileHover={{ backgroundColor: "#f8fafc" }}
                          onClick={() => setSelectedStudent(student)}
                          className="cursor-pointer transition-all group">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                <img src={student.photo} alt="" className="w-full h-full object-cover" />
                              </div>
                              <span className="text-[11px] font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className="text-[10px] font-mono font-bold text-slate-500">{student.rollNo}</span>
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[8px] font-bold uppercase tracking-wider rounded-md">{student.course}</span>
                          </td>
                          <td className="px-4 py-3 text-center text-[11px] font-bold text-emerald-600">{att.present}</td>
                          <td className="px-4 py-3 text-center text-[11px] font-bold text-slate-400">{att.total}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center justify-center w-12 h-6 rounded-full text-[9px] font-bold ${att.pct >= 75 ? "bg-emerald-50 text-emerald-700" : att.pct >= 50 ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`}>
                              {att.pct}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {presentToday
                              ? <CheckCircle size={16} className="text-emerald-500 mx-auto" />
                              : <XCircle size={16} className="text-rose-300 mx-auto" />}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
                {visibleStudents.length === 0 && (
                  <div className="py-16 text-center">
                    <AlertCircle size={32} className="text-slate-200 mx-auto mb-3" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No students match your search</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Status Overlay */}
      <AnimatePresence>
        {(showSuccessOverlay || (isPaused && scanStatus !== "scanning")) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-6"
          >
            <div className={`bg-white/95 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.12)] border flex flex-col items-center gap-8 max-w-sm w-full transition-colors duration-500 ${
              scanStatus === "success" ? "border-emerald-100" : 
              scanStatus === "duplicate" ? "border-amber-100" : 
              "border-rose-100"
            }`}>
              <motion.div 
                initial={{ rotate: -10, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-2xl transition-colors duration-500 ${
                  scanStatus === "success" ? "bg-emerald-500 shadow-emerald-500/40" : 
                  scanStatus === "duplicate" ? "bg-amber-500 shadow-amber-500/40" : 
                  "bg-rose-500 shadow-rose-500/40"
                }`}
              >
                {scanStatus === "success" && <CheckCircle size={56} strokeWidth={3} />}
                {scanStatus === "duplicate" && <AlertCircle size={56} strokeWidth={3} />}
                {scanStatus === "error" && <XCircle size={56} strokeWidth={3} />}
              </motion.div>
              
              <div className="text-center space-y-2">
                <h2 className={`text-2xl font-black uppercase tracking-tight ${
                  scanStatus === "success" ? "text-emerald-600" : 
                  scanStatus === "duplicate" ? "text-amber-600" : 
                  "text-rose-600"
                }`}>
                  {scanStatus === "success" ? "Attendance Recorded" : 
                   scanStatus === "duplicate" ? "Already Present" : 
                   "Identity Error"}
                </h2>
                
                {lastScanned && (
                  <div className="pt-2">
                    <p className="text-slate-900 font-black text-lg uppercase leading-tight">{lastScanned.name}</p>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">{lastScanned.rollNo}</p>
                  </div>
                )}
                
                <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-6">
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                    <p className="text-sm font-black text-slate-900">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="w-px h-8 bg-slate-100" />
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                    <p className="text-sm font-black text-slate-900">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedStudent(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                    <img src={selectedStudent.photo} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{selectedStudent.name}</h3>
                    <p className="text-[9px] font-mono font-bold text-slate-400 uppercase">{selectedStudent.rollNo}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-all">
                  <X size={14} />
                </button>
              </div>

              {/* Stats */}
              {(() => {
                const att = getAttendance(selectedStudent.id);
                return (
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Present", value: att.present, color: "emerald" },
                      { label: "Absent", value: att.total - att.present, color: "rose" },
                      { label: "Percentage", value: `${att.pct}%`, color: att.pct >= 75 ? "emerald" : "amber" },
                    ].map((s, i) => (
                      <div key={i} className={`p-3 bg-${s.color}-50 rounded-xl text-center`}>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
                        <p className={`text-lg font-bold text-${s.color}-700`}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Recent Records */}
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Recent Records</p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {records.filter(r => r.studentId === selectedStudent.id).slice(0, 10).map((r, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
                      <span className="text-[10px] font-bold text-slate-700">{r.date}</span>
                      <span className="text-[10px] font-bold text-slate-400">{r.time}</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] font-bold rounded uppercase">Present</span>
                    </div>
                  ))}
                  {records.filter(r => r.studentId === selectedStudent.id).length === 0 && (
                    <p className="text-center text-[9px] text-slate-400 py-4 font-bold uppercase">No records found</p>
                  )}
                </div>
              </div>

              {/* QR Display */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <QRCodeCanvas value={JSON.stringify({ oica: true, rollNo: selectedStudent.rollNo, name: selectedStudent.name, email: selectedStudent.email || "", course: selectedStudent.course })} size={64} level="M" />
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Student QR Code</p>
                  <p className="text-[10px] font-bold text-slate-700 mt-1">{selectedStudent.rollNo}</p>
                  <p className="text-[9px] text-slate-400">{selectedStudent.course}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Attendance;
