import { ShieldCheck, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "How It Works", "Pricing", "Integrations", "Updates"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Privacy Policy", "Terms of Service"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Documentation", "FAQs"],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-neutral-100 bg-white pt-16">
      <div className="container-page grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-maroon-600" />
            <div>
              <p className="font-display text-[15px] font-bold text-neutral-900">
                DRIVEGUARD <span className="text-gold-500">AI</span>
              </p>
              <p className="text-[10.5px] font-medium text-neutral-400">
                Predict. Prevent. Protect.
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-neutral-500">
            AI-powered predictive maintenance solution to keep your vehicles
            healthy, efficient, and road-ready.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-maroon-300 hover:text-maroon-600"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-[13px] font-bold text-neutral-900">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[13px] text-neutral-500 transition hover:text-maroon-600"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-[13px] font-bold text-neutral-900">Newsletter</p>
          <p className="mt-4 text-[13px] leading-relaxed text-neutral-500">
            Stay updated with the latest news and product updates.
          </p>
          <form className="mt-4 flex overflow-hidden rounded-lg border border-neutral-200">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-[13px] outline-none"
            />
            <button
              type="submit"
              className="whitespace-nowrap bg-maroon-600 px-4 text-[13px] font-semibold text-white transition hover:bg-maroon-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-neutral-100 py-5 text-center text-[12px] text-neutral-400">
        © {new Date().getFullYear()} DriveGuard AI. All rights reserved.
      </div>
    </footer>
  );
}
