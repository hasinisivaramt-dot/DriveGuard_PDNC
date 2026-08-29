import FormSection from "../../../components/onboarding/FormSection.jsx";
import InfoBanner from "../../../components/onboarding/InfoBanner.jsx";
import Dropdown from "../../../components/onboarding/fields/Dropdown.jsx";
import DateField from "../../../components/onboarding/fields/DateField.jsx";
import { CONDITION_LEVELS } from "../../../data/vehicleOptions.js";

export default function StepComponentsInfo({ value, onChange }) {
  return (
    <div className="space-y-5">
      <FormSection title="Major Components Condition" optional>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Dropdown
            label="Battery Health"
            value={value.batteryHealth}
            onChange={(v) => onChange({ batteryHealth: v })}
            options={CONDITION_LEVELS}
            placeholder="Select Condition"
          />
          <Dropdown
            label="Tyre Condition"
            value={value.tyreCondition}
            onChange={(v) => onChange({ tyreCondition: v })}
            options={CONDITION_LEVELS}
            placeholder="Select Condition"
          />
          <Dropdown
            label="Brake Pad Condition"
            value={value.brakePadCondition}
            onChange={(v) => onChange({ brakePadCondition: v })}
            options={CONDITION_LEVELS}
            placeholder="Select Condition"
          />
          <Dropdown
            label="Coolant Level"
            value={value.coolantLevel}
            onChange={(v) => onChange({ coolantLevel: v })}
            options={CONDITION_LEVELS}
            placeholder="Select Condition"
          />
          <Dropdown
            label="Air Filter Condition"
            value={value.airFilterCondition}
            onChange={(v) => onChange({ airFilterCondition: v })}
            options={CONDITION_LEVELS}
            placeholder="Select Condition"
          />
          <DateField
            label="Engine Oil Last Changed"
            value={value.oilLastChanged}
            maxDate={new Date().toISOString()}
            onChange={(v) => onChange({ oilLastChanged: v })}
          />
        </div>
      </FormSection>

      <InfoBanner
        title="Why do we need this information?"
        text="Component-level condition gives the explainability layer (SHAP) real starting context, so it can distinguish a sensor anomaly from a component you've already flagged as worn."
      />
    </div>
  );
}
