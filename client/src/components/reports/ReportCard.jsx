import React from "react";
import { motion } from "framer-motion";
import { Calendar, Heart, Star, Trash2 } from "lucide-react";

const riskTone = {
  Low: "text-emerald-300 bg-emerald-500/15 border-emerald-400/30",
  Moderate: "text-amber-300 bg-amber-500/15 border-amber-400/30",
  High: "text-rose-300 bg-rose-500/15 border-rose-400/30",
};

const ReportCard = ({ report, selected, onSelect, onFavorite, onDelete }) => (
  <motion.article
    whileHover={{ y: -2 }}
    onClick={() => onSelect(report)}
    className={`cursor-pointer rounded-2xl border p-4 transition ${
      selected
        ? "border-cyan-400/50 bg-cyan-500/10"
        : "border-white/10 bg-slate-950/40 hover:border-white/20 hover:bg-slate-900/50"
    }`}
  >
    <div className="mb-3 flex items-start justify-between gap-2">
      <div>
        <p className="font-semibold text-white">{report.id}</p>
        <p className="text-sm text-slate-300">{report.disease}</p>
      </div>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onFavorite(report.id);
          }}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-amber-300"
          aria-label="Toggle favorite"
        >
          <Star className={`h-4 w-4 ${report.favorite ? "fill-amber-300 text-amber-300" : ""}`} />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(report.id);
          }}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-rose-300"
          aria-label="Delete report"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>

    <p className="mb-3 line-clamp-2 text-sm text-slate-400">{report.summary}</p>

    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className={`rounded-full border px-2 py-0.5 ${riskTone[report.riskCategory]}`}>
        {report.riskCategory} Risk
      </span>
      <span className="flex items-center gap-1 text-slate-400">
        <Heart className="h-3 w-3" />
        Score {report.healthScore}
      </span>
      <span className="flex items-center gap-1 text-slate-400">
        <Calendar className="h-3 w-3" />
        {new Date(report.createdAt).toLocaleDateString()}
      </span>
    </div>
  </motion.article>
);

export default ReportCard;
