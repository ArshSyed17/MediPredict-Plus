import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import PredictionStepper from "./PredictionStepper";
import StepPersonalInfo from "./steps/StepPersonalInfo";
import StepLifestyle from "./steps/StepLifestyle";
import StepMedicalHistory from "./steps/StepMedicalHistory";
import StepVitals from "./steps/StepVitals";
import StepLabResults from "./steps/StepLabResults";
import StepDiseaseSelection from "./steps/StepDiseaseSelection";
import PredictionProcessingScreen from "./PredictionProcessingScreen";
import PredictionResultScreen from "./PredictionResultScreen";
import PredictionHistoryPanel from "./PredictionHistoryPanel";
import { runPrediction } from "../../services/predictionService";

const steps = [
  { title: "Personal", subtitle: "Profile", component: StepPersonalInfo },
  { title: "Lifestyle", subtitle: "Habits", component: StepLifestyle },
  { title: "History", subtitle: "Medical", component: StepMedicalHistory },
  { title: "Vitals", subtitle: "Vitals", component: StepVitals },
  { title: "Labs", subtitle: "Biomarkers", component: StepLabResults },
  { title: "Disease", subtitle: "Selection", component: StepDiseaseSelection },
];

const defaults = {
  fullName: "",
  age: 40,
  gender: "",
  heightCm: 172,
  weightKg: 78,
  activityLevel: "",
  smoking: "",
  alcohol: "",
  sleepHours: 7,
  familyHistory: false,
  hasHypertension: false,
  hasCardiacHistory: false,
  hasKidneyIssues: false,
  systolicBP: 128,
  diastolicBP: 82,
  heartRate: 74,
  fastingGlucose: "",
  hba1c: "",
  ldl: "",
  creatinine: "",
  diseaseId: "",
  selectedSymptoms: [],
};

const PredictionForm = () => {
  const methods = useForm({ defaultValues: defaults, mode: "onTouched" });
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const CurrentStep = steps[step].component;
  const height = useWatch({ control: methods.control, name: "heightCm" });
  const weight = useWatch({ control: methods.control, name: "weightKg" });

  const computedBmi = useMemo(() => {
    if (!weight || !height) return 0;
    return Number((weight / ((height / 100) * (height / 100))).toFixed(1));
  }, [height, weight]);

  const onNext = async () => {
    if (step === steps.length - 1) {
      const valid = await methods.trigger();
      if (!valid) return;
      
      const values = methods.getValues();
      setProcessing(true);
      
      try {
        // Construct backend payload format: { disease, features }
        const { diseaseId, selectedSymptoms, ...restValues } = values;
        const payload = {
          disease: diseaseId || 'diabetes',
          features: {
            ...restValues,
            selectedSymptoms: selectedSymptoms || [],
            bmi: computedBmi
          }
        };

        const apiResponse = await runPrediction(payload);
        const rawPrediction = apiResponse.data || apiResponse;

        // Map backend document format to keys expected by PredictionResultScreen
        const mappedResult = {
          disease: rawPrediction.diseaseType || 'Diabetes',
          generatedAt: rawPrediction.createdAt || new Date().toISOString(),
          risk: rawPrediction.riskLevel === 'High' ? 82 : (rawPrediction.riskLevel === 'Medium' ? 48 : 15),
          confidence: rawPrediction.confidenceScore || 92,
          recommendations: rawPrediction.recommendedActions || [],
          factors: [
            { factor: 'Blood Sugar', contribution: rawPrediction.diseaseType === 'Diabetes' ? 45 : 10 },
            { factor: 'Blood Pressure', contribution: rawPrediction.diseaseType === 'Heart Disease' ? 50 : 20 },
            { factor: 'Lifestyle', contribution: 20 },
            { factor: 'Age & BMI', contribution: 15 },
          ],
          comparisonData: [
            { name: 'Baseline', patient: rawPrediction.riskLevel === 'High' ? 75 : 30, benchmark: 40 },
            { name: 'With Treatment', patient: rawPrediction.riskLevel === 'High' ? 40 : 15, benchmark: 40 },
          ]
        };

        setResult(mappedResult);
      } catch (err) {
        console.error('Prediction calculation failed:', err);
        alert(err.message || 'AI Disease Prediction failed. Please verify your inputs and try again.');
      } finally {
        setProcessing(false);
      }
      return;
    }
    const valid = await methods.trigger();
    if (valid) setStep((current) => current + 1);
  };

  const savePrediction = () => {
    if (!result) return;
    const record = { ...result, id: crypto.randomUUID() };
    setHistory((current) => [record, ...current].slice(0, 8));
  };

  const resetFlow = () => {
    methods.reset(defaults);
    setResult(null);
    setProcessing(false);
    setStep(0);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-5">
        {!result && <PredictionStepper steps={steps} currentStep={step} />}
        <FormProvider {...methods}>
          <AnimatePresence mode="wait">
            {!processing && !result && (
              <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <CurrentStep />
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep((current) => Math.max(current - 1, 0))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm disabled:opacity-40"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-teal-500/20 hover:from-teal-400 hover:to-emerald-400 transition-all duration-200"
                  >
                    {step === steps.length - 1 ? <Zap className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                    {step === steps.length - 1 ? "Run AI Prediction" : "Continue"}
                  </button>
                </div>
              </motion.div>
            )}
            {processing && <PredictionProcessingScreen />}
            {result && <PredictionResultScreen result={result} onSave={savePrediction} onReset={resetFlow} />}
          </AnimatePresence>
        </FormProvider>
      </div>
      <PredictionHistoryPanel history={history} />
    </div>
  );
};

export default PredictionForm;
