import { useState } from 'react';
import { FilterState } from '../types';

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    digitalTechnologies: [],
    typeOfIrrigation: [],
    scaleOfUse: [],
    techAdvancement: [],
    developer: [],
    documentationType: [],
    documentContent: []
  });

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      digitalTechnologies: [],
      typeOfIrrigation: [],
      scaleOfUse: [],
      techAdvancement: [],
      developer: [],
      documentationType: [],
      documentContent: []
    });
  };

  const setSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  return { filters, toggleFilter, clearFilters, setSearchQuery };
};
