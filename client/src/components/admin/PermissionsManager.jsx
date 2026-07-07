import React from "react";
import GlassCard from "./ui/GlassCard";

const PermissionsManager = ({ permissions, roles }) => (
  <GlassCard title="Permissions Manager" subtitle="Role-permission matrix.">
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase text-slate-400">
            <th className="pb-3 pr-4">Permission</th>
            {roles.map((r) => (
              <th key={r.id} className="pb-3 pr-4 text-center">{r.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.filter((p) => p.id !== "all").map((perm) => (
            <tr key={perm.id} className="border-b border-white/5">
              <td className="py-2 pr-4">
                <p className="text-white">{perm.label}</p>
                <p className="text-xs text-slate-500">{perm.description}</p>
              </td>
              {roles.map((role) => (
                <td key={role.id} className="py-2 pr-4 text-center">
                  {role.permissions.includes("all") || role.permissions.includes(perm.id) ? (
                    <span className="text-emerald-400">✓</span>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </GlassCard>
);

export default PermissionsManager;
