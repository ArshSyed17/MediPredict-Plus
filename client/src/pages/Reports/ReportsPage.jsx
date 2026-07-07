import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Brain, Activity, Calendar, ChevronRight, Search,
  Filter, Sparkles, AlertTriangle, CheckCircle,
  ClockIcon, BarChart3, ArrowLeft, MessageSquare,
  TrendingUp, TrendingDown, Shield,
} from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

/* ─── Helpers ─────────────────────────────── */
const riskColor = (level) => {
  if (!level) return 'text-gray-400';
  const l = level.toLowerCase();
  if (l === 'high') return 'text-red-400';
  if (l === 'medium' || l === 'moderate') return 'text-yellow-400';
  return 'text-emerald-400';
};
const riskBg = (level) => {
  if (!level) return 'bg-gray-500/10 border-gray-500/20';
  const l = level.toLowerCase();
  if (l === 'high') return 'bg-red-500/10 border-red-500/30';
  if (l === 'medium' || l === 'moderate') return 'bg-yellow-500/10 border-yellow-500/30';
  return 'bg-emerald-500/10 border-emerald-500/30';
};
const RiskIcon = ({ level }) => {
  const l = (level || '').toLowerCase();
  if (l === 'high') return <AlertTriangle className="w-4 h-4 text-red-400" />;
  if (l === 'medium' || l === 'moderate') return <TrendingUp className="w-4 h-4 text-yellow-400" />;
  return <CheckCircle className="w-4 h-4 text-emerald-400" />;
};

/* ─── Prediction Detail Panel ─────────────────────────── */
const PredictionDetail = ({ prediction, onBack }) => {
  if (!prediction) return null;
  const recommendations = prediction.recommendedActions || [];
  const features = prediction.inputFeatures || {};

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className={`rounded-2xl border p-5 ${riskBg(prediction.riskLevel)}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-white">{prediction.diseaseType || 'Health Assessment'}</h2>
            <p className="text-gray-400 text-sm mt-0.5">
              {new Date(prediction.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold ${riskBg(prediction.riskLevel)} ${riskColor(prediction.riskLevel)}`}>
            <RiskIcon level={prediction.riskLevel} />
            {prediction.riskLevel || 'Unknown'} Risk
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/20 rounded-xl p-3 text-center">
            <p className="text-gray-400 text-xs mb-0.5">Predicted Risk</p>
            <p className={`text-2xl font-bold ${riskColor(prediction.riskLevel)}`}>
              {prediction.confidenceScore ? `${Math.round((prediction.riskLevel === 'High' ? 0.85 : prediction.riskLevel === 'Medium' ? 0.5 : 0.18) * 100)}%` : '—'}
            </p>
          </div>
          <div className="bg-black/20 rounded-xl p-3 text-center">
            <p className="text-gray-400 text-xs mb-0.5">AI Confidence</p>
            <p className="text-2xl font-bold text-teal-400">{prediction.confidenceScore ?? '—'}%</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <h3 className="text-white font-bold">AI Recommendations</h3>
          </div>
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-teal-500/5 border border-teal-500/10 rounded-xl text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                {rec}
              </div>
            ))}
          </div>
          <button
            onClick={() => window.location.href = '/ask-ai'}
            className="mt-3 flex items-center gap-1.5 text-teal-400 text-sm hover:text-teal-300 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Ask AI for personalized advice
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input summary */}
      {Object.keys(features).length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal-400" />
            Input Parameters Used
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(features).slice(0, 12).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg text-xs">
                <span className="text-gray-400 capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-white font-medium">{typeof v === 'boolean' ? (v ? 'Yes' : 'No') : String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Note */}
      <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl text-xs text-amber-200/70">
        <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        These results are generated by AI models for informational purposes only. Please consult a licensed healthcare professional for medical advice.
      </div>
    </motion.div>
  );
};

