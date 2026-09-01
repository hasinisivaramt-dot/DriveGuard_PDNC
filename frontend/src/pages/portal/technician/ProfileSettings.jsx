import { useState, useRef, useEffect } from "react";
import { UserCircle, CheckCircle2, Bell, Shield, Eye, EyeOff } from "lucide-react";

const INITIAL_PROFILE = {
  name:           "Ravi Kumar",
  role:           "Senior Technician",
  email:          "ravi.kumar@driveguard.in",
  phone:          "+91 98765 43210",
  employeeId:     "TEC-0042",
  department:     "Fleet Maintenance",
  specialization: "Engine & Powertrain",
  certifications: "ASE Certified, ISO 9001:2015",
  experience:     "9 years",
  joinDate:       "March 2016",
};

const INITIAL_NOTIFS = {
  criticalAlerts:  true,
  highRiskUpdates: true,
  workOrderUpdates: true,
  maintenanceDue:  true,
  dailySummary:    false,
  weeklyReport:    true,
};

function Section({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-blue-600" />
        <p className="text-[14px] font-bold text-neutral-900">{title}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, editable, onChange, type = "text" }) {
  return (
    <div>
      <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wide text-neutral-400">{label}</label>
      {editable ? (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] text-neutral-800 focus:border-blue-400 focus:outline-none" />
      ) : (
        <p className="rounded-lg bg-neutral-50 px-3 py-2 text-[13px] font-medium text-neutral-700">{value}</p>
      )}
    </div>
  );
}

