// Placeholder data shaped like the future API responses (fleet-wide
// predictions, vehicles, maintenance_records collections). Nothing here
// is a real experimental result — swap for API calls in Phase 7-9.

export const fleetStats = {
  totalVehicles: { value: 128, label: "All Vehicles", change: "+8 vs last week", up: true, good: true },
  highRiskVehicles: { value: 18, label: "High Priority", change: "+3 vs last week", up: true, good: false },
  avgFleetHealth: { value: 72, label: "Good", change: "+5% vs last week", up: true, good: true },
  activeWorkOrders: { value: 12, label: "In Progress", change: "-2 vs yesterday", up: false, good: true },
  maintenanceDue: { value: 9, label: "Due Soon" },
};

export const fleetRiskOverview = [
  { id: "MH 01 AB 1234", model: "Sedan", health: 82, failureRisk: 12, rul: 1450, risk: "Low", status: "Active" },
  { id: "KA 03 CD 5678", model: "SUV", health: 65, failureRisk: 24, rul: 890, risk: "Moderate", status: "Active" },
  { id: "DL 08 EF 9012", model: "Hatchback", health: 76, failureRisk: 15, rul: 1210, risk: "Low", status: "Active" },
  { id: "RJ 14 GH 3456", model: "SUV", health: 42, failureRisk: 48, rul: 420, risk: "High", status: "Active" },
  { id: "TN 09 IJ 6789", model: "Sedan", health: 38, failureRisk: 62, rul: 210, risk: "Critical", status: "Active" },
];

export const fleetRiskDistribution = [
  { label: "Low Risk", count: 68, pct: 53, color: "#22c55e" },
  { label: "Moderate Risk", count: 32, pct: 25, color: "#f59e0b" },
  { label: "High Risk", count: 20, pct: 16, color: "#f97316" },
  { label: "Critical Risk", count: 8, pct: 6, color: "#ef4444" },
];

export const fleetAlerts = [
  { id: 1, title: "High Engine Temperature", vehicle: "RJ 14 GH 3456", datetime: "Today, 10:32 AM", severity: "High" },
  { id: 2, title: "Vibration Level Rising", vehicle: "TN 09 IJ 6789", datetime: "Today, 09:15 AM", severity: "Medium" },
  { id: 3, title: "Oil Pressure Low", vehicle: "KA 03 CD 5678", datetime: "Today, 08:45 AM", severity: "High" },
  { id: 4, title: "Battery Health Degrading", vehicle: "DL 08 EF 9012", datetime: "Yesterday, 06:20 PM", severity: "Medium" },
];

export const vehicleOptions = fleetRiskOverview.map((v) => v.id);

export const vehicleDiagnostics = {
  "RJ 14 GH 3456": {
    model: "XUV 700",
    type: "Diesel",
    year: 2021,
    odometer: "76,320 km",
    vin: "MA1RJ14GH34567890",
    owner: "Rajesh Verma",
    healthScore: 42,
    failureRisk: 48,
    rul: 420,
    riskLevel: "High",
    healthSparkline: [90, 78, 70, 60, 52, 45, 42],
    degradationTrend: [
      { day: "May 22", value: 92 },
      { day: "May 23", value: 80 },
      { day: "May 24", value: 68 },
      { day: "May 25", value: 60 },
      { day: "May 26", value: 55 },
      { day: "May 27", value: 30 },
      { day: "May 28", value: 15 },
    ],
  },
};

export const recommendedActions = {
  banner: "High risk of failure detected. Immediate attention recommended.",
  tasks: [
    { id: 1, task: "Inspect cooling system & radiator", priority: "High", eta: "1.5 hrs" },
    { id: 2, task: "Check engine oil & filter", priority: "High", eta: "1.0 hr" },
    { id: 3, task: "Vibration system inspection", priority: "Medium", eta: "1.0 hr" },
    { id: 4, task: "Check battery & charging system", priority: "Medium", eta: "0.5 hr" },
  ],
};

export const activeWorkOrders = [
  {
    orderId: "WO-2025-0012",
    vehicle: "RJ 14 GH 3456",
    issue: "High engine temperature",
    priority: "High",
    status: "In Progress",
    assignedTo: "Rohit Sharma",
    dueDate: "May 29, 2025",
  },
  {
    orderId: "WO-2025-0011",
    vehicle: "KA 03 CD 5678",
    issue: "Oil pressure low",
    priority: "High",
    status: "In Progress",
    assignedTo: "Amit Singh",
    dueDate: "May 28, 2025",
  },
  {
    orderId: "WO-2025-0010",
    vehicle: "TN 09 IJ 6789",
    issue: "Vibration level high",
    priority: "Medium",
    status: "Pending",
    assignedTo: "Vikram Patel",
    dueDate: "May 30, 2025",
  },
];
