import { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { X, Download, Shield, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QRModalProps {
  user: {
    name: string;
    rollNo: string;
    email: string;
    course: string;
    branchId: string;
  };
  onClose: () => void;
}

const QRModal = ({ user, onClose }: QRModalProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrValue = JSON.stringify({
    oica: true,
    rollNo: user.rollNo,
    name: user.name,
    email: user.email,
    course: user.course,
    branch: user.branchId
  });

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    // Build a premium ID card canvas
    const output = document.createElement("canvas");
    output.width = 400;
    output.height = 520;
    const ctx = output.getContext("2d")!;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 520);
    grad.addColorStop(0, "#0F172A");
    grad.addColorStop(1, "#1E3A8A");
    ctx.fillStyle = grad;
    ctx.roundRect(0, 0, 400, 520, 20);
    ctx.fill();

    // Top sheen
    const sheen = ctx.createLinearGradient(0, 0, 0, 80);
    sheen.addColorStop(0, "rgba(255,255,255,0.15)");
    sheen.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen;
    ctx.roundRect(0, 0, 400, 260, 20);
    ctx.fill();

    // White QR panel
    ctx.fillStyle = "#ffffff";
    ctx.roundRect(70, 160, 260, 260, 16);
    ctx.fill();

    // Draw QR
    ctx.drawImage(canvas, 90, 175, 220, 220);

    // OICA Badge
    ctx.fillStyle = "#2563EB";
    ctx.roundRect(150, 30, 100, 28, 14);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("OICA CERTIFIED", 200, 49);

    // Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(user.name, 200, 95);

    // Roll No
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "bold 12px monospace";
    ctx.fillText(user.rollNo, 200, 118);

    // Course
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "11px sans-serif";
    ctx.fillText(user.course, 200, 140);

    // Bottom label
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "10px sans-serif";
    ctx.fillText("Odisha Institute of Computer Application", 200, 455);
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.font = "9px sans-serif";
    ctx.fillText("Scan QR for identity verification", 200, 475);

    const link = document.createElement("a");
    link.download = `OICA_ID_${user.rollNo.replace(/\//g, "-")}.png`;
    link.href = output.toDataURL("image/png");
    link.click();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-poppins"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", bounce: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm"
        >
          {/* Premium Header */}
          <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 px-8 pt-8 pb-16 text-white overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <X size={16} />
            </button>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-[9px] font-bold uppercase tracking-widest mb-4">
                <Shield size={10} /> OICA Verified ID
              </div>
              <h2 className="text-xl font-bold tracking-tight">{user.name}</h2>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">{user.rollNo}</p>
              <p className="text-white/40 text-[9px] mt-0.5">{user.course}</p>
            </div>
          </div>

          {/* QR Section */}
          <div className="relative flex justify-center -mt-10 pb-2 px-8">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4" ref={qrRef}>
              <QRCodeCanvas
                value={qrValue}
                size={180}
                level="H"
                imageSettings={{
                  src: "",
                  excavate: false,
                  width: 0,
                  height: 0
                }}
              />
            </div>
          </div>

          {/* Info & Download */}
          <div className="px-8 pb-8 pt-4 space-y-4">
            <div className="text-center">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Scan to Verify Identity</p>
              <p className="text-[10px] text-slate-500 mt-1">Used for attendance marking & campus access</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                <p className="text-[10px] font-bold text-slate-700 truncate">{user.email}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Course</p>
                <p className="text-[10px] font-bold text-slate-700">{user.course}</p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-lg shadow-blue-900/20 hover:from-blue-700 hover:to-indigo-800 transition-all active:scale-95"
            >
              <Download size={16} /> Download QR Card
            </button>
            <p className="text-center text-[8px] text-slate-400 font-medium">
              This QR is unique to your OICA enrollment. Keep it safe.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QRModal;
