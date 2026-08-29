/**
 * Frontend-only auth store, backed by localStorage.
 *
 * This exists so the login/register/role-routing UX can be fully built and
 * demoed before the FastAPI + MongoDB + JWT backend exists (Phase 7-8 of
 * the roadmap). Nothing here is real security — passwords are stored in
 * plain text in the browser and "tokens" are random strings. When the real
 * backend lands, this file is the only thing that needs to be swapped out:
 * every call site only depends on the exported function signatures below
 * (register, login, getSession, logout, completeOnboarding), not on how
 * they're implemented.
 */

const USERS_KEY = "driveguard_users";
const SESSION_KEY = "driveguard_session";
const VEHICLE_PROFILE_KEY = "driveguard_vehicle_profile";

export const ROLES = {
  USER: "user",
  TECHNICIAN: "technician",
  ADMIN: "admin",
};

export const ROLE_LABELS = {
  [ROLES.USER]: "User / Car Owner",
  [ROLES.TECHNICIAN]: "Technician",
  [ROLES.ADMIN]: "Admin",
};

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function fakeToken() {
  return `mock.${Math.random().toString(36).slice(2)}.${Date.now()}`;
}

function toSessionUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    // Only the User/Car Owner role goes through the vehicle registration
    // wizard — other roles are considered "onboarded" immediately.
    onboardingComplete: user.role === ROLES.USER ? Boolean(user.onboardingComplete) : true,
  };
}

export function register({ name, email, password, role }) {
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("An account with that email already exists.");
  }
  const user = { id: crypto.randomUUID(), name, email, password, role, onboardingComplete: false };
  writeUsers([...users, user]);
  const session = { token: fakeToken(), user: toSessionUser(user) };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function login({ email, password, role }) {
  const users = readUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) {
    throw new Error("Invalid email or password.");
  }
  if (user.role !== role) {
    throw new Error(
      `That account is registered as ${ROLE_LABELS[user.role]}, not ${ROLE_LABELS[role]}.`
    );
  }
  const session = { token: fakeToken(), user: toSessionUser(user) };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

/** Marks the vehicle-registration wizard as complete for this user and
 * stores the collected vehicle profile (mock — real persistence is the
 * `vehicles` MongoDB collection, wired up in Phase 8). */
export function completeOnboarding(userId, vehicleProfile) {
  const users = readUsers();
  const updated = users.map((u) =>
    u.id === userId ? { ...u, onboardingComplete: true } : u
  );
  writeUsers(updated);

  if (vehicleProfile) {
    try {
      const all = JSON.parse(localStorage.getItem(VEHICLE_PROFILE_KEY)) || {};
      all[userId] = vehicleProfile;
      localStorage.setItem(VEHICLE_PROFILE_KEY, JSON.stringify(all));
    } catch {
      // non-critical — mock storage only
    }
  }

  const session = getSession();
  if (session && session.user.id === userId) {
    session.user.onboardingComplete = true;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return session;
}
