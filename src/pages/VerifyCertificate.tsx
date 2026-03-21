import { motion } from 'framer-motion';
import { ShieldCheck, Search, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';

const VerifyCertificate = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
    }, 1500);
  };

  return (
    <div className="pb-24">
      <PageHeader 
        title="Verify Certificate"
        subtitle="Verification Portal"
        breadcrumb="Verify"
        description="Verify the authenticity of your OICA certificate instantly. Enter your details below to check the official registration status."
        backgroundImage="https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2030&auto=format&fit=crop"
        bottomPills={["Instant Verification", "Official Records", "ISO Validated"]}
      />

      <div className="container-max px-4 pt-24">
        <div className="max-w-xl mx-auto text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <p className="text-muted-foreground font-medium">
            Enter the roll number and issue date below to verify your OICA certificate.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card-premium p-10 shadow-2xl bg-white border-border">
            <form className="space-y-8" onSubmit={handleVerify}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Roll Number</label>
                  <div className="relative">
                    <input 
                      required
                      type="text" 
                      placeholder="Enter roll number (e.g. OICA/2026/001)" 
                      className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-lg" 
                    />
                    <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Issue Date</label>
                  <input 
                    required
                    type="date" 
                    className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none cursor-pointer" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg disabled:opacity-70 disabled:scale-100"
              >
                {loading ? "Verifying..." : "Verify Certificate"}
                {!loading && <ShieldCheck size={20} />}
              </button>
            </form>

            {verified && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-emerald-900 font-bold text-xl mb-1">Authentic Certificate</h4>
                  <p className="text-emerald-700 text-sm leading-relaxed">
                    This certificate is valid and is registered in our OICA database. You can proceed with using this for professional purposes.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="mt-8 flex items-start gap-3 p-6 bg-primary/5 rounded-2xl">
              <AlertCircle size={20} className="text-primary mt-0.5" />
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                If you face any issues with verification, please contact our help desk at info@oica.in or visit your nearest branch with the original certificate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle2 = ({ size }: { size: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>;

export default VerifyCertificate;
