import { Pencil, ShieldCheck } from "lucide-react";
import FormSection from "../../../components/onboarding/FormSection.jsx";

const SUMMARY_GROUPS = [
  {
    step: 0,
    title: "Owner Details",
    fields: [
      ["fullName", "Full Name"], ["email", "Email"], ["phone", "Phone Number"],
      ["dob", "Date of Birth"], ["city", "City"], ["state", "State"],
    ],
  },
  {
    step: 1,
    title: "Vehicle Information",
    fields: [
      ["registrationNumber", "Registration Number"], ["vin", "VIN"],
      ["manufacturer", "Manufacturer"], ["model", "Model"], ["variant", "Variant"],
      ["manufacturingYear", "Manufacturing Year"], ["vehicleType", "Vehicle Type"],
      ["fuelType", "Fuel Type"], ["transmission", "Transmission"], ["color", "Color"],
      ["seatingCapacity", "Seating Capacity"],
    ],
  },
  {
    step: 2,
    title: "Purchase Information",
    fields: [
      ["purchaseDate", "Purchase Date"], ["purchaseType", "Purchase Type"],
      ["dealerName", "Dealer / Seller"], ["purchasePrice", "Purchase Price"],
      ["warrantyStatus", "Warranty Status"],
    ],
  },
  {
    step: 3,
    title: "Current Condition",
    fields: [
      ["odometer", "Odometer Reading (km)"], ["overallCondition", "Overall Condition"],
      ["usageType", "Usage Type"], ["primaryUse", "Primary Use"], ["parkingType", "Parking Type"],
    ],
  },
  {
    step: 4,
    title: "Maintenance History",
    fields: [
      ["lastServiceDate", "Last Service Date"], ["lastServiceType", "Last Service Type"],
      ["pastServiceCount", "Past Services"], ["majorRepairs", "Major Repairs"],
    ],
  },
  {
    step: 5,
    title: "Components Info",
    fields: [
      ["batteryHealth", "Battery Health"], ["tyreCondition", "Tyre Condition"],
      ["brakePadCondition", "Brake Pad Condition"], ["oilLastChanged", "Engine Oil Last Changed"],
    ],
  },
  {
    step: 6,
    title: "Sensor / IoT Information",
    fields: [
      ["deviceType", "Sensor Device Type"], ["connectivity", "Connectivity Type"],
      ["sensorCount", "Sensors Installed"], ["dataFrequency", "Data Frequency"],
    ],
  },
  {
    step: 8,
    title: "Warnings & Symptoms",
    fields: [
      ["warningLights", "Warning Lights"], ["symptoms", "Symptoms"], ["notes", "Notes"],
    ],
  },
];

function formatValue(v) {
  if (Array.isArray(v)) return v.length ? v.join(", ") : null;
  if (v && typeof v === "object" && v.name) return v.name; // File object
  if (!v) return null;
  return v;
}

export default function StepReviewConfirm({ formData, onEditStep, uploadedFileNames }) {
  return (
    <div className="space-y-5">
      {SUMMARY_GROUPS.map((group) => {
        const stepData = formData[group.step] || {};
        const rows = group.fields
          .map(([key, label]) => [label, formatValue(stepData[key])])
          .filter(([, v]) => v !== null && v !== undefined && v !== "");

        return (
          <FormSection key={group.title}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-neutral-900">{group.title}</h3>
              <button
                type="button"
                onClick={() => onEditStep(group.step)}
                className="flex items-center gap-1 text-[12.5px] font-semibold text-blue-600 hover:underline"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
            </div>
            {rows.length === 0 ? (
              <p className="text-[12.5px] italic text-neutral-400">No details provided.</p>
            ) : (
              <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3">
                {rows.map(([label, val]) => (
                  <div key={label}>
                    <dt className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                      {label}
                    </dt>
                    <dd className="text-[13px] font-semibold text-neutral-800">{val}</dd>
                  </div>
                ))}
              </dl>
            )}
          </FormSection>
        );
      })}

      {uploadedFileNames.length > 0 && (
        <FormSection title="Uploaded Files">
          <ul className="space-y-1 text-[13px] text-neutral-700">
            {uploadedFileNames.map((n) => (
              <li key={n}>• {n}</li>
            ))}
          </ul>
        </FormSection>
      )}

      <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <p className="text-[12.5px] leading-relaxed text-emerald-800">
          By submitting, you confirm the details above are accurate to the best of your knowledge.
          You can update any of this later from your vehicle profile.
        </p>
      </div>
    </div>
  );
}
