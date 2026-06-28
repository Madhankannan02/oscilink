'use client';

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-surface relative z-10">
      
      {/* Metrics Strip */}
      <div className="w-full bg-surface-container-low border-y border-outline-variant/10 py-12 mb-24">
        <div className="max-w-container-max mx-auto px-margin-desktop flex justify-center items-center">
          <p className="font-headline-md text-headline-md text-primary tracking-widest uppercase flex items-center gap-6">
            <span>Launching Beta</span>
            <span className="w-2 h-2 rounded-full bg-primary/30" />
            <span>New Features Every Week</span>
            <span className="w-2 h-2 rounded-full bg-primary/30" />
            <span>Feel free to try</span>
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Trusted by the next generation of engineers</h2>
          <div className="w-16 h-1 bg-primary/20 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          
          {/* Testimonial 1 */}
          <div className="bg-surface-bright p-8 rounded-lg border border-outline-variant/20 soft-shadow flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-primary">person</span>
              </div>
              <div>
                <h4 className="font-headline-md text-sm text-on-surface">Priya R.</h4>
                <p className="text-xs text-on-surface-variant">3rd Year ECE, NIT Trichy</p>
              </div>
            </div>
            <p className="font-body-base text-on-surface-variant leading-relaxed italic flex-1">
              "I was stressed about my ECE lab practical the night before. I opened Oscilink, built the sensor circuit, fixed my code three times, and walked in confident. It's literally free practice with zero risk."
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-surface-bright p-8 rounded-lg border border-outline-variant/20 soft-shadow flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-secondary">school</span>
              </div>
              <div>
                <h4 className="font-headline-md text-sm text-on-surface">Dr. Aruna V.</h4>
                <p className="text-xs text-on-surface-variant">Dept of Electrical Engineering</p>
              </div>
            </div>
            <p className="font-body-base text-on-surface-variant leading-relaxed italic flex-1">
              "Oscilink changed how I teach microcontrollers. Instead of 40 students crowding around one breadboard, I share a link and everyone follows along on their own laptop. The engagement is night and day."
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-surface-bright p-8 rounded-lg border border-outline-variant/20 soft-shadow flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/10 flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-tertiary">engineering</span>
              </div>
              <div>
                <h4 className="font-headline-md text-sm text-on-surface">Rahul K.</h4>
                <p className="text-xs text-on-surface-variant">IoT Hobbyist &amp; Maker</p>
              </div>
            </div>
            <p className="font-body-base text-on-surface-variant leading-relaxed italic flex-1">
              "I practiced the IR sensor circuit 8 times before my lab exam and got full marks. Being able to debug logic errors without blowing up actual components saved me so much frustration and money."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
