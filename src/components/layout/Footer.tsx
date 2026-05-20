import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 mt-12">
       <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Leauthaud Labs 2025</span>
            <span className="text-[10px] font-bold uppercase tracking-widest italic">Open Source and DIY sensing systems for water management</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-400 max-w-2xl text-center italic">
            The inclusion of any brand name or photo is purely descriptive and should not be considered as an endorsement. We compiled this information from online sources, and this database is provided for information only, and you can seek advice directly from the team that developed each technology.
          </p>
       </div>
    </footer>
  );
};

export default Footer;
