import { useState } from "react";
import { Menu, Search, Bell, MessageSquare, ChevronDown } from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function TechnicianTopbar({ onMenuClick, subtitle = "Monitor, analyze and take action for a healthier fleet." }) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-3 border-b border-neutral-100 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-50 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-[16px] font-bold text-neutral-900 sm:text-[18px]">
            Welcome, Technician! 👋
          </h1>
          <p className="truncate text-[12.5px] text-neutral-400">{subtitle}</p>
        </div>
      </div>

      <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 lg:flex">
        <Search className="h-4 w-4 shrink-0 text-neutral-400" />
        <input
          type="text"
          placeholder="Search vehicle, VIN or owner..."
          className="w-full text-[13px] outline-none"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button className="relative rounded-full p-2 text-neutral-500 hover:bg-neutral-50">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            5
          </span>
        </button>
        <button className="relative hidden rounded-full p-2 text-neutral-500 hover:bg-neutral-50 sm:block">
          <MessageSquare className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white">
            2
          </span>
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-neutral-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-[13px] font-bold text-blue-700">
              {user?.name?.[0]?.toUpperCase() ?? "T"}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-[13px] font-semibold leading-tight text-neutral-900">
                {user?.name}
              </span>
              <span className="block text-[11px] leading-tight text-neutral-400">
                Senior Technician
              </span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-neutral-400 sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
