import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';

const Courses = () => {
  const [filter, setFilter] = useState('All');

  const courseList = [
    { title: "Advanced Office", category: "Core", desc: "Master MS Office suite (Word, Excel, PPT) with advanced features and automation." },
    { title: "Tally ERP", category: "Accounting", desc: "Complete accounting and inventory management with Tally ERP software including GST." },
    { title: "PGDCA", category: "Diploma", desc: "Post Graduate Diploma in Computer Application - comprehensive 1-year program." },
    { title: "DCA", category: "Diploma", desc: "Diploma in Computer Application - foundational course for beginners." },
    { title: "Web Design", category: "IT", desc: "Build modern responsive websites using HTML, CSS, JavaScript and design tools." },
    { title: "Digital Marketing", category: "IT", desc: "SEO, social media, online marketing and content strategy fundamentals." },
    { title: "Photoshop", category: "Design", desc: "Professional photo editing, manipulation and graphic design principles." },
    { title: "Animation", category: "Design", desc: "2D & 3D animation, motion graphics and video editing basics." },
    { title: "AutoCAD", category: "Engineering", desc: "Technical drawing, 3D modeling and CAD design for engineering and architecture." },
    { title: "C++", category: "Programming", desc: "Object-oriented programming fundamentals and data structures." },
    { title: "Java", category: "Programming", desc: "Enterprise application development, core Java and advanced concepts." },
    { title: "PHP", category: "Web", desc: "Server-side web development and database management with MySQL." },
    { title: "DFA", category: "Accounting", desc: "Diploma in Financial Accounting including manual and computerized accounting." },
    { title: "Hardware", category: "Technical", desc: "Computer hardware networking, troubleshooting and maintenance." },
    { title: "DTP", category: "Design", desc: "Desktop publishing, print design with PageMaker and CorelDraw." },
    { title: "Data Entry", category: "Core", desc: "Professional data entry, accuracy speed training and spreadsheet management." },
  ];

  const categories = ['All', 'Diploma', 'Core', 'Accounting', 'Design', 'IT', 'Programming'];

  const filteredCourses = filter === 'All' 
    ? courseList 
    : courseList.filter(c => c.category === filter);

  return (
    <div className="pb-24 min-h-screen">
      <PageHeader 
        title="Our Training Programs"
        subtitle="Modern Curriculum"
        breadcrumb="Courses"
        backgroundImage="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
        bottomPills={["Industry Ready", "Expert Led", "16+ Certifications"]}
      />

      <div className="container-max px-4 pt-20">
        {/* Search Bar - Moved below Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 px-4">
          <div className="relative w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="w-full md:w-96 bg-white border border-border rounded-full py-4 px-6 pl-14 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium shadow-sm hover:shadow-md"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto pb-4 gap-3 mb-12 scrollbar-hide px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                filter === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'bg-white text-muted-foreground hover:bg-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Grid Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {filteredCourses.map((course, i) => (
            <motion.div
              layout
              key={course.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                y: -12,
                rotateX: 5,
                rotateY: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{ perspective: "1000px" }}
              className="card-premium card-animate p-8 group flex flex-col h-full bg-white border border-border/50"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{course.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                {course.desc}
              </p>
              <div className="pt-6 border-t border-border mt-auto">
                <button className="text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2 group/btn">
                  Course Details
                  <div className="w-6 h-[2px] bg-primary scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
