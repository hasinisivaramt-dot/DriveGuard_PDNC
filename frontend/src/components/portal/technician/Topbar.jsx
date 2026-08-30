import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell, MessageSquare, ChevronDown, X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { allFleetVehicles } from "../../../data/mockTechnician.js";

// Mock notifications
const MOCK_NOTIFICATIONS = [
  { id: 1, title: "High Engine Temperature", body: "RJ 14 GH 3456 — temp 109°C", type: "error",   vin: "RJ 14 GH 3456" },
  { id: 2, title: "Vibration Level Rising",  body: "TN 09 IJ 6789 — 4.8 mm/s",  type: "warning", vin: "TN 09 IJ 6789" },
  { id: 3, title: "Oil Pressure Low",        body: "KA 03 CD 5678 — 24 psi",    type: "warning", vin: "KA 03 CD 5678" },
  { id: 4, title: "Battery Health Degrading",body: "DL 08 EF 9012 — 86%",       type: "info",    vin: "DL 08 EF 9012" },
  { id: 5, title: "Work Order Completed",    body: "WO-0007 marked complete",    type: "success", vin: null },
];

const MOCK_MESSAGES = [
  { id: 1, from: "Fleet Manager", body: "Please check the XUV 700 as soon as possible.", time: "10:32 AM" },
  { id: 2, from: "Depot Admin",   body: "Parts order for Coolant approved.",             time: "9:15 AM"  },
];

const TYPE_CLS = {
  error:   "bg-red-100 text-red-600",
  warning: "bg-amber-100 text-amber-600",
  info:    "bg-blue-100 text-blue-600",
  success: "bg-emerald-100 text-emerald-600",
};

