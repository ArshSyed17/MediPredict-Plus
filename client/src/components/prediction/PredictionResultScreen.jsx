import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Save, Sparkles, MessageSquare, ChevronRight } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const riskColor = (risk) => (risk >= 70 ? "#fb7185" : risk >= 40 ? "#facc15" : "#4ade80");

const PredictionResultScreen = ({ result, onSave, onReset }) => {
  const navigate = useNavigate();
  const riskChartData = [{ name: "Risk", value: result.risk, fill: riskColor(result.risk) }];

  return (
    <div className="space-y-5">
      <GlassCard
        title={`Prediction Result: ${result.disease}`}
        subtitle={`Generated ${new Date(result.generatedAt).toLocaleString()}`}
        action={
          <button onClick={onSave} className="flex items-center gap-2 rounded-lg bg-cyan-500/20 px-3 py-1.5 text-sm text-cyan-200">
            <Save className="h-4 w-4" /> Save Prediction
          </button>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <p className="text-xs text-slate-300">AI Confidence</p>
            <p className="mt-1 text-2xl font-semibold text-cyan-300">{result.confidence}%</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <p className="text-xs text-slate-300">Risk Category</p>
            <p className="mt-1 text-2xl font-semibold text-white">{result.risk >= 70 ? "High" : result.risk >= 40 ? "Moderate" : "Low"}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <p className="text-xs text-slate-300">Predicted Risk</p>
            <p className="mt-1 text-2xl font-semibold text-white">{result.risk}%</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard title="Risk Gauge">
          <div className="h-56">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="65%" outerRadius="95%" data={riskChartData} startAngle={180} endAngle={0}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={12} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard title="Risk Factors (Radar Analysis)">
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={result.factors}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="factor" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Impact" dataKey="contribution" stroke="#2dd4bf" strokeWidth={2} fill="#2dd4bf" fillOpacity={0.4} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#2dd4bf' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard title="Explainable AI Drivers">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={result.factors} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#cbd5e1" tick={{ fontSize: 10 }} />
                <YAxis dataKey="factor" type="category" stroke="#cbd5e1" tick={{ fontSize: 11 }} width={90} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#2dd4bf' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="contribution" radius={[0, 4, 4, 0]}>
                  {result.factors.map((factor, index) => (
                    <Cell key={factor.factor} fill={index % 2 === 0 ? "#2dd4bf" : "#818cf8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard title="Prediction Comparison (Cohort Benchmark)">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={result.comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPatient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBench" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#cbd5e1" tick={{ fontSize: 12 }} />
                <YAxis stroke="#cbd5e1" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="patient" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorPatient)" name="Your Risk" />
                <Area type="monotone" dataKey="benchmark" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorBench)" name="Avg Cohort" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard title="Recommendation Panel">
          <div className="space-y-3 h-64 overflow-y-auto pr-2 custom-scrollbar">
            {result.recommendations.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-teal-500/20 bg-teal-500/5 p-3 text-sm text-slate-100 shadow-sm transition-all hover:bg-teal-500/10 hover:border-teal-500/30">
                <div className="mt-0.5 bg-teal-500/20 p-1.5 rounded-lg text-teal-400">
                  <Sparkles className="h-4 w-4" />
                </div>
                <p className="leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          {/* Ask AI for personalized exercise / diet advice */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/ask-ai')}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-teal-500/30 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 py-2.5 text-sm font-medium text-teal-300 hover:from-teal-500/20 hover:to-emerald-500/20 shadow-lg shadow-teal-500/5 transition-all"
          >
            <MessageSquare className="h-4 w-4" />
            Get Detailed AI Action Plan
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </GlassCard>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSave}
          className="flex-1 rounded-xl border border-teal-500/20 bg-teal-500/10 py-2.5 text-sm font-medium text-teal-300 hover:bg-teal-500/20 transition-all"
        >
          Save This Result
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
        >
          New Prediction
        </motion.button>
      </div>
    </div>
  );
};

export default PredictionResultScreen;
