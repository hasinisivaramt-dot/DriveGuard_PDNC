import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function LoadingPage({ onFinish }) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress(Math.min(100, (video.currentTime / video.duration) * 100));
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", onFinish);

    // Autoplay muted so browsers allow it without a user gesture.
    video.play().catch(() => {
      // If autoplay is blocked, still let the user in after a short delay.
      const fallback = setTimeout(onFinish, 4000);
      return () => clearTimeout(fallback);
    });

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", onFinish);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src="/loading.mp4"
        muted
        playsInline
        autoPlay
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/70" />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-7 w-7 text-gold-400" strokeWidth={2.2} />
          <span className="font-display text-xl font-bold tracking-wide">
            DRIVEGUARD <span className="text-gold-400">AI</span>
          </span>
        </div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">
          Predict. Prevent. Protect.
        </p>

        <div className="mt-4 h-1 w-64 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-400 to-maroon-500 transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={onFinish}
          className="mt-6 text-xs font-medium uppercase tracking-widest text-white/50 transition hover:text-white"
        >
          Skip intro →
        </button>
      </div>
    </div>
  );
}
