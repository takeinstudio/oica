import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Government Job Achiever",
      role: "Student Review",
      text: "After successfully completing my computer course at Odisha Institute of Computer Application (OICA) I got a government job. The practical training, guidance, and support from the faculty helped me achieve my goal. I am very thankful to the institute for building my confidence and skills.",
      rating: 5,
      avatar: "https://api.uifaces.co/our-content/donated/x4_8_M4B.jpg"
    },
    {
      name: "Private Sector Professional",
      role: "Student Review",
      text: "Odisha Institute of Computer Application (OICA) provided excellent computer education and career support, which helped me secure a private sector job after completing my course. The teachers were very supportive and always motivated us to improve our skills.",
      rating: 5,
      avatar: "https://api.uifaces.co/our-content/donated/vIAwZsq0.jpg"
    },
    {
      name: "Career Success Story",
      role: "Student Review",
      text: "I am grateful to the Odisha Institute of Computer Application (OICA) for helping me achieve success in my career. After completing the computer course, I received opportunities in both government and private sectors. The training and placement support were truly valuable.",
      rating: 5,
      avatar: "https://api.uifaces.co/our-content/donated/n_Fp5l-f.jpg"
    },
    {
      name: "Practical Experience",
      role: "Student Review",
      text: "I gained excellent computer knowledge and practical experience from Odisha Institute of Computer Application. The teachers are very supportive and friendly.",
      rating: 5,
      avatar: "https://api.uifaces.co/our-content/donated/rSAnwaS8.jpg"
    },
    {
      name: "Skill Enhancement",
      role: "Student Review",
      text: "Odisha Institute of computer Application helped me improve my technical skills and confidence. The training methods are easy to understand and very effective.",
      rating: 4,
      avatar: "https://api.uifaces.co/our-content/donated/n_Fp5l-f.jpg"
    },
    {
      name: "Job Preparation",
      role: "Student Review",
      text: "I am thankful to the institute (OICA) for providing quality education and career guidance. It really helped me prepare for job opportunities.",
      rating: 5,
      avatar: "https://api.uifaces.co/our-content/donated/rSAnwaS8.jpg"
    },
    {
      name: "Positive Environment",
      role: "Student Review",
      text: "The faculty members are experienced and always ready to help students. I enjoyed learning in such a positive environment from Odisha Institute of computer Application.",
      rating: 5,
      avatar: "https://api.uifaces.co/our-content/donated/x4_8_M4B.jpg"
    },
    {
      name: "Modern Courses",
      role: "Student Review",
      text: "One of the best computer institutes (OICA) for learning modern computer courses. The practical classes and placement support are very helpful.",
      rating: 5,
      avatar: "https://api.uifaces.co/our-content/donated/vIAwZsq0.jpg"
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
