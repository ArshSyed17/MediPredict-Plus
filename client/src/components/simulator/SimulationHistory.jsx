import React from "react";
import SimulationCard from "./SimulationCard";

const SimulationHistory = ({ history, onSelect }) => (
  <section className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
    <header className="mb-4">
      <h3 className="text-lg font-semibold text-white">Simulation History</h3>
      <p className="text-sm text-slate-300">Saved snapshots and recent scenario runs.</p>
    </header>

    <div className="space-y-3">
      {history.length === 0 && (
        <p className="rounded-xl border border-dashed border-white/20 p-4 text-sm text-slate-400">
          No saved simulations yet. Adjust controls and save a snapshot.
        </p>
      )}
      {history.map((item) => (
        <SimulationCard key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  </section>
);

export default SimulationHistory;
