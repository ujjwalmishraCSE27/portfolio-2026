import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../data/projects';

const updateHash = (id) => {
  window.location.hash = `#${id}`;
};

const AllProjectsPage = ({ onBack }) => {
  const handleCardClick = (project) => {
    updateHash(project.id);
  };

  // Stagger Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-bold font-spacemono uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer outline-none focus:outline-none"
          >
            <span className="group-hover:-translate-x-1.5 transition-transform duration-200">←</span> 
            Back to Home
          </button>
        </motion.div>

        {/* Header Block */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider text-neutral-900 font-outfit">
              All Projects
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-500 font-bold font-space text-sm sm:text-base max-w-3xl leading-relaxed"
          >
            A complete compilation of applications, systems, and platforms built during my journey as a full stack developer.
          </motion.p>
        </div>

        {/* Projects Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4"
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

      </div>
    </div>
  );
};

export default AllProjectsPage;
