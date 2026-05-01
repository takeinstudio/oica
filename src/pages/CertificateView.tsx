import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useEffect } from 'react';

const CertificateView = () => {
  const { id } = useParams();

  // In a real app, you'd fetch the certificate details using the ID
  const certDetails = {
    name: "ASHUTOSH BRAHMA",
    certNo: id || "OICA/2026/001",
    course: "Post Graduate Diploma in Computer Application (PGDCA)",
    grade: "A+ DISTINCTION",
    campus: "MAIN CAMPUS, BBSR",
    date: "March 15, 2026",
    signatureId: "SIGNED_KEY_" + Math.random().toString(36).substring(7).toUpperCase()
  };

  useEffect(() => {
    // Optional: Auto-trigger print when it loads or just let user click
  }, []);

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 md:p-8 font-serif print:p-0 print:bg-white overflow-hidden">
      
      {/* Floating Action Buttons (Hidden on Print) */}
      <div className="fixed top-6 right-6 flex gap-4 z-50 print:hidden no-print">
        <Button 
          onClick={() => window.print()} 
          className="bg-slate-900 text-white shadow-xl hover:bg-slate-800 rounded-full px-6 h-12 flex items-center gap-2 font-sans font-bold tracking-widest uppercase text-xs"
        >
          <Printer size={16} /> Print Certificate
        </Button>
      </div>

      {/* Certificate Container */}
      <div className="w-[1122px] h-[793px] bg-white shadow-2xl relative flex flex-col items-center justify-center print:shadow-none print:w-[297mm] print:h-[210mm] print:m-0 box-border overflow-hidden certificate-wrapper scale-[0.6] sm:scale-[0.8] md:scale-100 origin-top">
        
        {/* Outer Border */}
        <div className="absolute inset-4 border-[12px] border-double border-slate-800 p-2">
           {/* Inner Border */}
           <div className="absolute inset-2 border-[3px] border-solid border-slate-800" />
        </div>

        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <img src="/logo.jpg" alt="Watermark" className="w-[500px] h-auto grayscale" />
        </div>

        {/* Corner Ornaments */}
        <div className="absolute top-10 left-10 w-16 h-16 border-t-4 border-l-4 border-yellow-600 rounded-tl-xl" />
        <div className="absolute top-10 right-10 w-16 h-16 border-t-4 border-r-4 border-yellow-600 rounded-tr-xl" />
        <div className="absolute bottom-10 left-10 w-16 h-16 border-b-4 border-l-4 border-yellow-600 rounded-bl-xl" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-b-4 border-r-4 border-yellow-600 rounded-br-xl" />

        {/* Certificate Content */}
        <div className="relative z-10 flex flex-col items-center text-center w-full px-24 py-16 h-full justify-between">
          
          {/* Header */}
          <div className="flex flex-col items-center gap-4">
            <img src="/logo.jpg" alt="OICA Logo" className="h-24 w-auto object-contain" />
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-widest mt-4" style={{ fontFamily: 'Times New Roman, serif' }}>
              Odisha Institute of Computer Application
            </h1>
            <p className="text-sm tracking-[0.3em] text-slate-600 font-bold uppercase">
              An ISO 9001:2008 Certified Institution
            </p>
          </div>

          {/* Title */}
          <div className="my-6">
            <h2 className="text-5xl font-black text-yellow-700 tracking-wider uppercase border-y-2 border-yellow-700/30 py-4" style={{ fontFamily: 'Times New Roman, serif' }}>
              Certificate of Excellence
            </h2>
          </div>

          {/* Body */}
          <div className="space-y-6 flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
            <p className="text-xl text-slate-700 italic">This is to proudly certify that</p>
            
            <h3 className="text-5xl font-bold text-slate-900 border-b border-slate-300 pb-2 inline-block px-12" style={{ fontFamily: 'Georgia, serif' }}>
              {certDetails.name}
            </h3>

            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
              has successfully completed the comprehensive program in <br/>
              <span className="font-bold text-2xl text-slate-900 mt-2 inline-block">{certDetails.course}</span><br/>
              with an outstanding performance and is awarded the grade of <span className="font-bold text-slate-900">{certDetails.grade}</span>.
            </p>
          </div>

          {/* Details & Signatures */}
          <div className="w-full flex justify-between items-end mt-8 px-12 relative">
             <div className="flex flex-col items-start text-left space-y-1">
                <p className="text-sm text-slate-600 font-bold uppercase tracking-wider">Certificate No: <span className="text-slate-900">{certDetails.certNo}</span></p>
                <p className="text-sm text-slate-600 font-bold uppercase tracking-wider">Date of Issue: <span className="text-slate-900">{certDetails.date}</span></p>
                <p className="text-sm text-slate-600 font-bold uppercase tracking-wider">Campus: <span className="text-slate-900">{certDetails.campus}</span></p>
             </div>

             {/* Seal placeholder */}
             <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-yellow-600 flex items-center justify-center opacity-80">
                <div className="text-center">
                   <p className="text-[10px] font-black uppercase text-yellow-700 tracking-widest">Official Seal</p>
                   <p className="text-[8px] font-bold text-yellow-700 mt-1">OICA</p>
                </div>
             </div>

             <div className="flex flex-col items-center">
                <div className="w-48 border-b-2 border-slate-800 mb-2"></div>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-800">Director / Principal</p>
                <p className="text-[10px] text-slate-500 tracking-wider mt-1">Authorized Signatory</p>
             </div>
          </div>

        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
          .certificate-wrapper {
            transform: scale(1) !important;
            width: 297mm !important;
            height: 210mm !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CertificateView;
