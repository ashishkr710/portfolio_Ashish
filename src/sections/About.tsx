import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { stats, pretext } from '../data/portfolio';

const About: React.FC = () => {
  return (
    <Section id="about" title="About Me" subtitle="My Story">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Stats and Image */}
        <div className="grid grid-cols-2 gap-6 order-2 lg:order-1">
          {stats.map((stat, i) => (
            <GlassCard key={i} delay={i * 0.1} className="text-center group">
              <motion.h3
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="text-4xl font-bold font-display gradient-text mb-2"
              >
                {stat.value}{stat.suffix}
              </motion.h3>
              <p className="text-text-secondary text-sm font-medium uppercase tracking-wider group-hover:text-white transition-colors">
                {stat.label}
              </p>
            </GlassCard>
          ))}
          <div className="col-span-2 mt-6">
             <GlassCard className="bg-primary/5 border-primary/10">
                <p className="text-primary italic font-medium">
                  "Turning coffee into scalable, high-performance web solutions."
                </p>
             </GlassCard>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">
              Passionate Developer <span className="text-primary">&</span> Problem Solver
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              {pretext.about.paragraph1}
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              {pretext.about.paragraph2}
            </p>
            
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-text-primary">Based in India, working globally</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-text-primary">Focused on MERN Stack & AI Integration</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default About;
