import React from "react";
import GlassCard from "./ui/GlassCard";
import DoctorTable from "./DoctorTable";

const DoctorManagement = ({ doctors }) => (
  <GlassCard title="Doctor Management" subtitle="Verification status, specialization, and performance.">
    <DoctorTable doctors={doctors} />
  </GlassCard>
);

export default DoctorManagement;
