import React, { useState, useMemo, useEffect } from 'react';
import { IrrigationSolution, FilterState } from './types.ts';
import { FILTER_OPTIONS } from './constants.tsx';
import IrrigationCard from './components/IrrigationCard.tsx';
import DetailModal from './components/DetailModal.tsx';
import { fetchSheetData } from './services/dataService.ts';

const App: React.FC = () => {
  const [solutions, setSolutions] = useState<IrrigationSolution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<IrrigationSolution | null>(null);
  
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

  const filteredSolutions = useMemo(() => {
    return solutions.filter(solution => {
      const matchInString = (fieldValue: string, selectedValues: string[]) => {
        if (selectedValues.length === 0) return true;
        return selectedValues.some(val => fieldValue.toLowerCase().includes(val.toLowerCase()));
      };

      const matchInArray = (fieldArray: string[], selectedValues: string[]) => {
        if (selectedValues.length === 0) return true;
        return fieldArray.some(val => selectedValues.includes(val));
      };

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-6">
        <div className="w-12 h-12 border-[4px] border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Repository Data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">Connectivity Error</h2>
        <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed mb-6">
          {error}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center space-x-4 shrink-0">
               <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-100 overflow-hidden">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2z" />
                    <path d="M2 9h20M9 2v20" />
                  </svg>
               </div>
               <div>
                 <h1 className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                   Open Source and DIY sensing systems for water management
                 </h1>
                 <div className="flex items-center mt-1.5">
                    <span className="w-2 h-2 rounded-full mr-2 bg-emerald-500 animate-pulse"></span>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                      Google Sheet Synced
                    </p>
                 </div>
               </div>
            </div>

            <div className="flex-grow flex items-center gap-3">
               <div className="relative flex-grow group">
                  <input
                    type="text"
                    placeholder="Search by name/description/etc..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm font-medium shadow-sm"
                  />
                  <svg className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          <aside className="lg:w-64 space-y-8 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Research Criteria</h3>
              <button onClick={clearFilters} className="text-[10px] font-bold text-emerald-600 hover:underline">Reset</button>
            </div>

            <div className="space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar pr-2">
              {[
                { label: 'Digital Technologies', key: 'digitalTechnologies', options: FILTER_OPTIONS.digitalTechnologies },
                { label: 'Irrigation Type', key: 'typeOfIrrigation', options: FILTER_OPTIONS.typeOfIrrigation },
                { label: 'Scale of Use', key: 'scaleOfUse', options: FILTER_OPTIONS.scaleOfUse },
                { label: 'Tech Advancement', key: 'techAdvancement', options: FILTER_OPTIONS.techAdvancement },
                { label: 'Developer Class', key: 'developer', options: FILTER_OPTIONS.developer },
                { label: 'Documentation Type', key: 'documentationType', options: FILTER_OPTIONS.documentationType },
                { label: 'Document Content', key: 'documentContent', options: FILTER_OPTIONS.documentContent },
              ].map((cat) => (
                <div key={cat.key} className="border-b border-slate-200 pb-6 last:border-0">
                  <h4 className="text-[10px] font-extrabold text-slate-900 uppercase tracking-wider mb-3">{cat.label}</h4>
                  <div className="space-y-2">
                    {cat.options.map(opt => (
                      <label key={opt} className="flex items-start group cursor-pointer">
                        <div className="relative flex items-center pt-0.5">
                          <input 
                            type="checkbox" 
                            checked={(filters[cat.key as keyof FilterState] as string[]).includes(opt)}
                            onChange={() => toggleFilter(cat.key as keyof FilterState, opt)}
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

          <div className="flex-grow">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Displaying <span className="text-slate-900">{filteredSolutions.length}</span> verified entries
              </p>
            </div>

            {filteredSolutions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSolutions.map(solution => (
                  <IrrigationCard 
                    key={solution.id} 
                    solution={solution} 
                    onClick={() => setSelectedSolution(solution)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-sm font-bold">No entries match your research criteria.</p>
                <button onClick={clearFilters} className="mt-4 text-emerald-600 font-bold text-xs uppercase hover:underline">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </main>

      <DetailModal solution={selectedSolution} onClose={() => setSelectedSolution(null)} />

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 mt-12">
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Leauthaud Labs 2025</span>
            <span className="text-[10px] font-bold uppercase tracking-widest italic">Open Source and DIY sensing systems for water management</span>
         </div>
      </footer>
    </div>
  );
};

export default App;