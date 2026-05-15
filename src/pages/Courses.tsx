import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  Download, 
  MessageCircle, 
  BookOpen, 
  Clock,
  Plus,
  X,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

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
      title: "Smart Computer Course for Kids", 
      courseNo: 1,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000",
      eligibility: "Class 5th - 10th",
      duration: "03 Months",
      category: "Kids",
      desc: "Fundamental computer skills tailored for young minds."
    },
    { 
      title: "Coding for Kids", 
      courseNo: 2,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000",
      eligibility: "Class 5th - 10th",
      duration: "03 Months",
      category: "Kids",
      desc: "Introduction to logical thinking and basic programming."
    },
    { 
      title: "Scratch Programming for Kids", 
      courseNo: 3,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1000",
      eligibility: "Class 5th - 10th",
      duration: "03 Months",
      category: "Kids",
      desc: "Visual block-based programming to create stories and games."
    },
    { 
      title: "MS Office with AI", 
      courseNo: 4,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "03 Months",
      category: "Office",
      desc: "Master MS Office suite enhanced with AI productivity tools."
    },
    { 
      title: "Adv. Office with AI", 
      courseNo: 5,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "06 Months",
      category: "Office",
      desc: "Advanced office automation with AI integration for professionals."
    },
    { 
      title: "Office Automation", 
      courseNo: 6,
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "03 Months",
      category: "Office",
      desc: "Streamlining office tasks with modern software and tools."
    },
    { 
      title: "DTP", 
      courseNo: 7,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "04 Months",
      category: "Design",
      desc: "Desk Top Publishing - Master page layout and design."
    },
    { 
      title: "C, C++", 
      courseNo: 8,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "04 Months",
      category: "Programming",
      desc: "Foundational programming languages for systems and apps."
    },
    { 
      title: "Core/Adv. Java", 
      courseNo: 9,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
      eligibility: "+2 Pass",
      duration: "06 Months",
      category: "Programming",
      desc: "Comprehensive Java training from basics to advanced frameworks."
    },
    { 
      title: "PYTHON", 
      courseNo: 10,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "03 Months",
      category: "Programming",
      desc: "Versatile programming for web, data, and automation."
    },
    { 
      title: "Animation", 
      courseNo: 11,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "12 Months",
      category: "Multimedia",
      desc: "2D/3D Animation techniques and character design."
    },
    { 
      title: "Multimedia", 
      courseNo: 12,
      image: "https://images.unsplash.com/photo-1536240478700-b86d24627a7b?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "12 Months",
      category: "Multimedia",
      desc: "A combination of text, audio, images, and video creation."
    },
    { 
      title: "Auto-Cad", 
      courseNo: 13,
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1000",
      eligibility: "ITI/Diploma",
      duration: "03 Months",
      category: "Design",
      desc: "Computer-aided design for engineering and architecture."
    },
    { 
      title: "Video Editing", 
      courseNo: 14,
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "03 Months",
      category: "Multimedia",
      desc: "Professional video post-production and storytelling."
    },
    { 
      title: "Adobe Photoshop", 
      courseNo: 15,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "02 Months",
      category: "Design",
      desc: "Industry standard for image editing and digital art."
    },
    { 
      title: "Canva Designing", 
      courseNo: 16,
      image: "https://images.unsplash.com/photo-1626785774625-ddc7c8241520?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "01 Month",
      category: "Design",
      desc: "Quick and creative graphic design for social media."
    },
    { 
      title: "Adobe Illustrator", 
      courseNo: 17,
      image: "https://images.unsplash.com/photo-1626785774813-207010f3c582?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "02 Months",
      category: "Design",
      desc: "Vector graphics for logos, icons, and illustrations."
    },
    { 
      title: "Cyber Security", 
      courseNo: 18,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
      eligibility: "+2 Pass",
      duration: "06 Months",
      category: "IT",
      desc: "Protecting systems and networks from digital attacks."
    },
    { 
      title: "DATA SCIENCE", 
      courseNo: 19,
      image: "https://images.unsplash.com/photo-1551288049-bbda48658a7d?q=80&w=1000",
      eligibility: "Graduation",
      duration: "06 Months",
      category: "IT",
      desc: "Analyzing complex data to find insights and trends."
    },
    { 
      title: "'O' LEVEL", 
      courseNo: 20,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "12 Months",
      category: "Diploma",
      desc: "Standard certification for foundational IT knowledge."
    },
    { 
      title: "AI & Machine Learning", 
      courseNo: 21,
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000",
      eligibility: "Graduation",
      duration: "06 Months",
      category: "IT",
      desc: "Building intelligent systems with predictive models."
    },
    { 
      title: "UI/UX Design", 
      courseNo: 22,
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "04 Months",
      category: "Design",
      desc: "Designing user-friendly interfaces and experiences."
    },
    { 
      title: "Tally Prime with GST", 
      courseNo: 23,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "03 Months",
      category: "Accounting",
      desc: "Computerized accounting with Tally Prime and GST."
    },
    { 
      title: "Digital Marketing", 
      courseNo: 24,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "04 Months",
      category: "Marketing",
      desc: "Strategic online promotion and brand building."
    },
    { 
      title: "Full Stack Development with Gen AI", 
      courseNo: 25,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
      eligibility: "+2 Pass",
      duration: "12 Months",
      category: "Programming",
      desc: "End-to-end development with Generative AI tools."
    },
    { 
      title: "UI/UX FRONTEND", 
      courseNo: 26,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000",
      eligibility: "10th Pass",
      duration: "06 Months",
      category: "Programming",
      desc: "Building responsive and interactive web interfaces."
    },
    { 
      title: "MERN STACK", 
      courseNo: 27,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
      eligibility: "+2 Pass",
      duration: "08 Months",
      category: "Programming",
      desc: "Full stack development with MongoDB, Express, React, Node."
    },
    { 
      title: "LIVE PROJECT", 
      courseNo: 28,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000",
      eligibility: "Final Year Students",
      duration: "02 Months",
      category: "Experience",
      desc: "Hands-on experience with real-world project development."
    },
    { 
      title: "Internship Program", 
      courseNo: 29,
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000",
      eligibility: "Graduates",
      duration: "03-06 Months",
      category: "Experience",
      desc: "Professional work environment training and mentorship."
    },
    { 
      title: "Industrial Training", 
      courseNo: 30,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000",
      eligibility: "Engineering/Diploma",
      duration: "01-03 Months",
      category: "Experience",
      desc: "Industry-specific training for technical students."
    }
  ];

  const categories = ['All', 'Kids', 'Diploma', 'Accounting', 'Design', 'IT', 'Programming', 'Multimedia', 'Marketing', 'Experience', 'Office'];


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
        <div className="flex flex-row items-center gap-6 mb-16 bg-white p-4 pl-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-5xl mx-auto">
           {/* Categories - Horizontal Scroll */}
           <div className="flex-1 flex overflow-x-auto scrollbar-none gap-2 py-1 pr-6 border-r border-slate-100 group/scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-black transition-all whitespace-nowrap ${
                  filter === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search - Compact Premium */}
          <div className="relative w-64 mr-2">
            <input 
              type="text" 
              placeholder="Search course title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50/80 border border-transparent rounded-full py-3 px-5 pl-12 text-xs focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all font-bold placeholder:text-slate-400"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
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
                  </div>
 
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 line-clamp-2">
                    {course.desc}
                  </p>
 
                  {/* Action Buttons */}
                  <div className="mt-auto flex gap-2">
                    <button 
                      onClick={() => toast.info(`Downloading ${course.title} brochure...`)}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-black text-[9px] uppercase tracking-widest py-3 rounded-xl transition-all"
                    >
                      <Download size={14} /> Brochure
                    </button>
                    <button 
                      onClick={() => handleEnrollClick(course)}
                      className="flex-[1.5] inline-flex items-center justify-center gap-2 bg-[#6c63ff] hover:bg-[#5b52ff] text-white font-black text-[9px] uppercase tracking-widest py-3 rounded-xl shadow-lg shadow-[#6c63ff]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Enroll Now <ArrowRight size={14} />
                    </button>
                    <button 
                      onClick={() => window.open(`https://wa.me/919853227488?text=I'm interested in the ${course.title} course.`, '_blank')}
                      className="w-10 h-10 inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-xl shadow-lg shadow-emerald-500/10 transition-all hover:scale-110"
                    >
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
            <Link to="/contact">
              <Button className="h-14 px-10 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest shadow-2xl">
                CONSULT COUNSELOR
              </Button>
            </Link>
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
