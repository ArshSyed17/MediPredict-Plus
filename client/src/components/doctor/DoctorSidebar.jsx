import React from "react";
import {
  BarChart3,
  Bell,
  Calendar,
  LayoutDashboard,
  Stethoscope,
  User,
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "patients", label: "Patients", icon: Stethoscope },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "profile", label: "Profile", icon: User },
];

const DoctorSidebar = ({ active, onNavigate, collapsed, onToggle, mobileOpen }) => (
  <aside
    className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-white/10 bg-slate-950/80 backdrop-blur-xl transition-all duration-300 ${
      collapsed ? "w-[72px]" : "w-64"
    } ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
  >
    <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 text-sm font-bold text-white">
        MP
      </div>
      {!collapsed && (
        <div>
          <p className="text-sm font-semibold text-white">MediPredict+</p>
          <p className="text-[10px] text-slate-400">Doctor Portal</p>
        </div>
      )}
    </div>

    <nav className="flex-1 space-y-1 p-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
              isActive
                ? "bg-cyan-500/15 text-cyan-300"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        );
      })}
    </nav>

    <button
      type="button"
      onClick={onToggle}
      className="m-3 rounded-xl border border-white/10 py-2 text-xs text-slate-400 hover:bg-white/5"
    >
      {collapsed ? "→" : "← Collapse"}
    </button>
  </aside>
);

export default DoctorSidebar;
