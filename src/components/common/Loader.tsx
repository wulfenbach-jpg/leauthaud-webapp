import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-6">
      <div className="w-12 h-12 border-[4px] border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Repository Data</p>
    </div>
  );
};

export default Loader;
