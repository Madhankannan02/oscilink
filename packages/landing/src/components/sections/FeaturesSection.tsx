'use client';

export function FeaturesSection() {
  return (
    <section className="py-24 bg-surface-bright border-t border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        <div className="text-center mb-16">
          <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md text-on-surface mb-4 tracking-tight">Engineered for depth</h2>
          <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/20 soft-shadow hover:border-primary/40 transition-all">
            <span className="material-symbols-outlined text-primary text-3xl mb-4">memory</span>
            <h3 className="font-headline-md text-lg text-on-surface mb-2">Real AVR Emulator</h3>
            <p className="font-body-base text-sm text-on-surface-variant leading-relaxed">Not fake animation. Real compiled C++ running on a virtual ATmega328P.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/20 soft-shadow hover:border-primary/40 transition-all">
            <span className="material-symbols-outlined text-primary text-3xl mb-4">code</span>
            <h3 className="font-headline-md text-lg text-on-surface mb-2">Built-in Code Editor</h3>
            <p className="font-body-base text-sm text-on-surface-variant leading-relaxed">Syntax highlighting, autocomplete, and error feedback. Feels like Arduino IDE, loads in 2 seconds.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/20 soft-shadow hover:border-primary/40 transition-all">
            <span className="material-symbols-outlined text-primary text-3xl mb-4">terminal</span>
            <h3 className="font-headline-md text-lg text-on-surface mb-2">Live Serial Monitor</h3>
            <p className="font-body-base text-sm text-on-surface-variant leading-relaxed">Your Serial.println() actually prints. Debug your code like you would on real hardware.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/20 soft-shadow hover:border-primary/40 transition-all">
            <span className="material-symbols-outlined text-primary text-3xl mb-4">inventory_2</span>
            <h3 className="font-headline-md text-lg text-on-surface mb-2">Component Library</h3>
            <p className="font-body-base text-sm text-on-surface-variant leading-relaxed">Resistors, LEDs, buttons, LCDs, servos, ultrasonic sensors, and more. Growing every month.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/20 soft-shadow hover:border-primary/40 transition-all">
            <span className="material-symbols-outlined text-primary text-3xl mb-4">zoom_out_map</span>
            <h3 className="font-headline-md text-lg text-on-surface mb-2">Infinite Canvas</h3>
            <p className="font-body-base text-sm text-on-surface-variant leading-relaxed">Zoom in, zoom out, pan. Build circuits as small or as complex as you need.</p>
          </div>

          {/* Card 6 */}
          <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/20 soft-shadow hover:border-primary/40 transition-all">
            <span className="material-symbols-outlined text-primary text-3xl mb-4">share</span>
            <h3 className="font-headline-md text-lg text-on-surface mb-2">Save &amp; Share</h3>
            <p className="font-body-base text-sm text-on-surface-variant leading-relaxed">One link to share your circuit with a classmate, student, or the internet. No account required to view.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
