import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  animate = true,
  delay = 0,
}) => {
  const content = (
    <div className={`glass-card glass-card-hover p-6 ${className}`}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {content}
    </motion.div>
  );
};

export const GlowEffect: React.FC<{ color?: string; className?: string }> = ({
  color = 'var(--color-primary)',
  className = '',
}) => {
  return (
    <div
      className={`absolute pointer-events-none blur-[120px] rounded-full opacity-20 ${className}`}
      style={{ backgroundColor: color }}
    />
  );
};
