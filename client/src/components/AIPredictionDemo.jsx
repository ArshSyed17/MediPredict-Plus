import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { Brain, HeartPulse, Activity, Droplets, Zap, ArrowRight, CheckCircle } from 'lucide-react';

/* ─── Pure local simulation (no backend, no login needed) ─────────── */
const computeRisks = ({ age, bmi, bloodPressure, glucose, cholesterol }) => {
  // Diabetes risk
  const diabetesRisk = Math.round(
    Math.min(95, Math.max(2,
      (glucose - 70) * 0.4 +
      (bmi - 18) * 1.8 +
      (age - 20) * 0.3
    ))
  );
  // Heart risk
  const heartRisk = Math.round(
    Math.min(95, Math.max(2,
      (bloodPressure - 90) * 0.35 +
      (cholesterol - 150) * 0.06 +
      (age - 20) * 0.25 +
      (bmi - 18) * 0.5
    ))
  );
  const overallRisk = Math.round((diabetesRisk + heartRisk) / 2);
  const confidence = parseFloat((91 + (overallRisk / 100) * 3 + Math.random() * 2).toFixed(1));
  return { diabetesRisk, heartRisk, overallRisk, confidence };
};

/* ─── Progress Bar ─────────────────────────────────────── */
const Bar = ({ value, color }) => (
  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
    <motion.div
      className={`h-full rounded-full ${color}`}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 0.4 }}
    />
  </div>
);

/* ─── Risk tag color ─────────────────────────────────────── */
const riskTag = (v) => {
  if (v < 25) return { label: 'Low', cls: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30' };
  if (v < 55) return { label: 'Moderate', cls: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30' };
  return { label: 'High', cls: 'text-red-400 bg-red-500/20 border-red-500/30' };
};

const METRICS = [
  { key: 'age',          label: 'Age',            unit: 'yrs',   min: 18, max: 80,  color: 'accent-teal-500' },
  { key: 'bmi',          label: 'BMI',             unit: '',      min: 15, max: 40,  color: 'accent-emerald-500' },
  { key: 'bloodPressure',label: 'Blood Pressure',  unit: 'mmHg',  min: 90, max: 180, color: 'accent-teal-500' },
  { key: 'glucose',      label: 'Glucose',         unit: 'mg/dL', min: 70, max: 200, color: 'accent-emerald-500' },
  { key: 'cholesterol',  label: 'Cholesterol',     unit: 'mg/dL', min: 150,max: 300, color: 'accent-teal-500' },
];

const TIPS = {
  diabetesRisk: 'Manage glucose with a low-carb diet, regular exercise, and weight control.',
  heartRisk: 'Reduce sodium, quit smoking, and maintain healthy cholesterol levels.',
};

const AIPredictionDemo = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({ age: 45, bmi: 26, bloodPressure: 120, glucose: 95, cholesterol: 200 });
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const computeRef = useRef(null);

  const handleChange = (key, val) => {
    setMetrics(prev => ({ ...prev, [key]: parseInt(val) }));
  };

  // Debounced auto-compute when already showing results
  useEffect(() => {
    if (!result) return;
    clearTimeout(computeRef.current);
    computeRef.current = setTimeout(() => {
      setResult(computeRisks(metrics));
    }, 120);
    return () => clearTimeout(computeRef.current);
  }, [metrics]);

  const runAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult(computeRisks(metrics));
      setAnalyzing(false);
    }, 1400);
  };

  const overall = result?.overallRisk ?? 0;
  const tag = riskTag(overall);

  return (
    <section id="ai-demo" className="relative py-20 bg-gradient-to-b from-slate-950 via-teal-950/30 to-slate-950 overflow-hidden">
      {/* BG grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            Live AI Demo — No Login Required
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            See How Our AI Works
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Adjust the sliders and click Analyze. Our AI model computes your disease risk instantly — right here on the page.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* ── Left: Inputs ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-5"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-400" />
              Your Health Metrics
            </h3>

            {METRICS.map(({ key, label, unit, min, max }) => (
              <div key={key}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-gray-300">{label}</span>
                  <span className="text-sm font-bold text-teal-400 tabular-nums">
                    {metrics[key]}{unit && ` ${unit}`}
                  </span>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-100"
                    style={{ width: `${((metrics[key] - min) / (max - min)) * 100}%` }}
                  />
                  <input
                    type="range" min={min} max={max} value={metrics[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={runAnalysis}
              disabled={analyzing}
              className="w-full mt-2 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all"
            >
              {analyzing ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>
                    <Brain className="w-5 h-5" />
                  </motion.div>
                  AI Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  {result ? 'Re-Analyze' : 'Analyze My Risk'}
                </>
              )}
            </motion.button>

            <p className="text-center text-xs text-gray-600">
              ⚕️ Demo only — not a medical diagnosis. Sign up for full analysis.
            </p>
          </motion.div>

          {/* ── Right: Results ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
              <HeartPulse className="w-5 h-5 text-emerald-400" />
              AI Prediction Results
            </h3>

            <AnimatePresence mode="wait">
              {!result && !analyzing ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center mb-4">
                    <Brain className="w-8 h-8 text-teal-400/50" />
                  </div>
                  <p className="text-gray-400 text-sm">Adjust sliders and click<br /><strong className="text-teal-400">Analyze My Risk</strong> to see results</p>
                </motion.div>
              ) : analyzing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 py-4"
                >
                  {['Analyzing biomarkers...', 'Running disease models...', 'Computing risk scores...'].map((s, i) => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.35 }}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <motion.div
                        className="w-2 h-2 bg-teal-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, delay: i * 0.35, repeat: Infinity }}
                      />
                      {s}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Overall badge */}
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${tag.cls}`}>
                    <span className="text-sm font-semibold text-white">Overall Risk</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-white">{result.overallRisk}%</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${tag.cls}`}>{tag.label}</span>
                    </div>
                  </div>

                  {/* Diabetes */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Diabetes Risk</span>
                      <span className={`font-bold ${riskTag(result.diabetesRisk).cls.split(' ')[0]}`}>{result.diabetesRisk}%</span>
                    </div>
                    <Bar value={result.diabetesRisk} color="bg-gradient-to-r from-orange-500 to-red-500" />
                  </div>

                  {/* Heart */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Heart Disease Risk</span>
                      <span className={`font-bold ${riskTag(result.heartRisk).cls.split(' ')[0]}`}>{result.heartRisk}%</span>
                    </div>
                    <Bar value={result.heartRisk} color="bg-gradient-to-r from-red-500 to-pink-500" />
                  </div>

                  {/* Confidence */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">AI Confidence</span>
                      <span className="font-bold text-emerald-400">{result.confidence}%</span>
                    </div>
                    <Bar value={result.confidence} color="bg-gradient-to-r from-teal-500 to-emerald-400" />
                  </div>

                  {/* Tips */}
                  {result.overallRisk > 20 && (
                    <div className="mt-1 p-3 bg-teal-500/5 border border-teal-500/10 rounded-xl text-xs text-gray-400 leading-relaxed">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-400 inline mr-1.5" />
                      {result.diabetesRisk > result.heartRisk ? TIPS.diabetesRisk : TIPS.heartRisk}
                    </div>
                  )}

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(ROUTES.REGISTER)}
                    className="w-full mt-1 py-3 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/30 text-teal-300 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:from-teal-500/30 transition-all"
                  >
                    Get Your Full Health Report
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIPredictionDemo;
