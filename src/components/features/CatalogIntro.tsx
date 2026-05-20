import React, { useState } from 'react';

const CatalogIntro: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="mb-8 bg-white rounded-xl border border-[rgba(0,0,0,0.05)] overflow-hidden shadow-[rgba(0,0,0,0.03)_0px_2px_4px]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-[#fafafa] transition-colors"
      >
        <h2 className="text-[13px] font-medium text-[#0d0d0d] uppercase tracking-[0.65px]">
          About this catalog
        </h2>
        <svg
          className={`w-4 h-4 text-[#888888] transition-transform duration-500 ease-in-out ${
            isExpanded ? 'rotate-180' : ''
          } group-hover:text-[#666666]`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className="relative">
        <div
          className="px-6 space-y-3 text-[15px] text-[#333333] leading-relaxed font-normal overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: isExpanded ? '600px' : '170px' }}
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
            <div className="h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            <div className="relative px-6 pb-5 pt-3 text-center">
              <button
                onClick={() => setIsExpanded(true)}
                className="px-6 py-2 text-[13px] font-medium text-[#18E299] uppercase tracking-[0.65px] hover:text-[#0fa76e] hover:bg-[#d4fae8] rounded-full transition-all"
              >
                Read more
              </button>
            </div>
          </>
        )}

        {isExpanded && (
          <div className="px-6 pb-5 pt-2 text-center">
            <button
              onClick={() => setIsExpanded(false)}
              className="px-6 py-2 text-[13px] font-medium text-[#888888] uppercase tracking-[0.65px] hover:text-[#666666] hover:bg-[#f5f5f5] rounded-full transition-all"
            >
              Show less
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogIntro;