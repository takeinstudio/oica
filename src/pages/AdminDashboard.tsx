import { useState, useEffect } from "react";
import { 
  Users, 
  Building2, 
  Image as ImageIcon, 
  LayoutDashboard, 
  LogOut, 
  Search, 
  Plus,
  Trash2,
  Eye,
  BarChart3,
  ShieldCheck,
  Video,
  Activity,
  ArrowUpRight,
  Filter,
  Download,
  Upload,
  Briefcase,
  CheckCircle2,
  MessageSquare,
  Star as StarIcon,
  PenTool,
  Save,
  X,
  ChevronRight,
  Clock,
  Play,
  Bell,
  MessageCircle,
  AlertCircle,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { STORAGE_KEYS, getStorageData, setStorageData } from "@/lib/storage";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  // Data State
  const [students, setStudents] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [careerJobs, setCareerJobs] = useState<any[]>([]);
  const [careerApps, setCareerApps] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [lectures, setLectures] = useState<any[]>([]);
  const [mockTests, setMockTests] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [franchiseEnquiries, setFranchiseEnquiries] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  // UI State
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Selection/Modal State
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!session || JSON.parse(session).role !== 'admin') {
      navigate("/login/admin");
      return;
    }
    
    // Load Data
    setStudents(getStorageData(STORAGE_KEYS.USERS).filter((u: any) => u.role === 'student'));
    setBranches(getStorageData(STORAGE_KEYS.BRANCHES));
    setGallery(getStorageData(STORAGE_KEYS.GALLERY));
    setCareerJobs(getStorageData(STORAGE_KEYS.JOBS));
    setCareerApps(getStorageData(STORAGE_KEYS.CAREER_APPS));
    setTopics(getStorageData(STORAGE_KEYS.TOPICS));
    setLectures(getStorageData(STORAGE_KEYS.LECTURES));
    setMockTests(getStorageData(STORAGE_KEYS.MOCK_TESTS));
    setFeedback(getStorageData(STORAGE_KEYS.FEEDBACK));
    setContactMessages(getStorageData(STORAGE_KEYS.CONTACT_MESSAGES));
    setFranchiseEnquiries(getStorageData(STORAGE_KEYS.FRANCHISE_ENQUIRIES));
    setEnrollments(getStorageData(STORAGE_KEYS.ENROLLMENTS));
  }, [navigate]);

  const notifications = [
    ...feedback.filter(f => f.status === 'pending').map(f => ({ id: `fb-${f.id}`, type: 'feedback', sourceId: f.id, title: 'New Feedback', desc: `From ${f.studentName}`, date: f.date || new Date().toISOString() })),
    ...contactMessages.filter(m => m.status === 'new').map(m => ({ id: `msg-${m.id}`, type: 'message', sourceId: m.id, title: 'New Inquiry', desc: m.subject, date: m.date })),
    ...careerApps.filter(a => a.status !== 'read').map(a => ({ id: `app-${a.id}`, type: 'career', sourceId: a.id, title: 'Job Application', desc: `${a.name} applied for ${a.role}`, date: a.appliedAt || new Date().toISOString() }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleNotificationAction = (action: 'read' | 'delete' | 'clear', notifId?: string) => {
    if (action === 'clear') {
      if (!window.confirm("Mark all notifications as read?")) return;
      
      // Update all to read/resolved status
      const updatedMessages = contactMessages.map(m => ({ ...m, status: 'read' }));
      const updatedApps = careerApps.map(a => ({ ...a, status: 'read' }));
      // For feedback, we don't automatically approve, just mark as 'reviewed' if we had that state, 
      // but here we'll just keep them as pending but maybe hide them from this list if we add a 'read' flag.
      // For now, let's just do messages and apps for clear all.
      setStorageData(STORAGE_KEYS.CONTACT_MESSAGES, updatedMessages);
      setStorageData(STORAGE_KEYS.CAREER_APPS, updatedApps);
      setContactMessages(updatedMessages);
      setCareerApps(updatedApps);
      toast.success("Notifications cleared");
      return;
    }

    const [type, id] = notifId!.split('-');
    
    if (action === 'read') {
      if (type === 'fb') {
        const updated = feedback.map(f => f.id.toString() === id ? { ...f, status: 'reviewed' } : f);
        setStorageData(STORAGE_KEYS.FEEDBACK, updated);
        setFeedback(updated);
      } else if (type === 'msg') {
        const updated = contactMessages.map(m => m.id.toString() === id ? { ...m, status: 'read' } : m);
        setStorageData(STORAGE_KEYS.CONTACT_MESSAGES, updated);
        setContactMessages(updated);
      } else if (type === 'app') {
        const updated = careerApps.map(a => a.id.toString() === id ? { ...a, status: 'read' } : a);
        setStorageData(STORAGE_KEYS.CAREER_APPS, updated);
        setCareerApps(updated);
      }
      toast.success("Marked as read");
    } else if (action === 'delete') {
      if (!window.confirm("Delete this notification record?")) return;
      if (type === 'fb') {
        const updated = feedback.filter(f => f.id.toString() !== id);
        setStorageData(STORAGE_KEYS.FEEDBACK, updated);
        setFeedback(updated);
      } else if (type === 'msg') {
        const updated = contactMessages.filter(m => m.id.toString() !== id);
        setStorageData(STORAGE_KEYS.CONTACT_MESSAGES, updated);
        setContactMessages(updated);
      } else if (type === 'app') {
        const updated = careerApps.filter(a => a.id.toString() !== id);
        setStorageData(STORAGE_KEYS.CAREER_APPS, updated);
        setCareerApps(updated);
      }
      toast.success("Notification deleted");
    }
  };

  const handleLogout = () => {
    toast.info("Admin logging out...");
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setTimeout(() => navigate("/login"), 1000);
  };

  const deleteItem = (key: string, id: string, setter: any, label: string) => {
    if (window.confirm(`Are you absolutely sure you want to delete this ${label}? This action cannot be undone.`)) {
      const allData = getStorageData(key);
      const updated = allData.filter((item: any) => item.id !== id);
      setStorageData(key, updated);
      setter(updated);
      toast.success(`${label} deleted successfully`);
    }
  };

  const toggleFeedbackStatus = (id: string) => {
    const updated = feedback.map(f => f.id === id ? { ...f, status: f.status === 'approved' ? 'pending' : 'approved' } : f);
    setStorageData(STORAGE_KEYS.FEEDBACK, updated);
    setFeedback(updated);
    toast.success("Feedback status updated");
  };

  const analyticsData = [
    { name: 'Jan', students: 400, revenue: 2400 },
    { name: 'Feb', students: 300, revenue: 1398 },
    { name: 'Mar', students: 200, revenue: 9800 },
    { name: 'Apr', students: 278, revenue: 3908 },
    { name: 'May', students: 189, revenue: 4800 },
    { name: 'Jun', students: 239, revenue: 3800 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden font-poppins antialiased text-slate-800">
      {/* Sidebar - Sleek High-End */}
      <aside className="w-16 lg:w-64 bg-slate-950 text-white flex flex-col z-30 shadow-2xl border-r border-white/5">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 border border-white/10 shadow-lg shadow-primary/20">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div className="hidden lg:block">
            <span className="font-bold text-[9px] tracking-widest block uppercase text-primary mb-0.5 leading-none">Odisha Institute of</span>
            <span className="font-bold text-xs tracking-tighter block uppercase leading-none">Computer Application</span>
            <span className="text-slate-500 text-[8px] font-bold uppercase tracking-wider mt-1.5 block opacity-60">Admin Control</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-8 overflow-y-auto">
          {[
            { id: "overview", label: "Intelligence", Icon: LayoutDashboard },
            { id: "students", label: "Student Base", Icon: Users },
            { id: "topics", label: "Curriculum", Icon: Video },
            { id: "tests", label: "Assessments", Icon: PenTool },
            { id: "feedback", label: "Moderation", Icon: MessageSquare },
            { id: "branches", label: "Network", Icon: Building2 },
            { id: "gallery", label: "Media Assets", Icon: ImageIcon },
            { id: "careers", label: "Placements", Icon: Briefcase },
            { id: "inbox", label: "Inbox", Icon: MessageCircle },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-inner border border-white/5" 
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
              }`}
            >
              <item.Icon size={16} className={activeTab === item.id ? "text-primary" : "transition-colors"} />
              <span className="hidden lg:block font-bold text-[9px] tracking-widest uppercase">{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="sidebar-pill" className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold text-[9px] uppercase tracking-widest"
          >
            <LogOut size={16} />
            <span className="hidden lg:block">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative bg-[#f8fafc]">
        <header className="sticky top-0 bg-white/70 backdrop-blur-2xl border-b border-slate-200/60 px-6 py-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
             <h1 className="text-base font-bold text-slate-900 capitalize tracking-tight flex items-center gap-2">
                Command Center <ChevronRight size={14} className="text-slate-300" /> <span className="text-primary">{activeTab}</span>
             </h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-3 border-r border-slate-200 pr-4 mr-1">
                <div className="text-right">
                   <p className="text-[11px] font-bold text-slate-900">Administrator</p>
                   <p className="text-[8px] text-primary font-bold uppercase tracking-widest mt-0.5">Primary Access • HQ</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-xl shadow-slate-950/20">
                   <ShieldCheck size={18} />
                </div>
             </div>
              
              {/* Notifications Bell */}
              <div className="relative">
                 <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white transition-all relative group"
                 >
                    <Bell size={18} />
                    {notifications.length > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                    )}
                 </button>

                 <AnimatePresence>
                    {showNotifications && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-4 w-[400px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 z-50 overflow-hidden"
                        >
                <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                              <h3 className="font-bold text-slate-900 text-[11px] uppercase tracking-widest">Notification Center</h3>
                              <div className="flex items-center gap-3">
                                 <button 
                                  onClick={() => handleNotificationAction('clear')}
                                  className="text-[8px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest"
                                 >
                                    Clear All
                                 </button>
                                 <span className="px-2 py-0.5 bg-primary text-white rounded-md text-[8px] font-bold">{notifications.length} NEW</span>
                              </div>
                           </div>
                           <div className="max-h-[380px] overflow-y-auto">
                              {notifications.length === 0 ? (
                                <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                                   No new notifications
                                </div>
                              ) : (
                                notifications.map(notif => (
                                  <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 items-start group cursor-default">
                                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                       notif.type === 'feedback' ? 'bg-blue-50 text-blue-500' :
                                       notif.type === 'message' ? 'bg-emerald-50 text-emerald-500' : 'bg-violet-50 text-violet-500'
                                     }`}>
                                        {notif.type === 'feedback' ? <StarIcon size={14} /> : 
                                         notif.type === 'message' ? <MessageSquare size={14} /> : <Briefcase size={14} />}
                                     </div>
                                     <div className="flex-1">
                                        <div className="flex items-center justify-between mb-0.5">
                                           <p className="font-bold text-slate-900 text-[11px]">{notif.title}</p>
                                           <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <button 
                                                onClick={() => handleNotificationAction('read', notif.id)}
                                                className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"
                                                title="Mark as Read"
                                              >
                                                <CheckCircle2 size={14} />
                                              </button>
                                              <button 
                                                onClick={() => handleNotificationAction('delete', notif.id)}
                                                className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"
                                                title="Delete"
                                              >
                                                <Trash2 size={14} />
                                              </button>
                                           </div>
                                        </div>
                                        <p className="text-[11px] text-slate-500 font-medium mb-2">{notif.desc}</p>
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{new Date(notif.date).toLocaleDateString()}</p>
                                     </div>
                                  </div>
                                ))
                              )}
                           </div>
                           <div className="p-6 bg-slate-50 text-center border-t border-slate-100">
                              <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All Intelligence</button>
                           </div>
                        </motion.div>
                      </>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div 
                key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Students", value: students.length, trend: "+12%", icon: Users },
                    { label: "Course Modules", value: topics.length, trend: "Static", icon: Video },
                    { label: "Mock Exams", value: mockTests.length, trend: "4 Active", icon: PenTool },
                    { label: "Unreviewed Feedback", value: feedback.filter(f => f.status === 'pending').length, trend: "Action Needed", icon: MessageSquare },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                       <div className="flex items-center justify-between mb-4">
                          <div className={`w-10 h-10 rounded-lg bg-slate-50 text-slate-900 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all shadow-sm`}>
                            <stat.icon size={20} />
                          </div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.trend}</span>
                       </div>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                       <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "students" && (
              <motion.div key="students" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                 <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                    <div className="relative w-full max-w-sm">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                       <Input placeholder="Search student directory..." className="pl-11 h-11 rounded-xl bg-white border-slate-100 shadow-sm focus:ring-4 focus:ring-primary/5 font-bold text-xs" />
                    </div>
                    <div className="flex items-center gap-3">
                       <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-bold text-[9px] tracking-widest uppercase px-6">
                          <Download size={16} className="mr-2" /> EXPORT
                       </Button>
                       <Button className="h-11 rounded-xl bg-primary text-white font-bold text-[9px] tracking-widest uppercase px-8 shadow-xl shadow-primary/20">
                          <Plus size={16} className="mr-2" /> ENROLL NEW
                       </Button>
                    </div>
                 </div>

                 <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
                    <table className="w-full border-collapse">
                       <thead>
                          <tr className="bg-slate-50/50 border-b border-slate-100">
                             <th className="px-6 py-4 text-left text-[9px] font-bold text-slate-400 uppercase tracking-widest">Student Profile</th>
                             <th className="px-6 py-4 text-left text-[9px] font-bold text-slate-400 uppercase tracking-widest">Identifier</th>
                             <th className="px-6 py-4 text-left text-[9px] font-bold text-slate-400 uppercase tracking-widest">Progress</th>
                             <th className="px-6 py-4 text-left text-[9px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                             <th className="px-6 py-4 text-right text-[9px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {students.map(student => (
                            <tr key={student.id} className="group hover:bg-slate-50/50 transition-all">
                               <td className="px-6 py-3">
                                  <div className="flex items-center gap-3">
                                     <div className="w-9 h-9 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shadow-sm">
                                        <img src={student.photo} className="w-full h-full object-cover" alt="" />
                                     </div>
                                     <div>
                                        <p className="font-bold text-slate-900 text-xs leading-none mb-1">{student.name}</p>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{student.course || 'PGDCA'}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-3">
                                  <span className="font-bold text-[10px] text-primary bg-primary/5 px-2 py-1 rounded-md border border-primary/10 tracking-widest">{student.rollNo}</span>
                               </td>
                               <td className="px-6 py-3">
                                  <div className="flex items-center gap-3">
                                     <div className="flex-1 h-1.5 bg-slate-100 rounded-full max-w-[80px] overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: '65%' }} />
                                     </div>
                                     <span className="text-[9px] font-bold text-slate-400">65%</span>
                                  </div>
                               </td>
                               <td className="px-6 py-3">
                                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-bold text-[8px] uppercase tracking-widest border border-emerald-100">Authenticated</span>
                               </td>
                               <td className="px-6 py-3 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                     <button onClick={() => setSelectedStudent(student)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-primary hover:border-primary/20 transition-all"><Eye size={16} /></button>
                                     <button onClick={() => deleteItem(STORAGE_KEYS.USERS, student.id, setStudents, "student")} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all"><Trash2 size={16} /></button>
                                  </div>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 {/* Student Detail Modal (Overlay) */}
                 {selectedStudent && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-10">
                       <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl relative">
                          <button onClick={() => setSelectedStudent(null)} className="absolute top-8 right-8 w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all z-10">
                             <X size={24} />
                          </button>
                          
                          <div className="p-16">
                             <div className="flex items-center gap-8 mb-16 pb-16 border-b border-slate-100">
                                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-2xl ring-2 ring-slate-100">
                                   <img src={selectedStudent.photo} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div>
                                   <h2 className="text-4xl font-black text-slate-900 mb-2">{selectedStudent.name}</h2>
                                   <p className="text-lg font-bold text-primary flex items-center gap-3">
                                      {selectedStudent.rollNo} • <span className="text-slate-400">{selectedStudent.email}</span>
                                   </p>
                                </div>
                             </div>

                             <div className="grid md:grid-cols-2 gap-10">
                                <div className="bg-slate-50 rounded-[2rem] p-8">
                                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Video Completion Log</h4>
                                   <div className="space-y-4">
                                      {(selectedStudent.completedVideos || []).length > 0 ? selectedStudent.completedVideos.map((vId: string) => (
                                        <div key={vId} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100">
                                           <div className="w-8 h-8 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center"><CheckCircle2 size={16} /></div>
                                           <span className="text-xs font-bold text-slate-700">Lecture Archive ID: {vId}</span>
                                        </div>
                                      )) : (
                                        <p className="text-xs font-bold text-slate-400 py-10 text-center uppercase tracking-widest">No units completed yet</p>
                                      )}
                                   </div>
                                </div>

                                <div className="bg-slate-50 rounded-[2rem] p-8">
                                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Assessment Performance</h4>
                                   <div className="space-y-4 text-center py-10">
                                      <BarChart3 size={48} className="mx-auto text-slate-200 mb-4" />
                                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No test attempts recorded in history</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </motion.div>
                    </motion.div>
                 )}
              </motion.div>
            )}

            {activeTab === "topics" && (
              <motion.div key="topics" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h2 className="text-xl font-bold text-slate-900 mb-1">Academic Modules</h2>
                       <p className="text-slate-400 text-xs font-medium">Manage subject-based topics and content delivery.</p>
                    </div>
                    <Button className="h-11 rounded-xl bg-slate-900 text-white font-bold text-[9px] tracking-widest uppercase px-8 shadow-2xl">
                       <Plus size={16} className="mr-2" /> CREATE TOPIC
                    </Button>
                 </div>

                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map(topic => (
                       <div key={topic.id} className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm relative overflow-hidden group">
                          <div className="flex items-start justify-between mb-6">
                             <div className={`w-12 h-12 bg-${topic.color}-500/10 text-${topic.color}-600 rounded-xl flex items-center justify-center border border-${topic.color}-500/20`}>
                                <Video size={24} />
                             </div>
                             <div className="flex gap-1.5">
                                <button className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400 hover:text-primary transition-all"><PenTool size={16} /></button>
                                <button onClick={() => deleteItem(STORAGE_KEYS.TOPICS, topic.id, setTopics, "topic")} className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400 hover:text-rose-500 transition-all"><Trash2 size={16} /></button>
                             </div>
                          </div>
                          
                          <div className="mb-8">
                             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Sequence {topic.order}</span>
                             <h3 className="text-base font-bold text-slate-900 mb-2">{topic.name}</h3>
                             <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2">{topic.description}</p>
                          </div>

                          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                             <div className="flex items-center justify-between">
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Lectures</span>
                                <span className="text-[11px] font-bold text-slate-900">{lectures.filter(l => l.topicId === topic.id).length} Units</span>
                             </div>
                             <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Duration</span>
                                <span className="text-[11px] font-bold text-slate-900">~ 14.5h</span>
                             </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                             <Button variant="ghost" className="text-[9px] h-auto p-0 font-bold uppercase tracking-widest text-primary hover:bg-transparent">
                                MANAGE <ChevronRight size={14} className="ml-1" />
                             </Button>
                             <Plus className="text-slate-200 group-hover:text-primary transition-colors" size={16} />
                          </div>
                       </div>
                    ))}
                    
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-slate-100 transition-all min-h-[250px]">
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:scale-110 transition-all shadow-sm mb-4">
                          <Plus size={24} />
                       </div>
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Initiate Module</h4>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === "tests" && (
               <motion.div key="tests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="flex items-center justify-between">
                     <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-1">Examination Core</h2>
                        <p className="text-slate-400 text-xs font-medium">Design and deploy mock tests and evaluations.</p>
                     </div>
                     <Button className="h-11 rounded-xl bg-slate-900 text-white font-bold text-[9px] tracking-widest uppercase px-8 shadow-2xl">
                        <Plus size={16} className="mr-2" /> CONFIGURE TEST
                     </Button>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden p-6">
                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {mockTests.map(test => (
                           <div key={test.id} className="p-5 bg-[#f8fafc] rounded-xl border border-slate-100 hover:shadow-md transition-all group">
                              <div className="flex justify-between items-start mb-4">
                                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                    <PenTool size={18} />
                                 </div>
                                 <button onClick={() => deleteItem(STORAGE_KEYS.MOCK_TESTS, test.id, setMockTests, "mock test")} className="p-1.5 text-slate-300 hover:text-rose-500 transition-all"><Trash2 size={16} /></button>
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 mb-1">{test.topicName} Mock</h4>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                                 <Clock size={10} /> {test.timeLimit}m • {test.questions.length} Qs
                              </p>
                              
                              <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between">
                                 <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Edit Questions</span>
                                 <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            )}

            {activeTab === "feedback" && (
               <motion.div key="feedback" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div>
                     <h2 className="text-xl font-bold text-slate-900 mb-1">Student Testimonials</h2>
                     <p className="text-slate-400 text-xs font-medium">Moderate student feedback before it goes live.</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {feedback.map(item => (
                        <div key={item.id} className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm relative group overflow-hidden">
                           <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-100 shadow-sm">
                                    <img src={item.studentPhoto} className="w-full h-full object-cover" alt="" />
                                 </div>
                                 <div>
                                    <p className="font-bold text-slate-900 text-[11px] leading-none mb-1">{item.studentName}</p>
                                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{item.rollNo}</p>
                                 </div>
                              </div>
                              <div className={`px-2 py-0.5 rounded-md text-[7px] font-bold uppercase tracking-widest ${item.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                 {item.status}
                              </div>
                           </div>
                           
                           <div className="flex gap-0.5 mb-3">
                              {[1,2,3,4,5].map(star => (
                                 <StarIcon key={star} size={12} className={star <= item.rating ? "text-amber-400" : "text-slate-200"} fill={star <= item.rating ? "currentColor" : "none"} />
                              ))}
                           </div>

                           <p className="text-slate-600 text-[11px] font-medium leading-relaxed italic mb-6 line-clamp-3">
                              "{item.comment}"
                           </p>

                           <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                              <button 
                                 onClick={() => toggleFeedbackStatus(item.id)}
                                 className={`h-8 px-4 rounded-lg font-bold text-[8px] uppercase tracking-widest transition-all ${item.status === 'approved' ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                              >
                                 {item.status === 'approved' ? 'Revoke' : 'Approve'}
                              </button>
                              <button onClick={() => deleteItem(STORAGE_KEYS.FEEDBACK, item.id, setFeedback, "feedback")} className="w-8 h-8 flex items-center justify-center bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>
            )}

            {activeTab === "branches" && (
               <motion.div key="branches" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="flex items-center justify-between">
                     <h2 className="text-xl font-bold text-slate-900">Branch Network</h2>
                     <Button className="h-11 rounded-xl bg-slate-900 text-white font-bold text-[9px] tracking-widest uppercase px-8 shadow-2xl">
                        <Plus size={16} className="mr-2" /> REGISTER BRANCH
                     </Button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {branches.map(branch => (
                        <div key={branch.id} className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm relative group overflow-hidden transition-all hover:shadow-lg">
                           <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
                              <Building2 size={24} />
                           </div>
                           <h3 className="text-base font-bold text-slate-900 mb-1">{branch.name}</h3>
                           <p className="text-slate-400 text-[8px] font-bold uppercase tracking-widest mb-6">{branch.code} • Partner</p>
                           
                           <div className="bg-slate-50 rounded-lg p-4 space-y-2 mb-6">
                              <div className="flex items-center justify-between">
                                 <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Students</span>
                                 <span className="text-[11px] font-bold text-slate-900">142</span>
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
                                 <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Notice</span>
                                 <span className="text-[10px] font-bold text-emerald-500">Active</span>
                              </div>
                           </div>

                           <div className="flex gap-2">
                              <button className="flex-1 h-9 bg-white border border-slate-100 rounded-lg font-bold text-[8px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">Configure</button>
                              <button className="w-9 h-9 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>
            )}

            {activeTab === "gallery" && (
               <motion.div key="gallery" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  <div className="flex items-center justify-between">
                     <h2 className="text-xl font-bold text-slate-900">Cloud Media Assets</h2>
                     <Button className="rounded-xl h-11 px-8 bg-slate-900 text-white font-bold text-[9px] tracking-widest uppercase shadow-2xl">
                        <Upload size={16} className="mr-2" /> UPLOAD TO CDN
                     </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                     {gallery.map(img => (
                        <div key={img.id} className="group aspect-square relative bg-white rounded-xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-lg transition-all">
                           <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                           <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-950 hover:scale-110 transition-transform"><Eye size={16} /></button>
                              <button onClick={() => deleteItem(STORAGE_KEYS.GALLERY, img.id, setGallery, "media asset")} className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"><Trash2 size={16} /></button>
                           </div>
                        </div>
                     ))}
                     <div className="aspect-square border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:scale-110 transition-all mb-3 shadow-sm">
                           <Plus size={20} />
                        </div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest text-center">Add Media</p>
                     </div>
                  </div>
               </motion.div>
            )}

            {activeTab === "careers" && (
                <motion.div key="careers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                   <div className="grid lg:grid-cols-2 gap-8">
                      {/* Jobs Management */}
                      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
                         <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                               <h3 className="text-lg font-bold text-slate-900 mb-0.5">Corporate Stream</h3>
                               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Verify Job Postings & Organizations</p>
                            </div>
                         </div>
                         <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
                            {careerJobs.length > 0 ? careerJobs.map(job => (
                               <div key={job.id} className="p-6 hover:bg-slate-50 transition-all group">
                                  <div className="flex items-start justify-between mb-4">
                                     <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                                           <Briefcase size={22} />
                                        </div>
                                        <div>
                                           <p className="font-bold text-slate-900 text-sm leading-none mb-1.5">{job.jobTitle || job.title}</p>
                                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{job.companyName || job.company} • {job.location}</p>
                                        </div>
                                     </div>
                                     <div className="flex gap-2">
                                        <button 
                                          onClick={() => {
                                            const updated = careerJobs.map(j => j.id === job.id ? { ...j, status: j.status === 'approved' ? 'pending' : 'approved' } : j);
                                            setStorageData(STORAGE_KEYS.JOBS, updated);
                                            setCareerJobs(updated);
                                            toast.success(`Job ${job.status === 'approved' ? 'unapproved' : 'approved'}`);
                                          }}
                                          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
                                            job.status === 'approved' ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-100 text-slate-400 hover:text-emerald-500'
                                          }`}
                                        >
                                           <CheckCircle2 size={16} />
                                        </button>
                                        <button onClick={() => deleteItem(STORAGE_KEYS.JOBS, job.id, setCareerJobs, "job posting")} className="w-9 h-9 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-300 hover:text-rose-500 transition-all">
                                           <Trash2 size={16} />
                                        </button>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-4 pl-16">
                                     <button 
                                      onClick={() => {
                                        const updated = careerJobs.map(j => j.id === job.id ? { ...j, isOrgVerified: !j.isOrgVerified } : j);
                                        setStorageData(STORAGE_KEYS.JOBS, updated);
                                        setCareerJobs(updated);
                                        toast.success("Organization verification updated");
                                      }}
                                      className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border transition-all ${
                                        job.isOrgVerified ? 'bg-blue-500 text-white border-transparent' : 'bg-white text-slate-400 border-slate-200'
                                      }`}
                                     >
                                        {job.isOrgVerified ? 'Verified Org' : 'Unverified Org'}
                                     </button>
                                     <span className="text-[9px] font-bold text-slate-400">{job.salary} • {job.postedDate || "Simulation Data"}</span>
                                  </div>
                               </div>
                            )) : (
                               <div className="p-12 text-center text-slate-300 font-bold text-[9px] uppercase tracking-widest">No vacancy records</div>
                            )}
                         </div>
                      </div>

                      {/* Applications Management */}
                      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
                         <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-lg font-bold text-slate-900 mb-0.5">Talent Pool</h3>
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Verify Student Profiles & Certifications</p>
                         </div>
                         <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
                            {careerApps.length > 0 ? careerApps.map(app => (
                               <div key={app.id} className="p-6 hover:bg-slate-50 transition-all group">
                                  <div className="flex items-start justify-between mb-4">
                                     <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200 shadow-inner overflow-hidden">
                                           {app.studentPhoto ? <img src={app.studentPhoto} className="w-full h-full object-cover" alt="" /> : <Users size={22} />}
                                        </div>
                                        <div>
                                           <p className="font-bold text-slate-900 text-sm leading-none mb-1.5">{app.name || app.studentName}</p>
                                           <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{app.qualification} • {app.experience}</p>
                                        </div>
                                     </div>
                                     <div className="flex gap-2">
                                        <button 
                                          onClick={() => {
                                            const updated = careerApps.map(a => a.id === app.id ? { ...a, status: a.status === 'approved' ? 'pending' : 'approved' } : a);
                                            setStorageData(STORAGE_KEYS.CAREER_APPS, updated);
                                            setCareerApps(updated);
                                            toast.success(`Profile ${app.status === 'approved' ? 'unapproved' : 'approved'}`);
                                          }}
                                          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
                                            app.status === 'approved' ? 'bg-primary text-white' : 'bg-white border border-slate-100 text-slate-400 hover:text-primary'
                                          }`}
                                        >
                                           <CheckCircle2 size={16} />
                                        </button>
                                        <button onClick={() => deleteItem(STORAGE_KEYS.CAREER_APPS, app.id, setCareerApps, "application")} className="w-9 h-9 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-300 hover:text-rose-500 transition-all">
                                           <Trash2 size={16} />
                                        </button>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-4 pl-16">
                                     {app.isOicaStudent && (
                                       <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-amber-100">
                                          Roll: {app.rollNo || "OICA-2024-Verified"}
                                       </span>
                                     )}
                                     <button className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1.5">
                                        <Download size={14} /> View CV
                                     </button>
                                     <span className="text-[9px] font-bold text-slate-400 ml-auto">{app.date || app.appliedAt || "Simulation"}</span>
                                  </div>
                               </div>
                            )) : (
                               <div className="p-12 text-center text-slate-300 font-bold text-[9px] uppercase tracking-widest">Zero application records</div>
                            )}
                         </div>
                      </div>
                   </div>
                </motion.div>
             )}

            {activeTab === "inbox" && (
                <motion.div key="inbox" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Lead Command Center</h2>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Manage admissions, inquiries & partnerships</p>
                        </div>
                        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                           <button className="px-4 py-2 text-[9px] font-black uppercase tracking-widest bg-primary text-white rounded-lg shadow-lg shadow-primary/20">Unified View</button>
                           <button className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600">Archived</button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Admissions Column */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" /> Admissions
                                </h3>
                                <span className="text-[10px] font-black text-slate-400">{enrollments.length}</span>
                            </div>
                            <div className="space-y-4">
                                {enrollments.length > 0 ? enrollments.map(app => (
                                    <div key={app.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-black text-slate-900 text-xs mb-1">{app.name}</h4>
                                                <p className="text-[9px] text-primary font-bold uppercase tracking-widest">{app.course}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                                                app.status === 'new' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
                                            }`}>{app.status}</span>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <p className="text-[10px] font-bold text-slate-500 flex items-center gap-2">
                                                <Phone size={12} className="text-slate-300" /> {app.phone}
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-500 flex items-center gap-2">
                                                <MapPin size={12} className="text-slate-300" /> {app.district}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <span className="text-[8px] font-bold text-slate-400 uppercase">{app.date}</span>
                                            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => deleteItem(STORAGE_KEYS.ENROLLMENTS, app.id, setEnrollments, "admission lead")} className="p-1.5 text-slate-300 hover:text-rose-500"><Trash2 size={14} /></button>
                                                <button className="p-1.5 text-slate-300 hover:text-primary"><CheckCircle2 size={14} /></button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">No Admission Leads</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contact Messages Column */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" /> Inquiries
                                </h3>
                                <span className="text-[10px] font-black text-slate-400">{contactMessages.length}</span>
                            </div>
                            <div className="space-y-4">
                                {contactMessages.length > 0 ? contactMessages.map(msg => (
                                    <div key={msg.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-black text-slate-900 text-xs mb-1">{msg.name}</h4>
                                                <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest line-clamp-1">{msg.subject || "General Inquiry"}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                                                msg.status === 'new' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                                            }`}>{msg.status}</span>
                                        </div>
                                        <p className="text-[10px] font-medium text-slate-500 leading-relaxed line-clamp-2 mb-4">
                                            {msg.message}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <span className="text-[8px] font-bold text-slate-400 uppercase">{msg.date}</span>
                                            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => deleteItem(STORAGE_KEYS.CONTACT_MESSAGES, msg.id, setContactMessages, "message")} className="p-1.5 text-slate-300 hover:text-rose-500"><Trash2 size={14} /></button>
                                                <button className="p-1.5 text-slate-300 hover:text-primary"><MessageSquare size={14} /></button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">No Contact Records</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Franchise Column */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-500" /> Partnerships
                                </h3>
                                <span className="text-[10px] font-black text-slate-400">{franchiseEnquiries.length}</span>
                            </div>
                            <div className="space-y-4">
                                {franchiseEnquiries.length > 0 ? franchiseEnquiries.map(enq => (
                                    <div key={enq.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-black text-slate-900 text-xs mb-1">{enq.name}</h4>
                                                <p className="text-[9px] text-amber-600 font-bold uppercase tracking-widest">{enq.district}, {enq.city}</p>
                                            </div>
                                            <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md text-[8px] font-black uppercase tracking-widest">{enq.premises === 'Yes' ? 'Has Premises' : 'No Premises'}</span>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <p className="text-[10px] font-bold text-slate-500 flex items-center gap-2">
                                                <Building2 size={12} className="text-slate-300" /> {enq.premisesType}
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-500 flex items-center gap-2">
                                                <Phone size={12} className="text-slate-300" /> {enq.phone}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <span className="text-[8px] font-bold text-slate-400 uppercase">{enq.date}</span>
                                            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => deleteItem(STORAGE_KEYS.FRANCHISE_ENQUIRIES, enq.id, setFranchiseEnquiries, "franchise enq")} className="p-1.5 text-slate-300 hover:text-rose-500"><Trash2 size={14} /></button>
                                                <button className="p-1.5 text-slate-300 hover:text-primary"><ShieldCheck size={14} /></button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">No Franchise Leads</p>
                                    </div>
                                )}
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

export default AdminDashboard;
