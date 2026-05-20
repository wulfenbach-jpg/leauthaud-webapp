import React, { useState } from 'react';

const CatalogIntro: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="mb-8 bg-white rounded-lg border border-slate-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 text-left group"
      >
        <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">
          About this catalog
        </h2>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          } group-hover:text-slate-600`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="relative">
        <div
          className={`px-6 pb-5 space-y-3 text-sm text-slate-600 leading-relaxed font-medium ${
            !isExpanded ? 'max-h-44 overflow-hidden' : ''
          }`}
        >
          <p>
            Are you looking for a non-proprietary and open source system for your water management
            needs? This dataset describes a collection of existing automatic irrigation systems,
            ranging from home and garden setups to small scale farms. It is meant for the general
            public, including gardeners, farmers, or anyone interested in learning about available
            Do-It-Yourself and open-source water efficiency technologies.
          </p>
          <p>
            You can use this page to compare systems that have been developed and find options that
            best fit your needs, space, and technical skills. You can filter results according to
            criteria such as technologies involved, irrigation type, scale of use, and level of
            advancement.
          </p>
          <p>
            Each entry includes a short description of the system, main components, scale of use,
            cost if available, as well as other characteristics of the system. It is also noted if
            coding is required, what sensors are used, and when the source was last updated. Images
            and source links are included so users can explore each system further.
          </p>
          <p>
            Many systems share similar features such as a control board (Arduino or Raspberry Pi)
            and sensors like soil moisture or weather data which improve efficiency. Differences
            between systems include cost, complexity, and scale.
          </p>
          <p>
            We will update this database on a yearly basis. If you know of any other non-proprietary
            and open source automated irrigation system, please contact us and we will add it to our
            database!
          </p>
        </div>

        {!isExpanded && (
          <>
            {/* Gradient fade overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            {/* Expand button */}
            <div className="relative px-6 pb-4 text-center -mt-2">
              <button
                onClick={() => setIsExpanded(true)}
                className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors"
              >
                Read more
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CatalogIntro;