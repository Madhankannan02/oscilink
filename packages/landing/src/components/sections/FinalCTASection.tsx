'use client';

import { SIMULATOR_URL } from '../../lib/constants';

export function FinalCTASection() {
  return (
    <section className="py-24 border-t border-outline-variant/10 relative z-10 bg-primary text-on-primary">
      <div className="max-w-container-max mx-auto px-margin-desktop text-center">
        
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tight mb-4 text-on-primary">
          Your next lab practical starts now.
        </h2>
        
        <p className="font-body-base text-lg mb-8 text-primary-fixed">
          (Not in the lab. Not after you buy a kit. Right now, in this tab.)
        </p>
        
        <div className="max-w-2xl mx-auto mb-12">
          <p className="font-body-base leading-relaxed text-primary-fixed">
            1,400+ engineering students practiced their circuits here last week. The only thing between you and your first simulation is one click.
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={() => window.location.href = SIMULATOR_URL}
            className="font-bold px-12 py-5 rounded-lg flex items-center gap-2 hover:bg-secondary-fixed/90 transition-all soft-shadow text-lg bg-secondary-fixed text-on-secondary-fixed"
          >
            Open Simulator — It's Free
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <p className="font-label-caps text-label-caps text-primary-fixed/80 uppercase tracking-widest mt-2">
            No Account Required
          </p>
        </div>

      </div>
    </section>
  );
}
