import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, ClockIcon, HeartPulse } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

const RiskSimulatorTab = () => {
  const navigate = useNavigate();
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        const res = await axiosInstance.get('/simulations/mine');
        const data = res.data?.data || res.data || [];
        const arr = Array.isArray(data) ? data : [];
        setSimulations(arr);
        if (arr.length > 0) setSelectedId(arr[0]._id);
      } catch (err) {
        console.error('Failed to fetch simulations', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSimulations();
  }, []);

  const selected = simulations.find((s) => s._id === selectedId);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-emerald-400/50">
        <FlaskConical className="w-8 h-8 animate-pulse mr-3" />
        <span>Loading simulations...</span>
      </div>
    );
  }

  if (simulations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-5">
          <FlaskConical className="w-10 h-10 text-emerald-400/50" />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">No Simulations Saved</h3>
        <p className="text-gray-400 text-sm max-w-xs mb-6">
          Use the Risk Simulator to see how lifestyle changes affect your health and save the results.
        </p>
        <button onClick={() => navigate('/simulator')}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all">
          Open Simulator
        </button>
      </div>
    );
  }

  return (
    <div className="grid xl:grid-cols-[340px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="space-y-3">
        <div className="space-y-2">
          {simulations.map((s) => (
            <motion.button
              key={s._id}
              whileHover={{ x: 3 }}
              onClick={() => setSelectedId(s._id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedId === s._id
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white font-medium text-sm">{s.simulationType || 'Health Simulation'}</span>
                {s.simulatedOutcome?.feasibilityScore != null && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Score: {s.simulatedOutcome.feasibilityScore}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ClockIcon className="w-3 h-3" />
                {new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                {s.simulatedOutcome?.riskReductionPercentage != null && (
                  <>
                    <span className="text-gray-700">•</span>
                    <span className="text-emerald-400/80">{s.simulatedOutcome.riskReductionPercentage}% reduction</span>
                  </>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </aside>

      {/* Detail View */}
      <main>
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-5"
            >
              {/* Header */}
              <div className="rounded-2xl border p-5 bg-emerald-500/10 border-emerald-500/30">
                <h2 className="text-xl font-bold text-white mb-1">{selected.simulationType || 'Health Simulation'}</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Risk Score: {selected.simulatedOutcome?.feasibilityScore || 0}/100
                </p>
                
                <p className="text-gray-300 text-sm mb-1">Estimated Risk Improvement</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-emerald-400">
                    ↓ {selected.simulatedOutcome?.riskReductionPercentage || 0}%
                  </span>
                </div>
                <p className="text-gray-500 text-xs">Compared with your baseline assessment</p>
              </div>

              {/* Target Metrics Compared to Current */}
              {selected.targetMetrics && selected.currentMetrics && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-emerald-400" />
                    Key Changes
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.keys(selected.targetMetrics).filter(k => selected.targetMetrics[k] !== selected.currentMetrics[k]).map((k) => (
                      <div key={k} className="p-3 bg-slate-900/50 rounded-xl text-center border border-white/5">
                        <span className="block text-gray-400 text-xs capitalize mb-1">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className="flex items-center justify-center gap-2 text-sm font-medium">
                          <span className="text-gray-500 line-through">{selected.currentMetrics[k]}</span>
                          <span className="text-emerald-400">{selected.targetMetrics[k]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 bg-white/5 border border-white/10 rounded-2xl text-center"
            >
              <FlaskConical className="w-8 h-8 text-emerald-400/40 mb-3" />
              <p className="text-gray-400 text-sm">Select a simulation to view details</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default RiskSimulatorTab;
