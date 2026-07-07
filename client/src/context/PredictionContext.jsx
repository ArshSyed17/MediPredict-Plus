import React, { createContext, useState, useCallback } from 'react';
import predictionService from '../services/predictionService';

export const PredictionContext = createContext(null);

export const PredictionProvider = ({ children }) => {
  const [predictions, setPredictions] = useState([]);
  const [currentPrediction, setCurrentPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await predictionService.getHistory();
      setPredictions(data);
    } catch (error) {
      console.error('Failed to fetch prediction history', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const runAnalysis = useCallback(async (data) => {
    try {
      setLoading(true);
      const result = await predictionService.analyze(data);
      setCurrentPrediction(result);
      setPredictions((prev) => [result, ...prev]);
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    predictions,
    currentPrediction,
    loading,
    fetchHistory,
    runAnalysis,
  };

  return <PredictionContext.Provider value={value}>{children}</PredictionContext.Provider>;
};
