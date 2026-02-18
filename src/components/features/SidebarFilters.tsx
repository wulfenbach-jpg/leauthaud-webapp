import React from 'react';
import { FilterState } from '../../types';
import { FILTER_OPTIONS } from '../../constants';

interface SidebarFiltersProps {
  filters: FilterState;
  onToggleFilter: (category: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({ filters, onToggleFilter, onClearFilters }) => {
  const filterCategories = [
    { label: 'Digital Technologies', key: 'digitalTechnologies', options: FILTER_OPTIONS.digitalTechnologies },
    { label: 'Irrigation Type', key: 'typeOfIrrigation', options: FILTER_OPTIONS.typeOfIrrigation },
    { label: 'Scale of Use', key: 'scaleOfUse', options: FILTER_OPTIONS.scaleOfUse },
    { label: 'Tech Advancement', key: 'techAdvancement', options: FILTER_OPTIONS.techAdvancement },
    { label: 'Developer Class', key: 'developer', options: FILTER_OPTIONS.developer },
    { label: 'Documentation Type', key: 'documentationType', options: FILTER_OPTIONS.documentationType },
    { label: 'Document Content', key: 'documentContent', options: FILTER_OPTIONS.documentContent },
  ];

  return (
    <aside className="lg:w-64 space-y-8 shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Research Criteria</h3>
        <button onClick={onClearFilters} className="text-[10px] font-bold text-emerald-600 hover:underline">Reset</button>
      </div>

      <div className="space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar pr-2">
        {filterCategories.map((cat) => (
          <div key={cat.key} className="border-b border-slate-200 pb-6 last:border-0">
            <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-wider mb-3">{cat.label}</h4>
            <div className="space-y-2">
              {cat.options.map(opt => (
                <label key={opt} className="flex items-start group cursor-pointer">
                  <div className="relative flex items-center pt-0.5">
                    <input
                      type="checkbox"
                      checked={(filters[cat.key as keyof FilterState] as string[]).includes(opt)}
                      onChange={() => onToggleFilter(cat.key as keyof FilterState, opt)}
                      className="peer w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20 transition-all appearance-none border-2 checked:bg-emerald-600 checked:border-emerald-600"
                    />
                    <svg className="absolute left-0.5 top-1 w-3 h-3 text-white hidden peer-checked:block pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className={`ml-2.5 text-xs font-semibold leading-tight transition-all ${
                    (filters[cat.key as keyof FilterState] as string[]).includes(opt) ? 'text-emerald-700' : 'text-slate-500 group-hover:text-slate-800'
                  }`}>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarFilters;
