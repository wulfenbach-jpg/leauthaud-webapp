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
    { label: 'Irrigation Type', key: 'typeOfIrrigation', options: FILTER_OPTIONS.typeOfIrrigation },
    { label: 'Scale of Use', key: 'scaleOfUse', options: FILTER_OPTIONS.scaleOfUse },
    { label: 'Price Range', key: 'priceRange', options: FILTER_OPTIONS.priceRange },
    { label: 'Documentation Type', key: 'documentationType', options: FILTER_OPTIONS.documentationType },
    { label: 'Document Content', key: 'documentContent', options: FILTER_OPTIONS.documentContent },
    { label: 'Tech Advancement', key: 'techAdvancement', options: FILTER_OPTIONS.techAdvancement },
    { label: 'Developer Class', key: 'developer', options: FILTER_OPTIONS.developer },
    { label: 'Digital Technologies', key: 'digitalTechnologies', options: FILTER_OPTIONS.digitalTechnologies },
    { label: 'Type of Board', key: 'typeOfBoard', options: FILTER_OPTIONS.typeOfBoard },
  ];

  return (
    <aside className="lg:w-64 space-y-8 shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-medium text-[#0d0d0d] uppercase tracking-[0.65px]">Research Criteria</h3>
        <button onClick={onClearFilters} className="text-[13px] font-medium text-[#18E299] hover:text-[#0fa76e] hover:bg-[#d4fae8] px-3 py-1 rounded-full transition-all">Reset</button>
      </div>

      <div className="space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar pr-2">
        {filterCategories.map((cat) => (
          <div key={cat.key} className="border-b border-[rgba(0,0,0,0.05)] pb-6 last:border-0">
            <h4 className="text-[11px] font-semibold text-[#666666] uppercase tracking-[0.6px] mb-3">{cat.label}</h4>
            <div className="space-y-2.5">
              {cat.options.map(opt => (
                <label key={opt} className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={(filters[cat.key as keyof FilterState] as string[]).includes(opt)}
                      onChange={() => onToggleFilter(cat.key as keyof FilterState, opt)}
                      className="peer w-4 h-4 rounded border-[#e5e5e5] text-emerald-500 focus:ring-emerald-500/20 transition-all appearance-none border checked:bg-emerald-500 checked:border-emerald-500"
                    />
                    <svg className="absolute left-0.5 top-0.5 w-3 h-3 text-white hidden peer-checked:block pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className={`ml-2.5 text-[14px] font-normal leading-none transition-colors ${
                    (filters[cat.key as keyof FilterState] as string[]).includes(opt) ? 'text-emerald-600 font-medium' : 'text-[#333333] group-hover:text-[#0d0d0d]'
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
