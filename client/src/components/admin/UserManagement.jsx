import React, { useMemo, useState } from "react";
import GlassCard from "./ui/GlassCard";
import UserTable from "./UserTable";
import UserDetailsModal from "./UserDetailsModal";
import { filterUsers } from "../../services/adminService";

const UserManagement = ({ users, onUpdate, onDeactivate, onDelete }) => {
  const [filters, setFilters] = useState({ search: "", role: "all", status: "all", sort: "name" });
  const [editUser, setEditUser] = useState(null);

  const filtered = useMemo(() => filterUsers(users, filters), [users, filters]);

  return (
    <>
      <GlassCard title="User Management" subtitle={`${filtered.length} users`}>
        <div className="mb-4 grid gap-3 sm:grid-cols-4">
          <input
            type="search"
            placeholder="Search users..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none sm:col-span-2"
          />
          <select value={filters.role} onChange={(e) => setFilters((f) => ({ ...f, role: e.target.value }))} className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white">
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
          <select value={filters.sort} onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))} className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white">
            <option value="name">Sort by Name</option>
            <option value="recent">Sort by Recent</option>
          </select>
        </div>
        <UserTable users={filtered} onEdit={setEditUser} onDeactivate={onDeactivate} onDelete={onDelete} />
      </GlassCard>
      <UserDetailsModal
        user={editUser}
        open={!!editUser}
        onClose={() => setEditUser(null)}
        onSave={async (id, data) => {
          await onUpdate(id, data);
          setEditUser(null);
        }}
      />
    </>
  );
};

export default UserManagement;
