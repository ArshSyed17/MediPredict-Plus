import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const DoctorTable = ({ doctors }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-400">
          <th className="pb-3 pr-4">Doctor</th>
          <th className="pb-3 pr-4">Specialization</th>
          <th className="pb-3 pr-4">Verified</th>
          <th className="pb-3 pr-4">Patients</th>
          <th className="pb-3 pr-4">Accuracy</th>
          <th className="pb-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doc) => (
          <tr key={doc.id} className="border-b border-white/5 hover:bg-white/5">
            <td className="py-3 pr-4">
              <p className="font-medium text-white">{doc.name}</p>
              <p className="text-xs text-slate-400">{doc.email}</p>
            </td>
            <td className="py-3 pr-4 text-slate-300">{doc.specialty}</td>
            <td className="py-3 pr-4">
              {doc.verified ? (
                <CheckCircle className="h-4 w-4 text-emerald-400" />
              ) : (
                <XCircle className="h-4 w-4 text-amber-400" />
              )}
            </td>
            <td className="py-3 pr-4 text-white">{doc.patientsAssigned}</td>
            <td className="py-3 pr-4 text-cyan-300">{doc.accuracy ? `${doc.accuracy}%` : "—"}</td>
            <td className="py-3 capitalize text-slate-300">{doc.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DoctorTable;
