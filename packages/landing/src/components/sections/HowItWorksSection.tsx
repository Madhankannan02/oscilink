'use client';

export function HowItWorksSection() {
  return (
    <section className="py-32 bg-surface">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="text-center mb-20">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background tracking-tight">Three steps from idea to running circuit</h2>
          <p className="font-body-base text-on-surface-variant mt-4 max-w-2xl mx-auto text-lg">We simplified the complex world of electronics into a seamless browser experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          
          {/* Step 1 Card */}
          <div className="flex flex-col bg-surface-bright rounded-xl border border-outline-variant/20 soft-shadow overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="aspect-video w-full overflow-hidden bg-surface-container-low border-b border-outline-variant/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt="Component library interface" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1DUcOEnK-1AYlZ44C5k0f2llzdHhyHhelEfnQzBjMQJjJxCcYR26ONt9-ssC3XHsWvV3pBhI7YqFv9cn1ZTKiZYgUWWz4RqI4GXfEXNdIRRg76aDc9z4rcJXhjzrD09YuS3QsS22P-bRkuc1g5bjWq4iyuge0PPC-m2tdJgYxDP8S9WYsliw06Xu-TxP-GhaHYiDPAcs9KhKbFYXrpmYspHnN4hFxaA394m8NxOmccPHxsS9U8Oy9_jzSvgOQ6Xd64Pp9-nlk_vg" 
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] mb-4 tracking-widest uppercase w-fit">Step 01</div>
              <h3 className="font-headline-md text-xl text-on-background mb-3">Drag your components</h3>
              <p className="font-body-base text-on-surface-variant leading-relaxed mb-6 flex-1">Drop an Arduino Uno, resistors, and LEDs onto the infinite canvas. Connect them with wires, just like on a breadboard.</p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group/link">
                <span>Explore library</span>
                <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
          
          {/* Step 2 Card */}
          <div className="flex flex-col bg-surface-bright rounded-xl border border-outline-variant/20 soft-shadow overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="aspect-video w-full overflow-hidden bg-surface-container-low border-b border-outline-variant/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt="Arduino code editor" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpKUMjXtTjagOMvN8Xmtfz3OQIo0-jQYNYbx1-rpiPC_O6vQadXSEvdWcxtPQ_KVmhDlydqkHJkrAGMdhwfHe15nr2G_IARy_7fK5kV0FkzfcSj76p9MoKlHHBG_kCq-f19Ea-qHYQH4xfvywD4_nJ9YCi2fg1VOS4Pqvw_6k76V4E2gYbImCIvJLOM-k6r3-RD8RjKuTLtuxdKfPOQTeVLlxB09blmRRv9RT-lmafrVCcm3JW3NSvJqaOJEvELPEQMkihGnFFYoA" 
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] mb-4 tracking-widest uppercase w-fit">Step 02</div>
              <h3 className="font-headline-md text-xl text-on-background mb-3">Write your code</h3>
              <p className="font-body-base text-on-surface-variant leading-relaxed mb-6 flex-1">The built-in editor speaks real Arduino C++. No transpiling, no workaround syntax. If it runs on a board, it runs here.</p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group/link">
                <span>AVR Core details</span>
                <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
          
          {/* Step 3 Card */}
          <div className="flex flex-col bg-surface-bright rounded-xl border border-outline-variant/20 soft-shadow overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="aspect-video w-full overflow-hidden bg-surface-container-low border-b border-outline-variant/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt="Simulation with glowing LED" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBysnt40DYAT7t7bPkIZcDDxV7iF0CMutR88hz9tvQ6CFGvBcSeLhebRnEIbjmJzuGhSavuAQTVXAueOnZ6jwnAwRQKET0hDg2ogqbCjJ2OzHu3ETJ8-41V4iwsfheocfGG6WHylsd-lcKO2iPUV19NvwtUCDoY5kZZDDcAA_Gmrx6ieph9rQL4zJlyk5pRyKLMU4z-DJnsE7tIfdv0Jpm5lc701GoWtBsA7bqqkUNGSndBCQ3o5YVPVrj7VNiN-fbkR9v6xZHx5GI" 
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] mb-4 tracking-widest uppercase w-fit">Step 03</div>
              <h3 className="font-headline-md text-xl text-on-background mb-3">Hit Run</h3>
              <p className="font-body-base text-on-surface-variant leading-relaxed mb-6 flex-1">A real AVR emulator executes your code. Your LED blinks on exact timing and your Serial Monitor prints live data.</p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group/link">
                <span>Try live demo</span>
                <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
