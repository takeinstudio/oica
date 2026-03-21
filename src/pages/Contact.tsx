import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Contact = () => {
  return (
    <div className="pb-24">
      <PageHeader
        title="Contact Us"
        subtitle="Get In Touch"
        breadcrumb="Contact"
        description="Have questions? We'd love to hear from you. Reach out to us for admission enquiries, franchise details, or any other information."
        backgroundImage="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2020&auto=format&fit=crop"
        bottomPills={["24/7 Support", "Quick Response", "Expert Guidance"]}
      />

      <div className="container-max px-4 pt-24">

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Contact Details Side Side */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Email Us</h4>
                  <p className="text-muted-foreground font-medium">info@oica.in</p>
                  <p className="text-muted-foreground font-medium">oicainstitute@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Call Us</h4>
                  <p className="text-muted-foreground font-medium">+91 9853227488</p>
                  <p className="text-muted-foreground font-medium">0674-2391234</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Visit Us</h4>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    Plot No-790/1339, Near SUM Hospital,<br />
                    Bhubaneswar, Khurda, Odisha, India
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-border">
              <h4 className="font-bold text-xl mb-6">Follow Our Journey</h4>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Form Section */}
          <div className="lg:col-span-3">
            <div className="card-premium p-10 lg:p-12 shadow-2xl border-border bg-white">
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Your Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Your Email</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Subject</label>
                  <input type="text" placeholder="Enquiry about courses" className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Your Message</label>
                  <textarea rows={5} placeholder="Tell us how we can help..." className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg mt-4 group">
                  Send Message
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
