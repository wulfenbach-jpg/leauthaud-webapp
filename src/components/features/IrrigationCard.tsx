import React, { useState } from 'react';
import { IrrigationSolution } from '../../types';
import Badge from '../common/Badge';

interface Props {
  solution: IrrigationSolution;
  onClick: () => void;
}

const IrrigationCard: React.FC<Props> = ({ solution, onClick }) => {
  const [imgError, setImgError] = useState(false);
  
  const displayPhoto = solution.photo || `https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=800&auto=format&fit=crop`;

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col h-full duration-300"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        {!imgError ? (
          <img 
            src={displayPhoto} 
			referrerPolicy="no-referrer"
            alt={solution.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-slate-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <Badge color="slate" className="bg-white/90 backdrop-blur-sm shadow-sm">{solution.technologicalAdvancement}</Badge>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-2 min-h-[2.5rem] leading-snug">
          {solution.name}
        </h3>
        
        <p className="text-[11px] text-slate-500 mb-4 line-clamp-3 leading-relaxed min-h-[3rem] font-medium">
          {solution.shortDescription}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-tight">
            <span className="text-slate-400">Scale</span>
            <span className="text-slate-900">{solution.scaleOfUse}</span>
          </div>
          
          <div className="flex items-center text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            <span className="truncate">{solution.developer}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationCard;