import React from "react";
import { Pencil, Trash2, UserX } from "lucide-react";

const roleTone = {
  admin: "text-violet-300 bg-violet-500/15",
  doctor: "text-cyan-300 bg-cyan-500/15",
  patient: "text-emerald-300 bg-emerald-500/15",
};

const UserTable = ({ users, onEdit, onDeactivate, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-400">
          <th className="pb-3 pr-4">User</th>
          <th className="pb-3 pr-4">Role</th>
          <th className="pb-3 pr-4">Status</th>
          <th className="pb-3 pr-4 hidden md:table-cell">Joined</th>
          <th className="pb-3 pr-4 hidden lg:table-cell">Last Active</th>
          <th className="pb-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
            <td className="py-3 pr-4">
              <p className="font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </td>
            <td className="py-3 pr-4">
              <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${roleTone[user.role]}`}>{user.role}</span>
            </td>
            <td className="py-3 pr-4">
              <span className={user.status === "active" ? "text-emerald-300" : "text-slate-400"}>{user.status}</span>
            </td>
            <td className="py-3 pr-4 hidden text-slate-400 md:table-cell">{user.joined}</td>
            <td className="py-3 pr-4 hidden text-slate-400 lg:table-cell">{user.lastActive}</td>
            <td className="py-3">
              <div className="flex gap-1">
                <button type="button" onClick={() => onEdit(user)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-cyan-300" aria-label="Edit">
                  <Pencil className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => onDeactivate(user.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-amber-300" aria-label="Deactivate">
                  <UserX className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => onDelete(user.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-rose-300" aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;
