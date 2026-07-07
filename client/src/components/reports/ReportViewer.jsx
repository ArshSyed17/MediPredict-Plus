import React from "react";
import { motion } from "framer-motion";
import ReportSummary from "./ReportSummary";
import HealthScoreSection from "./HealthScoreSection";
import RiskAnalysisSection from "./RiskAnalysisSection";
import VitalsSection from "./VitalsSection";
import MedicalHistorySection from "./MedicalHistorySection";
import RecommendationsSection from "./RecommendationsSection";
import ChartsSection from "./ChartsSection";
import PredictionComparison from "./PredictionComparison";
import ReportTimeline from "./ReportTimeline";
import DownloadReportButton from "./DownloadReportButton";
import ShareReportButton from "./ShareReportButton";
import PrintReportButton from "./PrintReportButton";

const ReportViewer = ({ report, onShared }) => (
  <motion.div
    key={report.id}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="report-viewer space-y-5"
  >
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <div>
        <h2 className="text-xl font-semibold text-white">{report.disease} Report</h2>
        <p className="text-sm text-slate-400">{report.id}</p>
      </div>
      <div className="flex flex-wrap gap-2 print:hidden">
        <DownloadReportButton report={report} />
        <ShareReportButton report={report} onShared={onShared} />
        <PrintReportButton report={report} />
      </div>
    </div>

    <ReportSummary report={report} />
    <HealthScoreSection
      healthScore={report.healthScore}
      aiConfidence={report.aiConfidence}
      riskCategory={report.riskCategory}
    />
    <RiskAnalysisSection diseaseRisks={report.diseaseRisks} />
    <VitalsSection vitals={report.vitals} lifestyle={report.lifestyle} />
    <MedicalHistorySection
      healthMetrics={report.healthMetrics}
      medicalHistory={report.medicalHistory}
      doctorNotes={report.doctorNotes}
    />
    <ChartsSection trends={report.trends} />
    <PredictionComparison comparison={report.predictionComparison} />
    <RecommendationsSection recommendations={report.recommendations} />
    <ReportTimeline timeline={report.timeline} />
  </motion.div>
);

export default ReportViewer;
