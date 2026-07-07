import React from "react";
import GlassCard from "./ui/GlassCard";
import HealthTrendChart from "./HealthTrendChart";
import DiseaseAnalyticsChart from "./DiseaseAnalyticsChart";

const AnalyticsOverview = ({ analytics }) => (
  <div className="grid gap-6 lg:grid-cols-2">
    <GlassCard title="Patient Growth" subtitle="Monthly patient enrollment trend.">
      <HealthTrendChart data={analytics.patientGrowth} dataKey="patients" labelKey="month" />
    </GlassCard>
    <GlassCard title="Disease Distribution" subtitle="Cases by disease category.">
      <DiseaseAnalyticsChart data={analytics.diseaseDistribution} />
    </GlassCard>
    <GlassCard title="Prediction Accuracy" subtitle="AI model accuracy over time.">
      <HealthTrendChart
        data={analytics.predictionAccuracy}
        dataKey="accuracy"
        labelKey="month"
        color="#4ade80"
      />
    </GlassCard>
    <GlassCard title="Consultation Trends" subtitle="Weekly consultation volume.">
      <HealthTrendChart
        data={analytics.consultationTrends}
        dataKey="consultations"
        labelKey="week"
        color="#f472b6"
      />
    </GlassCard>
  </div>
);

export default AnalyticsOverview;
