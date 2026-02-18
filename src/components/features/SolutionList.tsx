import React from 'react';
import { IrrigationSolution } from '../../types';
import IrrigationCard from './IrrigationCard';

interface SolutionListProps {
  solutions: IrrigationSolution[];
  onSelectSolution: (solution: IrrigationSolution) => void;
  onClearFilters: () => void;
}

const SolutionList: React.FC<SolutionListProps> = ({ solutions, onSelectSolution, onClearFilters }) => {
  return (
    <div className="flex-grow">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          Displaying <span className="text-slate-900">{solutions.length}</span> verified entries
        </p>
      </div>

      {solutions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {solutions.map(solution => (
            <IrrigationCard
              key={solution.id}
              solution={solution}
              onClick={() => onSelectSolution(solution)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 text-sm font-bold">No entries match your research criteria.</p>
          <button onClick={onClearFilters} className="mt-4 text-emerald-600 font-bold text-xs uppercase hover:underline">Clear Filters</button>
        </div>
      )}
    </div>
  );
};

export default SolutionList;
