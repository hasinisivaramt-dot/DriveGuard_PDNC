import FormSection from "../../../components/onboarding/FormSection.jsx";
import InfoBanner from "../../../components/onboarding/InfoBanner.jsx";
import CheckboxChips from "../../../components/onboarding/fields/CheckboxChips.jsx";
import TextAreaField from "../../../components/onboarding/fields/TextAreaField.jsx";
import { WARNING_LIGHTS, SYMPTOMS } from "../../../data/vehicleOptions.js";

export default function StepWarningsSymptoms({ value, onChange }) {
  return (
    <div className="space-y-5">
      <FormSection title="Current Warning Lights" optional subtitle="Select any that are currently on.">
        <CheckboxChips
          options={WARNING_LIGHTS}
          value={value.warningLights || []}
          onChange={(v) => onChange({ warningLights: v })}
        />
      </FormSection>

      <FormSection title="Noticed Symptoms" optional subtitle="Select anything you've recently noticed.">
        <CheckboxChips
          options={SYMPTOMS}
          value={value.symptoms || []}
          onChange={(v) => onChange({ symptoms: v })}
        />
      </FormSection>

      <FormSection title="Additional Notes" optional>
        <TextAreaField
          value={value.notes}
          onChange={(v) => onChange({ notes: v })}
          placeholder="Anything else worth mentioning about your vehicle's current state..."
          rows={4}
        />
      </FormSection>

      <InfoBanner
        title="Why do we need this information?"
        text="Self-reported symptoms help validate model predictions against what you're actually experiencing, and can surface issues sensors alone might miss."
      />
    </div>
  );
}
