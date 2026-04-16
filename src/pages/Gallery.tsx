import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { Image as ImageIcon, Maximize2 } from 'lucide-react';

const Gallery = () => {
  const images = [
    { url: "https://images.unsplash.com/photo-1523050337456-5d55f21af557?q=80&w=1470&auto=format&fit=crop", title: "Campus Entrance" },
    { url: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1470&auto=format&fit=crop", title: "Main Lab" },
    { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", title: "Study Area" },
    { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop", title: "Group Discussion" },
    { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop", title: "Coding Session" },
    { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop", title: "IT Workshop" },
    { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop", title: "Project Work" },
    { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1532&auto=format&fit=crop", title: "Library" },
    { url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1470&auto=format&fit=crop", title: "Classroom" },
  ];

  return (
    <div className="pb-24">
      <PageHeader 
        title="Institutional Showcase"
        subtitle="Visual Gallery"
        breadcrumb="Gallery"
        backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
        bottomPills={["Modern Labs", "Vibrant Campus", "Student Life"]}
      />

      <div className="container-max px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-black/5"
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white">
                    <ImageIcon size={20} className="text-primary" />
                    <span className="font-bold tracking-wide">{img.title}</span>
                  </div>
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
