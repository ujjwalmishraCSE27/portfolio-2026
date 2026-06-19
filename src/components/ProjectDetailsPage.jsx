import { useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { TECH_ICONS } from './TechIcons';

const ProjectDetailsPage = ({ project, onBack }) => {
  // Ensure the page starts at the top when mounted
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'unset';
  }, [project]);

  if (!project) return null;

  return (
    <div className="relative min-h-screen bg-white text-neutral-900 px-4 sm:px-6 py-12 md:py-16 overflow-hidden z-20">
      {/* Background patterns */}
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="relative w-full max-w-5xl mx-auto z-10 space-y-8">
        
        {/* Back navigation header */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-spacemono uppercase tracking-widest text-[#00f2fe] hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <span className="inline-block transition-transform duration-300 transform group-hover:-translate-x-1.5">←</span>
            Back to Portfolio
          </a>
        </motion.div>

        {/* Project Header Title */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold uppercase tracking-wider text-neutral-900 font-inter">
              {project.title}
            </h1>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border border-opacity-35 font-spacemono shadow-sm uppercase tracking-wider ${project.badgeStyle}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {project.statusBadge}
            </span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-500 font-bold font-space text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed"
          >
            {project.tagline}
          </motion.p>
        </div>

        {/* Hero preview banner - Bright and clear without vignette */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative w-full aspect-[21/10] sm:aspect-[21/9] rounded-[24px] overflow-hidden border border-neutral-200 shadow-lg bg-white"
        >
          <img
            src={project.image}
            alt={`${project.title} user interface preview screenshot`}
            className="w-full h-full object-cover brightness-[1.08] contrast-[1.03]"
          />
        </motion.div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
          
          {/* Left Columns details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Overview Section Card */}
            <GlassCard
              glowColor="rgba(0, 242, 254, 0.2)"
              glowColorLight="rgba(0, 242, 254, 0.02)"
              borderHoverClass="hover:border-[#00f2fe]/40"
              className="p-5 sm:p-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#00f2fe] font-spacemono mb-3">Overview</h3>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-space font-semibold">
                {project.description}
              </p>
            </GlassCard>

            {/* Problem Statement Section Card */}
            <GlassCard
              glowColor="rgba(255, 0, 127, 0.2)"
              glowColorLight="rgba(255, 0, 127, 0.02)"
              borderHoverClass="hover:border-[#ff007f]/40"
              className="p-5 sm:p-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff007f] font-spacemono mb-3">Problem Statement</h3>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-space font-semibold">
                {project.problem}
              </p>
            </GlassCard>

            {/* System Architecture Section Card */}
            <GlassCard
              glowColor="rgba(140, 122, 230, 0.2)"
              glowColorLight="rgba(140, 122, 230, 0.02)"
              borderHoverClass="hover:border-[#8c7ae6]/40"
              className="p-5 sm:p-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#8c7ae6] font-spacemono mb-3">System Architecture</h3>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-space font-semibold">
                {project.architecture}
              </p>
            </GlassCard>

            {/* Features Highlights Checklist */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-900 font-spacemono">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((highlight, idx) => (
                  <GlassCard
                    key={idx}
                    glowColor="rgba(255, 159, 67, 0.25)"
                    glowColorLight="rgba(255, 159, 67, 0.04)"
                    borderHoverClass="hover:border-[#ff9f43]/40"
                    roundedClass="rounded-xl"
                    className="p-3.5 flex flex-row items-start gap-2.5 font-space"
                  >
                    <span className="text-[#ff007f] font-bold select-none text-sm mt-0.5">✓</span>
                    <span className="text-sm text-neutral-700 font-semibold leading-relaxed">{highlight}</span>
                  </GlassCard>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column metrics and links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Action buttons */}
            <GlassCard
              glowColor="rgba(0, 0, 0, 0.05)"
              glowColorLight="rgba(0, 0, 0, 0.02)"
              borderHoverClass="hover:border-neutral-300"
              roundedClass="rounded-[20px]"
              className="p-5 space-y-3.5 shadow-md font-spacemono"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Project Actions</h4>
              
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-wider bg-neutral-950 text-white rounded-xl hover:bg-neutral-800 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </a>
              
              {project.liveLink ? (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-wider bg-neutral-100 border border-neutral-200 text-neutral-800 rounded-xl hover:bg-neutral-200 transition-all cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Launch App
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-wider bg-neutral-50 border border-neutral-200 text-neutral-400 rounded-xl cursor-not-allowed">
                  <span className="w-2 h-2 rounded-full bg-neutral-300" />
                  Live Demo Unavailable
                </div>
              )}
            </GlassCard>

            {/* Project Context: Timeline & Role */}
            <div className="space-y-3 font-space">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-spacemono">Project Context</h4>
              <div className="grid grid-cols-1 gap-4">
                {/* Role Card */}
                <GlassCard
                  glowColor={project.title === 'NagarSetu' ? 'rgba(0, 242, 254, 0.2)' : 'rgba(0, 110, 255, 0.2)'}
                  glowColorLight="rgba(0, 0, 0, 0.02)"
                  borderHoverClass={project.title === 'NagarSetu' ? 'hover:border-[#00f2fe]/30' : 'hover:border-blue-400/30'}
                  roundedClass="rounded-[20px]"
                  className="p-4 flex flex-col justify-center shadow-md font-space"
                >
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none">Role</span>
                  <span className="text-sm sm:text-base font-black text-neutral-900 font-outfit uppercase mt-2">{project.role}</span>
                </GlassCard>

                {/* Timeline Card */}
                <GlassCard
                  glowColor={project.title === 'NagarSetu' ? 'rgba(0, 242, 254, 0.2)' : 'rgba(0, 110, 255, 0.2)'}
                  glowColorLight="rgba(0, 0, 0, 0.02)"
                  borderHoverClass={project.title === 'NagarSetu' ? 'hover:border-[#00f2fe]/30' : 'hover:border-blue-400/30'}
                  roundedClass="rounded-[20px]"
                  className="p-4 flex flex-col justify-center shadow-md font-space"
                >
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none">Timeline</span>
                  <span className="text-sm sm:text-base font-black text-neutral-900 font-spacemono uppercase mt-2">{project.timeline}</span>
                </GlassCard>
              </div>
            </div>

            {/* Tech Stack List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 font-spacemono">Tech Stack & Icons</h4>
              <div className="grid grid-cols-2 gap-2">
                {project.technologies.map((tech) => (
                  <GlassCard
                    key={tech.name}
                    glowColor="rgba(0, 0, 0, 0.05)"
                    glowColorLight="rgba(0, 0, 0, 0.02)"
                    borderHoverClass="hover:border-neutral-300"
                    roundedClass="rounded-xl"
                    className="flex flex-row items-center gap-2.5 p-2.5"
                  >
                    <span className="flex items-center justify-center p-1 bg-neutral-100 border border-neutral-200/60 rounded-lg">
                      {TECH_ICONS[tech.name] || <span>⚛</span>}
                    </span>
                    <span className="text-xs font-bold font-spacemono text-neutral-600 uppercase truncate">
                      {tech.name}
                    </span>
                  </GlassCard>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetailsPage;