export default function ProfileSettings() {
  const [profile, setProfile]       = useState({ ...INITIAL_PROFILE });
  const [notifs, setNotifs]         = useState({ ...INITIAL_NOTIFS });
  const [editMode, setEditMode]     = useState(false);
  const [showPw, setShowPw]         = useState(false);
  const [pw, setPw]                 = useState({ current: "", next: "", confirm: "" });
  const [saving, setSaving]         = useState(false);
  const [toast, setToast]           = useState(null);
  const [pwError, setPwError]       = useState("");
  const toastRef                    = useRef(null);

  useEffect(() => {
    if (!toast) return;
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(toastRef.current);
  }, [toast]);

  function field(key) {
    return {
      value: profile[key],
      onChange: (v) => setProfile((p) => ({ ...p, [key]: v })),
      editable: editMode,
    };
  }

  async function handleSaveProfile() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setEditMode(false);
    setToast("Profile updated successfully.");
  }

  async function handleSaveNotifs() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setToast("Notification preferences saved.");
  }

  async function handleChangePw() {
    if (!pw.current) { setPwError("Current password is required."); return; }
    if (pw.next.length < 8) { setPwError("New password must be at least 8 characters."); return; }
    if (pw.next !== pw.confirm) { setPwError("Passwords do not match."); return; }
    setPwError("");
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setPw({ current: "", next: "", confirm: "" });
    setToast("Password changed successfully.");
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <UserCircle className="h-5 w-5 text-blue-600" />
          <div>
            <h2 className="text-[18px] font-bold text-neutral-900">Profile Settings</h2>
            <p className="text-[13px] text-neutral-400">Manage your technician profile and preferences.</p>
          </div>
        </div>
        {!editMode ? (
          <button id="profile-edit-btn" onClick={() => setEditMode(true)}
            className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-[13px] font-semibold text-blue-700 hover:bg-blue-100">
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => { setEditMode(false); setProfile({ ...INITIAL_PROFILE }); }}
              className="rounded-lg border border-neutral-200 px-4 py-2 text-[13px] font-medium text-neutral-600 hover:bg-neutral-50">
              Cancel
            </button>
            <button id="profile-save-btn" onClick={handleSaveProfile} disabled={saving}
              className={`rounded-lg px-4 py-2 text-[13px] font-semibold text-white transition ${saving ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}>
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      {/* Profile identity card */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[28px] font-extrabold text-blue-600">
            {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <p className="text-[20px] font-extrabold text-neutral-900">{profile.name}</p>
            <p className="text-[13.5px] text-neutral-500">{profile.role} · {profile.department}</p>
            <p className="text-[12.5px] text-neutral-400">{profile.email}</p>
            <p className="mt-1 text-[11.5px] font-semibold text-blue-600">{profile.employeeId}</p>
          </div>
        </div>
      </div>

      {/* Personal info */}
      <Section title="Personal Information" icon={UserCircle}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name"   {...field("name")}   />
          <Field label="Email"       {...field("email")}  type="email" />
          <Field label="Phone"       {...field("phone")}  />
          <Field label="Employee ID" value={profile.employeeId} editable={false} onChange={() => {}} />
          <Field label="Specialization"  {...field("specialization")} />
          <Field label="Certifications"  {...field("certifications")} />
          <Field label="Experience"      value={profile.experience} editable={false} onChange={() => {}} />
          <Field label="Join Date"       value={profile.joinDate}   editable={false} onChange={() => {}} />
        </div>
      </Section>

      {/* Notification preferences */}
      <Section title="Notification Preferences" icon={Bell}>
        <div className="space-y-3">
          {[
            { key: "criticalAlerts",   label: "Critical risk alerts",              sub: "Immediate push for Critical-risk vehicles"    },
            { key: "highRiskUpdates",  label: "High-risk vehicle updates",         sub: "When vehicles move to High or Critical"        },
            { key: "workOrderUpdates", label: "Work order status changes",         sub: "When orders are created, updated or completed" },
            { key: "maintenanceDue",   label: "Maintenance task reminders",        sub: "Due Today & Overdue task notifications"        },
            { key: "dailySummary",     label: "Daily fleet summary",               sub: "Morning briefing email at 8:00 AM"             },
            { key: "weeklyReport",     label: "Weekly service report",             sub: "Compiled PDF every Monday at 9:00 AM"          },
          ].map(({ key, label, sub }) => (
            <div key={key} className="flex items-center justify-between gap-4 rounded-xl border border-neutral-100 px-4 py-3">
              <div>
                <p className="text-[13px] font-semibold text-neutral-800">{label}</p>
                <p className="text-[11.5px] text-neutral-400">{sub}</p>
              </div>
              <button id={`notif-${key}`}
                role="switch"
                aria-checked={!!notifs[key]}
                onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ${
                  notifs[key] ? "bg-blue-600" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                    notifs[key] ? "translate-x-[22px]" : "translate-x-[2px]"
                  }`}
                  style={{ marginTop: "2px" }}
                />
              </button>
            </div>
          ))}
        </div>
        <button id="save-notifs-btn" onClick={handleSaveNotifs} disabled={saving}
          className={`mt-4 rounded-lg px-4 py-2 text-[13px] font-semibold text-white transition ${saving ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}>
          {saving ? "Saving…" : "Save Preferences"}
        </button>
      </Section>

      {/* Password change */}
      <Section title="Change Password" icon={Shield}>
        <div className="max-w-sm space-y-3">
          {[
            { label: "Current Password", key: "current" },
            { label: "New Password",     key: "next"    },
            { label: "Confirm New",      key: "confirm" },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="mb-1 block text-[11.5px] font-semibold uppercase tracking-wide text-neutral-400">{label}</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={pw[key]}
                  onChange={(e) => { setPw((p) => ({ ...p, [key]: e.target.value })); setPwError(""); }}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 pr-10 text-[13px] focus:border-blue-400 focus:outline-none" />
                <button onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ))}
          {pwError && <p className="text-[11.5px] text-red-500">{pwError}</p>}
          <button id="change-pw-btn" onClick={handleChangePw} disabled={saving}
            className={`rounded-lg px-4 py-2 text-[13px] font-semibold text-white transition ${saving ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}>
            {saving ? "Updating…" : "Update Password"}
          </button>
        </div>
      </Section>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}
          className="flex max-w-sm items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-lg text-emerald-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-[13px] font-medium">{toast}</p>
          <button onClick={() => setToast(null)} className="ml-auto text-neutral-400 hover:text-neutral-600">×</button>
        </div>
      )}
    </div>
  );
}
