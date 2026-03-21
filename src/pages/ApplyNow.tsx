import { Send, GraduationCap, CheckCircle2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApplyNow = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-secondary/30">
      <div className="container-max px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Info Info */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8 animate-float">
              <GraduationCap size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 italic">Secure Your Future Today</h1>
            <p className="text-muted-foreground text-lg italic">
              "Fill in your details below to apply for admission at Odisha Institute of Computer Application."
            </p>
          </div>

          <div className="card-premium p-10 lg:p-16 shadow-2xl border-white bg-white/80 backdrop-blur-xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <form className="relative z-10 space-y-10" onSubmit={(e) => e.preventDefault()}>
              {/* Personal Details Personal Sections */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3 text-primary">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm">1</div>
                  Student Information
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-white border border-border rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Phone Number</label>
                    <input type="tel" placeholder="+91 00000 00000" className="w-full bg-white border border-border rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Email Address</label>
                    <input type="email" placeholder="example@mail.com" className="w-full bg-white border border-border rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Gender</label>
                    <div className="relative">
                      <select className="w-full bg-white border border-border rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer font-medium">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Course & Location Location Sections */}
              <div className="space-y-6 pt-6 border-t border-border">
                <h3 className="text-xl font-bold flex items-center gap-3 text-primary">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm">2</div>
                  Course & Preferred Branch
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Select Course</label>
                    <div className="relative">
                      <select className="w-full bg-white border border-border rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer font-medium">
                        <option>PGDCA</option>
                        <option>Tally ERP</option>
                        <option>Web Design</option>
                        <option>Digital Marketing</option>
                        <option>Advanced Office</option>
                        <option>DCA</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={20} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Select Branch/District</label>
                    <div className="relative">
                      <select className="w-full bg-white border border-border rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer font-medium">
                        <option>Bhubaneswar</option>
                        <option>Cuttack</option>
                        <option>Puri</option>
                        <option>Sambalpur</option>
                        <option>Ganjam</option>
                        <option>Other District</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Message Section */}
              <div className="space-y-6 pt-6 border-t border-border">
                <h3 className="text-xl font-bold flex items-center gap-3 text-primary">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm">3</div>
                  Additional Message
                </h3>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Your Message (Optional)</label>
                  <textarea rows={4} placeholder="Any specific requirements or questions?" className="w-full bg-white border border-border rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium resize-none"></textarea>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full bg-primary text-white py-6 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all text-xl mb-6">
                  Submit Application
                  <Send size={24} />
                </button>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  Your information is safe and will only be used for admission purposes.
                </div>
              </div>
            </form>
          </div>

          {/* Student Help Help Sections */}
          <div className="text-center p-12 bg-white rounded-[3rem] border border-border shadow-xl">
            <h4 className="font-bold text-xl mb-4 italic text-primary">Already a student?</h4>
            <p className="text-muted-foreground mb-8 italic">
              "Verify your certificate or access student resources through our portal."
            </p>
            <Link to="/verify" className="inline-flex items-center gap-2 text-primary font-bold hover:underline group">
              Verify Certificate 
              <ChevronDown className="-rotate-90 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyNow;
