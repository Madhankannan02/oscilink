'use client';

import { useState, useEffect } from 'react';
import { SIMULATOR_URL } from '../../lib/constants';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm' : 'bg-transparent border-transparent'
    }`}>
      <nav className="flex justify-between items-center px-6 md:px-margin-desktop py-4 max-w-container-max mx-auto">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
          <span className="font-display-lg text-headline-md tracking-tighter text-on-surface">
            Oscilink
          </span>
        </div>
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a className="font-body-base text-on-surface font-bold border-b-2 border-primary pb-1" href="#features">Features</a>
          <a className="font-body-base text-on-surface-variant font-medium hover:text-primary transition-colors" href="#for-teachers">For Teachers</a>
          <a className="font-body-base text-on-surface-variant font-medium hover:text-primary transition-colors" href="#blog">Blog</a>
        </div>
        
        {/* CTA */}
        <button 
          onClick={() => window.location.href = SIMULATOR_URL}
          className="bg-primary text-on-primary font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity soft-shadow"
        >
          Open Simulator
        </button>

      </nav>
    </header>
  );
}
