import React from "react";
import ReportCard from "./ReportCard";
import EmptyReportsState from "./EmptyReportsState";

const ReportList = ({ reports, selectedId, onSelect, onFavorite, onDelete }) => {
  if (reports.length === 0) return <EmptyReportsState />;

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          selected={selectedId === report.id}
          onSelect={onSelect}
          onFavorite={onFavorite}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ReportList;
