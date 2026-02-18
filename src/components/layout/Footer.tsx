import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 mt-12">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Leauthaud Labs 2025</span>
          <span className="text-[10px] font-bold uppercase tracking-widest italic">Open Source and DIY sensing systems for water management</span>
       </div>
    </footer>
  );
};

export default Footer;
