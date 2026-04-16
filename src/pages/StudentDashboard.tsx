import { useState, useMemo, useEffect } from "react";
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  PenTool, 
  LogOut, 
  Search, 
  GraduationCap, 
  ChevronRight,
  ArrowRight,
  Award,
  User,
  Camera,
  Save,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import SecureVideoPlayer from "@/components/shared/SecureVideoPlayer";
import SecurePdfViewer from "@/components/shared/SecurePdfViewer";
import { STORAGE_KEYS, getStorageData, setStorageData } from "@/lib/storage";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedPdf, setSelectedPdf] = useState<any>(null);
  const navigate = useNavigate();
  
  // Auth & Profile State
  const [user, setUser] = useState<any>(null);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    age: "",
    course: ""
  });

  useEffect(() => {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!session) {
      navigate("/login/student");
      return;
    }
    const userData = JSON.parse(session);
    setUser(userData);
    setProfileForm({
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      photo: userData.photo || "",
      age: userData.age || "",
      course: userData.course || "PGDCA 2026"
    });

    // Global Disable Right Click for Dashboard
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [navigate]);

  const handleLogout = () => {
    toast.info("Logging out...");
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setTimeout(() => navigate("/login"), 1000);
  };

  const handleProfileUpdate = () => {
    const users = getStorageData(STORAGE_KEYS.USERS);
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? { ...u, ...profileForm } : u
    );
    setStorageData(STORAGE_KEYS.USERS, updatedUsers);
    const updatedUser = { ...user, ...profileForm };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(updatedUser));
    toast.success("Profile updated successfully!");
  };

  // Mock Data (In real app, fetch from localStorage/API)
  // MAHA TANDAV Revision Series (YouTube)
  const lectures = [
    { id: 1, title: "Thermodynamics | MAHA TANDAV", duration: "1:45:20", module: "Chemistry", url: "https://www.youtube.com/watch?v=m-C_3sN1fL4", thumbnail: "https://images.unsplash.com/photo-1603126738927-4636190af475?w=800&q=80" },
    { id: 2, title: "Electrostatics One Shot | MAHA TANDAV", duration: "2:10:45", module: "Physics", url: "https://www.youtube.com/watch?v=RGKi6LSPDLU", thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80" },
    { id: 3, title: "Matrices & Determinants | MAHA TANDAV", duration: "1:55:00", module: "Mathematics", url: "https://www.youtube.com/watch?v=qz0aGYMCzl0", thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80" },
    { id: 4, title: "Chemical Bonding | MAHA TANDAV", duration: "2:30:15", module: "Chemistry", url: "https://www.youtube.com/watch?v=ESnrn1kAD4w", thumbnail: "https://images.unsplash.com/photo-1532187875605-1ef322312d8a?w=800&q=80" },
    { id: 5, title: "Rotational Motion | MAHA TANDAV", duration: "3:05:00", module: "Physics", url: "https://www.youtube.com/watch?v=vLqTf2b6GZw", thumbnail: "https://images.unsplash.com/photo-1461747663435-8407842ce68a?w=800&q=80" },
    { id: 6, title: "Vector Algebra | MAHA TANDAV", duration: "1:40:20", module: "Mathematics", url: "https://www.youtube.com/watch?v=yGB9j8K9f6s", thumbnail: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&q=80" },
    { id: 7, title: "Organic Chemistry Basics | MAHA TANDAV", duration: "2:50:00", module: "Chemistry", url: "https://www.youtube.com/watch?v=A74ToWscK6A", thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&q=80" },
  ];

  const pdfs = [
    { id: 1, title: "OICA PGDCA Syllabus 2026", size: "1.2 MB", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: 2, title: "Advanced Office Automation Guide", size: "4.5 MB", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  ];

  const results = [
    { subject: "Fundamentals", marks: 85, total: 100, status: "Pass" },
    { subject: "MS Office", marks: 92, total: 100, status: "Pass" },
    { subject: "Tally ERP.9", marks: 78, total: 100, status: "Pass" },
    { subject: "C Programming", marks: 88, total: 100, status: "Pass" },
  ];

  const filteredPdfs = useMemo(() => {
    return pdfs.filter(pdf => pdf.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, pdfs]);

  if (!user) return null;

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden font-sans antialiased text-slate-800">
      {/* Sidebar - Compact Professional */}
      <aside className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col transition-all duration-300 z-30 shadow-xl border-r border-slate-800">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 border border-white/10">
            <GraduationCap size={20} className="text-white" />
          </div>
          <div className="hidden lg:block">
            <span className="font-heading font-black text-[10px] tracking-widest block uppercase text-primary leading-tight">Odisha Institute of</span>
            <span className="font-heading font-black text-xs tracking-tighter block uppercase">Computer Application</span>
            <span className="text-slate-500 text-[9px] font-bold uppercase tracking-wider block mt-1">Student Portal</span>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1.5 mt-8">
          {[
            { id: "dashboard", label: "Overview", Icon: LayoutDashboard },
            { id: "lectures", label: "Lectures", Icon: Video },
            { id: "resources", label: "Safe Drive", Icon: FileText },
            { id: "results", label: "My Results", Icon: Award },
            { id: "profile", label: "My Profile", Icon: User },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSelectedVideo(null); setSelectedPdf(null); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-md border border-white/5" 
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <item.Icon size={16} className={activeTab === item.id ? "text-primary" : "text-slate-500 group-hover:text-slate-300"} />
              <span className="hidden lg:block font-bold text-xs tracking-wide uppercase">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold text-[11px] uppercase tracking-wider"
          >
            <LogOut size={16} />
            <span className="hidden lg:block">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative bg-[#fbfcfd]">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-heading font-black text-slate-900 capitalize tracking-tight">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end border-l border-slate-200 pl-4">
              <span className="text-xs font-bold text-slate-900">{user.name}</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{user.rollNo}</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shadow-sm">
              <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div 
                key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10">
                     <h2 className="text-4xl font-heading font-black mb-2">Welcome Back, {user.name.split(' ')[0]}!</h2>
                     <p className="text-slate-400 max-w-lg mb-8 font-medium">Continue your PGDCA curriculum. You have 3 pending lectures and 1 new resource available.</p>
                     <Button onClick={() => setActiveTab('lectures')} className="rounded-xl px-8 bg-primary hover:bg-primary/90 text-white font-black text-[10px] tracking-widest h-12">
                        RESUME LEARNING <ArrowRight size={14} className="ml-2" />
                     </Button>
                  </div>
                  <GraduationCap className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 -rotate-12" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                   <div className="lg:col-span-2 space-y-6">
                      <h3 className="text-lg font-heading font-black flex items-center gap-2 px-1">
                        <Video size={18} className="text-primary" /> Recent Lectures
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                          {lectures.slice(0, 2).map((lecture, idx) => (
                            <motion.div 
                              key={lecture.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              onClick={() => { setSelectedVideo(lecture); setActiveTab('lectures'); }} 
                              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
                            >
                               <div className="aspect-video relative overflow-hidden">
                                  <img src={lecture.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={lecture.title} />
                                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                     <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl">
                                        <Play size={20} className="fill-current" />
                                     </div>
                                  </div>
                               </div>
                               <div className="p-4">
                                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{lecture.module}</p>
                                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{lecture.title}</h4>
                               </div>
                            </motion.div>
                          ))}
                      </div>
                   </div>
                   
                   <div className="space-y-6">
                      <h3 className="text-lg font-heading font-black flex items-center gap-2 px-1">
                         <PenTool size={18} className="text-primary" /> Quick Stats
                      </h3>
                      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                         {[
                           { label: "Attendance", value: "94%", color: "emerald" },
                           { label: "Average Grade", value: "A+", color: "primary" },
                           { label: "Credits", value: "12/24", color: "indigo" },
                         ].map(stat => (
                           <div key={stat.label}>
                              <div className="flex justify-between mb-2">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                                 <span className="text-xs font-black text-slate-900">{stat.value}</span>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                 <motion.div initial={{ width: 0 }} animate={{ width: stat.value === 'A+' ? '90%' : stat.value }} className={`h-full bg-primary`} />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "lectures" && (
              <motion.div key="lectures" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {selectedVideo ? (
                  <div className="space-y-6">
                    <button onClick={() => setSelectedVideo(null)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-[10px] uppercase tracking-widest mb-4">
                      <ChevronRight size={14} className="rotate-180" /> Back to List
                    </button>
                    <SecureVideoPlayer url={selectedVideo.url} title={selectedVideo.title} />
                    <div className="bg-white rounded-2xl p-8 border border-slate-200">
                       <h2 className="text-2xl font-heading font-black text-slate-900 mb-2">{selectedVideo.title}</h2>
                       <p className="text-slate-400 text-sm font-medium">{selectedVideo.module} • Module 01 • Video Lecture</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lectures.map((lecture, idx) => (
                      <motion.div 
                        key={lecture.id} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedVideo(lecture)} 
                        className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
                      >
                        <div className="aspect-video relative overflow-hidden bg-slate-100">
                          <img src={lecture.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={lecture.title} />
                          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-primary/20 transition-all flex items-center justify-center">
                             <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                <Play size={24} className="fill-current" />
                             </div>
                          </div>
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-white text-[9px] font-black">{lecture.duration}</div>
                        </div>
                        <div className="p-6">
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">{lecture.module}</p>
                          <h4 className="text-lg font-heading font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{lecture.title}</h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "resources" && (
              <motion.div key="resources" className="h-full">
                {selectedPdf ? (
                  <div className="h-[80vh]">
                     <button onClick={() => setSelectedPdf(null)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-[10px] uppercase tracking-widest mb-4">
                        <ChevronRight size={14} className="rotate-180" /> Back to Resources
                     </button>
                     <SecurePdfViewer url={selectedPdf.url} title={selectedPdf.title} />
                  </div>
                ) : (
                   <div className="space-y-6">
                      <div className="relative max-w-md">
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                         <Input placeholder="Search documents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-12 pl-12 rounded-xl border-slate-200 bg-white" />
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredPdfs.map(pdf => (
                          <div key={pdf.id} onClick={() => setSelectedPdf(pdf)} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex items-center justify-between group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <FileText size={24} />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 text-sm">{pdf.title}</h4>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{pdf.size} • Secured</p>
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-slate-200 group-hover:text-primary transition-all" />
                          </div>
                        ))}
                      </div>
                   </div>
                )}
              </motion.div>
            )}

            {activeTab === "results" && (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                   <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-heading font-black text-slate-900">Academic Transcript</h3>
                      <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 font-black text-xs">CGPA: 8.42</div>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-100">
                             <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject Unit</th>
                             <th className="text-center py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Score</th>
                             <th className="text-center py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                             <th className="text-right py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {results.map((res, i) => (
                             <motion.tr 
                               key={i} 
                               initial={{ opacity: 0, y: 10 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true }}
                               transition={{ delay: i * 0.1 }}
                               className="group hover:bg-slate-50/50 transition-colors"
                             >
                                <td className="py-5 font-bold text-slate-800 text-sm">{res.subject}</td>
                                <td className="py-5 text-center font-black text-slate-900 text-sm">{res.marks}/{res.total}</td>
                                <td className="py-5 text-center">
                                   <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-black text-[9px] uppercase tracking-widest">Pass</span>
                                </td>
                                <td className="py-5 text-right">
                                   <button className="text-primary hover:underline text-[10px] font-black uppercase tracking-widest">View Detailed</button>
                                </td>
                             </motion.tr>
                           ))}
                        </tbody>
                      </table>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div key="profile" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8">
                <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center">
                   <div className="relative w-32 h-32 mx-auto mb-6 group">
                      <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                         <img src={profileForm.photo} className="w-full h-full object-cover" alt="Profile" />
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center border-2 border-white shadow-lg hover:bg-primary transition-colors">
                         <Camera size={16} />
                      </button>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 text-left mt-10">
                      <div className="space-y-1.5 focus-within:translate-x-1 transition-all">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
                         <Input value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:border-primary/30 transition-all font-bold" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Roll No</label>
                         <Input value={user.rollNo} readOnly className="h-12 rounded-xl bg-slate-100 border-slate-100 opacity-60 font-bold" />
                      </div>
                      <div className="space-y-1.5 focus-within:translate-x-1 transition-all">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Communications</label>
                         <Input value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:border-primary/30 transition-all font-bold" placeholder="your@email.com (Optional)" />
                      </div>
                      <div className="space-y-1.5 focus-within:translate-x-1 transition-all">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                         <Input value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:border-primary/30 transition-all font-bold" />
                      </div>
                      <div className="space-y-1.5 focus-within:translate-x-1 transition-all">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
                         <Input value={profileForm.age} onChange={(e) => setProfileForm({...profileForm, age: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:border-primary/30 transition-all font-bold" placeholder="Enter age" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course Enrolled</label>
                         <Input value={profileForm.course} readOnly className="h-12 rounded-xl bg-slate-100 border-slate-100 opacity-60 font-bold" />
                      </div>
                   </div>
                   
                   <div className="mt-10 flex justify-center">
                      <Button onClick={handleProfileUpdate} className="rounded-xl px-12 bg-slate-950 text-white font-black text-[10px] tracking-widest h-12 flex items-center gap-2">
                        <Save size={16} /> SYNC PROFILE CHANGES
                      </Button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
;
