import React, { useState } from 'react';
import { FileText, ShieldCheck, Download, Printer, ZoomIn, ZoomOut, AlertTriangle } from 'lucide-react';

interface SecurePdfViewerProps {
  url: string;
  title: string;
}

const SecurePdfViewer: React.FC<SecurePdfViewerProps> = ({ url, title }) => {
  const [zoom, setZoom] = useState(100);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-xl" onContextMenu={handleContextMenu}>
      {/* Viewer Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-white/10">
            <FileText size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-black text-sm uppercase tracking-tight">{title}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <ShieldCheck size={10} className="text-emerald-400" />
              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">OICA Secure Resource</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 border border-white/5">
          <button 
            onClick={() => setZoom(prev => Math.max(50, prev - 10))}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
          >
            <ZoomOut size={14} />
          </button>
          <span className="text-[10px] font-bold w-12 text-center">{zoom}%</span>
          <button 
            onClick={() => setZoom(prev => Math.min(200, prev + 10))}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
          >
            <ZoomIn size={14} />
          </button>
        </div>

        <div className="flex items-center gap-3 border-l border-white/10 pl-6 ml-3">
          <div className="flex flex-col items-end opacity-40 cursor-not-allowed group">
             <div className="flex items-center gap-2">
                <Download size={14} className="group-hover:text-rose-400" />
                <Printer size={14} className="group-hover:text-rose-400" />
             </div>
             <span className="text-[7px] font-black uppercase tracking-tighter mt-1">Actions Disabled</span>
          </div>
        </div>
      </div>

      {/* Security Warning Bar */}
      <div className="bg-amber-50 border-b border-amber-100 px-6 py-2 flex items-center gap-2">
        <AlertTriangle size={12} className="text-amber-500" />
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">
            This document is protected. Screenshots and print attempts are logged against your student ID.
        </span>
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-200/50 relative">
        {/* Anti-copy Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] select-none flex flex-wrap gap-20 p-20 content-start justify-center rotate-[-25deg]">
            {Array.from({ length: 40 }).map((_, i) => (
                <span key={i} className="text-4xl font-black">{title.toUpperCase()} • OICA SECURITY</span>
            ))}
        </div>

        <div 
          className="bg-white shadow-2xl origin-top transition-transform duration-300 min-h-[1000px] w-full max-w-4xl p-12 border border-slate-200"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* Simulated PDF Content Wrapper */}
          <div className="prose prose-slate max-w-none">
             <iframe 
               src={`${url}#toolbar=0&navpanes=0&scrollbar=0`} 
               className="w-full h-[800px] border-none"
               title="Secure PDF Content"
             />
          </div>
        </div>
      </div>

      {/* Interaction Blockers */}
      <style>{`
        @media print {
          body { display: none !important; }
        }
        .no-select {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default SecurePdfViewer;
