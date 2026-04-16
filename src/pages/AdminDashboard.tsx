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
  Upload
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
  const [lectures, setLectures] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!session || JSON.parse(session).role !== 'admin') {
      navigate("/login/admin");
      return;
    }
    
    // Load Data
    setStudents(getStorageData(STORAGE_KEYS.USERS).filter((u: any) => u.role === 'student'));
    setBranches(getStorageData(STORAGE_KEYS.BRANCHES));
    setLectures(getStorageData(STORAGE_KEYS.LECTURES));
    setGallery(getStorageData(STORAGE_KEYS.GALLERY));
  }, [navigate]);

  const handleLogout = () => {
    toast.info("Admin logging out...");
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setTimeout(() => navigate("/login"), 1000);
  };

  const deleteStudent = (id: string) => {
    const updated = students.filter(s => s.id !== id);
    const allUsers = getStorageData(STORAGE_KEYS.USERS);
    const filteredUsers = allUsers.filter((u: any) => u.id !== id);
    setStorageData(STORAGE_KEYS.USERS, filteredUsers);
    setStudents(updated);
    toast.success("Student removed successfully");
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
    <div className="h-screen bg-slate-50 flex overflow-hidden font-sans antialiased text-slate-800">
      {/* Sidebar - Sleek High-End */}
      <aside className="w-20 lg:w-64 bg-slate-950 text-white flex flex-col z-30 shadow-xl border-r border-slate-900 border-opacity-50">
        <div className="p-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 border border-white/10 shadow-lg shadow-primary/20">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div className="hidden lg:block">
            <span className="font-heading font-black text-[10px] tracking-widest block uppercase text-primary mb-1 leading-none">Odisha Institute of</span>
            <span className="font-heading font-black text-xs tracking-tighter block uppercase leading-none">Computer Application</span>
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2 block">Main Branch / Head Quarter</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-10">
          {[
            { id: "overview", label: "Overview", Icon: LayoutDashboard },
            { id: "students", label: "Students", Icon: Users },
            { id: "branches", label: "Branches", Icon: Building2 },
            { id: "lectures", label: "Lectures", Icon: Video },
            { id: "gallery", label: "Gallery", Icon: ImageIcon },
            { id: "reports", label: "Analytics", Icon: BarChart3 },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? "bg-primary text-white shadow-xl shadow-primary/30" 
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <item.Icon size={18} className={activeTab === item.id ? "text-white" : "group-hover:text-primary transition-colors"} />
              <span className="hidden lg:block font-black text-[11px] tracking-widest uppercase">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-900">
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
      <main className="flex-1 h-full overflow-y-auto relative bg-[#fcfdfe]">
        <header className="sticky top-0 bg-white/70 backdrop-blur-2xl border-b border-slate-200 px-10 py-5 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-1.5 border border-slate-200">
                <Activity size={14} className="text-primary animate-pulse" />
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{activeTab}</span>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden sm:flex items-center gap-3 border-r border-slate-200 pr-6">
                <div className="text-right">
                   <p className="text-xs font-black text-slate-900 leading-none">Admin Authority</p>
                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Status: Master</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl">
                   <ShieldCheck size={20} />
                </div>
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
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { label: "Total Students", value: students.length, trend: "+12.5%", icon: Users, color: "blue" },
                    { label: "Partner Branches", value: branches.length, trend: "+2 new", icon: Building2, color: "emerald" },
                    { label: "Video Lectures", value: lectures.length, trend: "+5 this week", icon: Video, color: "indigo" },
                    { label: "Live Storage", value: "1.2 TB", trend: "Balanced", icon: ShieldCheck, color: "amber" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                       <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color === 'blue' ? 'blue' : stat.color === 'emerald' ? 'emerald' : stat.color === 'indigo' ? 'indigo' : 'amber'}-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform`} />
                       <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-2xl bg-${stat.color === 'blue' ? 'blue' : stat.color === 'emerald' ? 'emerald' : stat.color === 'indigo' ? 'indigo' : 'amber'}-50 text-${stat.color}-600 flex items-center justify-center border border-${stat.color}-100`}>
                            <stat.icon size={22} />
                          </div>
                          <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                       </div>
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                       <p className="text-3xl font-heading font-black text-slate-900">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                   <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="text-xl font-heading font-black text-slate-900">Enrollment Dynamics</h3>
                         <Button variant="outline" className="h-9 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 px-4">
                            Last 30 Days <Filter size={14} className="ml-2" />
                         </Button>
                      </div>
                      <div className="h-[350px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData}>
                               <defs>
                                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                  </linearGradient>
                               </defs>
                               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                               <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                               <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                               <Tooltip 
                                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff', fontSize: '10px' }}
                                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                               />
                               <Area type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
                            </AreaChart>
                         </ResponsiveContainer>
                      </div>
                   </div>

                   <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                      <h3 className="text-xl font-heading font-black mb-1">System Health</h3>
                      <p className="text-slate-400 text-xs font-medium mb-10 tracking-tight">OICA Infrastructure Monitoring</p>
                      
                      <div className="space-y-8">
                         {[
                            { label: "Server CPU", value: "24%", color: "emerald" },
                            { label: "Bandwidth Usage", value: "68%", color: "primary" },
                            { label: "Active Sessions", value: "142", color: "indigo" },
                         ].map(item => (
                            <div key={item.label}>
                               <div className="flex justify-between mb-3">
                                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">{item.label}</span>
                                  <span className="text-xs font-black">{item.value}</span>
                               </div>
                               <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: item.value.includes('%') ? item.value : '40%' }} 
                                    className={`h-full bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]`} 
                                  />
                               </div>
                            </div>
                         ))}
                      </div>

                      <div className="mt-12 pt-10 border-t border-white/5">
                         <Button className="w-full h-12 rounded-2xl bg-white text-slate-900 font-black text-[10px] tracking-widest uppercase hover:bg-slate-100 shadow-xl">
                            GENERATE HQ REPORT <ArrowUpRight size={14} className="ml-2" />
                         </Button>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "students" && (
              <motion.div key="students" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                 <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
                    <div className="relative w-full max-w-md">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                       <Input placeholder="Search students by roll, name, branch..." className="pl-12 h-14 rounded-2xl bg-white border-slate-200 shadow-sm focus:ring-primary/20" />
                    </div>
                    <div className="flex items-center gap-3">
                       <Button variant="outline" className="h-14 rounded-2xl border-slate-200 font-black text-[10px] tracking-widest uppercase px-6">
                          <Download size={16} className="mr-2" /> EXPORT CSV
                       </Button>
                       <Button className="h-14 rounded-2xl bg-slate-900 text-white font-black text-[10px] tracking-widest uppercase px-8 shadow-xl">
                          <Plus size={16} className="mr-2" /> ENROLL STUDENT
                       </Button>
                    </div>
                 </div>

                 <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full border-collapse">
                       <thead>
                          <tr className="bg-slate-50/50 border-b border-slate-100">
                             <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Student Identity</th>
                             <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Roll Identifier</th>
                             <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Branch Office</th>
                             <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                             <th className="px-8 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Action</th>
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
                                     <div>
                                        <p className="font-bold text-slate-900 text-sm leading-none">{student.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold mt-1">{student.email}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-8 py-6">
                                  <span className="font-black text-[11px] text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{student.rollNo}</span>
                               </td>
                               <td className="px-8 py-6">
                                  <p className="text-sm font-bold text-slate-700">OICA-Main-HQ</p>
                               </td>
                               <td className="px-8 py-6">
                                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-black text-[9px] uppercase tracking-widest">Active</span>
                               </td>
                               <td className="px-8 py-6 text-right">
                                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-lg"><Eye size={16} /></button>
                                     <button onClick={() => deleteStudent(student.id)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors hover:bg-rose-500/5 rounded-lg"><Trash2 size={16} /></button>
                                  </div>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </motion.div>
            )}

            {activeTab === "gallery" && (
               <motion.div key="gallery" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                  <div className="flex items-center justify-between">
                     <h2 className="text-3xl font-heading font-black text-slate-900">Gallery Assets</h2>
                     <Button className="rounded-2xl h-14 px-8 bg-slate-900 text-white font-black text-[11px] tracking-widest shadow-2xl">
                        <Upload size={18} className="mr-2" /> UPLOAD TO CDN
                     </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                     {gallery.map(img => (
                        <div key={img.id} className="group aspect-square relative bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all">
                           <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                           <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                              <h4 className="text-white font-black text-xs uppercase tracking-widest translate-y-2 group-hover:translate-y-0 transition-transform">Asset ID: {img.id.slice(0, 4)}</h4>
                              <div className="flex gap-2">
                                 <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 hover:scale-110 transition-transform"><Eye size={16} /></button>
                                 <button className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"><Trash2 size={16} /></button>
                              </div>
                           </div>
                        </div>
                     ))}
                     <div className="aspect-square border-4 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-8 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all mb-4">
                           <Plus size={32} />
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Inject New Visual Record</p>
                     </div>
                  </div>
               </motion.div>
            )}

            {activeTab === "reports" && (
               <motion.div key="reports" className="space-y-10">
                  <div className="grid lg:grid-cols-2 gap-10">
                     <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                        <h4 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-widest">Growth Distribution</h4>
                        <div className="h-[300px]">
                           <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={analyticsData}>
                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                                 <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                 <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                              </BarChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                     <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                        <h4 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-widest">Regional Market Share</h4>
                        <div className="h-[300px]">
                           <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                 <Pie
                                    data={[
                                       { name: 'HQ-Central', value: 400 },
                                       { name: 'East Branch', value: 300 },
                                       { name: 'South Branch', value: 240 },
                                       { name: 'Cloud Portal', value: 180 },
                                    ]}
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                 >
                                     {COLORS.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                     ))}
                                 </Pie>
                                 <Tooltip />
                              </PieChart>
                           </ResponsiveContainer>
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
