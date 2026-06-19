import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LIFE_LATELY_EVENTS } from '../data/lifeLately';

gsap.registerPlugin(ScrollTrigger);

const navigateToEvent = (id) => {
  window.location.hash = `#/life-lately/${id}`;
};

// Card Hover Animation Variants
const imageVariants = {
  rest: { scale: 1, filter: "brightness(1) blur(0px)" },
  hover: { 
    scale: 1.06, 
    filter: "brightness(0.4) blur(2px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
  }
};

const contentVariants = {
  rest: { y: 30, opacity: 0 },
  hover: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08 } 
  }
};

const textVariants = {
  rest: { y: 15, opacity: 0 },
  hover: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

const arrowVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { 
    rotate: 45, 
    scale: 1.1, 
    transition: { duration: 0.3, ease: "easeOut" } 
  }
};

const LifeLately = () => {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [maxDrag, setMaxDrag] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive state check
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile && carouselRef.current) {
        const width = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
        setMaxDrag(width > 0 ? width : 0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP Horizontal scroll pinning on desktop
  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    const trigger = triggerRef.current;
    if (!container || !trigger) return;

    // Calculate scroll travel distance
    const getScrollAmount = () => {
      return -(container.scrollWidth - window.innerWidth);
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        { x: 0 },
        {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger,
            pin: true,
            scrub: 1.2,
            start: 'top top',
            end: () => `+=${container.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          }
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Section Header Entrance Reveal Variants
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const maskLineVariants = {
    hidden: { y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
    visible: { 
      y: 0, 
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const handleCardClick = (id) => {
    navigateToEvent(id);
  };

  return (
    <div 
      ref={triggerRef} 
      className="relative w-full bg-[#050505] text-white overflow-hidden select-none z-10"
    >
      {/* Desktop Horizontal Pin Layout */}
      {!isMobile ? (
        <div 
          ref={containerRef} 
          className="flex h-screen items-center px-12 md:px-24 flex-nowrap"
          style={{ width: 'max-content' }}
        >
          {/* Panel 0: Intro Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
            className="flex flex-col justify-center w-[480px] pr-20 mr-12 select-none h-full"
          >
            <motion.span 
              variants={maskLineVariants}
              className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff007f] font-spacemono mb-3"
            >
              Life Lately
            </motion.span>
            
            <div className="overflow-hidden mb-5">
              <motion.h2 
                variants={maskLineVariants}
                className="text-4xl md:text-5xl font-black font-outfit uppercase tracking-tight leading-[1.1] text-white"
              >
                Snapshots from the experiences that shaped me.
              </motion.h2>
            </div>

            <motion.div 
              variants={maskLineVariants}
              className="h-[1px] w-20 bg-neutral-800 mb-6"
            />

            <motion.p 
              variants={maskLineVariants}
              className="text-neutral-400 font-medium text-sm leading-relaxed font-space max-w-sm"
            >
              A curated collection of experiences, competitions, events, and moments that shaped my journey beyond academics and development.
            </motion.p>
          </motion.div>

          {/* Panels 1-4: Event Cards */}
          <div className="flex gap-10 items-center h-full">
            {LIFE_LATELY_EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleCardClick(event.id)}
                className="relative w-[340px] h-[500px] bg-neutral-900 border border-neutral-900/60 overflow-hidden cursor-pointer group flex flex-col justify-end"
              >
                {/* Event Index Code */}
                <div className="absolute top-6 left-6 z-20 font-spacemono text-xs font-bold text-white/50 tracking-wider">
                  EVENT 0{index + 1}
                </div>

                {/* Main Image */}
                <motion.div 
                  className="absolute inset-0 z-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.coverImage})` }}
                  variants={imageVariants}
                  initial="rest"
                  whileHover="hover"
                />

                {/* Floating Arrow Badge */}
                <motion.div 
                  variants={arrowVariants}
                  initial="rest"
                  whileHover="hover"
                  className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-lg transition-colors group-hover:bg-[#ff007f] group-hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>

                {/* Overlay Text Content (Revealed on Hover) */}
                <motion.div 
                  className="relative z-10 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent pt-32 w-full"
                  variants={contentVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <motion.span 
                    variants={textVariants}
                    className="inline-block px-2.5 py-0.5 border border-white/20 bg-white/5 text-[9px] font-bold font-spacemono uppercase tracking-wider rounded-full text-white/90 mb-3.5 w-max"
                  >
                    {event.category}
                  </motion.span>
                  <motion.h3 
                    variants={textVariants}
                    className="text-2xl font-black font-outfit text-white uppercase tracking-wider mb-2"
                  >
                    {event.title}
                  </motion.h3>
                  <motion.p 
                    variants={textVariants}
                    className="text-[11px] font-space font-medium text-neutral-300 leading-relaxed mb-5"
                  >
                    {event.description}
                  </motion.p>
                  <motion.div 
                    variants={textVariants}
                    className="flex items-center gap-1 text-[10px] font-bold font-spacemono uppercase tracking-widest text-[#ff007f] group-hover:text-white transition-colors"
                  >
                    Explore Story <span className="text-xs">&rarr;</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Mobile Swipeable Carousel Layout */
        <div className="py-20 px-6 flex flex-col items-start min-h-screen justify-center">
          {/* Mobile Intro Header */}
          <div className="mb-12 max-w-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff007f] font-spacemono block mb-2.5">
              Life Lately
            </span>
            <h2 className="text-3xl font-black font-outfit uppercase tracking-tight leading-[1.1] text-white mb-4">
              Snapshots from the experiences that shaped me.
            </h2>
            <p className="text-neutral-400 font-medium text-xs leading-relaxed font-space">
              A curated collection of experiences, competitions, events, and moments that shaped my journey beyond academics and development.
            </p>
          </div>

          {/* Draggable Track Container */}
          <div ref={carouselRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div 
              drag="x"
              dragConstraints={{ left: -maxDrag, right: 0 }}
              className="flex gap-6 w-max pr-6"
            >
              {LIFE_LATELY_EVENTS.map((event, index) => (
                <div
                  key={event.id}
                  onClick={() => handleCardClick(event.id)}
                  className="relative w-[280px] h-[400px] bg-neutral-900 border border-neutral-900/60 overflow-hidden flex flex-col justify-end"
                >
                  {/* Event Index Code */}
                  <div className="absolute top-4 left-4 z-20 font-spacemono text-[10px] font-bold text-white/50 tracking-wider">
                    EVENT 0{index + 1}
                  </div>

                  {/* Main Image */}
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${event.coverImage})`,
                      filter: "brightness(0.65)"
                    }}
                  />

                  {/* Float Arrow Badge (Statically visible on mobile) */}
                  <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-md">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>

                  {/* Statically displayed Details layout for touch friendliness */}
                  <div className="relative z-10 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/90 to-transparent pt-24 w-full">
                    <span className="inline-block px-2 py-0.5 border border-white/20 bg-white/5 text-[8px] font-bold font-spacemono uppercase tracking-wider rounded-full text-white/90 mb-2 w-max">
                      {event.category}
                    </span>
                    <h3 className="text-xl font-black font-outfit text-white uppercase tracking-wider mb-1.5">
                      {event.title}
                    </h3>
                    <p className="text-[10px] font-space font-medium text-neutral-300 leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-1 text-[9px] font-bold font-spacemono uppercase tracking-widest text-[#ff007f]">
                      Explore Story &rarr;
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Swipe indicator label */}
          <div className="mt-8 text-neutral-500 font-spacemono text-[9px] uppercase tracking-widest flex items-center gap-1.5 self-center">
            <span>&larr; Swipe to Explore &rarr;</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LifeLately;
