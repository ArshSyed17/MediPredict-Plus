import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, RotateCcw, FlaskConical, Ruler, Scale,
  Activity, Moon, Droplets, Cigarette, Wine, Brain,
  HeartPulse, Footprints, ChevronRight, Sparkles,
  AlertTriangle, CheckCircle, Info, Save
} from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { defaultSimulatorParams, DISEASES } from "../../data/simulatorMockData";
import { runSimulation } from "../../services/simulatorService";
import axiosInstance from "../../api/axiosInstance";

/* ─── Helpers ─────────────────────────────── */
const riskColor = (v) => {
  if (v >= 65) return "text-red-400";
  if (v >= 40) return "text-yellow-400";
  return "text-emerald-400";
};
const riskBg = (v) => {
  if (v >= 65) return "bg-red-500/20 border-red-500/30";
  if (v >= 40) return "bg-yellow-500/20 border-yellow-500/30";
  return "bg-emerald-500/20 border-emerald-500/30";
};
const riskLabel = (v) => (v >= 65 ? "High Risk" : v >= 40 ? "Moderate" : "Low Risk");

/* ─── Slider Row ─────────────────────────────── */
const SliderRow = ({ icon: Icon, label, unit, value, min, max, step = 1, onChange, labels }) => {
  const display = labels ? (labels[value] ?? value) : value;
  const pct = max > 0 ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-3.5 h-3.5 text-teal-400/70" />}
          <span className="text-sm text-gray-300">{label}</span>
        </div>
        <span className="text-sm font-semibold text-white tabular-nums">
          {display} <span className="text-gray-500 text-xs font-normal">{labels ? '' : unit}</span>
        </span>
      </div>
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

/* ─── Disease Risk Bar ─────────────────────────── */
const DiseaseBar = ({ label, color, value }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-gray-300">{label}</span>
      <span className={`font-semibold ${riskColor(value)}`}>{value}%</span>
    </div>
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  </div>
);

/* ─── Parameter groups ─────────────────────────── */
const PARAM_CONFIG = [
  { key: "weight",     label: "Weight",        unit: "kg",         min: 0, max: 140, step: 1,    group: "body",      icon: Scale },
  { key: "height",     label: "Height",        unit: "cm",         min: 0, max: 220, step: 1,    group: "body",      icon: Ruler },
  { key: "exercise",   label: "Exercise",      unit: "min/wk",     min: 0, max: 420, step: 15,   group: "lifestyle", icon: Activity },
  { key: "dailySteps", label: "Daily Steps",   unit: "steps",      min: 0, max: 15000, step: 500, group: "lifestyle", icon: Footprints },
  { key: "sleep",      label: "Sleep",         unit: "hrs",        min: 0, max: 10,  step: 0.5,  group: "lifestyle", icon: Moon },
  { key: "water",      label: "Water Intake",  unit: "L/day",      min: 0, max: 5,   step: 0.25, group: "lifestyle", icon: Droplets },
  { key: "smoking",    label: "Smoking",       unit: "level",      min: 0, max: 3,   step: 1,    group: "habits",    icon: Cigarette, labels: ["None", "Occasional", "Regular", "Heavy"] },
  { key: "alcohol",    label: "Alcohol",       unit: "drinks/wk",  min: 0, max: 21,  step: 1,    group: "habits",    icon: Wine },
  { key: "stress",     label: "Stress Level",  unit: "/10",        min: 0, max: 10,  step: 1,    group: "habits",    icon: Brain },
  { key: "bloodSugar", label: "Blood Sugar",   unit: "mg/dL",      min: 0, max: 200, step: 1,    group: "vitals",    icon: Activity },
  { key: "systolicBP", label: "Systolic BP",   unit: "mmHg",       min: 0, max: 180, step: 1,    group: "vitals",    icon: HeartPulse },
  { key: "diastolicBP",label: "Diastolic BP",  unit: "mmHg",       min: 0, max: 120, step: 1,    group: "vitals",    icon: HeartPulse },
  { key: "heartRate",  label: "Heart Rate",    unit: "bpm",        min: 0, max: 120, step: 1,    group: "vitals",    icon: HeartPulse },
];

const GROUP_LABELS = {
  body: "Body Metrics",
  lifestyle: "Lifestyle",
  habits: "Habits & Stress",
  vitals: "Vital Signs",
};

/* ─── Has user entered any data? ─────────────────── */
const hasData = (params) =>
  PARAM_CONFIG.some(({ key }) => params[key] > 0);

/* ─── Main Page ─────────────────────────────── */
const HealthSimulatorPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState(defaultSimulatorParams);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null); // { type: 'success'|'error', text }

  const handleChange = (key, value) =>
    setParams((prev) => ({ ...prev, [key]: value }));

  const handleReset = () => setParams(defaultSimulatorParams);

  const handleSave = async () => {
    if (!result) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      // Find the top disease risk
      const topDisease = DISEASES.reduce((a, b) =>
        (result.diseaseRisks?.[a.id] ?? 0) > (result.diseaseRisks?.[b.id] ?? 0) ? a : b
      );
      await axiosInstance.post('/simulations', {
        simulationType: topDisease.label,
        currentMetrics: defaultSimulatorParams,
        targetMetrics: params,
      });
      setSaveMsg({ type: 'success', text: '✓ Simulation saved! View it on your dashboard.' });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to save simulation';
      setSaveMsg({ type: 'error', text: `✗ ${msg}` });
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(null), 4000);
    }
  };

  const bmi = useMemo(() => {
    if (!params.weight || !params.height) return null;
    return (params.weight / ((params.height / 100) ** 2)).toFixed(1);
  }, [params.weight, params.height]);

  const bmiCategory = (b) => {
    if (!b) return null;
    if (b < 18.5) return { label: "Underweight", color: "text-blue-400" };
    if (b < 25)   return { label: "Normal",       color: "text-emerald-400" };
    if (b < 30)   return { label: "Overweight",   color: "text-yellow-400" };
    return          { label: "Obese",             color: "text-red-400" };
  };

  const result = useMemo(() => {
    if (!hasData(params)) return null;
    return runSimulation(params);
  }, [params]);

  const grouped = PARAM_CONFIG.reduce((acc, p) => {
    if (!acc[p.group]) acc[p.group] = [];
    acc[p.group].push(p);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950">
      {/* BG grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-teal-400" />
              <h1 className="text-xl font-bold text-white">Health Risk Simulator</h1>
            </div>
            <p className="text-gray-400 text-sm mt-0.5">
              Adjust your health parameters to see how they affect your disease risk.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All
          </button>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6">

          {/* ── Left Panel: Controls ── */}
          <aside className="space-y-4">
            {/* BMI display */}
            <div className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-teal-400 font-semibold mb-2">Computed BMI</p>
              {bmi ? (
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-white">{bmi}</span>
                  <span className={`text-sm font-medium mb-0.5 ${bmiCategory(parseFloat(bmi))?.color}`}>
                    {bmiCategory(parseFloat(bmi))?.label}
                  </span>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Enter weight & height to calculate</p>
              )}
            </div>

            {/* Sliders by group */}
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  {GROUP_LABELS[group]}
                </h3>
                {items.map((cfg) => (
                  <SliderRow
                    key={cfg.key}
                    icon={cfg.icon}
                    label={cfg.label}
                    unit={cfg.unit}
                    value={params[cfg.key]}
                    min={cfg.min}
                    max={cfg.max}
                    step={cfg.step}
                    labels={cfg.labels}
                    onChange={(v) => handleChange(cfg.key, v)}
                  />
                ))}
              </div>
            ))}
          </aside>

          {/* ── Right Panel: Results ── */}
          <main>
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-80 flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
                >
                  <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center mb-4">
                    <FlaskConical className="w-8 h-8 text-teal-400/60" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Ready to Simulate</h3>
                  <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                    Adjust any slider on the left to start seeing your personalized disease risk predictions in real-time.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-teal-400/70 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    Powered by AI risk modeling
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Header & Save */}
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div>
                      <h3 className="text-white font-bold text-lg">Simulation Results</h3>
                      <p className="text-gray-400 text-sm mt-0.5">Real-time AI health assessment</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-teal-500/20 hover:from-teal-400 hover:to-emerald-400 transition-colors disabled:opacity-60"
                      >
                        <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Simulation'}
                      </motion.button>
                      {saveMsg && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`text-xs font-medium ${
                            saveMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {saveMsg.text}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Health Score */}
                    <div className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-2xl p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full blur-3xl opacity-20 pointer-events-none" />
                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <h3 className="text-white font-bold">Overall Health Score</h3>
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${riskBg(100 - result.healthScore)} ${riskColor(100 - result.healthScore)}`}>
                          {result.healthScore >= 70 ? "Good" : result.healthScore >= 50 ? "Moderate" : "Needs Attention"}
                        </span>
                      </div>
                      <div className="flex items-end gap-2 mb-4 relative z-10">
                        <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">{result.healthScore}</span>
                        <span className="text-gray-400 text-sm mb-2 font-medium">/ 100</span>
                      </div>
                      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden relative z-10 shadow-inner">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 shadow-[0_0_10px_rgba(20,184,166,0.6)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.healthScore}%` }}
                          transition={{ duration: 0.7 }}
                        />
                      </div>
                    </div>

                    {/* Radar Chart */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 h-48 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={DISEASES.map(d => ({ factor: d.label, risk: result.diseaseRisks?.[d.id] ?? 0 }))}>
                          <PolarGrid stroke="#334155" />
                          <PolarAngleAxis dataKey="factor" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar name="Risk Level" dataKey="risk" stroke="#2dd4bf" strokeWidth={2} fill="#2dd4bf" fillOpacity={0.4} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            itemStyle={{ color: '#2dd4bf' }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Disease Risks */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-teal-400" />
                      Detailed Risk Breakdown
                    </h3>
                    <div className="space-y-4">
                      {DISEASES.map((d) => (
                        <DiseaseBar
                          key={d.id}
                          label={d.label}
                          color={d.color}
                          value={result.diseaseRisks?.[d.id] ?? 0}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  {result.recommendations && result.recommendations.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-teal-400" />
                        <h3 className="text-white font-bold">AI Recommendations</h3>
                      </div>
                      <div className="space-y-2">
                        {result.recommendations.slice(0, 4).map((rec, i) => (
                          <div key={i} className="flex items-start gap-2 p-3 bg-teal-500/5 border border-teal-500/10 rounded-xl text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                            {rec}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => navigate("/ask-ai")}
                        className="mt-3 w-full py-2 text-teal-400 text-sm hover:text-teal-300 transition-colors flex items-center justify-center gap-1"
                      >
                        Get personalized advice from AI <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Tip */}
                  <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-sm text-amber-200/80">
                    <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    These results are based on general AI models. Always consult a licensed healthcare professional for medical decisions.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HealthSimulatorPage;
