import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Rajesh Kumar",
      role: "DCA Student",
      text: "The practical training at OICA is exceptional. I gained confidence in computer basics within just 2 months. The faculty is very supportive.",
      rating: 5,
      avatar: "https://api.uifaces.co/our-content/donated/x4_8_M4B.jpg"
    },
    {
      name: "Sneha Mohanty",
      role: "PGDCA Graduate",
      text: "Joining OICA was the best decision for my career. The certification helped me land a great job in an IT firm right after graduation.",
      rating: 5,
      avatar: "https://api.uifaces.co/our-content/donated/vIAwZsq0.jpg"
    },
    {
      name: "Amit Behera",
      role: "Tally ERP Student",
      text: "As an accounting student, the Tally ERP course was a game changer. The real-world project work made learning very effective.",
      rating: 4,
      avatar: "https://api.uifaces.co/our-content/donated/n_Fp5l-f.jpg"
    },
    {
      name: "Priyanka Jena",
      role: "Web Design Student",
      text: "I loved the creative environment at OICA. The project-based learning model helped me build a strong portfolio and find freelancing gigs.",
      rating: 5,
      avatar: "https://api.uifaces.co/our-content/donated/rSAnwaS8.jpg"
    },
    {
      name: "Sanjay Biswal",
      role: "DTP Specialist",
      text: "The DTP course at OICA covered everything from basics to advanced design principles. Highly recommend it for aspiring graphic designers.",
      rating: 5,
      avatar: "https://api.uifaces.co/our-content/donated/n_Fp5l-f.jpg"
    },
    {
      name: "Anjali Sahu",
      role: "Data Entry Student",
      text: "OICA's focus on accuracy and speed training in the Data Entry course was exactly what I needed. Very professional environment.",
      rating: 4,
      avatar: "https://api.uifaces.co/our-content/donated/rSAnwaS8.jpg"
    }
  ];

  return (
    <div className="pb-24 bg-[#e8eef3] min-h-screen">
      <PageHeader 
        title="Student Success Stories"
        subtitle="Testimonials"
        breadcrumb="Testimonials"
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
        bottomPills={["5000+ Happy Students", "95% Success Rate", "Verified Reviews"]}
      />

      <div className="max-w-6xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group relative p-6 rounded-[2.5rem] bg-[#f0f4f8] shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] border-[3px] border-white/70 overflow-hidden flex flex-col justify-between"
            >
              {/* Smooth line hover animation moving from left to right */}
              <div className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
              
              <div className="absolute top-6 right-6 text-slate-300/40 transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-500/10 group-hover:-rotate-12">
                <Quote size={56} />
              </div>
              
              <div className="flex gap-1 mb-5 relative z-10">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className={j < review.rating ? "fill-amber-400 text-amber-400 drop-shadow-sm" : "text-slate-300"} />
                ))}
              </div>

              <p className="text-slate-600 italic mb-6 relative z-10 font-semibold leading-relaxed text-[13px] drop-shadow-sm flex-1">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-blue-400 to-indigo-500 shadow-md">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${review.name}&background=random`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-sm tracking-tight">{review.name}</h4>
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
