import React from "react";
import { Smartphone, Watch, Activity } from "lucide-react";
import GlassCard from "../profile/ui/GlassCard";

const deviceIcons = {
  Wearable: Watch,
  "Fitness Tracker": Activity,
  "Medical Device": Smartphone,
};

const ConnectedDevices = ({ devices, onToggle }) => (
  <GlassCard title="Connected Devices" subtitle="Manage health devices synced with MediPredict+.">
    <div className="space-y-3">
      {devices.map((device) => {
        const Icon = deviceIcons[device.type] ?? Smartphone;
        return (
          <div
            key={device.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20">
                <Icon className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{device.name}</p>
                <p className="text-xs text-slate-400">
                  {device.type} • Last sync {new Date(device.lastSync).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onToggle(device.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                device.connected
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-slate-700 text-slate-400"
              }`}
            >
              {device.connected ? "Connected" : "Disconnected"}
            </button>
          </div>
        );
      })}
    </div>
  </GlassCard>
);

export default ConnectedDevices;
