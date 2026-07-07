import React from "react";

const statusTone = {
  "High Risk": "text-rose-300",
  Moderate: "text-amber-300",
  Good: "text-emerald-300",
};

const PatientTable = ({ patients }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-400">
          <th className="pb-3 pr-4">Patient</th>
          <th className="pb-3 pr-4">Health Status</th>
          <th className="pb-3 pr-4">Score</th>
          <th className="pb-3 pr-4">Predictions</th>
          <th className="pb-3 pr-4">Reports</th>
          <th className="pb-3">Doctor</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
            <td className="py-3 pr-4">
              <p className="font-medium text-white">{p.name}</p>
              <p className="text-xs text-slate-400">{p.id}</p>
            </td>
            <td className={`py-3 pr-4 ${statusTone[p.healthStatus] ?? "text-slate-300"}`}>{p.healthStatus}</td>
            <td className="py-3 pr-4 text-white">{p.healthScore}</td>
            <td className="py-3 pr-4 text-slate-300">{p.predictions}</td>
            <td className="py-3 pr-4 text-slate-300">{p.reports}</td>
            <td className="py-3 text-slate-300">{p.doctor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PatientTable;
