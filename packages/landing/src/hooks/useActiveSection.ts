'use client';

import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();
    let currentlyVisible: { id: string; ratio: number }[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[], id: string) => {
      const entry = entries[0];
      const existingIndex = currentlyVisible.findIndex(v => v.id === id);

      if (entry.isIntersecting) {
        if (existingIndex > -1) {
          currentlyVisible[existingIndex].ratio = entry.intersectionRatio;
        } else {
          currentlyVisible.push({ id, ratio: entry.intersectionRatio });
        }
      } else {
        if (existingIndex > -1) {
          currentlyVisible.splice(existingIndex, 1);
        }
      }

      if (currentlyVisible.length > 0) {
        currentlyVisible.sort((a, b) => b.ratio - a.ratio);
        setActiveSection(currentlyVisible[0].id);
      } else if (window.scrollY === 0) {
        setActiveSection('');
      }
    };

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => handleIntersect(entries, id),
          { threshold: 0.5 }
        );
        observer.observe(element);
        observers.set(id, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
