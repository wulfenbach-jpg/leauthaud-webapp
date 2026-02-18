import { useState, useEffect } from 'react';
import { IrrigationSolution } from '../types';
import { fetchSheetData } from '../services/dataService';

export const useIrrigationData = () => {
  const [solutions, setSolutions] = useState<IrrigationSolution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSheetData();
        setSolutions(data);
        setError(null);
      } catch (err) {
        console.error("Data loading error:", err);
        setError("Failed to load data. Please ensure the Google Sheet is 'Published to the web' (File > Share > Publish to web) and that you are using a local web server.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return { solutions, isLoading, error };
};
