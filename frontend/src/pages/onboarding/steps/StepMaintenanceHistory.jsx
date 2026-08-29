import FormSection from "../../../components/onboarding/FormSection.jsx";
import InfoBanner from "../../../components/onboarding/InfoBanner.jsx";
import Dropdown from "../../../components/onboarding/fields/Dropdown.jsx";
import DateField from "../../../components/onboarding/fields/DateField.jsx";
import NumberStepper from "../../../components/onboarding/fields/NumberStepper.jsx";
import TextAreaField from "../../../components/onboarding/fields/TextAreaField.jsx";
import { SERVICE_TYPES, SERVICE_CENTER_TYPES, YES_NO } from "../../../data/vehicleOptions.js";

export default function StepMaintenanceHistory({ value, onChange }) {
  return (
    <div className="space-y-5">
      <FormSection title="Service History" optional>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DateField
            label="Last Service Date"
            value={value.lastServiceDate}
            maxDate={new Date().toISOString()}
            onChange={(v) => onChange({ lastServiceDate: v })}
          />
          <Dropdown
            label="Last Service Type"
            value={value.lastServiceType}
            onChange={(v) => onChange({ lastServiceType: v })}
            options={SERVICE_TYPES}
            placeholder="Select Type"
          />
          <Dropdown
            label="Service Center Type"
            value={value.serviceCenterType}
            onChange={(v) => onChange({ serviceCenterType: v })}
            options={SERVICE_CENTER_TYPES}
            placeholder="Select Center Type"
          />
          <NumberStepper
            label="Number of Past Services"
            value={value.pastServiceCount}
            onChange={(v) => onChange({ pastServiceCount: v })}
            min={0}
            max={50}
            placeholder="0"
          />
          <Dropdown
            label="Any Major Repairs?"
            value={value.majorRepairs}
            onChange={(v) => onChange({ majorRepairs: v })}
            options={YES_NO}
          />
        </div>

        {value.majorRepairs === "Yes" && (
          <TextAreaField
            label="Repair Details"
            optional
            className="mt-4"
            value={value.repairDetails}
            onChange={(v) => onChange({ repairDetails: v })}
            placeholder="Briefly describe the major repair(s) — e.g., transmission replacement in 2023"
          />
        )}
      </FormSection>

      <InfoBanner
        title="Why do we need this information?"
        text="Past service records give our models a maintenance baseline, so predictions account for work that's already been done rather than assuming a fully unmaintained vehicle."
      />
    </div>
  );
}
