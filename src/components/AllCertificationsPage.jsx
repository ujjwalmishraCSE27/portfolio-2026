import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../data/certifications';

const AllCertificationsPage = ({ onBack }) => {
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
          Certifications & Badges
        </h1>
        <p className="text-neutral-500 text-sm md:text-base font-medium max-w-xl mb-12">
          A showcase of verified course completions, hands-on engineering labs, and problem-solving benchmarks.
        </p>

        {/* Detailed List */}
        <div className="w-full relative pl-0 space-y-16">
          {/* Vertical subtle connector line */}
          <div className="absolute left-[23px] top-6 bottom-6 w-[1.5px] bg-neutral-300 pointer-events-none hidden sm:block" />

          {CERTIFICATIONS.map((cert) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={cert.id}
              className="relative flex flex-col sm:flex-row gap-6 items-start"
            >
              {/* Timeline dot/logo */}
              <div className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full sm:shadow-sm border border-neutral-300 p-1">
                <img src={cert.logo} alt={cert.title} className="w-10 h-10 object-contain rounded-full" />
              </div>

              {/* Details card */}
              <div className="flex-1 flex flex-col min-w-0 bg-neutral-50/50 rounded-2xl border border-neutral-300 p-6 md:p-8 hover:shadow-md transition-shadow">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-outfit text-neutral-900">
                      {cert.title}
                    </h3>
                    <div className="text-sm font-semibold font-outfit text-neutral-700 mt-0.5">
                      {cert.issuer}
                    </div>
                  </div>
                  <div className="font-spacemono text-xs md:text-sm font-bold text-neutral-400 md:text-right tracking-wider">
                    {cert.duration}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-neutral-300 w-full my-5" />

                {/* Description */}
                <p className="text-sm text-neutral-600 leading-relaxed font-semibold mb-6">
                  "{cert.description}"
                </p>

                {/* Topics badges */}
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold text-neutral-400 tracking-widest mb-3 font-spacemono uppercase">
                    Core Focus & Skillsets
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.topics.map((topic) => (
                      <div
                        key={topic}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200/80 rounded-full text-neutral-700 font-spacemono text-[10px] font-bold uppercase tracking-wider shadow-sm hover:border-neutral-300 transition-colors"
                      >
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification CTA */}
                <div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-5 py-2.5 bg-neutral-950 hover:bg-neutral-900 text-[11px] font-bold font-spacemono uppercase tracking-wider text-white rounded-full transition-all shadow-md active:scale-95 cursor-pointer outline-none hover:shadow-lg"
                  >
                    {cert.buttonText} &rarr;
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCertificationsPage;
