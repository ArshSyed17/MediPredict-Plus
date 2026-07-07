import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import AIPredictionDemo from '../../components/AIPredictionDemo';
import DiseaseSupport from '../../components/DiseaseSupport';
import AnimatedStatistics from '../../components/AnimatedStatistics';
import Testimonials from '../../components/Testimonials';
import FAQ from '../../components/FAQ';
import CTA from '../../components/CTA';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <AIPredictionDemo />
      <DiseaseSupport />
      <AnimatedStatistics />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
};

export default LandingPage;
