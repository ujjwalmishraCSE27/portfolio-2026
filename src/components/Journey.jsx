import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { motion, AnimatePresence } from 'framer-motion';
import MilestoneCard from './MilestoneCard';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const MILESTONES = [
  {
    year: "2023",
    title: "Started Programming",
    description: "Began my programming journey at United University and discovered my passion for software development.",
    skills: ["C", "Java", "Python"]
  },
  {
    year: "2024",
    title: "DSA & Frontend Development",
    description: "Started solving Data Structures and Algorithms problems while learning modern frontend development.",
    skills: ["HTML", "CSS", "Tailwind CSS", "React"]
  },
  {
    year: "2025",
    title: "Backend & Internship",
    description: "Learned backend development, built multiple full-stack projects, and completed an internship at Prodesk.",
    skills: ["Node.js", "Express.js", "REST APIs", "MongoDB"]
  },
  {
    year: "PRESENT",
    title: "Building the Future",
    description: "Solved 300+ LeetCode problems and actively exploring System Design and Generative AI.",
    highlights: ["300+ LeetCode Problems", "System Design", "Generative AI"]
  }
];

const generatePuffId = () => Math.random().toString(36).substring(2, 9);

// Neo-brutalist yellow traffic guidance sign on metal pole
const TrafficSign = ({ text }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 35, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      className="hidden md:flex flex-col items-center select-none pointer-events-none"
    >
      {/* Yellow Sign Board */}
      <div className="bg-[#f5cd13] border-[3px] border-neutral-900 px-3.5 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-neutral-900 font-outfit font-black text-xs uppercase tracking-widest text-center min-w-[90px] relative">
        <div className="absolute inset-0.5 border border-neutral-900/30 pointer-events-none" />
        <span className="relative z-10">{text}</span>
      </div>
      {/* Metal Pole */}
      <div className="w-[5px] h-12 bg-neutral-400 border-x-[1.5px] border-neutral-900" />
      {/* Base Stand */}
      <div className="w-5 h-1.5 bg-neutral-700 border-[1.5px] border-neutral-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" />
    </motion.div>
  );
};

