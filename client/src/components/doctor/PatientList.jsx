import React from "react";
import PatientSearch from "./PatientSearch";
import PatientCard from "./PatientCard";
import GlassCard from "./ui/GlassCard";

const PatientList = ({ patients, selectedId, filters, onFilterChange, onSelect }) => (
  <GlassCard title="Patient List" subtitle={`${patients.length} patients`}>
    <PatientSearch
      value={filters.search}
      onChange={(v) => onFilterChange("search", v)}
      risk={filters.risk}
      onRiskChange={(v) => onFilterChange("risk", v)}
      sort={filters.sort}
      onSortChange={(v) => onFilterChange("sort", v)}
    />
    <div className="mt-4 space-y-2">
      {patients.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-400">No patients match your filters.</p>
      )}
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          selected={selectedId === patient.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  </GlassCard>
);

export default PatientList;
