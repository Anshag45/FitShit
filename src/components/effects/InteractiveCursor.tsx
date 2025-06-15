import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function InteractiveCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [clickRipples, setClickRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('cursor-pointer'))) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('cursor-pointer'))) {
        setIsHovering(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setClickRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setClickRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <motion.div
        className="fixed w-2 h-2 pointer-events-none z-50"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
        animate={{
          scale: isHovering ? 3 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full rounded-full bg-white shadow-lg" />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed w-8 h-8 border border-white/30 rounded-full pointer-events-none z-50"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.8 : 0.3,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Click ripples */}
      {clickRipples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed w-2 h-2 border border-white/60 rounded-full pointer-events-none z-50"
          style={{
            left: ripple.x - 4,
            top: ripple.y - 4,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 15, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </>
  );
}