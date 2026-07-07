import React from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const chartTooltip = {
  backgroundColor: "#0f172a",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
};

const HealthTrendChart = ({ data, dataKey = "patients", labelKey = "month", color = "#22d3ee" }) => (
  <div className="h-56 w-full">
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey={labelKey} stroke="#cbd5e1" tick={{ fontSize: 11 }} />
        <YAxis stroke="#cbd5e1" />
        <Tooltip contentStyle={chartTooltip} />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default HealthTrendChart;
