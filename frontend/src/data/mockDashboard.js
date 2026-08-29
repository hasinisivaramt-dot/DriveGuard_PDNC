// Placeholder data shaped like the future API responses (see
// backend/README.md — predictions, vehicles, sensor_readings collections).
// Nothing here is a real experimental result; swap this module for API
// calls once the FastAPI endpoints exist (Phase 7-9).

export const stats = {
  overallHealth: { value: 78, label: "Good", change: "+6% vs last week", up: true },
  failureRisk: { value: 14, label: "Low Risk", change: "-3% vs last week", up: false },
  remainingLife: { value: "1,240", unit: "km", label: "Est. RUL" },
  activeAlerts: { value: 2, label: "High Priority" },
};

export const healthTrend = [
  { day: "May 22", value: 82 },
  { day: "May 23", value: 90 },
  { day: "May 24", value: 78 },
  { day: "May 25", value: 84 },
  { day: "May 26", value: 87 },
  { day: "May 27", value: 79 },
  { day: "May 28", value: 86 },
];

export const vehicles = [
  { id: "MH 01 AB 1234", type: "Sedan", health: 82, status: "Good" },
  { id: "KA 03 CD 5678", type: "SUV", health: 65, status: "Moderate" },
  { id: "DL 08 EF 9012", type: "Hatchback", health: 76, status: "Good" },
  { id: "GJ 05 GH 3456", type: "Sedan", health: 42, status: "High Risk" },
];

export const sensorSnapshot = [
  { key: "engineTemp", label: "Engine Temp", value: "92°C", trend: [40, 55, 45, 60, 50, 65, 58], color: "#ef4444" },
  { key: "vibration", label: "Vibration", value: "2.3 mm/s", trend: [30, 40, 35, 50, 42, 48, 44], color: "#f59e0b" },
  { key: "oilPressure", label: "Oil Pressure", value: "45 psi", trend: [50, 45, 55, 48, 52, 46, 50], color: "#22c55e" },
  { key: "batteryHealth", label: "Battery Health", value: "89%", trend: [60, 62, 58, 65, 63, 68, 66], color: "#22c55e" },
  { key: "rpm", label: "RPM", value: "2,450 rpm", trend: [45, 50, 48, 55, 52, 58, 54], color: "#22c55e" },
];

export const recentAlerts = [
  {
    id: 1,
    title: "High Engine Temperature",
    vehicle: "MH 01 AB 1234",
    datetime: "May 28, 2025 · 10:30 AM",
    severity: "High",
  },
  {
    id: 2,
    title: "Vibration Level Rising",
    vehicle: "KA 03 CD 5678",
    datetime: "May 28, 2025 · 09:15 AM",
    severity: "Medium",
  },
];

export const riskDistribution = [
  { label: "Low Risk", count: 22, pct: 55, color: "#22c55e" },
  { label: "Moderate Risk", count: 12, pct: 30, color: "#f59e0b" },
  { label: "High Risk", count: 6, pct: 15, color: "#ef4444" },
];

export const recentPredictions = [
  { vehicle: "MH 01 AB 1234", health: 82, failureRisk: 12, rul: 1450, risk: "Low" },
  { vehicle: "KA 03 CD 5678", health: 65, failureRisk: 24, rul: 890, risk: "Moderate" },
  { vehicle: "DL 08 EF 9012", health: 76, failureRisk: 15, rul: 1210, risk: "Low" },
  { vehicle: "GJ 05 GH 3456", health: 42, failureRisk: 48, rul: 420, risk: "High" },
];

export const maintenanceRecommendation =
  "Inspect cooling system and check for possible leaks. High engine temperature detected.";
