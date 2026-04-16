import { motion } from 'framer-motion';
import { BookOpen, Monitor, HelpCircle, FileText, CheckCircle, Lightbulb, Presentation, Users, Briefcase } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Features = () => {
  const methodology = [
    { title: "Theory Classes", desc: "Strong conceptual foundation through expert-led sessions with modern teaching aids.", icon: BookOpen },
    { title: "Practical Classes", desc: "Hands-on computer training for every concept learned. One student one computer policy.", icon: Monitor },
    { title: "Doubt Clear Sessions", desc: "One-on-one sessions to clear all your doubts and strengthen your understanding.", icon: HelpCircle },
    { title: "Assignments", desc: "Regular assignments to reinforce learning and track your progress throughout the course.", icon: FileText },
    { title: "Examinations", desc: "Comprehensive exams to certify your skills and prepare you for the IT industry.", icon: CheckCircle },
  ];

  const whyChoose = [
    { title: "High Industry Interface", desc: "Strong connections with leading IT companies for placement opportunities.", icon: Briefcase },
    { title: "Confidence & Reasoning", desc: "Focus on building confidence and analytical reasoning skills for professional success.", icon: Lightbulb },
    { title: "Audio / Video Presentations", desc: "Modern multimedia-based teaching methodology for better retention and learning.", icon: Presentation },
    { title: "One-to-One Training", desc: "Personalized practical computer training for every student, ensuring personal growth.", icon: Users },
  ];

  return (
    <div className="pb-24">
      <PageHeader 
        title="Institutional Features"
        subtitle="The OICA Advantage"
        breadcrumb="Features"
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
        bottomPills={["Govt. Registered", "ISO Certified", "100% Practical", "Placement Support"]}
      />

      <div className="container-max px-4 pt-24">
        {/* Why Choose OICA */}
        <div className="mb-24">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoose.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-8 group hover:bg-primary/5 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <div className="bg-foreground text-background rounded-[3rem] p-12 lg:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 inline-block tracking-widest">Our Methodology</span>
              <h2 className="text-4xl font-bold mb-8 leading-tight">A Structured 5-Step Approach to Mastering Technology</h2>
              <p className="text-neutral-400 mb-12 leading-relaxed">
                We believe in a holistic learning process that transitions from theory to practical application, ensuring every student becomes an expert.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold">1</div>
                  <p className="font-semibold">Professional Theory</p>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold">2</div>
                  <p className="font-semibold">Intensive Practical</p>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold">3</div>
                  <p className="font-semibold">Expert Guidance</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 space-y-6">
              {methodology.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex gap-6 hover:bg-white/10 transition-all group"
                >
                  <div className="text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                    <step.icon size={32} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2">{step.title}</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
