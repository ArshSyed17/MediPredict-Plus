import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Activity, FlaskConical, MessageSquare, Settings,
  Brain, TrendingUp, Clock, AlertCircle, CheckCircle,
  HeartPulse, ChevronRight, Sparkles, BarChart3, Heart,
  FileText, Shield, Download, ClipboardList,
} from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

/* ─── Greeting ─────────────────────────────── */
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const riskColor = (level) => {
  if (!level) return 'text-gray-400';
  const l = level.toLowerCase();
  if (l === 'high') return 'text-red-400';
  if (l === 'medium' || l === 'moderate') return 'text-yellow-400';
  return 'text-emerald-400';
};

const riskBg = (level) => {
  if (!level) return 'bg-gray-500/20';
  const l = level.toLowerCase();
  if (l === 'high') return 'bg-red-500/20 border-red-500/30';
  if (l === 'medium' || l === 'moderate') return 'bg-yellow-500/20 border-yellow-500/30';
  return 'bg-emerald-500/20 border-emerald-500/30';
};

/* ─── Quick Actions ─────────────────────────── */
const QUICK_ACTIONS = [
  { icon: Activity,      label: 'AI Disease Prediction', desc: 'Run a new health risk assessment', path: '/prediction', gradient: 'from-teal-500 to-emerald-500' },
  { icon: FlaskConical,  label: 'Risk Simulator',        desc: 'Simulate lifestyle changes',        path: '/simulator', gradient: 'from-emerald-500 to-cyan-500' },
  { icon: MessageSquare, label: 'Ask AI',                desc: 'Chat with your health assistant',   path: '/ask-ai',   gradient: 'from-cyan-500 to-teal-500' },
  { icon: Settings,      label: 'Settings',              desc: 'Manage your account',               path: '/settings', gradient: 'from-teal-600 to-slate-600' },
];

