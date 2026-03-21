import { motion } from 'framer-motion';
import { MapPin, Building2, Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';

const Branches = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const districtList = [
    "Angul", "Bargarh", "Bhadrak", "Balasore", "Balangir", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khurda", "Koraput", "Malkangiri", "Mayurbhanj", "Nuapada", "Nabarangpur", "Nayagarh", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh", "Bhubaneswar"
  ];

  const filteredDistricts = districtList.filter(d => 
    d.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort();

  return (
    <div className="pb-24 min-h-screen">
      <PageHeader 
        title="Our Presence"
        subtitle="Connect With Us"
        breadcrumb="Branches"
        description="OICA operates across 31+ districts, bringing high-quality computer education to every corner of our state. Find a center near you."
        backgroundImage="https://images.unsplash.com/photo-1524666041070-9d87656c25bb?q=80&w=2070&auto=format&fit=crop"
        bottomPills={["31+ Districts", "Statewide Presence", "ISO Certified Centers"]}
      />

      <div className="container-max px-4 pt-20">
        {/* Search Bar Bar */}
        <div className="max-w-2xl mx-auto mb-20 px-4">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search for your district..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-border rounded-full py-5 px-10 pl-16 text-lg focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-semibold shadow-lg shadow-black/5"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={24} />
          </div>
        </div>

        {/* Grid Districts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
          {filteredDistricts.map((district, i) => (
            <motion.div
              layout
              key={district}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className="card-premium p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary/5 border hover:border-primary/20"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{district}</h3>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mt-1">Odisha</p>
              
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-primary text-[10px] font-bold flex items-center gap-1">
                  VIEW BRANCHES <ArrowRight size={10} />
                </span>
              </div>
            </motion.div>
          ))}
          
          {filteredDistricts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <Building2 className="mx-auto text-muted-foreground mb-4 opacity-20" size={64} />
              <p className="text-xl text-muted-foreground font-medium">No districts found matching your search.</p>
            </div>
          )}
        </div>
        
        {/* Bottom Section Sections */}
        <div className="mt-24 p-12 bg-foreground text-background rounded-[3rem] text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Can't Find a Branch Nearby?</h2>
            <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto italic">
              "We are rapidly expanding. You can also apply for a franchise and open an OICA branch in your locality."
            </p>
            <button className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
              Start Your Own Branch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branches;
