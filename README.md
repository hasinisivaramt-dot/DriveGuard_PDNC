# DriveGuard AI

Full-stack predictive-maintenance platform for vehicle sensor data —
failure probability, Remaining Useful Life (RUL), health score, risk
level, degradation trend, SHAP explanations, and maintenance
recommendations, served through three portals (User, Engineer, Admin).

## Status: frontend shell + auth + User portal dashboard

Built so far:
- Loading screen (plays the AI diagnostic video) → landing page
  matching the approved reference design, with a cursor-reactive 3D
  hero car
- Login / Register with three-way role selection (User/Car Owner,
  Technician, Admin) and role-based route protection
- First-time vehicle registration wizard: 10-step flow (Owner Details,
  Vehicle Information, Purchase Information, Current Condition,
  Maintenance History, Components Info, Sensor/IoT Information, Upload
  Sensor Data, Warnings & Symptoms, Review & Confirm) shown automatically
  after a new User/Car Owner registers, with real dropdowns, a custom
  calendar date picker, and number steppers — matching the approved
  reference design. Required-field validation, step navigation, and a
  route guard that redirects incomplete accounts back to the wizard are
  all working
- User / Car Owner portal — every sidebar section built out, not just
  the dashboard:
  - Dashboard: health, failure risk, RUL, alerts, health trend chart,
    per-vehicle health, key sensor snapshot, recent alerts, risk
    distribution donut, recent predictions table, maintenance
    recommendation — matches the approved reference design
  - My Vehicles: card grid of all registered vehicles with health/risk/RUL
  - Sensor Data: CSV upload + per-sensor trend charts + recent readings table
  - Predictions: current health/risk/RUL, history chart, and history table
  - Explainability (SHAP): feature-contribution chart with plain-language summary
  - Maintenance: AI recommendations + full service history
  - History: chronological activity timeline (predictions/alerts/maintenance), filterable
  - Alerts: full alert list, filterable by severity
  - Reports: downloadable report list
  - Settings: profile, notification preferences, change password
  - Reached automatically once the registration wizard is completed
- Technician portal: full fleet dashboard (fleet stat cards, fleet
  risk overview table, risk distribution donut, recent alerts, vehicle
  diagnostic details with selector + health degradation trend,
  recommended actions, active work orders) matching the approved
  reference design, with the same grouped sidebar and topbar search/
  notifications from the reference
- Admin portal: role-protected route shell with a "coming soon"
  placeholder, ready to be built out in Phase 9

Everything else (`backend/`, `ml/`, `data/`, `notebooks/`, `models/`,
`database/`) is scaffolded with placeholder READMEs describing what
lands there in later phases — nothing has been built or fabricated yet.

**Auth note:** login/register currently run on a frontend-only mock
(`frontend/src/lib/mockAuth.js`, backed by `localStorage`) so the
portals and role-routing could be fully built and demoed before the
real backend exists. It is clearly commented as a placeholder — when
the FastAPI + MongoDB + JWT backend is built (Phase 7-8), only that
one file needs to be swapped for real API calls; nothing else that
depends on `useAuth()` needs to change.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

Try it: register an account and pick a role — User/Car Owner lands on
the full dashboard, Technician/Admin land on their placeholder portals.
Registered accounts persist in your browser's localStorage.

To produce a production build:

```bash
npm run build   # outputs to frontend/dist
npm run preview # serve the production build locally
```

See `previews/` for screenshots of the landing page, register screen,
user dashboard, and technician portal placeholder.

## Roadmap (per the agreed development phases)

1. Dataset selection + EDA
2. Cleaning + preprocessing + feature engineering
3. Classical ML baselines (Linear Regression, Random Forest, Logistic
   Regression, Decision Tree, KNN, SVM)
4. ANN → LSTM → GRU
5. Multi-task prediction model (failure probability + RUL + health score)
6. SHAP + degradation/risk analysis
7. FastAPI backend
8. MongoDB integration
9. React portals/dashboards — Technician + Admin built out, real data
   wired into the User dashboard
10. Full integration + testing + evaluation

Each phase is validated before moving to the next — see `ml/README.md`,
`backend/README.md`, and `database/README.md` for what each will contain.
