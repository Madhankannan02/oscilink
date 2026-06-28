'use client';

import { STATS } from '../../lib/constants';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useCountUp } from '../../hooks/useCountUp';

function StatItem({ value, label, isTriggered }: { value: string, label: string, isTriggered: boolean }) {
  const isNumeric = !isNaN(parseInt(value));
  const numericValue = isNumeric ? parseInt(value) : 0;
  const suffix = isNumeric ? value.replace(/[0-9]/g, '') : '';
  
  const animatedValue = useCountUp(numericValue, 1500, isTriggered);

  return (
    <div className="text-center relative">
      <div className="text-4xl font-extrabold text-brand mb-1">
        {isNumeric ? (
          <span>{animatedValue}{suffix}</span>
        ) : (
          <span className={`transition-opacity duration-700 delay-300 ${isTriggered ? 'opacity-100' : 'opacity-0'}`}>
            {value}
          </span>
        )}
      </div>
      <div className="text-text-secondary text-sm font-medium">
        {label}
      </div>
    </div>
  );
}

export function StatsBar() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section ref={ref} className="w-full bg-bg-secondary border-y border-border-default py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          {STATS.map((stat, index) => (
            <div key={index} className="relative">
              <StatItem value={stat.value} label={stat.label} isTriggered={isVisible} />
              
              {/* Divider (not shown after last stat) */}
              {index < STATS.length - 1 && (
                <div className="hidden md:block absolute right-[-16px] top-1/2 -translate-y-1/2 w-px h-12 bg-border-default" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
