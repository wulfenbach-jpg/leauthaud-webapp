import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { IrrigationSolution } from './types';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from './components/common/Loader';
import ErrorMessage from './components/common/ErrorMessage';
import SidebarFilters from './components/features/SidebarFilters';
import SolutionList from './components/features/SolutionList';
import SolutionDetailModal from './components/features/SolutionDetailModal';
import { useIrrigationData } from './hooks/useIrrigationData';
import { useFilters } from './hooks/useFilters';
import { matchInString, matchInArray } from './utils/filterUtils';

const App: React.FC = () => {
  const { solutions, isLoading, error } = useIrrigationData();
  const { filters, toggleFilter, clearFilters, setSearchQuery } = useFilters();
  const [selectedSolution, setSelectedSolution] = useState<IrrigationSolution | null>(null);

  const filteredSolutions = useMemo(() => {
    return solutions.filter(solution => {
      if (!matchInString(solution.typeOfDigitalTechnologies, filters.digitalTechnologies)) return false;
      if (!matchInArray(solution.typeOfIrrigation, filters.typeOfIrrigation)) return false;
      if (filters.scaleOfUse.length > 0 && !filters.scaleOfUse.includes(solution.scaleOfUse)) return false;
      if (filters.techAdvancement.length > 0 && !filters.techAdvancement.includes(solution.technologicalAdvancement)) return false;
      if (filters.developer.length > 0 && !filters.developer.includes(solution.developer)) return false;
      if (filters.documentationType.length > 0 && !filters.documentationType.includes(solution.documentationType)) return false;
      if (!matchInString(solution.documentContent, filters.documentContent)) return false;

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        return (
          solution.name.toLowerCase().includes(q) ||
          solution.shortDescription.toLowerCase().includes(q) ||
          solution.developer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [solutions, filters]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Helmet>
        <title>Water Management Solutions - Open Source Catalog</title>
        <meta name="description" content="A centralized hub for nonproprietary, open-source, and DIY solutions for water management." />
      </Helmet>

      <Header searchQuery={filters.searchQuery} onSearchChange={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <SidebarFilters
            filters={filters}
            onToggleFilter={toggleFilter}
            onClearFilters={clearFilters}
          />
          <SolutionList
            solutions={filteredSolutions}
            onSelectSolution={setSelectedSolution}
            onClearFilters={clearFilters}
          />
        </div>
      </main>

      <SolutionDetailModal solution={selectedSolution} onClose={() => setSelectedSolution(null)} />
      <Footer />
    </div>
  );
};

export default App;
