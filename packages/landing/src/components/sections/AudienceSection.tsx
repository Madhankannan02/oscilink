'use client';

export function AudienceSection() {
  return (
    <section className="py-32 bg-surface border-t border-outline-variant/10 relative z-10">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        <div className="text-center mb-20">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background tracking-tight">Built for every stage of the journey</h2>
          <p className="font-body-base text-on-surface-variant mt-4 max-w-2xl mx-auto text-lg">Whether you're learning the basics or prototyping your next big invention.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          
          {/* Students Card */}
          <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/20 soft-shadow flex flex-col hover:border-primary/40 transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">school</span>
            </div>
            <h3 className="font-headline-md text-xl text-on-surface mb-3">For Students</h3>
            <p className="font-body-base text-on-surface-variant leading-relaxed mb-8 flex-1">Practice Arduino at 1 AM from your hostel room. No kit. No permission. No ₹800 at risk. Just open a tab and build.</p>
            <div className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group/link">
              <span>Start practicing</span>
              <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

          {/* Teachers Card */}
          <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/20 soft-shadow flex flex-col hover:border-primary/40 transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">group</span>
            </div>
            <h3 className="font-headline-md text-xl text-on-surface mb-3">For Teachers</h3>
            <p className="font-body-base text-on-surface-variant leading-relaxed mb-8 flex-1">Stop spending your demo slot untangling wires. Build the circuit once, share a link with your whole class, and let them follow along on their own screen.</p>
            <div className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group/link">
              <span>See classroom features</span>
              <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

          {/* Hobbyists Card */}
          <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/20 soft-shadow flex flex-col hover:border-primary/40 transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">construction</span>
            </div>
            <h3 className="font-headline-md text-xl text-on-surface mb-3">For Hobbyists</h3>
            <p className="font-body-base text-on-surface-variant leading-relaxed mb-8 flex-1">Test your idea completely in the browser before you order the parts. Know it works before you spend ₹2000 on components.</p>
            <div className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group/link">
              <span>Try your idea</span>
              <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
