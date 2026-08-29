import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, HelpCircle, ChevronLeft, ChevronRight, Save, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { WIZARD_STEPS } from "../../data/onboardingSteps.js";
import WizardSidebar from "../../components/onboarding/WizardSidebar.jsx";
import WizardFooter from "../../components/onboarding/WizardFooter.jsx";

import StepOwnerDetails from "./steps/StepOwnerDetails.jsx";
import StepVehicleInformation from "./steps/StepVehicleInformation.jsx";
import StepPurchaseInformation from "./steps/StepPurchaseInformation.jsx";
import StepCurrentCondition from "./steps/StepCurrentCondition.jsx";
import StepMaintenanceHistory from "./steps/StepMaintenanceHistory.jsx";
import StepComponentsInfo from "./steps/StepComponentsInfo.jsx";
import StepSensorInfo from "./steps/StepSensorInfo.jsx";
import StepUploadSensorData from "./steps/StepUploadSensorData.jsx";
import StepWarningsSymptoms from "./steps/StepWarningsSymptoms.jsx";
import StepReviewConfirm from "./steps/StepReviewConfirm.jsx";

const REQUIRED_FIELDS = {
  0: ["fullName", "email", "phone"],
  1: ["registrationNumber", "manufacturer", "model", "manufacturingYear", "vehicleType", "fuelType"],
  2: ["purchaseDate", "purchaseType"],
  3: ["odometer", "overallCondition", "usageType", "primaryUse"],
};

export default function VehicleRegistrationWizard() {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [furthestIndex, setFurthestIndex] = useState(0);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    0: { fullName: user?.name || "", email: user?.email || "" },
    1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {},
  });

  const step = WIZARD_STEPS[currentIndex];
  const isLast = currentIndex === WIZARD_STEPS.length - 1;
  const progressPct = Math.round(((currentIndex + 1) / WIZARD_STEPS.length) * 100);

  const uploadedFileNames = useMemo(() => {
    const names = [];
    if (formData[1]?.photo?.name) names.push(formData[1].photo.name);
    if (formData[7]?.sensorFile?.name) names.push(formData[7].sensorFile.name);
    return names;
  }, [formData]);

  const updateStep = (index, patch) => {
    setFormData((prev) => ({ ...prev, [index]: { ...prev[index], ...patch } }));
  };

  const validateCurrent = () => {
    const required = REQUIRED_FIELDS[currentIndex];
    if (!required) return true;
    const data = formData[currentIndex] || {};
    const missing = required.some((k) => !data[k]);
    if (missing) {
      setError("Please fill in all required fields marked with *.");
      return false;
    }
    setError("");
    return true;
  };

  const goNext = () => {
    if (!validateCurrent()) return;
    if (isLast) {
      completeOnboarding({
        owner: formData[0],
        vehicle: formData[1],
        purchase: formData[2],
        condition: formData[3],
        maintenance: formData[4],
        components: formData[5],
        sensors: formData[6],
        warnings: formData[8],
      });
      navigate("/portal/user", { replace: true });
      return;
    }
    const next = Math.min(currentIndex + 1, WIZARD_STEPS.length - 1);
    setCurrentIndex(next);
    setFurthestIndex((f) => Math.max(f, next));
  };

  const goBack = () => {
    setError("");
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const goToStep = (index) => {
    if (index <= furthestIndex) {
      setError("");
      setCurrentIndex(index);
    }
  };

  const handleSaveExit = () => {
    try {
      localStorage.setItem("driveguard_onboarding_draft", JSON.stringify(formData));
    } catch {
      // best-effort only
    }
    navigate("/");
  };

  const stepProps = {
    value: formData[currentIndex] || {},
    onChange: (patch) => updateStep(currentIndex, patch),
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      {/* top bar */}
      <header className="flex h-[76px] items-center justify-between border-b border-neutral-100 bg-white px-6 sm:px-10">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-8 w-8 text-maroon-600" />
          <div>
            <p className="font-display text-[16px] font-bold text-neutral-900">
              DRIVEGUARD <span className="text-blue-600">AI</span>
            </p>
            <p className="text-[10.5px] font-medium text-neutral-400">Predict. Prevent. Protect.</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden items-center gap-1.5 text-[13px] font-medium text-neutral-500 hover:text-neutral-700 sm:flex">
            <HelpCircle className="h-4 w-4" /> Need Help?
          </button>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-[13px] font-bold text-blue-700">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </span>
            <div className="hidden sm:block">
              <p className="text-[13px] font-semibold leading-tight text-neutral-900">{user?.name}</p>
              <p className="text-[11px] leading-tight text-neutral-400">{user?.email}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <WizardSidebar currentIndex={currentIndex} furthestIndex={furthestIndex} onStepClick={goToStep} />

        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[12.5px] font-semibold text-neutral-400">
                Step {currentIndex + 1} of {WIZARD_STEPS.length}
              </p>
              <h1 className="mt-1 text-[24px] font-extrabold text-neutral-900">{step.title}</h1>
              <p className="mt-1 text-[13.5px] text-neutral-500">{step.desc}</p>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={goBack}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 rounded-lg border border-neutral-200 px-4 py-2 text-[13.5px] font-semibold text-neutral-600 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={goNext}
                className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-[13.5px] font-semibold text-white transition hover:bg-blue-700"
              >
                {isLast ? "Submit" : "Next"} <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-[12.5px] font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="mt-6">
            {currentIndex === 0 && <StepOwnerDetails {...stepProps} />}
            {currentIndex === 1 && <StepVehicleInformation {...stepProps} />}
            {currentIndex === 2 && <StepPurchaseInformation {...stepProps} />}
            {currentIndex === 3 && <StepCurrentCondition {...stepProps} />}
            {currentIndex === 4 && <StepMaintenanceHistory {...stepProps} />}
            {currentIndex === 5 && <StepComponentsInfo {...stepProps} />}
            {currentIndex === 6 && <StepSensorInfo {...stepProps} />}
            {currentIndex === 7 && <StepUploadSensorData {...stepProps} />}
            {currentIndex === 8 && <StepWarningsSymptoms {...stepProps} />}
            {currentIndex === 9 && (
              <StepReviewConfirm
                formData={formData}
                onEditStep={goToStep}
                uploadedFileNames={uploadedFileNames}
              />
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handleSaveExit}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500 hover:text-neutral-700"
            >
              <Save className="h-4 w-4" /> Save &amp; Exit
            </button>
            <div className="flex gap-2.5">
              <button
                onClick={goBack}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 rounded-lg border border-neutral-200 px-4 py-2 text-[13.5px] font-semibold text-neutral-600 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={goNext}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-[13.5px] font-semibold text-white transition hover:bg-blue-700"
              >
                {isLast ? (
                  <>
                    Complete Registration <Check className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>

      <WizardFooter progressPct={progressPct} />
    </div>
  );
}
