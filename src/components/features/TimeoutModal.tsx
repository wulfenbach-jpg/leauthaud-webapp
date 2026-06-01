import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TimeoutModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md transition-opacity duration-300">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[95vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">

        <div className="flex items-center px-8 py-6 border-b border-slate-100 shrink-0 bg-white">
          <div className="flex-grow">
            <h2 className="text-xl font-extrabold text-slate-900 leading-tight">Still browsing?</h2>
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

        <div className="flex-grow p-8 space-y-4 text-sm text-slate-600 leading-relaxed font-medium">
          <p>
            You've been exploring the open-source water management catalog for a while.
            If you find a system that fits your needs, be sure to check the technical source links
            for detailed documentation and setup guides.
          </p>
          <p className="text-slate-500">
            Need help picking a system? Use the filters on the left to narrow down by
            technology type, scale of use, or price range.
          </p>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
           <button onClick={onClose} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
             Dismiss
           </button>
        </div>
      </div>
    </div>
  );
};

export default TimeoutModal;