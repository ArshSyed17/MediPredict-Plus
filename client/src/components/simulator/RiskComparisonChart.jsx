import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RiskComparisonChart = ({
  data,
  dataKeyBefore = "before",
  dataKeyAfter = "after",
  labelKey = "disease",
}) => (
  <div className="h-64 w-full">
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey={labelKey} stroke="#cbd5e1" tick={{ fontSize: 11 }} />
        <YAxis stroke="#cbd5e1" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
          }}
        />
        <Legend />
        <Bar dataKey={dataKeyBefore} name="Before" fill="#64748b" radius={[6, 6, 0, 0]} />
        <Bar dataKey={dataKeyAfter} name="After" fill="#22d3ee" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const HealthScoreTrendChart = ({ data }) => (
  <div className="h-56 w-full">
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="label" stroke="#cbd5e1" />
        <YAxis domain={[0, 100]} stroke="#cbd5e1" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
          }}
        />
        <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default RiskComparisonChart;
