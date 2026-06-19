import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/experience';
import { TECH_ICONS } from './TechIcons';
import prodeskLogo from '../assets/prodesk.png';
import codeResiteLogo from '../assets/code_resite.jpg';

const COMPANY_LOGOS = {
  prodesk: <img src={prodeskLogo} alt="Prodesk Logo" className="w-12 h-12 object-contain rounded-full border border-neutral-300 shadow-sm bg-white" />,
  coderesite: <img src={codeResiteLogo} alt="Code Resite Logo" className="w-12 h-12 object-contain rounded-full border border-neutral-300 shadow-sm bg-white" />
};

const AllExperiencesPage = ({ onBack }) => {
  // Progressive list animations
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-neutral-900 py-20 px-6 md:px-12 font-space z-20 overflow-x-hidden">
      
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-16">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-bold font-spacemono uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer outline-none focus:outline-none"
        >
          <span className="group-hover:-translate-x-1.5 transition-transform duration-200">←</span> 
          Back to Portfolio
        </button>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-start">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-black font-outfit uppercase tracking-wider text-neutral-900 mb-2">
          Experience History
        </h1>
        <p className="text-neutral-500 text-sm md:text-base font-medium max-w-xl mb-12">
          A detailed chronicle of my professional internships, technical achievements, and engineering projects.
        </p>

        {/* Detailed timeline list */}
        <div className="w-full relative pl-0 space-y-16">
          {/* Vertical subtle connector line */}
          <div className="absolute left-[23px] top-6 bottom-6 w-[1.5px] bg-neutral-300 pointer-events-none hidden sm:block" />

          {EXPERIENCE.map((exp) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={exp.id}
              className="relative flex flex-col sm:flex-row gap-6 items-start"
            >
              {/* Timeline dot/logo */}
              <div className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full sm:shadow-sm">
                {COMPANY_LOGOS[exp.id]}
              </div>

              {/* Details card */}
              <div className="flex-1 flex flex-col min-w-0 bg-neutral-50/50 rounded-2xl border border-neutral-300 p-6 md:p-8 hover:shadow-md transition-shadow">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-outfit text-neutral-900">
                      {exp.company}
                    </h3>
                    <div className="text-sm font-semibold font-outfit text-neutral-700 mt-0.5">
                      {exp.role} &middot; <span className="text-neutral-500 font-medium">{exp.location}</span>
                    </div>
                  </div>
                  <div className="font-spacemono text-xs md:text-sm font-bold text-neutral-400 md:text-right tracking-wider">
                    {exp.duration}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-neutral-300 w-full my-5" />

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold text-neutral-400 tracking-widest mb-3 font-spacemono uppercase">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200/80 rounded-full text-neutral-700 font-spacemono text-[10px] font-bold uppercase tracking-wider shadow-sm hover:border-neutral-300 transition-colors"
                      >
                        {TECH_ICONS[tech]}
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-[10px] font-bold text-neutral-400 tracking-widest mb-3 font-spacemono uppercase">
                    Key Achievements
                  </h4>
                  <motion.ul 
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3 font-space text-sm text-neutral-600 leading-relaxed"
                  >
                    {exp.achievements.map((ach, idx) => (
                      <motion.li 
                        variants={itemVariants}
                        key={idx} 
                        className="flex items-start gap-2.5 text-left"
                      >
                        <span className="text-neutral-400 select-none mt-1 text-sm font-bold">&bull;</span>
                        <span>{ach}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllExperiencesPage;
