import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const DeleteAccountModal = ({ open, onClose, onConfirm, loading }) => (
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
          className="w-full max-w-md rounded-2xl border border-rose-400/30 bg-slate-900 p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/20">
              <AlertTriangle className="h-5 w-5 text-rose-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Delete Account</h3>
              <p className="text-sm text-slate-300">This action is permanent and cannot be undone.</p>
            </div>
          </div>

          <p className="mb-5 text-sm text-slate-400">
            All your health data, predictions, reports, and settings will be permanently removed from MediPredict+.
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {loading ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default DeleteAccountModal;
