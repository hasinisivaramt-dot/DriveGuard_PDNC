// Placeholder data shaped like the future API responses (fleet-wide
// predictions, vehicles, maintenance_records collections). Nothing here
// is a real experimental result — swap for API calls in Phase 7-9.

// ---------------------------------------------------------------------------
// Fleet Overview — all vehicles (replaces the small fleetRiskOverview sample
// when a full list is needed). Swap for GET /api/fleet in Phase 7-9.
// ---------------------------------------------------------------------------
export const allFleetVehicles = [
  {
    id: "MH 01 AB 1234", manufacturer: "Maruti Suzuki", model: "Dzire",
    type: "Sedan", year: 2021, odometer: "42,300 km",
    owner: "Ananya Sharma",
    health: 82, failureRisk: 12, rul: 1450, risk: "Low", status: "Active",
  },
  {
    id: "KA 03 CD 5678", manufacturer: "Hyundai", model: "Creta",
    type: "SUV", year: 2020, odometer: "58,900 km",
    owner: "Kiran Nair",
    health: 65, failureRisk: 24, rul: 890, risk: "Moderate", status: "Active",
  },
  {
    id: "DL 08 EF 9012", manufacturer: "Tata", model: "Altroz",
    type: "Hatchback", year: 2022, odometer: "21,150 km",
    owner: "Priya Mehta",
    health: 76, failureRisk: 15, rul: 1210, risk: "Low", status: "Active",
  },
  {
    id: "RJ 14 GH 3456", manufacturer: "Mahindra", model: "XUV 700",
    type: "SUV", year: 2021, odometer: "76,320 km",
    owner: "Rajesh Verma",
    health: 42, failureRisk: 48, rul: 420, risk: "High", status: "Active",
  },
  {
    id: "TN 09 IJ 6789", manufacturer: "Toyota", model: "Innova Crysta",
    type: "MPV", year: 2019, odometer: "1,12,800 km",
    owner: "Suresh Babu",
    health: 38, failureRisk: 62, rul: 210, risk: "Critical", status: "Active",
  },
  {
    id: "GJ 05 KL 1122", manufacturer: "Honda", model: "City",
    type: "Sedan", year: 2023, odometer: "14,600 km",
    owner: "Meena Patel",
    health: 91, failureRisk: 7, rul: 1820, risk: "Low", status: "Active",
  },
  {
    id: "UP 32 MN 3344", manufacturer: "Kia", model: "Seltos",
    type: "SUV", year: 2022, odometer: "33,200 km",
    owner: "Arjun Singh",
    health: 74, failureRisk: 18, rul: 1050, risk: "Low", status: "In Service",
  },
  {
    id: "WB 02 OP 5566", manufacturer: "Ford", model: "EcoSport",
    type: "SUV", year: 2018, odometer: "88,400 km",
    owner: "Debashish Roy",
    health: 55, failureRisk: 36, rul: 580, risk: "Moderate", status: "Active",
  },
  {
    id: "PB 10 QR 7788", manufacturer: "Volkswagen", model: "Polo",
    type: "Hatchback", year: 2017, odometer: "1,04,100 km",
    owner: "Harmeet Kaur",
    health: 48, failureRisk: 44, rul: 340, risk: "High", status: "In Service",
  },
  {
    id: "MH 12 ST 9900", manufacturer: "Renault", model: "Kwid",
    type: "Hatchback", year: 2020, odometer: "29,700 km",
    owner: "Rohan Joshi",
    health: 88, failureRisk: 9, rul: 1670, risk: "Low", status: "Active",
  },
  {
    id: "AP 16 UV 2233", manufacturer: "Skoda", model: "Kushaq",
    type: "SUV", year: 2022, odometer: "19,500 km",
    owner: "Lakshmi Reddy",
    health: 80, failureRisk: 14, rul: 1380, risk: "Low", status: "Active",
  },
  {
    id: "HR 26 WX 4455", manufacturer: "Maruti Suzuki", model: "Baleno",
    type: "Hatchback", year: 2019, odometer: "67,800 km",
    owner: "Deepak Gupta",
    health: 61, failureRisk: 31, rul: 720, risk: "Moderate", status: "Offline",
  },
  {
    id: "CG 04 YZ 6677", manufacturer: "Tata", model: "Nexon EV",
    type: "SUV (EV)", year: 2023, odometer: "11,200 km",
    owner: "Sanjay Dubey",
    health: 93, failureRisk: 5, rul: 2100, risk: "Low", status: "Active",
  },
  {
    id: "MH 43 AB 8899", manufacturer: "Hyundai", model: "Venue",
    type: "SUV", year: 2021, odometer: "44,600 km",
    owner: "Sneha Kulkarni",
    health: 69, failureRisk: 22, rul: 960, risk: "Moderate", status: "Active",
  },
  {
    id: "KL 07 CD 1357", manufacturer: "Toyota", model: "Fortuner",
    type: "SUV", year: 2017, odometer: "1,31,400 km",
    owner: "Thomas Varghese",
    health: 35, failureRisk: 67, rul: 180, risk: "Critical", status: "In Service",
  },
];

// Quick summary stats derived from allFleetVehicles for the Fleet Overview header.
// In Phase 7-9 these come from a dedicated summary endpoint.
export const fleetSummaryStats = {
  total: allFleetVehicles.length,
  active: allFleetVehicles.filter((v) => v.status === "Active").length,
  inService: allFleetVehicles.filter((v) => v.status === "In Service").length,
  offline: allFleetVehicles.filter((v) => v.status === "Offline").length,
  critical: allFleetVehicles.filter((v) => v.risk === "Critical").length,
  high: allFleetVehicles.filter((v) => v.risk === "High").length,
};

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

// vehicleDiagnostics — used by the dashboard VehicleDiagnosticDetails widget.
// All 5 fleetRiskOverview vehicles now have unique data; previously only
// RJ 14 GH 3456 had data and the others fell back silently.
export const vehicleDiagnostics = {
  "MH 01 AB 1234": {
    model: "Dzire", type: "Petrol", year: 2021, odometer: "42,300 km",
    vin: "MZSTH1MH01AB12001", owner: "Ananya Sharma",
    healthScore: 82, failureRisk: 12, rul: 1450, riskLevel: "Low",
    healthSparkline: [86, 84, 85, 83, 84, 82, 82],
    degradationTrend: [
      { day: "May 22", value: 86 }, { day: "May 23", value: 84 },
      { day: "May 24", value: 85 }, { day: "May 25", value: 83 },
      { day: "May 26", value: 84 }, { day: "May 27", value: 82 },
      { day: "May 28", value: 82 },
    ],
  },
  "KA 03 CD 5678": {
    model: "Creta", type: "Diesel", year: 2020, odometer: "58,900 km",
    vin: "MZSTH2KA03CD56001", owner: "Kiran Nair",
    healthScore: 65, failureRisk: 24, rul: 890, riskLevel: "Moderate",
    healthSparkline: [75, 73, 71, 70, 68, 66, 65],
    degradationTrend: [
      { day: "May 22", value: 75 }, { day: "May 23", value: 73 },
      { day: "May 24", value: 71 }, { day: "May 25", value: 70 },
      { day: "May 26", value: 68 }, { day: "May 27", value: 66 },
      { day: "May 28", value: 65 },
    ],
  },
  "DL 08 EF 9012": {
    model: "Altroz", type: "Petrol", year: 2022, odometer: "21,150 km",
    vin: "MZSTH3DL08EF90001", owner: "Priya Mehta",
    healthScore: 76, failureRisk: 15, rul: 1210, riskLevel: "Low",
    healthSparkline: [80, 79, 78, 78, 77, 77, 76],
    degradationTrend: [
      { day: "May 22", value: 80 }, { day: "May 23", value: 79 },
      { day: "May 24", value: 78 }, { day: "May 25", value: 78 },
      { day: "May 26", value: 77 }, { day: "May 27", value: 77 },
      { day: "May 28", value: 76 },
    ],
  },
  "RJ 14 GH 3456": {
    model: "XUV 700", type: "Diesel", year: 2021, odometer: "76,320 km",
    vin: "MA1RJ14GH34567890", owner: "Rajesh Verma",
    healthScore: 42, failureRisk: 48, rul: 420, riskLevel: "High",
    healthSparkline: [90, 78, 70, 60, 52, 45, 42],
    degradationTrend: [
      { day: "May 22", value: 92 }, { day: "May 23", value: 80 },
      { day: "May 24", value: 68 }, { day: "May 25", value: 60 },
      { day: "May 26", value: 55 }, { day: "May 27", value: 30 },
      { day: "May 28", value: 15 },
    ],
  },
  "TN 09 IJ 6789": {
    model: "Innova Crysta", type: "Diesel", year: 2019, odometer: "1,12,800 km",
    vin: "MZSTH5TN09IJ67001", owner: "Suresh Babu",
    healthScore: 38, failureRisk: 62, rul: 210, riskLevel: "Critical",
    healthSparkline: [65, 58, 52, 47, 44, 40, 38],
    degradationTrend: [
      { day: "May 22", value: 65 }, { day: "May 23", value: 58 },
      { day: "May 24", value: 52 }, { day: "May 25", value: 47 },
      { day: "May 26", value: 44 }, { day: "May 27", value: 40 },
      { day: "May 28", value: 38 },
    ],
  },
};

