import FormSection from "../../../components/onboarding/FormSection.jsx";
import InfoBanner from "../../../components/onboarding/InfoBanner.jsx";
import TextField from "../../../components/onboarding/fields/TextField.jsx";
import Dropdown from "../../../components/onboarding/fields/Dropdown.jsx";
import {
  OVERALL_CONDITIONS,
  USAGE_TYPES,
  PRIMARY_USE,
  PARKING_TYPES,
} from "../../../data/vehicleOptions.js";

export default function StepCurrentCondition({ value, onChange }) {
  return (
    <div className="space-y-5">
      <FormSection title="Usage & Condition">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField
            label="Current Odometer Reading (km)"
            required
            type="number"
            value={value.odometer}
            onChange={(v) => onChange({ odometer: v })}
            placeholder="e.g., 76320"
          />
          <Dropdown
            label="Overall Condition"
            required
            value={value.overallCondition}
            onChange={(v) => onChange({ overallCondition: v })}
            options={OVERALL_CONDITIONS}
            placeholder="Select Condition"
          />
          <Dropdown
            label="Usage Type"
            required
            value={value.usageType}
            onChange={(v) => onChange({ usageType: v })}
            options={USAGE_TYPES}
            placeholder="Select Usage"
          />
          <Dropdown
            label="Primary Use"
            required
            value={value.primaryUse}
            onChange={(v) => onChange({ primaryUse: v })}
            options={PRIMARY_USE}
            placeholder="Select Primary Use"
          />
          <TextField
            label="Average Monthly Distance (km)"
            optional
            type="number"
            value={value.avgMonthlyDistance}
            onChange={(v) => onChange({ avgMonthlyDistance: v })}
            placeholder="e.g., 1200"
          />
          <Dropdown
            label="Parking Type"
            optional
            value={value.parkingType}
            onChange={(v) => onChange({ parkingType: v })}
            options={PARKING_TYPES}
            placeholder="Select Parking Type"
          />
        </div>
      </FormSection>

      <InfoBanner
        title="Why do we need this information?"
        text="Usage patterns and parking conditions influence wear rates — our models use this to calibrate degradation and remaining-useful-life estimates for your specific vehicle."
      />
    </div>
  );
}
