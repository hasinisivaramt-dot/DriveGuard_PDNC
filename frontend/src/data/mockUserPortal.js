// Placeholder data — see backend/README.md and database/README.md for the
// real collections (sensor_readings, predictions, maintenance_records)
// this will be replaced by once the API exists.

export const sensorSeries = {
  "MH 01 AB 1234": {
    engineTemp: [88, 90, 91, 89, 92, 90, 92],
    vibration: [1.8, 2.0, 1.9, 2.1, 2.2, 2.0, 2.3],
    oilPressure: [46, 45, 47, 44, 45, 46, 45],
    rpm: [2300, 2350, 2400, 2380, 2420, 2400, 2450],
    battery: [91, 90, 90, 89, 89, 88, 89],
  },
  "KA 03 CD 5678": {
    engineTemp: [92, 94, 95, 96, 97, 96, 98],
    vibration: [2.5, 2.7, 2.8, 3.0, 3.1, 3.0, 3.2],
    oilPressure: [42, 41, 40, 40, 39, 38, 38],
    rpm: [2600, 2650, 2700, 2680, 2720, 2700, 2750],
    battery: [78, 77, 76, 75, 75, 74, 73],
  },
};

export const days7 = ["May 22", "May 23", "May 24", "May 25", "May 26", "May 27", "May 28"];

export const recentSensorReadings = [
  { time: "May 28, 10:45 AM", engineTemp: "92°C", vibration: "2.3 mm/s", oilPressure: "45 psi", rpm: "2,450", battery: "89%" },
  { time: "May 28, 09:45 AM", engineTemp: "90°C", vibration: "2.1 mm/s", oilPressure: "46 psi", rpm: "2,400", battery: "89%" },
  { time: "May 28, 08:45 AM", engineTemp: "89°C", vibration: "2.0 mm/s", oilPressure: "46 psi", rpm: "2,380", battery: "90%" },
  { time: "May 27, 06:30 PM", engineTemp: "91°C", vibration: "2.2 mm/s", oilPressure: "45 psi", rpm: "2,420", battery: "89%" },
  { time: "May 27, 02:15 PM", engineTemp: "90°C", vibration: "2.0 mm/s", oilPressure: "46 psi", rpm: "2,390", battery: "90%" },
];

export const predictionHistory = [
  { date: "May 28, 2025", health: 82, failureRisk: 12, rul: 1450, risk: "Low" },
  { date: "May 21, 2025", health: 80, failureRisk: 14, rul: 1510, risk: "Low" },
  { date: "May 14, 2025", health: 79, failureRisk: 15, rul: 1560, risk: "Low" },
  { date: "May 07, 2025", health: 81, failureRisk: 13, rul: 1600, risk: "Low" },
  { date: "Apr 30, 2025", health: 83, failureRisk: 11, rul: 1650, risk: "Low" },
];

export const shapFactors = [
  { feature: "Engine Temperature", impact: 0.28, direction: "increases risk" },
  { feature: "Vibration Level", impact: 0.19, direction: "increases risk" },
  { feature: "Odometer Reading", impact: 0.14, direction: "increases risk" },
  { feature: "Oil Pressure", impact: -0.11, direction: "decreases risk" },
  { feature: "Battery Health", impact: -0.09, direction: "decreases risk" },
  { feature: "RPM Stability", impact: -0.06, direction: "decreases risk" },
];

export const maintenanceRecommendations = [
  {
    id: 1,
    title: "Inspect cooling system and radiator",
    reason: "High engine temperature detected",
    priority: "High",
    vehicle: "MH 01 AB 1234",
  },
  {
    id: 2,
    title: "Check vibration dampers and mounts",
    reason: "Vibration level rising over the last 2 weeks",
    priority: "Medium",
    vehicle: "KA 03 CD 5678",
  },
];

export const maintenanceHistory = [
  { date: "Apr 12, 2025", vehicle: "MH 01 AB 1234", service: "Regular Service", center: "Authorized Service Center", cost: "₹4,200" },
  { date: "Feb 03, 2025", vehicle: "MH 01 AB 1234", service: "Oil & Filter Change", center: "Authorized Service Center", cost: "₹1,800" },
  { date: "Jan 18, 2025", vehicle: "KA 03 CD 5678", service: "Brake Pad Replacement", center: "Local Garage", cost: "₹3,500" },
  { date: "Nov 22, 2024", vehicle: "GJ 05 GH 3456", service: "Major Service", center: "Authorized Service Center", cost: "₹8,900" },
];

export const allAlerts = [
  { id: 1, title: "High Engine Temperature", vehicle: "MH 01 AB 1234", datetime: "May 28, 2025 · 10:30 AM", severity: "High" },
  { id: 2, title: "Vibration Level Rising", vehicle: "KA 03 CD 5678", datetime: "May 28, 2025 · 09:15 AM", severity: "Medium" },
  { id: 3, title: "Battery Health Degrading", vehicle: "DL 08 EF 9012", datetime: "May 27, 2025 · 06:20 PM", severity: "Medium" },
  { id: 4, title: "Oil Pressure Low", vehicle: "GJ 05 GH 3456", datetime: "May 26, 2025 · 03:10 PM", severity: "High" },
  { id: 5, title: "Scheduled Service Due", vehicle: "MH 01 AB 1234", datetime: "May 24, 2025 · 09:00 AM", severity: "Low" },
];

export const activityHistory = [
  { date: "May 28, 2025", type: "Prediction", detail: "New health prediction run for MH 01 AB 1234 — 82% Good", vehicle: "MH 01 AB 1234" },
  { date: "May 28, 2025", type: "Alert", detail: "High Engine Temperature alert raised", vehicle: "MH 01 AB 1234" },
  { date: "May 27, 2025", type: "Alert", detail: "Vibration Level Rising alert raised", vehicle: "KA 03 CD 5678" },
  { date: "Apr 12, 2025", type: "Maintenance", detail: "Regular Service completed", vehicle: "MH 01 AB 1234" },
  { date: "Feb 03, 2025", type: "Maintenance", detail: "Oil & Filter Change completed", vehicle: "MH 01 AB 1234" },
];

export const reports = [
  { id: 1, title: "Monthly Health Summary — May 2025", vehicle: "All Vehicles", date: "Jun 1, 2025", type: "Health Report" },
  { id: 2, title: "Failure Risk Assessment", vehicle: "GJ 05 GH 3456", date: "May 26, 2025", type: "Risk Report" },
  { id: 3, title: "Maintenance Cost Summary — Q1 2025", vehicle: "All Vehicles", date: "Apr 2, 2025", type: "Cost Report" },
];