/* ─── Prediction List Item ─────────────────────────── */
const PredictionItem = ({ prediction, selected, onClick }) => (
  <motion.button
    whileHover={{ x: 3 }}
    onClick={onClick}
    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
      selected
        ? 'bg-teal-500/10 border-teal-500/30'
        : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
    }`}
  >
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-white font-medium text-sm">{prediction.diseaseType || 'Assessment'}</span>
      <span className={`text-xs font-semibold ${riskColor(prediction.riskLevel)}`}>
        {prediction.riskLevel || '—'}
      </span>
    </div>
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <ClockIcon className="w-3 h-3" />
      {new Date(prediction.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      {prediction.confidenceScore && (
        <>
          <span className="text-gray-700">•</span>
          <span className="text-teal-400/80">{prediction.confidenceScore}% confidence</span>
        </>
      )}
    </div>
  </motion.button>
);

/* ─── Main Page ─────────────────────────────── */
import MedicalReportsTab from './MedicalReportsTab';
import RiskSimulatorTab from './RiskSimulatorTab';

const ReportsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('predictions'); // 'predictions' or 'medical'
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get('/predictions/mine');
        const data = res.data?.data || res.data || [];
        const arr = Array.isArray(data) ? data : [];
        setPredictions(arr);
        if (arr.length > 0) setSelectedId(arr[0]._id);
      } catch {
        setPredictions([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const RISK_LEVELS = ['All', 'Low', 'Medium', 'High'];

  const filtered = predictions.filter((p) => {
    const matchSearch = !search || (p.diseaseType || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || (p.riskLevel || '').toLowerCase() === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const selected = predictions.find((p) => p._id === selectedId);

  const stats = {
    total: predictions.length,
    high: predictions.filter((p) => p.riskLevel === 'High').length,
    low: predictions.filter((p) => p.riskLevel === 'Low').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950">
      {/* BG grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <button onClick={() => navigate('/dashboard')}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-teal-400" />
              Health Records
            </h1>
            <p className="text-gray-400 text-sm">Manage your predictions and medical reports</p>
          </div>
          <div className="ml-auto">
            <button onClick={() => navigate('/prediction')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all">
              <Activity className="w-4 h-4" />
              New Prediction
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 mb-7 overflow-x-auto">
          <button
            onClick={() => setActiveTab('predictions')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'predictions' ? 'border-teal-400 text-teal-400' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            AI Predictions
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'simulator' ? 'border-teal-400 text-teal-400' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Risk Simulator
          </button>
          <button
            onClick={() => setActiveTab('medical')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'medical' ? 'border-teal-400 text-teal-400' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Medical Reports
          </button>
        </div>

        {activeTab === 'medical' ? (
          <MedicalReportsTab />
        ) : activeTab === 'simulator' ? (
          <RiskSimulatorTab />
        ) : (
          <>
            {/* Stats */}
            {predictions.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Total', value: stats.total, icon: BarChart3, color: 'text-teal-400' },
                  { label: 'High Risk', value: stats.high, icon: AlertTriangle, color: 'text-red-400' },
                  { label: 'Low Risk', value: stats.low, icon: CheckCircle, color: 'text-emerald-400' },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <div>
                      <p className={`text-xl font-bold ${color}`}>{value}</p>
                      <p className="text-gray-500 text-xs">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

        {loading ? (
          <div className="flex items-center justify-center py-24 text-teal-400/50">
            <Brain className="w-8 h-8 animate-pulse mr-3" />
            <span>Loading predictions...</span>
          </div>
        ) : predictions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center mb-5">
              <Brain className="w-10 h-10 text-teal-400/50" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">No Predictions Yet</h3>
            <p className="text-gray-400 text-sm max-w-xs mb-6">
              Run your first AI Disease Prediction to generate a health assessment report.
            </p>
            <button onClick={() => navigate('/prediction')}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all">
              Run AI Prediction
            </button>
          </div>
        ) : (
          <div className="grid xl:grid-cols-[340px_1fr] gap-6">
            {/* Sidebar */}
            <aside className="space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text" placeholder="Search predictions..."
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-all"
                />
              </div>

              {/* Risk filter */}
              <div className="flex gap-2 flex-wrap">
                {RISK_LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() => setFilter(level)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      filter === level
                        ? 'bg-teal-500/20 border border-teal-500/30 text-teal-300'
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {/* List */}
              <div className="space-y-2">
                {filtered.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-8">No predictions match your filter.</p>
                ) : (
                  filtered.map((p) => (
                    <PredictionItem
                      key={p._id}
                      prediction={p}
                      selected={selectedId === p._id}
                      onClick={() => setSelectedId(p._id)}
                    />
                  ))
                )}
              </div>
            </aside>

            {/* Detail */}
            <main>
              <AnimatePresence mode="wait">
                {selected ? (
                  <PredictionDetail key={selectedId} prediction={selected} onBack={() => setSelectedId(null)} />
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 bg-white/5 border border-white/10 rounded-2xl text-center"
                  >
                    <Brain className="w-8 h-8 text-teal-400/40 mb-3" />
                    <p className="text-gray-400 text-sm">Select a prediction to view its full report</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
