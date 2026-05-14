import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CursorGlow: React.FC = () => {
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
        left: -150,
        top: -150,
      }}
      className="fixed w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none z-[1] hidden lg:block"
    />
  );
};

export default CursorGlow;
