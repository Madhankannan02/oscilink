'use client';

import { PROBLEMS } from '../../lib/constants';
import { motion } from 'framer-motion';

export function ProblemSection() {
  return (
    <section id="problem" className="bg-bg-primary py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-label mb-4">The Problem</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">
            Learning electronics shouldn't be frustrating
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-bg-card border border-border-default rounded-xl p-8 relative overflow-hidden transition-all duration-300 hover:border-brand/50 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] group"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand/5 to-transparent pointer-events-none group-hover:from-brand/10 transition-colors duration-300" />
              
              <div className="text-4xl mb-5">{problem.emoji}</div>
              <h3 className="text-lg font-bold text-text-primary mb-3">{problem.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl italic text-brand font-medium max-w-2xl mx-auto leading-relaxed"
          >
            "We built Oscilink to remove the friction between having an idea and seeing it work."
          </motion.p>
        </div>
      </div>
    </section>
  );
}
