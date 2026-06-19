import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LIFE_LATELY_EVENTS } from '../data/lifeLately';

const EventDetailPage = ({ eventId, onBack }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);
  const event = LIFE_LATELY_EVENTS.find(e => e.id === eventId);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [eventId]);

  if (!event) {
    return (
      <div className="w-full min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold font-spacemono mb-4">Event Story Not Found</h2>
        <button onClick={onBack} className="px-5 py-2 bg-white text-neutral-900 font-bold font-spacemono text-xs rounded-full">
          Back to Home
        </button>
      </div>
    );
  }

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx(prev => (prev + 1) % event.images.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx(prev => (prev - 1 + event.images.length) % event.images.length);
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white py-16 px-6 md:py-20 md:px-12 font-space relative select-none">
      
      {/* Back Button Header */}
      <div className="max-w-4xl mx-auto mb-12 md:mb-16">
        <button
          onClick={onBack}
          className="group flex items-center gap-2.5 text-xs font-bold font-spacemono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer outline-none"
        >
          <span className="group-hover:-translate-x-1.5 transition-transform duration-200">&larr;</span> 
          Back to Portfolio
        </button>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col">
        
        {/* HERO SECTION */}
        <div className="relative w-full h-[320px] md:h-[450px] overflow-hidden rounded-2xl border border-neutral-900/60 mb-12 md:mb-16">
          {/* Cover Background Photo */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${event.coverImage})`,
              filter: "brightness(0.45)"
            }}
          />
          {/* Bottom Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

          {/* Metadata content */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col items-start z-10">
            <span className="inline-block px-3 py-1 border border-[#ff007f]/40 bg-[#ff007f]/10 text-[9px] md:text-[10px] font-bold font-spacemono uppercase tracking-widest rounded-full text-white mb-3">
              {event.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black font-outfit uppercase tracking-wider text-white mb-3">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 font-spacemono text-[10px] md:text-xs text-neutral-400 tracking-wider">
              <span>📅 {event.date}</span>
              <span>📍 {event.location}</span>
            </div>
          </div>
        </div>

        {/* DETAILS COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start mb-16 md:mb-20">
          
          {/* Left Column: Narrative (2/3 width on desktop) */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl md:text-2xl font-black font-outfit uppercase tracking-widest text-white border-b border-neutral-900 pb-3">
              My Experience
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-medium">
              {event.narrative}
            </p>

            {/* Highlights bullet checklist */}
            <div className="pt-4 space-y-4">
              <h3 className="text-xs font-bold font-spacemono text-[#ff007f] tracking-widest uppercase">
                Key Accomplishments
              </h3>
              <ul className="space-y-3 font-space text-sm text-neutral-400">
                {event.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed font-semibold">
                    <span className="text-white select-none mt-1 text-[11px]">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Key Takeaways Card */}
          <div className="flex flex-col p-6 bg-neutral-950/80 border border-neutral-900 rounded-xl">
            <h2 className="text-sm font-bold font-spacemono tracking-widest text-[#ff007f] uppercase mb-4">
              Key Takeaways
            </h2>
            <div className="flex flex-col gap-3 font-space text-xs md:text-sm font-bold uppercase tracking-wider text-white/95">
              {event.takeaways.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Custom Minimalist Checkmark */}
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* QUOTE BLOCKHIGHLIGHTS */}
        {event.quotes && event.quotes.length > 0 && (
          <div className="border-l-2 border-[#ff007f] pl-6 py-2 mb-16 md:mb-20 max-w-2xl select-none">
            <p className="font-space italic text-base md:text-lg text-neutral-300 font-semibold leading-relaxed">
              "{event.quotes[0]}"
            </p>
          </div>
        )}

        {/* MASONRY IMAGE GALLERY */}
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black font-outfit uppercase tracking-widest text-white border-b border-neutral-900 pb-3 mb-6">
            Captured Moments
          </h2>
          
          {/* Dynamic Columns Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {event.images.map((imgUrl, idx) => (
              <div 
                key={idx}
                onClick={() => setActivePhotoIdx(idx)}
                className="break-inside-avoid relative overflow-hidden rounded-xl border border-neutral-900/60 cursor-pointer group shadow-sm bg-neutral-950/40"
              >
                <img 
                  src={imgUrl} 
                  alt={`${event.title} - ${idx + 1}`} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]"
                  loading="lazy"
                />
                {/* Image hover glow overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX DIALOG OVERLAY */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoIdx(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button 
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer outline-none focus:outline-none"
            >
              ✕
            </button>

            {/* Left Prev Arrow */}
            {event.images.length > 1 && (
              <button 
                onClick={handlePrevPhoto}
                className="absolute left-6 w-12 h-12 rounded-full bg-neutral-900/80 border border-neutral-800 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer outline-none focus:outline-none z-10"
              >
                &larr;
              </button>
            )}

            {/* Main Picture Frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] flex items-center justify-center overflow-hidden"
            >
              <img 
                src={event.images[activePhotoIdx]} 
                alt={`${event.title} zoom`} 
                className="max-w-full max-h-[85vh] object-contain rounded-lg border border-neutral-800 shadow-2xl select-none"
              />
            </motion.div>

            {/* Right Next Arrow */}
            {event.images.length > 1 && (
              <button 
                onClick={handleNextPhoto}
                className="absolute right-6 w-12 h-12 rounded-full bg-neutral-900/80 border border-neutral-800 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer outline-none focus:outline-none z-10"
              >
                &rarr;
              </button>
            )}

            {/* Photo Counter Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-neutral-900 border border-neutral-800 text-[10px] font-bold font-spacemono rounded-full uppercase tracking-wider text-neutral-400">
              {activePhotoIdx + 1} / {event.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EventDetailPage;
