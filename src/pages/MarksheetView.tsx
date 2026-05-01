import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useEffect } from 'react';

const MarksheetView = () => {
  const { id } = useParams();

  // In a real application, you'd fetch the marksheet details based on the roll number (id)
  const marksheetDetails = {
    name: "ASHUTOSH BRAHMA",
    rollNo: id || "OICA/ROLL/2026/001",
    registrationNo: "REG-2026-98765",
    course: "Post Graduate Diploma in Computer Application (PGDCA)",
    session: "2025-2026",
    issueDate: "March 20, 2026",
    subjects: [
      { code: "PG-101", name: "Computer Fundamentals", max: 100, min: 40, obtained: 85 },
      { code: "PG-102", name: "Operating Systems", max: 100, min: 40, obtained: 78 },
      { code: "PG-103", name: "Programming in C", max: 100, min: 40, obtained: 92 },
      { code: "PG-104", name: "Database Management", max: 100, min: 40, obtained: 88 },
      { code: "PG-105", name: "Web Technologies", max: 100, min: 40, obtained: 95 },
      { code: "PG-106", name: "Practical / Lab Work", max: 100, min: 40, obtained: 98 },
    ]
  };

  const totalMax = marksheetDetails.subjects.reduce((sum, sub) => sum + sub.max, 0);
  const totalObtained = marksheetDetails.subjects.reduce((sum, sub) => sum + sub.obtained, 0);
  const percentage = ((totalObtained / totalMax) * 100).toFixed(2);
  const division = percentage >= "60" ? "First Class" : percentage >= "50" ? "Second Class" : "Pass";

  useEffect(() => {
    // Optional: Auto trigger print
  }, []);

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 md:p-8 font-serif print:p-0 print:bg-white overflow-hidden">
      
      {/* Floating Action Buttons (Hidden on Print) */}
      <div className="fixed top-6 right-6 flex gap-4 z-50 print:hidden no-print">
        <Button 
          onClick={() => window.print()} 
          className="bg-slate-900 text-white shadow-xl hover:bg-slate-800 rounded-full px-6 h-12 flex items-center gap-2 font-sans font-bold tracking-widest uppercase text-xs"
        >
          <Printer size={16} /> Print Marksheet
        </Button>
      </div>

      {/* Marksheet Container (A4 Portrait) */}
      <div className="w-[794px] h-[1123px] bg-white shadow-2xl relative flex flex-col items-center print:shadow-none print:w-[210mm] print:h-[297mm] print:m-0 box-border overflow-hidden marksheet-wrapper scale-[0.6] sm:scale-[0.8] md:scale-100 origin-top">
        
        {/* Outer Border */}
        <div className="absolute inset-4 border-[8px] border-double border-slate-800 p-1">
           <div className="absolute inset-1 border border-solid border-slate-800" />
        </div>

        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <img src="/logo.jpg" alt="Watermark" className="w-[400px] h-auto grayscale" />
        </div>

        <div className="relative z-10 w-full px-16 py-14 flex flex-col h-full">
          
          {/* Header */}
          <div className="flex flex-col items-center gap-3 border-b-2 border-slate-800 pb-6 mb-6">
            <img src="/logo.jpg" alt="OICA Logo" className="h-20 w-auto object-contain" />
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-widest mt-2 text-center" style={{ fontFamily: 'Times New Roman, serif' }}>
              Odisha Institute of Computer Application
            </h1>
            <p className="text-xs tracking-widest text-slate-700 font-bold uppercase">
              An ISO 9001:2008 Certified Institution
            </p>
            <div className="mt-4 px-6 py-2 bg-slate-100 border border-slate-300">
               <h2 className="text-xl font-bold tracking-widest uppercase">Statement of Marks</h2>
            </div>
          </div>

          {/* Student Details */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 text-sm">
            <div className="flex">
               <span className="font-bold w-36 uppercase text-slate-600 tracking-wider">Candidate Name:</span>
               <span className="font-black border-b border-dashed border-slate-400 flex-1 pl-2">{marksheetDetails.name}</span>
            </div>
            <div className="flex">
               <span className="font-bold w-36 uppercase text-slate-600 tracking-wider">Roll Number:</span>
               <span className="font-black border-b border-dashed border-slate-400 flex-1 pl-2">{marksheetDetails.rollNo}</span>
            </div>
            <div className="flex">
               <span className="font-bold w-36 uppercase text-slate-600 tracking-wider">Registration:</span>
               <span className="font-black border-b border-dashed border-slate-400 flex-1 pl-2">{marksheetDetails.registrationNo}</span>
            </div>
            <div className="flex">
               <span className="font-bold w-36 uppercase text-slate-600 tracking-wider">Session:</span>
               <span className="font-black border-b border-dashed border-slate-400 flex-1 pl-2">{marksheetDetails.session}</span>
            </div>
            <div className="flex col-span-2">
               <span className="font-bold w-36 uppercase text-slate-600 tracking-wider">Course:</span>
               <span className="font-black border-b border-dashed border-slate-400 flex-1 pl-2">{marksheetDetails.course}</span>
            </div>
          </div>

          {/* Marks Table */}
          <div className="w-full flex-1">
             <table className="w-full border-collapse border-2 border-slate-800 text-sm">
                <thead>
                   <tr className="bg-slate-100">
                      <th className="border-2 border-slate-800 px-4 py-3 text-left w-24">Code</th>
                      <th className="border-2 border-slate-800 px-4 py-3 text-left">Subject / Paper</th>
                      <th className="border-2 border-slate-800 px-4 py-3 text-center w-24">Max Marks</th>
                      <th className="border-2 border-slate-800 px-4 py-3 text-center w-24">Min Marks</th>
                      <th className="border-2 border-slate-800 px-4 py-3 text-center w-28">Marks Obtained</th>
                   </tr>
                </thead>
                <tbody>
                   {marksheetDetails.subjects.map((sub, index) => (
                      <tr key={index}>
                         <td className="border border-slate-800 px-4 py-3 font-bold">{sub.code}</td>
                         <td className="border border-slate-800 px-4 py-3">{sub.name}</td>
                         <td className="border border-slate-800 px-4 py-3 text-center">{sub.max}</td>
                         <td className="border border-slate-800 px-4 py-3 text-center">{sub.min}</td>
                         <td className="border border-slate-800 px-4 py-3 text-center font-black">{sub.obtained}</td>
                      </tr>
                   ))}
                </tbody>
                <tfoot>
                   <tr className="bg-slate-50 font-black">
                      <td colSpan={2} className="border-2 border-slate-800 px-4 py-4 text-right tracking-widest uppercase">Grand Total</td>
                      <td className="border-2 border-slate-800 px-4 py-4 text-center text-base">{totalMax}</td>
                      <td className="border-2 border-slate-800 px-4 py-4 text-center text-base">-</td>
                      <td className="border-2 border-slate-800 px-4 py-4 text-center text-base">{totalObtained}</td>
                   </tr>
                </tfoot>
             </table>

             {/* Results Summary */}
             <div className="flex justify-between items-center mt-6 border-2 border-slate-800 p-4 bg-slate-50">
                <div className="text-sm">
                   <span className="font-bold text-slate-600 uppercase tracking-widest mr-2">Percentage:</span>
                   <span className="font-black text-lg">{percentage}%</span>
                </div>
                <div className="text-sm">
                   <span className="font-bold text-slate-600 uppercase tracking-widest mr-2">Result/Division:</span>
                   <span className="font-black text-lg uppercase tracking-widest text-slate-900">{division}</span>
                </div>
             </div>
          </div>

          {/* Signatures */}
          <div className="flex justify-between items-end mt-16 px-4">
             <div className="flex flex-col items-start text-left">
                <p className="text-xs font-bold uppercase tracking-wider mb-8">Date: {marksheetDetails.issueDate}</p>
                <div className="w-40 border-b border-slate-800 mb-2"></div>
                <p className="text-xs font-bold uppercase tracking-widest">Prepared By</p>
             </div>

             <div className="flex flex-col items-center">
                <div className="w-48 border-b border-slate-800 mb-2"></div>
                <p className="text-xs font-bold uppercase tracking-widest">Controller of Examinations</p>
             </div>

             <div className="flex flex-col items-end text-right">
                <div className="w-48 border-b border-slate-800 mb-2"></div>
                <p className="text-xs font-bold uppercase tracking-widest">Director / Principal</p>
             </div>
          </div>

        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
          .marksheet-wrapper {
            transform: scale(1) !important;
            width: 210mm !important;
            height: 297mm !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MarksheetView;
