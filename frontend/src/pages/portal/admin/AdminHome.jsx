import { useAuth } from "../../../context/AuthContext.jsx";
import ComingSoon from "../ComingSoon.jsx";

export default function AdminHome() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-neutral-900">
            Admin Portal — Welcome, {user?.name}
          </h1>
          <p className="text-[13px] text-neutral-500">
            User/vehicle management, system statistics, and model performance build out in Phase 9.
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-lg border border-neutral-200 px-4 py-2 text-[13px] font-semibold text-neutral-600 hover:bg-neutral-50"
        >
          Log out
        </button>
      </div>
      <ComingSoon
        title="Admin Dashboard"
        phaseNote="User/vehicle management, system statistics, prediction monitoring, and model/version performance land here in Phase 9 — same portal shell, once the User portal is confirmed."
      />
    </div>
  );
}
