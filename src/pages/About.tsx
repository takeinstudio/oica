import { ShieldCheck, GraduationCap, Users, Star, Target, CheckCircle2, TrendingUp, Heart } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/shared/AnimatedSection';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const stats = [
  { label: "Years of Excellence", value: "12+", icon: Star, color: "text-amber-500" },
  { label: "Successful Students", value: "5000+", icon: GraduationCap, color: "text-blue-500" },
  { label: "Active Branches", value: "31+", icon: Users, color: "text-emerald-500" },
  { label: "Certified Courses", value: "15+", icon: ShieldCheck, color: "text-purple-500" },
];

const About = () => {
  return (
    <div className="pb-24 bg-[#FDFBF7]">
      <PageHeader 
        title="Institutional Legacy"
        subtitle="About OICA"
        breadcrumb="About"
        backgroundImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
        bottomPills={["Govt. Registered", "ISO 9001:2008", "Industry Led", "Socially Driven"]}
      />

      {/* Origin Story Section Origin */}
      <section className="section-padding overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
               <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-4 block">Our Origin</span>
               <h2 className="text-3xl md:text-5xl font-heading font-black mb-8 leading-tight text-slate-900">
                 Pioneering <span className="text-primary">Digital Literacy</span> Since 2014
               </h2>
               <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
                  <p>
                    Odisha Institute of Computer Application (OICA) was founded with a singular mission: to make world-class technology education accessible and affordable to every student in Odisha, regardless of their background.
                  </p>
                  <p>
                    Over the last decade, we have evolved from a local training center into a statewide network of 31+ ISO-certified branches. Our approach combines rigorous theoretical foundation with intensive 1-to-1 practical sessions.
                  </p>
                  <div className="pt-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                       {[
                         "Registered under Govt. of Odisha",
                         "ISO 9001:2008 Certified",
                         "1-to-1 Practical Guidance",
                         "Job-Oriented Curriculum"
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
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />)}
                     </div>
                     <p className="text-xs font-black text-slate-900 leading-tight">"Best Tech Institute in Odisha Rural Regions"</p>
                     <p className="text-[9px] text-slate-400 font-bold uppercase mt-2">Digital Excellence Award</p>
                  </div>
               </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Impact Stats Stats Stats */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
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

      {/* Vision & Mission Mission Sections */}
      <section className="section-padding">
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
                        To transform the technological landscape of Odisha by providing accessible, job-oriented computer education. We aim to empower the rural and urban youth with elite digital skills, ensuring no student is left behind in the global digital revolution.
                     </p>
                     <div className="mt-10 flex flex-wrap gap-4">
                        <div className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                           Placement Support
                        </div>
                        <div className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                           Scholarship for EWS
                        </div>
                     </div>
                  </div>
               </AnimatedSection>
               
               <AnimatedSection delay={0.2}>
                  <div className="h-full p-12 bg-primary text-white rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden">
                     <div className="absolute bottom-0 right-0 p-12 opacity-10">
                        <Heart size={100} fill="white" />
                     </div>
                     <h3 className="text-2xl font-heading font-black mb-6">Our Values</h3>
                     <ul className="space-y-6">
                        {[
                          { title: "Integrity", desc: "Honesty in every student interaction." },
                          { title: "Inclusion", desc: "Dedicated programs for weaker sections." },
                          { title: "Innovation", desc: "Latest curriculum with modern labs." }
                        ].map(val => (
                          <li key={val.title} className="group cursor-default">
                             <h4 className="font-black text-sm uppercase tracking-widest mb-1 text-white/90 group-hover:text-white transition-colors">
                                {val.title}
                             </h4>
                             <p className="text-xs font-medium text-white/60">{val.desc}</p>
                          </li>
                        ))}
                     </ul>
                  </div>
               </AnimatedSection>
            </div>
         </div>
      </section>

      {/* Call to action CTA CTA */}
      <section className="section-padding pt-0">
         <div className="section-container">
            <AnimatedSection>
               <div className="bg-slate-50 border border-slate-100 p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(76,29,149,0.05)_0%,transparent_70%)]" />
                  <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 mb-6 relative z-10">
                    Ready to Build Your <span className="text-primary italic">Digital Future?</span>
                  </h2>
                  <p className="text-slate-500 font-medium mb-12 max-w-2xl mx-auto relative z-10">
                     Join OICA's community of 5000+ graduates and start your journey towards a professional career in computer applications today.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 relative z-10">
                    <Link to="/courses">
                      <Button size="lg" className="rounded-2xl px-10 h-16 font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">
                         View All Programs
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline" size="lg" className="rounded-2xl px-10 h-16 font-black uppercase text-xs tracking-widest bg-white border-slate-200">
                         Contact Us
                      </Button>
                    </Link>
                  </div>
               </div>
            </AnimatedSection>
         </div>
      </section>
    </div>
  );
};

export default About;
