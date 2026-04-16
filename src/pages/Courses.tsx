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
  Plus
} from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Button } from '@/components/ui/button';

const Courses = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState("");

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

      <div className="container-max px-4 pt-24">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, i) => (
              <motion.div
                layout
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col h-full overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Course Image Area */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute -bottom-6 left-8 w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl border-4 border-white z-10 group-hover:rotate-12 transition-transform">
                    <BookOpen size={24} />
                  </div>

                  {/* Top Category Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-wider text-primary shadow-lg">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="pt-10 px-8 pb-8 flex flex-col flex-grow">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500">
                      COURSE {course.courseNo}
                    </span>
                  </div>

                  {/* Details Box */}
                  <div className="bg-slate-50 rounded-3xl p-6 space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        <GraduationCap size={16} /> Eligibility:
                      </div>
                      <span className="text-xs font-black text-slate-700">{course.eligibility}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        <Clock size={16} /> Duration:
                      </div>
                      <span className="text-xs font-black text-slate-700">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        <IndianRupee size={16} /> Total Fee:
                      </div>
                      <span className="text-sm font-black text-primary">{course.fee}</span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8 flex-grow">
                    {course.desc}
                  </p>

                  {/* Action Buttons */}
                  <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-3">
                    <button className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-[9px] uppercase tracking-widest py-3 rounded-xl transition-colors">
                      <Download size={14} /> Brochure
                    </button>
                    <button className="flex-[1.5] min-w-[120px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-black text-[9px] uppercase tracking-widest py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                      Enroll <ArrowRight size={14} />
                    </button>
                    <button className="w-10 h-10 inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-110">
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
    </div>
  );
};

export default Courses;
