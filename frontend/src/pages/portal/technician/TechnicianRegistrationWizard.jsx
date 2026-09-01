import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Check,
  Bell,
  User,
  Briefcase,
  Wrench,
  Calendar,
  CreditCard,
  FileText,
  ClipboardCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Upload,
  X,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";

/* ─────────────────────────────────────────────
   STEP DEFINITIONS
   ───────────────────────────────────────────── */
const STEPS = [
  { key: "personal",    label: "Personal Details",       icon: User },
  { key: "experience",  label: "Experience",              icon: Briefcase },
  { key: "skills",      label: "Skills & Services",       icon: Wrench },
  { key: "availability",label: "Availability",            icon: Calendar },
  { key: "payment",     label: "Payment & Preferences",   icon: CreditCard },
  { key: "documents",   label: "Documents",               icon: FileText },
  { key: "review",      label: "Review",                  icon: ClipboardCheck },
];

/* ─────────────────────────────────────────────
   HELPER: SHARED INPUT / LABEL
   ───────────────────────────────────────────── */
function Label({ children, required }) {
  return (
    <label className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-neutral-500">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

function Input({ id, type = "text", value, onChange, placeholder, error, disabled, min, max, step, className = "" }) {
  return (
    <>
      <input
        id={id}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={`w-full rounded-lg border px-3 py-2.5 text-[13.5px] text-neutral-800 outline-none transition focus:ring-2 focus:ring-blue-200 ${
          error ? "border-red-400 focus:border-red-400" : "border-neutral-200 focus:border-blue-400"
        } ${disabled ? "bg-neutral-50 text-neutral-400" : "bg-white"} ${className}`}
      />
      {error && <p className="mt-1 text-[11.5px] text-red-500">{error}</p>}
    </>
  );
}

function Select({ id, value, onChange, options, placeholder, error }) {
  return (
    <>
      <select
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-3 py-2.5 text-[13.5px] text-neutral-800 outline-none transition focus:ring-2 focus:ring-blue-200 ${
          error ? "border-red-400 focus:border-red-400" : "border-neutral-200 focus:border-blue-400"
        } bg-white`}
      >
        <option value="">{placeholder || "Select…"}</option>
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.label ?? o}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-[11.5px] text-red-500">{error}</p>}
    </>
  );
}

function Textarea({ id, value, onChange, placeholder, rows = 3, error }) {
  return (
    <>
      <textarea
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full resize-none rounded-lg border px-3 py-2.5 text-[13.5px] text-neutral-800 outline-none transition focus:ring-2 focus:ring-blue-200 ${
          error ? "border-red-400 focus:border-red-400" : "border-neutral-200 focus:border-blue-400"
        } bg-white`}
      />
      {error && <p className="mt-1 text-[11.5px] text-red-500">{error}</p>}
    </>
  );
}

function PhoneInput({ id, value, onChange, error }) {
  return (
    <>
      <div className={`flex overflow-hidden rounded-lg border transition focus-within:ring-2 focus-within:ring-blue-200 ${error ? "border-red-400" : "border-neutral-200 focus-within:border-blue-400"}`}>
        <span className="flex items-center bg-neutral-50 px-3 text-[13px] font-medium text-neutral-500 border-r border-neutral-200">
          🇮🇳 +91
        </span>
        <input
          id={id}
          type="tel"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="98765 43210"
          maxLength={10}
          className="flex-1 bg-white px-3 py-2.5 text-[13.5px] text-neutral-800 outline-none"
        />
      </div>
      {error && <p className="mt-1 text-[11.5px] text-red-500">{error}</p>}
    </>
  );
}

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition ${
        selected
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-neutral-200 bg-white text-neutral-600 hover:border-blue-300 hover:text-blue-600"
      }`}
    >
      {label}
    </button>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="rounded-xl border border-neutral-100 bg-white p-5 shadow-sm">
      {title && <p className="mb-4 text-[14px] font-bold text-neutral-800">{title}</p>}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 1: PERSONAL DETAILS
   ───────────────────────────────────────────── */
function StepPersonal({ data, onChange, errors }) {
  const f = (key) => ({
    id: `personal-${key}`,
    value: data[key],
    onChange: (v) => onChange({ [key]: v }),
    error: errors[key],
  });

  return (
    <div className="space-y-5">
      <SectionCard title="Basic Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label required>Full Name</Label>
            <Input {...f("fullName")} placeholder="Ravi Kumar" />
          </div>
          <div>
            <Label required>Date of Birth</Label>
            <Input {...f("dob")} type="date" />
          </div>
          <div>
            <Label required>Email Address</Label>
            <Input {...f("email")} type="email" placeholder="ravi@example.com" />
          </div>
          <div>
            <Label required>Phone Number</Label>
            <PhoneInput {...f("phone")} />
          </div>
          <div>
            <Label required>Gender</Label>
            <Select {...f("gender")} options={["Male", "Female", "Non-binary", "Prefer not to say"]} placeholder="Select gender" />
          </div>
          <div>
            <Label required>Nationality</Label>
            <Input {...f("nationality")} placeholder="Indian" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Address">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label required>Full Address</Label>
            <Textarea {...f("address")} placeholder="House / Flat No., Street, Locality" rows={2} />
          </div>
          <div>
            <Label required>City</Label>
            <Input {...f("city")} placeholder="Bengaluru" />
          </div>
          <div>
            <Label required>State / Province</Label>
            <Select {...f("state")} placeholder="Select state" options={[
              "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
              "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
              "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
              "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
              "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli","Daman & Diu","Lakshadweep","Puducherry"
            ]} />
          </div>
          <div>
            <Label required>Pincode / ZIP Code</Label>
            <Input {...f("pincode")} placeholder="560001" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Emergency Contact">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label required>Emergency Contact Name</Label>
            <Input {...f("emergencyName")} placeholder="Family member / friend" />
          </div>
          <div>
            <Label required>Emergency Contact Number</Label>
            <PhoneInput {...f("emergencyPhone")} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Identity Documents (Optional)">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Aadhaar / ID Number</Label>
            <Input {...f("aadhaar")} placeholder="XXXX XXXX XXXX" />
          </div>
          <div>
            <Label>PAN Number</Label>
            <Input {...f("pan")} placeholder="ABCDE1234F" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 2: EXPERIENCE
   ───────────────────────────────────────────── */
const VEHICLE_BRANDS = ["Maruti Suzuki","Hyundai","Tata Motors","Mahindra","Honda","Toyota","Ford","Kia",
  "Renault","Volkswagen","Skoda","MG","Jeep","Nissan","BMW","Mercedes-Benz","Audi","Hero","Bajaj","TVS"];
const VEHICLE_TYPES  = ["Sedan","Hatchback","SUV","MUV","Pickup Truck","Commercial Van","Two-Wheeler","Three-Wheeler","Electric Vehicle","Heavy Vehicle"];
const CERTIFICATIONS = ["ASE Certified","ISO 9001:2015","ICAT Certified","Bosch Trained","Delphi Trained","Denso Trained","OEM Dealer Certified","EV Technician Certified","No Certification"];

function StepExperience({ data, onChange, errors }) {
  const f = (key) => ({
    id: `exp-${key}`,
    value: data[key],
    onChange: (v) => onChange({ [key]: v }),
    error: errors[key],
  });

  function toggleArr(key, item) {
    const arr = data[key] || [];
    const next = arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
    onChange({ [key]: next });
  }

  return (
    <div className="space-y-5">
      <SectionCard title="Work Experience">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label required>Years of Experience</Label>
            <Input {...f("yearsExp")} type="number" min="0" max="50" placeholder="e.g. 5" />
          </div>
          <div>
            <Label required>Current / Previous Role</Label>
            <Select {...f("role")} placeholder="Select role" options={[
              "Apprentice Technician","Junior Technician","Technician","Senior Technician",
              "Lead Technician","Workshop Supervisor","Fleet Maintenance Engineer","EV Specialist","Freelance Technician"
            ]} />
          </div>
          <div>
            <Label>Previous Company / Workshop</Label>
            <Input {...f("prevCompany")} placeholder="e.g. Tata Motors Workshop" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Vehicle Brands Worked With">
        {errors.brands && <p className="mb-2 text-[11.5px] text-red-500">{errors.brands}</p>}
        <div className="flex flex-wrap gap-2">
          {VEHICLE_BRANDS.map((b) => (
            <Chip key={b} label={b} selected={(data.brands || []).includes(b)} onClick={() => toggleArr("brands", b)} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Vehicle Types Worked With">
        <div className="flex flex-wrap gap-2">
          {VEHICLE_TYPES.map((t) => (
            <Chip key={t} label={t} selected={(data.vehicleTypes || []).includes(t)} onClick={() => toggleArr("vehicleTypes", t)} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Certifications">
        <div className="flex flex-wrap gap-2">
          {CERTIFICATIONS.map((c) => (
            <Chip key={c} label={c} selected={(data.certifications || []).includes(c)} onClick={() => toggleArr("certifications", c)} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Professional Summary">
        <div>
          <Label required>Short Bio / Summary</Label>
          <Textarea
            id="exp-summary"
            value={data.summary}
            onChange={(v) => onChange({ summary: v })}
            placeholder="Briefly describe your experience, expertise and approach…"
            rows={4}
            error={errors.summary}
          />
          <p className="mt-1 text-[11px] text-neutral-400">
            {(data.summary || "").length} / 500 characters
          </p>
        </div>
      </SectionCard>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 3: SKILLS & SERVICES
   ───────────────────────────────────────────── */
const ALL_SKILLS = [
  "Vehicle Diagnostics","Engine Overhaul","Transmission Repair","Brake System","Suspension & Steering",
  "Electrical Systems","Battery & Charging","AC & Climate Control","Fuel System","Exhaust System",
  "Tyre & Wheel","Bodywork & Denting","Painting & Finishing","Welding","OBD-II Scanning",
  "ECU Reprogramming","Hybrid / EV Maintenance","PDI & Quality Check","Preventive Maintenance",
];

const ALL_SERVICES = [
  "Routine Servicing","Oil & Filter Change","Brake Pad Replacement","Coolant Flush","Wheel Alignment",
  "Tyre Rotation","Spark Plug Replacement","Battery Replacement","AC Regas","Suspension Inspection",
  "Pre-Purchase Inspection","Post-Accident Inspection","Emergency Roadside","Fleet Maintenance",
];

const VEHICLE_EXPERTISE = [
  "Petrol Engines","Diesel Engines","CNG Vehicles","Hybrid Vehicles","Electric Vehicles (BEV)",
  "Commercial Trucks","Two-Wheelers","Three-Wheelers","SUV / 4x4","Classic & Vintage",
];

function StepSkills({ data, onChange, errors }) {
  function toggleArr(key, item) {
    const arr = data[key] || [];
    const next = arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
    onChange({ [key]: next });
  }

  return (
    <div className="space-y-5">
      {errors._skills && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-[12.5px] text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" /> {errors._skills}
        </div>
      )}

      <SectionCard title="Primary Skills">
        <p className="mb-3 text-[12px] text-neutral-400">Select all skills you are proficient in.</p>
        <div className="flex flex-wrap gap-2">
          {ALL_SKILLS.map((s) => (
            <Chip key={s} label={s} selected={(data.skills || []).includes(s)} onClick={() => toggleArr("skills", s)} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Services Offered">
        <p className="mb-3 text-[12px] text-neutral-400">Select services you can perform.</p>
        <div className="flex flex-wrap gap-2">
          {ALL_SERVICES.map((s) => (
            <Chip key={s} label={s} selected={(data.services || []).includes(s)} onClick={() => toggleArr("services", s)} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Vehicle Type Expertise">
        <div className="flex flex-wrap gap-2">
          {VEHICLE_EXPERTISE.map((v) => (
            <Chip key={v} label={v} selected={(data.expertise || []).includes(v)} onClick={() => toggleArr("expertise", v)} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 4: AVAILABILITY
   ───────────────────────────────────────────── */
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function StepAvailability({ data, onChange, errors }) {
  function toggleDay(day) {
    const days = data.workDays || [];
    const next = days.includes(day) ? days.filter((d) => d !== day) : [...days, day];
    onChange({ workDays: next });
  }

  return (
    <div className="space-y-5">
      <SectionCard title="Working Days">
        {errors.workDays && <p className="mb-2 text-[11.5px] text-red-500">{errors.workDays}</p>}
        <div className="flex flex-wrap gap-2">
          {DAYS.map((d) => (
            <Chip key={d} label={d} selected={(data.workDays || []).includes(d)} onClick={() => toggleDay(d)} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Working Hours">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label required>Start Time</Label>
            <Input
              id="avail-start"
              type="time"
              value={data.startTime}
              onChange={(v) => onChange({ startTime: v })}
              error={errors.startTime}
            />
          </div>
          <div>
            <Label required>End Time</Label>
            <Input
              id="avail-end"
              type="time"
              value={data.endTime}
              onChange={(v) => onChange({ endTime: v })}
              error={errors.endTime}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Availability Type">
        <div>
          <Label required>Work Arrangement</Label>
          <Select
            id="avail-type"
            value={data.availType}
            onChange={(v) => onChange({ availType: v })}
            options={["Full-Time","Part-Time","Freelance / On-Call","Contract","Weekend Only"]}
            placeholder="Select arrangement"
            error={errors.availType}
          />
        </div>
      </SectionCard>

      <SectionCard title="Emergency / Urgent Service">
        <div className="flex items-center gap-3">
          {/* Toggle: w-11(44px) h-6(24px), knob: w-5(20px) h-5(20px)
               OFF → translate-x-[2px]; ON → translate-x-[22px] (44-20-2=22)
               Knob stays fully inside the track at all times. */}
          <button
            type="button"
            role="switch"
            aria-checked={!!data.emergencyAvail}
            onClick={() => onChange({ emergencyAvail: !data.emergencyAvail })}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ${
              data.emergencyAvail ? "bg-blue-600" : "bg-neutral-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                data.emergencyAvail ? "translate-x-[22px]" : "translate-x-[2px]"
              }`}
              style={{ marginTop: "2px" }}
            />
          </button>
          <div>
            <p className="text-[13px] font-semibold text-neutral-800">Available for emergency callouts</p>
            <p className="text-[11.5px] text-neutral-400">Can respond to urgent vehicle breakdowns outside working hours</p>
          </div>
        </div>
        {data.emergencyAvail && (
          <div className="mt-4">
            <Label>Emergency Response Time</Label>
            <Select
              id="avail-response"
              value={data.responseTime}
              onChange={(v) => onChange({ responseTime: v })}
              options={["Within 30 minutes","Within 1 hour","Within 2 hours","Within 4 hours","Next working day"]}
              placeholder="Select response window"
            />
          </div>
        )}
      </SectionCard>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 5: PAYMENT & PREFERENCES
   ───────────────────────────────────────────── */
