import FormSection from "../../../components/onboarding/FormSection.jsx";
import InfoBanner from "../../../components/onboarding/InfoBanner.jsx";
import TextField from "../../../components/onboarding/fields/TextField.jsx";
import Dropdown from "../../../components/onboarding/fields/Dropdown.jsx";
import NumberStepper from "../../../components/onboarding/fields/NumberStepper.jsx";
import YearField from "../../../components/onboarding/fields/YearField.jsx";
import FileDropzone from "../../../components/onboarding/fields/FileDropzone.jsx";
import {
  MANUFACTURERS,
  MODELS_BY_MANUFACTURER,
  VARIANTS,
  VEHICLE_TYPES,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  ENGINE_TYPES,
  YES_NO,
  DRIVETRAINS,
  BODY_TYPES,
  EMISSION_NORMS,
} from "../../../data/vehicleOptions.js";

export default function StepVehicleInformation({ value, onChange }) {
  const modelOptions = MODELS_BY_MANUFACTURER[value.manufacturer] || [];

  return (
    <div className="space-y-5">
      <FormSection title="Vehicle Photo" subtitle="Upload a clear photo of your vehicle (optional)">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <FileDropzone
            file={value.photo}
            onChange={(f) => onChange({ photo: f })}
            hint="JPG, PNG up to 5MB"
          />
          <div className="space-y-4">
            <TextField
              label="Registration Number"
              required
              value={value.registrationNumber}
              onChange={(v) => onChange({ registrationNumber: v })}
              placeholder="e.g., MH 01 AB 1234"
            />
            <TextField
              label="VIN / Chassis Number"
              optional
              value={value.vin}
              onChange={(v) => onChange({ vin: v })}
              placeholder="e.g., MA1RJ14GH34567890"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Basic Vehicle Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Dropdown
            label="Manufacturer"
            required
            value={value.manufacturer}
            onChange={(v) => onChange({ manufacturer: v, model: "" })}
            options={MANUFACTURERS}
            placeholder="Select Manufacturer"
          />
          <Dropdown
            label="Model"
            required
            value={value.model}
            onChange={(v) => onChange({ model: v })}
            options={modelOptions}
            placeholder={value.manufacturer ? "Select Model" : "Select manufacturer first"}
          />
          <Dropdown
            label="Variant"
            optional
            value={value.variant}
            onChange={(v) => onChange({ variant: v })}
            options={VARIANTS}
            placeholder="Select Variant"
          />
          <YearField
            label="Manufacturing Year"
            required
            value={value.manufacturingYear}
            onChange={(v) => onChange({ manufacturingYear: v })}
          />
          <Dropdown
            label="Vehicle Type"
            required
            value={value.vehicleType}
            onChange={(v) => onChange({ vehicleType: v })}
            options={VEHICLE_TYPES}
            placeholder="Select Type"
          />
          <Dropdown
            label="Fuel Type"
            required
            value={value.fuelType}
            onChange={(v) => onChange({ fuelType: v })}
            options={FUEL_TYPES}
            placeholder="Select Fuel Type"
          />
          <Dropdown
            label="Transmission Type"
            optional
            value={value.transmission}
            onChange={(v) => onChange({ transmission: v })}
            options={TRANSMISSION_TYPES}
            placeholder="Select Transmission"
          />
          <Dropdown
            label="Engine Type"
            optional
            value={value.engineType}
            onChange={(v) => onChange({ engineType: v })}
            options={ENGINE_TYPES}
            placeholder="Select Engine Type"
          />
          <TextField
            label="Engine Capacity (cc)"
            optional
            type="number"
            value={value.engineCapacity}
            onChange={(v) => onChange({ engineCapacity: v })}
            placeholder="e.g., 1497"
          />
        </div>
      </FormSection>

      <FormSection title="Technical Specifications" optional>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <NumberStepper
            label="Number of Cylinders"
            value={value.cylinders}
            onChange={(v) => onChange({ cylinders: v })}
            min={1}
            max={16}
            placeholder="e.g., 4"
          />
          <Dropdown
            label="Turbocharged"
            value={value.turbocharged}
            onChange={(v) => onChange({ turbocharged: v })}
            options={YES_NO}
          />
          <Dropdown
            label="Hybrid / EV"
            value={value.hybridEv}
            onChange={(v) => onChange({ hybridEv: v })}
            options={YES_NO}
          />
          <Dropdown
            label="Drivetrain"
            value={value.drivetrain}
            onChange={(v) => onChange({ drivetrain: v })}
            options={DRIVETRAINS}
          />
        </div>
      </FormSection>

      <FormSection title="Additional Vehicle Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField
            label="Color"
            optional
            value={value.color}
            onChange={(v) => onChange({ color: v })}
            placeholder="e.g., White"
          />
          <NumberStepper
            label="Seating Capacity"
            value={value.seatingCapacity}
            onChange={(v) => onChange({ seatingCapacity: v })}
            min={1}
            max={12}
            placeholder="e.g., 5"
          />
          <Dropdown
            label="Body Type"
            optional
            value={value.bodyType}
            onChange={(v) => onChange({ bodyType: v })}
            options={BODY_TYPES}
            placeholder="Select Body Type"
          />
          <Dropdown
            label="Emission Norms"
            optional
            value={value.emissionNorms}
            onChange={(v) => onChange({ emissionNorms: v })}
            options={EMISSION_NORMS}
            placeholder="Select Emission Norm"
          />
          <TextField
            label="Insurance Provider"
            optional
            value={value.insuranceProvider}
            onChange={(v) => onChange({ insuranceProvider: v })}
            placeholder="e.g., HDFC Ergo"
          />
          <TextField
            label="Insurance Policy No."
            optional
            value={value.insurancePolicyNo}
            onChange={(v) => onChange({ insurancePolicyNo: v })}
            placeholder="e.g., INS1234567890"
          />
        </div>
      </FormSection>

      <InfoBanner
        title="Why do we need this information?"
        text="These details help our AI models understand your vehicle better and provide accurate predictions, maintenance alerts, and recommendations tailored to your vehicle."
      />
    </div>
  );
}
