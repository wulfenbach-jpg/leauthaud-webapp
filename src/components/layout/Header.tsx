import React from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAbout: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onOpenAbout }) => {
  return (
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
               <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                 Open Source and DIY sensing systems for water management
               </h1>
               <div className="flex items-center mt-1.5">
                  <span className="w-2 h-2 rounded-full mr-2 bg-emerald-500 animate-pulse"></span>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                    Google Sheet Synced
                  </p>
               </div>
             </div>
          </div>

          <div className="flex-grow flex items-center justify-end gap-3">
             <div className="relative flex-grow max-w-md group">
                <input
                  type="text"
                  placeholder="Search by name/description/etc..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all text-base font-medium shadow-sm"
                />
                <svg className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>

             <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
               <a
                 href="https://sites.google.com/site/leauthaud/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                 title="Return to Leauthaud site"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                 </svg>
               </a>
               <button
                 onClick={onOpenAbout}
                 className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                 title="What is this?"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </button>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
