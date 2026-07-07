import React from "react";
import { FileSearch } from "lucide-react";

const EmptyReportsState = () => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-slate-950/30 px-6 py-12 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
      <FileSearch className="h-7 w-7 text-slate-400" />
    </div>
    <h3 className="text-lg font-semibold text-white">No reports found</h3>
    <p className="mt-2 max-w-sm text-sm text-slate-400">
      Try adjusting your search or filters, or generate a new report from Disease Prediction.
    </p>
  </div>
);

export default EmptyReportsState;