const Journey = () => {
  const containerRef = useRef(null);
  const innerContainerRef = useRef(null);
  const pathRef = useRef(null);
  const roadBgRef = useRef(null);
  const busRef = useRef(null);
  const busBodyRef = useRef(null);
  const wheelFrontRef = useRef(null);
  const wheelBackRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [smokePuffs, setSmokePuffs] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  // Dynamic road configuration to prevent squishing on mobile viewports
  const viewBox = isMobile ? "0 0 80 1600" : "0 0 1000 1600";
  const pathData = isMobile 
    ? "M 40,100 L 40,1500" 
    : "M 430,100 C 510,100 570,250 570,450 C 570,650 430,650 430,850 C 430,1050 570,1050 570,1250 C 570,1350 500,1400 500,1500";

  // Spawning smoke puffs behind the bus (measured relative to the inner container)
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScrollSmoke = () => {
      const currentScrollY = window.scrollY;
      const speed = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      if (speed > 2 && busRef.current && innerContainerRef.current) {
        const busRect = busRef.current.getBoundingClientRect();
        const innerRect = innerContainerRef.current.getBoundingClientRect();
        
        // Compute relative tailpipe coordinate of the bus
        const px = busRect.left - innerRect.left + (busRect.width * 0.1);
        const py = busRect.top - innerRect.top + (busRect.height * 0.6);

        const greyColors = ["#f4f4f5", "#e4e4e7", "#d4d4d8", "#a1a1aa"];
        const newPuff = {
          id: generatePuffId(),
          x: px,
          y: py,
          color: greyColors[Math.floor(Math.random() * greyColors.length)],
          size: Math.random() * 6 + 5
        };

        setSmokePuffs((prev) => [...prev.slice(-30), newPuff]);
      }
    };

    window.addEventListener('scroll', handleScrollSmoke);
    return () => {
      window.removeEventListener('scroll', handleScrollSmoke);
    };
  }, []);

  const removePuff = (id) => {
    setSmokePuffs((prev) => prev.filter((puff) => puff.id !== id));
  };

  useEffect(() => {
    let tl;
    const currentContainer = containerRef.current;

    const initGsap = () => {
      const road = pathRef.current;
      if (!road) return;

      const totalLength = road.getTotalLength();
      gsap.set(road, { strokeDasharray: totalLength, strokeDashoffset: totalLength });

      // Kill any previous ScrollTriggers for this container to avoid duplicate pinning/animation logic
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === currentContainer) {
          t.kill();
        }
      });

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: currentContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            
            const velocity = Math.abs(self.getVelocity());
            if (velocity > 12 && busBodyRef.current) {
              busBodyRef.current.classList.add("camper-bounce");
            } else {
              busBodyRef.current.classList.remove("camper-bounce");
            }

            const prog = self.progress;
            if (prog < 0.22) setActiveIndex(0);
            else if (prog < 0.52) setActiveIndex(1);
            else if (prog < 0.78) setActiveIndex(2);
            else setActiveIndex(3);
          }
        }
      });

      // 1. Move bus along the winding road (natively aligned inside SVG space)
      tl.to(busRef.current, {
        motionPath: {
          path: road,
          autoRotate: true
        },
        duration: 1,
        ease: "none"
      }, 0);

      // 2. Draw road path progressively
      tl.to(road, {
        strokeDashoffset: 0,
        duration: 1,
        ease: "none"
      }, 0);

      // 3. Spin wheels
      tl.to([wheelFrontRef.current, wheelBackRef.current], {
        rotation: 360 * 10,
        duration: 1,
        ease: "none"
      }, 0);

      // 4. Lean camper body into curves
      // Only lean body panels and window areas, keeping wheels flat on road surface
      if (!isMobile) {
        tl.to(busBodyRef.current, { rotation: 4, duration: 0.2 }, 0)
          .to(busBodyRef.current, { rotation: -6, duration: 0.35 }, 0.2)
          .to(busBodyRef.current, { rotation: 5, duration: 0.35 }, 0.55)
          .to(busBodyRef.current, { rotation: 0, duration: 0.1 }, 0.9);
      }
    };

    // Initialize after layout settles
    const timeoutId = setTimeout(initGsap, 100);

    const handleResize = () => {
      const mobileStatus = window.innerWidth < 768;
      if (mobileStatus !== isMobile) {
        setIsMobile(mobileStatus);
      } else {
        initGsap();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === currentContainer) {
          t.kill();
        }
      });
    };
  }, [isMobile]);

  return (
    <div id="about-me" ref={containerRef} className="relative w-full min-h-[180vh] overflow-hidden bg-[#fafafc] text-neutral-900 border-t border-dashed border-neutral-200">
      
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 tech-draft-grid pointer-events-none" />

      {/* Radial Vignette Lighting Layer */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.65) 0%, rgba(250, 250, 252, 0.95) 100%)'
      }} />


      {/* Title Header Block with 3D perspective */}
      <div className="relative w-full max-w-4xl mx-auto pt-20 pb-8 px-6 text-center select-none z-30" style={{ perspective: 1200 }}>
        {/* 3D Animated Heading with Tilt */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotateX: 30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          whileHover={{ rotateX: 15, rotateY: -15, scale: 1.05 }}
          className="inline-block cursor-pointer"
        >
          <h2 className="font-outfit font-black text-neutral-900 text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider mb-4">
            Who am I?
          </h2>
        </motion.div>

        {/* Animated subtext with clean professional styles */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-space text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed mt-4 font-semibold"
        >
          I am Ujjwal Mishra and I build fast, scalable, and user-focused web applications using modern technologies and Integrating AI
        </motion.p>
      </div>

      {/* Roadmap stage */}
      <div ref={innerContainerRef} className="relative w-full max-w-6xl mx-auto h-[1600px]">

        {/* Parallax Background Doodles */}
        <div className="absolute top-[18%] left-[8%] opacity-15 select-none hidden md:block">
          <span className="font-sketch text-6xl text-neutral-900">✦</span>
        </div>
        <div className="absolute top-[42%] right-[10%] opacity-15 select-none hidden md:block">
          <span className="font-sketch text-7xl text-neutral-900">✦</span>
        </div>
        <div className="absolute top-[68%] left-[5%] opacity-15 select-none hidden md:block">
          <span className="font-sketch text-6xl text-neutral-900">✦</span>
        </div>
        <div className="absolute top-[88%] right-[8%] opacity-15 select-none hidden md:block">
          <span className="font-sketch text-8xl text-neutral-900">✦</span>
        </div>

        {/* Winding Road SVG Layer */}
        <svg 
          className="absolute inset-0 w-20 md:w-full h-full left-2 xs:left-4 md:left-0 overflow-visible pointer-events-none z-10"
          viewBox={viewBox}
          preserveAspectRatio="none"
        >
          {/* Road Background (Dotted path representing future road) */}
          <path
            ref={roadBgRef}
            d={pathData}
            fill="none"
            stroke="#e4e4e7"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="12 8"
          />

          {/* Road Outer border (Draws dynamically) - Changed from neon to dark charcoal */}
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="#18181b"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ strokeLinejoin: 'round' }}
          />

          {/* Road Center lane dashes (Draws white dashes on the dark road, giving highway vibes) */}
          <path
            d={pathData}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="8 8"
            opacity="0.85"
            style={{ strokeLinejoin: 'round' }}
          />

          {/* Checkpoint nodes (Monochrome progress circles) */}
          <circle cx={isMobile ? "40" : "430"} cy="100" r="8" fill={activeIndex >= 0 ? "#18181b" : "#ffffff"} stroke="#18181b" strokeWidth="3" className="transition-all duration-300" />
          <circle cx={isMobile ? "40" : "570"} cy="450" r="8" fill={activeIndex >= 1 ? "#18181b" : "#ffffff"} stroke="#18181b" strokeWidth="3" className="transition-all duration-300" />
          <circle cx={isMobile ? "40" : "430"} cy="850" r="8" fill={activeIndex >= 2 ? "#18181b" : "#ffffff"} stroke="#18181b" strokeWidth="3" className="transition-all duration-300" />
          <circle cx={isMobile ? "40" : "570"} cy="1250" r="8" fill={activeIndex >= 3 ? "#18181b" : "#ffffff"} stroke="#18181b" strokeWidth="3" className="transition-all duration-300" />
          
          <circle cx={isMobile ? "40" : "500"} cy="1500" r="6" fill={scrollProgress > 0.95 ? "#18181b" : "#ffffff"} stroke="#18181b" strokeWidth="2.5" className="transition-all duration-300" />

          {/* Connector lines from road to cards (Hidden on mobile) */}
          <g className="hidden md:block">
            <line x1="390" y1="100" x2="430" y2="100" stroke="#18181b" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
            <line x1="570" y1="450" x2="610" y2="450" stroke="#18181b" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
            <line x1="390" y1="850" x2="430" y2="850" stroke="#18181b" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
            <line x1="570" y1="1250" x2="610" y2="1250" stroke="#18181b" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
          </g>

          {/* camper van (bus) group inside SVG for responsive scaling and rotation */}
          <g 
            ref={busRef}
            style={{
              transformOrigin: '0px 0px',
              willChange: 'transform'
            }}>
              {/* Shadow under the wheels */}
              <ellipse cx="0" cy="1" rx="28" ry="3.5" fill="rgba(0,0,0,0.3)" />

              {/* Bus Body Group (Tilts and bounces independently of the wheels) */}
              <g ref={busBodyRef} style={{ transformOrigin: "40px 40px" }}>
                {/* VW Camper Van SVG Drawing (translated by y=-54 to place bottom of wheels at y=0) */}
                <g transform="translate(-40, -54)">
                  {/* Exhaust pipe / tailpipe */}
                  <rect x="0" y="30" width="3" height="6" fill="#4b5563" rx="1.5" />
                  {/* Main Lower Body: Sleek dark grey/charcoal */}
                  <rect x="3" y="10" width="72" height="30" fill="#262626" rx="6" stroke="#000000" strokeWidth="2.5" />
                  {/* Upper Body (Windows area): light neutral grey */}
                  <path d="M 12,10 L 68,10 C 72,10 74,12 74,16 L 74,25 L 6,25 L 6,16 C 6,12 8,10 12,10 Z" fill="#f4f4f5" stroke="#000000" strokeWidth="2.5" />
                  {/* Windows */}
                  <rect x="12" y="14" width="12" height="7" fill="#27272a" stroke="#000000" strokeWidth="1.8" />
                  <rect x="28" y="14" width="14" height="7" fill="#27272a" stroke="#000000" strokeWidth="1.8" />
                  <rect x="46" y="14" width="14" height="7" fill="#27272a" stroke="#000000" strokeWidth="1.8" />
                  <path d="M 64,14 L 72,16 L 72,21 L 64,21 Z" fill="#27272a" stroke="#000000" strokeWidth="1.8" />
                  {/* Headlight cone */}
                  <path d="M 75,32 L 95,24 L 95,44 Z" fill="rgba(255, 235, 59, 0.12)" />
                  <circle cx="76" cy="34" r="3.5" fill="#fbfbfe" stroke="#000000" strokeWidth="1.5" />
                  <line x1="3" y1="30" x2="75" y2="30" stroke="#000000" strokeWidth="2" />
                  {/* Wheel Arches */}
                  <path d="M 14,40 A 10,10 0 0,1 30,40 Z" fill="#0a0a0a" stroke="#000000" strokeWidth="2" />
                  <path d="M 50,40 A 10,10 0 0,1 66,40 Z" fill="#0a0a0a" stroke="#000000" strokeWidth="2" />
                </g>
              </g>

              {/* Back Wheel (Spinning only, stays flat on road) */}
              <g ref={wheelBackRef} transform="translate(-18, -9)">
                <circle cx="0" cy="0" r="9" fill="#18181b" stroke="#000000" strokeWidth="2.2" />
                <circle cx="0" cy="0" r="4" fill="#e4e4e7" stroke="#000000" strokeWidth="1.5" />
                <line x1="0" y1="-9" x2="0" y2="9" stroke="#000000" strokeWidth="1.5" />
                <line x1="-9" y1="0" x2="9" y2="0" stroke="#000000" strokeWidth="1.5" />
              </g>

              {/* Front Wheel (Spinning only, stays flat on road) */}
              <g ref={wheelFrontRef} transform="translate(14, -9)">
                <circle cx="0" cy="0" r="9" fill="#18181b" stroke="#000000" strokeWidth="2.2" />
                <circle cx="0" cy="0" r="4" fill="#e4e4e7" stroke="#000000" strokeWidth="1.5" />
                <line x1="0" y1="-9" x2="0" y2="9" stroke="#000000" strokeWidth="1.5" />
                <line x1="-9" y1="0" x2="9" y2="0" stroke="#000000" strokeWidth="1.5" />
              </g>
          </g>
        </svg>

        {/* Smoke Puffs Render Layer */}
        <div className="absolute inset-0 pointer-events-none z-15">
          <AnimatePresence>
            {smokePuffs.map((puff) => (
              <motion.div
                key={puff.id}
                initial={{ opacity: 0.8, scale: 0.3, y: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: 1.8, 
                  y: -25, 
                  x: Math.sin(puff.x) * 8 
                }}
                exit={{ opacity: 0 }}
                onAnimationComplete={() => removePuff(puff.id)}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute rounded-full"
                style={{
                  left: puff.x,
                  top: puff.y,
                  width: puff.size,
                  height: puff.size,
                  backgroundColor: puff.color,
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Milestone Card Overlay Elements */}
        {/* Card 1: 2023 (Left on Desktop, Right of Road on Mobile) */}
        <div className="absolute top-[40px] left-[64px] xs:left-[80px] md:left-[6%] lg:left-[8%] z-20">
          <MilestoneCard
            {...MILESTONES[0]}
            isActive={activeIndex === 0}
          />
        </div>

        {/* Traffic Sign 1: Start (Opposite Card 1, in the right empty space) */}
        <div className="absolute top-[120px] md:right-[16%] lg:right-[20%] z-15 pointer-events-none">
          <TrafficSign text="Start" />
        </div>

        {/* Card 2: 2024 (Right on Desktop, Right of Road on Mobile) */}
        <div className="absolute top-[390px] left-[64px] xs:left-[80px] md:left-auto md:right-[6%] lg:right-[8%] z-20">
          <MilestoneCard
            {...MILESTONES[1]}
            isActive={activeIndex === 1}
          />
        </div>

        {/* Traffic Sign 2: 200m ahead (Opposite Card 2, in the left empty space) */}
        <div className="absolute top-[470px] md:left-[16%] lg:left-[20%] z-15 pointer-events-none">
          <TrafficSign text="200m ahead" />
        </div>

        {/* Card 3: 2025 (Left on Desktop, Right of Road on Mobile) */}
        <div className="absolute top-[790px] left-[64px] xs:left-[80px] md:left-[6%] lg:left-[8%] z-20">
          <MilestoneCard
            {...MILESTONES[2]}
            isActive={activeIndex === 2}
          />
        </div>

        {/* Traffic Sign 3: Almost there (Opposite Card 3, in the right empty space) */}
        <div className="absolute top-[870px] md:right-[16%] lg:right-[20%] z-15 pointer-events-none">
          <TrafficSign text="Almost there" />
        </div>

        {/* Card 4: PRESENT (Right on Desktop, Right of Road on Mobile) */}
        <div className="absolute top-[1190px] left-[64px] xs:left-[80px] md:left-auto md:right-[6%] lg:right-[8%] z-20">
          <MilestoneCard
            {...MILESTONES[3]}
            isActive={activeIndex === 3}
          />
        </div>

        {/* Traffic Sign 4: Stop (Opposite Card 4, in the left empty space) */}
        <div className="absolute top-[1270px] md:left-[16%] lg:left-[20%] z-15 pointer-events-none">
          <TrafficSign text="Stop" />
        </div>

        {/* Celebration Particles */}
        <AnimatePresence>
          {scrollProgress > 0.95 && (
            <motion.div 
              key="journey-celebration-emojis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none select-none"
            >
              <div className="flex justify-center gap-1.5 mb-2">
                {["🎉", "✨", "🚀", "⚡", "🔥"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 15, scale: 0 }}
                    animate={{ y: [0, -30, 0], scale: 1 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5, 
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                    className="text-2xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drive-bounce-anim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .camper-bounce {
          animation: drive-bounce-anim 0.16s infinite linear;
        }
        .tech-draft-grid {
          background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 0, 0, 0.007) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.007) 1px, transparent 1px);
        }
      `}} />

    </div>
  );
};

export default Journey;
