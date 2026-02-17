import React, { useState } from 'react';
import { IrrigationSolution } from '../types.ts';
import Badge from './Badge.tsx';

interface Props {
  solution: IrrigationSolution | null;
  onClose: () => void;
}

const DetailModal: React.FC<Props> = ({ solution, onClose }) => {
  const [imgError, setImgError] = useState(false);
  const [figureError, setFigureError] = useState(false);
  if (!solution) return null;

  const isFigureImageUrl = solution.figure.startsWith('http') || solution.figure.includes('drive.google.com/thumbnail');
  const hasPhoto = solution.photo && !imgError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Academic Style Header */}
        <div className="flex items-center px-8 py-6 border-b border-slate-100 shrink-0 bg-white">
          <div className="flex-grow">
            <h2 className="text-xl font-extrabold text-slate-900 leading-tight">{solution.name}</h2>
            <div className="flex items-center mt-1.5 space-x-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                Updated: {solution.lastUpdate}
              </span>
              <span>•</span>
              <span className="text-emerald-600">{solution.developer}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-8 space-y-10 no-scrollbar">
          
          <div className={`grid grid-cols-1 ${hasPhoto ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'} gap-10`}>
            {/* Visuals */}
            {hasPhoto && (
              <div className="space-y-6">
                 <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-video shadow-sm">
                    <img 
                      src={solution.photo} 
                      alt={solution.name} 
                      onError={() => setImgError(true)} 
                      loading="lazy"
                      className="w-full h-full object-cover" 
                    />
                 </div>
                 
                 <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Technical Description</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{solution.shortDescription}</p>
                 </div>
              </div>
            )}
            
            {/* Specifications Dashboard */}
            <div className="space-y-6">
               {!hasPhoto && (
                 <div className="mb-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Technical Description</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{solution.shortDescription}</p>
                 </div>
               )}

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">TRL Maturity</span>
                    <span className="text-xs font-bold text-slate-900">{solution.technologicalAdvancement}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Scale of Use</span>
                    <span className="text-xs font-bold text-slate-900">{solution.scaleOfUse}</span>
                  </div>
               </div>

               <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-100">
                  <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">Core Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                     <Badge color="emerald">{solution.typeOfDigitalTechnologies || "N/A"}</Badge>
                     {solution.typeOfIrrigation.map(t => <Badge key={t} color="slate">{t}</Badge>)}
                  </div>
               </div>

               <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sensing & Logic</h4>
                  <div className="grid grid-cols-1 gap-2">
                     <div className="flex justify-between text-xs py-2 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">Smart Sensors</span>
                        <span className="text-slate-900 font-bold">{solution.smartSensorsType}</span>
                     </div>
                     <div className="flex justify-between text-xs py-2 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">Remote Sensing</span>
                        <span className="text-slate-900 font-bold">{solution.remoteSensing}</span>
                     </div>
                     <div className="flex justify-between text-xs py-2 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">Documentation</span>
                        <span className="text-slate-900 font-bold">{solution.documentationType}</span>
                     </div>
                  </div>
               </div>

               <div className="pt-4 flex flex-wrap gap-3">
                  {solution.links.map((link, i) => (
                    <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[11px] font-bold tracking-wider hover:bg-emerald-700 transition-colors shadow-lg shadow-slate-200">
                      TECHNICAL SOURCE
                      <svg className="w-3.5 h-3.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                  ))}
               </div>
            </div>
          </div>

          {/* Operational Figure & Logic */}
          <div className={`bg-slate-900 rounded-2xl p-8 text-white ${!hasPhoto ? 'max-w-3xl mx-auto' : ''}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
               <div className="space-y-4">
                 <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest">Mechanism Composition</h4>
                 <p className="text-slate-300 text-xs leading-loose font-medium">
                   {solution.composedOf}
                 </p>
               </div>
               <div className="flex justify-center">
                  {isFigureImageUrl && !figureError ? (
                    <div className="bg-white p-2 rounded-xl shadow-2xl">
                      <img 
                        src={solution.figure} 
                        alt="Mechanism" 
                        onError={() => setFigureError(true)} 
                        loading="lazy"
                        className="max-w-full h-auto rounded-lg grayscale hover:grayscale-0 transition-all duration-300" 
                      />
                    </div>
                  ) : (
                    <div className="text-slate-500 italic text-[11px] border-l-2 border-emerald-500/40 pl-4 py-2 bg-slate-800/50 rounded-r-lg w-full">
                       {solution.figure || "Visual schema unavailable."}
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Abstract */}
          <div className={`space-y-4 ${!hasPhoto ? 'max-w-3xl mx-auto' : ''}`}>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Extended Documentation Content</h4>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 whitespace-pre-line text-slate-700 leading-loose text-sm font-medium">
              {solution.documentContent}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
           <button onClick={onClose} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
             Close Abstract
           </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;