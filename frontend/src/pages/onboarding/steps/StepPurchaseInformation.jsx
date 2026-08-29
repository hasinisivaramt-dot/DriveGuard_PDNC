import FormSection from "../../../components/onboarding/FormSection.jsx";
import InfoBanner from "../../../components/onboarding/InfoBanner.jsx";
import TextField from "../../../components/onboarding/fields/TextField.jsx";
import Dropdown from "../../../components/onboarding/fields/Dropdown.jsx";
import DateField from "../../../components/onboarding/fields/DateField.jsx";
import NumberStepper from "../../../components/onboarding/fields/NumberStepper.jsx";
import { PURCHASE_TYPES, WARRANTY_STATUS } from "../../../data/vehicleOptions.js";

export default function StepPurchaseInformation({ value, onChange }) {
  return (
    <div className="space-y-5">
      <FormSection title="Purchase Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DateField
            label="Purchase Date"
            required
            value={value.purchaseDate}
            maxDate={new Date().toISOString()}
            onChange={(v) => onChange({ purchaseDate: v })}
          />
          <Dropdown
            label="Purchase Type"
            required
            value={value.purchaseType}
            onChange={(v) => onChange({ purchaseType: v })}
            options={PURCHASE_TYPES}
            placeholder="Select Type"
          />
          <NumberStepper
            label="Previous Owners"
            optional
            value={value.previousOwners}
            onChange={(v) => onChange({ previousOwners: v })}
            min={0}
            max={10}
            placeholder="0"
          />
          <TextField
            label="Dealer / Seller Name"
            optional
            value={value.dealerName}
            onChange={(v) => onChange({ dealerName: v })}
            placeholder="e.g., Sundaram Motors"
          />
          <TextField
            label="Purchase Price (₹)"
            optional
            type="number"
            value={value.purchasePrice}
            onChange={(v) => onChange({ purchasePrice: v })}
            placeholder="e.g., 850000"
          />
        </div>
      </FormSection>

      <FormSection title="Warranty Information" optional>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Dropdown
            label="Warranty Status"
            value={value.warrantyStatus}
            onChange={(v) => onChange({ warrantyStatus: v })}
            options={WARRANTY_STATUS}
            placeholder="Select Status"
          />
          <DateField
            label="Warranty Expiry Date"
            value={value.warrantyExpiry}
            onChange={(v) => onChange({ warrantyExpiry: v })}
          />
        </div>
      </FormSection>

      <InfoBanner
        title="Why do we need this information?"
        text="Purchase and warranty details help us estimate your vehicle's baseline condition and flag when scheduled maintenance may still be covered."
      />
    </div>
  );
}
