import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, LogIn, ArrowRight, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <div className="container-page flex h-[72px] items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5">
          <ShieldCheck className="h-8 w-8 text-maroon-600" strokeWidth={2} />
          <div className="leading-tight">
            <p className="font-display text-[17px] font-bold tracking-tight text-neutral-900">
              DRIVEGUARD <span className="text-gold-500">AI</span>
            </p>
            <p className="text-[11px] font-medium tracking-wide text-neutral-400">
              Predict. Prevent. Protect.
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative text-[14.5px] font-medium transition-colors ${
                i === 0
                  ? "text-maroon-600"
                  : "text-neutral-600 hover:text-maroon-600"
              }`}
            >
              {link.label}
              {i === 0 && (
                <span className="absolute -bottom-[26px] left-0 h-[2px] w-full bg-maroon-600" />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login" className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-4 py-2 text-[14px] font-semibold text-neutral-700 transition hover:border-maroon-300 hover:text-maroon-600">
            <LogIn className="h-4 w-4" /> Login
          </Link>
          <Link to="/register" className="flex items-center gap-1.5 rounded-lg bg-maroon-600 px-4 py-2 text-[14px] font-semibold text-white shadow-card transition hover:bg-maroon-700">
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-100 px-6 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-1.5 text-[15px] font-medium text-neutral-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex gap-3">
            <Link to="/login" onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-neutral-200 py-2 text-center text-sm font-semibold text-neutral-700">
              Login
            </Link>
            <Link to="/register" onClick={() => setOpen(false)} className="flex-1 rounded-lg bg-maroon-600 py-2 text-center text-sm font-semibold text-white">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
