import { useRef } from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({
  children,
  className = '',
  glowColor = 'rgba(255, 255, 255, 0.15)',
  glowColorLight = 'rgba(255, 255, 255, 0.03)',
  borderHoverClass = '',
  roundedClass = 'rounded-[24px]',
  animateProps = {},
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`group relative project-card-glass ${roundedClass} overflow-hidden border border-neutral-200/50 transition-all duration-300 ${className} ${borderHoverClass}`}
      style={{
        '--glow-color': glowColor,
        '--glow-color-transparent': glowColorLight,
      }}
      {...animateProps}
      {...props}
    >
      <div className="spotlight-border" aria-hidden="true" />
      <div className="spotlight-overlay" aria-hidden="true" />
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
