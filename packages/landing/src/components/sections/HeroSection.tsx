'use client';

import { SIMULATOR_URL } from '../../lib/constants';
import Image from 'next/image';

export function HeroSection() {
  const handleScrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center min-h-[700px]">
      
      {/* Left Column: Content */}
      <div className="flex flex-col gap-6">
        <p className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
          // NO HARDWARE NEEDED. NO INSTALL. JUST OPEN A TAB.
        </p>

        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background leading-tight">
          Build Arduino Circuits. <br />
          <span className="text-primary">In Your Browser.</span> <br />
          Right Now.
        </h1>

        <p className="font-body-base text-on-surface-variant max-w-lg text-lg">
          Drag components. Write real C++. Hit Run. Watch your LED blink — powered by an actual AVR emulator, not a fake animation.
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          <button 
            onClick={() => window.location.href = SIMULATOR_URL}
            className="bg-primary text-on-primary font-bold px-8 py-4 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all soft-shadow"
          >
            Open Simulator
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          
          <button 
            onClick={handleScrollToHowItWorks}
            className="bg-secondary-container text-on-secondary-container font-bold px-8 py-4 rounded-lg flex items-center gap-2 hover:bg-secondary-container/80 transition-all"
          >
            See How It Works
            <span className="material-symbols-outlined">south</span>
          </button>
        </div>

        {/* Performance Indicator Chips */}
        <div className="flex gap-4 mt-8">
          <div className="bg-secondary-container/30 border border-secondary/20 px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-code-sm text-xs text-secondary font-bold">AVR Core Active</span>
          </div>
          <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full flex items-center gap-2">
            <span className="font-code-sm text-xs text-primary font-bold">0ms Latency</span>
          </div>
        </div>
      </div>

      {/* Right Column: Soft Minimal Simulator Preview */}
      <div className="relative lg:block hidden">
        {/* Main Window */}
        <div className="bg-surface-container-lowest w-full aspect-video rounded-xl soft-shadow overflow-hidden flex flex-col border border-outline-variant relative">
          
          {/* Window Header */}
          <div className="bg-surface-container-low px-4 py-3 flex justify-between items-center border-b border-outline-variant">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-outline-variant" />
              <div className="w-3 h-3 rounded-full bg-outline-variant" />
              <div className="w-3 h-3 rounded-full bg-outline-variant" />
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded text-primary text-xs font-code-sm border border-outline-variant">
              <span className="material-symbols-outlined text-sm">developer_board</span>
              sketch_blink_v1.ino
            </div>
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-on-surface-variant text-lg cursor-pointer">play_arrow</span>
              <span className="material-symbols-outlined text-on-surface-variant text-lg cursor-pointer">settings</span>
            </div>
          </div>

          {/* Inner Layout */}
          <div className="flex-1 grid grid-cols-5 overflow-hidden">
            
            {/* Left: Code Editor */}
            <div className="col-span-2 border-r border-outline-variant bg-white p-4 font-code-sm text-[13px] leading-relaxed overflow-auto">
              <div className="flex gap-4">
                <div className="text-on-surface-variant/30 text-right select-none border-r border-outline-variant/10 pr-2">
                  1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10
                </div>
                <div className="text-on-surface-variant">
                  <span className="text-primary font-bold">void</span> setup() {'{'}<br />
                  &nbsp;&nbsp;<span className="text-secondary font-bold">pinMode</span>(13, OUTPUT);<br />
                  {'}'}<br /><br />
                  <span className="text-primary font-bold">void</span> loop() {'{'}<br />
                  &nbsp;&nbsp;<span className="text-secondary font-bold">digitalWrite</span>(13, HIGH);<br />
                  &nbsp;&nbsp;<span className="text-secondary font-bold">delay</span>(1000);<br />
                  &nbsp;&nbsp;<span className="text-secondary font-bold">digitalWrite</span>(13, LOW);<br />
                  &nbsp;&nbsp;<span className="text-secondary font-bold">delay</span>(1000);<br />
                  {'}'}
                </div>
              </div>
            </div>

            {/* Right: Circuit Canvas */}
            <div className="col-span-3 bg-surface-bright relative circuit-grid flex items-center justify-center overflow-hidden">
              <div className="relative w-64 h-64 flex items-center justify-center">
                
                {/* Arduino Mockup */}
                <div className="absolute inset-0 rounded-lg border border-primary/20 shadow-sm flex items-center justify-center overflow-hidden bg-white">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image 
                      src="/assets/hero_image.svg" 
                      alt="Arduino Uno"
                      fill
                      className="object-contain"
                    />
                    
                    {/* Soft Red Glow Overlay for LED */}
                    <div 
                      className="absolute w-4 h-4 bg-error rounded-full" 
                      style={{ 
                        top: '22%', right: '24%', 
                        animation: 'led-pulse 2s ease-in-out infinite', 
                        boxShadow: '0 0 20px #ba1a1a' 
                      }} 
                    />
                  </div>
                </div>
              </div>

              {/* Bottom: Serial Monitor Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 border border-outline-variant rounded p-2 font-code-sm text-[11px] soft-shadow backdrop-blur-sm">
                <div className="flex justify-between items-center mb-1 text-on-surface-variant/60 border-b border-outline-variant/10 pb-1">
                  <span>SERIAL MONITOR</span>
                  <span>9600 BAUD</span>
                </div>
                <div className="text-on-surface-variant font-medium">
                  &gt; System initialized...<br />
                  &gt; LED_PIN 13 -&gt; HIGH
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Tool Palette */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          <div className="bg-white p-3 rounded-xl soft-shadow border border-outline-variant hover:border-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
          </div>
          <div className="bg-white p-3 rounded-xl soft-shadow border border-outline-variant hover:border-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
          </div>
        </div>
      </div>
    </section>
  );
}
