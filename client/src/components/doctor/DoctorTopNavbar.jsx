import React from "react";
import { Bell, Menu, Search } from "lucide-react";

const DoctorTopNavbar = ({ doctor, unreadCount, onMenuToggle, onNotifications }) => (
  <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/60 px-4 backdrop-blur-xl lg:px-6">
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onMenuToggle}
        className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="relative hidden sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search patients, reports..."
          className="w-64 rounded-xl border border-white/10 bg-slate-900/60 py-2 pl-10 pr-3 text-sm text-white outline-none focus:border-cyan-400/50 xl:w-80"
        />
      </div>
    </div>

    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onNotifications}
        className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 hover:text-white"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-xs font-bold text-white">
          {doctor.avatarInitials}
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-white">{doctor.name}</p>
          <p className="text-xs text-slate-400">{doctor.specialty}</p>
        </div>
      </div>
    </div>
  </header>
);

export default DoctorTopNavbar;
