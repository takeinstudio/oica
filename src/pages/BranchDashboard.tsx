import { useState, useEffect } from "react";
import { 
  Building2, 
  Users, 
  LayoutDashboard, 
  LogOut, 
  Edit3, 
  Save, 
  Plus, 
  Trash2,
  ShieldCheck,
  Globe,
  Settings,
  Bell,
  Search,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  XAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { STORAGE_KEYS, getStorageData, setStorageData } from "@/lib/storage";

const BranchDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Data State
  const [branch, setBranch] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [branchGallery, setBranchGallery] = useState<any[]>([]);

  useEffect(() => {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!session || JSON.parse(session).role !== 'branch') {
      navigate("/login/branch");
      return;
    }
    const sessionData = JSON.parse(session);
    
    // Load Branch Data
    const branches = getStorageData(STORAGE_KEYS.BRANCHES);
    const currentBranch = branches.find((b: any) => b.id === sessionData.branchId) || branches[0];
    setBranch(currentBranch);

    // Load Students for this branch
    const allStudents = getStorageData(STORAGE_KEYS.USERS).filter((u: any) => u.role === 'student' && u.branchId === currentBranch.id);
    setStudents(allStudents);

    // Load Gallery
    setBranchGallery(getStorageData(STORAGE_KEYS.GALLERY).filter((img: any) => img.branchId === currentBranch.id));
  }, [navigate]);

  const handleLogout = () => {
    toast.info("Branch logging out...");
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setTimeout(() => navigate("/login"), 1000);
  };

  const handleSaveBranchInfo = () => {
    const branches = getStorageData(STORAGE_KEYS.BRANCHES);
    const updated = branches.map((b: any) => b.id === branch.id ? branch : b);
    setStorageData(STORAGE_KEYS.BRANCHES, updated);
    setIsEditing(false);
    toast.success("Branch profile synced successfully!");
  };

  const analyticsData = [
    { name: 'Mon', active: 120, enroll: 12 },
    { name: 'Tue', active: 150, enroll: 8 },
    { name: 'Wed', active: 140, enroll: 15 },
    { name: 'Thu', active: 190, enroll: 22 },
    { name: 'Fri', active: 210, enroll: 10 },
    { name: 'Sat', active: 180, enroll: 5 },
  ];

  if (!branch) return null;

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden font-sans antialiased text-slate-800">
      {/* Sidebar - Pro Glassmorphic */}
      <aside className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col z-30 shadow-xl border-r border-slate-800">
        <div className="p-8 flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shrink-0 border border-white/10 shadow-lg shadow-primary/20">
            <Building2 size={24} className="text-white" />
          </div>
          <div className="hidden lg:block overflow-hidden transition-all duration-300">
            <span className="font-heading font-black text-[10px] tracking-widest block uppercase text-primary mb-1">Odisha Institute of</span>
            <span className="font-heading font-black text-xs tracking-tighter block uppercase">Computer Application</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-10">
          {[
            { id: "overview", label: "Dashboard", Icon: LayoutDashboard },
            { id: "students", label: "My Students", Icon: Users },
            { id: "content", label: "Page Editor", Icon: Globe },
            { id: "legal", label: "Legal Documents", Icon: ShieldCheck },
            { id: "settings", label: "Branch Settings", Icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-xl border border-white/5" 
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <item.Icon size={18} className={activeTab === item.id ? "text-primary" : "group-hover:text-primary transition-colors"} />
              <span className="hidden lg:block font-black text-[11px] tracking-widest uppercase">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all font-black text-[11px] uppercase tracking-widest"
          >
            <LogOut size={18} />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative bg-[#fcfcfd]">
        <header className="sticky top-0 bg-white/70 backdrop-blur-2xl border-b border-slate-200 px-10 py-5 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
             <div className="bg-slate-900 rounded-xl px-5 py-2 border border-slate-800 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
                  {branch.location} BRANCH DASHBOARD
                </span>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end border-l border-slate-200 pl-4">
              <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{branch.name}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Authorised Branch Office</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white border border-slate-800 shadow-lg">
               <Building2 size={20} />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div 
                key="overview" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: "Active Students", value: students.length, trend: "+8.2%", icon: Users, color: "blue" },
                    { label: "Course Completion", value: "74%", trend: "+5%", icon: TrendingUp, color: "emerald" },
                    { label: "Support Tickets", value: "3", trend: "Normal", icon: Bell, color: "amber" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                       <div className="flex items-center justify-between mb-4 relative z-10">
                          <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center border border-${stat.color}-100`}>
                            <stat.icon size={22} />
                          </div>
                          <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                       </div>
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">{stat.label}</p>
                       <p className="text-3xl font-heading font-black text-slate-900 relative z-10">{stat.value}</p>
                       <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform`} />
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                   <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="text-xl font-heading font-black text-slate-900">Student Activity</h3>
                         <div className="flex items-center gap-2">
                            <Button variant="outline" className="h-9 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 px-4">
                               Sync Logs <Activity size={12} className="ml-2" />
                            </Button>
                         </div>
                      </div>
                      <div className="h-[300px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData}>
                               <defs>
                                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                  </linearGradient>
                               </defs>
                               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                               <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                               <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                               <Area type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                            </AreaChart>
                         </ResponsiveContainer>
                      </div>
                   </div>

                   <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
                      <div>
                         <Globe size={48} className="text-primary mb-6 animate-pulse" />
                         <h3 className="text-2xl font-heading font-black mb-2">Digital Presence</h3>
                         <p className="text-slate-400 text-sm font-medium leading-relaxed">
                            Your branch landing page is currently <span className="text-emerald-400 font-bold">ONLINE</span> and serving 32 prospective students this week.
                         </p>
                      </div>
                      <Button onClick={() => setActiveTab('content')} className="w-full h-14 rounded-2xl bg-white text-slate-900 font-black text-[10px] tracking-widest uppercase hover:bg-slate-100 shadow-xl mt-12">
                         REFINE LANDING CONTENT <ArrowUpRight size={14} className="ml-2" />
                      </Button>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "students" && (
              <motion.div key="students" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                 <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
                    <div className="relative w-full max-w-md">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                       <Input placeholder="Search within this branch..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-14 rounded-2xl bg-white border-slate-200 shadow-sm" />
                    </div>
                    <div className="flex gap-3">
                       <Button variant="outline" className="h-14 rounded-2xl border-slate-200 font-black text-[10px] tracking-widest uppercase px-6">
                         <Download size={16} className="mr-2" /> EXPORT DATA
                       </Button>
                       <Button className="h-14 rounded-2xl bg-slate-900 text-white font-black text-[10px] tracking-widest uppercase px-8 shadow-xl">
                         <Plus size={16} className="mr-2" /> ADD STUDENT
                       </Button>
                    </div>
                 </div>

                 <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full">
                       <thead className="bg-slate-50/50 border-b border-slate-100">
                          <tr>
                             <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                             <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Roll Identifier</th>
                             <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Module Progress</th>
                             <th className="px-8 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Controls</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {students.map(student => (
                            <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                               <td className="px-8 py-6">
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                                        <img src={student.photo} className="w-full h-full object-cover" alt="" />
                                     </div>
                                     <p className="font-bold text-slate-900 text-sm">{student.name}</p>
                                  </div>
                               </td>
                               <td className="px-8 py-6">
                                  <span className="font-black text-[11px] text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{student.rollNo}</span>
                               </td>
                               <td className="px-8 py-6">
                                  <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                     <div className="h-full bg-primary" style={{ width: '65%' }} />
                                  </div>
                               </td>
                               <td className="px-8 py-6 text-right">
                                  <button className="text-slate-400 hover:text-primary transition-all font-black text-[10px] uppercase tracking-widest">View Profile</button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </motion.div>
            )}

            {activeTab === "content" && (
              <motion.div key="content" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
                 <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex-1 space-y-4">
                       <h2 className="text-3xl font-heading font-black text-slate-900">Branch Profile Details</h2>
                       <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                          Update your branch autobiography. This content is dynamically injected into the central portal's "Branch Details" module.
                       </p>
                       <textarea 
                         disabled={!isEditing}
                         className={`w-full min-h-[180px] rounded-2xl border border-slate-200 p-6 text-slate-700 font-medium leading-relaxed transition-all focus:ring-0 outline-none ${isEditing ? 'bg-white border-primary shadow-2xl shadow-primary/5' : 'bg-slate-50/50 opacity-80 cursor-not-allowed'}`}
                         value={branch.about}
                         onChange={(e) => setBranch({...branch, about: e.target.value})}
                       />
                       <div className="flex gap-4">
                          {isEditing ? (
                             <Button onClick={handleSaveBranchInfo} className="h-12 rounded-2xl bg-emerald-600 text-white font-black text-[11px] tracking-widest uppercase px-10 shadow-xl">
                               <Save className="mr-2" size={16} /> SAVE CHANGES
                             </Button>
                          ) : (
                             <Button onClick={() => setIsEditing(true)} className="h-12 rounded-2xl bg-slate-950 text-white font-black text-[11px] tracking-widest uppercase px-10 shadow-xl">
                               <Edit3 className="mr-2" size={16} /> EDIT PROFILE
                             </Button>
                          )}
                       </div>
                    </div>
                 </div>

                  <div className="space-y-8">
                     <div className="flex items-center justify-between">
                        <div className="space-y-1">
                           <h3 className="text-2xl font-heading font-black text-slate-900">Visual Portfolio</h3>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Your Campus Showcase</p>
                        </div>
                        <Button className="h-12 rounded-2xl bg-primary text-white font-black text-[10px] tracking-widest uppercase px-8 shadow-lg">
                          <Plus className="mr-2" size={16} /> ADD IMAGERY
                        </Button>
                     </div>
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {branchGallery.map((img: any) => (
                           <div key={img.id} className="group aspect-square relative bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all">
                              <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                              <div className="absolute inset-x-2 bottom-2 p-3 bg-white/90 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all border border-white/50 flex items-center justify-between">
                                 <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Asset</span>
                                 <button className="text-rose-500 hover:scale-110 transition-transform"><Trash2 size={14} /></button>
                              </div>
                           </div>
                        ))}
                        <div className="aspect-square border-4 border-dashed border-slate-100 rounded-[3.5rem] bg-slate-50/30 flex flex-col items-center justify-center hover:bg-white hover:border-primary/20 transition-all cursor-pointer group p-10">
                           <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-300 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform">
                              <Plus size={24} />
                           </div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-4">Upload Slot</p>
                        </div>
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

export default BranchDashboard;
