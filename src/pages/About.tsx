import { ShieldCheck, GraduationCap, Users, Star, Target, CheckCircle2, TrendingUp, Quote } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/shared/AnimatedSection';


const stats = [
   { label: "Years of Excellence", value: "13+", icon: Star, color: "text-amber-500" },
   { label: "Successful Students", value: "25000+", icon: GraduationCap, color: "text-blue-500" },
   { label: "Active Branches", value: "29+", icon: Users, color: "text-emerald-500" },
   { label: "Certified Courses", value: "15+", icon: ShieldCheck, color: "text-purple-500" },
];

const About = () => {
   return (
      <div className="pb-12 bg-[#FDFBF7]">
         <PageHeader
            title="Institutional Legacy"
            subtitle="About OICA"
            breadcrumb="About"
            backgroundImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
            bottomPills={["Govt. Registered", "ISO 9001:2008", "Industry Led", "Socially Driven"]}
         />

          {/* About Us Section */}
          <section className="py-12 overflow-hidden">
             <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                   <AnimatedSection direction="left">
                      <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-4 block">About Us</span>
                      <h2 className="text-3xl md:text-5xl font-heading font-black mb-8 leading-tight text-slate-900">
                         Leading <span className="text-primary">Computer Institute</span> in Odisha
                      </h2>
                      <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
                         <p>
                            We are a leading computer institute (Odisha Institute of Computer Application) dedicated to providing quality education and practical training in the field of information technology. Our mission is to empower students with the latest computer skills and knowledge required for today’s competitive world.
                         </p>
                         <p>
                            With experienced faculty, modern infrastructure, and industry-oriented courses, we ensure effective and hands-on learning. We focus on building confidence, enhancing skills, and preparing students for successful careers in IT and related fields.
                         </p>
                         <div className="pt-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                               {[
                                  "Govt. Registered Institution",
                                  "ISO 9001:2008 Certified",
                                  "Hands-on Practical Learning",
                                  "Latest IT Curriculum"
                               ].map(item => (
                                  <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                                     <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                                     {item}
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </AnimatedSection>

                  <AnimatedSection direction="right" className="relative">
                     <div className="absolute inset-x-10 -bottom-10 h-32 bg-primary/10 blur-[100px] rounded-full" />
                     <div className="relative group">
                        <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform" />
                        <img
                           src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
                           alt="OICA Campus"
                           className="relative rounded-[2.5rem] shadow-2xl border border-white h-[500px] w-full object-cover"
                        />
                        <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 max-w-[220px]">
                           <div className="flex gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />)}
                           </div>
                           <p className="text-xs font-black text-slate-900 leading-tight">"Best Tech Institute in Odisha Rural Regions"</p>
                           <p className="text-[9px] text-slate-400 font-bold uppercase mt-2">Digital Excellence Award</p>
                        </div>
                     </div>
                  </AnimatedSection>
               </div>
            </div>
         </section>
          {/* Director's Message Section */}
          <section className="py-16 bg-white relative overflow-hidden">
             <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                   <div className="lg:col-span-5">
                      <AnimatedSection direction="left">
                         <div className="relative">
                            <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] rotate-3" />
                            <img 
                               src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop" 
                               alt="Director" 
                               className="relative rounded-[2.5rem] shadow-2xl border-4 border-white aspect-[4/5] object-cover"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-2xl shadow-xl">
                               <p className="text-white font-black text-lg">Director's Message</p>
                            </div>
                         </div>
                      </AnimatedSection>
                   </div>
                   <div className="lg:col-span-7">
                      <AnimatedSection direction="right">
                         <Quote className="w-16 h-16 text-primary/10 mb-6" />
                         <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 mb-6 uppercase tracking-tight">
                            Building a <span className="text-primary italic">Successful Future</span>
                         </h2>
                         <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-lg">
                            <p>
                               "Welcome to our institute. It gives me great pleasure to lead an organization committed to quality computer education and skill development. In today’s fast-changing digital world, our aim is to equip students with practical knowledge, strong fundamentals, and confidence to succeed."
                            </p>
                            <p>
                               "We focus on industry-oriented training, experienced guidance, and a disciplined learning environment to help every student achieve their goals. I strongly believe that with dedication and the right guidance, success is within everyone’s reach."
                            </p>
                            <p>
                               "I invite you to be a part of our institute and build a bright and successful future."
                            </p>
                         </div>
                         <div className="mt-8 pt-8 border-t border-slate-100">
                            <p className="font-black text-slate-900 text-xl">Managing Director</p>
                            <p className="text-primary font-bold uppercase tracking-widest text-xs">OICA Institute</p>
                         </div>
                      </AnimatedSection>
                   </div>
                </div>
             </div>
          </section>

         {/* Impact Stats Stats Stats */}
         <section className="py-12 bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#4c1d95_0%,transparent_50%)]" />
            </div>
            <div className="section-container relative z-10">
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, i) => (
                     <AnimatedSection key={stat.label} delay={i * 0.1}>
                        <div className="text-center group">
                           <div className={`w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${stat.color}`}>
                              <stat.icon size={28} />
                           </div>
                           <h3 className="text-4xl md:text-5xl font-heading font-black text-white mb-2 leading-none tracking-tight">
                              {stat.value}
                           </h3>
                           <p className="text-[10px] md:text-xs font-black text-white/40 uppercase tracking-[0.2em]">
                              {stat.label}
                           </p>
                        </div>
                     </AnimatedSection>
                  ))}
               </div>
            </div>
         </section>

         {/* Vision & Mission Sections */}
         <section className="py-12">
            <div className="section-container">
               <div className="grid lg:grid-cols-3 gap-8">
                  <AnimatedSection delay={0.1} className="lg:col-span-2">
                     <div className="h-full p-12 bg-slate-50 rounded-[3rem] border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform">
                           <TrendingUp size={120} />
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                           <Target size={24} />
                        </div>
                        <h3 className="text-3xl font-heading font-black text-slate-900 mb-6">Our Core Mission</h3>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                           To provide quality computer education and practical training that empowers students with modern IT skills, enhances their confidence, and prepares them for successful careers in the digital world. The institute is committed to creating a supportive learning environment with experienced faculty and updated technology.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                           <div className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                              Quality Education
                           </div>
                           <div className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                              Practical Training
                           </div>
                        </div>
                     </div>
                  </AnimatedSection>

                  <AnimatedSection delay={0.2}>
                     <div className="h-full p-10 bg-primary text-white rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 p-12 opacity-10">
                           <TrendingUp size={100} fill="white" />
                        </div>
                        <h3 className="text-2xl font-heading font-black mb-6">Our Future Vision</h3>
                        <p className="text-white/80 font-medium leading-relaxed mb-8">
                           To become a leading computer institute recognized for excellence in technical education, innovation, and skill development, helping students achieve professional success and contribute to the growth of the technology-driven society.
                        </p>
                        <ul className="space-y-4">
                           {[
                              "Technical Excellence",
                              "Innovative Learning",
                              "Professional Success"
                           ].map(val => (
                              <li key={val} className="flex items-center gap-3">
                                 <CheckCircle2 size={16} className="text-white/40" />
                                 <span className="text-xs font-black uppercase tracking-widest">{val}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </AnimatedSection>
               </div>
            </div>
         </section>


         {/* Faculty Messages Section */}
         <section className="py-12 bg-slate-50">
            <div className="section-container">
               <AnimatedSection className="text-center mb-12">
                  <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 block">Voice of Mentors</span>
                  <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                     MESSAGES FROM <span className="text-primary italic">FACULTIES</span>
                  </h2>
               </AnimatedSection>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Lead Faculty Message */}
                  <AnimatedSection className="lg:col-span-2">
                     <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl relative group h-full">
                        <Quote className="absolute top-10 right-10 w-20 h-20 text-slate-100 group-hover:text-primary/5 transition-colors" />
                        <div className="relative z-10">
                           <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                              “Working at Odisha Institute of Computer Application (OICA) for the past 7 years has been a wonderful and rewarding experience. I have seen many students grow into skilled professionals through quality education and dedicated guidance. The institute provides a positive learning environment, supportive management, and excellent opportunities for both students and faculty members. I am proud to be a part of an organization that is committed to shaping bright futures.”
                           </p>
                           <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                                 GN
                              </div>
                              <div>
                                 <h4 className="font-black text-slate-900">Gyan Chand Nayak</h4>
                                 <p className="text-xs font-bold text-primary uppercase tracking-widest">Senior Faculty (7+ Years)</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </AnimatedSection>

                  {/* Secondary Faculty Messages */}
                  <div className="space-y-8">
                     {[
                        "Odisha institute of computer application provides an excellent learning environment where students gain both theoretical knowledge and practical skills in computer education.",
                        "We are proud to be part of the Odisha Institute of computer application that focuses on quality training, discipline, and student success."
                     ].map((msg, i) => (
                        <AnimatedSection key={i} delay={i * 0.1}>
                           <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-xl transition-all">
                              <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                                 “{msg}”
                              </p>
                           </div>
                        </AnimatedSection>
                     ))}
                  </div>
               </div>

               <div className="grid md:grid-cols-3 gap-8 mt-8">
                  {[
                     "The institute (OICA) continuously supports students with modern technology, experienced guidance, and career opportunities.",
                     "It is inspiring to see students grow in confidence and technical skills through the OICA’s dedicated teaching methods.",
                     "Odisha Institute of Computer Application is committed to shaping bright futures by providing professional computer education and valuable career support."
                  ].map((msg, i) => (
                     <AnimatedSection key={i} delay={i * 0.1}>
                        <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-lg h-full">
                           <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                              “{msg}”
                           </p>
                        </div>
                     </AnimatedSection>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
};

export default About;
