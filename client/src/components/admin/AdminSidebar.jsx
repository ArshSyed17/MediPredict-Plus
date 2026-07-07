import React from "react";
import {
  Activity,
  BarChart3,
  Bell,
  Database,
  FileText,
  LayoutDashboard,
  Server,
  Settings,
  Shield,
  Stethoscope,
  User,
  Users,
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "doctors", label: "Doctors", icon: Stethoscope },
  { id: "patients", label: "Patients", icon: User },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "system", label: "System Health", icon: Server },
  { id: "audit", label: "Audit Logs", icon: Activity },
  { id: "roles", label: "Roles", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "backup", label: "Backup", icon: Database },
  { id: "profile", label: "Profile", icon: User },
];

const AdminSidebar = ({ active, onNavigate, collapsed, onToggle, mobileOpen }) => (
  <aside
    className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-white/10 bg-slate-950/80 backdrop-blur-xl transition-all duration-300 ${
      collapsed ? "w-[72px]" : "w-64"
    } ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
  >
    <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
        A
      </div>
      {!collapsed && (
        <div>
          <p className="text-sm font-semibold text-white">MediPredict+</p>
          <p className="text-[10px] text-slate-400">Admin Portal</p>
        </div>
      )}
    </div>
    <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
              isActive ? "bg-indigo-500/15 text-indigo-300" : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        );
      })}
    </nav>
    <button type="button" onClick={onToggle} className="m-3 rounded-xl border border-white/10 py-2 text-xs text-slate-400 hover:bg-white/5">
      {collapsed ? "→" : "← Collapse"}
    </button>
  </aside>
);

export default AdminSidebar;
