import React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import GlassCard from "./ui/GlassCard";

const DiseaseAnalytics = ({ data }) => (
  <GlassCard title="Disease Distribution" subtitle="Predictions by disease category.">
    <div className="h-64">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="disease" stroke="#cbd5e1" tick={{ fontSize: 10 }} />
          <YAxis stroke="#cbd5e1" />
          <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
          <Bar dataKey="count" fill="#a78bfa" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </GlassCard>
);

export default DiseaseAnalytics;
