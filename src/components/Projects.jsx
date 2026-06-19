import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../data/projects';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const updateHash = (id) => {
  window.location.hash = `#${id}`;
};

const Projects = () => {
  const handleCardClick = (project) => {
    updateHash(project.id);
  };

  // Stagger Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // Fade Up Grid Child Variants
  const cardItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Watermark animation
      gsap.fromTo('.projects-watermark',
        { opacity: 0, y: 40 },
        {
          opacity: 0.02,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // 2. Annotations stagger fade-in
      gsap.fromTo('.projects-annotation',
        { opacity: 0, scale: 0.9, y: 15 },
        {
          opacity: 0.05,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // 3. Spotlights fade-in
      gsap.fromTo('.projects-spotlight',
        { opacity: 0 },
        {
          opacity: 0.02,
          duration: 1.2,
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative w-full py-24 px-6 overflow-hidden bg-[#F6F6F6] text-neutral-900 border-t border-dashed border-neutral-200">
      {/* Layered Background System */}
      <div className="paper-texture" />
      <div className="blueprint-grid-80" />

      {/* Giant Watermark Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <div className="projects-watermark text-[14rem] sm:text-[18rem] md:text-[26rem] font-black font-outfit text-neutral-900 tracking-tighter uppercase leading-none select-none" style={{ opacity: 0.02 }}>
          PROJECTS
        </div>
      </div>

      {/* Technical Annotations */}
      <div className="absolute top-[10%] left-[8%] font-spacemono text-[9px] md:text-[10px] font-bold text-neutral-950/5 select-none pointer-events-none z-10 projects-annotation">// code_compilation</div>
      <div className="absolute top-[8%] right-[8%] font-spacemono text-[9px] md:text-[10px] font-bold text-neutral-950/5 select-none pointer-events-none z-10 projects-annotation">// repository_head</div>
      <div className="absolute bottom-[8%] left-[8%] font-spacemono text-[9px] md:text-[10px] font-bold text-neutral-950/5 select-none pointer-events-none z-10 projects-annotation">// project_directory</div>
      <div className="absolute bottom-[6%] right-[10%] font-spacemono text-[9px] md:text-[10px] font-bold text-neutral-950/5 select-none pointer-events-none z-10 projects-annotation">// build_output</div>

      {/* Ambient Spotlights (Soft neutral shadows/lights behind cards) */}
      <div className="absolute top-[-10%] right-[-15%] w-[65%] aspect-square bg-neutral-950 rounded-full blur-[140px] pointer-events-none select-none z-0 projects-spotlight" style={{ opacity: 0.02 }} />
      <div className="absolute bottom-[-10%] left-[-15%] w-[65%] aspect-square bg-neutral-950 rounded-full blur-[140px] pointer-events-none select-none z-0 projects-spotlight" style={{ opacity: 0.02 }} />


      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 font-spacemono"
          >
            Things I've Built
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold uppercase tracking-wider text-neutral-900 font-inter"
          >
            Projects
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-500 font-semibold text-sm sm:text-base leading-relaxed font-space max-w-2xl"
          >
            Projects solving Real world problems with the integration of Ai and Tech
          </motion.p>
        </div>

        {/* Projects Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.title} variants={cardItemVariants}>
              <ProjectCard
                project={project}
                onClick={() => handleCardClick(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* See All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <a
            href="#all-projects"
            className="group relative px-8 py-3.5 font-spacemono text-xs sm:text-sm font-bold uppercase tracking-widest text-white bg-neutral-950 border-2 border-neutral-900 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>See All Projects</span>
            <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-1.5">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
