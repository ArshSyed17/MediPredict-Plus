import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Plus, Save } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const ConsultationNotes = ({ notes, onAdd, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const submitNew = async (data) => {
    await onAdd(data.note);
    reset();
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const saveEdit = async (noteId) => {
    await onEdit(noteId, editText);
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="space-y-5">
      <GlassCard title="Add Consultation Note">
        <form onSubmit={handleSubmit(submitNew)} className="flex gap-3">
          <textarea
            {...register("note", { required: true })}
            placeholder="Enter consultation notes..."
            rows={3}
            className="flex-1 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
          />
          <button
            type="submit"
            className="flex h-fit items-center gap-2 self-end rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </form>
      </GlassCard>

      <GlassCard title="Consultation Notes" subtitle={`${notes.length} notes on record`}>
        <div className="space-y-3">
          {notes.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-400">No consultation notes yet.</p>
          )}
          {notes.map((note) => (
            <div key={note.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{note.author}</p>
                  <p className="text-xs text-slate-400">{note.date}</p>
                </div>
                {editingId !== note.id && (
                  <button
                    type="button"
                    onClick={() => startEdit(note)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-cyan-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </div>
              {editingId === note.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => saveEdit(note.id)}
                    className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300"
                  >
                    <Save className="h-3 w-3" /> Save
                  </button>
                </div>
              ) : (
                <p className="text-sm text-slate-200">{note.text}</p>
              )}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default ConsultationNotes;
