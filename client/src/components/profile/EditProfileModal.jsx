import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/50";

const EditProfileModal = ({ open, profile, onClose, onSave, saving }) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: profile });

  useEffect(() => {
    if (open) reset(profile);
  }, [open, profile, reset]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 12 }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Edit Profile</h3>
              <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSave)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-slate-400">First Name</label>
                  <input className={fieldClass} {...register("firstName", { required: true })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Last Name</label>
                  <input className={fieldClass} {...register("lastName", { required: true })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Email</label>
                  <input type="email" className={fieldClass} {...register("email", { required: true })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Phone</label>
                  <input className={fieldClass} {...register("phone")} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Age</label>
                  <input type="number" className={fieldClass} {...register("age", { valueAsNumber: true })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Gender</label>
                  <select className={fieldClass} {...register("gender")}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Height (cm)</label>
                  <input type="number" className={fieldClass} {...register("height", { valueAsNumber: true })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Weight (kg)</label>
                  <input type="number" className={fieldClass} {...register("weight", { valueAsNumber: true })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-400">Blood Group</label>
                  <select className={fieldClass} {...register("bloodGroup")}>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs text-slate-400">Address</label>
                  <input className={fieldClass} {...register("address")} />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