// ---------------------------------------------------------------------------
// allVehicleDiagnostics — richer per-vehicle data used by the full
// Vehicle Diagnostics page (/portal/technician/diagnostics).
// Covers all 15 vehicles in allFleetVehicles. Swap for API in Phase 7-9.
// ---------------------------------------------------------------------------
export const allVehicleDiagnostics = {
  "MH 01 AB 1234": {
    vin: "MZSTH1MH01AB12001",
    healthSparkline: [86, 84, 85, 83, 84, 82, 82],
    degradationTrend: [
      { day: "May 22", value: 86 }, { day: "May 23", value: 84 },
      { day: "May 24", value: 85 }, { day: "May 25", value: 83 },
      { day: "May 26", value: 84 }, { day: "May 27", value: 82 },
      { day: "May 28", value: 82 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 92,   trend: [88, 90, 91, 89, 92, 90, 92],             normalRange: "< 95 °C",      statusOk: true  },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 2.3,  trend: [1.8, 2.0, 1.9, 2.1, 2.2, 2.0, 2.3],     normalRange: "< 3.0 mm/s",   statusOk: true  },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 46,   trend: [46, 45, 47, 44, 45, 46, 46],             normalRange: "35–65 psi",    statusOk: true  },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2450, trend: [2300, 2350, 2400, 2380, 2420, 2400, 2450], normalRange: "800–3000 rpm", statusOk: true  },
      battery:     { label: "Battery",      unit: "%",    current: 89,   trend: [91, 90, 90, 89, 89, 88, 89],             normalRange: "> 80%",        statusOk: true  },
    },
    alerts: [
      { id: 1, title: "Scheduled Service Due", datetime: "May 28, 09:00 AM", severity: "Low" },
    ],
    actions: {
      banner: "Vehicle in good health. Routine maintenance recommended.",
      tasks: [
        { id: 1, task: "Scheduled oil & filter change", priority: "Low", eta: "1.0 hr" },
        { id: 2, task: "Tyre pressure & alignment check", priority: "Low", eta: "0.5 hr" },
      ],
    },
  },
  "KA 03 CD 5678": {
    vin: "MZSTH2KA03CD56001",
    healthSparkline: [75, 73, 71, 70, 68, 66, 65],
    degradationTrend: [
      { day: "May 22", value: 75 }, { day: "May 23", value: 73 },
      { day: "May 24", value: 71 }, { day: "May 25", value: 70 },
      { day: "May 26", value: 68 }, { day: "May 27", value: 66 },
      { day: "May 28", value: 65 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 96,   trend: [92, 94, 95, 96, 97, 96, 96],             normalRange: "< 95 °C",      statusOk: false },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 3.2,  trend: [2.5, 2.7, 2.8, 3.0, 3.1, 3.0, 3.2],     normalRange: "< 3.0 mm/s",   statusOk: false },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 38,   trend: [42, 41, 40, 40, 39, 38, 38],             normalRange: "35–65 psi",    statusOk: true  },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2750, trend: [2600, 2650, 2700, 2680, 2720, 2700, 2750], normalRange: "800–3000 rpm", statusOk: true  },
      battery:     { label: "Battery",      unit: "%",    current: 73,   trend: [78, 77, 76, 75, 75, 74, 73],             normalRange: "> 80%",        statusOk: false },
    },
    alerts: [
      { id: 1, title: "Oil Pressure Low",          datetime: "May 28, 08:45 AM", severity: "High"   },
      { id: 2, title: "Engine Temperature Rising",  datetime: "May 28, 08:30 AM", severity: "Medium" },
      { id: 3, title: "Battery Health Degrading",   datetime: "May 27, 03:20 PM", severity: "Medium" },
    ],
    actions: {
      banner: "Moderate risk detected. Inspection recommended within 48 hours.",
      tasks: [
        { id: 1, task: "Inspect cooling system & radiator", priority: "High",   eta: "1.5 hrs" },
        { id: 2, task: "Vibration damper inspection",       priority: "Medium",  eta: "1.0 hr"  },
        { id: 3, task: "Battery & alternator check",        priority: "Medium",  eta: "0.5 hr"  },
      ],
    },
  },
  "DL 08 EF 9012": {
    vin: "MZSTH3DL08EF90001",
    healthSparkline: [80, 79, 78, 78, 77, 77, 76],
    degradationTrend: [
      { day: "May 22", value: 80 }, { day: "May 23", value: 79 },
      { day: "May 24", value: 78 }, { day: "May 25", value: 78 },
      { day: "May 26", value: 77 }, { day: "May 27", value: 77 },
      { day: "May 28", value: 76 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 89,   trend: [87, 88, 89, 88, 89, 88, 89],             normalRange: "< 95 °C",      statusOk: true  },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 2.1,  trend: [1.9, 2.0, 2.0, 2.1, 2.1, 2.0, 2.1],     normalRange: "< 3.0 mm/s",   statusOk: true  },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 44,   trend: [46, 45, 44, 45, 44, 44, 44],             normalRange: "35–65 psi",    statusOk: true  },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2300, trend: [2200, 2250, 2280, 2300, 2290, 2300, 2300], normalRange: "800–3000 rpm", statusOk: true  },
      battery:     { label: "Battery",      unit: "%",    current: 86,   trend: [88, 87, 87, 86, 86, 86, 86],             normalRange: "> 80%",        statusOk: true  },
    },
    alerts: [
      { id: 1, title: "Battery Health Degrading", datetime: "May 27, 06:20 PM", severity: "Medium" },
    ],
    actions: {
      banner: "Vehicle health stable. Minor preventive checks advised.",
      tasks: [
        { id: 1, task: "Battery & charging system check",   priority: "Medium", eta: "0.5 hr" },
        { id: 2, task: "Routine fluid levels inspection",    priority: "Low",    eta: "0.5 hr" },
      ],
    },
  },
  "RJ 14 GH 3456": {
    vin: "MA1RJ14GH34567890",
    healthSparkline: [90, 78, 70, 60, 52, 45, 42],
    degradationTrend: [
      { day: "May 22", value: 92 }, { day: "May 23", value: 80 },
      { day: "May 24", value: 68 }, { day: "May 25", value: 60 },
      { day: "May 26", value: 55 }, { day: "May 27", value: 30 },
      { day: "May 28", value: 15 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 108,  trend: [95, 98, 100, 103, 105, 107, 108],         normalRange: "< 95 °C",      statusOk: false },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 4.8,  trend: [3.2, 3.6, 3.9, 4.2, 4.5, 4.7, 4.8],      normalRange: "< 3.0 mm/s",   statusOk: false },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 28,   trend: [38, 36, 34, 32, 30, 29, 28],              normalRange: "35–65 psi",    statusOk: false },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2900, trend: [2600, 2700, 2750, 2800, 2850, 2880, 2900], normalRange: "800–3000 rpm", statusOk: true  },
      battery:     { label: "Battery",      unit: "%",    current: 72,   trend: [82, 80, 78, 76, 75, 73, 72],              normalRange: "> 80%",        statusOk: false },
    },
    alerts: [
      { id: 1, title: "High Engine Temperature",  datetime: "May 28, 10:32 AM", severity: "High"   },
      { id: 2, title: "Oil Pressure Low",          datetime: "May 28, 09:15 AM", severity: "High"   },
      { id: 3, title: "Vibration Level Critical",  datetime: "May 27, 04:30 PM", severity: "High"   },
      { id: 4, title: "Battery Health Degrading",  datetime: "May 26, 08:00 AM", severity: "Medium" },
    ],
    actions: {
      banner: "High risk of failure detected. Immediate attention recommended.",
      tasks: [
        { id: 1, task: "Inspect cooling system & radiator", priority: "High",   eta: "1.5 hrs" },
        { id: 2, task: "Check engine oil & filter",         priority: "High",   eta: "1.0 hr"  },
        { id: 3, task: "Vibration system inspection",       priority: "Medium", eta: "1.0 hr"  },
        { id: 4, task: "Check battery & charging system",   priority: "Medium", eta: "0.5 hr"  },
      ],
    },
  },
  "TN 09 IJ 6789": {
    vin: "MZSTH5TN09IJ67001",
    healthSparkline: [65, 58, 52, 47, 44, 40, 38],
    degradationTrend: [
      { day: "May 22", value: 65 }, { day: "May 23", value: 58 },
      { day: "May 24", value: 52 }, { day: "May 25", value: 47 },
      { day: "May 26", value: 44 }, { day: "May 27", value: 40 },
      { day: "May 28", value: 38 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 112,  trend: [100, 103, 106, 108, 110, 111, 112],        normalRange: "< 95 °C",      statusOk: false },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 6.2,  trend: [4.0, 4.5, 5.0, 5.5, 5.8, 6.0, 6.2],       normalRange: "< 3.0 mm/s",   statusOk: false },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 22,   trend: [34, 31, 29, 27, 25, 23, 22],               normalRange: "35–65 psi",    statusOk: false },
      rpm:         { label: "RPM",          unit: "rpm",  current: 3100, trend: [2800, 2900, 2980, 3020, 3050, 3080, 3100],  normalRange: "800–3000 rpm", statusOk: false },
      battery:     { label: "Battery",      unit: "%",    current: 58,   trend: [72, 68, 65, 63, 61, 59, 58],               normalRange: "> 80%",        statusOk: false },
    },
    alerts: [
      { id: 1, title: "Critical Engine Overheating",   datetime: "May 28, 09:15 AM", severity: "High" },
      { id: 2, title: "Vibration Level Dangerous",      datetime: "May 28, 08:50 AM", severity: "High" },
      { id: 3, title: "Oil Pressure Critical",          datetime: "May 28, 08:30 AM", severity: "High" },
      { id: 4, title: "RPM Exceeding Safe Range",       datetime: "May 27, 02:15 PM", severity: "High" },
      { id: 5, title: "Battery Critically Low",         datetime: "May 26, 05:00 PM", severity: "High" },
    ],
    actions: {
      banner: "CRITICAL: Multiple system failures imminent. Immediate service required.",
      tasks: [
        { id: 1, task: "Emergency engine cooling repair",       priority: "High",   eta: "3.0 hrs" },
        { id: 2, task: "Engine oil replacement & pressure test", priority: "High",   eta: "1.5 hrs" },
        { id: 3, task: "Full drivetrain vibration inspection",   priority: "High",   eta: "2.0 hrs" },
        { id: 4, task: "Battery replacement",                    priority: "High",   eta: "1.0 hr"  },
        { id: 5, task: "ECU diagnostic scan",                    priority: "Medium", eta: "1.0 hr"  },
      ],
    },
  },
  "GJ 05 KL 1122": {
    vin: "MZSTH6GJ05KL11001",
    healthSparkline: [93, 92, 92, 91, 91, 91, 91],
    degradationTrend: [
      { day: "May 22", value: 93 }, { day: "May 23", value: 92 },
      { day: "May 24", value: 92 }, { day: "May 25", value: 91 },
      { day: "May 26", value: 91 }, { day: "May 27", value: 91 },
      { day: "May 28", value: 91 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 86,   trend: [85, 86, 85, 86, 86, 85, 86],              normalRange: "< 95 °C",      statusOk: true },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 1.6,  trend: [1.5, 1.6, 1.5, 1.6, 1.6, 1.5, 1.6],      normalRange: "< 3.0 mm/s",   statusOk: true },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 52,   trend: [51, 52, 52, 51, 52, 52, 52],              normalRange: "35–65 psi",    statusOk: true },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2100, trend: [2050, 2080, 2100, 2090, 2100, 2090, 2100], normalRange: "800–3000 rpm", statusOk: true },
      battery:     { label: "Battery",      unit: "%",    current: 94,   trend: [94, 94, 95, 94, 94, 94, 94],              normalRange: "> 80%",        statusOk: true },
    },
    alerts: [],
    actions: {
      banner: "Vehicle in excellent health. No immediate action required.",
      tasks: [
        { id: 1, task: "Next scheduled service check", priority: "Low", eta: "0.5 hr" },
      ],
    },
  },
  "UP 32 MN 3344": {
    vin: "MZSTH7UP32MN33001",
    healthSparkline: [78, 77, 76, 75, 75, 74, 74],
    degradationTrend: [
      { day: "May 22", value: 78 }, { day: "May 23", value: 77 },
      { day: "May 24", value: 76 }, { day: "May 25", value: 75 },
      { day: "May 26", value: 75 }, { day: "May 27", value: 74 },
      { day: "May 28", value: 74 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 90,   trend: [88, 89, 90, 89, 90, 90, 90],              normalRange: "< 95 °C",      statusOk: true },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 2.0,  trend: [1.8, 1.9, 2.0, 1.9, 2.0, 2.0, 2.0],      normalRange: "< 3.0 mm/s",   statusOk: true },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 42,   trend: [44, 43, 42, 43, 42, 42, 42],              normalRange: "35–65 psi",    statusOk: true },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2250, trend: [2200, 2220, 2250, 2230, 2250, 2240, 2250], normalRange: "800–3000 rpm", statusOk: true },
      battery:     { label: "Battery",      unit: "%",    current: 84,   trend: [86, 85, 85, 84, 84, 84, 84],              normalRange: "> 80%",        statusOk: true },
    },
    alerts: [
      { id: 1, title: "Routine Service Due Soon", datetime: "May 27, 10:00 AM", severity: "Low" },
    ],
    actions: {
      banner: "Vehicle under scheduled maintenance. Inspection in progress.",
      tasks: [
        { id: 1, task: "Complete in-service inspection",  priority: "Medium", eta: "2.0 hrs" },
        { id: 2, task: "Oil & filter change",              priority: "Low",    eta: "1.0 hr"  },
      ],
    },
  },
  "WB 02 OP 5566": {
    vin: "MZSTH8WB02OP55001",
    healthSparkline: [62, 60, 58, 57, 56, 55, 55],
    degradationTrend: [
      { day: "May 22", value: 62 }, { day: "May 23", value: 60 },
      { day: "May 24", value: 58 }, { day: "May 25", value: 57 },
      { day: "May 26", value: 56 }, { day: "May 27", value: 55 },
      { day: "May 28", value: 55 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 98,   trend: [93, 95, 96, 97, 98, 97, 98],              normalRange: "< 95 °C",      statusOk: false },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 3.5,  trend: [2.8, 3.0, 3.1, 3.3, 3.4, 3.5, 3.5],      normalRange: "< 3.0 mm/s",   statusOk: false },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 37,   trend: [42, 41, 40, 39, 38, 37, 37],              normalRange: "35–65 psi",    statusOk: true  },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2600, trend: [2400, 2450, 2500, 2550, 2580, 2600, 2600], normalRange: "800–3000 rpm", statusOk: true  },
      battery:     { label: "Battery",      unit: "%",    current: 78,   trend: [82, 81, 80, 79, 79, 78, 78],              normalRange: "> 80%",        statusOk: false },
    },
    alerts: [
      { id: 1, title: "Engine Temperature Elevated", datetime: "May 28, 07:30 AM", severity: "Medium" },
      { id: 2, title: "Vibration Above Threshold",   datetime: "May 27, 02:00 PM", severity: "Medium" },
    ],
    actions: {
      banner: "Moderate degradation detected. Schedule service within the week.",
      tasks: [
        { id: 1, task: "Cooling system inspection",    priority: "Medium", eta: "1.0 hr"  },
        { id: 2, task: "Vibration & suspension check", priority: "Medium", eta: "1.5 hrs" },
        { id: 3, task: "Battery health assessment",    priority: "Low",    eta: "0.5 hr"  },
      ],
    },
  },
  "PB 10 QR 7788": {
    vin: "MZSTH9PB10QR77001",
    healthSparkline: [58, 55, 53, 51, 50, 49, 48],
    degradationTrend: [
      { day: "May 22", value: 58 }, { day: "May 23", value: 55 },
      { day: "May 24", value: 53 }, { day: "May 25", value: 51 },
      { day: "May 26", value: 50 }, { day: "May 27", value: 49 },
      { day: "May 28", value: 48 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 102,  trend: [96, 97, 99, 100, 101, 102, 102],           normalRange: "< 95 °C",      statusOk: false },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 4.1,  trend: [3.0, 3.3, 3.5, 3.7, 3.9, 4.0, 4.1],       normalRange: "< 3.0 mm/s",   statusOk: false },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 32,   trend: [38, 37, 36, 35, 33, 32, 32],               normalRange: "35–65 psi",    statusOk: false },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2800, trend: [2600, 2650, 2700, 2740, 2760, 2790, 2800],  normalRange: "800–3000 rpm", statusOk: true  },
      battery:     { label: "Battery",      unit: "%",    current: 69,   trend: [76, 74, 73, 72, 71, 70, 69],               normalRange: "> 80%",        statusOk: false },
    },
    alerts: [
      { id: 1, title: "Oil Pressure Below Normal",    datetime: "May 28, 10:10 AM", severity: "High"   },
      { id: 2, title: "Engine Temperature High",       datetime: "May 28, 09:45 AM", severity: "High"   },
      { id: 3, title: "Vibration Level Elevated",      datetime: "May 27, 03:50 PM", severity: "Medium" },
    ],
    actions: {
      banner: "High risk detected. Vehicle under service — complete repairs urgently.",
      tasks: [
        { id: 1, task: "Engine oil & filter replacement", priority: "High",   eta: "1.5 hrs" },
        { id: 2, task: "Cooling system flush & check",     priority: "High",   eta: "1.0 hr"  },
        { id: 3, task: "Suspension & vibration inspection",priority: "Medium", eta: "2.0 hrs" },
        { id: 4, task: "Battery replacement",              priority: "Medium", eta: "1.0 hr"  },
      ],
    },
  },
  "MH 12 ST 9900": {
    vin: "MZSTH10MH12ST9001",
    healthSparkline: [90, 89, 89, 88, 88, 88, 88],
    degradationTrend: [
      { day: "May 22", value: 90 }, { day: "May 23", value: 89 },
      { day: "May 24", value: 89 }, { day: "May 25", value: 88 },
      { day: "May 26", value: 88 }, { day: "May 27", value: 88 },
      { day: "May 28", value: 88 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 87,   trend: [86, 87, 87, 86, 87, 87, 87],              normalRange: "< 95 °C",      statusOk: true },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 1.8,  trend: [1.7, 1.8, 1.8, 1.7, 1.8, 1.8, 1.8],      normalRange: "< 3.0 mm/s",   statusOk: true },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 48,   trend: [48, 49, 48, 48, 48, 48, 48],              normalRange: "35–65 psi",    statusOk: true },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2150, trend: [2100, 2130, 2150, 2140, 2150, 2150, 2150], normalRange: "800–3000 rpm", statusOk: true },
      battery:     { label: "Battery",      unit: "%",    current: 91,   trend: [92, 91, 91, 91, 91, 91, 91],              normalRange: "> 80%",        statusOk: true },
    },
    alerts: [],
    actions: {
      banner: "Vehicle in good health. Standard check-up recommended.",
      tasks: [
        { id: 1, task: "Scheduled service inspection", priority: "Low", eta: "1.0 hr" },
      ],
    },
  },
  "AP 16 UV 2233": {
    vin: "MZSTH11AP16UV2001",
    healthSparkline: [82, 81, 81, 80, 80, 80, 80],
    degradationTrend: [
      { day: "May 22", value: 82 }, { day: "May 23", value: 81 },
      { day: "May 24", value: 81 }, { day: "May 25", value: 80 },
      { day: "May 26", value: 80 }, { day: "May 27", value: 80 },
      { day: "May 28", value: 80 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 91,   trend: [89, 90, 91, 90, 91, 90, 91],              normalRange: "< 95 °C",      statusOk: true },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 2.0,  trend: [1.9, 2.0, 2.0, 1.9, 2.0, 2.0, 2.0],      normalRange: "< 3.0 mm/s",   statusOk: true },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 47,   trend: [48, 47, 47, 47, 47, 47, 47],              normalRange: "35–65 psi",    statusOk: true },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2200, trend: [2180, 2190, 2200, 2200, 2200, 2200, 2200], normalRange: "800–3000 rpm", statusOk: true },
      battery:     { label: "Battery",      unit: "%",    current: 88,   trend: [89, 89, 88, 88, 88, 88, 88],              normalRange: "> 80%",        statusOk: true },
    },
    alerts: [],
    actions: {
      banner: "Vehicle health good. Routine maintenance schedule on track.",
      tasks: [
        { id: 1, task: "Routine fluid levels check", priority: "Low", eta: "0.5 hr" },
        { id: 2, task: "Tyre rotation & pressure",   priority: "Low", eta: "0.5 hr" },
      ],
    },
  },
  "HR 26 WX 4455": {
    vin: "MZSTH12HR26WX4001",
    healthSparkline: [68, 66, 64, 63, 62, 61, 61],
    degradationTrend: [
      { day: "May 22", value: 68 }, { day: "May 23", value: 66 },
      { day: "May 24", value: 64 }, { day: "May 25", value: 63 },
      { day: "May 26", value: 62 }, { day: "May 27", value: 61 },
      { day: "May 28", value: 61 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 94,   trend: [90, 91, 92, 93, 93, 94, 94],              normalRange: "< 95 °C",      statusOk: true  },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 2.9,  trend: [2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.9],      normalRange: "< 3.0 mm/s",   statusOk: true  },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 36,   trend: [42, 40, 39, 38, 37, 36, 36],              normalRange: "35–65 psi",    statusOk: true  },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2500, trend: [2350, 2400, 2440, 2470, 2490, 2500, 2500], normalRange: "800–3000 rpm", statusOk: true  },
      battery:     { label: "Battery",      unit: "%",    current: 74,   trend: [80, 78, 77, 76, 75, 74, 74],              normalRange: "> 80%",        statusOk: false },
    },
    alerts: [
      { id: 1, title: "Vehicle Offline — No Signal",  datetime: "May 26, 08:00 AM", severity: "Medium" },
      { id: 2, title: "Battery Health Degrading",      datetime: "May 25, 04:10 PM", severity: "Medium" },
    ],
    actions: {
      banner: "Vehicle offline. Reconnect IoT sensor and inspect battery.",
      tasks: [
        { id: 1, task: "IoT sensor reconnection check", priority: "Medium", eta: "0.5 hr" },
        { id: 2, task: "Battery replacement assessment", priority: "Medium", eta: "1.0 hr" },
        { id: 3, task: "Full vehicle inspection",        priority: "Low",    eta: "1.5 hrs" },
      ],
    },
  },
  "CG 04 YZ 6677": {
    vin: "MZSTH13CG04YZ6001",
    healthSparkline: [94, 93, 93, 93, 93, 93, 93],
    degradationTrend: [
      { day: "May 22", value: 94 }, { day: "May 23", value: 93 },
      { day: "May 24", value: 93 }, { day: "May 25", value: 93 },
      { day: "May 26", value: 93 }, { day: "May 27", value: 93 },
      { day: "May 28", value: 93 },
    ],
    sensors: {
      engineTemp:  { label: "Motor Temp",   unit: "°C",   current: 52,   trend: [50, 51, 52, 51, 52, 52, 52],              normalRange: "< 80 °C",      statusOk: true },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 1.2,  trend: [1.1, 1.2, 1.2, 1.1, 1.2, 1.2, 1.2],      normalRange: "< 3.0 mm/s",   statusOk: true },
      oilPressure: { label: "Coolant Pres.",unit: "psi",  current: 18,   trend: [18, 18, 18, 18, 18, 18, 18],              normalRange: "15–25 psi",    statusOk: true },
      rpm:         { label: "Motor RPM",    unit: "rpm",  current: 1800, trend: [1750, 1780, 1800, 1790, 1800, 1800, 1800], normalRange: "0–8000 rpm",   statusOk: true },
      battery:     { label: "SoC (EV)",     unit: "%",    current: 96,   trend: [94, 95, 96, 95, 96, 96, 96],              normalRange: "> 20%",        statusOk: true },
    },
    alerts: [],
    actions: {
      banner: "EV in excellent condition. No action required.",
      tasks: [
        { id: 1, task: "Scheduled software OTA update check", priority: "Low", eta: "0.5 hr" },
      ],
    },
  },
  "MH 43 AB 8899": {
    vin: "MZSTH14MH43AB8001",
    healthSparkline: [74, 72, 71, 70, 70, 69, 69],
    degradationTrend: [
      { day: "May 22", value: 74 }, { day: "May 23", value: 72 },
      { day: "May 24", value: 71 }, { day: "May 25", value: 70 },
      { day: "May 26", value: 70 }, { day: "May 27", value: 69 },
      { day: "May 28", value: 69 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 93,   trend: [89, 90, 91, 92, 92, 93, 93],              normalRange: "< 95 °C",      statusOk: true  },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 2.7,  trend: [2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.7],      normalRange: "< 3.0 mm/s",   statusOk: true  },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 40,   trend: [44, 43, 42, 41, 41, 40, 40],              normalRange: "35–65 psi",    statusOk: true  },
      rpm:         { label: "RPM",          unit: "rpm",  current: 2450, trend: [2300, 2350, 2400, 2420, 2440, 2450, 2450], normalRange: "800–3000 rpm", statusOk: true  },
      battery:     { label: "Battery",      unit: "%",    current: 76,   trend: [81, 80, 79, 78, 77, 76, 76],              normalRange: "> 80%",        statusOk: false },
    },
    alerts: [
      { id: 1, title: "Battery Health Declining", datetime: "May 27, 11:20 AM", severity: "Medium" },
    ],
    actions: {
      banner: "Moderate health. Preventive battery service recommended.",
      tasks: [
        { id: 1, task: "Battery & charging system test", priority: "Medium", eta: "1.0 hr"  },
        { id: 2, task: "Engine & sensor inspection",     priority: "Low",    eta: "1.0 hr"  },
      ],
    },
  },
  "KL 07 CD 1357": {
    vin: "MZSTH15KL07CD1001",
    healthSparkline: [52, 47, 43, 40, 38, 36, 35],
    degradationTrend: [
      { day: "May 22", value: 52 }, { day: "May 23", value: 47 },
      { day: "May 24", value: 43 }, { day: "May 25", value: 40 },
      { day: "May 26", value: 38 }, { day: "May 27", value: 36 },
      { day: "May 28", value: 35 },
    ],
    sensors: {
      engineTemp:  { label: "Engine Temp",  unit: "°C",   current: 110,  trend: [98, 101, 104, 106, 108, 109, 110],         normalRange: "< 95 °C",      statusOk: false },
      vibration:   { label: "Vibration",    unit: "mm/s", current: 5.5,  trend: [3.5, 3.9, 4.3, 4.7, 5.0, 5.3, 5.5],       normalRange: "< 3.0 mm/s",   statusOk: false },
      oilPressure: { label: "Oil Pressure", unit: "psi",  current: 24,   trend: [36, 33, 30, 28, 26, 25, 24],               normalRange: "35–65 psi",    statusOk: false },
      rpm:         { label: "RPM",          unit: "rpm",  current: 3050, trend: [2700, 2800, 2880, 2950, 3000, 3030, 3050],  normalRange: "800–3000 rpm", statusOk: false },
      battery:     { label: "Battery",      unit: "%",    current: 61,   trend: [76, 72, 69, 66, 64, 62, 61],               normalRange: "> 80%",        statusOk: false },
    },
    alerts: [
      { id: 1, title: "Critical Engine Overheating",  datetime: "May 28, 10:50 AM", severity: "High" },
      { id: 2, title: "Oil Pressure Critically Low",   datetime: "May 28, 10:20 AM", severity: "High" },
      { id: 3, title: "Vibration Level Dangerous",     datetime: "May 28, 09:40 AM", severity: "High" },
      { id: 4, title: "Battery Critically Low",        datetime: "May 27, 06:00 PM", severity: "High" },
    ],
    actions: {
      banner: "CRITICAL: Severe degradation. Vehicle under service — urgent action needed.",
      tasks: [
        { id: 1, task: "Emergency cooling system overhaul", priority: "High",   eta: "3.0 hrs" },
        { id: 2, task: "Engine oil & seal replacement",      priority: "High",   eta: "2.0 hrs" },
        { id: 3, task: "Full drivetrain & suspension check", priority: "High",   eta: "2.5 hrs" },
        { id: 4, task: "Battery replacement",                priority: "High",   eta: "1.0 hr"  },
        { id: 5, task: "Post-repair ECU diagnostic scan",    priority: "Medium", eta: "1.0 hr"  },
      ],
    },
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

// ---------------------------------------------------------------------------
// mockWorkOrdersFull — used by the full Work Orders page.
// 14 seeded orders across vehicles; statuses span Open/In Progress/Completed/Cancelled.
// orderId format: WO-XXXX. vehicleId references allFleetVehicles ids.
// ---------------------------------------------------------------------------
export const mockWorkOrdersFull = [
  {
    id: "WO-0001", vehicleId: "RJ 14 GH 3456",
    vehicleName: "Mahindra XUV 700",
    task: "Inspect cooling system & radiator",
    priority: "High", status: "In Progress",
    assignedTo: "Ravi Kumar", eta: "1.5 hrs",
    createdAt: "May 28, 11:00 AM", completedAt: null,
    notes: "Coolant level critically low. Thermostat suspected.",
  },
  {
    id: "WO-0002", vehicleId: "RJ 14 GH 3456",
    vehicleName: "Mahindra XUV 700",
    task: "Check engine oil & filter",
    priority: "High", status: "Open",
    assignedTo: "Sunil Menon", eta: "1.0 hr",
    createdAt: "May 28, 11:05 AM", completedAt: null,
    notes: "",
  },
  {
    id: "WO-0003", vehicleId: "TN 09 IJ 6789",
    vehicleName: "Toyota Innova Crysta",
    task: "Emergency engine cooling repair",
    priority: "High", status: "In Progress",
    assignedTo: "Mohan Das", eta: "3.0 hrs",
    createdAt: "May 28, 08:30 AM", completedAt: null,
    notes: "Engine temp at 112 °C. Critical situation.",
  },
  {
    id: "WO-0004", vehicleId: "TN 09 IJ 6789",
    vehicleName: "Toyota Innova Crysta",
    task: "Battery replacement",
    priority: "High", status: "Open",
    assignedTo: "Unassigned", eta: "1.0 hr",
    createdAt: "May 28, 08:35 AM", completedAt: null,
    notes: "Battery SoC at 58%. Replace before return to fleet.",
  },
  {
    id: "WO-0005", vehicleId: "KL 07 CD 1357",
    vehicleName: "Toyota Fortuner",
    task: "Emergency cooling system overhaul",
    priority: "High", status: "Open",
    assignedTo: "Ravi Kumar", eta: "3.0 hrs",
    createdAt: "May 28, 10:00 AM", completedAt: null,
    notes: "Vehicle in service bay. Awaiting coolant parts.",
  },
  {
    id: "WO-0006", vehicleId: "KL 07 CD 1357",
    vehicleName: "Toyota Fortuner",
    task: "Engine oil & seal replacement",
    priority: "High", status: "Open",
    assignedTo: "Unassigned", eta: "2.0 hrs",
    createdAt: "May 28, 10:05 AM", completedAt: null,
    notes: "",
  },
  {
    id: "WO-0007", vehicleId: "KA 03 CD 5678",
    vehicleName: "Hyundai Creta",
    task: "Inspect cooling system & radiator",
    priority: "High", status: "Open",
    assignedTo: "Sunil Menon", eta: "1.5 hrs",
    createdAt: "May 27, 03:00 PM", completedAt: null,
    notes: "Engine temp recorded at 96 °C over the last 24 h.",
  },
  {
    id: "WO-0008", vehicleId: "PB 10 QR 7788",
    vehicleName: "Volkswagen Polo",
    task: "Engine oil & filter replacement",
    priority: "High", status: "In Progress",
    assignedTo: "Ravi Kumar", eta: "1.5 hrs",
    createdAt: "May 28, 07:00 AM", completedAt: null,
    notes: "",
  },
  {
    id: "WO-0009", vehicleId: "WB 02 OP 5566",
    vehicleName: "Ford EcoSport",
    task: "Cooling system inspection",
    priority: "Medium", status: "Completed",
    assignedTo: "Sunil Menon", eta: "1.0 hr",
    createdAt: "May 27, 09:00 AM", completedAt: "May 27, 10:20 AM",
    notes: "Thermostat replaced. Vehicle cleared for return.",
  },
  {
    id: "WO-0010", vehicleId: "HR 26 WX 4455",
    vehicleName: "Maruti Suzuki Baleno",
    task: "IoT sensor reconnection check",
    priority: "Medium", status: "Open",
    assignedTo: "Mohan Das", eta: "0.5 hr",
    createdAt: "May 27, 08:00 AM", completedAt: null,
    notes: "Vehicle offline since May 26. Telemetry gap needs investigation.",
  },
  {
    id: "WO-0011", vehicleId: "DL 08 EF 9012",
    vehicleName: "Tata Altroz",
    task: "Battery & charging system check",
    priority: "Medium", status: "Open",
    assignedTo: "Unassigned", eta: "0.5 hr",
    createdAt: "May 28, 07:30 AM", completedAt: null,
    notes: "",
  },
  {
    id: "WO-0012", vehicleId: "MH 01 AB 1234",
    vehicleName: "Maruti Suzuki Dzire",
    task: "Scheduled oil & filter change",
    priority: "Low", status: "Completed",
    assignedTo: "Mohan Das", eta: "1.0 hr",
    createdAt: "May 26, 02:00 PM", completedAt: "May 26, 03:15 PM",
    notes: "Routine service completed. Next service: Aug 2026.",
  },
  {
    id: "WO-0013", vehicleId: "MH 43 AB 8899",
    vehicleName: "Hyundai Venue",
    task: "Battery & charging system test",
    priority: "Medium", status: "Completed",
    assignedTo: "Mohan Das", eta: "1.0 hr",
    createdAt: "May 26, 01:00 PM", completedAt: "May 26, 02:10 PM",
    notes: "Battery replaced. Charging confirmed at spec.",
  },
  {
    id: "WO-0014", vehicleId: "UP 32 MN 3344",
    vehicleName: "Kia Seltos",
    task: "Complete in-service inspection",
    priority: "Medium", status: "Cancelled",
    assignedTo: "Ravi Kumar", eta: "2.0 hrs",
    createdAt: "May 25, 10:00 AM", completedAt: null,
    notes: "Owner requested postpone. Rescheduled to next week.",
  },
];

// ---------------------------------------------------------------------------
// maintenanceHistory — used by Maintenance History page.
// ---------------------------------------------------------------------------
export const maintenanceHistory = [
  { id: "MH-001", vehicleId: "MH 01 AB 1234", vehicleName: "Maruti Suzuki Dzire",   date: "May 26, 2026", serviceType: "Oil Change",        technician: "Mohan Das",   duration: "1.0 hr",  cost: "₹1,200", status: "Completed",  odometer: "42,100 km",  notes: "Synthetic oil 5W-30 used."         },
  { id: "MH-002", vehicleId: "WB 02 OP 5566", vehicleName: "Ford EcoSport",          date: "May 27, 2026", serviceType: "Cooling System",     technician: "Sunil Menon", duration: "1.2 hrs", cost: "₹3,800", status: "Completed",  odometer: "88,380 km",  notes: "Thermostat replaced."              },
  { id: "MH-003", vehicleId: "DL 08 EF 9012", vehicleName: "Tata Altroz",            date: "May 27, 2026", serviceType: "Battery Check",      technician: "Mohan Das",   duration: "0.5 hr",  cost: "₹600",   status: "Completed",  odometer: "21,120 km",  notes: "Battery health 86%, within spec." },
  { id: "MH-004", vehicleId: "MH 43 AB 8899", vehicleName: "Hyundai Venue",          date: "May 26, 2026", serviceType: "Battery Replacement",technician: "Mohan Das",   duration: "1.0 hr",  cost: "₹6,500", status: "Completed",  odometer: "44,580 km",  notes: "12V battery replaced."            },
  { id: "MH-005", vehicleId: "KA 03 CD 5678", vehicleName: "Hyundai Creta",          date: "May 27, 2026", serviceType: "Inspection",         technician: "Sunil Menon", duration: "0.8 hr",  cost: "₹900",   status: "Completed",  odometer: "58,870 km",  notes: "Engine temp elevated. Follow-up required." },
  { id: "MH-006", vehicleId: "GJ 05 KL 1122", vehicleName: "Honda City",             date: "May 25, 2026", serviceType: "General Service",    technician: "Ravi Kumar",  duration: "1.5 hrs", cost: "₹2,100", status: "Completed",  odometer: "14,580 km",  notes: "Routine 15k km service."          },
  { id: "MH-007", vehicleId: "MH 12 ST 9900", vehicleName: "Renault Kwid",           date: "May 20, 2026", serviceType: "Oil Change",         technician: "Mohan Das",   duration: "1.0 hr",  cost: "₹1,100", status: "Completed",  odometer: "29,650 km",  notes: ""                                 },
  { id: "MH-008", vehicleId: "HR 26 WX 4455", vehicleName: "Maruti Suzuki Baleno",   date: "May 24, 2026", serviceType: "Sensor Repair",      technician: "Sunil Menon", duration: "0.5 hr",  cost: "₹500",   status: "Completed",  odometer: "67,750 km",  notes: "IoT module firmware reflashed."   },
  { id: "MH-009", vehicleId: "UP 32 MN 3344", vehicleName: "Kia Seltos",             date: "May 22, 2026", serviceType: "Inspection",         technician: "Ravi Kumar",  duration: "2.0 hrs", cost: "₹1,500", status: "Completed",  odometer: "33,150 km",  notes: "Full 30k km inspection passed."   },
  { id: "MH-010", vehicleId: "PB 10 QR 7788", vehicleName: "Volkswagen Polo",        date: "May 28, 2026", serviceType: "Oil Change",         technician: "Ravi Kumar",  duration: "1.5 hrs", cost: "₹1,400", status: "In Progress",odometer: "1,04,050 km", notes: "In service bay."                  },
  { id: "MH-011", vehicleId: "TN 09 IJ 6789", vehicleName: "Toyota Innova Crysta",   date: "May 28, 2026", serviceType: "Cooling System",     technician: "Mohan Das",   duration: "3.0 hrs", cost: "₹8,200", status: "In Progress",odometer: "1,12,770 km", notes: "Emergency repair. Engine temp 112°C." },
  { id: "MH-012", vehicleId: "RJ 14 GH 3456", vehicleName: "Mahindra XUV 700",       date: "May 28, 2026", serviceType: "Full Inspection",    technician: "Ravi Kumar",  duration: "1.5 hrs", cost: "₹2,000", status: "In Progress",odometer: "76,290 km",  notes: "Cooling & oil under inspection."  },
];

// ---------------------------------------------------------------------------
// shapData — SHAP feature contributions used by Explainability page.
// contribution > 0 means the feature INCREASES failure risk (red/bad),
// contribution < 0 means it DECREASES failure risk (green/good).
// ---------------------------------------------------------------------------
export const shapData = {
  "KL 07 CD 1357": { confidence: 0.91, baseRisk: 8,
    features: [
      { name: "Engine Temperature", contribution:  0.38 },
      { name: "Oil Pressure",       contribution:  0.31 },
      { name: "Vibration Level",    contribution:  0.22 },
      { name: "Battery State",      contribution:  0.15 },
      { name: "Odometer",           contribution:  0.10 },
      { name: "Service Interval",   contribution:  0.08 },
      { name: "Vehicle Age",        contribution:  0.06 },
    ],
  },
  "TN 09 IJ 6789": { confidence: 0.89, baseRisk: 8,
    features: [
      { name: "Engine Temperature", contribution:  0.36 },
      { name: "Vibration Level",    contribution:  0.28 },
      { name: "Oil Pressure",       contribution:  0.24 },
      { name: "Battery State",      contribution:  0.18 },
      { name: "Odometer",           contribution:  0.09 },
      { name: "Service Interval",   contribution:  0.07 },
      { name: "Vehicle Age",        contribution:  0.07 },
    ],
  },
  "RJ 14 GH 3456": { confidence: 0.87, baseRisk: 8,
    features: [
      { name: "Engine Temperature", contribution:  0.32 },
      { name: "Oil Pressure",       contribution:  0.26 },
      { name: "Vibration Level",    contribution:  0.18 },
      { name: "Battery State",      contribution:  0.12 },
      { name: "Odometer",           contribution:  0.09 },
      { name: "Service Interval",   contribution:  0.07 },
      { name: "Vehicle Age",        contribution:  0.05 },
    ],
  },
  "PB 10 QR 7788": { confidence: 0.84, baseRisk: 8,
    features: [
      { name: "Engine Temperature", contribution:  0.25 },
      { name: "Oil Pressure",       contribution:  0.18 },
      { name: "Vibration Level",    contribution:  0.15 },
      { name: "Battery State",      contribution:  0.12 },
      { name: "Odometer",           contribution:  0.08 },
      { name: "Service Interval",   contribution:  0.06 },
      { name: "Vehicle Age",        contribution:  0.05 },
    ],
  },
  "WB 02 OP 5566": { confidence: 0.80, baseRisk: 8,
    features: [
      { name: "Engine Temperature", contribution:  0.18 },
      { name: "Vibration Level",    contribution:  0.14 },
      { name: "Battery State",      contribution:  0.10 },
      { name: "Vehicle Age",        contribution:  0.06 },
      { name: "Odometer",           contribution:  0.08 },
      { name: "Service Interval",   contribution:  0.05 },
      { name: "Oil Pressure",       contribution: -0.03 },
    ],
  },
  "HR 26 WX 4455": { confidence: 0.79, baseRisk: 8,
    features: [
      { name: "Battery State",      contribution:  0.15 },
      { name: "Engine Temperature", contribution:  0.08 },
      { name: "Service Interval",   contribution:  0.07 },
      { name: "Odometer",           contribution:  0.06 },
      { name: "Vehicle Age",        contribution:  0.05 },
      { name: "Vibration Level",    contribution:  0.04 },
      { name: "Oil Pressure",       contribution: -0.05 },
    ],
  },
  "KA 03 CD 5678": { confidence: 0.78, baseRisk: 8,
    features: [
      { name: "Engine Temperature", contribution:  0.14 },
      { name: "Vibration Level",    contribution:  0.10 },
      { name: "Battery State",      contribution:  0.08 },
      { name: "Odometer",           contribution:  0.06 },
      { name: "Service Interval",   contribution:  0.03 },
      { name: "Vehicle Age",        contribution:  0.05 },
      { name: "Oil Pressure",       contribution:  0.04 },
    ],
  },
  "MH 43 AB 8899": { confidence: 0.76, baseRisk: 8,
    features: [
      { name: "Battery State",      contribution:  0.10 },
      { name: "Engine Temperature", contribution:  0.07 },
      { name: "Vibration Level",    contribution:  0.06 },
      { name: "Odometer",           contribution:  0.05 },
      { name: "Vehicle Age",        contribution:  0.04 },
      { name: "Service Interval",   contribution: -0.02 },
      { name: "Oil Pressure",       contribution: -0.04 },
    ],
  },
  "UP 32 MN 3344": { confidence: 0.78, baseRisk: 8,
    features: [
      { name: "Engine Temperature", contribution:  0.04 },
      { name: "Battery State",      contribution:  0.04 },
      { name: "Vibration Level",    contribution:  0.03 },
      { name: "Odometer",           contribution:  0.02 },
      { name: "Vehicle Age",        contribution:  0.02 },
      { name: "Service Interval",   contribution: -0.02 },
      { name: "Oil Pressure",       contribution: -0.05 },
    ],
  },
  "DL 08 EF 9012": { confidence: 0.80, baseRisk: 8,
    features: [
      { name: "Battery State",      contribution:  0.06 },
      { name: "Engine Temperature", contribution:  0.03 },
      { name: "Vibration Level",    contribution:  0.03 },
      { name: "Odometer",           contribution:  0.02 },
      { name: "Vehicle Age",        contribution:  0.01 },
      { name: "Service Interval",   contribution: -0.03 },
      { name: "Oil Pressure",       contribution: -0.06 },
    ],
  },
  "AP 16 UV 2233": { confidence: 0.82, baseRisk: 8,
    features: [
      { name: "Engine Temperature", contribution:  0.03 },
      { name: "Battery State",      contribution:  0.02 },
      { name: "Vibration Level",    contribution:  0.02 },
      { name: "Odometer",           contribution:  0.01 },
      { name: "Vehicle Age",        contribution:  0.01 },
      { name: "Service Interval",   contribution: -0.04 },
      { name: "Oil Pressure",       contribution: -0.06 },
    ],
  },
  "MH 01 AB 1234": { confidence: 0.83, baseRisk: 8,
    features: [
      { name: "Engine Temperature", contribution:  0.02 },
      { name: "Battery State",      contribution:  0.02 },
      { name: "Vehicle Age",        contribution:  0.02 },
      { name: "Vibration Level",    contribution:  0.01 },
      { name: "Odometer",           contribution:  0.01 },
      { name: "Service Interval",   contribution: -0.03 },
      { name: "Oil Pressure",       contribution: -0.07 },
    ],
  },
  "MH 12 ST 9900": { confidence: 0.85, baseRisk: 8,
    features: [
      { name: "Engine Temperature", contribution:  0.02 },
      { name: "Vehicle Age",        contribution:  0.02 },
      { name: "Vibration Level",    contribution:  0.01 },
      { name: "Odometer",           contribution:  0.01 },
      { name: "Battery State",      contribution: -0.02 },
      { name: "Service Interval",   contribution: -0.04 },
      { name: "Oil Pressure",       contribution: -0.07 },
    ],
  },
  "GJ 05 KL 1122": { confidence: 0.87, baseRisk: 8,
    features: [
      { name: "Engine Temperature", contribution:  0.01 },
      { name: "Vibration Level",    contribution:  0.01 },
      { name: "Odometer",           contribution:  0.01 },
      { name: "Vehicle Age",        contribution: -0.01 },
      { name: "Battery State",      contribution: -0.04 },
      { name: "Service Interval",   contribution: -0.05 },
      { name: "Oil Pressure",       contribution: -0.08 },
    ],
  },
  "CG 04 YZ 6677": { confidence: 0.90, baseRisk: 8,
    features: [
      { name: "Motor Temperature",  contribution: -0.02 },
      { name: "Vibration Level",    contribution: -0.01 },
      { name: "Odometer",           contribution: -0.01 },
      { name: "Coolant Pressure",   contribution: -0.02 },
      { name: "Vehicle Age",        contribution: -0.01 },
      { name: "Service Interval",   contribution: -0.05 },
      { name: "Battery SoC",        contribution: -0.10 },
    ],
  },
};

// ---------------------------------------------------------------------------
// maintenanceTasks — scheduled/preventive maintenance tasks.
// ---------------------------------------------------------------------------
export const maintenanceTasks = [
  { id: "MT-001", vehicleId: "RJ 14 GH 3456", vehicleName: "Mahindra XUV 700",      task: "Full engine diagnostic scan",         type: "Corrective",  dueDate: "May 29, 2026", priority: "High",   status: "Overdue",      assignedTo: "Ravi Kumar"  },
  { id: "MT-002", vehicleId: "TN 09 IJ 6789", vehicleName: "Toyota Innova Crysta",  task: "Radiator flush & coolant top-up",      type: "Corrective",  dueDate: "May 28, 2026", priority: "High",   status: "Overdue",      assignedTo: "Mohan Das"   },
  { id: "MT-003", vehicleId: "KL 07 CD 1357", vehicleName: "Toyota Fortuner",        task: "Engine overhaul pre-check",            type: "Corrective",  dueDate: "May 29, 2026", priority: "High",   status: "Due Today",    assignedTo: "Ravi Kumar"  },
  { id: "MT-004", vehicleId: "PB 10 QR 7788", vehicleName: "Volkswagen Polo",        task: "30k km full service",                  type: "Preventive",  dueDate: "May 30, 2026", priority: "High",   status: "Due Today",    assignedTo: "Sunil Menon" },
  { id: "MT-005", vehicleId: "KA 03 CD 5678", vehicleName: "Hyundai Creta",          task: "Coolant system flush",                 type: "Preventive",  dueDate: "Jun 01, 2026", priority: "Medium", status: "Upcoming",     assignedTo: "Sunil Menon" },
  { id: "MT-006", vehicleId: "WB 02 OP 5566", vehicleName: "Ford EcoSport",          task: "Suspension & vibration inspection",    type: "Preventive",  dueDate: "Jun 02, 2026", priority: "Medium", status: "Upcoming",     assignedTo: "Mohan Das"   },
  { id: "MT-007", vehicleId: "HR 26 WX 4455", vehicleName: "Maruti Suzuki Baleno",   task: "IoT sensor full diagnostic",           type: "Corrective",  dueDate: "Jun 03, 2026", priority: "Medium", status: "Upcoming",     assignedTo: "Sunil Menon" },
  { id: "MT-008", vehicleId: "DL 08 EF 9012", vehicleName: "Tata Altroz",            task: "Battery health assessment",            type: "Preventive",  dueDate: "Jun 05, 2026", priority: "Low",    status: "Upcoming",     assignedTo: "Unassigned"  },
  { id: "MT-009", vehicleId: "MH 01 AB 1234", vehicleName: "Maruti Suzuki Dzire",    task: "Tyre rotation & alignment",            type: "Preventive",  dueDate: "Jun 10, 2026", priority: "Low",    status: "Upcoming",     assignedTo: "Mohan Das"   },
  { id: "MT-010", vehicleId: "GJ 05 KL 1122", vehicleName: "Honda City",             task: "Air filter replacement",               type: "Preventive",  dueDate: "Jul 01, 2026", priority: "Low",    status: "Upcoming",     assignedTo: "Unassigned"  },
  { id: "MT-011", vehicleId: "MH 43 AB 8899", vehicleName: "Hyundai Venue",          task: "Brake pad & fluid check",              type: "Preventive",  dueDate: "May 22, 2026", priority: "Medium", status: "Completed",    assignedTo: "Mohan Das"   },
  { id: "MT-012", vehicleId: "UP 32 MN 3344", vehicleName: "Kia Seltos",             task: "30k km scheduled inspection",          type: "Inspection",  dueDate: "May 22, 2026", priority: "Medium", status: "Completed",    assignedTo: "Ravi Kumar"  },
];

// ---------------------------------------------------------------------------
// partsInventory — used by Parts & Inventory page.
// ---------------------------------------------------------------------------
export const partsInventory = [
  { id: "P-001", name: "Engine Oil 5W-30 (1L)",       category: "Engine",    unit: "Litre",  stock: 42, reorderLevel: 20, unitCost: "₹280",   supplier: "Castrol",   status: "In Stock"   },
  { id: "P-002", name: "Oil Filter (Universal)",       category: "Filters",   unit: "Piece",  stock: 18, reorderLevel: 10, unitCost: "₹320",   supplier: "Bosch",     status: "In Stock"   },
  { id: "P-003", name: "Air Filter (Paper)",           category: "Filters",   unit: "Piece",  stock: 7,  reorderLevel: 8,  unitCost: "₹180",   supplier: "K&N",       status: "Low Stock"  },
  { id: "P-004", name: "Coolant 50:50 Pre-mix (1L)",  category: "Cooling",   unit: "Litre",  stock: 3,  reorderLevel: 15, unitCost: "₹220",   supplier: "Prestone",  status: "Low Stock"  },
  { id: "P-005", name: "Thermostat (Universal)",       category: "Cooling",   unit: "Piece",  stock: 0,  reorderLevel: 5,  unitCost: "₹650",   supplier: "Mopar",     status: "Out of Stock"},
  { id: "P-006", name: "12V Car Battery (60Ah)",       category: "Electrical",unit: "Piece",  stock: 4,  reorderLevel: 3,  unitCost: "₹4,800", supplier: "Amara Raja","status": "In Stock"  },
  { id: "P-007", name: "Brake Pads (Front Set)",       category: "Brakes",    unit: "Set",    stock: 10, reorderLevel: 5,  unitCost: "₹1,200", supplier: "Brembo",    status: "In Stock"   },
  { id: "P-008", name: "Brake Fluid DOT 4 (500ml)",   category: "Brakes",    unit: "Bottle", stock: 6,  reorderLevel: 4,  unitCost: "₹350",   supplier: "Motul",     status: "In Stock"   },
  { id: "P-009", name: "Spark Plug (NGK Iridium)",    category: "Engine",    unit: "Piece",  stock: 24, reorderLevel: 12, unitCost: "₹420",   supplier: "NGK",       status: "In Stock"   },
  { id: "P-010", name: "Cabin Air Filter",             category: "Filters",   unit: "Piece",  stock: 5,  reorderLevel: 6,  unitCost: "₹280",   supplier: "Denso",     status: "Low Stock"  },
  { id: "P-011", name: "Power Steering Fluid (1L)",   category: "Fluids",    unit: "Litre",  stock: 8,  reorderLevel: 5,  unitCost: "₹340",   supplier: "Prestone",  status: "In Stock"   },
  { id: "P-012", name: "Transmission Fluid (1L)",     category: "Fluids",    unit: "Litre",  stock: 12, reorderLevel: 6,  unitCost: "₹480",   supplier: "Castrol",   status: "In Stock"   },
  { id: "P-013", name: "Shock Absorber (Rear Pair)",  category: "Suspension",unit: "Pair",   stock: 2,  reorderLevel: 2,  unitCost: "₹3,200", supplier: "Monroe",    status: "Low Stock"  },
  { id: "P-014", name: "Wiper Blade (Standard)",      category: "Body",      unit: "Piece",  stock: 14, reorderLevel: 8,  unitCost: "₹280",   supplier: "Bosch",     status: "In Stock"   },
  { id: "P-015", name: "IoT OBD-II Module",           category: "Electrical",unit: "Piece",  stock: 3,  reorderLevel: 3,  unitCost: "₹2,200", supplier: "Teltonika", status: "Low Stock"  },
  { id: "P-016", name: "Fuel Filter",                 category: "Filters",   unit: "Piece",  stock: 9,  reorderLevel: 5,  unitCost: "₹380",   supplier: "Bosch",     status: "In Stock"   },
  { id: "P-017", name: "Alternator Belt",             category: "Engine",    unit: "Piece",  stock: 0,  reorderLevel: 4,  unitCost: "₹520",   supplier: "Gates",     status: "Out of Stock"},
  { id: "P-018", name: "Radiator Cap",                category: "Cooling",   unit: "Piece",  stock: 5,  reorderLevel: 3,  unitCost: "₹180",   supplier: "Gates",     status: "In Stock"   },
  { id: "P-019", name: "Tyre (185/65 R15)",           category: "Tyres",     unit: "Piece",  stock: 8,  reorderLevel: 4,  unitCost: "₹4,200", supplier: "MRF",       status: "In Stock"   },
  { id: "P-020", name: "Engine Gasket Set",           category: "Engine",    unit: "Set",    stock: 1,  reorderLevel: 2,  unitCost: "₹1,800", supplier: "Elring",    status: "Low Stock"  },
];

// ---------------------------------------------------------------------------
// serviceReports — used by Service Reports page.
// ---------------------------------------------------------------------------
export const serviceReports = [
  { id: "SR-001", vehicleId: "WB 02 OP 5566", vehicleName: "Ford EcoSport",         type: "Corrective",  date: "May 27, 2026", technician: "Sunil Menon", status: "Completed", orderId: "WO-0009", laborCost: "₹900",   partsCost: "₹650",   totalCost: "₹1,550", findings: "Engine temp elevated due to failed thermostat.", recommendations: "Recommend coolant flush every 40k km.", },
  { id: "SR-002", vehicleId: "MH 01 AB 1234", vehicleName: "Maruti Suzuki Dzire",   type: "Preventive",  date: "May 26, 2026", technician: "Mohan Das",   status: "Completed", orderId: "WO-0012", laborCost: "₹400",   partsCost: "₹800",   totalCost: "₹1,200", findings: "All systems within normal range.", recommendations: "Next service due at 44,000 km.",         },
  { id: "SR-003", vehicleId: "MH 43 AB 8899", vehicleName: "Hyundai Venue",         type: "Corrective",  date: "May 26, 2026", technician: "Mohan Das",   status: "Completed", orderId: "WO-0013", laborCost: "₹500",   partsCost: "₹6,000", totalCost: "₹6,500", findings: "Battery SoC declining below threshold.", recommendations: "Consider EFB battery upgrade for longevity.", },
  { id: "SR-004", vehicleId: "RJ 14 GH 3456", vehicleName: "Mahindra XUV 700",      type: "Corrective",  date: "May 28, 2026", technician: "Ravi Kumar",  status: "Pending",   orderId: "WO-0001", laborCost: "—",       partsCost: "—",       totalCost: "—",       findings: "Work order in progress. Awaiting completion.",  recommendations: "—",                                       },
  { id: "SR-005", vehicleId: "TN 09 IJ 6789", vehicleName: "Toyota Innova Crysta",  type: "Corrective",  date: "May 28, 2026", technician: "Mohan Das",   status: "Pending",   orderId: "WO-0003", laborCost: "—",       partsCost: "—",       totalCost: "—",       findings: "Emergency engine cooling repair underway.",      recommendations: "—",                                       },
  { id: "SR-006", vehicleId: "KA 03 CD 5678", vehicleName: "Hyundai Creta",         type: "Inspection",  date: "May 27, 2026", technician: "Sunil Menon", status: "Completed", orderId: "WO-0007", laborCost: "₹600",   partsCost: "₹0",     totalCost: "₹600",   findings: "Engine temp 96°C — above threshold. Vibration 3.2 mm/s.", recommendations: "Schedule full cooling system service immediately.", },
  { id: "SR-007", vehicleId: "GJ 05 KL 1122", vehicleName: "Honda City",            type: "Preventive",  date: "May 25, 2026", technician: "Ravi Kumar",  status: "Completed", orderId: null,      laborCost: "₹800",   partsCost: "₹1,300", totalCost: "₹2,100", findings: "All systems healthy. Routine 15k km service completed.", recommendations: "Next service at 30k km.",                 },
  { id: "SR-008", vehicleId: "HR 26 WX 4455", vehicleName: "Maruti Suzuki Baleno",  type: "Corrective",  date: "May 24, 2026", technician: "Sunil Menon", status: "Completed", orderId: "WO-0010", laborCost: "₹400",   partsCost: "₹100",   totalCost: "₹500",   findings: "IoT module firmware corrupted. Reflashed successfully.", recommendations: "Monitor connectivity for next 72 h.", },
];


