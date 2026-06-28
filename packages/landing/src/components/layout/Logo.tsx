import React from 'react';
import { Zap } from 'lucide-react';

export function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 group">
      <Zap className="text-[#2C5E4A] w-6 h-6 fill-[#2C5E4A] -rotate-12 group-hover:scale-110 transition-transform" />
      <span className="text-gray-900 font-semibold text-[22px] tracking-[-1.2px] font-logo">Oscilink</span>
    </a>
  );
}
