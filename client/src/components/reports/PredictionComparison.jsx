import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import GlassCard from "./ui/GlassCard";

const PredictionComparison = ({ comparison }) => {
  const data = [
    {
      metric: "Health Score",
      before: comparison.before.healthScore,
      after: comparison.after.healthScore,
    },
    {
      metric: "Diabetes Risk",
      before: comparison.before.diabetesRisk,
      after: comparison.after.diabetesRisk,
    },
    {
      metric: "Hypertension Risk",
      before: comparison.before.hypertensionRisk,
      after: comparison.after.hypertensionRisk,
    },
  ];

  return (
    <GlassCard title="Prediction Comparison" subtitle="Before and after lifestyle intervention projection.">
      <div className="h-64">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="metric" stroke="#cbd5e1" tick={{ fontSize: 11 }} />
            <YAxis stroke="#cbd5e1" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
              }}
            />
            <Legend />
            <Bar dataKey="before" name="Before" fill="#64748b" radius={[6, 6, 0, 0]} />
            <Bar dataKey="after" name="After" fill="#22d3ee" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

export default PredictionComparison;
