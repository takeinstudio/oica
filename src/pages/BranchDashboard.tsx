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
  TrendingUp,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
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


  if (!branch) return null;

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden font-poppins antialiased text-slate-800">
      {/* Sidebar - Pro Glassmorphic */}
      <aside className="w-16 lg:w-60 bg-slate-900 text-white flex flex-col z-30 shadow-xl border-r border-slate-800">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 border border-white/10 shadow-lg shadow-primary/20">
            <Building2 size={20} className="text-white" />
          </div>
          <div className="hidden lg:block overflow-hidden transition-all duration-300">
            <span className="font-bold text-[9px] tracking-widest block uppercase text-primary mb-1">OICA</span>
            <span className="font-bold text-[11px] tracking-tight block uppercase leading-none">Branch Portal</span>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-6">
          {[
            { id: "overview", label: "Dashboard", Icon: LayoutDashboard },
            { id: "students", label: "My Students", Icon: Users },
            { id: "content", label: "Page Editor", Icon: Globe },
            { id: "notices", label: "Notice Board", Icon: Bell },
            { id: "legal", label: "Legal Documents", Icon: ShieldCheck },
            { id: "settings", label: "Branch Settings", Icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-xl border border-white/5" 
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <item.Icon size={16} className={activeTab === item.id ? "text-primary" : "group-hover:text-primary transition-colors"} />
              <span className="hidden lg:block font-bold text-[10px] tracking-widest uppercase">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-3 mt-auto border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold text-[10px] uppercase tracking-widest"
          >
            <LogOut size={16} />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative bg-[#fcfcfd]">
        <header className="sticky top-0 bg-white/70 backdrop-blur-2xl border-b border-slate-200 px-6 py-3.5 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
             <div className="bg-slate-900 rounded-lg px-4 py-1.5 border border-slate-800 flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-[9px] font-bold text-white uppercase tracking-widest">
                  {branch.location} BRANCH
                </span>
             </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end border-l border-slate-200 pl-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-tight">{branch.name}</span>
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Authorised Office</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white border border-slate-800 shadow-lg">
               <Building2 size={18} />
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div 
                key="overview" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Active Students", value: students.length, trend: "+8.2%", icon: Users, color: "blue" },
                    { label: "Course Modules", value: "74%", trend: "+5%", icon: TrendingUp, color: "emerald" },
                    { label: "Branch Alerts", value: "3", trend: "Normal", icon: Bell, color: "amber" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                       <div className="flex items-center justify-between mb-3 relative z-10">
                          <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center border border-${stat.color}-100`}>
                            <stat.icon size={18} />
                          </div>
                          <span className="text-[8px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">{stat.trend}</span>
                       </div>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 relative z-10">{stat.label}</p>
                       <p className="text-xl font-bold text-slate-900 relative z-10">{stat.value}</p>
                       <div className={`absolute top-0 right-0 w-20 h-20 bg-${stat.color}-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform`} />
                    </div>
                  ))}
                </div>

              </motion.div>
            )}

            {activeTab === "students" && (
               <motion.div key="students" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                     <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <Input placeholder="Search students..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-11 rounded-xl bg-white border-slate-200 shadow-sm text-sm" />
                     </div>
                     <div className="flex gap-2">
                        <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-bold text-[9px] tracking-widest uppercase px-5">
                          <Download size={14} className="mr-2" /> EXPORT
                        </Button>
                        <Button className="h-11 rounded-xl bg-slate-900 text-white font-bold text-[9px] tracking-widest uppercase px-6 shadow-xl">
                          <Plus size={14} className="mr-2" /> ADD NEW
                        </Button>
                     </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                     <table className="w-full">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                           <tr>
                              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student</th>
                              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Roll Identifier</th>
                              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</th>
                              <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Controls</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {students.map(student => (
                             <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                   <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                                         <img src={student.photo} className="w-full h-full object-cover" alt="" />
                                      </div>
                                      <p className="font-bold text-slate-900 text-xs">{student.name}</p>
                                   </div>
                                </td>
                                <td className="px-6 py-4">
                                   <span className="font-bold text-[10px] text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{student.rollNo}</span>
                                </td>
                                <td className="px-6 py-4">
                                   <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-primary" style={{ width: '65%' }} />
                                   </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                   <button className="text-slate-400 hover:text-primary transition-all font-bold text-[9px] uppercase tracking-widest">Details</button>
                                </td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </motion.div>
            )}

            {activeTab === "content" && (
               <motion.div key="content" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10">
                     <div className="flex-1 space-y-3">
                        <h2 className="text-xl font-bold text-slate-900">Branch Biography</h2>
                        <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-xl">
                           Update your branch autobiography for the public portal.
                        </p>
                        <textarea 
                          disabled={!isEditing}
                          className={`w-full min-h-[140px] rounded-lg border border-slate-200 p-4 text-slate-700 font-medium text-xs leading-relaxed transition-all focus:ring-0 outline-none ${isEditing ? 'bg-white border-primary shadow-2xl shadow-primary/5' : 'bg-slate-50/50 opacity-80 cursor-not-allowed'}`}
                          value={branch.about}
                          onChange={(e) => setBranch({...branch, about: e.target.value})}
                        />
                        <div className="flex gap-3">
                           {isEditing ? (
                              <Button onClick={handleSaveBranchInfo} className="h-10 rounded-lg bg-emerald-600 text-white font-bold text-[9px] tracking-widest uppercase px-6 shadow-xl">
                                <Save className="mr-2" size={14} /> SAVE CHANGES
                              </Button>
                           ) : (
                              <Button onClick={() => setIsEditing(true)} className="h-10 rounded-lg bg-slate-950 text-white font-bold text-[9px] tracking-widest uppercase px-6 shadow-xl">
                                <Edit3 className="mr-2" size={14} /> EDIT PROFILE
                              </Button>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                           <h3 className="text-lg font-bold text-slate-900">Campus Gallery</h3>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Your Campus Showcase</p>
                        </div>
                        <Button className="h-10 rounded-lg bg-primary text-white font-bold text-[9px] tracking-widest uppercase px-6 shadow-lg">
                          <Plus className="mr-2" size={14} /> ADD IMAGERY
                        </Button>
                     </div>
                     <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                        {branchGallery.map((img: any) => (
                           <div key={img.id} className="group aspect-square relative bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                              <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                 <button className="text-rose-500 hover:scale-110 transition-transform"><Trash2 size={16} /></button>
                              </div>
                           </div>
                        ))}
                        <div className="aspect-square border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/30 flex flex-col items-center justify-center hover:bg-white hover:border-primary/20 transition-all cursor-pointer group">
                           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform">
                              <Plus size={20} />
                           </div>
                           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-2">Upload Slot</p>
                        </div>
                     </div>
                  </div>
              </motion.div>
            )}

            {activeTab === "notices" && (
              <motion.div key="notices" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <h3 className="text-lg font-bold text-slate-900">Broadcast Center</h3>
                       <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-none">Branch Announcements</p>
                    </div>
                    <Button onClick={() => {
                        const newNotice = { id: `n_${Date.now()}`, title: "Draft Notice", date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
                        const updatedBranch = { ...branch, notices: [newNotice, ...(branch.notices || [])] };
                        setBranch(updatedBranch);
                        const branches = getStorageData(STORAGE_KEYS.BRANCHES);
                        setStorageData(STORAGE_KEYS.BRANCHES, branches.map((b: any) => b.id === branch.id ? updatedBranch : b));
                        toast.success("New notice drafted.");
                    }} className="h-10 rounded-lg bg-slate-900 text-white font-bold text-[9px] tracking-widest uppercase px-6 shadow-md">
                      <Plus className="mr-2" size={14} /> NEW BROADCAST
                    </Button>
                 </div>

                 <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                       {(branch.notices || []).length > 0 ? (branch.notices || []).map((notice: any, i: number) => (
                          <div key={notice.id} className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                             <div className="flex-1 mr-6">
                                <span className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1.5 block">{notice.date}</span>
                                <Input 
                                  value={notice.title}
                                  onChange={(e) => {
                                      const updatedNotices = [...(branch.notices || [])];
                                      updatedNotices[i].title = e.target.value;
                                      setBranch({ ...branch, notices: updatedNotices });
                                  }}
                                  onBlur={() => {
                                      const branches = getStorageData(STORAGE_KEYS.BRANCHES);
                                      setStorageData(STORAGE_KEYS.BRANCHES, branches.map((b: any) => b.id === branch.id ? branch : b));
                                      toast.success("Broadcast updated");
                                  }}
                                  className="text-sm font-bold text-slate-700 border-transparent focus:border-slate-200 bg-transparent px-0 focus:px-3 transition-all h-9 shadow-none"
                                />
                             </div>
                             <button onClick={() => {
                                const updatedNotices = (branch.notices || []).filter((n: any) => n.id !== notice.id);
                                const updatedBranch = { ...branch, notices: updatedNotices };
                                setBranch(updatedBranch);
                                const branches = getStorageData(STORAGE_KEYS.BRANCHES);
                                setStorageData(STORAGE_KEYS.BRANCHES, branches.map((b: any) => b.id === branch.id ? updatedBranch : b));
                                toast.success("Notice removed");
                             }} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                <Trash2 size={16} />
                             </button>
                          </div>
                       )) : (
                          <div className="p-12 text-center text-slate-300 font-bold text-[10px] uppercase tracking-widest">No active broadcasts</div>
                       )}
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
