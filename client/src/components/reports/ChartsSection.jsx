import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GlassCard from "./ui/GlassCard";

const chartTooltipStyle = {
  backgroundColor: "#0f172a",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
};

const ChartsSection = ({ trends }) => (
  <div className="grid gap-5 lg:grid-cols-2">
    <GlassCard title="Health Score Trend">
      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={trends.healthScore}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="label" stroke="#cbd5e1" />
            <YAxis domain={[0, 100]} stroke="#cbd5e1" />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2.5} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>

    <GlassCard title="Disease Risk Trend">
      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={trends.diseaseRisk}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="label" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend />
            <Line type="monotone" dataKey="diabetes" stroke="#f97316" strokeWidth={2} />
            <Line type="monotone" dataKey="hypertension" stroke="#facc15" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>

    <GlassCard title="Vitals Trend" className="lg:col-span-2">
      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={trends.vitals}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="label" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend />
            <Line type="monotone" dataKey="bloodSugar" name="Blood Sugar" stroke="#a78bfa" strokeWidth={2} />
            <Line type="monotone" dataKey="systolicBP" name="Systolic BP" stroke="#38bdf8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  </div>
);

export default ChartsSection;
