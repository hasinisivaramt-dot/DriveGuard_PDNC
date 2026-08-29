import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Radio, Cpu, ShieldCheck } from "lucide-react";
import Car3D from "./Car3D.jsx";
import HeroWidgets from "./HeroWidgets.jsx";

const BADGES = [
  { icon: Radio, label: "Real-time Sensor Monitoring" },
  { icon: Cpu, label: "AI-Powered Predictions" },
  { icon: ShieldCheck, label: "Secure & Reliable" },
];

const MAX_TILT = 14; // degrees

export default function Hero() {
  const stageRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 -> 1
    const py = (e.clientY - rect.top) / rect.height;

    // rotateX responds to vertical cursor position, rotateY to horizontal
    const rotateY = (px - 0.5) * 2 * MAX_TILT;
    const rotateX = -(py - 0.5) * 2 * MAX_TILT;
    setTilt({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div className="container-page grid items-start gap-10 py-14 lg:grid-cols-2 lg:py-20">
        {/* left column is vertically centered against the shorter of the two columns via self-center */}
        {/* left column: copy */}
        <div className="lg:self-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-[12px] font-semibold text-gold-700">
            ✦ AI-Powered Vehicle Health Monitoring
          </span>

          <h1 className="mt-5 text-[42px] font-extrabold leading-[1.08] tracking-tight text-neutral-900 sm:text-[52px]">
            Drive Smarter.
            <br />
            Stay <span className="text-maroon-600">Ahead.</span>
          </h1>

          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-neutral-500">
            DriveGuard AI uses advanced machine learning and real-time sensor
            analytics to predict vehicle failures, estimate remaining useful
            life, and recommend timely maintenance.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className="flex items-center gap-2 rounded-lg bg-maroon-600 px-6 py-3 text-[14.5px] font-semibold text-white shadow-card transition hover:bg-maroon-700">
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#features" className="flex items-center gap-2 rounded-lg border border-neutral-200 px-6 py-3 text-[14.5px] font-semibold text-neutral-700 transition hover:border-maroon-300 hover:text-maroon-600">
              Explore Features <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 text-[12.5px] font-medium text-neutral-500"
              >
                <Icon className="h-4 w-4 text-maroon-500" /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* right column: floating widgets stacked above the 3D car */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <div className="ml-auto hidden w-full max-w-[440px] sm:block">
            <HeroWidgets />
          </div>
          <Car3D rotateX={tilt.x} rotateY={tilt.y} translateZ={10} />
        </div>
      </div>

      {/* widgets stack under the car on small screens */}
      <div className="container-page pb-10 sm:hidden">
        <HeroWidgets />
      </div>
    </section>
  );
}