/* ─── Quick Actions Grid ─────────────────────── */
const QuickActionsGrid = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {QUICK_ACTIONS.map(({ icon: Icon, label, desc, path, gradient }) => (
        <motion.button
          key={path}
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate(path)}
          className="group flex flex-col items-center gap-3 p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/30 rounded-2xl transition-all duration-200 text-left"
        >
          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-teal-500/20`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm text-center">{label}</p>
            <p className="text-gray-500 text-xs text-center mt-0.5 leading-tight">{desc}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

/* ─── Prediction History Card ─────────────────── */
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const PredictionHistoryCard = ({ predictions }) => {
  const navigate = useNavigate();
  if (!predictions || predictions.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
        <Brain className="w-10 h-10 text-teal-400/50 mx-auto mb-3" />
        <p className="text-white font-semibold">No Predictions Yet</p>
        <p className="text-gray-400 text-sm mt-1 mb-4">Run your first AI Disease Prediction to see results here.</p>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/prediction')}
          className="px-4 py-2 bg-teal-500/20 border border-teal-500/30 text-teal-300 rounded-xl text-sm font-medium hover:bg-teal-500/30 transition-all"
        >
          Run AI Prediction
        </motion.button>
      </div>
    );
  }

  // Create chart data by mapping risk levels to a numerical score
  const chartData = [...predictions].reverse().map(p => {
    let riskScore = 15;
    if (p.riskLevel === 'High') riskScore = 85;
    if (p.riskLevel === 'Medium') riskScore = 50;
    return {
      date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      risk: riskScore,
      disease: p.diseaseType || 'Assessment'
    };
  });

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-teal-400" />
          <h3 className="text-white font-bold">My Risk Trend & Predictions</h3>
        </div>
        <span className="text-gray-400 text-xs">{predictions.length} result{predictions.length !== 1 ? 's' : ''}</span>
      </div>

      {chartData.length > 1 && (
        <div className="h-40 w-full pt-4 pb-0 px-2 border-b border-white/5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#2dd4bf' }}
              />
              <Area type="monotone" dataKey="risk" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="divide-y divide-white/5 flex-1 overflow-y-auto">
        {predictions.slice(0, 5).map((p, i) => (
          <motion.div
            key={p._id || i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-4 hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${p.riskLevel === 'High' ? 'bg-red-400' : p.riskLevel === 'Medium' ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
              <div>
                <p className="text-white text-sm font-medium">{p.diseaseType || 'Health Assessment'}</p>
                <p className="text-gray-500 text-xs">{new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${riskBg(p.riskLevel)} ${riskColor(p.riskLevel)}`}>
                {p.riskLevel || 'N/A'}
              </span>
              {p.confidenceScore && (
                <p className="text-gray-500 text-xs mt-1">{p.confidenceScore}% confidence</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      {predictions.length > 5 && (
        <div className="p-3 border-t border-white/10 text-center">
          <button onClick={() => navigate('/prediction')} className="text-teal-400 text-sm hover:text-teal-300 transition-colors flex items-center gap-1 mx-auto">
            View all {predictions.length} predictions <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

/* ─── Simulator History Card ─────────────────────── */
const SimulatorHistoryCard = ({ simulations }) => {
  const navigate = useNavigate();

  if (!simulations || simulations.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
        <FlaskConical className="w-10 h-10 text-teal-400/50 mx-auto mb-3" />
        <p className="text-white font-semibold">No Simulations Saved Yet</p>
        <p className="text-gray-400 text-sm mt-1 mb-4">Use the Risk Simulator and save results to see them here.</p>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/simulator')}
          className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm font-medium hover:bg-emerald-500/30 transition-all"
        >
          Open Risk Simulator
        </motion.button>
      </div>
    );
  }

  // Chart data from simulations
  const chartData = [...simulations].reverse().map((s, i) => ({
    name: new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: s.simulatedOutcome?.feasibilityScore ?? (80 - i * 5),
    reduction: s.simulatedOutcome?.riskReductionPercentage ?? 0,
  }));

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-bold">Risk Simulator History</h3>
        </div>
        <span className="text-gray-400 text-xs">{simulations.length} session{simulations.length !== 1 ? 's' : ''}</span>
      </div>

      {chartData.length > 1 && (
        <div className="h-36 w-full pt-3 pb-0 px-2 border-b border-white/5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#34d399' }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((_, idx) => (
                  <Cell key={idx} fill={`hsl(${160 + idx * 10}, 70%, 50%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="divide-y divide-white/5">
        {simulations.slice(0, 4).map((s, i) => (
          <motion.div
            key={s._id || i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-4 hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{s.simulationType || 'Health Simulation'}</p>
                <p className="text-gray-500 text-xs">{new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="text-right">
              {s.simulatedOutcome?.riskReductionPercentage != null && (
                <span className="text-xs font-semibold px-2 py-1 rounded-full border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                  {s.simulatedOutcome.riskReductionPercentage}% reduction
                </span>
              )}
              {s.simulatedOutcome?.feasibilityScore != null && (
                <p className="text-gray-500 text-xs mt-1">Score: {s.simulatedOutcome.feasibilityScore}/100</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-3 border-t border-white/10 text-center">
        <button onClick={() => navigate('/simulator')} className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors flex items-center gap-1 mx-auto">
          Open Risk Simulator <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ─── Stats Banner ─────────────────────────── */
const StatsBanner = ({ predictions }) => {
  const total = predictions?.length ?? 0;
  const highRisk = predictions?.filter(p => p.riskLevel === 'High').length ?? 0;
  const lowRisk = predictions?.filter(p => p.riskLevel === 'Low').length ?? 0;
  const lastDate = predictions?.[0]?.createdAt
    ? new Date(predictions[0].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : 'Never';

  const stats = [
    { icon: BarChart3,    label: 'Total Predictions', value: total,    color: 'text-teal-400' },
    { icon: AlertCircle,  label: 'High Risk',          value: highRisk, color: 'text-red-400' },
    { icon: CheckCircle,  label: 'Low Risk',           value: lowRisk,  color: 'text-emerald-400' },
    { icon: Clock,        label: 'Last Assessment',    value: lastDate, color: 'text-cyan-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div>
            <p className={`text-lg font-bold ${color}`}>{value}</p>
            <p className="text-gray-500 text-xs">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─── Latest Prediction Insights ─────────────────────────── */
const LatestPredictionInsights = ({ latestPrediction }) => {
  const navigate = useNavigate();
  
  if (!latestPrediction) {
    return (
      <div className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span className="text-teal-400 text-xs font-semibold uppercase tracking-wide">Health Insights</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">Run an AI prediction to get personalized health scores and actionable recommendations.</p>
        <button
          onClick={() => navigate('/prediction')}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-teal-500/30 bg-teal-500/20 py-2 text-sm font-medium text-teal-300 hover:bg-teal-500/30 transition-all"
        >
          Run AI Prediction
        </button>
      </div>
    );
  }

  // Calculate a generic health score from risk level if not explicitly provided
  const riskScore = latestPrediction.riskLevel === 'High' ? 30 : latestPrediction.riskLevel === 'Medium' ? 65 : 92;
  const recommendations = latestPrediction.recommendedActions || [
    'Maintain a balanced diet rich in vegetables.',
    'Ensure you get at least 30 minutes of daily exercise.',
    'Stay hydrated and monitor your vitals.'
  ];

  return (
    <div className="bg-gradient-to-br from-teal-500/5 to-emerald-500/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full blur-3xl opacity-10 pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Sparkles className="w-4 h-4 text-teal-400" />
        <span className="text-white font-bold">Latest Health Insights</span>
      </div>

      <div className="mb-5 relative z-10">
        <p className="text-xs text-gray-400 mb-1">Estimated Health Score</p>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">{riskScore}</span>
          <span className="text-gray-500 text-sm mb-1 font-medium">/ 100</span>
        </div>
      </div>

      <div className="flex-1 relative z-10">
        <p className="text-xs text-teal-400 font-semibold uppercase tracking-wide mb-3">Recommended Actions</p>
        <div className="space-y-2">
          {recommendations.slice(0, 3).map((rec, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/5 p-2.5 rounded-lg border border-white/5 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
              <p className="leading-tight">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate('/ask-ai')}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-teal-500/30 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 py-2.5 text-sm font-medium text-teal-300 hover:from-teal-500/20 hover:to-emerald-500/20 transition-all relative z-10"
      >
        <MessageSquare className="w-4 h-4" />
        Ask AI for Details
      </button>
    </div>
  );
};

/* ─── Medical Reports Dashboard Section ─────────────────────── */
const MedicalReportsDashboard = ({ predictions, simulations, medicalReports, loading }) => {
  const navigate = useNavigate();

  // Combine latest prediction + simulation as report entries
  const latestPrediction = predictions?.[0];
  const latestSimulation = simulations?.[0];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-bold">Medical Reports & Results</h3>
        </div>
        <button
          onClick={() => navigate('/reports')}
          className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 transition-colors font-medium"
        >
          View All <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-5 grid md:grid-cols-3 gap-4">

        {/* AI Disease Prediction Result */}
        <div className={`rounded-xl border p-4 relative overflow-hidden ${
          latestPrediction
            ? (latestPrediction.riskLevel === 'High' ? 'bg-red-500/5 border-red-500/20' :
               latestPrediction.riskLevel === 'Medium' ? 'bg-yellow-500/5 border-yellow-500/20' :
               'bg-emerald-500/5 border-emerald-500/20')
            : 'bg-white/5 border-white/10'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">AI Disease Prediction</p>
              <p className="text-gray-500 text-xs">Latest Result</p>
            </div>
          </div>
          {latestPrediction ? (
            <>
              <div className="mb-3">
                <p className="text-gray-400 text-xs mb-1">Disease</p>
                <p className="text-white font-bold">{latestPrediction.diseaseType || 'General Assessment'}</p>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Risk Level</p>
                  <span className={`text-sm font-bold ${riskColor(latestPrediction.riskLevel)}`}>
                    {latestPrediction.riskLevel || '—'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">Confidence</p>
                  <p className="text-teal-400 text-sm font-bold">{latestPrediction.confidenceScore ?? '—'}%</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs">
                {new Date(latestPrediction.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <button
                onClick={() => navigate('/reports')}
                className="mt-3 w-full py-1.5 text-xs rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:bg-teal-500/20 transition-all"
              >
                View Full Report
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-3">No prediction run yet.</p>
              <button
                onClick={() => navigate('/prediction')}
                className="w-full py-1.5 text-xs rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:bg-teal-500/20 transition-all"
              >
                Run AI Prediction
              </button>
            </>
          )}
        </div>

        {/* Risk Simulator Result */}
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Risk Simulator</p>
              <p className="text-gray-500 text-xs">Latest Session</p>
            </div>
          </div>
          {latestSimulation ? (
            <>
              <div className="mb-3">
                <p className="text-gray-400 text-xs mb-1">Simulation Type</p>
                <p className="text-white font-bold">{latestSimulation.simulationType || 'Health Simulation'}</p>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Risk Reduction</p>
                  <p className="text-emerald-400 text-sm font-bold">
                    {latestSimulation.simulatedOutcome?.riskReductionPercentage != null
                      ? `${latestSimulation.simulatedOutcome.riskReductionPercentage}% reduction`
                      : '—'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">Feasibility</p>
                  <p className="text-cyan-400 text-sm font-bold">
                    {latestSimulation.simulatedOutcome?.feasibilityScore != null
                      ? `${latestSimulation.simulatedOutcome.feasibilityScore}/100`
                      : '—'}
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-xs">
                {new Date(latestSimulation.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <button
                onClick={() => navigate('/simulator')}
                className="mt-3 w-full py-1.5 text-xs rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                Open Simulator
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-3">No simulations saved yet.</p>
              <button
                onClick={() => navigate('/simulator')}
                className="w-full py-1.5 text-xs rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                Open Simulator
              </button>
            </>
          )}
        </div>

        {/* Uploaded Medical Reports */}
        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Medical Reports</p>
              <p className="text-gray-500 text-xs">Uploaded Files</p>
            </div>
          </div>
          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : medicalReports.length === 0 ? (
            <>
              <p className="text-gray-400 text-sm mb-3">No reports uploaded yet.</p>
              <button
                onClick={() => navigate('/reports')}
                className="w-full py-1.5 text-xs rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all"
              >
                Upload Report
              </button>
            </>
          ) : (
            <>
              <div className="space-y-2 mb-3">
                {medicalReports.slice(0, 3).map((r) => (
                  <div key={r._id} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <p className="text-white text-xs truncate">{r.reportType}</p>
                    </div>
                    {r.fileUrl && (
                      <a href={`${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api/v1', '') : 'http://localhost:5000'}${r.fileUrl}`} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300">
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Shield className="w-3.5 h-3.5" />
                {medicalReports.length} file{medicalReports.length !== 1 ? 's' : ''} encrypted & stored
              </div>
              <button
                onClick={() => navigate('/reports')}
                className="mt-2 w-full py-1.5 text-xs rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all"
              >
                Manage Reports
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Main DashboardPage ─────────────────────── */
const DashboardPage = () => {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [simulations, setSimulations] = useState([]);
  const [medicalReports, setMedicalReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [predRes, simRes, repRes] = await Promise.allSettled([
          axiosInstance.get('/predictions/mine'),
          axiosInstance.get('/simulations/mine'),
          axiosInstance.get('/reports/me'),
        ]);
        const predData = predRes.status === 'fulfilled' ? (predRes.value.data?.data || predRes.value.data || []) : [];
        const simData = simRes.status === 'fulfilled' ? (simRes.value.data?.data || simRes.value.data || []) : [];
        const repData = repRes.status === 'fulfilled' ? (repRes.value.data?.data || repRes.value.data || []) : [];
        setPredictions(Array.isArray(predData) ? predData : []);
        setSimulations(Array.isArray(simData) ? simData : []);
        setMedicalReports(Array.isArray(repData) ? repData : []);
      } catch {
        setPredictions([]);
        setSimulations([]);
        setMedicalReports([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950">
      {/* Background grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Header (Navbar/Notifications/Profile) */}
        <DashboardHeader />

        {/* Welcome Banner */}
        <motion.div {...fadeUp(0)}>
          <div className="bg-gradient-to-r from-teal-600/20 via-emerald-600/15 to-cyan-600/10 border border-white/10 rounded-2xl px-6 py-5 flex items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <HeartPulse className="w-5 h-5 text-teal-400" />
                <span className="text-teal-400 text-sm font-medium">MediPredict+ Dashboard</span>
              </div>
              <h1 className="text-2xl font-bold text-white">
                {getGreeting()}, {user?.firstName || 'there'} 👋
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Quick Actions (TOP as requested) ── */}
        <motion.section {...fadeUp(0.05)}>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            <h2 className="text-white font-bold">Quick Actions</h2>
          </div>
          <QuickActionsGrid />
        </motion.section>

        {/* ── Stats Row (real data from predictions) ── */}
        {!loading && (
          <motion.section {...fadeUp(0.1)}>
            <StatsBanner predictions={predictions} />
          </motion.section>
        )}

        {/* ── Main Content: Predictions + Simulator side-by-side ── */}
        <motion.section {...fadeUp(0.15)} className="grid lg:grid-cols-2 gap-5">
          <div>
            {loading ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-teal-400/50">
                <Brain className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                <p className="text-sm">Loading predictions...</p>
              </div>
            ) : (
              <PredictionHistoryCard predictions={predictions} />
            )}
          </div>
          <div>
            {loading ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-emerald-400/50">
                <FlaskConical className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                <p className="text-sm">Loading simulations...</p>
              </div>
            ) : (
              <SimulatorHistoryCard simulations={simulations} />
            )}
          </div>
        </motion.section>

        {/* ── Medical Reports (full width) ── */}
        <motion.section {...fadeUp(0.2)}>
          <MedicalReportsDashboard
            predictions={predictions}
            simulations={simulations}
            medicalReports={medicalReports}
            loading={loading}
          />
        </motion.section>

        {/* ── AI Insights (full width below) ── */}
        <motion.section {...fadeUp(0.25)}>
          <LatestPredictionInsights latestPrediction={predictions[0]} />
        </motion.section>

      </div>
    </div>
  );
};

export default DashboardPage;
