import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X as CloseIcon, Github, Linkedin } from 'lucide-react';
import { navLinks } from '../data/portfolio';

const XIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: size, height: size }} className="fill-current">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z"></path>
  </svg>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [...navLinks].reverse();
      for (const link of sections) {
        const el = document.getElementById(link.id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(link.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold font-display gradient-text"
        >
          AK.
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === link.id ? 'text-primary' : 'text-text-secondary'
                    }`}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="h-6 w-px bg-white/10 mx-2" />

          <div className="flex items-center gap-4">
            <a href="https://github.com/ashishkr710" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ashishkr710" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://x.com/Aktherock121" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors">
              <XIcon size={20} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <CloseIcon size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-bg-secondary border-b border-white/5 overflow-hidden"
          >
            <ul className="px-6 py-8 flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium ${activeSection === link.id ? 'text-primary' : 'text-text-secondary'
                      }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
