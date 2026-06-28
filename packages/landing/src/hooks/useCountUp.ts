'use client';

import { useState, useEffect, useRef } from 'react';

export function useCountUp(end: number, duration: number, isTriggered: boolean, start = 0) {
  const [count, setCount] = useState(start);
  const countRef = useRef(count);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isTriggered) return;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      const easedProgress = easeOutCubic(percentage);
      const currentVal = Math.floor(start + (end - start) * easedProgress);
      
      if (countRef.current !== currentVal) {
        setCount(currentVal);
        countRef.current = currentVal;
      }

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, start, isTriggered]);

  return count;
}
