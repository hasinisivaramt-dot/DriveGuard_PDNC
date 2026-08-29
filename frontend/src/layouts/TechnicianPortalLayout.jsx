import { useState } from "react";
import { Outlet } from "react-router-dom";
import TechnicianSidebar from "../components/portal/technician/Sidebar.jsx";
import TechnicianTopbar from "../components/portal/technician/Topbar.jsx";

export default function TechnicianPortalLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <TechnicianSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TechnicianTopbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
