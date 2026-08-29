import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus, AlertCircle } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout.jsx";
import RoleSelector from "../../components/auth/RoleSelector.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { ROLES } from "../../lib/mockAuth.js";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState(ROLES.USER);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const session = register({ name, email, password, role });
      const dest =
        session.user.role === ROLES.USER
          ? "/portal/user/onboarding"
          : `/portal/${session.user.role}`;
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Choose your role to get the right portal and permissions."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-[12.5px] font-semibold text-neutral-700">
            I am registering as
          </label>
          <RoleSelector value={role} onChange={setRole} />
        </div>

        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-neutral-700">
            Full name
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-maroon-400">
            <User className="h-4 w-4 text-neutral-400" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Arjun Mehta"
              className="w-full text-[14px] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-neutral-700">
            Email
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-maroon-400">
            <Mail className="h-4 w-4 text-neutral-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full text-[14px] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-neutral-700">
            Password
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-maroon-400">
            <Lock className="h-4 w-4 text-neutral-400" />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full text-[14px] outline-none"
            />
          </div>
        </div>

        {error && (
          <p className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-[12.5px] font-medium text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-maroon-600 py-3 text-[14.5px] font-semibold text-white transition hover:bg-maroon-700 disabled:opacity-60"
        >
          <UserPlus className="h-4 w-4" /> Create Account
        </button>

        <p className="text-center text-[13px] text-neutral-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-maroon-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
