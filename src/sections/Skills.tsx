import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Cpu, Code, Terminal, Globe, FileCode, Zap, Github } from 'lucide-react';
import Section from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { skillCategories } from '../data/portfolio';

const iconMap: { [key: string]: any } = {
  Layout, Server, Database, Cpu, Code, Terminal, Globe, FileCode, Zap, Github,
  React: Globe, Wind: Zap // Fallbacks/Custom mapping
};

const Skills: React.FC = () => {
  return (
    <Section id="skills" title="My Skills" subtitle="Core Competencies">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillCategories.map((category, idx) => {
          const IconComponent = iconMap[category.icon] || Code;
          
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="h-full group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold font-display">{category.title}</h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, sIdx) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-text-secondary">{skill.name}</span>
                        <span className="text-xs font-bold text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.5 + (sIdx * 0.1) }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

export default Skills;
