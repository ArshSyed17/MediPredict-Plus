import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

const fieldClass = "w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400/50";

const UserDetailsModal = ({ user, open, onClose, onSave }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  if (!user) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Edit User</h3>
              <button type="button" onClick={onClose}><X className="h-5 w-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSubmit((data) => onSave(user.id, data))} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-slate-400">Name</label>
                <input className={fieldClass} {...register("name")} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-400">Email</label>
                <input className={fieldClass} {...register("email")} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-400">Role</label>
                <select className={fieldClass} {...register("role")}>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-400">Status</label>
                <select className={fieldClass} {...register("status")}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300">Cancel</button>
                <button type="submit" className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white">Save</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserDetailsModal;
