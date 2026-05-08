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
  Download,
  X,
  Link2,
  FileText
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
  const [isAddingNotice, setIsAddingNotice] = useState(false);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newNoticeData, setNewNoticeData] = useState({ title: "", link: "" });
  const [newStudentData, setNewStudentData] = useState({ name: "", course: "DCA", rollNo: "", email: "", phone: "" });
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

  const handleExport = () => {
    toast.info("Preparing student directory for export...");
    setTimeout(() => {
      console.log("Exporting Student Data:", students);
      toast.success("Student list exported successfully!");
    }, 1500);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentData.name || !newStudentData.rollNo) {
      toast.error("Student name and Roll No are required");
      return;
    }

    const newStudent = {
      id: Date.now(),
      ...newStudentData,
      role: 'student',
      branchId: branch.id,
      photo: `https://i.pravatar.cc/150?u=${Date.now()}`,
      completedVideos: [],
      age: 20
    };

    const allUsers = getStorageData(STORAGE_KEYS.USERS);
    const updatedUsers = [newStudent, ...allUsers];
    setStorageData(STORAGE_KEYS.USERS, updatedUsers);
    setStudents([newStudent, ...students]);
    
    setIsAddingStudent(false);
    setNewStudentData({ name: "", course: "DCA", rollNo: "", email: "", phone: "" });
    toast.success(`${newStudentData.name} enrolled successfully!`);
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
                        <Button 
                          onClick={handleExport}
                          variant="outline" 
                          className="h-11 rounded-xl border-slate-200 font-bold text-[9px] tracking-widest uppercase px-5"
                        >
                          <Download size={14} className="mr-2" /> EXPORT
                        </Button>
                        <Button 
                          onClick={() => setIsAddingStudent(true)}
                          className="h-11 rounded-xl bg-slate-900 text-white font-bold text-[9px] tracking-widest uppercase px-6 shadow-xl"
                        >
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
                           Update your branch autobiography and virtual tour video for the public portal.
                        </p>
                        <div className="space-y-4">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">About Branch</label>
                              <textarea 
                                disabled={!isEditing}
                                className={`w-full min-h-[140px] rounded-lg border border-slate-200 p-4 text-slate-700 font-medium text-xs leading-relaxed transition-all focus:ring-0 outline-none ${isEditing ? 'bg-white border-primary shadow-2xl shadow-primary/5' : 'bg-slate-50/50 opacity-80 cursor-not-allowed'}`}
                                value={branch.about}
                                onChange={(e) => setBranch({...branch, about: e.target.value})}
                              />
                           </div>
                           
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location Video URL (Virtual Tour)</label>
                              <Input 
                                disabled={!isEditing}
                                placeholder="https://example.com/location-video.mp4"
                                value={branch.locationVideo || ""}
                                onChange={(e) => setBranch({...branch, locationVideo: e.target.value})}
                                className={`h-11 rounded-lg border border-slate-200 text-xs font-medium transition-all ${isEditing ? 'bg-white border-primary' : 'bg-slate-50/50 cursor-not-allowed'}`}
                              />
                              <p className="text-[8px] text-slate-400 font-medium italic">* Provide a direct video link (mp4) to show a "moving car" or campus tour video next to the map.</p>
                           </div>
                        </div>
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
                       <h3 className="text-lg font-bold text-slate-900">Notice Board</h3>
                       <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-none">Campus Notifications</p>
                    </div>
                    <Button onClick={() => setIsAddingNotice(true)} className="h-10 rounded-lg bg-slate-900 text-white font-bold text-[9px] tracking-widest uppercase px-6 shadow-md">
                      <Plus className="mr-2" size={14} /> ADD NEW NOTICE
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
                                      toast.success("Notice updated");
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

        {/* Add Notice Modal */}
        <AnimatePresence>
          {isAddingNotice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddingNotice(false)}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Upload New Notice</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Campus Announcement</p>
                  </div>
                  <button onClick={() => setIsAddingNotice(false)} className="p-2 hover:bg-slate-200/50 rounded-full transition-colors">
                    <X size={18} className="text-slate-400" />
                  </button>
                </div>
                
                <div className="p-6 space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Notice Title</label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <Input 
                        placeholder="e.g. Summer Vacation Schedule" 
                        value={newNoticeData.title}
                        onChange={(e) => setNewNoticeData({...newNoticeData, title: e.target.value})}
                        className="pl-11 h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Notice Link / PDF URL (Optional)</label>
                    <div className="relative">
                      <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <Input 
                        placeholder="https://example.com/notice.pdf" 
                        value={newNoticeData.link}
                        onChange={(e) => setNewNoticeData({...newNoticeData, link: e.target.value})}
                        className="pl-11 h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium"
                      />
                    </div>
                    <p className="text-[8px] text-slate-400 font-medium px-1 italic">* Students can click the notice to view this link.</p>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <Button 
                      onClick={() => setIsAddingNotice(false)}
                      variant="outline" 
                      className="flex-1 h-12 rounded-xl border-slate-200 font-bold text-[10px] tracking-widest uppercase"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => {
                        if (!newNoticeData.title) {
                          toast.error("Please enter a notice title");
                          return;
                        }
                        const newNotice = { 
                          id: `n_${Date.now()}`, 
                          title: newNoticeData.title, 
                          link: newNoticeData.link,
                          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
                        };
                        const updatedBranch = { ...branch, notices: [newNotice, ...(branch.notices || [])] };
                        setBranch(updatedBranch);
                        const branches = getStorageData(STORAGE_KEYS.BRANCHES);
                        setStorageData(STORAGE_KEYS.BRANCHES, branches.map((b: any) => b.id === branch.id ? updatedBranch : b));
                        
                        setIsAddingNotice(false);
                        setNewNoticeData({ title: "", link: "" });
                        toast.success("Notice uploaded successfully!");
                      }}
                      className="flex-1 h-12 rounded-xl bg-slate-900 text-white font-bold text-[10px] tracking-widest uppercase shadow-xl shadow-slate-900/20"
                    >
                      Post Notice
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Add Student Modal */}
        <AnimatePresence>
          {isAddingStudent && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddingStudent(false)}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
              >
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Manual Enrollment</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Onboard New Student to {branch.location}</p>
                  </div>
                  <button onClick={() => setIsAddingStudent(false)} className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all">
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleAddStudent} className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Name</label>
                      <Input 
                        required
                        placeholder="Full Name" 
                        value={newStudentData.name}
                        onChange={(e) => setNewStudentData({...newStudentData, name: e.target.value})}
                        className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Roll Number</label>
                      <Input 
                        required
                        placeholder="OICA/2026/..." 
                        value={newStudentData.rollNo}
                        onChange={(e) => setNewStudentData({...newStudentData, rollNo: e.target.value})}
                        className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course Program</label>
                      <select 
                        className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white px-4 transition-all font-bold text-xs outline-none"
                        value={newStudentData.course}
                        onChange={(e) => setNewStudentData({...newStudentData, course: e.target.value})}
                      >
                        <option>DCA</option>
                        <option>PGDCA</option>
                        <option>Tally ERP.9</option>
                        <option>Graphic Design</option>
                        <option>Web Development</option>
                        <option>Digital Marketing</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <Input 
                        placeholder="+91" 
                        value={newStudentData.phone}
                        onChange={(e) => setNewStudentData({...newStudentData, phone: e.target.value})}
                        className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <Input 
                      type="email"
                      placeholder="student@example.com" 
                      value={newStudentData.email}
                      onChange={(e) => setNewStudentData({...newStudentData, email: e.target.value})}
                      className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold text-xs"
                    />
                  </div>

                  <div className="pt-4 flex gap-4">
                    <Button 
                      type="button"
                      onClick={() => setIsAddingStudent(false)}
                      variant="outline" 
                      className="flex-1 h-14 rounded-2xl border-slate-200 font-black text-[10px] tracking-widest uppercase"
                    >
                      Dismiss
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-[1.5] h-14 rounded-2xl bg-slate-900 text-white font-black text-[10px] tracking-widest uppercase shadow-2xl shadow-slate-900/20"
                    >
                      Complete Enrollment
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BranchDashboard;
