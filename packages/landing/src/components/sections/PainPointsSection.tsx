'use client';

export function PainPointsSection() {
  return (
    <section className="bg-surface-container-low py-24 border-y border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        <div className="text-center mb-16">
          <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md text-on-surface mb-4 tracking-tight">Sound familiar?</h2>
          <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <div className="bg-surface-bright p-8 rounded-2xl border border-outline-variant/20 soft-shadow group hover:border-primary/40 transition-all hover:-translate-y-1">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-error/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-error text-3xl">schedule</span>
              </div>
              <div>
                <h3 className="font-headline-md text-lg text-on-surface mb-2">Limited Lab Access</h3>
                <p className="font-body-base text-on-surface-variant leading-relaxed">Your college lab is open 2 hours a week. You have 4 assignments due and a line out the door.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-bright p-8 rounded-2xl border border-outline-variant/20 soft-shadow group hover:border-primary/40 transition-all hover:-translate-y-1">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-error/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-error text-3xl">electrical_services</span>
              </div>
              <div>
                <h3 className="font-headline-md text-lg text-on-surface mb-2">Expensive Mistakes</h3>
                <p className="font-body-base text-on-surface-variant leading-relaxed">You accidentally shorted your Arduino. ₹800 gone. Lab sir is not happy, and neither is your wallet.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-bright p-8 rounded-2xl border border-outline-variant/20 soft-shadow group hover:border-primary/40 transition-all hover:-translate-y-1">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-error/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-error text-3xl">heart_broken</span>
              </div>
              <div>
                <h3 className="font-headline-md text-lg text-on-surface mb-2">Unreliable Tools</h3>
                <p className="font-body-base text-on-surface-variant leading-relaxed">Your browser-based tool crashed again. You've spent 20 minutes making an account just to lose your progress.</p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-bright p-8 rounded-2xl border border-outline-variant/20 soft-shadow group hover:border-primary/40 transition-all hover:-translate-y-1">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-error/5 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-error text-3xl">dark_mode</span>
              </div>
              <div>
                <h3 className="font-headline-md text-lg text-on-surface mb-2">The 1 AM Inspiration</h3>
                <p className="font-body-base text-on-surface-variant leading-relaxed">It's 1 AM. You want to practice. Your kit is in your locker, and the lab is locked tight.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/5 rounded-full border border-primary/10">
            <span className="material-symbols-outlined text-primary text-sm">favorite</span>
            <p className="font-body-base text-on-surface-variant italic">We built this because we've been there too.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
