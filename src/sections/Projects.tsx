import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import Section from '../components/Section';
import { projects } from '../data/portfolio';

const Projects: React.FC = () => {
  return (
    <Section id="projects" title="Featured Work" subtitle="Selected Projects">
      <div className="grid lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Project Card */}
            <div className="glass-card overflow-hidden h-full flex flex-col transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)]">
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0 group-hover:translate-x-1" />
                </h3>
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-text-secondary font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-auto flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="p-2 rounded-full bg-white/5 text-text-secondary hover:bg-primary hover:text-white transition-all duration-300"
                      title="GitHub Repository"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="p-2 rounded-full bg-white/5 text-text-secondary hover:bg-secondary hover:text-white transition-all duration-300"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  {/* <button className="ml-auto text-xs font-bold text-primary hover:text-accent underline underline-offset-4">
                    Learn More
                  </button> */}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to action */}
      <div className="mt-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-text-secondary mb-6">Want to see more of my work?</p>
          <a
            href="https://github.com"
            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300"
          >
            Browse GitHub Repositories <Github size={20} />
          </a>
        </motion.div>
      </div>
    </Section>
  );
};

export default Projects;
