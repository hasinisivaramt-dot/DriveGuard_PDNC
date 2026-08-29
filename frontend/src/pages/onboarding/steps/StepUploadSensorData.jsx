import { Download } from "lucide-react";
import FormSection from "../../../components/onboarding/FormSection.jsx";
import InfoBanner from "../../../components/onboarding/InfoBanner.jsx";
import FileDropzone from "../../../components/onboarding/fields/FileDropzone.jsx";

const EXPECTED_COLUMNS = [
  "timestamp", "engine_temp", "vibration", "oil_pressure", "battery_health", "rpm",
];

export default function StepUploadSensorData({ value, onChange }) {
  return (
    <div className="space-y-5">
      <FormSection
        title="Upload Sensor Dataset"
        optional
        subtitle="You can also add this later from Sensor Data in your dashboard."
      >
        <FileDropzone
          file={value.sensorFile}
          onChange={(f) => onChange({ sensorFile: f })}
          accept=".csv"
          hint="CSV up to 20MB"
        />

        <div className="mt-4 rounded-xl border border-neutral-100 bg-neutral-50 p-4">
          <p className="text-[12.5px] font-semibold text-neutral-700">Expected columns</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {EXPECTED_COLUMNS.map((c) => (
              <code
                key={c}
                className="rounded-md bg-white px-2 py-1 text-[11.5px] font-medium text-neutral-600 ring-1 ring-neutral-200"
              >
                {c}
              </code>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold text-blue-600 hover:underline"
          >
            <Download className="h-3.5 w-3.5" /> Download sample CSV template
          </button>
        </div>
      </FormSection>

      <InfoBanner
        title="Why do we need this information?"
        text="An initial sensor history lets the model establish a baseline for your vehicle right away, instead of waiting to accumulate readings from scratch."
      />
    </div>
  );
}
