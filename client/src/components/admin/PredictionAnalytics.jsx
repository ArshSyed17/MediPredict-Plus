import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import GlassCard from "./ui/GlassCard";

const tooltipStyle = { backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" };

const PredictionAnalytics = ({ analytics }) => (
  <div className="grid gap-6 lg:grid-cols-2">
    <GlassCard title="Daily Predictions">
      <div className="h-56">
        <ResponsiveContainer>
          <BarChart data={analytics.daily}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="predictions" fill="#818cf8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
    <GlassCard title="Monthly Predictions">
      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={analytics.monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="predictions" stroke="#22d3ee" strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
    <GlassCard title="Accuracy Trends" className="lg:col-span-2">
      <div className="h-56">
        <ResponsiveContainer>
          <LineChart data={analytics.accuracyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#cbd5e1" />
            <YAxis domain={[88, 100]} stroke="#cbd5e1" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Line type="monotone" dataKey="accuracy" stroke="#4ade80" strokeWidth={2.5} name="Accuracy %" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  </div>
);

export default PredictionAnalytics;
