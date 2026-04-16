import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Youtube, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AnimatedSection from '../components/shared/AnimatedSection';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="pb-24 bg-[#FDFBF7]">
      <PageHeader
        title="Get in Touch"
        subtitle="Contact Us"
        breadcrumb="Contact"
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2070&auto=format&fit=crop"
        bottomPills={["24/7 Support", "Quick Response", "Expert Guidance", "Verified Identity"]}
      />

      <div className="container-max px-6 md:px-10 pt-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Contact Information Information */}
          <div className="lg:col-span-5 space-y-12">
            <AnimatedSection>
               <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-4 block">Official Contact</span>
               <h2 className="text-3xl md:text-5xl font-heading font-black mb-8 leading-tight text-slate-900 tracking-tight">
                  Reach Out to our <span className="text-primary italic">Expert Team</span>
               </h2>
               <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
                  Whether you're a student looking for a course or an entrepreneur interested in a franchise, we are always ready to assist you.
               </p>
            </AnimatedSection>

            <div className="grid gap-6">
               {[
                 { 
                   icon: Mail, 
                   title: "Email Us", 
                   values: ["info@oica.in", "oicainstitute@gmail.com"],
                   color: "bg-blue-500/10 text-blue-600 border-blue-100" 
                 },
                 { 
                   icon: Phone, 
                   title: "Call Us", 
                   values: ["+91 9853227488", "0674-2391234"],
                   color: "bg-emerald-500/10 text-emerald-600 border-emerald-100" 
                 },
                 { 
                   icon: MapPin, 
                   title: "Visit Us", 
                   values: ["Plot No-790/1339, Near SUM Hospital,", "Bhubaneswar, Odisha, India"],
                   color: "bg-purple-500/10 text-purple-600 border-purple-100" 
                 }
               ].map((item, i) => (
                 <AnimatedSection key={item.title} delay={i * 0.1}>
                    <div className={`p-8 rounded-[2.5rem] border ${item.color} flex items-start gap-6 group hover:translate-x-2 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50`}>
                       <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                          <item.icon size={24} />
                       </div>
                       <div>
                          <h4 className="font-black text-slate-900 text-lg mb-2">{item.title}</h4>
                          {item.values.map(val => (
                             <p key={val} className="text-slate-500 font-bold text-sm tracking-tight">{val}</p>
                          ))}
                       </div>
                    </div>
                 </AnimatedSection>
               ))}
            </div>

            <AnimatedSection className="pt-8 block">
               <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
                     <ShieldCheck size={100} />
                  </div>
                  <h4 className="text-xl font-heading font-black mb-6">Follow Our Journey</h4>
                  <div className="flex gap-4">
                     {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                       <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white/50 hover:text-white">
                         <Icon size={20} />
                       </a>
                     ))}
                  </div>
               </div>
            </AnimatedSection>
          </div>

          {/* Right Side: Message Form Form Section */}
          <div className="lg:col-span-7">
            <AnimatedSection direction="right" className="relative h-full">
               {/* Background Decorative Element */}
               <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
               <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

               <div className="relative bg-white/40 backdrop-blur-3xl border border-slate-200 p-10 md:p-16 rounded-[4rem] shadow-[0_32px_120px_-30px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center gap-3 mb-10">
                     <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                        <MessageSquare size={20} />
                     </div>
                     <h3 className="text-2xl font-heading font-black text-slate-900">Send a Message</h3>
                  </div>

                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black ml-1 uppercase tracking-[0.2em] text-slate-400">Full Name</label>
                          <input type="text" placeholder="John Doe" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-4.5 px-6 outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black ml-1 uppercase tracking-[0.2em] text-slate-400">Email Address</label>
                          <input type="email" placeholder="john@example.com" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-4.5 px-6 outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm" />
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-black ml-1 uppercase tracking-[0.2em] text-slate-400">Subject</label>
                       <input type="text" placeholder="Enquiry about courses" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-4.5 px-6 outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black ml-1 uppercase tracking-[0.2em] text-slate-400">Your Message</label>
                       <textarea rows={5} placeholder="Tell us how we can help..." className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-5 px-6 outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm resize-none"></textarea>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit" 
                      className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/10 transition-all text-xs tracking-[0.2em] uppercase group"
                    >
                      Send Message
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>

                    <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-100">
                       <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          <ShieldCheck size={14} className="text-emerald-500" /> Secure Data
                       </div>
                       <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          <Clock size={14} className="text-blue-500" /> 24h Response
                       </div>
                    </div>
                  </form>
               </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      {/* Map Map Map Section Section */}
      <div className="container-max px-6 md:px-10 mt-24">
         <AnimatedSection>
            <div className="h-[450px] w-full bg-slate-100 rounded-[3rem] border border-slate-200 overflow-hidden relative shadow-2xl">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.53320364958!2d85.75041302302388!3d20.296058450146033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2a5103459%3A0x70c01511284d751!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1713264023719!5m2!1sen!2sin"
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
               <div className="absolute top-8 left-8 p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-xl max-w-[240px]">
                  <p className="text-[10px] font-black text-primary tracking-widest uppercase mb-2">Main Headquarters</p>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">Near SUM Hospital, Kalinga Nagar, Bhubaneswar, Odisha 751003</p>
               </div>
            </div>
         </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;
