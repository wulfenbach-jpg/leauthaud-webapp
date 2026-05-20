import { useState, useEffect } from 'react';
import { IrrigationSolution } from '../types';
import { fetchSheetData } from '../services/dataService';

export const useIrrigationData = () => {
  const [solutions, setSolutions] = useState<IrrigationSolution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    let cancelled = false;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSheetData();
        if (!cancelled) {
          setSolutions(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Data loading error:", err);
          setError("Failed to load data. Please ensure the Google Sheet is 'Published to the web' (File > Share > Publish to web) and that you are using a local web server.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    loadData();

    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, []);

  return { solutions, isLoading, error };
};
