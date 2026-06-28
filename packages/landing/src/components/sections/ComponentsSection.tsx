'use client';

import { COMPONENTS_LIST } from '../../lib/constants';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

function ComponentIcon({ iconName, color }: { iconName: string, color: string }) {
  const Icon = (LucideIcons as any)[iconName] as React.FC<LucideProps>;
  if (!Icon) return <LucideIcons.Box className="w-7 h-7" style={{ color }} />;
  return <Icon className="w-7 h-7" style={{ color }} />;
}

export function ComponentsSection() {
  return (
    <section id="components" className="w-full bg-bg-secondary py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label mb-4">Components Library</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
            Everything you need to build
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Our growing library of simulated components covers all the basics for learning electronics and prototyping Arduino projects.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {COMPONENTS_LIST.map((component, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-bg-card border border-border-default rounded-xl p-5 text-center transition-all duration-200 hover:border-brand/50 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="h-12 flex items-center justify-center mb-3">
                <ComponentIcon iconName={component.icon} color={component.color} />
              </div>
              <h3 className="text-sm font-bold text-text-primary mb-1">
                {component.name}
              </h3>
              <p className="text-xs text-text-muted">
                {component.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <span className="inline-flex items-center border border-brand/30 bg-brand/10 text-brand text-sm px-4 py-1.5 rounded-full">
            + More components coming soon
          </span>
        </div>
      </div>
    </section>
  );
}
