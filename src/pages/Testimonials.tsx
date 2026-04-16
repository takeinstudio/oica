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
    <div className="pb-24 bg-[#f8fafc]">
      <PageHeader 
        title="Student Success Stories"
        subtitle="Testimonials"
        breadcrumb="Testimonials"
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
        bottomPills={["5000+ Happy Students", "95% Success Rate", "Verified Reviews"]}
      />

      <div className="container-max px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="card-premium p-8 bg-white border border-border/50 relative group"
            >
              <div className="absolute top-6 right-8 text-primary/10 transition-transform group-hover:scale-110">
                <Quote size={64} />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? "fill-primary text-primary" : "text-gray-200"} />
                ))}
              </div>

              <p className="text-gray-600 italic mb-8 relative z-10 font-medium leading-relaxed">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${review.name}&background=random`;
                  }}
                />
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">{review.role}</p>
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
