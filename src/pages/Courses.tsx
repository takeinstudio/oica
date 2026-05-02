import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  Download, 
  MessageCircle, 
  BookOpen, 
  Clock, 
  GraduationCap, 
  IndianRupee,
  Plus,
  X,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Button } from '@/components/ui/button';

const Courses = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState("");
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<any>(null);
  const [enrollForm, setEnrollForm] = useState({ name: '', phone: '', message: '' });
  const [enrollStatus, setEnrollStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleEnrollClick = (course: any) => {
    setSelectedCourseForEnroll(course);
    setEnrollModalOpen(true);
    setEnrollStatus('idle');
    setEnrollForm({ name: '', phone: '', message: '' });
  };

  const submitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollStatus('submitting');
    setTimeout(() => setEnrollStatus('success'), 1500);
  };

  const courseList = [
    { 
      title: "CCA", 
      courseNo: 1,
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c49a?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "03 Months",
      fee: "₹3,000",
      category: "Core",
      desc: "Certificate in Computer Applications - Basic computing fundamentals."
    },
    { 
      title: "DCA", 
      courseNo: 2,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "06 Months",
      fee: "₹4,250",
      category: "Diploma",
      desc: "Diploma in Computer Application - Essential software skills."
    },
    { 
      title: "ADCA", 
      courseNo: 3,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "12 Months",
      fee: "₹8,000",
      category: "Diploma",
      desc: "Advance Diploma in Computer Application - Comprehensive IT training."
    },
    { 
      title: "PGDCA", 
      courseNo: 4,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
      eligibility: "Graduation",
      duration: "12 Months",
      fee: "₹12,500",
      category: "Diploma",
      desc: "Post Graduate Diploma in Computer Application."
    },
    { 
      title: "Tally Prime", 
      courseNo: 5,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "03 Months",
      fee: "₹4,500",
      category: "Accounting",
      desc: "Advanced Accounting with Tally Prime & GST."
    },
    { 
      title: "Web Design", 
      courseNo: 6,
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "06 Months",
      fee: "₹6,500",
      category: "IT",
      desc: "Responsive web development with HTML, CSS, and JS."
    },
    { 
      title: "Graphic Design", 
      courseNo: 7,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "04 Months",
      fee: "₹5,500",
      category: "Design",
      desc: "Visual communication with Photoshop & Illustrator."
    },
    { 
      title: "Java Fullstack", 
      courseNo: 8,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000",
      eligibility: "+2 Pass",
      duration: "08 Months",
      fee: "₹15,000",
      category: "Programming",
      desc: "End-to-end enterprise application development."
    },
    { 
      title: "Python Pro", 
      courseNo: 9,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "03 Months",
      fee: "₹6,000",
      category: "Programming",
      desc: "Python programming and data science basics."
    }
  ];

  const categories = ['All', 'Diploma', 'Core', 'Accounting', 'Design', 'IT', 'Programming'];

  const filteredCourses = courseList.filter(c => {
    const matchesFilter = filter === 'All' || c.category === filter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pb-32 min-h-screen bg-slate-50/50">
      <PageHeader 
        title="Explore Our Courses"
        subtitle="Empowering Careers"
        breadcrumb="Courses"
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
        bottomPills={["Premium Training", "Job Assistance", "Global Certificates"]}
      />

      <div className="container-max pt-24">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
           {/* Categories */}
           <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-2xl text-[10px] uppercase tracking-widest font-black transition-all ${
                  filter === cat 
                    ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-105' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Search course title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 pl-14 text-sm focus:ring-4 focus:ring-primary/10 transition-all font-bold placeholder:text-slate-400"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, i) => (
              <motion.div
                layout
                key={course.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-[#fdfcf9] rounded-[20px] shadow-[0_8px_25px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col h-full overflow-hidden hover:shadow-[0_16px_35px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500"
              >
                {/* Course Image Area */}
                <div className="relative p-4">
                  <div className="h-52 overflow-hidden rounded-[16px]">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                  
                  {/* Top Category Badge */}
                  <div className="absolute top-8 right-8">
                    <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-wider text-primary shadow-sm">
                      {course.category}
                    </span>
                  </div>
                </div>
 
                {/* Content Area */}
                <div className="px-6 pb-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-0.5 bg-primary/10 rounded-md text-[8px] font-black uppercase tracking-widest text-primary">
                        COURSE {course.courseNo}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                  </div>
 
                  {/* Details Box - Clean Modern Style */}
                  <div className="bg-[#f5f7fb] rounded-[16px] p-5 space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Eligibility</span>
                      <span className="text-xs font-black text-slate-700">{course.eligibility}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200/50 pt-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Duration</span>
                      <span className="text-xs font-black text-slate-700">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200/50 pt-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Course Fee</span>
                      <span className="text-sm font-black text-primary">{course.fee}</span>
                    </div>
                  </div>
 
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 line-clamp-2">
                    {course.desc}
                  </p>
 
                  {/* Action Buttons */}
                  <div className="mt-auto flex gap-2">
                    <button className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-black text-[9px] uppercase tracking-widest py-3 rounded-xl transition-all">
                      <Download size={14} /> Brochure
                    </button>
                    <button 
                      onClick={() => handleEnrollClick(course)}
                      className="flex-[1.5] inline-flex items-center justify-center gap-2 bg-[#6c63ff] hover:bg-[#5b52ff] text-white font-black text-[9px] uppercase tracking-widest py-3 rounded-xl shadow-lg shadow-[#6c63ff]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Enroll Now <ArrowRight size={14} />
                    </button>
                    <button className="w-10 h-10 inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-xl shadow-lg shadow-emerald-500/10 transition-all hover:scale-110">
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Suggestion Section */}
        <div className="mt-32 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-3xl shadow-sm mb-6">
            <Plus size={20} className="text-primary" />
            <span className="text-sm font-black uppercase tracking-widest text-slate-600 line-clamp-1">Looking for custom training?</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-8">Ready to start your journey?</h2>
          <div className="flex justify-center gap-4">
            <Button className="h-14 px-10 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest shadow-2xl">
              CONSULT COUNSELOR
            </Button>
          </div>
        </div>
      </div>

      {/* Enroll Modal */}
      <AnimatePresence>
        {enrollModalOpen && selectedCourseForEnroll && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
              onClick={() => setEnrollModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setEnrollModalOpen(false)} 
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 text-slate-800 md:text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>

              {/* Left Side: Course Info */}
              <div className="md:w-2/5 bg-slate-900 relative overflow-hidden p-8 flex flex-col justify-center min-h-[250px]">
                <div className="absolute inset-0 opacity-20">
                   <img src={selectedCourseForEnroll.image} alt="course" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-slate-900" />
                </div>
                <div className="relative z-10 text-white mt-8 md:mt-0">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl mb-6">
                    <BookOpen size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">{selectedCourseForEnroll.category} Program</span>
                  <h3 className="text-3xl font-black mb-4 leading-tight">{selectedCourseForEnroll.title}</h3>
                  <div className="space-y-3 mb-8">
                     <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                        <Clock size={16} className="text-primary" /> {selectedCourseForEnroll.duration}
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                        <IndianRupee size={16} className="text-primary" /> {selectedCourseForEnroll.fee}
                     </div>
                  </div>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed hidden md:block">
                     Complete your enrollment request and our counselors will get back to you with the next steps.
                  </p>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="md:w-3/5 p-8 md:p-12 bg-white relative">
                {enrollStatus === 'success' ? (
                   <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-10">
                      <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                         <CheckCircle2 size={40} />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 mb-2">Request Received!</h4>
                      <p className="text-slate-500 font-medium mb-8">Thank you for your interest in {selectedCourseForEnroll.title}. Our team will contact you shortly.</p>
                      <Button onClick={() => setEnrollModalOpen(false)} className="rounded-xl px-8 bg-slate-900 font-black text-[11px] tracking-widest uppercase">
                         Close Window
                      </Button>
                   </motion.div>
                ) : (
                   <div className="h-full flex flex-col justify-center">
                      <div className="mb-8">
                         <h4 className="text-2xl font-black text-slate-900">Enrollment Form</h4>
                         <p className="text-slate-500 text-sm font-medium">Fill in your details to secure your seat.</p>
                      </div>
                      <form onSubmit={submitEnrollment} className="space-y-5">
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                            <input required type="text" value={enrollForm.name} onChange={(e) => setEnrollForm({...enrollForm, name: e.target.value})} className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-bold" placeholder="John Doe" />
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                            <input required type="tel" value={enrollForm.phone} onChange={(e) => setEnrollForm({...enrollForm, phone: e.target.value})} className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-bold" placeholder="+91 00000 00000" />
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Message (Optional)</label>
                            <textarea value={enrollForm.message} onChange={(e) => setEnrollForm({...enrollForm, message: e.target.value})} className="w-full h-24 bg-slate-50 border border-slate-100 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-bold resize-none" placeholder="Any specific questions?"></textarea>
                         </div>
                         <Button type="submit" disabled={enrollStatus === 'submitting'} className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black text-[11px] tracking-widest uppercase shadow-xl shadow-primary/20 mt-4">
                            {enrollStatus === 'submitting' ? "SENDING REQUEST..." : "SUBMIT ENROLLMENT"}
                         </Button>
                      </form>
                   </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courses;
