import FormSection from "../../../components/onboarding/FormSection.jsx";
import InfoBanner from "../../../components/onboarding/InfoBanner.jsx";
import TextField from "../../../components/onboarding/fields/TextField.jsx";
import DateField from "../../../components/onboarding/fields/DateField.jsx";
import Dropdown from "../../../components/onboarding/fields/Dropdown.jsx";

const STATES = [
  "Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Kerala", "Maharashtra",
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal",
];

export default function StepOwnerDetails({ value, onChange }) {
  return (
    <div className="space-y-5">
      <FormSection title="Personal Information" subtitle="This is used to verify vehicle ownership.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Full Name"
            required
            value={value.fullName}
            onChange={(v) => onChange({ fullName: v })}
            placeholder="e.g., Arjun Mehta"
          />
          <TextField
            label="Email Address"
            required
            type="email"
            value={value.email}
            onChange={(v) => onChange({ email: v })}
            placeholder="e.g., arjun@gmail.com"
          />
          <TextField
            label="Phone Number"
            required
            type="tel"
            value={value.phone}
            onChange={(v) => onChange({ phone: v })}
            placeholder="e.g., +91 98765 43210"
          />
          <TextField
            label="Alternate Phone"
            optional
            type="tel"
            value={value.altPhone}
            onChange={(v) => onChange({ altPhone: v })}
            placeholder="e.g., +91 91234 56789"
          />
          <DateField
            label="Date of Birth"
            optional
            value={value.dob}
            maxDate={new Date().toISOString()}
            onChange={(v) => onChange({ dob: v })}
          />
          <Dropdown
            label="State"
            optional
            value={value.state}
            onChange={(v) => onChange({ state: v })}
            options={STATES}
            placeholder="Select State"
          />
        </div>
      </FormSection>

      <FormSection title="Address" optional>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField
            label="Address"
            optional
            className="sm:col-span-3"
            value={value.address}
            onChange={(v) => onChange({ address: v })}
            placeholder="House / Street / Area"
          />
          <TextField
            label="City"
            optional
            value={value.city}
            onChange={(v) => onChange({ city: v })}
            placeholder="e.g., Hyderabad"
          />
          <TextField
            label="Pincode"
            optional
            value={value.pincode}
            onChange={(v) => onChange({ pincode: v })}
            placeholder="e.g., 500081"
          />
        </div>
      </FormSection>

      <InfoBanner
        title="Why do we need this information?"
        text="We use your contact details to send maintenance alerts and predictions for your vehicles, and to verify ownership if a technician needs to reach you."
      />
    </div>
  );
}
