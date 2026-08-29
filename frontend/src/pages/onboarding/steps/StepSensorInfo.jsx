import FormSection from "../../../components/onboarding/FormSection.jsx";
import InfoBanner from "../../../components/onboarding/InfoBanner.jsx";
import TextField from "../../../components/onboarding/fields/TextField.jsx";
import Dropdown from "../../../components/onboarding/fields/Dropdown.jsx";
import NumberStepper from "../../../components/onboarding/fields/NumberStepper.jsx";
import {
  SENSOR_DEVICE_TYPES,
  CONNECTIVITY_TYPES,
  DATA_FREQUENCIES,
} from "../../../data/vehicleOptions.js";

export default function StepSensorInfo({ value, onChange }) {
  return (
    <div className="space-y-5">
      <FormSection title="Sensor / IoT Setup" optional>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Dropdown
            label="Sensor Device Type"
            value={value.deviceType}
            onChange={(v) => onChange({ deviceType: v })}
            options={SENSOR_DEVICE_TYPES}
            placeholder="Select Device Type"
          />
          <TextField
            label="Device Model"
            optional
            value={value.deviceModel}
            onChange={(v) => onChange({ deviceModel: v })}
            placeholder="e.g., ELM327 v2.1"
          />
          <Dropdown
            label="Connectivity Type"
            value={value.connectivity}
            onChange={(v) => onChange({ connectivity: v })}
            options={CONNECTIVITY_TYPES}
            placeholder="Select Connectivity"
          />
          <NumberStepper
            label="Number of Sensors Installed"
            value={value.sensorCount}
            onChange={(v) => onChange({ sensorCount: v })}
            min={0}
            max={30}
            placeholder="e.g., 6"
          />
          <Dropdown
            label="Data Collection Frequency"
            value={value.dataFrequency}
            onChange={(v) => onChange({ dataFrequency: v })}
            options={DATA_FREQUENCIES}
            placeholder="Select Frequency"
          />
        </div>
      </FormSection>

      <InfoBanner
        title="Why do we need this information?"
        text="Knowing your sensor setup lets us validate incoming readings against the right expected ranges and sampling rate for your device."
      />
    </div>
  );
}
