import { TECH_ICONS } from './TechIcons';
import GlassCard from './GlassCard';

const ProjectCard = ({ project, onClick }) => {
  // Define accent styles based on the project title
  const isNagarSetu = project.title === 'NagarSetu';
  const glowColor = isNagarSetu ? 'rgba(0, 242, 254, 0.35)' : 'rgba(0, 110, 255, 0.35)';
  const glowColorLight = isNagarSetu ? 'rgba(0, 242, 254, 0.08)' : 'rgba(0, 110, 255, 0.08)';
  const accentText = isNagarSetu ? 'text-[#00d2d3]' : 'text-blue-400';
  const accentBorder = isNagarSetu ? 'hover:border-[#00d2d3]/50' : 'hover:border-blue-400/50';

  return (
    <GlassCard
      glowColor={glowColor}
      glowColorLight={glowColorLight}
      borderHoverClass={accentBorder}
      onClick={onClick}
      className="flex flex-col h-full select-none cursor-pointer"
      animateProps={{
        whileHover: { y: -6 },
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      {/* Project Thumbnail Image wrapper - Taller aspect ratio */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden border-b border-neutral-200/50 bg-transparent">
        <img
          src={project.image}
          alt={`${project.title} dashboard UI preview`}
          className="w-full h-full object-cover brightness-[1.08] contrast-[1.03] transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Glow tint gradient on image hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-tr ${isNagarSetu ? 'from-cyan-400 to-[#ff007f]' : 'from-blue-600 to-indigo-500'}`} />
      </div>

      {/* Card Body Details - Taller padding */}
      <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between relative z-10">
        <div className="space-y-3">
          {/* Header Row: Title & Badge */}
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 tracking-tight font-inter uppercase">
              {project.title}
            </h3>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-opacity-35 tracking-wider uppercase font-spacemono ${project.badgeStyle}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {project.statusBadge}
            </span>
          </div>

          {/* Project Tagline */}
          <p className={`text-[10px] font-bold font-space tracking-wide ${accentText} uppercase`}>
            {project.tagline}
          </p>

          {/* Description summary - Shorter cap for compact look */}
          <p className="text-neutral-600 font-space text-xs sm:text-sm leading-relaxed font-semibold">
            {project.description.length > 120 ? `${project.description.substring(0, 117)}...` : project.description}
          </p>

          {/* Tech stack logos - scaled up to w-6 h-6 */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {project.technologies.map((tech) => (
              <div
                key={tech.name}
                className="group/tech relative flex items-center justify-center p-2 bg-neutral-100/70 border border-neutral-200/50 rounded-lg text-neutral-600 hover:text-neutral-950 hover:border-neutral-300 transition-colors [&_img]:w-6 [&_img]:h-6 [&_svg]:w-6 [&_svg]:h-6"
              >
                {TECH_ICONS[tech.name] || <span className="text-sm">⚛</span>}
                {/* Mini micro-tooltip */}
                <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/tech:opacity-100 transition-opacity bg-neutral-950 text-white text-[9px] font-bold font-spacemono py-0.5 px-1.5 rounded border border-neutral-800 uppercase tracking-wider whitespace-nowrap z-30 shadow-lg">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Panel Actions & metrics indicator */}
        <div className="flex items-center justify-between gap-4 mt-5 pt-3 border-t border-neutral-200/50">
          {/* Timeline and Role Display */}
          <div className="flex flex-col text-left font-space max-w-[65%]">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-normal">
              Role: <span className="font-extrabold text-neutral-950 normal-case font-space">{project.role}</span>
            </span>
            <span className="text-[9px] font-bold text-neutral-400 tracking-wider uppercase leading-normal mt-0.5">
              Timeline: <span className="font-bold text-neutral-600 font-spacemono">{project.timeline}</span>
            </span>
          </div>

          {/* View Details CTA Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className={`inline-flex items-center gap-1.5 text-xs font-bold font-spacemono uppercase tracking-wider ${accentText} group-hover:text-white transition-colors cursor-pointer focus:outline-none`}
          >
            View Details
            <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-1.5">→</span>
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectCard;
