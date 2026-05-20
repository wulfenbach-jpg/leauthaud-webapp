import { useState } from 'react';
import { FilterState } from '../types';

const DEFAULT_FILTER_STATE: FilterState = {
  searchQuery: '',
  digitalTechnologies: [],
  typeOfIrrigation: [],
  scaleOfUse: [],
  techAdvancement: [],
  developer: [],
  documentationType: [],
  documentContent: [],
  typeOfBoard: [],
  priceRange: []
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      }
      return { ...prev, [category]: [...current, value] };
    });
  };

  const clearFilters = () => setFilters(DEFAULT_FILTER_STATE);

  const setSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  return { filters, toggleFilter, clearFilters, setSearchQuery };
};
