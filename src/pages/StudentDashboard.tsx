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
  Play,
  MessageSquare,
  Star as StarIcon,
  Activity,
  BookOpen,
  CheckCircle2,
  Clock,
  X,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import SecureVideoPlayer from "@/components/shared/SecureVideoPlayer";
import SecurePdfViewer from "@/components/shared/SecurePdfViewer";
import { STORAGE_KEYS, getStorageData, setStorageData } from "@/lib/storage";

export const getStorageDataSafe = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    if (!data || data === "null") return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Navigation State
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [quizResult, setQuizResult] = useState<any>(null);
  
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

  // Data from Storage
  const [topics, setTopics] = useState<any[]>([]);
  const [lectures, setLectures] = useState<any[]>([]);
  const [mockTests, setMockTests] = useState<any[]>([]);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [pdfs, setPdfs] = useState<any[]>([
    { id: 1, title: "OICA PGDCA Syllabus 2026", size: "1.2 MB", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { id: 2, title: "Advanced Office Automation Guide", size: "4.5 MB", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  ]);

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

    // Load Data
    setTopics(getStorageData(STORAGE_KEYS.TOPICS).sort((a: any, b: any) => a.order - b.order));
    setLectures(getStorageData(STORAGE_KEYS.LECTURES));
    setMockTests(getStorageData(STORAGE_KEYS.MOCK_TESTS));
    setTestResults(getStorageData(STORAGE_KEYS.TEST_RESULTS).filter((r: any) => r.studentId === userData.id));

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [navigate]);

  const handleLogout = () => {
    toast.info("Logging out...");
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setTimeout(() => navigate("/login"), 1000);
  };

  const markVideoComplete = (videoId: string) => {
    const updatedUser = { ...user };
    if (!updatedUser.completedVideos) updatedUser.completedVideos = [];
    if (!updatedUser.completedVideos.includes(videoId)) {
      updatedUser.completedVideos.push(videoId);
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(updatedUser));
      
      const allUsers = getStorageData(STORAGE_KEYS.USERS);
      const updatedUsers = allUsers.map((u: any) => u.id === user.id ? updatedUser : u);
      setStorageData(STORAGE_KEYS.USERS, updatedUsers);
      toast.success("Video marked as completed!");
    }
  };

  const startQuiz = (topicId: string) => {
    const test = mockTests.find(t => t.topicId === topicId);
    if (test) {
      setActiveQuiz(test);
      setQuizActive(true);
      setQuizResult(null);
    } else {
      toast.error("No mock test available for this topic yet.");
    }
  };

  const filteredPdfs = useMemo(() => {
    return pdfs.filter(pdf => pdf.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, pdfs]);

  const [feedbackForm, setFeedbackForm] = useState({ rating: 5, comment: "" });

  const submitFeedback = () => {
    if (!feedbackForm.comment.trim()) {
      toast.error("Please write your feedback first.");
      return;
    }
    const allFeedback = getStorageData(STORAGE_KEYS.FEEDBACK);
    const newEntry = {
      id: `fb-${Date.now()}`,
      studentId: user.id,
      studentName: user.name,
      studentPhoto: user.photo,
      rollNo: user.rollNo,
      course: user.course,
      rating: feedbackForm.rating,
      comment: feedbackForm.comment,
      status: "pending",
      date: new Date().toISOString()
    };
    setStorageData(STORAGE_KEYS.FEEDBACK, [...allFeedback, newEntry]);
    toast.success("Feedback submitted! It will appear on the site once approved by admin.");
    setFeedbackForm({ rating: 5, comment: "" });
  };

  if (!user) return null;

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden font-poppins antialiased text-slate-800">
      {/* Sidebar - Premium Dark Sidebar */}
      <aside className="w-16 lg:w-60 bg-slate-950 text-white flex flex-col transition-all duration-300 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.15)] border-r border-white/5">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 border border-white/10 shadow-lg shadow-primary/20">
            <GraduationCap size={20} className="text-white" />
          </div>
          <div className="hidden lg:block">
            <span className="font-bold text-[9px] tracking-widest block uppercase text-primary leading-none mb-1">OICA</span>
            <span className="font-bold text-[11px] tracking-tight block uppercase leading-none">Student Portal</span>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-6">
          {[
            { id: "dashboard", label: "Overview", Icon: LayoutDashboard },
            { id: "lectures", label: "Lectures", Icon: Video },
            { id: "resources", label: "PDF Resources", Icon: FileText },
            { id: "results", label: "Results", Icon: Award },
            { id: "feedback", label: "Feedback", Icon: MessageSquare },
            { id: "profile", label: "Profile", Icon: User },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSelectedTopic(null); setSelectedVideo(null); setQuizActive(false); }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative ${
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-inner border border-white/5" 
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
              }`}
            >
              <item.Icon size={16} className={activeTab === item.id ? "text-primary" : "text-slate-500 group-hover:text-slate-300"} />
              <span className="hidden lg:block font-bold text-[9px] uppercase tracking-widest">{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="sidebar-pill" className="absolute left-0 w-1 h-5 bg-primary rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold text-[9px] uppercase tracking-widest"
          >
            <LogOut size={16} />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative bg-[#f8fafc]">
        {/* Top Header */}
        <header className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-6 py-3.5 flex items-center justify-between z-20">
          <div>
            <h1 className="text-lg font-bold text-slate-900 capitalize tracking-tight flex items-center gap-2">
              {activeTab}
              {selectedTopic && <><ChevronRight size={14} className="text-slate-300" /> <span className="text-primary">{selectedTopic.name}</span></>}
            </h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden md:flex flex-col items-end border-r border-slate-200 pr-3 mr-1">
                <span className="text-[11px] font-bold text-slate-900">{user.name}</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{user.rollNo}</span>
             </div>
             <div className="w-8 h-8 rounded-lg bg-slate-200 border border-slate-200 overflow-hidden shadow-sm">
                <img src={user.photo} className="w-full h-full object-cover" alt="avatar" />
             </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div 
                key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Hero Greeting */}
                <div className="relative bg-slate-900 rounded-xl p-8 text-white overflow-hidden shadow-xl shadow-slate-900/10">
                  <div className="relative z-10">
                     <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-[8px] font-bold uppercase tracking-widest text-primary mb-4 backdrop-blur-md">
                        2026 Batch • Session Active
                     </span>
                     <h2 className="text-3xl font-bold mb-3 leading-tight tracking-tight">Welcome back, <br /> <span className="text-primary">{user.name.split(' ')[0]}!</span></h2>
                     <p className="text-slate-400 max-w-lg mb-8 text-xs font-medium leading-relaxed">
                        Your learning journey is 65% complete. You have 2 new topics waiting and a mock test scheduled for Friday.
                     </p>
                     <Button onClick={() => setActiveTab('lectures')} className="h-11 rounded-xl px-8 bg-primary hover:bg-primary/90 text-white font-bold text-[9px] tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                        RESUME LEARNING <ArrowRight size={14} className="ml-2" />
                     </Button>
                  </div>
                  <div className="absolute -right-10 -bottom-20 opacity-10 rotate-12 scale-150 pointer-events-none">
                    <GraduationCap size={300} />
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[120px]" />
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                   {[
                     { label: "Attendance", value: "94%", desc: "Consistent Performance", color: "blue" },
                     { label: "Lectures", value: `${user.completedVideos?.length || 0} Units`, desc: "Units Completed", color: "emerald" },
                     { label: "Tests Passed", value: `${testResults.length} / ${mockTests.length}`, desc: "Evaluation Score", color: "violet" }
                   ].map((stat, i) => (
                     <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md transition-all"
                     >
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{stat.value}</h3>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: "80%" }} 
                              className={`h-full bg-${stat.color}-500`} 
                           />
                        </div>
                        <p className="text-[8px] font-bold text-slate-400 mt-3 uppercase tracking-widest">{stat.desc}</p>
                     </motion.div>
                   ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                   <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                      <Activity size={24} className="text-primary" /> Learning Progress
                   </h3>
                   <div className="space-y-6">
                      {topics.slice(0, 3).map((topic, i) => {
                        const topicLectures = lectures.filter(l => l.topicId === topic.id);
                        const completedInTopic = topicLectures.filter(l => user.completedVideos?.includes(l.id)).length;
                        const progress = topicLectures.length ? (completedInTopic / topicLectures.length) * 100 : 0;
                        
                        return (
                          <div key={topic.id} className="group cursor-pointer">
                             <div className="flex justify-between items-end mb-3">
                                <div>
                                   <h4 className="font-black text-slate-800 text-sm">{topic.name}</h4>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{completedInTopic} of {topicLectures.length} units completed</p>
                                </div>
                                <span className="text-xs font-black text-primary">{Math.round(progress)}%</span>
                             </div>
                             <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                   initial={{ width: 0 }} 
                                   animate={{ width: `${progress}%` }} 
                                   className="h-full bg-primary" 
                                />
                             </div>
                          </div>
                        );
                      })}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "lectures" && (
              <motion.div key="lectures" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {!selectedTopic ? (
                  /* 1. Topic Grid View */
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topics.map((topic, idx) => (
                      <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedTopic(topic)}
                        className="group bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden relative"
                      >
                        <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-${topic.color}-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform`} />
                        <div className={`w-11 h-11 bg-${topic.color}-500/10 text-${topic.color}-600 rounded-xl flex items-center justify-center mb-5 border border-${topic.color}-500/20 shadow-sm`}>
                          <BookOpen size={20} />
                        </div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">TOPIC {topic.order}</span>
                        <h3 className="text-base font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{topic.name}</h3>
                        <p className="text-slate-500 text-[11px] font-medium leading-relaxed mb-6 line-clamp-2">{topic.description}</p>
                        
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                           <span className="text-[8px] font-bold text-primary uppercase tracking-widest">Enter Module</span>
                           <ArrowRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : !selectedVideo && !quizActive ? (
                  /* 2. Topic Drill-down: Video List View */
                  <div className="space-y-6">
                    <button onClick={() => setSelectedTopic(null)} className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors font-bold text-[9px] uppercase tracking-widest mb-6">
                      <ChevronRight size={12} className="rotate-180" /> Back to Topics
                    </button>

                    <div className="flex flex-col lg:flex-row gap-6">
                       <div className="lg:w-1/3 space-y-4">
                          <div className="bg-slate-900 rounded-xl p-6 text-white relative overflow-hidden">
                             <div className="relative z-10">
                                <h2 className="text-xl font-bold mb-1">{selectedTopic.name}</h2>
                                <p className="text-slate-400 text-[10px] font-medium mb-6 leading-relaxed">{selectedTopic.description}</p>
                                <Button onClick={() => startQuiz(selectedTopic.id)} className="w-full h-11 rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-bold text-[9px] tracking-widest uppercase shadow-lg">
                                   Take Mock Test <PenTool size={14} className="ml-2" />
                                </Button>
                             </div>
                             <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-[60px]" />
                          </div>
                          
                          <div className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm">
                             <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Course Summary</h4>
                             <div className="space-y-3">
                                <div className="flex justify-between items-center text-[11px]">
                                   <span className="text-slate-500 font-medium">Total Units</span>
                                   <span className="font-bold text-slate-900">{lectures.filter(l => l.topicId === selectedTopic.id).length} Videos</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px]">
                                   <span className="text-slate-500 font-medium">Completed</span>
                                   <span className="font-bold text-emerald-500">{lectures.filter(l => l.topicId === selectedTopic.id && user.completedVideos?.includes(l.id)).length} Units</span>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="lg:w-2/3 space-y-3">
                          {lectures.filter(l => l.topicId === selectedTopic.id).sort((a,b) => a.order - b.order).map((lecture, i) => (
                            <motion.div 
                              key={lecture.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => setSelectedVideo(lecture)}
                              className="group bg-white rounded-lg p-4 border border-slate-200/60 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all relative overflow-hidden"
                            >
                               <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center font-bold text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shrink-0 text-xs">
                                  {lecture.order}
                               </div>
                               <div className="flex-1">
                                  <h4 className="font-bold text-slate-800 text-[13px] group-hover:text-primary transition-colors">{lecture.title}</h4>
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{lecture.duration} • Lecture {lecture.order}</p>
                               </div>
                               {user.completedVideos?.includes(lecture.id) ? (
                                 <div className="w-7 h-7 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100">
                                    <CheckCircle2 size={14} />
                                 </div>
                               ) : (
                                 <div className="w-7 h-7 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center group-hover:text-primary transition-all">
                                    <Play size={14} fill="currentColor" />
                                 </div>
                               )}
                               <div className="absolute inset-y-0 left-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                            </motion.div>
                          ))}
                       </div>
                    </div>
                  </div>
                ) : selectedVideo ? (
                  /* 3. Video Player Drill-down */
                  <div className="space-y-6 max-w-5xl mx-auto">
                     <div className="flex items-center justify-between mb-4">
                        <button onClick={() => setSelectedVideo(null)} className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors font-bold text-[9px] uppercase tracking-widest">
                          <ChevronRight size={12} className="rotate-180" /> Back to Lessons
                        </button>
                        <div className="flex items-center gap-3">
                           <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{selectedVideo.order} / {lectures.filter(l => l.topicId === selectedTopic.id).length} UNITS</span>
                           <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${(selectedVideo.order / lectures.filter(l => l.topicId === selectedTopic.id).length) * 100}%` }} />
                           </div>
                        </div>
                     </div>

                     <div className="rounded-xl overflow-hidden shadow-xl border-2 border-white">
                        <SecureVideoPlayer url={selectedVideo.url} title={selectedVideo.title} />
                     </div>

                     <div className="bg-white rounded-xl p-6 border border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                           <h2 className="text-xl font-bold text-slate-900 mb-1">{selectedVideo.title}</h2>
                           <p className="text-slate-500 font-medium flex items-center gap-2 text-xs">
                              <span className="px-2 py-0.5 bg-primary/10 rounded text-primary text-[8px] font-bold uppercase tracking-widest">{selectedTopic.name}</span>
                              • Lesson {selectedVideo.order} • {selectedVideo.duration}
                           </p>
                        </div>
                        <div className="flex gap-3">
                           {!user.completedVideos?.includes(selectedVideo.id) ? (
                             <Button onClick={() => markVideoComplete(selectedVideo.id)} className="h-10 rounded-lg px-6 bg-primary hover:bg-primary/90 text-white font-bold text-[9px] tracking-widest shadow-xl shadow-primary/20">
                                COMPLETE UNIT <CheckCircle2 size={14} className="ml-2" />
                             </Button>
                           ) : (
                             <div className="h-10 flex items-center px-6 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 font-bold text-[8px] uppercase tracking-widest gap-2">
                                <CheckCircle2 size={16} /> COMPLETED
                             </div>
                           )}
                        </div>
                     </div>
                  </div>
                ) : quizActive ? (
                  /* 4. Quiz Engine View */
                  <motion.div key="quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
                    {!quizResult ? (
                      <div className="bg-white rounded-xl p-8 border border-slate-200/60 shadow-xl">
                         <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                                  <Clock size={20} />
                               </div>
                               <div>
                                  <h3 className="text-lg font-bold text-slate-900">Topic Assessment</h3>
                                  <p className="text-[8px] font-bold text-primary uppercase tracking-widest">Time: {activeQuiz.timeLimit}:00</p>
                               </div>
                            </div>
                            <button onClick={() => setQuizActive(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                               <X size={20} />
                            </button>
                         </div>

                         <div className="space-y-8">
                            {activeQuiz.questions.map((q: any, qIdx: number) => (
                              <div key={q.id} className="space-y-4">
                                 <h4 className="text-sm font-bold text-slate-900 flex items-start gap-3">
                                    <span className="w-6 h-6 rounded bg-slate-950 text-white flex items-center justify-center text-[10px] shrink-0">{qIdx + 1}</span>
                                    {q.text}
                                 </h4>
                                 <div className="grid md:grid-cols-2 gap-3 ml-9">
                                    {q.options.map((opt: string, oIdx: number) => (
                                       <label key={oIdx} className="group cursor-pointer">
                                          <input type="radio" name={`q-${qIdx}`} className="hidden" />
                                          <div className="p-3.5 border border-slate-100 rounded-xl font-bold text-slate-600 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all flex items-center gap-3 text-xs">
                                             <div className="w-4 h-4 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-primary">
                                                <div className="w-2 h-2 bg-primary rounded-full scale-0 group-has-[:checked]:scale-100 transition-transform" />
                                             </div>
                                             {opt}
                                          </div>
                                       </label>
                                    ))}
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
                            <Button onClick={() => setQuizResult({ score: activeQuiz.questions.length, total: activeQuiz.questions.length })} className="h-10 rounded-lg px-8 bg-slate-950 text-white font-bold text-[9px] tracking-widest shadow-xl">
                               SUBMIT EXAM <Save size={14} className="ml-2" />
                            </Button>
                         </div>
                      </div>
                    ) : (
                      /* Quiz Result View */
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center bg-white rounded-xl p-10 border border-slate-200/60 shadow-xl">
                         <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award size={32} />
                         </div>
                         <h2 className="text-2xl font-bold text-slate-900 mb-1">Assessment Completed!</h2>
                         <p className="text-slate-400 text-xs font-medium mb-8">Topic: {selectedTopic.name}</p>
                         
                         <div className="inline-block px-10 py-6 bg-slate-50 rounded-xl border border-slate-100 mb-8">
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Final Score</p>
                            <h3 className="text-4xl font-bold text-primary tracking-tight">{quizResult.score} <span className="text-xl text-slate-300">/ {quizResult.total}</span></h3>
                         </div>

                         <div className="flex justify-center gap-3">
                            <Button onClick={() => { setQuizActive(false); setQuizResult(null); }} className="h-10 rounded-lg px-8 bg-slate-950 text-white font-bold text-[9px] tracking-widest">
                               BACK TO LESSONS
                            </Button>
                         </div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : null}
              </motion.div>
            )}

            {activeTab === "resources" && (
              <motion.div key="resources" className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                      <div>
                         <h2 className="text-xl font-bold text-slate-900 mb-1">Academic Repository</h2>
                         <p className="text-slate-400 text-xs font-medium">Access your curated course materials.</p>
                      </div>
                      <div className="relative w-full max-w-xs">
                         <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                         <Input placeholder="Search documents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-11 pl-10 rounded-xl border-slate-100 bg-slate-50 font-bold text-xs focus:bg-white transition-all shadow-inner" />
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {filteredPdfs.map((pdf, i) => (
                       <motion.div 
                        key={pdf.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-[#f8fafc] p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:bg-white transition-all group cursor-pointer relative overflow-hidden"
                       >
                          <div className="w-11 h-11 bg-white rounded-xl text-slate-400 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center mb-5 shadow-sm border border-slate-100 group-hover:border-primary/20">
                             <FileText size={20} />
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1 group-hover:text-primary transition-colors">{pdf.title}</h4>
                          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{pdf.size} • Secured PDF</p>
                          
                          <div className="mt-5 pt-4 border-t border-slate-200/50 flex items-center justify-between">
                             <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary">Download</span>
                             <Download size={14} className="text-slate-200 group-hover:text-primary transition-colors" />
                          </div>
                       </motion.div>
                     ))}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "results" && (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                <div className="bg-white rounded-xl p-8 border border-slate-200/60 shadow-sm relative overflow-hidden">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                      <div>
                         <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">Academic Achievement</h3>
                         <p className="text-slate-400 text-xs font-medium">Your verified performance metrics.</p>
                      </div>
                      <div className="px-4 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 flex items-center gap-3 shadow-sm">
                         <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center shadow-lg"><Award size={16} /></div>
                         <div className="flex flex-col">
                            <span className="text-[8px] font-bold uppercase tracking-widest opacity-60">Verified CGPA</span>
                            <span className="text-lg font-bold">8.42 / 10</span>
                         </div>
                      </div>
                   </div>

                   <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-100">
                             <th className="text-left py-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Examination Unit</th>
                             <th className="text-center py-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Score / Total</th>
                             <th className="text-center py-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Grade</th>
                             <th className="text-right py-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {[
                             { subject: "Fundamentals of IT", marks: 85, total: 100, grade: "A" },
                             { subject: "Advanced MS Office", marks: 92, total: 100, grade: "A+" },
                             { subject: "Tally ERP.9 Core", marks: 78, total: 100, grade: "B+" },
                             { subject: "C Programming Logic", marks: 88, total: 100, grade: "A" }
                           ].map((res, i) => (
                             <motion.tr 
                               key={i} 
                               initial={{ opacity: 0, y: 10 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true }}
                               transition={{ delay: i * 0.1 }}
                               className="group hover:bg-slate-50 transition-all"
                             >
                                <td className="py-3.5 font-bold text-slate-800 text-xs">{res.subject}</td>
                                <td className="py-3.5 text-center font-bold text-slate-900 text-sm">{res.marks} <span className="text-[10px] text-slate-300">/ {res.total}</span></td>
                                <td className="py-3.5 text-center">
                                   <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-[11px] border border-primary/20`}>{res.grade}</span>
                                </td>
                                <td className="py-3.5 text-right">
                                   <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-bold text-[8px] uppercase tracking-widest border border-emerald-100">Pass</span>
                                </td>
                             </motion.tr>
                           ))}
                        </tbody>
                      </table>
                   </div>
                </div>

                {/* Mock Test History */}
                <div className="bg-slate-900 rounded-xl p-8 text-white shadow-xl">
                   <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <PenTool size={20} className="text-primary" /> Assessment History
                   </h3>
                   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {testResults.length === 0 ? (
                        <div className="col-span-full py-8 text-center text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                           No assessment attempts recorded yet.
                        </div>
                      ) : (
                        testResults.map((result, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all group">
                             <p className="text-[8px] font-bold text-primary uppercase tracking-widest mb-1">{result.topicName}</p>
                             <div className="flex justify-between items-end mb-3">
                                <h4 className="text-base font-bold text-white">{result.score} / {result.total}</h4>
                                <span className="text-[9px] font-bold text-slate-500">{new Date(result.takenAt).toLocaleDateString()}</span>
                             </div>
                             <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: `${(result.score/result.total)*100}%` }} />
                             </div>
                          </div>
                        ))
                      )}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "feedback" && (
               <motion.div key="feedback" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto space-y-8">
                <div className="bg-white rounded-xl p-8 border border-slate-200/60 shadow-sm relative overflow-hidden">
                   <div className="mb-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">Student Testimonial</h3>
                      <p className="text-slate-400 text-xs font-medium">Your feedback helps us improve.</p>
                   </div>
                   
                   <div className="space-y-6">
                      {/* Rating Selector */}
                      <div className="space-y-2">
                         <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Satisfaction</label>
                         <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button 
                                key={star} 
                                onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${feedbackForm.rating >= star ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-300'}`}
                              >
                                <StarIcon size={18} fill={feedbackForm.rating >= star ? "currentColor" : "none"} />
                              </button>
                            ))}
                         </div>
                      </div>

                      {/* Comment Input */}
                      <div className="space-y-2">
                         <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Experience</label>
                         <textarea 
                            value={feedbackForm.comment}
                            onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                            className="w-full h-32 bg-slate-50 border border-slate-100 rounded-xl p-4 focus:bg-white transition-all font-bold text-slate-700 resize-none text-xs"
                            placeholder="Tell us about your journey at OICA..."
                         />
                      </div>

                      <div className="flex justify-center pt-6 border-t border-slate-50">
                         <Button onClick={submitFeedback} className="h-11 rounded-xl px-8 bg-primary text-white font-bold text-[9px] tracking-widest flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all">
                           <Save size={16} /> SUBMIT FEEDBACK
                         </Button>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div key="profile" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-8">
                <div className="bg-white rounded-xl p-8 border border-slate-200/60 shadow-sm text-center">
                   <div className="relative w-32 h-32 mx-auto mb-8 group">
                      <div className="w-full h-full rounded-xl overflow-hidden border-4 border-slate-50 shadow-xl bg-slate-100 ring-2 ring-primary/20">
                         <img src={profileForm.photo} className="w-full h-full object-cover" alt="Profile" />
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-9 h-9 bg-slate-950 text-white rounded-lg flex items-center justify-center border-2 border-white shadow-lg hover:bg-primary transition-all scale-90 group-hover:scale-100">
                         <Camera size={16} />
                      </button>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 text-left mt-10">
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                         <Input value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="h-11 rounded-lg bg-slate-50 border-slate-100 focus:bg-white transition-all font-bold text-slate-700 text-xs" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Roll No</label>
                         <Input value={user.rollNo} readOnly className="h-11 rounded-lg bg-slate-100 border-slate-100 opacity-60 font-bold text-slate-400 cursor-not-allowed text-xs" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                         <Input value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} className="h-11 rounded-lg bg-slate-50 border-slate-100 focus:bg-white transition-all font-bold text-slate-700 text-xs" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                         <Input value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} className="h-11 rounded-lg bg-slate-50 border-slate-100 focus:bg-white transition-all font-bold text-slate-700 text-xs" />
                      </div>
                   </div>
                   
                   <div className="mt-10 flex justify-center pt-6 border-t border-slate-50">
                      <Button onClick={() => toast.success("Profile Updated!")} className="h-11 rounded-xl px-10 bg-slate-950 text-white font-bold text-[9px] tracking-widest flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all">
                        <Save size={16} /> SAVE CHANGES
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
