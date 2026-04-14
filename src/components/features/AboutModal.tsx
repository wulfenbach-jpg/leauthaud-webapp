import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center px-8 py-6 border-b border-slate-100 shrink-0 bg-white">
          <div className="flex-grow">
            <h2 className="text-xl font-extrabold text-slate-900 leading-tight">What is this?</h2>
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
        <div className="flex-grow overflow-y-auto p-8 space-y-6 no-scrollbar text-sm text-slate-600 leading-relaxed font-medium">
          <p>
            Are you looking for a non-proprietary and open source system for your water management needs? This dataset describes a collection of existing automatic irrigation systems, ranging from home and garden setups to small scale farms. It is meant for the general public, including gardeners, farmers, or anyone interested in learning about available Do-It-Yourself and open-source water efficiency technologies.
          </p>
          <p>
            You can use this page to compare systems that have been developed and find options that best fit your needs, space, and technical skills. You can filter results according to criteria such as technologies involved, irrigation type, scale of use, and level of advancement.
          </p>
          <p>
            Each entry includes a short description of the system, main components, scale of use, cost if available, as well as other characteristics of the system. It is also noted if coding is required, what sensors are used, and when the source was last updated. Images and source links are included so users can explore each system further.
          </p>
          <p>
            Many systems share similar features such as a control board (Arduino or Raspberry Pi) and sensors like soil moisture or weather data which improve efficiency. Differences between systems include cost, complexity, and scale.
          </p>
          <p>
            We will update this database on a yearly basis. If you know of any other non-proprietary and open source automated irrigation system, please contact us and we will add it to our database!
          </p>
          <p className="italic text-slate-500">
            The inclusion of any brand name or photo is purely descriptive and should not be considered as an endorsement. We compiled this information from online sources, and this database is provided for information only, and you can seek advice directly from the team that developed each technology.
          </p>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
           <button onClick={onClose} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
             Close
           </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
