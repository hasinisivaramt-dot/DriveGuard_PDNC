import { Menu, Calendar, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Topbar({ onMenuClick, subtitle = "Here's the health overview of your vehicles." }) {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayTimeStr = now.toLocaleDateString("en-US", { weekday: "long" }) +
    ", " +
    now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-4 border-b border-neutral-100 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-50 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-[16px] font-bold text-neutral-900 sm:text-[18px]">
            Welcome, {user?.name ?? firstName}! 👋
          </h1>
          <p className="truncate text-[12.5px] text-neutral-400">{subtitle}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="hidden items-center gap-2 text-right sm:flex">
          <Calendar className="h-4 w-4 text-neutral-400" />
          <div>
            <p className="text-[12.5px] font-semibold text-neutral-700">{dateStr}</p>
            <p className="text-[11px] text-neutral-400">{dayTimeStr}</p>
          </div>
        </div>
        <button className="relative rounded-full p-2 text-neutral-500 hover:bg-neutral-50">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            3
          </span>
        </button>
      </div>
    </header>
  );
}
