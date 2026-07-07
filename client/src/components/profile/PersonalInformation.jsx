import React from "react";
import GlassCard from "./ui/GlassCard";

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="text-sm font-medium text-white">{value}</span>
  </div>
);

const PersonalInformation = ({ profile }) => (
  <GlassCard title="Personal Information" subtitle="Basic demographic details.">
    <div className="grid gap-2 sm:grid-cols-2">
      <InfoRow label="Age" value={`${profile.age} years`} />
      <InfoRow label="Gender" value={profile.gender} />
      <InfoRow label="Height" value={`${profile.height} cm`} />
      <InfoRow label="Weight" value={`${profile.weight} kg`} />
      <InfoRow label="Blood Group" value={profile.bloodGroup} />
      <InfoRow label="Date of Birth" value={new Date(profile.dateOfBirth).toLocaleDateString()} />
    </div>
  </GlassCard>
);

export default PersonalInformation;
