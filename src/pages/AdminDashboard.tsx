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
   Download,
   Upload,
   Briefcase,
   CheckCircle2,
   MessageSquare,
   Star as StarIcon,
   PenTool,
   X,
   ChevronRight,
   Clock,
   Bell,
   Phone,
   MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
   const [finalTests, setFinalTests] = useState<any[]>([]);
   const [contactMessages, setContactMessages] = useState<any[]>([]);
   const [franchiseEnquiries, setFranchiseEnquiries] = useState<any[]>([]);
   const [enrollments, setEnrollments] = useState<any[]>([]);
   const [employees, setEmployees] = useState<any[]>([]);
   const [employeeTasks, setEmployeeTasks] = useState<any[]>([]);

   // UI State
   const [showNotifications, setShowNotifications] = useState(false);

   // Selection/Modal State
   const [selectedStudent, setSelectedStudent] = useState<any>(null);
   const [isAddingStudent, setIsAddingStudent] = useState(false);
   const [newStudentData, setNewStudentData] = useState({ name: "", course: "DCA", rollNo: "", email: "", phone: "", branchId: "" });

   // Task Modal State
   const [isAssigningTask, setIsAssigningTask] = useState(false);
   const [newTaskData, setNewTaskData] = useState({ title: "", description: "", employeeIds: [] as number[], dueDate: "" });

   useEffect(() => {
      const session = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (!session || JSON.parse(session).role !== 'admin') {
         navigate("/login/admin");
         return;
      }

      // Load Data
      const allUsers = getStorageData(STORAGE_KEYS.USERS);
      setStudents(allUsers.filter((u: any) => u.role === 'student'));
      setEmployees(allUsers.filter((u: any) => u.role === 'employee'));
      
      setBranches(getStorageData(STORAGE_KEYS.BRANCHES));
      setGallery(getStorageData(STORAGE_KEYS.GALLERY));
      setCareerJobs(getStorageData(STORAGE_KEYS.JOBS));
      setCareerApps(getStorageData(STORAGE_KEYS.CAREER_APPS));
      setTopics(getStorageData(STORAGE_KEYS.TOPICS));
      setLectures(getStorageData(STORAGE_KEYS.LECTURES));
      setMockTests(getStorageData(STORAGE_KEYS.MOCK_TESTS).filter((t: any) => !t.isFinal));
      setFinalTests(getStorageData(STORAGE_KEYS.MOCK_TESTS).filter((t: any) => t.isFinal));
      setFeedback(getStorageData(STORAGE_KEYS.FEEDBACK));
      setContactMessages(getStorageData(STORAGE_KEYS.CONTACT_MESSAGES));
      setFranchiseEnquiries(getStorageData(STORAGE_KEYS.FRANCHISE_ENQUIRIES));
      setEnrollments(getStorageData(STORAGE_KEYS.ENROLLMENTS));
      setEmployeeTasks(getStorageData(STORAGE_KEYS.TASKS));
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

   const handleExport = () => {
      toast.info("Compiling global student database for export...");
      setTimeout(() => {
         console.log("Exporting All Students:", students);
         toast.success("Global student record exported!");
      }, 1500);
   };

   const handleEnrollStudent = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newStudentData.name || !newStudentData.rollNo || !newStudentData.branchId) {
         toast.error("Please fill all required fields including branch");
         return;
      }

      const newStudent = {
         id: Date.now(),
         ...newStudentData,
         role: 'student',
         photo: `https://i.pravatar.cc/150?u=${Date.now()}`,
         completedVideos: [],
         age: 20
      };

      const allUsers = getStorageData(STORAGE_KEYS.USERS);
      const updatedUsers = [newStudent, ...allUsers];
      setStorageData(STORAGE_KEYS.USERS, updatedUsers);
      setStudents(updatedUsers.filter((u: any) => u.role === 'student'));

      setIsAddingStudent(false);
      setNewStudentData({ name: "", course: "DCA", rollNo: "", email: "", phone: "", branchId: "" });
      toast.success(`Student ${newStudentData.name} enrolled to system!`);
   };

   const [studentToDelete, setStudentToDelete] = useState<any>(null);
   const [deleteStep, setDeleteStep] = useState(0);

   const initiateDeleteStudent = (student: any) => {
      setStudentToDelete(student);
      setDeleteStep(1);
   };

   const confirmDeleteStudent = () => {
      if (deleteStep === 1) {
         setDeleteStep(2);
      } else {
         const allUsers = getStorageData(STORAGE_KEYS.USERS);
         const updated = allUsers.filter((u: any) => u.id !== studentToDelete.id);
         setStorageData(STORAGE_KEYS.USERS, updated);
         setStudents(updated.filter((u: any) => u.role === 'student'));
         toast.success("Student deleted permanently");
         setStudentToDelete(null);
         setDeleteStep(0);
      }
   };

   const toggleStudentStatus = (id: number, status: 'active' | 'inactive') => {
      const allUsers = getStorageData(STORAGE_KEYS.USERS);
      const updated = allUsers.map((u: any) => u.id === id ? { ...u, status } : u);
      setStorageData(STORAGE_KEYS.USERS, updated);
      setStudents(updated.filter((u: any) => u.role === 'student'));
      toast.success(`Student ${status === 'active' ? 'activated' : 'deactivated'} successfully`);
   };

   const handleAssignTask = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTaskData.title || !newTaskData.description || newTaskData.employeeIds.length === 0 || !newTaskData.dueDate) {
         toast.error("Please fill all required fields and select at least one employee.");
         return;
      }

      const newTask = {
         id: `task_${Date.now()}`,
         ...newTaskData,
         status: "pending",
         assignedAt: new Date().toISOString()
      };

      const allTasks = getStorageData(STORAGE_KEYS.TASKS);
      const updatedTasks = [newTask, ...allTasks];
      setStorageData(STORAGE_KEYS.TASKS, updatedTasks);
      setEmployeeTasks(updatedTasks);
      
      setIsAssigningTask(false);
      setNewTaskData({ title: "", description: "", employeeIds: [], dueDate: "" });
      toast.success(`Task assigned to ${newTaskData.employeeIds.length} employee(s)`);
   };

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
                  { id: "overview", label: "Dashboard", Icon: LayoutDashboard },
                  { id: "employees", label: "Employee Works", Icon: Briefcase },
                  { id: "students", label: "All Students", Icon: Users },
                  { id: "topics", label: "Lecture Management", Icon: Video },
                  { id: "tests", label: "Mock Test", Icon: PenTool },
                  { id: "final-tests", label: "Final Test", Icon: ShieldCheck },
                  { id: "feedback", label: "Feedback Management", Icon: MessageSquare },
                  { id: "branches", label: "Branch Management", Icon: Building2 },
                  { id: "gallery", label: "Gallery Management", Icon: ImageIcon },
               ].map(item => (
                  <button
                     key={item.id}
                     onClick={() => setActiveTab(item.id)}
                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${activeTab === item.id
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
                  <span className="hidden lg:block">LOG OUT</span>
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
                                             <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${notif.type === 'feedback' ? 'bg-blue-50 text-blue-500' :
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

                  {activeTab === "employees" && (
                     <motion.div key="employees" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                           <div>
                              <h2 className="text-xl font-bold text-slate-900 mb-1">Employee Work Management</h2>
                              <p className="text-slate-400 text-xs font-medium">Assign tasks and track daily reports.</p>
                           </div>
                           <Button onClick={() => setIsAssigningTask(true)} className="h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[9px] tracking-widest uppercase px-8 shadow-xl shadow-amber-500/20">
                              <Plus size={16} className="mr-2" /> ASSIGN TASK
                           </Button>
                        </div>

                        <div className="space-y-8">
                           {/* Employees Overview */}
                           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {employees.map(emp => {
                                 const empTasks = employeeTasks.filter(t => t.employeeIds.includes(emp.id));
                                 const pendingCount = empTasks.filter(t => t.status === "pending").length;
                                 const completedCount = empTasks.filter(t => t.status === "completed").length;
                                 return (
                                    <div key={emp.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                                       <img src={emp.photo} alt={emp.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                                       <div className="flex-1">
                                          <h4 className="font-bold text-slate-900 text-sm">{emp.name}</h4>
                                          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-3">{emp.branchId}</p>
                                          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                             <span className="flex items-center gap-1.5"><Clock size={12} className="text-rose-500" /> {pendingCount} Pending</span>
                                             <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> {completedCount} Done</span>
                                          </div>
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>

                           {/* Task List (Review Work) */}
                           <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                              <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                                 <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">All Assigned Works</h3>
                              </div>
                              <div className="divide-y divide-slate-50">
                                 {employeeTasks.length > 0 ? employeeTasks.map(task => (
                                    <div key={task.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                                       <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                          <div className="flex-1">
                                             <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-base font-bold text-slate-900">{task.title}</h4>
                                                {task.status === "completed" ? (
                                                   <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-widest border border-emerald-100">Completed</span>
                                                ) : (
                                                   <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[9px] font-bold uppercase tracking-widest border border-amber-100">Pending</span>
                                                )}
                                             </div>
                                             <p className="text-sm text-slate-500 mb-4">{task.description}</p>
                                             
                                             {task.status === "completed" && task.employeeReport && (
                                                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl mt-4">
                                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Submitted Report</p>
                                                   <p className="text-sm text-slate-700 font-medium">"{task.employeeReport}"</p>
                                                </div>
                                             )}
                                          </div>
                                          <div className="text-left md:text-right w-48 shrink-0">
                                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned To</p>
                                             <div className="flex flex-wrap gap-1 md:justify-end mb-4">
                                                {task.employeeIds.map((eid: number) => {
                                                   const emp = employees.find(e => e.id === eid);
                                                   return emp ? (
                                                      <span key={eid} className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
                                                         {emp.name}
                                                      </span>
                                                   ) : null;
                                                })}
                                             </div>
                                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                                             <p className="text-xs font-bold text-slate-900">{new Date(task.dueDate).toLocaleDateString()}</p>
                                          </div>
                                       </div>
                                    </div>
                                 )) : (
                                    <div className="p-16 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                                       No tasks assigned yet
                                    </div>
                                 )}
                              </div>
                           </div>
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
                              <Button
                                 onClick={handleExport}
                                 variant="outline"
                                 className="h-11 rounded-xl border-slate-200 font-bold text-[9px] tracking-widest uppercase px-6"
                              >
                                 <Download size={16} className="mr-2" /> EXPORT
                              </Button>
                              <Button
                                 onClick={() => setIsAddingStudent(true)}
                                 className="h-11 rounded-xl bg-primary text-white font-bold text-[9px] tracking-widest uppercase px-8 shadow-xl shadow-primary/20"
                              >
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
                                       </td><td className="px-6 py-3">
                                          <span className={`px-3 py-1 rounded-full font-bold text-[8px] uppercase tracking-widest border ${student.status === 'inactive' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                             {student.status === 'inactive' ? 'Deactivated' : 'Active'}
                                          </span>
                                       </td>
                                       <td className="px-6 py-3 text-right">
                                          <div className="flex items-center justify-end gap-2">
                                             <button onClick={() => setSelectedStudent(student)} title="Details" className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-primary hover:border-primary/20 transition-all"><Eye size={14} /></button>
                                             {student.status === 'inactive' ? (
                                                <button onClick={() => toggleStudentStatus(student.id, 'active')} title="Activate" className="w-8 h-8 flex items-center justify-center bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"><CheckCircle2 size={14} /></button>
                                             ) : (
                                                <button onClick={() => toggleStudentStatus(student.id, 'inactive')} title="Deactivate" className="w-8 h-8 flex items-center justify-center bg-amber-50 border border-amber-100 rounded-lg text-amber-500 hover:bg-amber-500 hover:text-white transition-all"><X size={14} /></button>
                                             )}
                                             <button onClick={() => initiateDeleteStudent(student)} title="Delete" className="w-8 h-8 flex items-center justify-center bg-rose-50 border border-rose-100 rounded-lg text-rose-400 hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={14} /></button>
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

                  {activeTab === "final-tests" && (
                     <motion.div key="final-tests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        <div className="flex items-center justify-between">
                           <div>
                              <h2 className="text-xl font-bold text-slate-900 mb-1">Final Examination Center</h2>
                              <p className="text-slate-400 text-xs font-medium">Create and manage certification exams for each course.</p>
                           </div>
                           <Button className="h-11 rounded-xl bg-primary text-white font-bold text-[9px] tracking-widest uppercase px-8 shadow-2xl">
                              <Plus size={16} className="mr-2" /> CREATE FINAL TEST
                           </Button>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden p-6">
                           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {finalTests.length > 0 ? finalTests.map(test => (
                                 <div key={test.id} className="p-5 bg-slate-950 rounded-xl border border-white/10 hover:shadow-xl transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3">
                                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                       <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-primary transition-all shadow-sm">
                                          <ShieldCheck size={18} />
                                       </div>
                                       <button onClick={() => deleteItem(STORAGE_KEYS.MOCK_TESTS, test.id, setFinalTests, "final test")} className="p-1.5 text-white/20 hover:text-rose-500 transition-all"><Trash2 size={16} /></button>
                                    </div>
                                    <h4 className="text-sm font-bold text-white mb-1">{test.topicName || "Course"} Final</h4>
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                                       <Clock size={10} /> {test.timeLimit}m • {test.questions.length} Qs
                                    </p>

                                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                       <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Configure Certification</span>
                                       <ChevronRight size={14} className="text-white/20 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                 </div>
                              )) : (
                                 <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                                    <ShieldCheck size={40} className="mx-auto text-slate-200 mb-4" />
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No final tests created yet</p>
                                 </div>
                              )}
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
                                    {[1, 2, 3, 4, 5].map(star => (
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
                                                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${job.status === 'approved' ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-100 text-slate-400 hover:text-emerald-500'
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
                                             className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border transition-all ${job.isOrgVerified ? 'bg-blue-500 text-white border-transparent' : 'bg-white text-slate-400 border-slate-200'
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
                                                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${app.status === 'approved' ? 'bg-primary text-white' : 'bg-white border border-slate-100 text-slate-400 hover:text-primary'
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
                                          <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${app.status === 'new' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
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
                                          <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${msg.status === 'new' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
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
                        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden"
                     >
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                           <div>
                              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Manual System Enrollment</h3>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Directly Add Student to Central Database</p>
                           </div>
                           <button onClick={() => setIsAddingStudent(false)} className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all">
                              <X size={20} />
                           </button>
                        </div>

                        <form onSubmit={handleEnrollStudent} className="p-10 space-y-8">
                           <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Name</label>
                                 <Input
                                    required
                                    placeholder="Full Name"
                                    value={newStudentData.name}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, name: e.target.value })}
                                    className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold text-xs"
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Roll Number</label>
                                 <Input
                                    required
                                    placeholder="OICA/2026/..."
                                    value={newStudentData.rollNo}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, rollNo: e.target.value })}
                                    className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold text-xs"
                                 />
                              </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assign to Branch</label>
                                 <select
                                    required
                                    className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white px-4 transition-all font-bold text-xs outline-none"
                                    value={newStudentData.branchId}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, branchId: e.target.value })}
                                 >
                                    <option value="">Select Branch</option>
                                    {branches.map(b => (
                                       <option key={b.id} value={b.id}>{b.name} ({b.location})</option>
                                    ))}
                                 </select>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course Program</label>
                                 <select
                                    className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white px-4 transition-all font-bold text-xs outline-none"
                                    value={newStudentData.course}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, course: e.target.value })}
                                 >
                                    <option>DCA</option>
                                    <option>PGDCA</option>
                                    <option>Tally ERP.9</option>
                                    <option>Graphic Design</option>
                                    <option>Web Development</option>
                                    <option>Digital Marketing</option>
                                 </select>
                              </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                 <Input
                                    type="email"
                                    placeholder="student@example.com"
                                    value={newStudentData.email}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, email: e.target.value })}
                                    className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold text-xs"
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                 <Input
                                    placeholder="+91"
                                    value={newStudentData.phone}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, phone: e.target.value })}
                                    className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold text-xs"
                                 />
                              </div>
                           </div>

                           <div className="pt-6 flex gap-6">
                              <Button
                                 type="button"
                                 onClick={() => setIsAddingStudent(false)}
                                 variant="outline"
                                 className="flex-1 h-16 rounded-2xl border-slate-200 font-black text-[11px] tracking-widest uppercase"
                              >
                                 Cancel Enrollment
                              </Button>
                              <Button
                                 type="submit"
                                 className="flex-[1.5] h-16 rounded-2xl bg-primary text-white font-black text-[11px] tracking-widest uppercase shadow-2xl shadow-primary/20"
                              >
                                 Finalize & Add Student
                              </Button>
                           </div>
                        </form>
                     </motion.div>
                  </div>
               )}
            </AnimatePresence>

            {/* Double Confirmation Delete Modal */}
            <AnimatePresence>
               {studentToDelete && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                     <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => { setStudentToDelete(null); setDeleteStep(0); }}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
                     />
                     <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-rose-100"
                     >
                        <div className={`p-8 text-center ${deleteStep === 2 ? 'bg-rose-500 text-white' : 'bg-white'}`}>
                           <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 ${deleteStep === 2 ? 'bg-white/20' : 'bg-rose-50'}`}>
                              <Trash2 size={40} className={deleteStep === 2 ? 'text-white' : 'text-rose-500'} />
                           </div>
                           <h3 className={`text-xl font-black mb-2 ${deleteStep === 2 ? 'text-white' : 'text-slate-900'}`}>
                              {deleteStep === 1 ? 'Confirm Deletion' : 'FINAL WARNING'}
                           </h3>
                           <p className={`text-sm font-medium mb-8 ${deleteStep === 2 ? 'text-white/90' : 'text-slate-500'}`}>
                              {deleteStep === 1 
                                 ? `Are you sure you want to delete ${studentToDelete.name}?` 
                                 : `This action is IRREVERSIBLE. All data for ${studentToDelete.name} will be permanently erased. Proceed?`}
                           </p>
                           
                           <div className="flex gap-4">
                              <button 
                                 onClick={() => { setStudentToDelete(null); setDeleteStep(0); }}
                                 className={`flex-1 h-14 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all ${deleteStep === 2 ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                              >
                                 Cancel
                              </button>
                              <button 
                                 onClick={confirmDeleteStudent}
                                 className={`flex-[1.5] h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl ${deleteStep === 2 ? 'bg-white text-rose-600 hover:bg-rose-50 shadow-rose-900/20' : 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20'}`}
                              >
                                 {deleteStep === 1 ? 'Yes, Continue' : 'YES, DELETE PERMANENTLY'}
                              </button>
                           </div>
                        </div>
                     </motion.div>
                  </div>
               )}
             </AnimatePresence>

             {/* Task Assignment Modal */}
             <AnimatePresence>
               {isAssigningTask && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                     <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsAssigningTask(false)}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
                     />
                     <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100"
                     >
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                           <h3 className="font-bold text-slate-900 flex items-center gap-2">
                              <Briefcase size={18} className="text-amber-500" /> Assign New Task
                           </h3>
                           <button onClick={() => setIsAssigningTask(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-colors">
                              <X size={16} />
                           </button>
                        </div>
                        <form onSubmit={handleAssignTask} className="p-6 space-y-5">
                           <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Task Title</label>
                              <Input 
                                 value={newTaskData.title}
                                 onChange={e => setNewTaskData({...newTaskData, title: e.target.value})}
                                 placeholder="E.g. Monthly Report Generation"
                                 className="h-11 rounded-xl bg-slate-50 border-slate-200"
                                 required
                              />
                           </div>
                           <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Description / Instructions</label>
                              <textarea 
                                 value={newTaskData.description}
                                 onChange={e => setNewTaskData({...newTaskData, description: e.target.value})}
                                 placeholder="Detailed instructions..."
                                 className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-xl resize-none text-sm"
                                 required
                              ></textarea>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Select Employees</label>
                                 <select 
                                    multiple
                                    value={newTaskData.employeeIds.map(String)}
                                    onChange={e => {
                                       const options = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                                       setNewTaskData({...newTaskData, employeeIds: options});
                                    }}
                                    className="w-full h-24 p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20"
                                    required
                                 >
                                    {employees.map(emp => (
                                       <option key={emp.id} value={emp.id}>{emp.name} ({emp.branchId})</option>
                                    ))}
                                 </select>
                                 <p className="text-[9px] text-slate-400 mt-1 font-medium">Hold Ctrl/Cmd to select multiple</p>
                              </div>
                              <div>
                                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Due Date</label>
                                 <Input 
                                    type="date"
                                    value={newTaskData.dueDate}
                                    onChange={e => setNewTaskData({...newTaskData, dueDate: e.target.value})}
                                    className="h-11 rounded-xl bg-slate-50 border-slate-200"
                                    required
                                 />
                              </div>
                           </div>
                           <div className="pt-4 flex gap-3">
                              <button type="button" onClick={() => setIsAssigningTask(false)} className="flex-1 h-12 rounded-xl bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors">
                                 Cancel
                              </button>
                              <button type="submit" className="flex-[2] h-12 rounded-xl bg-amber-500 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2">
                                 <CheckCircle2 size={16} /> Assign Task
                              </button>
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

export default AdminDashboard;
