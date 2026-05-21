import { useState, useEffect } from "react";
import { 
  Briefcase, CheckCircle2, Clock, CalendarDays, 
  LayoutDashboard, LogOut, ChevronRight, FileText, X
} from "lucide-react";
import { Button } from "@/components/ui/input"; // wait, Button from components/ui/button
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { STORAGE_KEYS, getStorageData, setStorageData } from "@/lib/storage";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [employee, setEmployee] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  
  // Submission Modal State
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [reportText, setReportText] = useState("");

  useEffect(() => {
    const sessionStr = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!sessionStr) {
      navigate("/login/employee");
      return;
    }
    const session = JSON.parse(sessionStr);
    if (session.role !== "employee") {
      navigate("/login");
      return;
    }
    setEmployee(session);
    loadTasks(session.id);
  }, [navigate]);

  const loadTasks = (empId: number) => {
    const allTasks = getStorageData(STORAGE_KEYS.TASKS);
    // Filter tasks assigned to this employee
    const myTasks = allTasks.filter((t: any) => t.employeeIds.includes(empId));
    setTasks(myTasks);
  };

  if (!employee) return null;

  const pendingTasks = tasks.filter(t => t.status === "pending");
  const completedTasks = tasks.filter(t => t.status === "completed");
  
  // Upcoming works are pending works with a future due date
  const now = new Date();
  const upcomingTasks = pendingTasks.filter(t => new Date(t.dueDate) > now);

  const handleLogout = () => {
    toast.info("Logging out...");
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setTimeout(() => navigate("/login/employee"), 1000);
  };

  const openSubmitModal = (task: any) => {
    setSelectedTask(task);
    setReportText("");
  };

  const submitReport = () => {
    if (!reportText.trim()) {
      toast.error("Please enter a daily work report.");
      return;
    }

    const allTasks = getStorageData(STORAGE_KEYS.TASKS);
    const updatedTasks = allTasks.map((t: any) => {
      if (t.id === selectedTask.id) {
        return {
          ...t,
          status: "completed",
          completedAt: new Date().toISOString(),
          employeeReport: reportText
        };
      }
      return t;
    });

    setStorageData(STORAGE_KEYS.TASKS, updatedTasks);
    setTasks(updatedTasks.filter((t: any) => t.employeeIds.includes(employee.id)));
    
    toast.success("Work report submitted successfully!");
    setSelectedTask(null);
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex overflow-hidden font-poppins antialiased text-slate-800">
      {/* Sidebar */}
      <aside className="w-16 lg:w-64 bg-slate-950 text-white flex flex-col z-30 shadow-2xl border-r border-white/5">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shrink-0 border border-white/10 shadow-lg shadow-amber-500/20">
            <Briefcase size={20} className="text-white" />
          </div>
          <div className="hidden lg:block">
            <span className="font-bold text-[9px] tracking-widest block uppercase text-amber-500 mb-0.5 leading-none">OICA Staff</span>
            <span className="font-bold text-xs tracking-tighter block uppercase leading-none">Employee Portal</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-8 overflow-y-auto">
          {[
            { id: "overview", label: "Dashboard", Icon: LayoutDashboard },
            { id: "pending", label: "Pending Works", Icon: Clock },
            { id: "completed", label: "Work History", Icon: CheckCircle2 }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
                activeTab === item.id
                  ? "bg-white/10 text-white border border-white/5"
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
              }`}
            >
              <item.Icon size={16} className={activeTab === item.id ? "text-amber-500" : "transition-colors"} />
              <span className="hidden lg:block font-bold text-[9px] tracking-widest uppercase">{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="sidebar-pill" className="absolute left-0 w-1 h-6 bg-amber-500 rounded-r-full" />
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
              Workspace <ChevronRight size={14} className="text-slate-300" /> <span className="text-amber-500">{activeTab}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 pr-4">
              <div className="text-right">
                <p className="text-[11px] font-bold text-slate-900">{employee.name}</p>
                <p className="text-[8px] text-amber-500 font-bold uppercase tracking-widest mt-0.5">OICA Staff</p>
              </div>
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <img src={employee.photo} alt={employee.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                        <Clock size={24} />
                      </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 mb-1">{pendingTasks.length}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending Works</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                        <CheckCircle2 size={24} />
                      </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 mb-1">{completedTasks.length}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed Works</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                        <CalendarDays size={24} />
                      </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 mb-1">{upcomingTasks.length}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upcoming Works</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-widest">Recent Assignments</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {pendingTasks.slice(0, 4).map(task => (
                      <div key={task.id} className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <h4 className="text-sm font-bold text-slate-900 mb-2">{task.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4">{task.description}</p>
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                          <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-md uppercase tracking-widest">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                          <button 
                            onClick={() => openSubmitModal(task)}
                            className="text-[10px] font-black text-white bg-slate-900 hover:bg-amber-500 px-4 py-2 rounded-lg transition-colors uppercase tracking-widest"
                          >
                            Submit Work
                          </button>
                        </div>
                      </div>
                    ))}
                    {pendingTasks.length === 0 && (
                      <div className="col-span-full p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No pending assignments</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "pending" && (
              <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-widest">All Pending Works</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingTasks.map(task => (
                    <div key={task.id} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                      <div className="flex-1">
                        <h4 className="text-base font-bold text-slate-900 mb-2">{task.title}</h4>
                        <p className="text-sm text-slate-500 mb-4">{task.description}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <CalendarDays size={12} /> Assigned: {new Date(task.assignedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <button 
                          onClick={() => openSubmitModal(task)}
                          className="w-full text-[11px] font-black text-white bg-slate-900 hover:bg-amber-500 h-10 rounded-xl transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                          <FileText size={14} /> Submit Report
                        </button>
                      </div>
                    </div>
                  ))}
                  {pendingTasks.length === 0 && (
                    <div className="col-span-full p-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <CheckCircle2 size={32} />
                      </div>
                      <p className="text-sm font-bold text-slate-900">You're all caught up!</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">No pending works assigned</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "completed" && (
              <motion.div key="completed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-widest">Work History</h3>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="divide-y divide-slate-100">
                    {completedTasks.map(task => (
                      <div key={task.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-base font-bold text-slate-900">{task.title}</h4>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-[9px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                                <CheckCircle2 size={10} /> Completed
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-4">{task.description}</p>
                            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                <FileText size={12} /> My Daily Report
                              </p>
                              <p className="text-sm text-slate-700 font-medium">"{task.employeeReport}"</p>
                            </div>
                          </div>
                          <div className="text-left md:text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Completed On</p>
                            <p className="text-sm font-bold text-slate-900">
                              {task.completedAt ? new Date(task.completedAt).toLocaleString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {completedTasks.length === 0 && (
                      <div className="p-16 text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No completed works yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Report Modal */}
        <AnimatePresence>
          {selectedTask && (
            <>
              <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40" onClick={() => setSelectedTask(null)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border border-slate-100"
              >
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <FileText size={18} className="text-amber-500" /> Submit Daily Report
                  </h3>
                  <button onClick={() => setSelectedTask(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-colors">
                    <X size={16} />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Task</p>
                    <p className="text-sm font-bold text-slate-900">{selectedTask.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{selectedTask.description}</p>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Work Done / Daily Report
                    </label>
                    <textarea 
                      value={reportText}
                      onChange={(e) => setReportText(e.target.value)}
                      placeholder="Describe the work you completed today for this task..."
                      className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm font-medium"
                    ></textarea>
                  </div>

                  <button 
                    onClick={submitReport}
                    className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-black text-[11px] tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={16} /> Mark as Completed
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
