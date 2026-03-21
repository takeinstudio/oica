import { motion } from 'framer-motion';
import { Building2, CheckCircle2, FileText, Send } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Franchise = () => {
  const advantages = [
    "Low startup cost and high returns",
    "Flexible course structure and syllabus",
    "Expert placement support for students",
    "Global standard examination system",
    "ISO 9001:2008 certfication support",
    "Complete marketing and operational guidance",
  ];

  return (
    <div className="pb-24">
      <PageHeader 
        title="Be Our Partner"
        subtitle="Business Opportunity"
        breadcrumb="Franchise"
        description="Join the OICA network and be part of Odisha's growing computer education ecosystem. Start your own computer institute with our complete support."
        backgroundImage="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop"
        bottomPills={["Low Investment", "High Returns", "Complete Support", "ISO Certified"]}
      />

      <div className="container-max px-4 pt-24">

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Leftside Advantages */}
          <div>
            <div className="bg-primary/5 rounded-[3rem] p-12 lg:p-16 border border-primary/10">
              <h2 className="text-3xl font-bold mb-8">Franchise Advantages</h2>
              <ul className="space-y-6">
                {advantages.map((adv, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-foreground/80 font-medium leading-relaxed">{adv}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-12 p-8 bg-white rounded-3xl shadow-xl shadow-primary/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
                    <Building2 size={24} />
                  </div>
                  <h4 className="font-bold text-xl">Complete Support</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We provide complete support from setup to running your institute successfully. Our team will guide you through registration, training, and certification.
                </p>
              </div>
            </div>
          </div>

          {/* Right form enquiry form enquiry */}
          <div>
            <div className="card-premium p-10 lg:p-12 border-border shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <FileText className="text-primary" size={24} />
                <h3 className="text-2xl font-bold">Franchise Enquiry</h3>
              </div>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Full Name</label>
                    <input type="text" placeholder="Your Name" className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Gender</label>
                    <select className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer font-medium">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Proposed Unit District</label>
                    <input type="text" placeholder="District name" className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Proposed City</label>
                    <input type="text" placeholder="City name" className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Phone Number</label>
                    <input type="tel" placeholder="+91 00000 00000" className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Email Address</label>
                    <input type="email" placeholder="example@mail.com" className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Premises Available?</label>
                  <div className="flex gap-6 mt-2 ml-1">
                    <label className="flex items-center gap-2 cursor-pointer font-medium">
                      <input type="radio" name="premises" className="w-4 h-4 accent-primary" /> Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium">
                      <input type="radio" name="premises" className="w-4 h-4 accent-primary" /> No
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg mt-4">
                  Submit Enquiry
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Franchise;
