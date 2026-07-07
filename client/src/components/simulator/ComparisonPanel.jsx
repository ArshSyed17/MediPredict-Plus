import React from "react";
import BeforeAfterComparison from "./BeforeAfterComparison";
import HealthScoreComparison from "./HealthScoreComparison";
import RiskComparisonChart from "./RiskComparisonChart";

const ComparisonPanel = ({ comparison, trendData, lifestyleData }) => (
  <section className="space-y-5">
    <BeforeAfterComparison comparison={comparison} />
    <HealthScoreComparison trendData={trendData} comparison={comparison} />
    <RiskComparisonChart data={comparison.diseaseComparison} />
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <h3 className="mb-4 text-lg font-semibold text-white">Lifestyle Improvement</h3>
      <RiskComparisonChart data={lifestyleData} dataKeyBefore="before" dataKeyAfter="after" labelKey="metric" />
    </div>
  </section>
);

export default ComparisonPanel;
