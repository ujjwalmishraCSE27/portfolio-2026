import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/experience';
import { TECH_ICONS } from './TechIcons';
import prodeskLogo from '../assets/prodesk.png';
import codeResiteLogo from '../assets/code_resite.jpg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COMPANY_LOGOS = {
  prodesk: <img src={prodeskLogo} alt="Prodesk Logo" className="w-12 h-12 object-contain rounded-full border border-neutral-100 shadow-sm bg-white" />,
  coderesite: <img src={codeResiteLogo} alt="Code Resite Logo" className="w-12 h-12 object-contain rounded-full border border-neutral-100 shadow-sm bg-white" />
};

const Experience = () => {
  const handleShowAll = () => {
    window.location.hash = '#all-experiences';
  };

  const prodeskExp = EXPERIENCE.find(exp => exp.id === 'prodesk');
  const otherExps = EXPERIENCE.filter(exp => exp.id !== 'prodesk');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Watermark animation
      gsap.fromTo('.experience-watermark',
        { opacity: 0, x: -55 },
        {
          opacity: 0.02,
          x: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#experience',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 2. Timeline spine drawing animation
      gsap.fromTo('.experience-spine',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '#experience',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 3. Milestone markers fade & scale in
      gsap.fromTo('.experience-marker',
        { opacity: 0, scale: 0 },
        {
          opacity: 0.4,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '#experience',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 4. Spotlights fade in
      gsap.fromTo('.experience-spotlight',
        { opacity: 0 },
        {
          opacity: 0.03,
          duration: 1.2,
          stagger: 0.3,
          scrollTrigger: {
            trigger: '#experience',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative w-full py-24 px-6 md:px-12 bg-[#F6F6F6] text-neutral-900 z-10 border-t border-neutral-100 overflow-hidden">
      {/* Layered Background System */}
      <div className="paper-texture" />
      <div className="blueprint-grid-80" />

      {/* Topographic contour lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-neutral-950/2 fill-none z-0" strokeWidth="0.8">
        <path d="M -100,150 C 300,50 400,450 700,350 S 1100,500 1300,400" />
        <path d="M -100,250 C 300,150 400,550 700,450 S 1100,600 1300,500" />
        <path d="M -100,350 C 300,250 400,650 700,550 S 1100,700 1300,600" />
      </svg>

      {/* Giant Watermark Typography */}
      <div className="absolute inset-0 flex items-start justify-start pointer-events-none select-none z-0 overflow-hidden pl-10 pt-16">
        <div className="experience-watermark text-[16rem] sm:text-[20rem] md:text-[28rem] font-black font-outfit text-neutral-900 tracking-tighter uppercase leading-none select-none" style={{ opacity: 0.02 }}>
          CAREER
        </div>
      </div>

      {/* Tiny Architectural Measurements */}
      <div className="absolute top-[35%] right-[8%] font-spacemono text-[9px] md:text-[10px] font-bold text-neutral-950/4 select-none pointer-events-none z-10">2026_PRES</div>
      <div className="absolute top-[65%] left-[5%] font-spacemono text-[9px] md:text-[10px] font-bold text-neutral-950/4 select-none pointer-events-none z-10">2025_INIT</div>
      <div className="absolute bottom-[10%] right-[12%] font-spacemono text-[9px] md:text-[10px] font-bold text-neutral-950/4 select-none pointer-events-none z-10">2024_PREV</div>

      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-start select-none z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16 space-y-1">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 font-spacemono">
            Career
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit uppercase tracking-wider text-neutral-900">
            Experience
          </h2>
          <div className="h-[2px] w-20 bg-neutral-950 mt-3" />
        </div>

        {/* Experience List container */}
        <div className="w-full relative space-y-12">
          {/* Vertical timeline spine */}
          <div className="absolute left-[23px] top-6 bottom-6 w-[1.5px] bg-neutral-900/5 pointer-events-none hidden sm:block experience-spine origin-top" />

          {/* 1. Featured Internship (Prodesk IT) - FULL DETAILS */}
          {prodeskExp && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 items-start w-full relative z-10"
            >
              {/* Logo */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full relative z-10">
                {COMPANY_LOGOS.prodesk}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col min-w-0 bg-neutral-50/65 border border-neutral-100 rounded-2xl p-6 md:p-8 relative">
                {/* Spotlight background */}
                <div className="absolute -inset-4 bg-neutral-950 rounded-full blur-[80px] pointer-events-none select-none z-0 experience-spotlight" style={{ opacity: 0.03 }} />

                <div className="relative z-10">
                  {/* Meta details */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold font-outfit text-neutral-900 flex items-center gap-2">
                        <span className="text-sm font-bold text-neutral-400 select-none hidden sm:inline experience-marker">◉</span>
                        {prodeskExp.company}
                      </h3>
                      <div className="text-sm font-semibold font-outfit text-neutral-700 mt-0.5">
                        {prodeskExp.role} &middot; <span className="text-neutral-500 font-medium">{prodeskExp.location}</span>
                      </div>
                    </div>
                    <div className="font-spacemono text-xs md:text-sm font-bold text-neutral-400 sm:text-right tracking-wider">
                      {prodeskExp.duration}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-neutral-200/50 w-full my-5" />

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-[10px] font-bold text-neutral-400 tracking-widest mb-3 font-spacemono uppercase">
                      Technologies & Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {prodeskExp.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200/60 rounded-full text-neutral-700 font-spacemono text-[10px] font-bold uppercase tracking-wider shadow-sm hover:border-neutral-300 transition-colors cursor-pointer"
                        >
                          {TECH_ICONS[tech]}
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements list */}
                  <div>
                    <h4 className="text-[10px] font-bold text-neutral-400 tracking-widest mb-3 font-spacemono uppercase">
                      Key Achievements
                    </h4>
                    <ul className="space-y-3 font-space text-sm text-neutral-600 leading-relaxed">
                      {prodeskExp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-left">
                          <span className="text-neutral-400 font-bold select-none mt-1 text-xs">&bull;</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* 2. Other Internships (Code Resite) - HEADINGS ONLY */}
          {otherExps.map((exp) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              key={exp.id}
              onClick={handleShowAll}
              className="flex flex-col sm:flex-row gap-6 items-start w-full cursor-pointer group relative z-10"
            >
              {/* Logo */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full group-hover:scale-105 transition-transform relative z-10">
                {COMPANY_LOGOS[exp.id]}
              </div>

              {/* Content Header Block */}
              <div className="flex-1 flex flex-col min-w-0 bg-neutral-50/30 border border-neutral-100/60 group-hover:border-neutral-200 group-hover:bg-neutral-50 rounded-2xl p-6 transition-all relative">
                {/* Spotlight background */}
                <div className="absolute -inset-4 bg-neutral-950 rounded-full blur-[80px] pointer-events-none select-none z-0 experience-spotlight" style={{ opacity: 0.03 }} />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold font-outfit text-neutral-800 group-hover:text-neutral-900 transition-colors flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-400 select-none hidden sm:inline experience-marker">○</span>
                      {exp.company}
                    </h3>
                    <div className="text-xs md:text-sm font-semibold font-outfit text-neutral-600 mt-0.5">
                      {exp.role} &middot; <span className="text-neutral-400 font-medium">{exp.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-spacemono text-xs font-bold text-neutral-400 group-hover:text-neutral-600 transition-colors tracking-wider sm:text-right">
                    {exp.duration}
                    <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 duration-200">&rarr;</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        </div>

        {/* CTA Button */}
        <div className="w-full flex justify-center mt-14">
          <button
            onClick={handleShowAll}
            className="px-8 py-3 bg-neutral-950 hover:bg-neutral-900 text-white text-xs font-bold font-spacemono uppercase tracking-widest rounded-full transition-all shadow-md active:scale-95 cursor-pointer outline-none focus:outline-none hover:shadow-lg"
          >
            Show all experiences
          </button>
        </div>

      </div>
    </section>
  );
};

export default Experience;