export default function TechnicianTopbar({ onMenuClick, subtitle = "Monitor, analyze and take action for a healthier fleet." }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen]  = useState(false);
  const [notifOpen, setNotifOpen]      = useState(false);
  const [msgOpen, setMsgOpen]          = useState(false);
  const [searchQuery, setSearchQuery]  = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notifRead, setNotifRead]      = useState(new Set());
  const [msgRead, setMsgRead]          = useState(new Set());

  const notifRef   = useRef(null);
  const msgRef     = useRef(null);
  const profileRef = useRef(null);
  const searchRef  = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e) {
      if (notifRef.current && !notifRef.current.contains(e.target))   setNotifOpen(false);
      if (msgRef.current   && !msgRef.current.contains(e.target))     setMsgOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (searchRef.current  && !searchRef.current.contains(e.target))  setSearchResults([]);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Live vehicle search
  function handleSearch(q) {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    const lower = q.toLowerCase();
    const hits = allFleetVehicles.filter((v) =>
      v.id.toLowerCase().includes(lower) ||
      v.manufacturer.toLowerCase().includes(lower) ||
      v.model.toLowerCase().includes(lower) ||
      v.owner.toLowerCase().includes(lower)
    ).slice(0, 6);
    setSearchResults(hits);
  }

  function goToDiagnostics(vin) {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/portal/technician/diagnostics?vin=${encodeURIComponent(vin)}`);
  }

  const unreadNotifs = MOCK_NOTIFICATIONS.filter((n) => !notifRead.has(n.id)).length;
  const unreadMsgs   = MOCK_MESSAGES.filter((m) => !msgRead.has(m.id)).length;

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-3 border-b border-neutral-100 bg-white/95 px-4 backdrop-blur sm:px-6">
      {/* Left — hamburger + page title */}
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={onMenuClick} className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-50 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-[16px] font-bold text-neutral-900 sm:text-[18px]">
            Welcome, {user?.name?.split(" ")[0] ?? "Technician"}! 👋
          </h1>
          <p className="truncate text-[12.5px] text-neutral-400">{subtitle}</p>
        </div>
      </div>

      {/* Centre — live vehicle search */}
      <div className="relative hidden max-w-sm flex-1 lg:block" ref={searchRef}>
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 focus-within:border-blue-400">
          <Search className="h-4 w-4 shrink-0 text-neutral-400" />
          <input
            id="topbar-search"
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search vehicle, VIN or owner..."
            className="w-full text-[13px] outline-none"
          />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(""); setSearchResults([]); }}>
              <X className="h-3.5 w-3.5 text-neutral-400 hover:text-neutral-600" />
            </button>
          )}
        </div>
        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-1 rounded-xl border border-neutral-100 bg-white py-1.5 shadow-lg">
            {searchResults.map((v) => (
              <button
                key={v.id}
                onClick={() => goToDiagnostics(v.id)}
                className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-blue-50"
              >
                <div>
                  <p className="text-[13px] font-semibold text-neutral-900">{v.id}</p>
                  <p className="text-[11.5px] text-neutral-400">{v.manufacturer} {v.model} · {v.owner}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${
                  v.risk === "Critical" ? "bg-red-100 text-red-600"
                  : v.risk === "High"   ? "bg-amber-100 text-amber-600"
                  : "bg-emerald-100 text-emerald-600"
                }`}>{v.risk}</span>
              </button>
            ))}
          </div>
        )}
        {searchQuery && searchResults.length === 0 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-1 rounded-xl border border-neutral-100 bg-white px-4 py-3 shadow-lg">
            <p className="text-[12.5px] text-neutral-400">No vehicles found for "{searchQuery}".</p>
          </div>
        )}
      </div>

      {/* Right — bells, messages, profile */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            id="topbar-notif-btn"
            onClick={() => { setNotifOpen((v) => !v); setMsgOpen(false); setProfileOpen(false); }}
            className="relative rounded-full p-2 text-neutral-500 hover:bg-neutral-50"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifs > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {unreadNotifs}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full z-30 mt-1 w-80 rounded-xl border border-neutral-100 bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
                <p className="text-[13px] font-bold text-neutral-900">Notifications</p>
                <button
                  onClick={() => setNotifRead(new Set(MOCK_NOTIFICATIONS.map((n) => n.id)))}
                  className="text-[11.5px] text-blue-600 hover:underline"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto py-1.5">
                {MOCK_NOTIFICATIONS.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      setNotifRead((prev) => new Set([...prev, n.id]));
                      if (n.vin) { setNotifOpen(false); goToDiagnostics(n.vin); }
                    }}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-neutral-50 ${notifRead.has(n.id) ? "opacity-50" : ""}`}
                  >
                    <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${TYPE_CLS[n.type]}`} />
                    <div>
                      <p className="text-[12.5px] font-semibold text-neutral-900">{n.title}</p>
                      <p className="text-[11.5px] text-neutral-400">{n.body}</p>
                    </div>
                    {!notifRead.has(n.id) && (
                      <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="relative hidden sm:block" ref={msgRef}>
          <button
            id="topbar-msg-btn"
            onClick={() => { setMsgOpen((v) => !v); setNotifOpen(false); setProfileOpen(false); }}
            className="relative rounded-full p-2 text-neutral-500 hover:bg-neutral-50"
          >
            <MessageSquare className="h-5 w-5" />
            {unreadMsgs > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white">
                {unreadMsgs}
              </span>
            )}
          </button>
          {msgOpen && (
            <div className="absolute right-0 top-full z-30 mt-1 w-72 rounded-xl border border-neutral-100 bg-white shadow-lg">
              <div className="border-b border-neutral-100 px-4 py-3">
                <p className="text-[13px] font-bold text-neutral-900">Messages</p>
              </div>
              <div className="py-1.5">
                {MOCK_MESSAGES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMsgRead((prev) => new Set([...prev, m.id]))}
                    className={`flex w-full gap-3 px-4 py-3 text-left hover:bg-neutral-50 ${msgRead.has(m.id) ? "opacity-50" : ""}`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-700">
                      {m.from[0]}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-semibold text-neutral-900">{m.from}</p>
                      <p className="truncate text-[11.5px] text-neutral-400">{m.body}</p>
                      <p className="text-[10.5px] text-neutral-300">{m.time}</p>
                    </div>
                    {!msgRead.has(m.id) && (
                      <span className="ml-auto mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            id="topbar-profile-btn"
            onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); setMsgOpen(false); }}
            className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-neutral-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-[13px] font-bold text-blue-700">
              {user?.name?.[0]?.toUpperCase() ?? "T"}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-[13px] font-semibold leading-tight text-neutral-900">{user?.name}</span>
              <span className="block text-[11px] leading-tight text-neutral-400">Senior Technician</span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-neutral-400 sm:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full z-30 mt-1 w-48 rounded-xl border border-neutral-100 bg-white py-1.5 shadow-lg">
              <button
                onClick={() => { setProfileOpen(false); navigate("/portal/technician/profile"); }}
                className="block w-full px-4 py-2.5 text-left text-[13px] font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Profile Settings
              </button>
              <button
                onClick={() => { setProfileOpen(false); navigate("/portal/technician"); }}
                className="block w-full px-4 py-2.5 text-left text-[13px] font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Dashboard
              </button>
              <div className="my-1 border-t border-neutral-100" />
              <button
                onClick={logout}
                className="block w-full px-4 py-2.5 text-left text-[13px] font-medium text-red-500 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
