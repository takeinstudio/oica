import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Award, Users, GraduationCap, Bell } from 'lucide-react';

const Home = () => {
  const features = [
    { title: "Quality Education", desc: "High quality computer education with strong theory and practical training.", icon: GraduationCap },
    { title: "Career Building", desc: "Build strong professional careers and placement opportunities.", icon: Award },
    { title: "Social Commitment", desc: "FREE computer training for economically weaker sections of society.", icon: Users },
  ];

  const notices = [
    "New Admissions Started for 2026 Batch",
    "Free Computer Courses Started on April 2025",
    "Summer Courses Started - Register Now",
    "Central and State Government Free Courses Available",
  ];

  const courses = [
    { title: "Advanced Office", desc: "Master MS Office suite with advanced features", icon: "MS" },
    { title: "Tally ERP", desc: "Complete accounting with Tally ERP software", icon: "T" },
    { title: "PGDCA", desc: "Post Graduate Diploma in Computer Application", icon: "P" },
    { title: "DCA", desc: "Diploma in Computer Application", icon: "D" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Award size={14} />
              ISO 9001:2008 Certified Institute
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Build Your Future <br />
              <span className="text-primary italic">With Computer</span> <br />
              Education
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Odisha Institute of Computer Application provides professional computer education, practical training, and career opportunities to students across Odisha.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="btn-primary flex items-center gap-2 group">
                View Courses
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/apply" className="px-8 py-3.5 rounded-full border-2 border-border font-bold hover:bg-secondary transition-all">
                Apply for Admission
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20 aspect-[4/3] bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop" 
                alt="Students learning" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="text-sm font-medium opacity-80 mb-1">Join 5000+ Students</p>
                  <h3 className="text-2xl font-bold">Empowering Odisha through IT</h3>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 animate-float">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Practical Training</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Notice Board */}
      <section className="bg-primary/5 py-10 border-y border-primary/10 overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-4 text-primary font-bold uppercase tracking-[0.2em] text-sm">
            <Bell size={18} />
            Notice Board:
          </div>
          {notices.concat(notices).map((notice, i) => (
            <div key={i} className="flex items-center gap-4 text-foreground/80 font-medium">
              <div className="w-2 h-2 rounded-full bg-primary" />
              {notice}
              <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded ml-2">NEW</span>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 inline-block">Welcome To OICA</span>
            <h2 className="text-4xl font-bold mb-6">Pioneering Computer Education in Odisha</h2>
            <p className="text-muted-foreground text-lg italic">
              "Technology is changing rapidly and our mission is to make technology easy to learn."
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                rotateX: 4,
                rotateY: -4,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
              transition={{ delay: i * 0.1 }}
              style={{ perspective: "1000px" }}
              className="card-premium card-animate p-8 flex flex-col items-center text-center group"
            >
                <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Message */}
      <section className="bg-secondary/50 py-24">
        <div className="container-max grid lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-2">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[3/4] bg-muted/30 border-2 border-dashed border-border flex items-center justify-center p-12">
              <div className="text-center opacity-20">
                <GraduationCap size={80} className="mx-auto mb-4" />
                <p className="text-xs uppercase tracking-[0.2em] font-bold">OICA Director</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 inline-block">Director's Desk</span>
            <h2 className="text-4xl font-bold mb-8">A Message From Our Director</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                It is my pleasure to welcome you to the Odisha Institute of Computer Application. Technology is changing rapidly and our mission is to make technology easy to learn.
              </p>
              <p>
                Our institute focuses on developing students with strong technical knowledge, professional attitude, and practical skills. Even students who are using a computer for the first time can easily learn through our unique training methodology.
              </p>
              <p className="font-semibold text-foreground italic">
                "We guide every student personally and help them build a strong career in the IT industry."
              </p>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <div className="w-16 h-[2px] bg-primary" />
              <div>
                <p className="font-bold text-xl">Director of OICA</p>
                <p className="text-sm text-primary font-medium tracking-wide uppercase">Leading with Vision</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section-padding overflow-hidden">
        <div className="container-max">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 inline-block">Our Courses</span>
              <h2 className="text-4xl font-bold">Industry-relevant programs for your career</h2>
            </motion.div>
            <Link to="/courses" className="text-primary font-bold flex items-center gap-2 group hover:underline translate-y-[-10px]">
              View All Courses
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-6 group cursor-pointer card-animate"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  {course.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{course.desc}</p>
                <div className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 inline-block">Campus Life</span>
            <h2 className="text-4xl font-bold">Institute Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Moved galleryImages declaration outside the JSX map */}
            {(() => {
              const galleryImages = [
                { url: "https://images.unsplash.com/photo-1523050337456-5d55f21af557?q=80&w=1471&auto=format&fit=crop", title: "Campus Entrance" },
                { url: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1470&auto=format&fit=crop", title: "Main Lab" },
                { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", title: "Study Area" },
                { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop", title: "Group Discussion" },
                { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop", title: "Coding Session" },
                { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop", title: "IT Workshop" },
              ];
              return galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <img 
                    src={img.url} 
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                      {img.title}
                    </span>
                  </div>
                </motion.div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding overflow-hidden">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 inline-block">Success Stories</span>
            <h2 className="text-4xl font-bold">What Our Students Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Mohanty", role: "Software Engineer", content: "OICA provided me the foundation I needed. The practical training in Java and PGDCA was exceptional.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop" },
              { name: "Priya Das", role: "Data Analyst", content: "The Tally ERP course was very thorough. I got placed immediately after completing my certification.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop" },
              { name: "Sanjay Kumar", role: "UI Designer", content: "Learning at OICA was a great experience. The faculty is very supportive and knowledgeable.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop" }
            ].map((testi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="card-premium p-8 card-animate"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={testi.img} alt={testi.name} className="w-14 h-14 rounded-full object-cover ring-4 ring-primary/10" />
                  <div>
                    <h4 className="font-bold text-lg leading-tight">{testi.name}</h4>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">{testi.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">"{testi.content}"</p>
                <div className="flex gap-1 mt-6 text-yellow-500">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="container-max">
          <div className="bg-primary rounded-[3.5rem] p-12 lg:p-24 text-center relative overflow-hidden group shadow-2xl shadow-primary/20">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 max-w-3xl mx-auto"
            >
              <h2 className="text-white text-5xl lg:text-7xl font-bold mb-10 leading-[1.1] tracking-tight">
                Ready to transform your <span className="text-accent underline underline-offset-[12px] decoration-4">career</span>?
              </h2>
              <p className="text-white/80 text-xl mb-14 leading-relaxed max-w-2xl mx-auto">
                Join OICA today and get the best practical computer training in Odisha. Your future starts here.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/apply" className="bg-white text-primary px-12 py-5 rounded-full font-extrabold text-xl shadow-2xl shadow-black/10 hover:scale-105 active:scale-95 transition-all duration-500 group flex items-center gap-2">
                  Apply for Admission
                  <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/contact" className="px-12 py-5 rounded-full font-extrabold border-2 border-white/20 text-white hover:bg-white/10 transition-all duration-500 backdrop-blur-sm text-xl hover:border-white/40">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
