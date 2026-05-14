import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Trophy, Calendar } from 'lucide-react';
import Section from '../components/Section';
import { timeline } from '../data/portfolio';

const iconMap: { [key: string]: any } = {
  Briefcase,
  GraduationCap,
  Trophy,
};

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="My Experience" subtitle="The Journey So Far">
      <div className="max-w-4xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block" />

        <div className="space-y-12">
          {timeline.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Briefcase;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between flex-col md:flex-row ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-11px] md:left-1/2 md:translate-x-[-50%] top-0 md:top-6 w-5 h-5 rounded-full bg-bg-primary border-2 border-primary z-10 hidden md:block">
                  <div className="absolute inset-1 rounded-full bg-primary animate-pulse" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[45%]">
                  <div className="glass-card p-8 relative hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <IconComponent size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-primary flex items-center gap-2">
                          <Calendar size={12} /> {item.date}
                        </span>
                        <h3 className="text-xl font-bold font-display">{item.title}</h3>
                      </div>
                    </div>
                    
                    <h4 className="text-secondary font-semibold mb-3 text-sm">{item.subtitle}</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for MD screens */}
                <div className="w-full md:w-[45%] hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Experience;
