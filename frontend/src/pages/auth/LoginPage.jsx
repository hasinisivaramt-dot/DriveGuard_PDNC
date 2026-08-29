import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout.jsx";
import RoleSelector from "../../components/auth/RoleSelector.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { ROLES } from "../../lib/mockAuth.js";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState(ROLES.USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const session = login({ email, password, role });
      const redirectTo = location.state?.from?.pathname || `/portal/${session.user.role}`;
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your DriveGuard AI portal."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-[12.5px] font-semibold text-neutral-700">
            I am signing in as
          </label>
          <RoleSelector value={role} onChange={setRole} />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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
          <LogIn className="h-4 w-4" /> Sign In
        </button>

        <p className="text-center text-[13px] text-neutral-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-maroon-600 hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
