import { Award, ShieldCheck, GraduationCap, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const About = () => {
  return (
    <div className="pb-24">
      <PageHeader 
        title="About Us"
        subtitle="About OICA"
        breadcrumb="About Us"
        description="Empowering learners with skills that shape real careers. Where knowledge meets practical, industry-ready training for the next generation of professionals."
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
        bottomPills={["30+ Courses", "31+ Branches", "ISO 9001:2008", "Free Training"]}
      />

      <div className="container-max px-4 pt-24">

        {/* Content Content Content */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-24">
          <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
            <p>
              The institute provides high quality computer education with strong theory and practical training. OICA operates across major towns of Odisha and aims to make technology education accessible to everyone.
            </p>
            <p>
              Our organization not only builds strong professional careers in the computer field but also provides placement opportunities in reputed companies. OICA also offers FREE computer training for economically weaker sections of society.
            </p>
            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h3 className="text-foreground font-bold text-xl mb-4 italic">"Quality Education at Affordable Price"</h3>
              <p className="text-sm">
                Our mission is to spread computer literacy to every corner of Odisha, ensuring that every student has the skills needed to succeed in the digital age.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="card-premium p-8 bg-primary/10 border-primary/20">
              <ShieldCheck className="text-primary mb-4" size={32} />
              <h4 className="font-bold text-lg mb-2">Govt. Registered</h4>
              <p className="text-sm">Certified and registered under Govt. of Odisha standards.</p>
            </div>
            <div className="card-premium p-8 bg-accent/10 border-accent/20">
              <Award className="text-accent mb-4" size={32} />
              <h4 className="font-bold text-lg mb-2">ISO 9001:2008</h4>
              <p className="text-sm">Maintaining international standards in computer education.</p>
            </div>
            <div className="card-premium p-8 bg-secondary border-border">
              <Users className="text-foreground mb-4" size={32} />
              <h4 className="font-bold text-lg mb-2">Socially Responsible</h4>
              <p className="text-sm">Special focus on economically weaker sections.</p>
            </div>
            <div className="card-premium p-8 bg-foreground text-background">
              <GraduationCap className="text-primary mb-4" size={32} />
              <h4 className="font-bold text-lg mb-2">31+ Districts</h4>
              <p className="text-sm opacity-80">Connected across the entire state of Odisha.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
