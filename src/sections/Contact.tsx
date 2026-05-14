import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import Section from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { pretext } from '../data/portfolio';

const Contact: React.FC = () => {
  return (
    <Section id="contact" title="Get In Touch" subtitle="Contact Me">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 font-display">{pretext.contact.title}</h3>
          <p className="text-text-secondary text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
            {pretext.contact.description}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.a
              href="mailto:ashishkr710@gmail.com"
              whileHover={{ y: -5 }}
              className="block group"
            >
              <GlassCard className="p-8 h-full flex flex-col items-center gap-4 group-hover:border-primary/50 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Mail size={32} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Email Me</p>
                  <p className="text-sm font-medium text-text-primary break-all">ashishkr710@gmail.com</p>
                </div>
              </GlassCard>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/ashishkr710"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="block group"
            >
              <GlassCard className="p-8 h-full flex flex-col items-center gap-4 group-hover:border-secondary/50 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <Linkedin size={32} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">LinkedIn</p>
                  <p className="text-sm font-medium text-text-primary">ashishkr710</p>
                </div>
              </GlassCard>
            </motion.a>

            <motion.a
              href="https://github.com/ashishkr710"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="block group"
            >
              <GlassCard className="p-8 h-full flex flex-col items-center gap-4 group-hover:border-accent/50 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Github size={32} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">GitHub</p>
                  <p className="text-sm font-medium text-text-primary">ashishkr710</p>
                </div>
              </GlassCard>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
