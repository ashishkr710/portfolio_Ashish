import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { pretext } from '../data/portfolio';

const XIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: size, height: size }} className="fill-current">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z"></path>
  </svg>
);

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-primary pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold font-display mb-6 gradient-text"
        >
          AK.
        </motion.div>

        <p className="text-text-secondary max-w-md mb-10 text-lg text-center">
          {pretext.footer.tagline}
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6 mb-12">
          {[
            { icon: <Github size={20} />, href: 'https://github.com/ashishkr710' },
            { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/ashishkr710' },
            { icon: <XIcon size={20} />, href: 'https://x.com/Aktherock121' },
            { icon: <Mail size={20} />, href: 'mailto:ashishkr710@gmail.com' },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1, color: 'var(--color-primary)' }}
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-text-secondary border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12">
          {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-text-secondary hover:text-white transition-colors uppercase tracking-widest">
              {link}
            </a>
          ))}
        </div>

        {/* Back to Top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -5 }}
          className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mb-12"
        >
          <ArrowUp size={20} />
        </motion.button>

        <div className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Ashish Kumar. All rights reserved.
          </p>
          <p className="text-text-muted text-sm flex items-center gap-2">
            {/* Built with <span className="text-red-500">❤️</span> using React & Tailwind */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