function StepPayment({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <SectionCard title="Payment Preferences">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label required>Preferred Payment Method</Label>
            <Select
              id="pay-method"
              value={data.payMethod}
              onChange={(v) => onChange({ payMethod: v })}
              options={["Bank Transfer (NEFT/IMPS)","UPI","Cheque","Cash","Wallet"]}
              placeholder="Select method"
              error={errors.payMethod}
            />
          </div>
          <div>
            <Label required>Payment Frequency</Label>
            <Select
              id="pay-freq"
              value={data.payFreq}
              onChange={(v) => onChange({ payFreq: v })}
              options={["Daily","Weekly","Bi-weekly","Monthly","Per Job"]}
              placeholder="Select frequency"
              error={errors.payFreq}
            />
          </div>
          <div>
            <Label>UPI ID (if applicable)</Label>
            <Input
              id="pay-upi"
              value={data.upiId}
              onChange={(v) => onChange({ upiId: v })}
              placeholder="yourname@upi"
            />
          </div>
          <div>
            <Label>Bank Account Number (last 4 digits)</Label>
            <Input
              id="pay-bank"
              value={data.bankLast4}
              onChange={(v) => onChange({ bankLast4: v.replace(/\D/g, "").slice(0, 4) })}
              placeholder="XXXX"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Service Area & Radius">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label required>Preferred Service Radius (km)</Label>
            <Select
              id="pay-radius"
              value={data.serviceRadius}
              onChange={(v) => onChange({ serviceRadius: v })}
              options={["5 km","10 km","15 km","25 km","50 km","100 km","Pan-City","Pan-State"]}
              placeholder="Select radius"
              error={errors.serviceRadius}
            />
          </div>
          <div>
            <Label>Preferred Work Location</Label>
            <Select
              id="pay-worktype"
              value={data.workLocation}
              onChange={(v) => onChange({ workLocation: v })}
              options={["Workshop / Garage","Mobile / On-site","Both"]}
              placeholder="Select location type"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Notification Preferences">
        {[
          { key: "notifNewJob",    label: "New job assignments",       sub: "Get notified when a new work order is assigned" },
          { key: "notifReminders", label: "Task reminders",            sub: "Reminders for upcoming and overdue maintenance" },
          { key: "notifPayment",   label: "Payment notifications",     sub: "Alerts when payments are processed" },
          { key: "notifUpdates",   label: "Portal updates & news",     sub: "Product announcements from DriveGuard AI" },
        ].map(({ key, label, sub }) => (
          <div key={key} className="flex items-center justify-between gap-4 py-2.5 border-b border-neutral-100 last:border-0">
            <div>
              <p className="text-[13px] font-semibold text-neutral-800">{label}</p>
              <p className="text-[11.5px] text-neutral-400">{sub}</p>
            </div>
            {/* Toggle: w-11(44px) h-6(24px), knob: w-5 h-5
                 OFF → knob at 2px left; ON → knob at 22px (44-20-2) */}
            <button
              type="button"
              role="switch"
              aria-checked={!!data[key]}
              onClick={() => onChange({ [key]: !data[key] })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ${
                data[key] ? "bg-blue-600" : "bg-neutral-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                  data[key] ? "translate-x-[22px]" : "translate-x-[2px]"
                }`}
                style={{ marginTop: "2px" }}
              />
            </button>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Job Preferences">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Preferred Job Type</Label>
            <Select
              id="pay-jobtype"
              value={data.jobType}
              onChange={(v) => onChange({ jobType: v })}
              options={["Any","Diagnostics Only","Preventive Maintenance","Repair & Overhaul","Fleet Management","EV / Hybrid Only"]}
              placeholder="No preference"
            />
          </div>
          <div>
            <Label>Maximum Daily Jobs</Label>
            <Select
              id="pay-maxjobs"
              value={data.maxDailyJobs}
              onChange={(v) => onChange({ maxDailyJobs: v })}
              options={["1","2","3","4","5","6","Unlimited"]}
              placeholder="No limit"
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 6: DOCUMENTS
   ─────────────────────────────────────────────
   Each DocUpload receives ONE file + ONE setter directly.
   There is NO shared fileState object — every slot is
   completely independent. Uploading/removing one file
   calls only that slot's setter and cannot touch the others.
   ───────────────────────────────────────────── */

/**
 * SingleDocUpload — one file slot with its own DOM <input>.
 *
 * Props:
 *   label      – display name
 *   sub        – description hint
 *   required   – shows red asterisk, enforced in validation
 *   file       – the currently selected File object, or null
 *   onSet      – (File) => void   called when user picks a file
 *   onRemove   – ()    => void   called when user clicks ×
 */
function SingleDocUpload({ label, sub, required, file, onSet, onRemove }) {
  // Each instance gets its own stable ref — never shared.
  const inputRef = useRef(null);

  function handleChange(e) {
    const picked = e.target.files?.[0];
    if (picked) {
      onSet(picked);
      // Reset the native input value so the same file can be re-picked
      // after removal without needing a re-mount.
      e.target.value = "";
    }
  }

  return (
    <div className="rounded-xl border border-neutral-100 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-neutral-800">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </p>
          <p className="text-[11.5px] text-neutral-400">{sub}</p>
        </div>

        {!file ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[12.5px] font-semibold text-blue-700 hover:bg-blue-100 transition"
          >
            <Upload className="h-3.5 w-3.5" /> Upload
          </button>
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <button
              type="button"
              onClick={onRemove}
              className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-red-500"
              title="Remove file"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {file && (
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <FileText className="h-3.5 w-3.5 text-emerald-600" />
          <p className="truncate text-[12px] font-medium text-emerald-700">{file.name}</p>
          <span className="ml-auto shrink-0 text-[11px] text-emerald-500">
            {(file.size / 1024).toFixed(1)} KB
          </span>
        </div>
      )}

      {/* One permanent <input> per slot — never remounted, never shared. */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}

/**
 * StepDocuments — Step 6 of the wizard.
 *
 * Receives four independent files + setters from the parent wizard.
 * Does NOT use the generic formData/onChange plumbing for documents.
 */
function StepDocuments({
  idProof, setIdProof,
  techCert, setTechCert,
  expProof, setExpProof,
  otherDoc, setOtherDoc,
  errors,
}) {
  return (
    <div className="space-y-5">
      {errors._docs && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-[12.5px] text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" /> {errors._docs}
        </div>
      )}

      <SectionCard title="Required Documents">
        <div className="space-y-3">
          <SingleDocUpload
            label="ID Proof"
            sub="Aadhaar, Passport, Voter ID or Driving Licence"
            required
            file={idProof}
            onSet={setIdProof}
            onRemove={() => setIdProof(null)}
          />
          <SingleDocUpload
            label="Technician Certification"
            sub="ASE, ICAT, OEM or equivalent certification"
            required
            file={techCert}
            onSet={setTechCert}
            onRemove={() => setTechCert(null)}
          />
        </div>
      </SectionCard>

      <SectionCard title="Optional Documents">
        <div className="space-y-3">
          <SingleDocUpload
            label="Experience Proof"
            sub="Work experience letter or relieving letter"
            required={false}
            file={expProof}
            onSet={setExpProof}
            onRemove={() => setExpProof(null)}
          />
          <SingleDocUpload
            label="Other Supporting Document"
            sub="Any other relevant document"
            required={false}
            file={otherDoc}
            onSet={setOtherDoc}
            onRemove={() => setOtherDoc(null)}
          />
        </div>
      </SectionCard>

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-[12px] text-blue-700">
        <p className="font-semibold">📄 File requirements</p>
        <p className="mt-1 text-blue-600">Accepted formats: PDF, JPG, JPEG, PNG, WEBP · Max 5 MB per file</p>
        <p className="mt-0.5 text-blue-500">Files are stored locally for this demo. No data is sent to any server.</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 7: REVIEW
   ───────────────────────────────────────────── */
function ReviewRow({ label, value }) {
  const display = Array.isArray(value) ? (value.length > 0 ? value.join(", ") : "—") : (value || "—");
  return (
    <div className="flex min-h-[32px] items-start gap-3 border-b border-neutral-50 pb-2 last:border-0 last:pb-0">
      <p className="w-44 shrink-0 text-[11.5px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
      <p className={`flex-1 text-[13px] ${display === "Not provided" || display === "—" ? "text-neutral-400 italic" : "text-neutral-800"}`}>
        {display}
      </p>
    </div>
  );
}

function ReviewSection({ title, stepIndex, onEdit, children }) {
  return (
    <div className="rounded-xl border border-neutral-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[14px] font-bold text-neutral-900">{title}</p>
        <button
          type="button"
          onClick={() => onEdit(stepIndex)}
          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-[12px] font-semibold text-blue-700 hover:bg-blue-100 transition"
        >
          Edit
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function StepReview({ formData, idProof, techCert, expProof, otherDoc, onEdit, agreed, onAgreeChange, errors }) {
  const p  = formData.personal     || {};
  const e  = formData.experience   || {};
  const s  = formData.skills       || {};
  const a  = formData.availability || {};
  const py = formData.payment      || {};
  // Documents come in as dedicated props — NOT from formData.documents —
  // so each slot shows its own independent filename.

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-[13px] text-blue-700">
        Please review all your information below. Click <strong>Edit</strong> on any section to make changes.
      </div>

      <ReviewSection title="Personal Details" stepIndex={0} onEdit={onEdit}>
        <ReviewRow label="Full Name"   value={p.fullName} />
        <ReviewRow label="Date of Birth" value={p.dob} />
        <ReviewRow label="Email"       value={p.email} />
        <ReviewRow label="Phone"       value={p.phone ? `+91 ${p.phone}` : ""} />
        <ReviewRow label="Gender"      value={p.gender} />
        <ReviewRow label="Nationality" value={p.nationality} />
        <ReviewRow label="Address"     value={[p.address, p.city, p.state, p.pincode].filter(Boolean).join(", ")} />
        <ReviewRow label="Emergency Contact" value={p.emergencyName ? `${p.emergencyName} (+91 ${p.emergencyPhone || ""})` : ""} />
        <ReviewRow label="Aadhaar"     value={p.aadhaar} />
        <ReviewRow label="PAN"         value={p.pan} />
      </ReviewSection>

      <ReviewSection title="Experience" stepIndex={1} onEdit={onEdit}>
        <ReviewRow label="Years"       value={e.yearsExp ? `${e.yearsExp} years` : ""} />
        <ReviewRow label="Role"        value={e.role} />
        <ReviewRow label="Company"     value={e.prevCompany} />
        <ReviewRow label="Brands"      value={e.brands} />
        <ReviewRow label="Vehicle Types" value={e.vehicleTypes} />
        <ReviewRow label="Certifications" value={e.certifications} />
        <ReviewRow label="Summary"     value={e.summary} />
      </ReviewSection>

      <ReviewSection title="Skills & Services" stepIndex={2} onEdit={onEdit}>
        <ReviewRow label="Skills"      value={s.skills} />
        <ReviewRow label="Services"    value={s.services} />
        <ReviewRow label="Expertise"   value={s.expertise} />
      </ReviewSection>

      <ReviewSection title="Availability" stepIndex={3} onEdit={onEdit}>
        <ReviewRow label="Working Days"  value={a.workDays} />
        <ReviewRow label="Hours"         value={a.startTime && a.endTime ? `${a.startTime} – ${a.endTime}` : ""} />
        <ReviewRow label="Arrangement"   value={a.availType} />
        <ReviewRow label="Emergency"     value={a.emergencyAvail ? `Yes — response: ${a.responseTime || "Not specified"}` : "No"} />
      </ReviewSection>

      <ReviewSection title="Payment & Preferences" stepIndex={4} onEdit={onEdit}>
        <ReviewRow label="Payment Method"  value={py.payMethod} />
        <ReviewRow label="Frequency"       value={py.payFreq} />
        <ReviewRow label="UPI ID"          value={py.upiId} />
        <ReviewRow label="Service Radius"  value={py.serviceRadius} />
        <ReviewRow label="Work Location"   value={py.workLocation} />
        <ReviewRow label="Job Type"        value={py.jobType} />
        <ReviewRow label="Max Daily Jobs"  value={py.maxDailyJobs} />
      </ReviewSection>

      <ReviewSection title="Documents" stepIndex={5} onEdit={onEdit}>
        <ReviewRow label="ID Proof"          value={idProof?.name  || "Not provided"} />
        <ReviewRow label="Tech Certificate"  value={techCert?.name || "Not provided"} />
        <ReviewRow label="Experience Proof"  value={expProof?.name || "Not provided"} />
        <ReviewRow label="Other Document"    value={otherDoc?.name || "Not provided"} />
      </ReviewSection>

      <div className="rounded-xl border border-neutral-100 bg-white p-5 shadow-sm">
        <label className="flex cursor-pointer items-start gap-3">
          <div
            onClick={onAgreeChange}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
              agreed ? "border-blue-600 bg-blue-600" : "border-neutral-300 bg-white"
            }`}
          >
            {agreed && <Check className="h-3 w-3 text-white" />}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-neutral-800">
              I confirm that all information provided is accurate and complete.
            </p>
            <p className="mt-0.5 text-[12px] text-neutral-500">
              By submitting, I agree to DriveGuard AI's{" "}
              <a href="#" className="font-semibold text-blue-600 hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="font-semibold text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </label>
        {errors._agree && <p className="mt-2 text-[11.5px] text-red-500">{errors._agree}</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VALIDATION PER STEP
   ───────────────────────────────────────────── */
function validateStep(stepIndex, data, agreed) {
  const errors = {};
  switch (stepIndex) {
    case 0: {
      const p = data.personal || {};
      if (!p.fullName?.trim())       errors.fullName = "Full name is required.";
      if (!p.dob)                    errors.dob = "Date of birth is required.";
      if (!p.email?.trim())          errors.email = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(p.email)) errors.email = "Enter a valid email.";
      if (!p.phone || p.phone.length < 10) errors.phone = "Enter a valid 10-digit number.";
      if (!p.gender)                 errors.gender = "Gender is required.";
      if (!p.nationality?.trim())    errors.nationality = "Nationality is required.";
      if (!p.address?.trim())        errors.address = "Address is required.";
      if (!p.city?.trim())           errors.city = "City is required.";
      if (!p.state)                  errors.state = "State is required.";
      if (!p.pincode?.trim() || p.pincode.length < 5) errors.pincode = "Enter a valid pincode.";
      if (!p.emergencyName?.trim())  errors.emergencyName = "Emergency contact name is required.";
      if (!p.emergencyPhone || p.emergencyPhone.length < 10) errors.emergencyPhone = "Enter a valid emergency phone.";
      break;
    }
    case 1: {
      const e = data.experience || {};
      if (!e.yearsExp && e.yearsExp !== 0) errors.yearsExp = "Years of experience is required.";
      if (!e.role)                   errors.role = "Role is required.";
      if (!e.summary?.trim())        errors.summary = "Please provide a short professional summary.";
      if (!e.brands || e.brands.length === 0) errors.brands = "Select at least one vehicle brand.";
      break;
    }
    case 2: {
      const s = data.skills || {};
      const total = (s.skills?.length || 0) + (s.services?.length || 0) + (s.expertise?.length || 0);
      if (total === 0) errors._skills = "Please select at least one skill, service, or expertise area.";
      break;
    }
    case 3: {
      const a = data.availability || {};
      if (!a.workDays || a.workDays.length === 0) errors.workDays = "Select at least one working day.";
      if (!a.startTime) errors.startTime = "Start time is required.";
      if (!a.endTime)   errors.endTime = "End time is required.";
      if (!a.availType) errors.availType = "Work arrangement is required.";
      break;
    }
    case 4: {
      const py = data.payment || {};
      if (!py.payMethod)      errors.payMethod = "Select a payment method.";
      if (!py.payFreq)        errors.payFreq = "Select payment frequency.";
      if (!py.serviceRadius)  errors.serviceRadius = "Select a service radius.";
      break;
    }
    case 5: {
      // data here is { idProof, techCert } passed from the wizard
      const { idProof: ip, techCert: tc } = data;
      if (!ip && !tc) {
        errors._docs = "Please upload both your ID Proof and Technician Certification.";
      } else if (!ip) {
        errors._docs = "Please upload your ID Proof (required).";
      } else if (!tc) {
        errors._docs = "Please upload your Technician Certification (required).";
      }
      break;
    }
    case 6: {
      if (!agreed) errors._agree = "Please read and accept the terms to proceed.";
      break;
    }
    default: break;
  }
  return errors;
}

/* ─────────────────────────────────────────────
   MAIN WIZARD
   ───────────────────────────────────────────── */
// NOTE: 'documents' is intentionally absent — document files are
// stored in four dedicated useState variables in the wizard below.
const EMPTY_DATA = {
  personal:     {},
  experience:   {},
  skills:       {},
  availability: { emergencyAvail: false },
  payment:      { notifNewJob: true, notifReminders: true, notifPayment: true, notifUpdates: false },
};

export default function TechnicianRegistrationWizard() {
  const { user, completeTechnicianRegistration } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep]   = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const [formData, setFormData]         = useState(() => ({
    ...EMPTY_DATA,
    personal: { fullName: user?.name || "", email: user?.email || "" },
  }));

  // ── Document files — each slot is its own dedicated state. ──
  // This is the ONLY way to guarantee that uploading/removing one
  // document never touches another. No shared object. No patching.
  const [idProof,  setIdProof]  = useState(null); // File | null
  const [techCert, setTechCert] = useState(null); // File | null
  const [expProof, setExpProof] = useState(null); // File | null
  const [otherDoc, setOtherDoc] = useState(null); // File | null

  const [errors, setErrors]     = useState({});
  const [agreed, setAgreed]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const toastRef = useRef(null);

  useEffect(() => {
    if (!toastMsg) return;
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToastMsg(""), 4000);
    return () => clearTimeout(toastRef.current);
  }, [toastMsg]);

  function updateStep(stepKey, patch) {
    setFormData((prev) => ({ ...prev, [stepKey]: { ...prev[stepKey], ...patch } }));
  }

  function goToStep(index) {
    if (index <= furthestStep || index < currentStep) {
      setErrors({});
      setCurrentStep(index);
    }
  }

  function goBack() {
    setErrors({});
    setCurrentStep((i) => Math.max(0, i - 1));
  }

  function goNext() {
    // For step 5 (Documents), pass the four dedicated file states directly
    // so validateStep can check each required doc independently.
    const validationData = currentStep === 5
      ? { idProof, techCert }          // only the two required docs are checked
      : formData;
    const errs = validateStep(currentStep, validationData, agreed);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    if (currentStep === STEPS.length - 1) {
      handleSubmit();
      return;
    }
    const next = currentStep + 1;
    setCurrentStep(next);
    setFurthestStep((f) => Math.max(f, next));
  }

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));

    // Build the final payload — document File objects are sanitised to
    // {name, size} metadata only (no File refs in localStorage).
    const safeData = {
      ...formData,
      documents: {
        idProof:  idProof  ? { name: idProof.name,  size: idProof.size  } : null,
        techCert: techCert ? { name: techCert.name, size: techCert.size } : null,
        expProof: expProof ? { name: expProof.name, size: expProof.size } : null,
        otherDoc: otherDoc ? { name: otherDoc.name, size: otherDoc.size } : null,
      },
      submittedAt: new Date().toISOString(),
    };

    completeTechnicianRegistration(safeData);
    setSubmitting(false);
    setToastMsg("Registration complete! Welcome to DriveGuard AI. 🎉");
    setTimeout(() => navigate("/portal/technician", { replace: true }), 1800);
  }

  const stepKey = STEPS[currentStep].key;
  const stepData = formData[stepKey] || {};

  function onStepChange(patch) {
    updateStep(stepKey, patch);
    // Clear relevant errors on change
    if (Object.keys(errors).length > 0) setErrors({});
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      {/* ── TOPBAR ── */}
      <header className="sticky top-0 z-40 flex h-[68px] items-center justify-between gap-4 border-b border-neutral-100 bg-white px-5 sm:px-8 shadow-sm">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-7 w-7 text-maroon-600" />
          <div>
            <p className="font-display text-[15px] font-bold text-neutral-900">
              DRIVEGUARD <span className="text-blue-600">AI</span>
            </p>
            <p className="text-[10px] font-medium text-neutral-400">Technician Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative rounded-full p-2 text-neutral-500 hover:bg-neutral-50">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-[13px] font-bold text-blue-700">
              {user?.name?.[0]?.toUpperCase() ?? "T"}
            </span>
            <div className="hidden sm:block">
              <p className="text-[13px] font-semibold leading-tight text-neutral-900">{user?.name}</p>
              <p className="text-[11px] leading-tight text-blue-600">Technician</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── PAGE TITLE ── */}
      <div className="border-b border-neutral-100 bg-white px-5 py-4 sm:px-8">
        <h1 className="text-[20px] font-extrabold text-neutral-900">Technician Registration</h1>
        <p className="text-[13px] text-neutral-500">Please complete your profile to get started.</p>
      </div>

      {/* ── PROGRESS BAR (horizontal, 7 steps) ── */}
      <div className="border-b border-neutral-100 bg-white px-4 py-4 sm:px-8">
        <div className="relative flex items-center justify-between">
          {/* connector line behind the circles */}
          <div className="absolute inset-x-0 top-[18px] mx-[18px] h-0.5 bg-neutral-200" />
          <div
            className="absolute top-[18px] mx-[18px] h-0.5 bg-blue-500 transition-all duration-500"
            style={{ right: `calc(${((STEPS.length - 1 - Math.min(currentStep, STEPS.length - 1)) / (STEPS.length - 1)) * 100}% - 0px)`, left: 0, marginLeft: "18px", marginRight: "18px" }}
          />
          {STEPS.map((step, i) => {
            const isActive = i === currentStep;
            const isDone   = i < currentStep;
            const canClick = i <= furthestStep || i < currentStep;
            const StepIcon = step.icon;
            return (
              <button
                key={step.key}
                type="button"
                disabled={!canClick}
                onClick={() => canClick && goToStep(i)}
                className="relative z-10 flex flex-col items-center gap-1 disabled:cursor-not-allowed"
                title={step.label}
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                  isActive ? "border-blue-600 bg-blue-600 text-white shadow-md" :
                  isDone   ? "border-blue-400 bg-blue-50 text-blue-600" :
                             "border-neutral-200 bg-white text-neutral-400"
                }`}>
                  {isDone ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                </span>
                <span className={`hidden text-[10.5px] font-semibold sm:block ${
                  isActive ? "text-blue-600" : isDone ? "text-blue-400" : "text-neutral-400"
                }`}>
                  {step.label}
                </span>
                <span className={`block text-[10px] sm:hidden ${isActive ? "text-blue-600" : "text-neutral-300"}`}>
                  {i + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6">
        {/* Step header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold text-neutral-400">
              Step {currentStep + 1} of {STEPS.length}
            </p>
            <h2 className="mt-0.5 text-[22px] font-extrabold text-neutral-900">
              {STEPS[currentStep].label}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goBack}
              disabled={currentStep === 0}
              className="flex items-center gap-1 rounded-lg border border-neutral-200 px-4 py-2 text-[13px] font-semibold text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={submitting}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
              ) : currentStep === STEPS.length - 1 ? (
                <>Complete Registration <Check className="h-4 w-4" /></>
              ) : (
                <>Next <ChevronRight className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </div>

        {/* Global validation error */}
        {Object.keys(errors).length > 0 && !errors._skills && !errors._docs && !errors._agree && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-[12.5px] text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Please fill in all required fields marked with *.
          </div>
        )}

        {/* Step content */}
        {currentStep === 0 && (
          <StepPersonal data={stepData} onChange={onStepChange} errors={errors} />
        )}
        {currentStep === 1 && (
          <StepExperience data={stepData} onChange={onStepChange} errors={errors} />
        )}
        {currentStep === 2 && (
          <StepSkills data={stepData} onChange={onStepChange} errors={errors} />
        )}
        {currentStep === 3 && (
          <StepAvailability data={stepData} onChange={onStepChange} errors={errors} />
        )}
        {currentStep === 4 && (
          <StepPayment data={stepData} onChange={onStepChange} errors={errors} />
        )}
        {currentStep === 5 && (
          // Pass each doc as its own explicit prop — NOT through the generic
          // formData/onChange mechanism — to guarantee total independence.
          <StepDocuments
            idProof={idProof}   setIdProof={setIdProof}
            techCert={techCert} setTechCert={setTechCert}
            expProof={expProof} setExpProof={setExpProof}
            otherDoc={otherDoc} setOtherDoc={setOtherDoc}
            errors={errors}
          />
        )}
        {currentStep === 6 && (
          <StepReview
            formData={formData}
            idProof={idProof}
            techCert={techCert}
            expProof={expProof}
            otherDoc={otherDoc}
            onEdit={goToStep}
            agreed={agreed}
            onAgreeChange={() => setAgreed((v) => !v)}
            errors={errors}
          />
        )}

        {/* Bottom nav */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={currentStep === 0}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 px-4 py-2 text-[13px] font-semibold text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={submitting}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-[13px] font-semibold text-white hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {submitting ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
            ) : currentStep === STEPS.length - 1 ? (
              <>Complete Registration <Check className="h-4 w-4" /></>
            ) : (
              <>Next <ChevronRight className="h-4 w-4" /></>
            )}
          </button>
        </div>
      </main>

      {/* ── SUCCESS TOAST ── */}
      {toastMsg && (
        <div
          style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}
          className="flex max-w-sm items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-lg"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
          <p className="text-[13px] font-medium text-emerald-700">{toastMsg}</p>
        </div>
      )}
    </div>
  );
}
