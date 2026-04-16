import React, { useRef, useState } from 'react';
import { Play, Pause, Maximize, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

interface SecureVideoPlayerProps {
  url: string;
  title?: string;
}

const SecureVideoPlayer: React.FC<SecureVideoPlayerProps> = ({ 
  url, 
  title
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  
  const getEmbedUrl = (url: string) => {
    if (!isYouTube) return url;
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  };

  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        toast.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const togglePlay = () => {
    if (isYouTube) return; // YouTube handles its own play/pause via iframe
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isYouTube) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative group bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-video select-none"
      onContextMenu={handleContextMenu}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {isYouTube ? (
        <iframe
          src={getEmbedUrl(url)}
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <video
          ref={videoRef}
          src={url}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          playsInline
          disablePictureInPicture
          controlsList="nodownload noremoteplayback"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Control Plate Overlay (Hidden for YT but useful for Title) */}
      <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 pointer-events-none ${showOverlay || (!isPlaying && !isYouTube) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col gap-3 pointer-events-auto">
          {!isYouTube && (
            <div className="h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer backdrop-blur-md">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!isYouTube && (
                <button onClick={togglePlay} className="text-white hover:text-primary transition-colors">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
              )}
              {title && <span className="text-white/80 text-[10px] font-black uppercase tracking-widest ml-2">{title}</span>}
            </div>

            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-2 py-1 bg-white/10 rounded-md border border-white/5 backdrop-blur-md">
                  <ShieldAlert size={12} className="text-primary" />
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">OICA Secure Node</span>
               </div>
               <button onClick={toggleFullScreen} className="text-white hover:text-primary transition-colors">
                 <Maximize size={20} />
               </button>
            </div>
          </div>
        </div>
      </div>

      {!isPlaying && !isYouTube && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
          <button 
            onClick={togglePlay}
            className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group/play"
          >
            <Play size={40} className="fill-white group-hover/play:scale-110" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SecureVideoPlayer;
