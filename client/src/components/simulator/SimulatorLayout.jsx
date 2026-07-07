import React from "react";

const SimulatorLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950">
    <div className="pointer-events-none fixed inset-0 opacity-5">
      <div className="absolute inset-0 bg-grid-pattern" />
    </div>
    <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
  </div>
);

export default SimulatorLayout;
