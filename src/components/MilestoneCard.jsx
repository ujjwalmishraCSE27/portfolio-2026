import { motion } from 'framer-motion';

const cardThemes = {
  "2023": {
    bg: "bg-[#ff9f43]", // Retro Orange
    text: "text-neutral-900",
    shadow: "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    activeShadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
    icon: (
      <svg className="w-6 h-6 sm:w-8 h-8 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l4-2.22M12 14L8 11.78" />
      </svg>
    ),
    badgeBg: "bg-neutral-900 text-[#ff9f43]"
  },
  "2024": {
    bg: "bg-[#ff007f]", // Neon Pink
    text: "text-white",
    shadow: "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    activeShadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
    icon: (
      <svg className="w-6 h-6 sm:w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    badgeBg: "bg-white text-[#ff007f] font-bold border-2 border-neutral-900"
  },
  "2025": {
    bg: "bg-[#00d2d3]", // Retro Cyan/Teal
    text: "text-neutral-900",
    shadow: "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    activeShadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
    icon: (
      <svg className="w-6 h-6 sm:w-8 h-8 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    badgeBg: "bg-neutral-900 text-[#00d2d3]"
  },
  "PRESENT": {
    bg: "bg-[#8c7ae6]", // Retro Violet
    text: "text-white",
    shadow: "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    activeShadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
    icon: (
      <svg className="w-6 h-6 sm:w-8 h-8 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.18 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.783-.57-.372-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" />
      </svg>
    ),
    badgeBg: "bg-white text-[#8c7ae6] font-bold border-2 border-neutral-900"
  }
};

const MilestoneCard = ({ year, title, description, skills, highlights, isActive }) => {
  const theme = cardThemes[year] || cardThemes["2023"];
  const isPresent = year === "PRESENT";

  // Card Variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: isActive ? 1 : 0.6,
      scale: isActive ? 1 : 0.95,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`relative w-[calc(100vw-88px)] xs:w-[calc(100vw-110px)] sm:w-full max-w-[310px] sm:max-w-[380px] md:max-w-[420px] p-4 sm:p-5 md:p-6 rounded-none border-[3px] sm:border-[4px] border-neutral-900 ${theme.bg} ${theme.text} ${isActive ? theme.activeShadow : theme.shadow} transition-all duration-300 select-none z-20`}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Neo-brutalist custom tab header for 2025 folder effect */}
      {year === "2025" && (
        <div className="absolute -top-[26px] sm:-top-[34px] left-[-3px] sm:left-[-4px] h-[24px] sm:h-[30px] w-24 sm:w-32 bg-[#00d2d3] border-[3px] sm:border-[4px] border-b-0 border-neutral-900 flex items-center justify-center font-bold text-[10px] sm:text-xs uppercase tracking-widest text-neutral-900">
          📂 Archive.zip
        </div>
      )}

      {/* Decorative Neo-Brutalist grid background layer for PRESENT card */}
      {isPresent && (
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
          backgroundSize: '12px 12px'
        }} />
      )}

      {/* Card Header */}
      <div className="flex justify-between items-start mb-3 sm:mb-4 relative z-10">
        <span className="font-sketch text-3xl sm:text-4xl md:text-5xl tracking-widest bg-neutral-900 text-white px-2.5 py-0.5 sm:px-3 sm:py-1 font-bold border-2 border-neutral-900 select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {year}
        </span>
        <div className="p-1.5 sm:p-2 bg-neutral-900 border-2 border-neutral-900 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          {theme.icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-sketch text-xl sm:text-2xl md:text-3xl font-extrabold uppercase mb-1.5 sm:mb-2 tracking-wide flex items-center gap-1 leading-tight">
          {year === "2024" ? `[ ${title} ]` : title}
        </h3>
        
        <p className="font-sans text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-semibold opacity-90">
          {description}
        </p>

        {/* Dynamic skills rendering with Framer Motion staggered pop-in */}
        {skills && skills.length > 0 && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-2"
          >
            {skills.map((skill) => (
              <motion.span
                key={skill}
                variants={itemVariants}
                whileHover={{ scale: 1.15, rotate: (skill.charCodeAt(0) * 3 + skill.length) % 8 - 4 }}
                className={`text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 font-sans font-bold border-2 border-neutral-900 uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${theme.badgeBg}`}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Highlights rendering for Present achievement board */}
        {highlights && highlights.length > 0 && (
          <motion.ul 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-1.5 sm:gap-2 mt-2 sm:mt-3 pl-1 text-[11px] sm:text-xs md:text-sm"
          >
            {highlights.map((highlight) => (
              <motion.li
                key={highlight}
                variants={itemVariants}
                className="flex items-center gap-1.5 sm:gap-2 font-bold font-sans"
              >
                <span className="text-white bg-neutral-900 rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center text-[9px] sm:text-[10px]">✔</span>
                <span className="border-b-2 border-dashed border-neutral-900/40 pb-0.5">{highlight}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>

      {/* Retro Doodles overlays */}
      {year === "2024" && (
        <div className="absolute -bottom-5 -right-5 pointer-events-none opacity-80 z-20">
          <svg width="30" height="30" className="sm:w-10 sm:h-10" viewBox="0 0 40 40" fill="none">
            <path d="M 20,5 L 20,35 M 5,20 L 35,20 M 10,10 L 30,30 M 10,30 L 30,10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {isPresent && isActive && (
        <div className="absolute -top-5 -right-5 pointer-events-none z-20">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default MilestoneCard;
