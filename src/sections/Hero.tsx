import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import Button from '../components/Button';
import { pretext } from '../data/portfolio';

const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z"></path>
  </svg>
);

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 mb-6"
          >
            Available for New Projects
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-6"
          >
            I'm <span className="gradient-text">Ashish Kumar</span>
            <br />
            <span className="text-3xl md:text-5xl text-text-secondary mt-4 block">
              {pretext.hero.tagline}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-text-secondary max-w-xl mb-10 leading-relaxed"
          >
            {pretext.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="primary" size="lg" icon={<ArrowRight size={20} />}>
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="outline" size="lg" icon={<Download size={20} />}>
              <a href="/Ashish_Kumar_Resume.pdf" download>Resume</a>
            </Button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center gap-6"
          >
            {[
              { icon: <Github />, href: 'https://github.com/ashishkr710' },
              { icon: <Linkedin />, href: 'https://www.linkedin.com/in/ashishkr710' },
              { icon: <XIcon />, href: 'https://x.com/Aktherock121' },
              { icon: <Mail />, href: 'mailto:ashishkr710@gmail.com' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-all duration-300 transform hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Background Rings */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-spin-slow" />
            <div className="absolute inset-4 border border-secondary/20 rounded-full animate-spin-slow [animation-direction:reverse]" />

            {/* Image Container */}
            <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white/5 glow-primary animate-float">
              <img
                src="/images/hero-bg.png"
                alt="Ashish Kumar Coding"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 -right-4 glass-card px-4 py-2 flex items-center gap-2 border-white/10"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">MERN Specialist</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 -left-4 glass-card px-4 py-2 flex items-center gap-2 border-white/10"
            >
              <span className="text-sm font-medium">Full Stack Dev</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
