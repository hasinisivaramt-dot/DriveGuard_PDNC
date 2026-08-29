import { useState } from "react";
import { Save } from "lucide-react";
import PageHeader from "../../../components/portal/PageHeader.jsx";
import ToggleSwitch from "../../../components/portal/ToggleSwitch.jsx";
import TextField from "../../../components/onboarding/fields/TextField.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");

  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifyWeekly, setNotifyWeekly] = useState(true);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  return (
    <div className="max-w-2xl">
      <PageHeader title="Settings" subtitle="Manage your profile, notifications, and account security." />

      <div className="space-y-4">
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <h3 className="text-[14.5px] font-bold text-neutral-900">Profile</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Full Name" value={name} onChange={setName} />
            <TextField label="Email Address" type="email" value={email} onChange={setEmail} />
            <TextField label="Phone Number" type="tel" value={phone} onChange={setPhone} placeholder="e.g., +91 98765 43210" />
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <h3 className="text-[14.5px] font-bold text-neutral-900">Notification Preferences</h3>
          <div className="mt-1 divide-y divide-neutral-100">
            <ToggleSwitch
              label="Email Alerts"
              description="Get notified by email for high-priority alerts"
              checked={notifyEmail}
              onChange={setNotifyEmail}
            />
            <ToggleSwitch
              label="SMS Alerts"
              description="Get a text message for critical failure risk"
              checked={notifySms}
              onChange={setNotifySms}
            />
            <ToggleSwitch
              label="Push Notifications"
              description="Real-time alerts on this device"
              checked={notifyPush}
              onChange={setNotifyPush}
            />
            <ToggleSwitch
              label="Weekly Health Summary"
              description="A digest of all your vehicles every Monday"
              checked={notifyWeekly}
              onChange={setNotifyWeekly}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <h3 className="text-[14.5px] font-bold text-neutral-900">Change Password</h3>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <TextField label="Current Password" type="password" value={currentPw} onChange={setCurrentPw} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="New Password" type="password" value={newPw} onChange={setNewPw} />
              <TextField label="Confirm New Password" type="password" value={confirmPw} onChange={setConfirmPw} />
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-[13.5px] font-semibold text-white hover:bg-blue-700">
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}
