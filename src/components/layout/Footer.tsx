import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-[rgba(0,0,0,0.05)] mt-12">
       <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <span className="text-[10px] font-medium uppercase tracking-[0.6px] text-[#0d0d0d]">Leauthaud Labs 2025</span>
            <span className="text-[11px] text-[#888888] italic font-normal">Open Source and DIY sensing systems for water management</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#888888] max-w-2xl italic font-normal">
            The inclusion of any brand name or photo is purely descriptive and should not be considered as an endorsement. We compiled this information from online sources, and this database is provided for information only, and you can seek advice directly from the team that developed each technology.
          </p>
          <div className="flex gap-6 mt-2">
            <a
              href="https://sites.google.com/site/leauthaud/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-[#666666] hover:text-[#18E299] transition-colors"
            >
              Leauthaud Lab
            </a>
          </div>
       </div>
    </footer>
  );
};

export default Footer;