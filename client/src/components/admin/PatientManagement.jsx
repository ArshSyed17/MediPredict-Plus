import React from "react";
import GlassCard from "./ui/GlassCard";
import PatientTable from "./PatientTable";

const PatientManagement = ({ patients }) => (
  <GlassCard title="Patient Management" subtitle="Health status, predictions, and assigned doctors.">
    <PatientTable patients={patients} />
  </GlassCard>
);

export default PatientManagement;
